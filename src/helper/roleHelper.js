const { ForbiddenError } = require('./customErrorHelper')

const checkAccess = (role, allowedRole) => {
  if (!allowedRole.includes(Number(role))) {
    console.log('Access Denied')
    throw new ForbiddenError('Access Denied')
  }
}

const superAndAdminOnly = (req, res, next) => {
  const accessRole = [1, 2]
  const roleId = Number(res?.user_info?.roles[0].roles_id) || 0

  if (accessRole.includes(roleId)) return next()

  console.log('Access Denied')
  throw new ForbiddenError('Access Denied')
}

const superAdminOnly = (req, res, next) => {
  const accessRole = [1]
  const roleId = Number(res?.user_info?.roles[0].roles_id) || 0

  if (accessRole.includes(roleId)) return next()

  console.log('Access Denied')
  throw new ForbiddenError('Access Denied')
}

module.exports = {
  checkAccess,
  superAdminOnly,
  superAndAdminOnly,
}
