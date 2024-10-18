const axios = require('axios')
const iCore = require('./iCoreHelper')

const { usersModel } = require('.././userManagement/users/userModel')
const roleMapModel = require('../admin/roleMapping/roleMappingModel')
const { NotFoundError } = require('./customErrorHelper')
const { response } = require('./responseHelper')

const trimString = (str) => {
  try {
    str = str.trim()
    return str
  } catch (err) {
    return str
  }
}

const responseData = {}

responseData.introspect = async (req, res, next) => {
  let token = req.headers.authorization
  console.log('token', token)

  try {
    if (!token) {
      return response(res, 401, 'Unauthorized User', null, 'Authorization Token not found')
    }

    const resp = await axios.get('https://iam.ugems.id/realms/ugems/protocol/openid-connect/userinfo', {
      headers: {
        Authorization: token,
      },
    })

    if (resp && resp.data && resp.data.sub) {
      const data = resp.data
      const keycloak_id = data.sub
      let account_type = 'OTHERS'

      const keycloak_name = data.name
      const keycloak_email = data.email
      console.log('keycloak_id', keycloak_id)
      console.log('keycloak_email', keycloak_email)
      let user = await usersModel.findOne({
        where: {
          keycloak_user_id: keycloak_id,
        },
      })

      // base payload
      let payload = {}
      if (keycloak_id.length > 36) {
        account_type = 'ISAFE'
        console.log('Keycloak user not from SAP, could be ISAFE', keycloak_id)
        let id = resp.data.sub.length
        let idx = resp.data.sub.lastIndexOf(':')
        let result = resp.data.sub.substring(idx + 1, id.length)
        const isafeNo = result

        const token = await iCore.getToken()
        const iSafe = await iCore.fetchSimper(token, 1, 1, isafeNo, null, null, null, 'PT Borneo Indobara')
        const simper = iSafe.data.simper[0]

        payload = {
          keycloak_user_id: keycloak_id,
          isafe_no: isafeNo,
          nik: trimString(simper.nik),
          no_ktp: trimString(simper.no_ktp),
          fullname: trimString(resp.data.name),
          gender: trimString(simper.gender),
          date_of_birth: trimString(simper.date_of_birth),
          place_of_birth: trimString(simper.place_of_birth),
          blood_type: trimString(simper.blood_type),
          emergency_contact: trimString(simper.emergency_contact),
          contact: trimString(simper.contact),
          email: trimString(simper.email || keycloak_email),
          id_position: trimString(simper.id_position),
          position: trimString(simper.position),
          id_department: trimString(simper.id_department),
          department: trimString(simper.department),
          company: trimString(simper.company),
          account_type: account_type,
        }
      } else {
        // search on SAP-sync API
        const nik = trimString(data.nik)
        const sapAPIUrl = `https://api.ugems.id/sap-sync/employee?page=1&limit=1&nik=${nik}`
        const sapData = await axios.get(sapAPIUrl)
        let SAP = {}
        if (sapData.data && sapData.data.length > 0) {
          console.log('User found with nik', nik)
          SAP = sapData.data.data[0]
          account_type = 'SAP'
        }

        payload = {
          keycloak_user_id: keycloak_id,
          fullname: keycloak_name,
          nik: nik,
          gender: trimString(SAP.gender),
          date_of_birth: trimString(SAP.birth_date),
          place_of_birth: trimString(SAP.place_of_birth),
          blood_type: trimString(data.blood_type),
          emergency_contact: trimString(SAP.emergency_contact),
          contact: trimString(data.phone_no),
          email: trimString(SAP.email || keycloak_email),
          id_position: trimString(SAP.position_id),
          position: trimString(SAP.position_title),
          id_department: null,
          department: trimString(SAP.department),
          company_id: trimString(SAP.company_code),
          company: trimString(SAP.company_name),
          organizational_unit: trimString(SAP.organizational_unit),
          organizational_unit_name: trimString(SAP.organizational_unit_name),
          divisi: trimString(SAP.divisi),
          account_type: account_type,
        }
      }

      // update or create user and company
      try {
        console.log(`saveUserAndCompany ${payload}`)
        await iCore.saveUserAndCompany(payload)
      } catch (err) {
        console.error('Error, when saveUserAndCompany', err)
      }

      // get user data
      user = await usersModel.findOne({
        raw: true,
        where: {
          keycloak_user_id: keycloak_id,
        },
      })

      // get user roles
      const roles = await roleMapModel.findAll({
        raw: true,
        where: {
          user_id: user.id,
        },
      })

      // get user roles
      const rolesFromUenroll = resp?.data?.resource_access?.ubudget?.roles
      user.roles_uenrol = rolesFromUenroll ?? []
      user.roles = roles
      res.keycloak = resp.data
      res.user_info = user

      next()
    } else {
      console.log('User not found on keycloak')
      throw NotFoundError('User not found on keycloak')
    }
  } catch (error) {
    console.error('Error on kcServiceHelper', error.message)
    if (error.name === 'ValidationError') {
      return response(res, 400, 'Bad Request', null, {}, error.message)
    } else if (error.name === 'NotFoundError') {
      return response(res, 404, 'Not Found', null, {}, error.message)
    }
    return response(res, 500, 'Internal Server Error', null, {}, error.message)
  }
}

module.exports = responseData
