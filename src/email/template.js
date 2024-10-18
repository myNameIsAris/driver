module.exports = {
  newContractTemplate: (data) => {
    let allTerm = ``
    for (const term of JSON.parse(data.term_of_payments)) {
      allTerm += `${term.term} : ${term.percentage}% <br>`
    }
    return `
Date : ${data.created_at} <br>
Admin : ${data.user.fullname} <br><br>

Informed that a new contract has been issued <br>
Contract No: ${data.no}<br>
Contract Name: ${data.name}<br>
Type of Contract: ${data.typeContract.name}<br>
Contract Information: ${data.contract}<br>
Contract Owner: ${data.owner.fullname}<br>
Contract Budget: ${data.budget}<br>
Vendor: ${data.vendor}<br>
Remaining Budget: ${data.remaining_budget || '-'}<br>
Contract Duration: from ${data.start_date} to ${data.end_date}<br>
Term of payment:<br>
${allTerm}
Sent automatically from the Ucontract<br>
    `
  },
}
