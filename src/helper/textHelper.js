const transformText = (text, data) => {
  const regex = /\[(.*?)\]/g
  const result = text.replace(regex, (match, field) => {
    return data[field] || match
  })

  return result
}

const transformSummary = (data) => {
  for (const field of Object.keys(data)) {
    data[field] = String(data[field])
  }

  return data
}

const transformSummaryActual = (data) => {
  for (const field of Object.keys(data)) {
    data[field] = {
      plan: String(data[field].plan),
      actual: String(data[field].actual),
    }
  }

  return data
}

const toFriendlyURL = (filename) => {
  let url = filename.toLowerCase()
  url = url.replace(/[^a-z0-9]+/g, '-')
  url = url.replace(/^-+|-+$/g, '')

  return url
}

module.exports = {
  transformText,
  transformSummary,
  transformSummaryActual,
  toFriendlyURL,
}
