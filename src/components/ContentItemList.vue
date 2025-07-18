<template>
  <div class="pagination-and-divider">
    <div class="row justify-center">
      <q-pagination
        v-if="props.data.length > resultsPerPage"
        v-model="page"
        class="top-pagination"
        :max="length"
        :max-pages="totalVisible"
        color="info"
        boundary-numbers
        unelevated
        input
      />
      <div v-else-if="props.data.length > 0" class="top-pagination" />
      <div
        v-if="props.data.length < resultsPerPage"
        class="top-pagination-placeholder"
      />
    </div>

    <div class="top-divider">
      <q-linear-progress v-if="isLoading" indeterminate color="cyan-7" class="progress-bar" />
      <hr v-else-if="props.data.length > 0" class="custom-hr" />
    </div>
  </div>

  <div v-if="!isLoading">
    <div v-for="(item, index) in pagedData" :key="item.id">
      <ContentItem
        :item="item"
        :dataset="dataset"
        :collection="collection"
        :use-markdown="useMarkdown"
        :class="index % 2 === 0 ? 'dark-table-row' : 'light-table-row'"
      />
    </div>
  </div>
  <div class="row justify-center">
    <q-pagination
      v-if="props.data.length > 0"
      v-model="page"
      class="bottom-pagination"
      :max="length"
      :max-pages="totalVisible"
      color="info"
      boundary-numbers
      unelevated
      input
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useFieldStore } from '@/stores/FieldStore'
import ContentItem from './ContentItem.vue'
import { getPaginationConfig } from 'src/utils/configHelper'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  dataset: {
    type: String,
    required: true,
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

const emit = defineEmits(['fetchMore'])

const isLoading = computed(() => {
  return store.loading?.[props.dataset]?.[props.collection]
})

watch(page, (value) => {
  updateServerPagination(value)
  store.setPagination({ dataset: props.dataset, collection: props.collection, value })
})

const length = computed(() => {
  const count = store.counts[props.dataset]?.[props.collection] || 0
  return props.data.length > 0 ? Math.ceil(count / resultsPerPage) : 0
})

const paginationConfig = getPaginationConfig();
const resultsPerPage = paginationConfig.resultsPerPage;
const batchSize = paginationConfig.batchSize;
const totalVisible = paginationConfig.totalVisible;

const clientOffset = computed(() => {
  if (typeof window !== 'undefined') {
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 10)
  }

  const serverPage = store.pagination[props.dataset]?.[props.collection] || 1
  const offset = store.offsets[props.dataset]?.[props.collection] || 0
  return (serverPage - 1) * resultsPerPage - offset
})

const pagedData = computed(() => {
  return props.data.slice(clientOffset.value, clientOffset.value + resultsPerPage)
})

function updateServerPagination(value) {
  const currentValue = store.pagination[props.dataset]?.[props.collection] || 1
  const offset = store.offsets[props.dataset]?.[props.collection] || 0

  let newOffset = 0
  let needToFetch = false

  if (
    value > currentValue &&
    value >= (offset + batchSize) / resultsPerPage + 1
  ) {
    newOffset =
      value - currentValue === 1
        ? offset + batchSize
        : (value - 1) * resultsPerPage
    needToFetch = true
  } else if (value < currentValue && value <= offset / resultsPerPage) {
    newOffset =
      currentValue - value === 1
        ? offset - batchSize
        : (value - 1) * resultsPerPage
    needToFetch = true
  }

  if (needToFetch) {
    const oldQuery = store.querystrings[props.dataset]?.[props.collection] || ''
    const params = new URLSearchParams(oldQuery)
    params.set('offset', newOffset)
    const newQuery = params.toString()

    emit('fetchMore', newQuery)

    store.setOffset({ dataset: props.dataset, collection: props.collection, value: newOffset })
  }
}
</script>

<style lang="scss" scoped>
@import  '../css/quasar.variables.scss';

.top-pagination {
  padding-bottom: 1em;
}

.bottom-pagination {
  padding-top: 1em;
}

.top-pagination-placeholder {
  height: 51px;
}

.progress-bar {
  margin-top: 16px 0;
  width: 100%;
}

.custom-hr {
  margin-top: 0;
  margin-bottom: 0;
  padding-bottom: 0;
  border: none;
  height: 1px;
  background-color: $border-color;
}
</style>
