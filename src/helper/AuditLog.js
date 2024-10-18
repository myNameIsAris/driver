require('dotenv').config()
const axios = require('axios')
async function auditLog(req, message, status) {
  try {
    console.log('Preparing to send audit log')
    const token = req.headers['authorization']
    const path_api = `${req.baseUrl}${req.route.path}`
    const payload = {
      env: process.env.NODE_ENV || 'DEV',
      payload: req.body,
      path: path_api,
      status: status,
      info: message,
      url: 'https://api.ugems.id' + req.originalUrl,
      service_id: '081a421d-a5b9-4314-8c24-eb79685565ce',
      request_method: req.method.toUpperCase(),
    }

    console.log('====== Send Audit Trail ======')
    console.log('payload', payload)
    console.log('token', token)

    // await axios.post('http://audit_trail:3102/audit-trail/create-log', payload)

    // http://audit_trail:3102
    // try {
    //   console.log('Test A')
    //   await axios.post('http://audit_trail:3102/api/audit-trail/create-log', payload, {
    //     proxy: {
    //       protocol: 'http',
    //       host: '10.12.51.11',
    //       port: 3128,
    //     },
    //   })
    // } catch (err) {
    //   console.log('Error Test A', err.message)
    // }

    // try {
    //   console.log('Test B')
    //   await axios.post('http://audit_trail:3102/api/audit-trail/create-log', payload)
    // } catch (err) {
    //   console.log('Error Test B', err.message)
    // }

    // https://api.ugems.id
    try {
      console.log('Test C')
      await axios.post('https://api.ugems.id/api/audit-trail/create-log', payload, {
        headers: {
          Authorization: token,
        },
      })
    } catch (err) {
      console.log('Error Test C', err.message)
    }

    // try {
    //   console.log('Test D')
    //   await axios.post('https://api.ugems.id/api/audit-trail/create-log', payload, {
    //     proxy: {
    //       protocol: 'http',
    //       host: '10.12.51.11',
    //       port: 3128,
    //     },
    //   })
    // } catch (err) {
    //   console.log('Error Test D', err.message)
    // }

    // // http://10.12.51.13:3102
    // try {
    //   console.log('Test E')
    //   await axios.post('http://10.12.51.13:3102/api/audit-trail/create-log', payload)
    // } catch (err) {
    //   console.log('Error Test E', err.message)
    // }

    // try {
    //   console.log('Test F')
    //   await axios.post('http://10.12.51.13:3102/api/audit-trail/create-log', payload, {
    //     proxy: {
    //       protocol: 'http',
    //       host: '10.12.51.11',
    //       port: 3128,
    //     },
    //   })
    // } catch (err) {
    //   console.log('Error Test F', err.message)
    // }
    console.log('Success send audit log')
  } catch (err) {
    console.log('Error on send to audit trail api', err)
  }
}

module.exports = auditLog
