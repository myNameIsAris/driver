const ExcelJs = require('exceljs')

const importPlanExcel = async (file) => {
  const workbook = new ExcelJs.Workbook()
  await workbook.xlsx.readFile('/..' + file.tempFilePath)

  //   Get Worksheet
  const opexSheet = workbook.getWorksheet('OPEX')
  const capexSheet = workbook.getWorksheet('CAPEX')

  // Opex Variabel
  const resultOpex = []
  let newAccountOpex = {}
  let budgetItemOpex = []
  let budgetOpex = []

  // Read Opex
  opexSheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) {
      // Check TT Account
      if (row.values[2]?.length === 2) {
        if (rowNumber !== 2) budgetItemOpex[budgetItemOpex.length - 1].budget = budgetOpex
        resultOpex.push({ ...newAccountOpex, budget_item: budgetItemOpex })
        newAccountOpex = {}
        budgetItemOpex = []
        budgetOpex = []
        newAccountOpex.account = row.values[2]
      } else if (row.values[2]?.length === 5) {
        if (budgetItemOpex.length > 0) budgetItemOpex[budgetItemOpex.length - 1].budget = budgetOpex
        budgetOpex = []
        budgetItemOpex.push({ budget_item: row.values[2], fund: row.values[17], gl_code: row.values[1] })
      } else if (!row.values[2] && row.values[3]) {
        budgetOpex.push({
          name: row.values[3],
          jan: row.values[4],
          feb: row.values[5],
          mar: row.values[6],
          apr: row.values[7],
          may: row.values[8],
          jun: row.values[9],
          jul: row.values[10],
          aug: row.values[11],
          sep: row.values[12],
          oct: row.values[13],
          nov: row.values[14],
          dec: row.values[15],
          total: typeof row.values[16] === 'object' ? row.values[16].result : row.values[16],
        })
      }
    }
  })

  // Insert Last Row of Opex
  budgetItemOpex[budgetItemOpex.length - 1].budget = budgetOpex
  resultOpex.push({ ...newAccountOpex, budget_item: budgetItemOpex })

  // Capex Variabel
  const resultCapex = []
  let newAccountCapex = {}
  let budgetCapex = []

  // Read Capex
  capexSheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) {
      if (row.values[2]?.length === 2) {
        resultCapex.push({ ...newAccountCapex, budget: budgetCapex })
        newAccountCapex = {}
        budgetCapex = []
        newAccountCapex.account = row.values[2]
        newAccountCapex.gl_code = row.values[1]
        newAccountCapex.fund = row.values[17]
      } else if (!row.values[2] && row.values[3]) {
        budgetCapex.push({
          name: row.values[3],
          jan: row.values[4],
          feb: row.values[5],
          mar: row.values[6],
          apr: row.values[7],
          may: row.values[8],
          jun: row.values[9],
          jul: row.values[10],
          aug: row.values[11],
          sep: row.values[12],
          oct: row.values[13],
          nov: row.values[14],
          dec: row.values[15],
          total: typeof row.values[16] === 'object' ? row.values[16].result : row.values[16],
        })
      }
    }
  })

  // Insert Last Row of Capex
  resultCapex.push({ ...newAccountCapex, budget: budgetCapex })

  return {
    opex: resultOpex.splice(1),
    capex: resultCapex.splice(1),
  }
}

// REPORT BUDGET PLAN

const exportReportBudgetPlan = async (data) => {
  // Create Excel
  const woorkBook = new ExcelJs.Workbook()
  const { opex, capex } = data

  // Create Header
  const HEADER = [
    { header: 'GL Code', key: 'gl_code', width: 10 },
    { header: 'Account', key: 'account', width: 10 },
    { header: 'Budget Item', key: 'budget_item', width: 10 },
    { header: 'Jan', key: 'jan', width: 10 },
    { header: 'Feb', key: 'feb', width: 10 },
    { header: 'Mar', key: 'mar', width: 10 },
    { header: 'Apr', key: 'apr', width: 10 },
    { header: 'May', key: 'may', width: 10 },
    { header: 'Jun', key: 'jun', width: 10 },
    { header: 'Jul', key: 'jul', width: 10 },
    { header: 'Aug', key: 'aug', width: 10 },
    { header: 'Sep', key: 'sep', width: 10 },
    { header: 'Oct', key: 'oct', width: 10 },
    { header: 'Nov', key: 'nov', width: 10 },
    { header: 'Dec', key: 'dec', width: 10 },
    { header: 'Total', key: 'total', width: 10 },
  ]

  // Insert Data
  if (opex) {
    let woorkSheet = woorkBook.addWorksheet('OPEX')
    woorkSheet.columns = HEADER

    for (const opexItem of opex) {
      for (const opexItemItem of opexItem.opex_item) {
        for (const budget of opexItemItem.budget) {
          woorkSheet.addRow({
            gl_code: opexItemItem.opex_gl.gl_code,
            account: opexItem.account.account,
            budget_item: budget.name,
            jan: Number(budget.jan),
            feb: Number(budget.feb),
            mar: Number(budget.mar),
            apr: Number(budget.apr),
            may: Number(budget.may),
            jun: Number(budget.jun),
            jul: Number(budget.jul),
            aug: Number(budget.aug),
            sep: Number(budget.sep),
            oct: Number(budget.oct),
            nov: Number(budget.nov),
            dec: Number(budget.dec),
            total: Number(budget.total),
          })
        }
      }
    }

    // Adjust Width
    woorkSheet = adjustWidth(woorkSheet)
  }

  if (capex) {
    let woorkSheet = woorkBook.addWorksheet('CAPEX')
    woorkSheet.columns = HEADER

    for (const capexItem of capex) {
      for (const budget of capexItem.budget) {
        woorkSheet.addRow({
          gl_code: capexItem.capex_gl.gl_code,
          account: capexItem.account.account,
          budget_item: budget.name,
          jan: Number(budget.jan),
          feb: Number(budget.feb),
          mar: Number(budget.mar),
          apr: Number(budget.apr),
          may: Number(budget.may),
          jun: Number(budget.jun),
          jul: Number(budget.jul),
          aug: Number(budget.aug),
          sep: Number(budget.sep),
          oct: Number(budget.oct),
          nov: Number(budget.nov),
          dec: Number(budget.dec),
          total: Number(budget.total),
        })
      }
    }

    // Adjust Width
    woorkSheet = adjustWidth(woorkSheet)
  }

  // Create Buffer
  const buffer = await woorkBook.xlsx.writeBuffer()

  return buffer
}

