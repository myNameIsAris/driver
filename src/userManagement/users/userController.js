const auditLog = require('../../helper/AuditLog')
const { response } = require('../../helper/responseHelper')

const { userService } = require('./userService')

const userIdentify = async (req, res) => {
  try {
    var user_info = res.user_info

    let identifyUser = await userService.userIdentify(user_info.keycloak_user_id, user_info)

    console.log('userIdentify...', identifyUser)
    console.log('user_info...', user_info)
    await auditLog(req, 'Success Get User Identify', 200)

    return response(res, 200, 'OK', 'Success Get User Identify', identifyUser)
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      await auditLog(req, 'Bad Request', 400)
      return response(res, 400, 'Bad Request', null, {}, error.message)
    } else if (error.name === 'NotFoundError') {
      await auditLog(req, 'Not Found', 404)
      return response(res, 404, 'Not Found', null, {}, error.message)
    }

    await auditLog(req, 'Internal Server Error', 500)
    return response(res, 500, 'Internal Server Error', null, {}, error.message)
  }
}

const searchUsers = async (req, res) => {
  try {
    var userInfo = res.user_info
    let { limit, page, search, order } = req.query

    let filter = {}
    for (const key in req.query) {
      if (key !== 'limit' && key !== 'page' && key !== 'search' && key !== 'order') {
        if (key === 'date_of_birth') {
          filter['birth_date'] = req.query[key].trim()
        } else {
          filter[key] = req.query[key].trim()
        }
      }
    }

    if (userInfo.company_name) {
      let company_name = userInfo.company_name.toUpperCase()
      const checkIndex = company_name.indexOf('PT.')
      if (checkIndex < 0) {
        company_name = company_name.replace('PT', 'PT.')
      }
      filter = { ...filter, ...{ company_name: company_name } }
    }

    console.log('FILTER =>', filter)

    let getUsers = await userService.searchUsers(filter, limit, page)
    await auditLog(req, 'Success Get All Data', 200)

    return response(res, 200, 'OK', 'Success Get All Data', getUsers)
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      await auditLog(req, 'Bad Request', 400)
      return response(res, 400, 'Bad Request', null, {}, error.message)
    } else if (error.name === 'NotFoundError') {
      await auditLog(req, 'Not Found', 404)
      return response(res, 404, 'Not Found', null, {}, error.message)
    }

    await auditLog(req, 'Internal Server Error', 500)
    return response(res, 500, 'Internal Server Error', null, {}, error.message)
  }
}

const getAll = async (req, res) => {
  try {
    const user = res.user_info
    const body = req.body
    const paramaters = { ...req.query, ...req.params }
    const service = new userService(paramaters, body, user)
    const data = await service.getAll()
    await auditLog(req, 'Success Get Users', 200)

    console.log('Success Get Users')
    return response(res, 200, 'OK', 'Success Get Users', data)
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      await auditLog(req, 'Bad Request', 400)
      return response(res, 400, 'Bad Request', null, {}, error.message)
    } else if (error.name === 'NotFoundError') {
      await auditLog(req, 'Not Found', 404)
      return response(res, 404, 'Not Found', null, {}, error.message)
    }

    await auditLog(req, 'Internal Server Error', 500)
    return response(res, 500, 'Internal Server Error', null, {}, error.message)
  }
}

const getOrganizationalUnit = async (req, resp) => {
  try {
    const user = resp.user_info
    const body = req.body
    const paramaters = { ...req.query, ...req.params }
    const service = new userService(paramaters, body, user)
    const data = await service.getOrganizationalUnit()
    console.log('Succss get Organizational Unit')
    await auditLog(req, 'Success get Organizational Unit', 200)

    return response(resp, 200, 'OK', 'Success get Organizational Unit', data)
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      await auditLog(req, 'Bad Request', 400)
      return response(res, 400, 'Bad Request', null, {}, error.message)
    } else if (error.name === 'NotFoundError') {
      await auditLog(req, 'Not Found', 404)
      return response(res, 404, 'Not Found', null, {}, error.message)
    }

    await auditLog(req, 'Internal Server Error', 500)
    return response(res, 500, 'Internal Server Error', null, {}, error.message)
  }
}

