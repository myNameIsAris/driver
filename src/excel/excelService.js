const ExcelJs = require('exceljs')
const { ValidationError } = require('../helper/customErrorHelper')

const exportContract = async (datas) => {
  // Create Excel
  const woorkBook = new ExcelJs.Workbook()
  const woorkSheet = woorkBook.addWorksheet('Contract')

  // Create Headers
  const header = woorkSheet.addRow([
    'No',
    'Contract Number',
    'Name',
    'Contract Type',
    'Contract',
    'Remaining Budget',
    'Budget',
    'Vendor',
    'Start Date',
    'End Date',
    'Scope of Work',
    'Term of Payments',
    'Created By',
    'Contract Owner',
    'Status',
  ])

  // Styling Header
  header.eachCell((cell, number) => {
    cell.alignment = {
      horizontal: 'center',
    }
    cell.font = { bold: true, size: 12 }
  })

  let count = 1
  for (const data of datas) {
    // data.term_of_payments = JSON.parse(data.term_of_payments)
    const {
      no,
      name,
      typeContract,
      contract,
      remaining_budget,
      budget,
      vendor,
      start_date,
      end_date,
      scope_of_work,
      term_of_payments,
      user,
      owner,
      status,
    } = data

    // Format Term Of Payments
    let newTerm = ''
    for (let i = 0; i < term_of_payments.length; i++) {
      const term = term_of_payments[i]
      newTerm += `${term.term} : ${term.percentage}%`
      newTerm += i !== term_of_payments.length - 1 ? ', ' : ''
    }

    const row = [
      count,
      no,
      name,
      typeContract.name,
      contract,
      remaining_budget,
      budget,
      vendor,
      start_date,
      end_date,
      scope_of_work,
      newTerm,
      user.fullname,
      owner.fullname,
      status,
    ]

    // Create Row
    woorkSheet.addRow(row)

    count++
  }

  // Adjust Width and Font
  woorkSheet.columns.forEach((column, columnNumber) => {
    let maxLength = 0
    column.eachCell({ includeEmpty: true }, (cell) => {
      const length = String(cell.value).length
      if (length > maxLength) {
        maxLength = length
      }
    })
    column.width = maxLength < 10 ? 10 : maxLength
  })

  // Create Buffer
  const buffer = await woorkBook.xlsx.writeBuffer()

  return buffer
}

const importContract = async (file) => {
  // Check File
  if (!file) {
    console.log('Invalid Request')
    throw new ValidationError('Invalid Request')
  }

  // Read Excel
  const woorkBook = new ExcelJs.Workbook()
  await woorkBook.xlsx.readFile('/..' + file.tempFilePath, {
    ignoreNodes: ['dataValidations'],
  })

  // Field Excel
  const field = [
    'no',
    'name',
    'type_contract',
    'contract',
    'contract_owner',
    'budget',
    'vendor',
    'start_date',
    'end_date',
    'scope_of_work',
    'term_of_payments',
  ]

  // Read Worksheet
  const result = []
  const woorkSheet = woorkBook.worksheets[0]

  // Create Data
  woorkSheet.eachRow(function (row, rowNumber) {
    const data = {}
    if (rowNumber !== 1)
      // Get Cell
      row.eachCell(function (cell, colNumber) {
        // Formatting Data
        if (field[colNumber - 1] === 'term_of_payments') {
          const termOfPayments = cell.value.split(', ')
          const allTerms = []
          // For Term Of Payments
          for (const terms of termOfPayments) {
            let [term, percentage] = terms.split(' : ')
            percentage = Number(percentage.slice(0, -1))
            allTerms.push({
              term,
              percentage,
            })
          }
          data[field[colNumber - 1]] = allTerms
        } else data[field[colNumber - 1]] = cell.value
      })
    if (Object.entries(data).length > 0) result.push(data)
  })

  return result
}

module.exports = { exportContract, importContract }
