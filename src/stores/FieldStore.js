import { defineStore } from 'pinia'
import { getCollectionFields, getDatasetCollections, getDatasetLists } from '@/utils/configHelper.js'

const api_url = 'https://api.decoherencemedia.com'
// const api_url = 'http://localhost:5000/'

let apiFetch = function (path) {
  return new Promise((resolve, reject) => {
    fetch(`${api_url}${path}`).then(async (response) => {
      const isJson = response.headers.get('content-type')?.includes('application/json')
      const data = isJson ? await response.json() : null
      if (!response.ok) {
        reject(data)
      }
      resolve(data)
    })
  })
}

// Helper to get all datasets
import config from '@/assets/config.json'
const allDatasets = Object.keys(config.datasets)

function createNestedObjCollections(value, fields) {
  const obj = {}
  for (const dataset of allDatasets) {
    const collections = getDatasetCollections(dataset)
    obj[dataset] = {}
    collections.forEach((collection) => {
      if (fields) {
        obj[dataset][collection] = {}
        getCollectionFields(collection).forEach((field) => {
          obj[dataset][collection][field.variable] = value
        })
      } else {
        obj[dataset][collection] = value
      }
    })
  }
  return obj
}

function createNestedObjLists(value) {
  const obj = {}
  for (const dataset of allDatasets) {
    const lists = getDatasetLists(dataset)
    obj[dataset] = {}
    lists.forEach((list) => {
      obj[dataset][list] = value
    })
  }
  return obj
}

export const useFieldStore = defineStore('fields', {
  state: () => ({
    activeDataset: null,
    activeTab: null,
    results: createNestedObjCollections([], false),
    error: createNestedObjCollections(null, false),
    pagination: createNestedObjCollections(1, false),
    loading: createNestedObjCollections(false, false),
    fields: createNestedObjCollections('', true),
    lists: createNestedObjLists([]),
    listsLoading: createNestedObjLists(false),
    listsError: createNestedObjLists(null),
    querystrings: createNestedObjCollections('', false),
    offsets: createNestedObjCollections(0, false),
    counts: createNestedObjCollections(0, false),
  }),

  actions: {
    setActiveDataset(dataset) {
      this.activeDataset = dataset
    },
    setActiveTab(tab) {
      this.activeTab = tab
    },
    setResult({ dataset, collection, value }) {
      this.results[dataset][collection] = value
    },
    setError({ dataset, collection, value }) {
      this.error[dataset][collection] = value
    },
    setPagination({ dataset, collection, value }) {
      this.pagination[dataset][collection] = value
    },
    setLoading({ dataset, collection, value }) {
      this.loading[dataset][collection] = value
    },
    setField({ dataset, collection, field, value }) {
      this.fields[dataset][collection][field] = value
    },
    setList({ dataset, endpoint, value }) {
      this.lists[dataset][endpoint] = value
    },
    setListLoading({ dataset, endpoint, value }) {
      this.listsLoading[dataset][endpoint] = value
    },
    setListError({ dataset, endpoint, value }) {
      this.listsError[dataset][endpoint] = value
    },
    setQueryString({ dataset, collection, value }) {
      this.querystrings[dataset][collection] = value
    },
    setOffset({ dataset, collection, value }) {
      this.offsets[dataset][collection] = value
    },
    setCount({ dataset, collection, value }) {
      this.counts[dataset][collection] = value
    },

    async loadList({ dataset, endpoint }) {
      this.setListLoading({ dataset, endpoint, value: true })
      try {
        const data = await apiFetch(`/${dataset}/lists/${endpoint}`)
        this.setList({ dataset, endpoint, value: data.data })
        this.setListError({ dataset, endpoint, value: null })
      } catch (error) {
        const message =
          'message' in error ? error.message : 'Some other error occurred, contact the developers'
        this.setList({ dataset, endpoint, value: [] })
        this.setListError({ dataset, endpoint, value: message })
      } finally {
        this.setListLoading({ dataset, endpoint, value: false })
      }
    },

    resetSearch({ dataset, collection }) {
      this.setResult({ dataset, collection, value: [] })
      this.setQueryString({ dataset, collection, value: '' })
      this.setPagination({ dataset, collection, value: 1 })
      this.setOffset({ dataset, collection, value: 0 })
      this.setCount({ dataset, collection, value: 0 })
      Object.keys(this.fields[dataset][collection]).forEach((field) => {
        this.setField({ dataset, collection, field, value: '' })
      })
      this.setError({ dataset, collection, value: null })
    },

    async search({ dataset, collection, queryString, resetPagination }) {
      this.setLoading({ dataset, collection, value: true })
      this.setQueryString({ dataset, collection, value: queryString })

      try {
        const data = await apiFetch(`/${dataset}/${collection}?${queryString}`)
        this.setResult({ dataset, collection, value: data.data })
        this.setError({ dataset, collection, value: null })
        this.setLoading({ dataset, collection, value: false })

        if (resetPagination) {
          this.setPagination({ dataset, collection, value: 1 })
        } else {
          this.setResult({
            dataset,
            collection,
            value: data.data,
          })
        }
      } catch (error) {
        const message =
          'message' in error ? error.message : 'Some other error occurred, contact the developers'
        this.setResult({ dataset, collection, value: [] })
        this.setError({ dataset, collection, value: message })
        this.setLoading({ dataset, collection, value: false })
        this.setPagination({ dataset, collection, value: 1 })
      }

      if (resetPagination) {
        try {
          const countData = await apiFetch(`/${dataset}/count/${collection}?${queryString}`)
          this.setCount({ dataset, collection, value: countData.data[0].count })
          this.setLoading({ dataset, collection, value: false })
        } catch (error) {
          const message =
            'message' in error ? error.message : 'Some other error occurred, contact the developers'
          this.setCount({ dataset, collection, value: 0 })
          this.setError({ dataset, collection, value: message })
          this.setLoading({ dataset, collection, value: false })
        }
      }
    },
  },
})
