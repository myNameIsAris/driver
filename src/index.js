require('./db')
const express = require('express')
const cron = require('node-cron')
const app = express()
const router = require('./router')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 6969
const fileupload = require('express-fileupload')

const { errorMiddleware } = require('./helper/error')

app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
)
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/driver/api', router)
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