const exportReportBudgetPlans = async (data) => {
  // Create Excel
  const woorkBook = new ExcelJs.Workbook()
  const { opex, capex, fund_center } = data

  // Create Header
  const HEADER = [
    { header: 'Task Name', key: 'task_name', width: 10 },
    { header: 'Jan', key: 'jan', width: 10 },
    { header: 'Feb', key: 'feb', width: 10 },
    { header: 'Mar', key: 'mar', width: 10 },
    { header: 'Apr', key: 'apr', width: 10 },
    { header: 'May', key: 'may', width: 10 },
    { header: 'Jun', key: 'jun', width: 10 },
    { header: 'Jul', key: 'jul', width: 10 },
    { header: 'Aug', key: 'aug', width: 10 },
    { header: 'Sep', key: 'sep', width: 10 },
    { header: 'Oct', key: 'oct', width: 10 },
    { header: 'Nov', key: 'nov', width: 10 },
    { header: 'Dec', key: 'dec', width: 10 },
    { header: 'Total', key: 'total', width: 10 },
  ]

  // Insert Data
  if (opex) {
    let woorkSheet = woorkBook.addWorksheet('OPEX')
    woorkSheet.columns = HEADER

    for (const opexItem of opex) {
      for (const opexItemItem of opexItem.opex_item) {
        // Create Task Name
        woorkSheet.addRow({
          task_name: `${opexItemItem.opex_gl.gl_code} - ${opexItem.account.account} - ${opexItemItem.budget_item.budget_item} - ${opexItemItem?.fund?.fund} - ${fund_center?.fund_center}`,
        })

        const budgetRowPosition = woorkSheet.rowCount

        let char = 97
        for (const budget of opexItemItem.budget) {
          // Create Budget Task Name
          woorkSheet.addRow({
            task_name: `     ${String.fromCharCode(char)}. ${budget.name}`,
            jan: Number(budget.jan),
            feb: Number(budget.feb),
            mar: Number(budget.mar),
            apr: Number(budget.apr),
            may: Number(budget.may),
            jun: Number(budget.jun),
            jul: Number(budget.jul),
            aug: Number(budget.aug),
            sep: Number(budget.sep),
            oct: Number(budget.oct),
            nov: Number(budget.nov),
            dec: Number(budget.dec),
            total: Number(budget.total),
          })

          char++
        }

        const lastPosition = woorkSheet.rowCount

        // SET TOTAL
        const cells = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
        for (const cell of cells) {
          woorkSheet.getCell(`${cell}${budgetRowPosition}`).value = {
            formula: `SUM(${cell}${budgetRowPosition + 1}:${cell}${lastPosition})`,
          }
        }

        // Bold a row
        woorkSheet.getRow(budgetRowPosition).font = { name: 'Consolas', bold: true }

        // For Add Header Again
        woorkSheet.addRow({})
        woorkSheet.addRow({
          task_name: 'Task Name',
          jan: 'Jan',
          feb: 'Feb',
          mar: 'Mar',
          apr: 'Apr',
          may: 'May',
          jun: 'Jun',
          jul: 'Jul',
          aug: 'Aug',
          sep: 'Sep',
          oct: 'Oct',
          nov: 'Nov',
          dec: 'Dec',
          total: 'Total',
        })
      }
    }
    // Change Font
    changeFont(woorkSheet, 'Consolas')

    // Style Header
    styleHeader(woorkSheet)

    // Remove Last Row
    woorkSheet.spliceRows(woorkSheet.rowCount, 1)

    // Formatting Number
    formattingNumber(woorkSheet)

    // Adjust Width
    woorkSheet = adjustWidth(woorkSheet)
  }

  if (capex) {
    let woorkSheet = woorkBook.addWorksheet('CAPEX')
    woorkSheet.columns = HEADER

    for (const capexItem of capex) {
      // Create Task Name
      woorkSheet.addRow({
        task_name: `${capexItem.capex_gl.gl_code} - ${capexItem.account.account} - ${capexItem?.fund?.fund} - ${fund_center?.fund_center}`,
      })

      const budgetRowPosition = woorkSheet.rowCount

      let char = 97
      for (const budget of capexItem.budget) {
        // Create Budget Task Name
        woorkSheet.addRow({
          task_name: `     ${String.fromCharCode(char)}. ${budget.name}`,
          jan: Number(budget.jan),
          feb: Number(budget.feb),
          mar: Number(budget.mar),
          apr: Number(budget.apr),
          may: Number(budget.may),
          jun: Number(budget.jun),
          jul: Number(budget.jul),
          aug: Number(budget.aug),
          sep: Number(budget.sep),
          oct: Number(budget.oct),
          nov: Number(budget.nov),
          dec: Number(budget.dec),
          total: Number(budget.total),
        })

        char++
      }

      const lastPosition = woorkSheet.rowCount

      // SET TOTAL
      const cells = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
      for (const cell of cells) {
        woorkSheet.getCell(`${cell}${budgetRowPosition}`).value = {
          formula: `SUM(${cell}${budgetRowPosition + 1}:${cell}${lastPosition})`,
        }
      }

      // Bold a row
      woorkSheet.getRow(budgetRowPosition).font = { name: 'Consolas', bold: true }

      // For Add Header Again
      woorkSheet.addRow({})
      woorkSheet.addRow({
        task_name: 'Task Name',
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'May',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Aug',
        sep: 'Sep',
        oct: 'Oct',
        nov: 'Nov',
        dec: 'Dec',
        total: 'Total',
      })
    }

    // Change Font
    changeFont(woorkSheet, 'Consolas')

    // Style Header
    styleHeader(woorkSheet)

    // Remove Last Row
    woorkSheet.spliceRows(woorkSheet.rowCount, 1)

    // Formatting Number
    formattingNumber(woorkSheet)

    // Adjust Width
    woorkSheet = adjustWidth(woorkSheet)
  }

  // Create Buffer
  const buffer = await woorkBook.xlsx.writeBuffer()

  return buffer
}

// REPORT ACTUAL PLAN

const exportReportActualExpense = async (data) => {
  // Create Excel
  // Urutan taskname OPEX GL - Transaction Type - Budget Item - Fund - Fund Center
  // Urutan taskname CAPEX GL - Transaction Type Fund - Fund Center
  const woorkBook = new ExcelJs.Workbook()
  const { opex, capex } = data

  // Create Header
  const HEADER = [
    { header: 'GL Code', key: 'gl_code', width: 10 },
    { header: 'Account', key: 'account', width: 10 },
    { header: 'Budget Item', key: 'budget_item', width: 10 },
    { header: 'Fund', key: 'fund', width: 10 },
    { header: 'Fund Center', key: 'fund_center', width: 10 },
    { header: 'Total Budget', key: 'total_budget', width: 10 },
    { header: 'PO Value', key: 'po_value', width: 10 },
    { header: 'PR Number', key: 'pr_number', width: 10 },
    { header: 'PR Date', key: 'pr_date', width: 10 },
    { header: 'PO Number', key: 'po_number', width: 10 },
    { header: 'PO Date', key: 'po_date', width: 10 },
    { header: 'BAST Number', key: 'bast_number', width: 10 },
    { header: 'BAST Date', key: 'bast_date', width: 10 },
    { header: 'SES/GR Number', key: 'ses_gr_number', width: 10 },
    { header: 'INV Number', key: 'inv_number', width: 10 },
    { header: 'Vendor Name', key: 'vendor_name', width: 10 },
    { header: 'DPP', key: 'dpp', width: 10 },
    { header: 'VAT', key: 'vat', width: 10 },
    { header: 'After Tax', key: 'after_tax', width: 10 },
    { header: 'WHT', key: 'wht', width: 10 },
    { header: 'Net Value', key: 'net_value', width: 10 },
    { header: 'FA Form Date', key: 'fa_form_date', width: 10 },
    { header: 'DOC to FA Date', key: 'doc_to_fa_date', width: 10 },
    { header: 'Payment Date', key: 'payment_date', width: 10 },
  ]

  // If Have a Opex
  if (opex) {
    let woorkSheet = woorkBook.addWorksheet('OPEX')
    woorkSheet.columns = HEADER

    for (const opexItem of opex) {
      for (const opexItemItem of opexItem.opex_item) {
        for (const budget of opexItemItem.budget) {
          for (const actual of budget.actual_budget) {
            woorkSheet.addRow({
              gl_code: opexItemItem.opex_gl.gl_code,
              account: opexItem.account.account,
              budget_item: budget.name,
              fund: opexItemItem.fund.fund,
              fund_center: String(opexItemItem.fund.fundCenter.fund_center),
              total_budget: Number(budget.total),
              po_value: Number(actual.po_value),
              pr_number: actual.pr_subject,
              pr_date: actual.pr_date ? formatDate(actual.pr_date) : null,
              po_number: actual.po_number,
              po_date: actual.po_date ? formatDate(actual.po_date) : null,
            })

            // If Have Actual
            if (actual.actual_budget_item.length > 0) {
              for (const actualItem of actual.actual_budget_item) {
                woorkSheet.addRow({
                  bast_number: actualItem.dataValues.bast_sub,
                  bast_date: actualItem.dataValues.bast_dat ? formatDate(actualItem.dataValues.bast_dat) : null,
                  ses_gr_number: actualItem.dataValues.ses_gr_n,
                  inv_number: actualItem.dataValues.inv_subj,
                  vendor_name: actualItem.dataValues.vendor_n,
                  dpp: Number(actualItem.dataValues.dpp),
                  vat: Number(actualItem.dataValues.vat),
                  after_tax: Number(actualItem.dataValues.after_ta),
                  wht: Number(actualItem.dataValues.wht),
                  net_value: Number(actualItem.dataValues.net_valu),
                  fa_form_date: actualItem.dataValues.fa_form ? formatDate(actualItem.dataValues.fa_form) : null,
                  doc_to_fa_date: actualItem.dataValues.doc_to_f ? formatDate(actualItem.dataValues.doc_to_f) : null,
                  payment_date: actualItem.dataValues.payment_ ? formatDate(actualItem.dataValues.payment_) : null,
                })
              }
            }
          }
        }
      }
    }

    // Adjust Width
    woorkSheet = adjustWidth(woorkSheet)
  }

  if (capex) {
    let woorkSheet = woorkBook.addWorksheet('CAPEX')
    woorkSheet.columns = HEADER

    for (const capexItem of capex) {
      for (const budget of capexItem.budget) {
        for (const actual of budget.actual_budget) {
          woorkSheet.addRow({
            gl_code: capexItem.capex_gl.gl_code,
            account: capexItem.account.account,
            budget_item: budget.name,
            fund: capexItem.fund.fund,
            fund_center: String(capexItem.fund.fundCenter.fund_center),
            total_budget: Number(budget.total),
            po_value: Number(actual.po_value),
            pr_number: actual.pr_number,
            pr_date: actual.pr_date ? formatDate(actual.pr_date) : null,
            po_number: actual.po_number,
            po_date: actual.po_date ? formatDate(actual.po_date) : null,
          })

          // If Have Actual
          if (actual.actual_budget_item.length > 0) {
            for (const actualItem of actual.actual_budget_item) {
              woorkSheet.addRow({
                bast_number: actualItem.dataValues.bast_subject,
                bast_date: actualItem.dataValues.bast_date ? formatDate(actualItem.dataValues.bast_date) : null,
                ses_gr_number: actualItem.dataValues.ses_gr_no_subject,
                inv_number: actualItem.dataValues.inv_subject,
                vendor_name: actualItem.dataValues.vendor_name,
                dpp: Number(actualItem.dataValues.dpp),
                vat: Number(actualItem.dataValues.vat),
                after_tax: Number(actualItem.dataValues.after_tax),
                wht: Number(actualItem.dataValues.wht),
                net_value: Number(actualItem.dataValues.net_value),
                fa_form_date: actualItem.dataValues.fa_form ? formatDate(actualItem.dataValues.fa_form) : null,
                doc_to_fa_date: actualItem.dataValues.doc_to_fa ? formatDate(actualItem.dataValues.doc_to_fa) : null,
                payment_date: actualItem.dataValues.payment_date ? formatDate(actualItem.dataValues.payment_date) : null,
              })
            }
          }
        }
      }
    }

    // Adjust Width
    woorkSheet = adjustWidth(woorkSheet)
  }

  // Create Buffer
  const buffer = await woorkBook.xlsx.writeBuffer()

  return buffer
}