const getDivisi = async (req, resp) => {
  try {
    const user = resp.user_info
    const body = req.body
    const paramaters = { ...req.query, ...req.params }
    const service = new userService(paramaters, body, user)
    const data = await service.getDivisi()
    console.log('Succss get Divisi')
    await auditLog(req, 'Success get Divisi', 200)

    return response(resp, 200, 'OK', 'Success get Divisi', data)
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      await auditLog(req, 'Bad Request', 400)
      return response(res, 400, 'Bad Request', null, {}, error.message)
    } else if (error.name === 'NotFoundError') {
      await auditLog(req, 'Not Found', 404)
      return response(res, 404, 'Not Found', null, {}, error.message)
    }

    await auditLog(req, 'Internal Server Error', 500)
    return response(res, 500, 'Internal Server Error', null, {}, error.message)
  }
}

const getDepartments = async (req, resp) => {
  try {
    const user = resp.user_info
    const body = req.body
    const paramaters = { ...req.query, ...req.params }
    const service = new userService(paramaters, body, user)
    const data = await service.getDepartments()
    console.log('Succss get Departments')
    await auditLog(req, 'Success get Departments', 200)

    return response(resp, 200, 'OK', 'Success get Departments', data)
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      await auditLog(req, 'Bad Request', 400)
      return response(res, 400, 'Bad Request', null, {}, error.message)
    } else if (error.name === 'NotFoundError') {
      await auditLog(req, 'Not Found', 404)
      return response(res, 404, 'Not Found', null, {}, error.message)
    }

    await auditLog(req, 'Internal Server Error', 500)
    return response(res, 500, 'Internal Server Error', null, {}, error.message)
  }
}

const getUserSAP = async (req, res) => {
  try {
    const user = res.user_info
    const body = req.body
    const paramaters = { ...req.query, ...req.params }
    const service = new userService(paramaters, body, user)
    const data = await service.getUserSAP()
    console.log('Succss User from SAP')
    await auditLog(req, 'Success get Users', 200)

    return response(res, 200, 'OK', 'Success get Users from SAP', data)
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      await auditLog(req, 'Bad Request', 400)
      return response(res, 400, 'Bad Request', null, {}, error.message)
    } else if (error.name === 'NotFoundError') {
      await auditLog(req, 'Not Found', 404)
      return response(res, 404, 'Not Found', null, {}, error.message)
    }

    await auditLog(req, 'Internal Server Error', 500)
    return response(res, 500, 'Internal Server Error', null, {}, error.message)
  }
}

const getViewerFromUenroll = async (req, res) => {
  try {
    const user = res.user_info
    const body = req.body
    const paramaters = { ...req.query, ...req.params }
    const service = new userService(paramaters, body, user)
    const data = await service.getViewerFromUenroll()
    console.log('Succss get Viewer From Uenroll')
    await auditLog(req, 'Success get Viewer From Uenroll', 200)

    return response(res, 200, 'OK', 'Success get Viewer From Uenroll', data)
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      await auditLog(req, 'Bad Request', 400)
      return response(res, 400, 'Bad Request', null, {}, error.message)
    } else if (error.name === 'NotFoundError') {
      await auditLog(req, 'Not Found', 404)
      return response(res, 404, 'Not Found', null, {}, error.message)
    }

    await auditLog(req, 'Internal Server Error', 500)
    return response(res, 500, 'Internal Server Error', null, {}, error.message)
  }
}

module.exports = {
  userIdentify,
  searchUsers,
  getOrganizationalUnit,
  getDivisi,
  getDepartments,
  getAll,
  getUserSAP,
  getViewerFromUenroll,
}
