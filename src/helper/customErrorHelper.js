class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
  }
}
class AuthenticationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'AuthenticationError'
  }
}
class ForbiddenError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ForbiddenError'
  }
}

module.exports = { ValidationError, NotFoundError, AuthenticationError, ForbiddenError }