const exportReportActualExpenses = async (data) => {
  // Create Excel
  // Urutan taskname OPEX GL - Transaction Type - Budget Item - Fund - Fund Center
  // Urutan taskname CAPEX GL - Transaction Type Fund - Fund Center
  const woorkBook = new ExcelJs.Workbook()
  const { opex, capex } = data
  let maxOpex = 0

  // Create Header
  const HEADER = [
    { header: 'Task Name', key: 'task_name', width: 10 },
    { header: 'Budget', key: 'budget', width: 10 },
    { header: 'PO Value', key: 'po_value', width: 10 },
    { header: 'Remaining Budget', key: 'remaining_budget', width: 10 },
    { header: 'PR Number', key: 'pr_number', width: 10 },
    { header: 'PR Date', key: 'pr_date', width: 10 },
    { header: 'PO Number', key: 'po_subject', width: 10 },
    { header: 'PO Name', key: 'po_name', width: 10 },
    { header: 'PO Date', key: 'po_date', width: 10 },
    { header: 'BAST Number', key: 'bast_number', width: 10 },
    { header: 'BAST Date', key: 'bast_date', width: 10 },
    { header: 'SES/GR Number', key: 'ses_gr_number', width: 10 },
    { header: 'INV Number', key: 'inv_number', width: 10 },
    { header: 'Vendor Name', key: 'vendor_name', width: 10 },
    { header: 'DPP', key: 'dpp', width: 10 },
    { header: 'VAT', key: 'vat', width: 10 },
    { header: 'After Tax', key: 'after_tax', width: 10 },
    { header: 'WHT', key: 'wht', width: 10 },
    { header: 'Net Value', key: 'net_value', width: 10 },
    { header: 'FA Form Date', key: 'fa_form_date', width: 10 },
    { header: 'DOC to FA Date', key: 'doc_to_fa_date', width: 10 },
    { header: 'Payment Date', key: 'payment_date', width: 10 },
  ]

  // If Have a Opex
  if (opex) {
    let woorkSheet = woorkBook.addWorksheet('OPEX')
    woorkSheet.columns = HEADER
    // woorkSheet.views = [{ state: 'frozen', xSplit: 1, ySplit: 1 }]

    for (const opexItem of opex) {
      for (const opexItemItem of opexItem.opex_item) {
        woorkSheet.addRow({
          task_name: `${opexItemItem.opex_gl.gl_code} - ${opexItem.account.account} - ${opexItemItem.budget_item.budget_item} - ${opexItemItem?.fund?.fund} - ${opexItemItem?.fund?.fundCenter?.fund_center}`,
        })
        const budgetRowPosition = woorkSheet.rowCount

        let char = 97
        const tempPoValuePosition = []
        for (const budget of opexItemItem.budget) {
          // Count All PO
          const poValue = budget.actual_budget.reduce((accumulator, actual) => {
            if (actual.po_value) return accumulator + Number(actual.po_value)
            else return accumulator
          }, 0)

          // For Add Budget Task Name
          woorkSheet.addRow({
            task_name: `     ${String.fromCharCode(char)}. ${budget.name}`,
            budget: Number(budget.total),
            po_value: poValue,
            remaining_budget: Number(budget.dataValues.remaining_budget),
          })
          tempPoValuePosition.push(woorkSheet.rowCount)
          char += 1

          for (const actual of budget.actual_budget) {
            woorkSheet.addRow({
              po_value: Number(actual.po_value),
              pr_number: actual.pr_subject,
              pr_date: actual.pr_date ? formatDate(actual.pr_date) : null,
              po_subject: actual.po_subject,
              po_name: actual.po_name,
              po_date: actual.po_date ? formatDate(actual.po_date) : null,
            })

            // If Have Actual
            if (actual.actual_budget_item.length > 0) {
              for (const actualItem of actual.actual_budget_item) {
                woorkSheet.addRow({
                  bast_number: actualItem.dataValues.bast_sub,
                  bast_date: actualItem.dataValues.bast_dat ? formatDate(actualItem.dataValues.bast_dat) : null,
                  ses_gr_number: actualItem.dataValues.ses_gr_n,
                  inv_number: actualItem.dataValues.inv_subj,
                  vendor_name: actualItem.dataValues.vendor_n,
                  dpp: Number(actualItem.dataValues.dpp),
                  vat: Number(actualItem.dataValues.vat),
                  after_tax: Number(actualItem.dataValues.after_ta),
                  wht: Number(actualItem.dataValues.wht),
                  net_value: Number(actualItem.dataValues.net_valu),
                  fa_form_date: actualItem.dataValues.fa_form ? formatDate(actualItem.dataValues.fa_form) : null,
                  doc_to_fa_date: actualItem.dataValues.doc_to_f ? formatDate(actualItem.dataValues.doc_to_f) : null,
                  payment_date: actualItem.dataValues.payment_ ? formatDate(actualItem.dataValues.payment_) : null,
                })
              }
            }
          }
        }

        const lastPosition = woorkSheet.rowCount

        // SET TOTAL
        woorkSheet.getCell(`B${budgetRowPosition}`).value = {
          formula: `SUM(B${budgetRowPosition + 1}:B${lastPosition})`,
        }
        let poValueFormula = ''
        for (const poValuePosition of tempPoValuePosition) {
          poValueFormula += `C${poValuePosition}+`
        }
        woorkSheet.getCell(`C${budgetRowPosition}`).value = {
          formula: `SUM(${poValueFormula.slice(0, -1)})`,
        }
        woorkSheet.getCell(`D${budgetRowPosition}`).value = {
          formula: `SUM(D${budgetRowPosition + 1}:D${lastPosition})`,
        }
        woorkSheet.getCell(`N${budgetRowPosition}`).value = {
          formula: `SUM(N${budgetRowPosition + 1}:N${lastPosition})`,
        }
        woorkSheet.getCell(`O${budgetRowPosition}`).value = {
          formula: `SUM(O${budgetRowPosition + 1}:O${lastPosition})`,
        }
        woorkSheet.getCell(`P${budgetRowPosition}`).value = {
          formula: `SUM(P${budgetRowPosition + 1}:P${lastPosition})`,
        }
        woorkSheet.getCell(`Q${budgetRowPosition}`).value = {
          formula: `SUM(Q${budgetRowPosition + 1}:Q${lastPosition})`,
        }
        woorkSheet.getCell(`R${budgetRowPosition}`).value = {
          formula: `SUM(R${budgetRowPosition + 1}:R${lastPosition})`,
        }

        // Bold a row
        woorkSheet.getRow(budgetRowPosition).font = { name: 'Consolas', bold: true }

        // For Add Header Again
        woorkSheet.addRow({})
        woorkSheet.addRow({
          task_name: 'Task Name',
          budget: 'Budget',
          po_value: 'PO Value',
          remaining_budget: 'Remaining Budget',
          pr_number: 'PR Number',
          pr_date: 'PR Date',
          po_subject: 'PO Number',
          po_date: 'PO Date',
          bast_number: 'BAST Number',
          bast_date: 'BAST Date',
          ses_gr_number: 'SES/GR Number',
          inv_number: 'INV Number',
          vendor_name: 'Vendor Name',
          dpp: 'DPP',
          vat: 'VAT',
          after_tax: 'After Tax',
          wht: 'WHT',
          net_value: 'Net Value',
          fa_form_date: 'FA Form Date',
          doc_to_fa_date: 'DOC to FA Date',
          payment_date: 'Payment Date',
        })
      }
    }

    // Change Font
    changeFont(woorkSheet, 'Consolas')

    // Coloring
    styleHeader(woorkSheet)

    // Remove Last Row
    woorkSheet.spliceRows(woorkSheet.rowCount, 1)

    // Formatting Number
    formattingNumber(woorkSheet)

    // Adjust Width
    woorkSheet = adjustWidth(woorkSheet)
  }

  if (capex) {
    let woorkSheet = woorkBook.addWorksheet('CAPEX')
    woorkSheet.columns = HEADER
    // woorkSheet.views = [{ state: 'frozen', xSplit: 1, ySplit: 1 }]

    for (const capexItem of capex) {
      woorkSheet.addRow({
        task_name: `${capexItem.capex_gl.gl_code} - ${capexItem.account.account} - ${capexItem?.fund?.fund} - ${capexItem?.fund?.fundCenter?.fund_center}`,
      })
      const budgetRowPosition = woorkSheet.rowCount

      let char = 97
      const tempPoValuePosition = []
      for (const budget of capexItem.budget) {
        // For Add Budget Task Name
        woorkSheet.addRow({
          task_name: `     ${String.fromCharCode(char)}. ${budget.name}`,
          budget: Number(budget.total),
          po_value: Number(Number(budget.total) - Number(budget.dataValues.remaining_budget)),
          remaining_budget: Number(budget.dataValues.remaining_budget),
        })
        tempPoValuePosition.push(woorkSheet.rowCount)
        char++

        for (const actual of budget.actual_budget) {
          woorkSheet.addRow({
            po_value: Number(actual.po_value),
            pr_number: actual.pr_number,
            pr_date: actual.pr_date ? formatDate(actual.pr_date) : null,
            po_subject: actual.po_subject,
            po_date: actual.po_date ? formatDate(actual.po_date) : null,
          })

          // If Have Actual
          if (actual.actual_budget_item.length > 0) {
            for (const actualItem of actual.actual_budget_item) {
              woorkSheet.addRow({
                bast_number: actualItem.dataValues.bast_subject,
                bast_date: actualItem.dataValues.bast_date ? formatDate(actualItem.dataValues.bast_date) : null,
                ses_gr_number: actualItem.dataValues.ses_gr_number,
                inv_number: actualItem.dataValues.inv_subject,
                vendor_name: actualItem.dataValues.vendor_name,
                dpp: Number(actualItem.dataValues.dpp),
                vat: Number(actualItem.dataValues.vat),
                ses_gr_number: actualItem.dataValues.ses_gr_no_subject,
                after_tax: Number(actualItem.dataValues.after_tax),
                wht: Number(actualItem.dataValues.wht),
                net_value: Number(actualItem.dataValues.net_value),
                fa_form_date: actualItem.dataValues.fa_form ? formatDate(actualItem.dataValues.fa_form) : null,
                doc_to_fa_date: actualItem.dataValues.doc_to_fa ? formatDate(actualItem.dataValues.doc_to_fa) : null,
                payment_date: actualItem.dataValues.payment_date ? formatDate(actualItem.dataValues.payment_date) : null,
              })
            }
          }
        }
      }

      const lastPosition = woorkSheet.rowCount

      // SET TOTAL
      woorkSheet.getCell(`B${budgetRowPosition}`).value = {
        formula: `SUM(B${budgetRowPosition + 1}:B${lastPosition})`,
      }
      let poValueFormula = ''
      for (const poValuePosition of tempPoValuePosition) {
        poValueFormula += `C${poValuePosition}+`
      }
      woorkSheet.getCell(`C${budgetRowPosition}`).value = {
        formula: `SUM(${poValueFormula.slice(0, -1)})`,
      }
      woorkSheet.getCell(`D${budgetRowPosition}`).value = {
        formula: `SUM(D${budgetRowPosition + 1}:D${lastPosition})`,
      }
      woorkSheet.getCell(`N${budgetRowPosition}`).value = {
        formula: `SUM(N${budgetRowPosition + 1}:N${lastPosition})`,
      }
      woorkSheet.getCell(`O${budgetRowPosition}`).value = {
        formula: `SUM(O${budgetRowPosition + 1}:O${lastPosition})`,
      }
      woorkSheet.getCell(`P${budgetRowPosition}`).value = {
        formula: `SUM(P${budgetRowPosition + 1}:P${lastPosition})`,
      }
      woorkSheet.getCell(`Q${budgetRowPosition}`).value = {
        formula: `SUM(Q${budgetRowPosition + 1}:Q${lastPosition})`,
      }
      woorkSheet.getCell(`R${budgetRowPosition}`).value = {
        formula: `SUM(R${budgetRowPosition + 1}:R${lastPosition})`,
      }

      // Bold a row
      woorkSheet.getRow(budgetRowPosition).font = { name: 'Consolas', bold: true }

      // For Add Header Again
      woorkSheet.addRow({})
      woorkSheet.addRow({
        task_name: 'Task Name',
        budget: 'Budget',
        po_value: 'PO Value',
        remaining_budget: 'Remaining Budget',
        pr_number: 'PR Number',
        pr_date: 'PR Date',
        po_subject: 'PO Number',
        po_date: 'PO Date',
        bast_number: 'BAST Number',
        bast_date: 'BAST Date',
        ses_gr_number: 'SES/GR Number',
        inv_number: 'INV Number',
        vendor_name: 'Vendor Name',
        dpp: 'DPP',
        vat: 'VAT',
        after_tax: 'After Tax',
        wht: 'WHT',
        net_value: 'Net Value',
        fa_form_date: 'FA Form Date',
        doc_to_fa_date: 'DOC to FA Date',
        payment_date: 'Payment Date',
      })
    }
    // Change Font
    changeFont(woorkSheet, 'Consolas')

    // Coloring
    styleHeader(woorkSheet)

    // Remove Last Row
    woorkSheet.spliceRows(woorkSheet.rowCount, 1)

    // Formatting Number
    formattingNumber(woorkSheet)

    // Adjust Width
    woorkSheet = adjustWidth(woorkSheet)
  }

  // Create Buffer
  const buffer = await woorkBook.xlsx.writeBuffer()

  return buffer
}

