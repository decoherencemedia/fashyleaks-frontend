<template>
  <q-page class="q-pa-none">
    <q-pagination
      v-if="data.length > config.pagination.resultsPerPage"
      v-model="page"
      class="top-pagination"
      :max="length"
      :max-pages="config.pagination.totalVisible"
      color="cyan-8"
      boundary-numbers
      unelevated
      input
    />

    <div v-else-if="data.length > 0" class="top-pagination" />
    <div v-else />

    <div v-for="(item, index) in pagedData" :key="item.id">
      <ContentBox
        :item="item"
        :dataset="dataset"
        :collection="collection"
        :use-markdown="useMarkdown"
        :background-color="index % 2 === 0 ? '#ffffff' : 'rgba(0, 0, 0, .1)'"
      />
    </div>

    <q-pagination
      v-if="data.length > 0"
      v-model="page"
      class="bottom-pagination"
      :max="length"
      :max-pages="config.pagination.totalVisible"
      color="cyan-8"
      boundary-numbers
      unelevated
      input
    />
  </q-page>
</template>

<script setup>
// import { ref, computed, watch } from 'vue'
import { ref, computed } from 'vue'
import { useFieldStore } from '@/stores/FieldStore'
import ContentBox from './ContentBox.vue'
import config from '@/assets/config.json'
// import queryString from 'query-string'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  dataset: {
    type: String,
    default: '',
  },
  collection: {
    type: String,
    default: 'posts',
  },
  useMarkdown: {
    type: Boolean,
    default: false,
  },
})

const store = useFieldStore()
const page = ref(store.pagination[props.dataset]?.[props.collection] || 1)

// watch(page, (value) => {
//   updateServerPagination(value)
//   store.setPagination(props.dataset, props.collection, value)
// })

const length = computed(() => {
  const count = store.counts[props.dataset]?.[props.collection] || 0
  return props.data.length > 0 ? Math.ceil(count / config.pagination.resultsPerPage) : 0
})

const clientOffset = computed(() => {
  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 10)
  const serverPage = store.pagination[props.dataset]?.[props.collection] || 1
  const offset = store.offsets[props.dataset]?.[props.collection] || 0
  return (serverPage - 1) * config.pagination.resultsPerPage - offset
})

const pagedData = computed(() => {
  return props.data.slice(clientOffset.value, clientOffset.value + config.pagination.resultsPerPage)
})

// function updateServerPagination(value) {
//   const currentValue = store.pagination[props.dataset]?.[props.collection] || 1
//   const offset = store.offsets[props.dataset]?.[props.collection] || 0

//   let newOffset = 0
//   let needToFetch = false

//   if (
//     value > currentValue &&
//     value >= (offset + config.pagination.batchSize) / config.pagination.resultsPerPage + 1
//   ) {
//     newOffset =
//       value - currentValue === 1
//         ? offset + config.pagination.batchSize
//         : (value - 1) * config.pagination.resultsPerPage
//     needToFetch = true
//   } else if (value < currentValue && value <= offset / config.pagination.resultsPerPage) {
//     newOffset =
//       currentValue - value === 1
//         ? offset - config.pagination.batchSize
//         : (value - 1) * config.pagination.resultsPerPage
//     needToFetch = true
//   }

//   if (needToFetch) {
//     const oldQuery = store.querystrings[props.dataset]?.[props.collection] || ''
//     const parsed = queryString.parse(oldQuery)
//     parsed.offset = newOffset

//     const newQuery = queryString.stringify(parsed)
//     store.setQueryString(props.dataset, props.collection, newQuery)

//     store.search({
//       dataset: props.dataset,
//       collection: props.collection,
//       queryString: newQuery,
//       resetPagination: false,
//     })

//     store.setOffset(props.dataset, props.collection, newOffset)
//   }
// }
</script>

<style scoped>
.top-pagination {
  border-bottom: 1px solid #999;
  padding-bottom: 1em;
}

.bottom-pagination {
  padding-top: 1em;
}
</style>
