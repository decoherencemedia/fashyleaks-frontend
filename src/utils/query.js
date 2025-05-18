export function objectToQueryString(fields) {
  const sortedKeys = Object.keys(fields)
    .filter((key) => fields[key] !== '')
    .sort()

  const params = new URLSearchParams()

  for (const key of sortedKeys) {
    params.append(key, fields[key])
  }

  return params.toString()
}

export function queryStringToObject(queryString) {
  const params = new URLSearchParams(queryString)
  const result = {}

  for (const [key, value] of params.entries()) {
    result[key] = value
  }

  return result
}