// REPORT RELOCATE PLAN

const exportRelocatePlanx = async (data, filter = []) => {
  // Create Excel
  const woorkBook = new ExcelJs.Workbook()
  const { opex, capex, fund_center } = data

  // Create Header
  const HEADER = [
    { header: 'Relocation Type', key: 'relocation_type', width: 10 },
    { header: 'GL', key: 'from_gl', width: 10 },
    { header: 'Transaction Type', key: 'transaction_type', width: 10 },
    { header: 'Budget Task', key: 'budget_item', width: 10 },
    { header: 'Fund Center', key: 'from_fund_center', width: 10 },
    { header: 'Fund', key: 'from_fund', width: 10 },
    { header: 'Total Budget', key: 'total_budget', width: 10 },
    { header: 'Remaining Budget', key: 'remaining_budget', width: 10 },
    { header: 'Dept From', key: 'from_dept', width: 10 },
    { header: 'Dept To', key: 'to_dept', width: 10 },
    { header: 'New GL Number', key: 'new_gl_number', width: 10 },
    { header: 'New Fund', key: 'new_fund', width: 10 },
    { header: 'New Fund Center', key: 'new_fund_center', width: 10 },
    { header: 'New Budget Task', key: 'new_budget_task', width: 10 },
    { header: 'Delivery Date', key: 'delivery_date', width: 10 },
    { header: 'Relocation Value', key: 'relocation_value', width: 10 },
  ]

  // Insert Data
  if (opex) {
    let workSheet = woorkBook.addWorksheet('OPEX')
    workSheet.columns = HEADER

    for (const opexItem of opex) {
      for (const opexItemItem of opexItem.opex_item) {
        for (const budget of opexItemItem.budget) {
          for (const relocate of budget.relocate) {
            // Filter
            if (!(filter.includes(relocate.relocate_type) || filter.length === 0)) continue

            // If Relocate From INTERNAL to EKSTERNAL or EKSTERNAL to INTERNAL
            if (['INT-EKS', 'INT-INT-FROM', 'INT-INT-TO'].includes(relocate.relocate_type)) {
              // Find GL
              const gl = relocate.capex_gl ? relocate.capex_gl.gl_code : relocate.opex_gl.gl_code

              // Add Row
              workSheet.addRow({
                relocation_type: relocate.relocate_type,
                from_gl: opexItemItem.opex_gl.gl_code,
                transaction_type: opexItem.account.account,
                budget_item: budget.name,
                from_fund_center: fund_center.fund_center,
                from_fund: opexItemItem.fund.fund,
                total_budget: budget.total,
                remaining_budget: budget.dataValues.remaining_budget,
                from_dept: fund_center.department_code,
                to_dept: relocate.fund_center.department_code,
                new_gl_number: gl,
                new_fund: relocate.fund.fund,
                new_fund_center: relocate.fund_center.fund_center,
                new_budget_task:
                  relocate.type === 'INT-EKS' ? relocate.budget_task : relocate.budget_to ? relocate.budget_to.name : relocate.budget_task,
                delivery_date: formatDate(relocate.delivery_date),
                relocation_value: relocate.relocate_value,
              })
            }

            // If Relocate From EKSTERNAL to INTERNAL
            else if (relocate.relocate_type === 'EKS-INT') {
              // Find GL
              const gl = relocate.capex_gl ? relocate.capex_gl.gl_code : relocate.opex_gl.gl_code

              // Add Row
              workSheet.addRow({
                relocation_type: relocate.relocate_type,
                from_gl: gl,
                transaction_type: '',
                budget_item: relocate.budget_task,
                from_fund_center: relocate.fund_center.fund_center,
                from_fund: relocate.fund.fund,
                // total_budget: budget.total,
                // remaining_budget: budget.dataValues.remaining_budget,
                from_dept: relocate.fund_center.department_code,
                to_dept: fund_center.department_code,
                new_gl_number: gl,
                new_fund: opexItemItem.fund.fund,
                new_fund_center: fund_center.fund_center,
                new_budget_task: budget.name,
                delivery_date: formatDate(relocate.delivery_date),
                relocation_value: relocate.relocate_value,
              })
            }
          }
        }
      }
    }

    // Adjust Width
    workSheet = adjustWidth(workSheet)
  }

  if (capex) {
    let workSheet = woorkBook.addWorksheet('CAPEX')
    workSheet.columns = HEADER

    for (const capexItem of capex) {
      for (const budget of capexItem.budget) {
        for (const relocate of budget.relocate) {
          // Filter
          if (!(filter.includes(relocate.relocate_type) || filter.length === 0)) continue

          // If Relocate From INTERNAL to EKSTERNAL or EKSTERNAL to INTERNAL
          if (['INT-EKS', 'INT-INT-FROM', 'INT-INT-TO'].includes(relocate.relocate_type)) {
            // Find GL
            const gl = relocate.capex_gl ? relocate.capex_gl.gl_code : relocate.opex_gl.gl_code

            // Add Row
            workSheet.addRow({
              relocation_type: relocate.relocate_type,
              from_gl: capexItem.opex_gl.gl_code,
              transaction_type: capexItem.account.account,
              budget_item: budget.name,
              from_fund_center: fund_center.fund_center,
              from_fund: capexItem.fund.fund,
              total_budget: budget.total,
              remaining_budget: budget.dataValues.remaining_budget,
              from_dept: fund_center.department_code,
              to_dept: relocate.fund_center.department_code,
              new_gl_number: gl,
              new_fund: relocate.fund.fund,
              new_fund_center: relocate.fund_center.fund_center,
              new_budget_task:
                relocate.type === 'INT-EKS' ? relocate.budget_task : relocate.budget_to ? relocate.budget_to.name : relocate.budget_task,
              delivery_date: formatDate(relocate.delivery_date),
              relocation_value: relocate.relocate_value,
            })
          }

          // If Relocate From EKSTERNAL to INTERNAL
          else if (relocate.relocate_type === 'EKS-INT') {
            // Find GL
            const gl = relocate.capex_gl ? relocate.capex_gl.gl_code : relocate.opex_gl.gl_code

            // Add Row
            workSheet.addRow({
              relocation_type: relocate.relocate_type,
              from_gl: gl,
              transaction_type: '',
              budget_item: relocate.budget_task,
              from_fund_center: relocate.fund_center.fund_center,
              from_fund: relocate.fund.fund,
              // total_budget: budget.total,
              // remaining_budget: budget.dataValues.remaining_budget,
              from_dept: relocate.fund_center.department_code,
              to_dept: fund_center.department_code,
              new_gl_number: gl,
              new_fund: capexItem.fund.fund,
              new_fund_center: fund_center.fund_center,
              new_budget_task: budget.name,
              delivery_date: formatDate(relocate.delivery_date),
              relocation_value: relocate.relocate_value,
            })
          }
        }
      }
    }

    // Adjust Width
    workSheet = adjustWidth(workSheet)
  }

  // Create Buffer
  const buffer = await woorkBook.xlsx.writeBuffer()

  return buffer
}
const exportRelocatePlans = async (data, filter = []) => {
  // Create Excel
  const woorkBook = new ExcelJs.Workbook()
  const { opex, capex, fund_center } = data

  // Create Header
  const HEADER = [
    { header: 'Relocation Type', key: 'relocation_type', width: 10 },
    { header: 'GL', key: 'from_gl', width: 10 },
    { header: 'Transaction Type', key: 'transaction_type', width: 10 },
    { header: 'Budget Task', key: 'budget_item', width: 10 },
    { header: 'Fund Center', key: 'from_fund_center', width: 10 },
    { header: 'Fund', key: 'from_fund', width: 10 },
    { header: 'Total Budget', key: 'total_budget', width: 10 },
    { header: 'Remaining Budget', key: 'remaining_budget', width: 10 },
    { header: 'Dept From', key: 'from_dept', width: 10 },
    { header: 'Dept To', key: 'to_dept', width: 10 },
    { header: 'New GL Number', key: 'new_gl_number', width: 10 },
    { header: 'New Fund', key: 'new_fund', width: 10 },
    { header: 'New Fund Center', key: 'new_fund_center', width: 10 },
    { header: 'New Budget Task', key: 'new_budget_task', width: 10 },
    { header: 'Delivery Date', key: 'delivery_date', width: 10 },
    { header: 'Relocation Value', key: 'relocation_value', width: 10 },
  ]

  // Insert Data
  if (opex) {
    let workSheet = woorkBook.addWorksheet('OPEX')
    workSheet.columns = HEADER

    for (const opexItem of opex) {
      for (const opexItemItem of opexItem.opex_item) {
        for (const budget of opexItemItem.budget) {
          for (const relocate of budget.relocate) {
            // Filter
            if (!(filter.includes(relocate.relocate_type) || filter.length === 0)) continue

            // If Relocate From INTERNAL to EKSTERNAL or EKSTERNAL to INTERNAL
            if (['INT-EKS', 'INT-INT-FROM', 'INT-INT-TO'].includes(relocate.relocate_type)) {
              // Find GL
              const gl = relocate.capex_gl ? relocate.capex_gl.gl_code : relocate.opex_gl.gl_code

              // Add Row
              workSheet.addRow({
                relocation_type: relocate.relocate_type,
                from_gl: opexItemItem.opex_gl.gl_code,
                transaction_type: opexItem.account.account,
                budget_item: budget.name,
                from_fund_center: fund_center.fund_center,
                from_fund: opexItemItem.fund.fund,
                total_budget: formatRupiah(budget.total),
                remaining_budget: formatRupiah(budget.dataValues.remaining_budget),
                from_dept: fund_center.department_code,
                to_dept: relocate.fund_center.department_code,
                new_gl_number: gl,
                new_fund: relocate.fund.fund,
                new_fund_center: relocate.fund_center.fund_center,
                new_budget_task:
                  relocate.type === 'INT-EKS' ? relocate.budget_task : relocate.budget_to ? relocate.budget_to.name : relocate.budget_task,
                delivery_date: formatDate(relocate.delivery_date),
                relocation_value: formatRupiah(relocate.relocate_value),
              })
            }

            // If Relocate From EKSTERNAL to INTERNAL
            else if (relocate.relocate_type === 'EKS-INT') {
              // Find GL
              const gl = relocate.capex_gl ? relocate.capex_gl.gl_code : relocate.opex_gl.gl_code

              // Add Row
              workSheet.addRow({
                relocation_type: relocate.relocate_type,
                from_gl: gl,
                transaction_type: '',
                budget_item: relocate.budget_task,
                from_fund_center: relocate.fund_center.fund_center,
                from_fund: relocate.fund.fund,
                // total_budget: budget.total,
                // remaining_budget: budget.dataValues.remaining_budget,
                from_dept: relocate.fund_center.department_code,
                to_dept: fund_center.department_code,
                new_gl_number: gl,
                new_fund: opexItemItem.fund.fund,
                new_fund_center: fund_center.fund_center,
                new_budget_task: budget.name,
                delivery_date: formatDate(relocate.delivery_date),
                relocation_value: formatRupiah(relocate.relocate_value),
              })
            }
          }
        }
      }
    }

    // Coloring
    styleHeader(workSheet, 'Relocation Type')

    // Change Font
    changeFont(workSheet, 'Consolas')

    // Adjust Width
    workSheet = adjustWidth(workSheet)
  }

  if (capex) {
    let workSheet = woorkBook.addWorksheet('CAPEX')
    workSheet.columns = HEADER

    for (const capexItem of capex) {
      for (const budget of capexItem.budget) {
        for (const relocate of budget.relocate) {
          // Filter
          if (!(filter.includes(relocate.relocate_type) || filter.length === 0)) continue

          // If Relocate From INTERNAL to EKSTERNAL or EKSTERNAL to INTERNAL
          if (['INT-EKS', 'INT-INT-FROM', 'INT-INT-TO'].includes(relocate.relocate_type)) {
            // Find GL
            const gl = relocate.capex_gl ? relocate.capex_gl.gl_code : relocate.opex_gl.gl_code

            // Add Row
            workSheet.addRow({
              relocation_type: relocate.relocate_type,
              from_gl: capexItem.opex_gl.gl_code,
              transaction_type: capexItem.account.account,
              budget_item: budget.name,
              from_fund_center: fund_center.fund_center,
              from_fund: capexItem.fund.fund,
              total_budget: formatRupiah(budget.total),
              remaining_budget: formatRupiah(budget.dataValues.remaining_budget),
              from_dept: fund_center.department_code,
              to_dept: relocate.fund_center.department_code,
              new_gl_number: gl,
              new_fund: relocate.fund.fund,
              new_fund_center: relocate.fund_center.fund_center,
              new_budget_task:
                relocate.type === 'INT-EKS' ? relocate.budget_task : relocate.budget_to ? relocate.budget_to.name : relocate.budget_task,
              delivery_date: formatDate(relocate.delivery_date),
              relocation_value: formatRupiah(relocate.relocate_value),
            })
          }

          // If Relocate From EKSTERNAL to INTERNAL
          else if (relocate.relocate_type === 'EKS-INT') {
            // Find GL
            const gl = relocate.capex_gl ? relocate.capex_gl.gl_code : relocate.opex_gl.gl_code

            // Add Row
            workSheet.addRow({
              relocation_type: relocate.relocate_type,
              from_gl: gl,
              transaction_type: '',
              budget_item: relocate.budget_task,
              from_fund_center: relocate.fund_center.fund_center,
              from_fund: relocate.fund.fund,
              // total_budget: budget.total,
              // remaining_budget: budget.dataValues.remaining_budget,
              from_dept: relocate.fund_center.department_code,
              to_dept: fund_center.department_code,
              new_gl_number: gl,
              new_fund: capexItem.fund.fund,
              new_fund_center: fund_center.fund_center,
              new_budget_task: budget.name,
              delivery_date: formatDate(relocate.delivery_date),
              relocation_value: formatRupiah(relocate.relocate_value),
            })
          }
        }
      }
    }

    // Coloring
    styleHeader(workSheet, 'Relocation Type')

    // Change Font
    changeFont(workSheet, 'Consolas')

    // Adjust Width
    workSheet = adjustWidth(workSheet)
  }

  // Create Buffer
  const buffer = await woorkBook.xlsx.writeBuffer()

  return buffer
}

