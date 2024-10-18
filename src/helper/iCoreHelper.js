const axios = require('axios')
const { QueryTypes, Op, ValidationError } = require('sequelize')
// const db = require("../db/pg");
const { response } = require('./responseHelper')
const Queue = require('bull')

// const redis = require('redis')
const iCoreBaseUrl = 'https://esbportal.borneo-indobara.com'
const staticToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBzX25hbWUiOiJ1LWdlbXMiLCJpYXQiOjE2NjMzMTM5MTF9.hjR8BIVRPcRr2ZaOH0zIVD44xffRTcV8fYCirSMhQlU'

const fetchUserSimper = new Queue('fetch iSafe User')

const { companyModel } = require('../admin/company/companyModel')
const { usersModel } = require('../userManagement/users/userModel')
const { pgsql } = require('../db')

const iCore = {}

iCore.getToken = async () => {
  try {
    const restApi = await axios.get(`${iCoreBaseUrl}/external/getToken`, {
      headers: {
        Authorization: `Bearer ${staticToken}`,
      },
    })

    return restApi.data.token
  } catch (error) {
    console.error('error', error)
    return null
  }
}

iCore.fetchSimper = async (token, page = 1, size = 1000, isafe_no = null, nik = null, name = null, no_ktp = null, company = null) => {
  var res = []
  var param = []

  if (isafe_no) {
    param.push(`isafe_number=${isafe_no.trim()}`)
  }

  if (nik) {
    param.push(`nik=${nik.trim()}`)
  }

  if (name) {
    param.push(`name=${name.trim()}`)
  }

  if (no_ktp) {
    param.push(`no_ktp=${no_ktp.trim()}`)
  }

  if (company) {
    param.push(`company=${company.trim()}`)
  }

  param.join('')
  try {
    res = await axios.get(`${iCoreBaseUrl}/external/simperlist/getAll?page=${page}&size=${size}${param.join('&')}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error('error', error)
  }
  return res
}

iCore.saveUserAndCompany = async (simper, dataExist) => {
  try {
    console.log(JSON.stringify(simper))

    try {
      if (simper.company !== null) {
        let filter
        if (RegExp(`(^PT)`, 'gm').test(simper.company) || RegExp(`(^CV)`, 'gm').test(simper.company)) {
          simper['company_filter'] = simper.company.substring(3)

          filter = [pgsql.literal(`LOWER("company"."company_name") ilike LOWER('%${simper.company_filter}%') `)]
        } else {
          filter = [pgsql.literal(`LOWER("company"."company_name") ilike LOWER('%${simper.company}%') `)]
        }

        let [company, created] = await companyModel.findOrCreate({
          where: { ...filter },
          defaults: { company_name: simper.company },
        })

        simper.company_id = company.id
        simper.company = company.company_name
      } else {
        simper.company_id = null
      }
    } catch (error) {
      console.error(`Error, when creating company`, error)
      throw error
    }

    const filters = {}
    if (!simper.keycloak_user_id && !simper.nik) {
      console.log('Invalid User Data, no keycloak_user_id or nik')
      throw new ValidationError('Invalid User Data, no keycloak_user_id or nik')
    }

    if (simper.keycloak_user_id) {
      filters['keycloak_user_id'] = simper.keycloak_user_id
    }

    if (simper.nik) {
      filters['nik'] = simper.nik
    }

    try {
      let [users, created] = await usersModel.findOrCreate({
        where: {
          [Op.or]: filters,
        },
        defaults: { ...simper },
      })

      if (created === false) {
        // mapping company to user
        const company_map = await pgsql.query(`select * from v_company_mapping where related_company_id = :id`, {
          replacements: { id: simper.company_id },
          type: QueryTypes.SELECT,
        })
        if (company_map.length) {
          simper.company_id = company_map[0].company_id
          simper.company = company_map[0].company_alias
        }

        for (let key in simper) {
          if (key === 'company_id') {
            // console.log(key);
            var checkCompany = simper[key] === users[key] ? true : false
          }

          let checkChange = simper[key] === users[key]

          if (checkChange === false || checkCompany === false) {
            let updateUser = await usersModel.update(simper, {
              where: { id: users.id },
            })
          }
        }
      }

      return users
    } catch (error) {
      console.error(`Error, when creating users`, error)
    }
  } catch (err) {
    console.error(`Error when save user and company`, err)
    return null
  }
}

syncUserAndCompany = async () => {
  var token = ''
  var resData = {}
  try {
    token = await getToken()
  } catch (error) {
    console.error('getToken error', error)
    // return response(res, 500, 'Server Error', null, {}, `getToken iSafe error: ${error}`)
  }

  try {
    resData = await fetchSimper(token)
  } catch (error) {
    console.error('fetchSimper error', error)
    // return response(res, 500, 'Server Error', null, {}, `fetchSimper iSafe error: ${error}`)
  }

  const { totalItems, totalPages, currentPage, simper } = resData.data
  try {
    await saveUserAndCompany(simper)
  } catch (error) {
    console.error('saveUserAndCompany error', error)
    // return response(res, 500, 'Server Error', null, {}, `saveUserAndCompany iSafe error: ${error}`)
  }

  for (let i = 2; i <= totalPages; i++) {
    var resData2 = {}
    try {
      resData2 = await fetchSimper(token, i)
    } catch (error) {
      console.error('fetchSimper error', error)
      // return response(res, 500, 'Server Error', null, {}, `fetchSimper iSafe in loop error: ${error}`)
    }
    const { simper: simper2 } = resData2.data

    try {
      await saveUserAndCompany(simper2)
    } catch (error) {
      console.error('saveUserAndCompany error', error)
      // return response(res, 500, 'Server Error', null, {}, `saveUserAndCompany iSafe in loop error: ${error}`)
    }
  }
}

// users module
iCore.getUser = async (req, res) => {
  fetchUserSimper.process(function (job, done) {
    // transcode image asynchronously and report progress
    // job.progress(42);
    syncUserAndCompany()
    // call done when finished
    done()
    // throw new Error('some unexpected error');
  })

  fetchUserSimper.add({})

  return response(res, 200, 'OK', 'Success Import Data')
}

module.exports = iCore
