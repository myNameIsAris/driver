const { Op } = require('sequelize')
const moment = require('moment')
const { pgsql } = require('../db')

const { getPagination, getPagingData } = require('./paginationHelper')
const { ValidationError, NotFoundError } = require('./customErrorHelper')

class CrudService {
  constructor() {}

  static async createData(body, model) {
    try {
      let newBody = {}
      let arrCheckField = []
      for (let key in body) {
        let checkField = Object.keys(model.rawAttributes).find((x) => x === key)

        if (checkField !== undefined) {
          arrCheckField.push(checkField)
          const { [key]: newKey } = body
          newBody[key] = newKey
        }
      }

      // arrCheckField.find((x) => {
      // 	console.log(`X at crudService ${x}`);
      // 	if (x === undefined) {
      // 		throw new ValidationError(`Invalid Field`);
      // 	}
      // });
      const createData = await model
        .create(newBody, { fields: Object.keys(model.rawAttributes) })
        .then((result) => {
          return result
        })
        .catch((err) => {
          console.error(err)
          console.error(`Error while creating data for model : ${model.tableName} data : ${JSON.stringify(body)} with error message : ${err.message}`)
          throw new Error(`Error while creating data`)
        })

      return createData
    } catch (error) {
      throw error
    }
  }

  static async getAllData(pageSize, pageNumber, search, order, filter, model, include = []) {
    const { limit, offset } = getPagination(pageNumber, pageSize)
    let searchCondition = {}
    let filterCondition = {}
    console.log('model.rawAttributes', model.rawAttributes)
    for (let key in model.rawAttributes) {
      // console.log('Field: ', key) // this is name of the field
      // console.log('Type: ', model.rawAttributes[key].type.key) // Sequelize type of field

      if (search) {
        if (search.match(new RegExp(/([0-9])/g))) {
          if (search.includes('-')) {
            if (model.rawAttributes[key].type.key === 'DATE') {
              if (search.match(new RegExp(/([0-9]+)-([0-9]+)-([0-9]+)/g))) {
                searchCondition[key] = pgsql.literal(`TO_CHAR("${model.tableName}"."${key}"::DATE, 'yyyy-mm-dd') = '${search}' `)
              } else if (search.match(new RegExp(/([0-9]+)-([0-9]+)/g))) {
                searchCondition[key] = pgsql.literal(`TO_CHAR("${model.tableName}"."${key}"::DATE, 'yyyy-mm') = '${search}' `)
              }
            }
          } else {
            if (model.rawAttributes[key].type.key === 'INTEGER') {
              if (key !== 'id') {
                searchCondition[key] = { [Op.eq]: search }
              }
            } else if (model.rawAttributes[key].type.key === 'DATE') {
              searchCondition[key] = pgsql.literal(`TO_CHAR("${model.tableName}"."${key}"::DATE, 'yyyy') = '${search}' `)
            }
          }
        } else {
          if (model.rawAttributes[key].type.key === 'STRING') {
            searchCondition[key] = { [Op.iLike]: `%${search}%` }
          }
        }
      }

      for (let keyFilter in filter) {
        if (keyFilter === key) {
          if (model.rawAttributes[keyFilter].type.key === 'STRING' || model.rawAttributes[keyFilter].type.key === 'TEXT') {
            filterCondition[keyFilter] = { [Op.iLike]: `%${filter[keyFilter]}%` }
          } else if (model.rawAttributes[keyFilter].type.key === 'INTEGER') {
            filterCondition[keyFilter] = { [Op.eq]: filter[keyFilter] }
          } else if (model.rawAttributes[keyFilter].type.key === 'BOOLEAN') {
            filterCondition[keyFilter] = { [Op.eq]: filter[keyFilter] }
          }
        }
      }
    }

    const searchQuery = search ? { [Op.or]: searchCondition } : null
    const filterQuery = filter ? filterCondition : null
    const orderQuery = model.rawAttributes.id ? (order ? (order.includes(',') ? [order.split(',')] : [['id', `${order}`]]) : [['id', 'ASC']]) : []
    const isDeleted = model.rawAttributes.is_deleted ? (!filter.is_deleted ? { is_deleted: false } : '') : null

    // if (!model.rawAttributes.is_deleted) {
    // 	isDeleted = null;
    // }
    // if (!model.rawAttributes.id) {
    // 	orderQuery = [];
    // }

    console.log('Search Query:', searchQuery)
    console.log('Order Query:', orderQuery)
    console.log('Filter Query:', filterQuery)

    try {
      let countData = await model
        .findAndCountAll({
          where: {
            [Op.and]: { ...filterQuery, ...searchQuery, ...isDeleted },
          },
          order: [...orderQuery],
          limit: limit,
          offset: offset,
          include: include,
          logging: console.log,
        })
        .then((result) => {
          return result
        })
        .catch((err) => {
          console.error(err)
          console.error(`Error while counting data for model : ${model.tableName} with error message : ${err.message}`)
          throw new Error(`Error while counting data for model : ${model.tableName} with error message : ${err.message}`)
        })

      let data = await model
        .findAll({
          where: {
            [Op.and]: { ...filterQuery, ...searchQuery, ...isDeleted },
          },
          order: [...orderQuery],
          limit: limit,
          offset: offset,
          include: include,
          logging: console.log,
        })
        .then((result) => {
          return result
        })
        .catch((err) => {
          console.error(err)
          console.error(`Error while getting data for model: ${model.tableName} with error message : ${err.message}`)
          throw new Error(`Error while getting data for model : ${model.tableName} with error message : ${err.message}`)
        })

      let newData = JSON.parse(JSON.stringify(data))
      newData.map((x) => {
        x.created_at = moment(x.created_at).format()
        x.updated_at = moment(x.updated_at).format()
      })

      countData.rows = newData

      return getPagingData(countData, pageNumber, limit)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  static async getData(filter, model) {
    let filterCondition = {}
    for (let key in model.rawAttributes) {
      for (let keyFilter in filter) {
        if (keyFilter === key) {
          if (model.rawAttributes[keyFilter].type.key === 'STRING') {
            filterCondition[keyFilter] = { [Op.iLike]: `%${filter[keyFilter]}%` }
          } else if (model.rawAttributes[keyFilter].type.key === 'INTEGER') {
            filterCondition[keyFilter] = { [Op.eq]: filter[keyFilter] }
          } else if (model.rawAttributes[keyFilter].type.key === 'BOOLEAN') {
            filterCondition[keyFilter] = { [Op.eq]: filter[keyFilter] }
          }
        }
      }
    }

    const filterQuery = filter ? filterCondition : null

    console.log('Filter Query:', filterQuery)
    try {
      let findOne = await model
        .findOne({
          where: {
            [Op.and]: { ...filterQuery },
          },
        })
        .then((result) => {
          return result
        })
        .catch((err) => {
          console.error(err)
          console.error(`Error while getting data for model: ${model.tableName} with error message : ${err.message}`)
          throw new Error(`Error while getting data for model : ${model.tableName} with error message : ${err.message}`)
        })

      return findOne
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  static async getDataById(id, model) {
    try {
      let findOne = await model
        .findOne({
          where: {
            id: id,
          },
          logging: console.log,
        })
        .then((result) => {
          if (result === null) {
            throw new NotFoundError(`Not Found Data For Id : ${id}`)
          }
          return result
        })
        .catch((err) => {
          if (err.name === 'NotFoundError') {
            throw err
          } else {
            console.error(err)
            console.error(`Error while getting data for model : ${model.tableName} id : ${id} with error message : ${err.message}`)
            throw new Error(`Error while getting data for model : ${model.tableName} id : ${id} with error message : ${err.message}`)
          }
        })
      return findOne
    } catch (error) {
      throw error
    }
  }

  static async updateData(id, body, model) {
    try {
      let arrCheckField = []
      let newBody = {}
      for (let key in body) {
        let checkField = Object.keys(model.rawAttributes).find((x) => x === key)

        if (checkField !== undefined) {
          arrCheckField.push(checkField)
          const { [key]: newKey } = body
          newBody[key] = newKey
        }
      }

      // arrCheckField.find((x) => {
      // 	// console.log(x)
      // 	if (x === undefined) {
      // 		throw new ValidationError(`Invalid Field`);
      // 	}
      // });

      let updateData = await model
        .update(body, { where: { id: id }, logging: console.log })
        .then(async (result) => {
          if (result[0] > 0) {
            return await model
              .findOne({
                where: {
                  id: id,
                },
                logging: console.log,
              })
              .then((result) => {
                return result
              })
              .catch((err) => {
                throw err
              })
          } else {
            throw new NotFoundError(`No Data Updated`)
          }
        })
        .catch((err) => {
          if (err.name === 'NotFoundError') {
            throw err
          } else {
            console.error(err)
            console.error(`Error while updating data for model : ${model.tableName} id : ${id} with error message : ${err.message}`)
            throw new Error(`Error while updating data for model : ${model.tableName} id : ${id} with error message : ${err.message}`)
          }
        })

      return updateData
    } catch (error) {
      throw error
    }
  }

  static async deleteData(id, model) {
    try {
      let deleteData = await model
        .update(
          {
            is_deleted: true,
          },
          {
            where: {
              id: id,
            },
            logging: console.log,
          }
        )
        .then(async (result) => {
          if (result[0] > 0) {
            return await model
              .findOne({
                where: {
                  id: id,
                },
                logging: console.log,
              })
              .then((result) => {
                return result
              })
              .catch((err) => {
                throw err
              })
          } else {
            throw new NotFoundError(`No Data Deleted`)
          }
        })
        .catch((err) => {
          if (err.name === 'NotFoundError') {
            throw err
          } else {
            console.error(err)
            console.error(`Error while deleting data for model : ${model.tableName} id : ${id} with error.message : ${err.message}`)
            throw new Error(`Error while deleting data for model : ${model.tableName} id : ${id} with error.message : ${err.message}`)
          }
        })

      return deleteData
    } catch (error) {
      throw error
    }
  }
}

module.exports = { CrudService }