const exportRelocatePlan = async (data, filter = []) => {
  // Create Excel
  const woorkBook = new ExcelJs.Workbook()
  const { opex, capex, fund_center } = data

  // Create Header
  const HEADER = [
    { header: 'Relocation Type', key: 'relocation_type', width: 10 },
    { header: '[FROM] Task Name', key: 'from_task_name', width: 10 },
    { header: '[TO] Task Name', key: 'to_task_name', width: 10 },
    { header: 'Total Budget', key: 'total_budget', width: 10 },
    { header: 'Remaining Budget', key: 'remaining_budget', width: 10 },
    { header: 'Delivery Date', key: 'delivery_date', width: 10 },
    { header: 'Relocation Value', key: 'relocation_value', width: 10 },
  ]

  // Insert Data
  if (opex) {
    let workSheet = woorkBook.addWorksheet('OPEX')
    workSheet.columns = HEADER

    for (const opexItem of opex) {
      for (const opexItemItem of opexItem.opex_item) {
        for (const budget of opexItemItem.budget) {
          for (const relocate of budget.relocate) {
            // Filter
            if (!(filter.includes(relocate.relocate_type) || filter.length === 0)) continue

            // If Relocate From INTERNAL to EKSTERNAL or EKSTERNAL to INTERNAL
            if (['INT-EKS', 'INT-INT-FROM', 'INT-INT-TO'].includes(relocate.relocate_type)) {
              // Find GL
              const gl = relocate.capex_gl ? relocate.capex_gl.gl_code : relocate.opex_gl.gl_code

              const budgetTaskNew =
                relocate.type === 'INT-EKS' ? relocate.budget_task : relocate.budget_to ? relocate.budget_to.name : relocate.budget_task

              // Add Row
              workSheet.addRow({
                relocation_type: relocate.relocate_type,
                from_task_name: `${opexItemItem.opex_gl.gl_code} - ${opexItem.account.account} - ${budget.name} - ${opexItemItem?.fund?.fund} - ${fund_center?.fund_center}`,
                to_task_name: `${gl} - ${budgetTaskNew} - ${relocate.fund.fund} - ${relocate.fund_center.fund_center}`,
                total_budget: Number(budget.total),
                remaining_budget: Number(budget.dataValues.remaining_budget),
                delivery_date: formatDate(relocate.delivery_date),
                relocation_value: Number(relocate.relocate_value),
              })
            }

            // If Relocate From EKSTERNAL to INTERNAL
            else if (relocate.relocate_type === 'EKS-INT') {
              // Find GL
              const gl = relocate.capex_gl ? relocate.capex_gl.gl_code : relocate.opex_gl.gl_code

              // Add Row
              workSheet.addRow({
                relocation_type: relocate.relocate_type,
                from_task_name: `${gl} - ${budget.name} - ${relocate.fund.fund} - ${relocate.fund_center.fund_center}`,
                to_task_name: `${opexItemItem.opex_gl.gl_code} - ${opexItem.account.account} - ${budget.name} - ${opexItemItem?.fund?.fund} - ${fund_center?.fund_center}`,
                total_budget: Number(budget.total),
                remaining_budget: Number(budget.dataValues.remaining_budget),
                delivery_date: formatDate(relocate.delivery_date),
                relocation_value: Number(relocate.relocate_value),
              })
            }
          }
        }
      }
    }

    // Change Font
    changeFont(workSheet, 'Consolas')

    // Coloring
    styleHeader(workSheet, 'Relocation Type')

    // Formatting Number
    formattingNumber(workSheet)

    // Adjust Width
    workSheet = adjustWidth(workSheet)
  }

  if (capex) {
    let workSheet = woorkBook.addWorksheet('CAPEX')
    workSheet.columns = HEADER

    for (const capexItem of capex) {
      for (const budget of capexItem.budget) {
        for (const relocate of budget.relocate) {
          // Filter
          if (!(filter.includes(relocate.relocate_type) || filter.length === 0)) continue

          // If Relocate From INTERNAL to EKSTERNAL or EKSTERNAL to INTERNAL
          if (['INT-EKS', 'INT-INT-FROM', 'INT-INT-TO'].includes(relocate.relocate_type)) {
            // Find GL
            const gl = relocate.capex_gl ? relocate.capex_gl.gl_code : relocate.opex_gl.gl_code

            const budgetTaskNew =
              relocate.type === 'INT-EKS' ? relocate.budget_task : relocate.budget_to ? relocate.budget_to.name : relocate.budget_task

            // Add Row
            workSheet.addRow({
              relocation_type: relocate.relocate_type,
              from_task_name: `${capexItem.capex_gl.gl_code} - ${capexItem.account.account} - ${budget.name} - ${capexItem?.fund?.fund} - ${fund_center?.fund_center}`,
              to_task_name: `${gl}  - ${budgetTaskNew} - ${relocate.fund.fund} - ${relocate.fund_center.fund_center}`,
              total_budget: Number(budget.total),
              remaining_budget: Number(budget.dataValues.remaining_budget),
              delivery_date: formatDate(relocate.delivery_date),
              relocation_value: Number(relocate.relocate_value),
            })
          }

          // If Relocate From EKSTERNAL to INTERNAL
          else if (relocate.relocate_type === 'EKS-INT') {
            // Find GL
            const gl = relocate.capex_gl ? relocate.capex_gl.gl_code : relocate.opex_gl.gl_code

            // Add Row
            workSheet.addRow({
              relocation_type: relocate.relocate_type,
              from_task_name: `${gl} - ${budget.name} - ${relocate.fund.fund} - ${relocate.fund_center.fund_center}`,
              to_task_name: `${capexItem.capex_gl.gl_code} - ${capexItem.account.account} - ${budget.name} - ${capexItem?.fund?.fund} - ${fund_center?.fund_center}`,
              total_budget: Number(budget.total),
              remaining_budget: Number(budget.dataValues.remaining_budget),
              delivery_date: formatDate(relocate.delivery_date),
              relocation_value: Number(relocate.relocate_value),
            })
          }
        }
      }
    }

    // Change Font
    changeFont(workSheet, 'Consolas')

    // Coloring
    styleHeader(workSheet, 'Relocation Type')

    // Formatting Number
    formattingNumber(workSheet)

    // Adjust Width
    workSheet = adjustWidth(workSheet)
  }

  // Create Buffer
  const buffer = await woorkBook.xlsx.writeBuffer()

  return buffer
}

