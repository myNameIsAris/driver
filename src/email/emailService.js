require('dotenv').config()
const nodemailer = require('nodemailer')
const { newContractTemplate } = require('./template')
const { notificationModel, notificationContractMapModel } = require('../admin/notification/notificationModel')
const { NotFoundError } = require('../helper/customErrorHelper')
const { transformText } = require('../helper/textHelper')

const EMAIL_FROM = process.env.SMTP_EMAIL
const CONFIG = {
  port: process.env.SMTP_PORT,
  host: process.env.SMTP_HOST,
  auth: {
    user: EMAIL_FROM,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true,
}

if (process.env.SMTP_PORT !== '465') {
  CONFIG.secure = false
  CONFIG.tls = {
    rejectUnauthorized: false,
  }
}

const transporter = nodemailer.createTransport(CONFIG)

const sendContractEmail = async (notificationType, data) => {
  // const allEmail = [data.owner.email, data.user.email]
  // const sendTo = [...new Set(allEmail)]
  const sendTo = ['arisakhyar704@gmail.com']
  // const sendTo = ['mrafa7184@gmail.com']

  // Get Notification
  const notification = await notificationModel.findOne({
    where: {
      notification_type: notificationType,
    },
  })

  if (!notification) {
    console.log('Notification Not Found')
    throw new NotFoundError('Notification Not Found')
  }

  // Get Notification Contract Map
  const notifContractMap = await notificationContractMapModel.findOne({
    where: {
      notification_id: notification.id,
      contract_id: data.id,
    },
  })

  if (!notifContractMap) return

  // Send Email If Active
  if (notifContractMap.email_active) {
    const options = {
      from: EMAIL_FROM,
      to: sendTo,
      cc: JSON.parse(data.email_cc),
      bcc: JSON.parse(data.email_bcc),
      subject: transformText(transformText(notification.subject, data), notification).trim(),
      html: transformText(transformText(notification.template, data), notification),
    }
    console.log({ options })
    // await transporter.sendMail(options)
  }
}

const sendContractsEmail = async (typeEmail, data) => {
  for (const contract of data) {
    // const allEmail = [contract.owner.email, contract.user.email]
    // console.log([...new Set(allEmail)])
    // const sendTo = [...new Set(allEmail)]
    // const sendTo = ['mrafa7184@gmail.com']
    const sendTo = ['arisakhyar704@gmail.com']

    const options = {
      from: EMAIL_FROM,
      to: sendTo,
      subject: 'New Contract Created. Contract No. ' + contract.no,
    }
    if (typeEmail === 'New Contract') options.text = newContractTemplate(contract)
    // await transporter.sendMail(options)
  }
}

const sendEmailFromNotif = async (data) => {
  data.from = EMAIL_FROM
  await transporter.sendMail(data)
}

const sendEmail = async (options) => {
  // FOR TESTING
  const isTesting = false
  if (isTesting) {
    options.to = ['arisakhyar704@gmail.com']
    // options.cc = ['arisakhyarabdillah@gmail.com', 'mrafa7184@gmail.com', 'teukurazan3@gmail.com']
    options.cc = ['arisakhyarabdillah@gmail.com']
    options.bcc = ['abdillahaa17h@student.unhas.ac.id']
  }

  options.from = EMAIL_FROM
  console.log({ options })
  await transporter.sendMail(options)
}

module.exports = {
  sendContractEmail,
  sendContractsEmail,
  sendEmailFromNotif,
  sendEmail,
}
