export function objectToQueryString(fields) {
  const sortedKeys = Object.keys(fields)
    .filter((key) => fields[key] !== '')
    .sort()

  const params = new URLSearchParams()

  for (const key of sortedKeys) {
    params.append(key, fields[key])
  }

  console.log('objectToQueryString; fields: ', fields, 'querystring: ', params.toString())

  return params.toString()
}

export function queryStringToObject(queryString) {
  const params = new URLSearchParams(queryString)
  const result = {}

  for (const [key, value] of params.entries()) {
    result[key] = value
  }

  console.log('queryStringToObject; queryString: ', queryString, 'fields: ', result)

  return result
}