// REPORT BUDGET MONITORING
const exportBudgetMonitoirng = async (data) => {
  const woorkBook = new ExcelJs.Workbook()
  const { opex, capex } = data

  // Create Header
  const HEADER = [
    { header: 'GL', key: 'gl' },
    { header: 'TT', key: 'tt' },
    { header: 'Budget Item', key: 'budget_item' },
    { header: 'Description', key: 'description' },
    { header: 'January', key: 'jan_plan' },
    { header: '', key: 'jan_actual' },
    { header: 'February', key: 'feb_plan' },
    { header: '', key: 'feb_actual' },
    { header: 'March', key: 'mar_plan' },
    { header: '', key: 'mar_actual' },
    { header: 'April', key: 'apr_plan' },
    { header: '', key: 'apr_actual' },
    { header: 'May', key: 'may_plan' },
    { header: '', key: 'may_actual' },
    { header: 'June', key: 'jun_plan' },
    { header: '', key: 'jun_actual' },
    { header: 'July', key: 'jul_plan' },
    { header: '', key: 'jul_actual' },
    { header: 'August', key: 'aug_plan' },
    { header: '', key: 'aug_actual' },
    { header: 'September', key: 'sep_plan' },
    { header: '', key: 'sep_actual' },
    { header: 'October', key: 'oct_plan' },
    { header: '', key: 'oct_actual' },
    { header: 'November', key: 'nov_plan' },
    { header: '', key: 'nov_actual' },
    { header: 'December', key: 'dec_plan' },
    { header: '', key: 'dec_actual' },
    { header: 'Total', key: 'total_plan' },
    { header: '', key: 'total_actual' },
  ]

  if (opex) {
    // Create Sheet
    let workSheet = woorkBook.addWorksheet('OPEX')

    // Add Header
    workSheet.columns = HEADER

    // Add Second HEader
    workSheet.addRow({
      jan_plan: 'Plan',
      jan_actual: 'Actual',
      feb_plan: 'Plan',
      feb_actual: 'Actual',
      mar_plan: 'Plan',
      mar_actual: 'Actual',
      apr_plan: 'Plan',
      apr_actual: 'Actual',
      may_plan: 'Plan',
      may_actual: 'Actual',
      jun_plan: 'Plan',
      jun_actual: 'Actual',
      jul_plan: 'Plan',
      jul_actual: 'Actual',
      aug_plan: 'Plan',
      aug_actual: 'Actual',
      sep_plan: 'Plan',
      sep_actual: 'Actual',
      oct_plan: 'Plan',
      oct_actual: 'Actual',
      nov_plan: 'Plan',
      nov_actual: 'Actual',
      dec_plan: 'Plan',
      dec_actual: 'Actual',
      total_plan: 'Plan',
      total_actual: 'Actual',
    })

    // Merge Cell
    workSheet.mergeCells('A1:A2')
    workSheet.mergeCells('B1:B2')
    workSheet.mergeCells('C1:C2')
    workSheet.mergeCells('D1:D2')

    workSheet.mergeCells('E1:F1')
    workSheet.mergeCells('G1:H1')
    workSheet.mergeCells('I1:J1')
    workSheet.mergeCells('K1:L1')
    workSheet.mergeCells('M1:N1')
    workSheet.mergeCells('O1:P1')
    workSheet.mergeCells('Q1:R1')
    workSheet.mergeCells('S1:T1')
    workSheet.mergeCells('U1:V1')
    workSheet.mergeCells('W1:X1')
    workSheet.mergeCells('Y1:Z1')
    workSheet.mergeCells('AA1:AB1')
    workSheet.mergeCells('AC1:AD1')

    let index = 3

    for (const opexItem of opex) {
      workSheet.addRow({
        gl: opexItem.opex_gl.gl_code,
        tt: opexItem.budget_item.item,
        budget_item: opexItem.budget_item.budget_item,
        jan_plan: Number(opexItem.dataValues.summary.jan.plan),
        jan_actual: Number(opexItem.dataValues.summary.jan.actual),
        feb_plan: Number(opexItem.dataValues.summary.feb.plan),
        feb_actual: Number(opexItem.dataValues.summary.feb.actual),
        mar_plan: Number(opexItem.dataValues.summary.mar.plan),
        mar_actual: Number(opexItem.dataValues.summary.mar.actual),
        apr_plan: Number(opexItem.dataValues.summary.apr.plan),
        apr_actual: Number(opexItem.dataValues.summary.apr.actual),
        may_plan: Number(opexItem.dataValues.summary.may.plan),
        may_actual: Number(opexItem.dataValues.summary.may.actual),
        jun_plan: Number(opexItem.dataValues.summary.jun.plan),
        jun_actual: Number(opexItem.dataValues.summary.jun.actual),
        jul_plan: Number(opexItem.dataValues.summary.jul.plan),
        jul_actual: Number(opexItem.dataValues.summary.jul.actual),
        aug_plan: Number(opexItem.dataValues.summary.aug.plan),
        aug_actual: Number(opexItem.dataValues.summary.aug.actual),
        sep_plan: Number(opexItem.dataValues.summary.sep.plan),
        sep_actual: Number(opexItem.dataValues.summary.sep.actual),
        oct_plan: Number(opexItem.dataValues.summary.oct.plan),
        oct_actual: Number(opexItem.dataValues.summary.oct.actual),
        nov_plan: Number(opexItem.dataValues.summary.nov.plan),
        nov_actual: Number(opexItem.dataValues.summary.nov.actual),
        dec_plan: Number(opexItem.dataValues.summary.dec.plan),
        dec_actual: Number(opexItem.dataValues.summary.dec.actual),
        total_plan: Number(opexItem.dataValues.summary.total.plan),
        total_actual: Number(opexItem.dataValues.summary.total.actual),
      })

      workSheet.getRow(index).eachCell((cell) => (cell.font = { bold: true, name: 'Consolas' }))
      index++

      for (const budget of opexItem.budget) {
        index++
        workSheet.addRow({
          budget_item: budget.name,
          description: budget.description,
          jan_plan: Number(budget.jan.plan),
          jan_actual: Number(budget.jan.actual),
          feb_plan: Number(budget.feb.plan),
          feb_actual: Number(budget.feb.actual),
          mar_plan: Number(budget.mar.plan),
          mar_actual: Number(budget.mar.actual),
          apr_plan: Number(budget.apr.plan),
          apr_actual: Number(budget.apr.actual),
          may_plan: Number(budget.may.plan),
          may_actual: Number(budget.may.actual),
          jun_plan: Number(budget.jun.plan),
          jun_actual: Number(budget.jun.actual),
          jul_plan: Number(budget.jul.plan),
          jul_actual: Number(budget.jul.actual),
          aug_plan: Number(budget.aug.plan),
          aug_actual: Number(budget.aug.actual),
          sep_plan: Number(budget.sep.plan),
          sep_actual: Number(budget.sep.actual),
          oct_plan: Number(budget.oct.plan),
          oct_actual: Number(budget.oct.actual),
          nov_plan: Number(budget.nov.plan),
          nov_actual: Number(budget.nov.actual),
          dec_plan: Number(budget.dec.plan),
          dec_actual: Number(budget.dec.actual),
          total_plan: Number(budget.total.plan),
          total_actual: Number(budget.total.actual),
        })
      }
    }

    // Freeze Panel
    workSheet.views = [{ state: 'frozen', xSplit: 4, ySplit: 2 }]

    // Change Font
    changeFont(workSheet, 'Consolas')

    // Style Header
    styleHeader(workSheet, 'GL')

    formattingNumber(workSheet)

    // Adjust Width
    workSheet = adjustWidth(workSheet)
  }

  if (capex) {
    // Create Sheet
    let workSheet = woorkBook.addWorksheet('CAPEX')

    // Add Header
    workSheet.columns = HEADER

    // Add Second HEader
    workSheet.addRow({
      jan_plan: 'Plan',
      jan_actual: 'Actual',
      feb_plan: 'Plan',
      feb_actual: 'Actual',
      mar_plan: 'Plan',
      mar_actual: 'Actual',
      apr_plan: 'Plan',
      apr_actual: 'Actual',
      may_plan: 'Plan',
      may_actual: 'Actual',
      jun_plan: 'Plan',
      jun_actual: 'Actual',
      jul_plan: 'Plan',
      jul_actual: 'Actual',
      aug_plan: 'Plan',
      aug_actual: 'Actual',
      sep_plan: 'Plan',
      sep_actual: 'Actual',
      oct_plan: 'Plan',
      oct_actual: 'Actual',
      nov_plan: 'Plan',
      nov_actual: 'Actual',
      dec_plan: 'Plan',
      dec_actual: 'Actual',
      total_plan: 'Plan',
      total_actual: 'Actual',
    })

    // Merge Cell
    workSheet.mergeCells('A1:A2')
    workSheet.mergeCells('B1:B2')
    workSheet.mergeCells('C1:C2')
    workSheet.mergeCells('D1:D2')

    workSheet.mergeCells('E1:F1')
    workSheet.mergeCells('G1:H1')
    workSheet.mergeCells('I1:J1')
    workSheet.mergeCells('K1:L1')
    workSheet.mergeCells('M1:N1')
    workSheet.mergeCells('O1:P1')
    workSheet.mergeCells('Q1:R1')
    workSheet.mergeCells('S1:T1')
    workSheet.mergeCells('U1:V1')
    workSheet.mergeCells('W1:X1')
    workSheet.mergeCells('Y1:Z1')
    workSheet.mergeCells('AA1:AB1')
    workSheet.mergeCells('AC1:AD1')

    let index = 3

    for (const capexItem of capex) {
      workSheet.addRow({
        gl: capexItem.capex_gl.gl_code,
        tt: capexItem.account.code,
        budget_item: capexItem.account.account,
        jan_plan: Number(capexItem.dataValues.summary.jan.plan),
        jan_actual: Number(capexItem.dataValues.summary.jan.actual),
        feb_plan: Number(capexItem.dataValues.summary.feb.plan),
        feb_actual: Number(capexItem.dataValues.summary.feb.actual),
        mar_plan: Number(capexItem.dataValues.summary.mar.plan),
        mar_actual: Number(capexItem.dataValues.summary.mar.actual),
        apr_plan: Number(capexItem.dataValues.summary.apr.plan),
        apr_actual: Number(capexItem.dataValues.summary.apr.actual),
        may_plan: Number(capexItem.dataValues.summary.may.plan),
        may_actual: Number(capexItem.dataValues.summary.may.actual),
        jun_plan: Number(capexItem.dataValues.summary.jun.plan),
        jun_actual: Number(capexItem.dataValues.summary.jun.actual),
        jul_plan: Number(capexItem.dataValues.summary.jul.plan),
        jul_actual: Number(capexItem.dataValues.summary.jul.actual),
        aug_plan: Number(capexItem.dataValues.summary.aug.plan),
        aug_actual: Number(capexItem.dataValues.summary.aug.actual),
        sep_plan: Number(capexItem.dataValues.summary.sep.plan),
        sep_actual: Number(capexItem.dataValues.summary.sep.actual),
        oct_plan: Number(capexItem.dataValues.summary.oct.plan),
        oct_actual: Number(capexItem.dataValues.summary.oct.actual),
        nov_plan: Number(capexItem.dataValues.summary.nov.plan),
        nov_actual: Number(capexItem.dataValues.summary.nov.actual),
        dec_plan: Number(capexItem.dataValues.summary.dec.plan),
        dec_actual: Number(capexItem.dataValues.summary.dec.actual),
        total_plan: Number(capexItem.dataValues.summary.total.plan),
        total_actual: Number(capexItem.dataValues.summary.total.actual),
      })

      workSheet.getRow(index).eachCell((cell) => (cell.font = { bold: true, name: 'Consolas' }))
      index++

      for (const budget of capexItem.budget) {
        index++
        workSheet.addRow({
          budget_item: budget.name,
          description: budget.description,
          jan_plan: Number(budget.jan.plan),
          jan_actual: Number(budget.jan.actual),
          feb_plan: Number(budget.feb.plan),
          feb_actual: Number(budget.feb.actual),
          mar_plan: Number(budget.mar.plan),
          mar_actual: Number(budget.mar.actual),
          apr_plan: Number(budget.apr.plan),
          apr_actual: Number(budget.apr.actual),
          may_plan: Number(budget.may.plan),
          may_actual: Number(budget.may.actual),
          jun_plan: Number(budget.jun.plan),
          jun_actual: Number(budget.jun.actual),
          jul_plan: Number(budget.jul.plan),
          jul_actual: Number(budget.jul.actual),
          aug_plan: Number(budget.aug.plan),
          aug_actual: Number(budget.aug.actual),
          sep_plan: Number(budget.sep.plan),
          sep_actual: Number(budget.sep.actual),
          oct_plan: Number(budget.oct.plan),
          oct_actual: Number(budget.oct.actual),
          nov_plan: Number(budget.nov.plan),
          nov_actual: Number(budget.nov.actual),
          dec_plan: Number(budget.dec.plan),
          dec_actual: Number(budget.dec.actual),
          total_plan: Number(budget.total.plan),
          total_actual: Number(budget.total.actual),
        })
      }
    }

    // Freeze Panel
    workSheet.views = [{ state: 'frozen', xSplit: 4, ySplit: 2 }]

    // Change Font
    changeFont(workSheet, 'Consolas')

    // Style Header
    styleHeader(workSheet, 'GL')

    formattingNumber(workSheet)

    // Adjust Width
    workSheet = adjustWidth(workSheet)
  }

  const buffer = await woorkBook.xlsx.writeBuffer()

  return buffer
}

