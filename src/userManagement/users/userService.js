const { pgsql } = require('../../db')
const { Op, QueryTypes } = require('sequelize')

const { ValidationError, NotFoundError } = require('../../helper/customErrorHelper')
const { getPagination, getPagingData } = require('../../helper/paginationHelper')
const { response } = require('../../helper/responseHelper')
const iCore = require('../../helper/iCoreHelper')
const keyCloak = require('../../helper/kcServiceHelper')
const sapSync = require('../../helper/sapServiceHelper')

// const { usersModel, employee } = require("../users/userModel");
const { usersModel } = require('../users/userModel')
const employee = require('../users/userModel')
const roleMapModel = require('../../admin/roleMapping/roleMappingModel')
const rolesModel = require('../../admin/roles/rolesModel')
const { default: axios } = require('axios')

class userService {
  constructor(params, body, user) {
    this.params = params
    this.body = body
    this.user = user
  }

  static async userIdentify(keycloak_user_id, user) {
    try {
      let userIdentify = await usersModel.findOne({
        where: {
          // [Op.or]: {
          [Op.and]: {
            keycloak_user_id: {
              [Op.iLike]: `%${keycloak_user_id}%`,
            },
            nik: user.nik,
          },
        },
        order: [['id', 'ASC']],
        include: [
          {
            model: roleMapModel,
            as: 'roleMap',
            include: [
              {
                model: rolesModel,
                as: 'roles',
                required: true,
              },
            ],
          },
        ],
      })

      if (!userIdentify) {
        throw new NotFoundError(`Sorry, there's not found user`)
      }

      userIdentify.dataValues.roles_uenroll = user.roles_uenrol || []

      return userIdentify
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  static async searchUsers(filter, limit, page) {
    try {
      let dataKeycloak
      try {
        let filterCondition = {}

        for (let key in employee.rawAttributes) {
          for (let keyFilter in filter) {
            if (keyFilter === key) {
              if (employee.rawAttributes[keyFilter].type.key === 'STRING') {
                filterCondition[keyFilter] = {
                  [Op.iLike]: `%${filter[keyFilter]}%`,
                }
              } else if (employee.rawAttributes[keyFilter].type.key === 'INTEGER') {
                filterCondition[keyFilter] = { [Op.eq]: filter[keyFilter] }
              }
            }
          }
        }

        const filterQuery = filter ? filterCondition : null

        // const sapData = await sapSync.getData()
        const sapDataFetch = await sapSync.fetchSap(limit, page, filter.fullname, filter.nik, filter.company)
        // const emp = await employee.findAll({ where: { [Op.and]: { ...filterQuery } } })

        dataKeycloak = sapDataFetch.map((x) => ({
          nik: x.nik ? x.nik : '',
          fullname: x.fullname ? x.fullname : '',
          no_ktp: x.no_ktp ? x.no_ktp : '',
          company: x.company_name ? x.company_name : '',
          position: x.position_title ? x.position_title : '',
          organizational_unit_name: x.organizational_unit_name ? x.organizational_unit_name : '',
          department: x.department ? x.department : '',
          divisi: x.divisi ? x.divisi : '',
          date_of_birth: x.birth_date ? x.birth_date : '',
          gender: x.gender_desc ? (x.gender_desc == 'Male' ? 'M' : x.gender_desc == 'Female' ? 'F' : 'F') : null,
          flag: 'Kc',
        }))
      } catch (error) {
        console.error(error)
        throw new Error(`Error when get data SAP`)
      }

      let newSet = [
        ...new Set([
          // ...dataSimper,
          ...dataKeycloak,
          // ...dataKeycloak.filter((d) => !RegExp(`(${name})`, 'gi').test(d.fullname) || !RegExp(`(${company})`).test(d.company) || !RegExp(`(${date_of_birth})`).test(d.date_of_birth)),
        ]),
      ]

      return newSet
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async getAll() {
    try {
      const { role_id, divisi, department, organizational_unit_name, nik } = this.params
      const filters = {}
      const filters_role = {}

      if (divisi) {
        filters['divisi'] = {
          [Op.iLike]: `%${divisi}%`,
        }
      }

      if (department) {
        filters['department'] = {
          [Op.iLike]: `%${department}%`,
        }
      }

      if (organizational_unit_name) {
        filters['organizational_unit_name'] = {
          [Op.iLike]: `%${organizational_unit_name}%`,
        }
      }

      if (role_id) {
        filters_role['roles_id'] = {
          [Op.or]: role_id,
        }
      }

      if (nik) {
        filters['nik'] = {
          [Op.eq]: nik,
        }
      }

      console.log('===== Paramaters =====')
      console.log('role_id => ', role_id)
      console.log('divisi => ', divisi)
      console.log('department => ', department)
      console.log('organizational_unit_name => ', organizational_unit_name)
      console.log('nik => ', nik)
      console.log('======================')

      console.log(filters)
      console.log(filters_role)

      const users = await usersModel.findAll({
        where: filters,
        // include: [
        //   {
        //     model: roleMapModel,
        //     as: 'roleMap',
        //     where: filters_role,
        //     include: [
        //       {
        //         model: rolesModel,
        //         as: 'roles',
        //         required: true,
        //       },
        //     ],
        //   },
        // ],
      })
      return users
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getOrganizationalUnit() {
    const organizationalUnit = await usersModel.findAll({
      logging: console.log,
      attributes: ['organizational_unit_name'],
      where: {
        is_deleted: false,
      },
      include: [
        {
          model: roleMapModel,
          as: 'roleMap',
          where: {
            roles_id: 6,
          },
          attributes: [],
        },
      ],
      group: ['organizational_unit_name'],
    })

    return organizationalUnit
  }
  async getDivisi() {
    const { organizational_unit_name } = this.params
    const filters = { is_deleted: false }

    if (organizational_unit_name) {
      filters['organizational_unit_name'] = {
        [Op.iLike]: `%${organizational_unit_name}%`,
      }
    }

    console.log('filters', filters)
    const divisi = await usersModel.findAll({
      attributes: ['divisi'],
      where: filters,
      include: [
        {
          model: roleMapModel,
          as: 'roleMap',
          where: {
            roles_id: 6,
          },
          attributes: [],
        },
      ],
      group: ['divisi'],
    })

    return divisi
  }
  async getDepartments() {
    const { divisi, organizational_unit_name } = this.params
    const filters = { is_deleted: false }

    if (divisi) {
      filters['divisi'] = {
        [Op.iLike]: `%${divisi}%`,
      }
    }

    if (organizational_unit_name) {
      filters['organizational_unit_name'] = {
        [Op.iLike]: `%${organizational_unit_name}%`,
      }
    }

    console.log('filters', filters)
    const departments = await usersModel.findAll({
      attributes: ['department'],
      where: filters,
      include: [
        {
          model: roleMapModel,
          as: 'roleMap',
          where: {
            roles_id: 6,
          },
          attributes: [],
        },
      ],
      group: ['department'],
    })

    return departments
  }

  async getViewerFromUenroll() {
    // Get Request
    const { entity_type, entity_id } = this.params

    const admin = await axios.post(
      'https://iam.ugems.id/realms/master/protocol/openid-connect/token',
      {
        grant_type: 'password',
        client_id: 'admin-cli',
        username: 'admin',
        password: 'iam@ugems.id',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    const token = admin.data.access_token

    const userViewer = await axios.get('https://iam.ugems.id/admin/realms/ugems/clients/9951a5ec-7587-4b4b-b4f9-3065841ef9f2/roles/Viewer/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const userViewerMap = userViewer.data.map((user) => `'${user.id}'`).join(',')

    const viewer = await pgsql.query(
      `
      SELECT * 
      FROM users 
      WHERE (keycloak_user_id, id) IN (
          SELECT keycloak_user_id, MIN(id) 
          FROM users 
          WHERE keycloak_user_id IN (${userViewerMap})
          GROUP BY keycloak_user_id
      );
    `,
      { type: QueryTypes.SELECT }
    )

    for (const view of viewer) {
      const shared = await pgsql.query(
        `SELECT * FROM user_access WHERE user_id = '${view.id}' AND entity_type = '${entity_type}' AND entity_id = '${entity_id}'`,
        { type: QueryTypes.SELECT }
      )
      view.shared = shared.length > 0 ? shared[0] : null
    }

    return viewer

    // return userViewer.data
  }

  async getUserSAP() {
    const allUser = await axios.get('https://api.ugems.id/sap-sync/employee?limit=1100&page=1')

    return allUser.data?.data
  }
}

module.exports = { userService }
