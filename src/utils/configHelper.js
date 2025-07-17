import config from '@/assets/config.json'

export function getCollectionFields(collection) {
  const collectionConfig = config.collections[collection]
  if (!collectionConfig) return []

  return collectionConfig.fields.map(fieldType => {
    const fieldConfig = config.fieldTypes[fieldType]
    if (!fieldConfig) {
      console.warn(`Field type '${fieldType}' not found in fieldTypes`)
      return null
    }

    return {
      label: fieldConfig.label,
      variable: fieldType,
      component: fieldConfig.component,
      additional: fieldConfig.autocomplete ? { type: fieldConfig.autocomplete } : undefined
    }
  }).filter(Boolean)
}

export function getDatasetCollections(dataset) {
  return config.datasets[dataset]?.collections || []
}

export function getDatasetLists(dataset) {
  return config.datasets[dataset]?.lists || []
}

export function getAutocompleteConfig(type) {
  return config.autocompletes[type] || null
}

export function getResultFields(dataset, collection) {
  const commonFields = config.fieldDefinitions.common || {}
  const datasetFields = config.fieldDefinitions[dataset] || {}

  const headers = getTableHeaders(dataset, collection)

  return headers.map(headerKey => {
    const key = headerKey.field || headerKey;
    const field = commonFields[key] || datasetFields[key]
    if (!field) {
      console.warn(`Field '${key}' not found for ${dataset}/${collection}`)
      return null
    }

    const result = {
      text: field.text,
      property: field.property
    }

    if (field.link) {
      result.link = {
        path: field.link.template.replace('{dataset}', dataset),
        field: field.property
      }
    }

    return result
  }).filter(Boolean)
}

export function getTableHeaders(dataset, collection) {
  const collectionHeaders = config.tableHeaders[collection]
  if (!collectionHeaders) return []

  const headers = []

  if (collectionHeaders.common) {
    headers.push(...collectionHeaders.common)
  }

  if (collectionHeaders[dataset]) {
    headers.push(...collectionHeaders[dataset])
  }

  return headers.map(headerKey => ({
    label: getFieldLabel(headerKey, dataset),
    field: headerKey
  }))
}

function getFieldLabel(fieldKey, dataset) {
  const commonFields = config.fieldDefinitions.common || {}
  const datasetFields = config.fieldDefinitions[dataset] || {}

  const field = commonFields[fieldKey] || datasetFields[fieldKey]
  return field ? field.text : fieldKey
}

export function usesMarkdown(dataset, collection) {
  const markdownCollections = config.datasets[dataset]?.useMarkdown || []
  return markdownCollections.includes(collection)
}

export function getResultTitleField(collection) {
  return config.resultTitles[collection] || 'id'
}

export function isSingleCollection(collection) {
  return config.singleCollections.includes(collection)
}

export function getPaginationConfig() {
  return config.pagination
}

export const backwardCompatibility = {
  get fields() {
    const fields = {}
    Object.keys(config.collections).forEach(collection => {
      fields[collection] = getCollectionFields(collection)
    })
    return fields
  },

  get collections() {
    const collections = {}
    Object.keys(config.datasets).forEach(dataset => {
      collections[dataset] = config.datasets[dataset].collections
    })
    return collections
  },

  get lists() {
    const lists = {}
    Object.keys(config.datasets).forEach(dataset => {
      lists[dataset] = config.datasets[dataset].lists
    })
    return lists
  },

  get autocompletes() {
    return config.autocompletes
  },

  get resultFields() {
    const resultFields = {}
    Object.keys(config.datasets).forEach(dataset => {
      resultFields[dataset] = {}
      config.datasets[dataset].collections.forEach(collection => {
        resultFields[dataset][collection] = getResultFields(dataset, collection)
      })
    })
    return resultFields
  },

  get resultTitleField() {
    return config.resultTitles
  },

  get useMarkdown() {
    const useMarkdown = {}
    Object.keys(config.datasets).forEach(dataset => {
      useMarkdown[dataset] = config.datasets[dataset].useMarkdown
    })
    return useMarkdown
  },

  get headers() {
    const headers = {}
    Object.keys(config.datasets).forEach(dataset => {
      headers[dataset] = {}
      config.datasets[dataset].collections.forEach(collection => {
        headers[dataset][collection] = getTableHeaders(dataset, collection)
      })
    })
    return headers
  },

  get singleCollections() {
    return config.singleCollections
  }
}