function adjustWidth(worksheet) {
  return worksheet.columns.forEach((column) => {
    let maxLength = 0
    const OFFSET = 2
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value
        ? typeof cell.value !== 'number'
          ? (String(cell.value).length + OFFSET) * 1.2
          : (String(cell.value).length + 4) * 2
        : // : 100
          0
      if (columnLength > maxLength) {
        maxLength = columnLength
      }
    })
    column.width = maxLength < 10 ? 10 : maxLength
  })
}

function formatDate(inputDate) {
  const dateParts = inputDate.split('-').map(Number)
  const formattedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDateString = new Intl.DateTimeFormat('en-US', options).format(formattedDate)

  return formattedDateString
}

function changeFont(worksheet, fontName) {
  worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
    row.eachCell({ includeEmpty: false }, function (cell, colNumber) {
      if (!cell.font) cell.font = { name: fontName }
    })
  })
}

function styleHeader(workSheet, target = 'Task Name') {
  // Coloring
  workSheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
    if (row.getCell(1).value === target) {
      row.eachCell({ includeEmpty: false }, function (cell, colNumber) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'D3D3D3' },
        }
        cell.font.bold = true
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
      })
    }
  })
}

function formatRupiah(angka) {
  // return Number(angka)

  let reverse = angka.toString().split('').reverse().join('')
  let ribuan = reverse.match(/\d{1,3}/g)
  ribuan = ribuan.join('.').split('').reverse().join('')
  return 'Rp. ' + ribuan + ' ,00'
}

function formattingNumber(workSheet) {
  workSheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
    row.eachCell({ includeEmpty: false }, function (cell, colNumber) {
      if (typeof cell.value === 'number' || cell.value?.formula) {
        cell.numFmt = '"IDR" #,###.00'
        // cell.numFmt = 'Rp #,##0.00'
      }
    })
  })
}

module.exports = {
  importPlanExcel,
  exportReportBudgetPlan,
  exportReportBudgetPlans,
  exportRelocatePlan,
  exportReportActualExpense,
  exportReportActualExpenses,
  exportBudgetMonitoirng,
}
