<template>
  <div>
    <q-form @submit.prevent="sendData">
      <q-card flat class="q-pa-none">
        <q-card-section>
          <div class="q-gutter-md row">
            <component
              :is="determineComponent(item)"
              v-for="item in config.fields[collection]"
              :key="item.variable"
              :field="item.variable"
              :label="item.label"
              :dataset="dataset"
              :collection="collection"
              :additional="item.additional ?? {}"
              @onEnter="sendData"
            />

            <q-btn class="q-ml-md" color="secondary" label="Search" @click="sendData">
              <q-tooltip>Search for posts matching query</q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-form>

    <q-banner v-if="errorMessage" class="q-mt-md text-white bg-negative" style="text-align: center">
      <template v-slot:avatar>
        <q-icon name="warning" color="white" size="lg" />
      </template>
      {{ errorMessage }}
    </q-banner>

    <q-linear-progress v-if="isLoading" indeterminate color="cyan-7" class="q-mt-md" />

    <component
      :is="resultComponent"
      :data="results"
      :dataset="dataset"
      :collection="collection"
      :use-markdown="useMarkdown"
      @clickedRow="sendData()"
      @clearedData="clearData()"
      @fetchMore="handleFetchMore"
    />
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ContentResult from './ContentResult.vue'
import ContentResults from './ContentResults.vue'
import TextInput from './TextInput.vue'
import AutocompleteInput from './AutocompleteInput.vue'
import config from '@/assets/config.json'
import { objectToQueryString } from '@/utils/query'

import { useFieldStore } from '@/stores/FieldStore'

const props = defineProps({
  dataset: String,
  collection: String,
})

const store = useFieldStore()

const route = useRoute()
const router = useRouter()

const errorMessage = computed(() => store.error?.[props.dataset]?.[props.collection])
const isLoading = computed(() => store.loading?.[props.dataset]?.[props.collection])
const results = computed(() => store.results?.[props.dataset]?.[props.collection])

const isSingle = computed(() => config.singleCollections.includes(props.collection))

const useMarkdown = computed(() => {
  return config.useMarkdown?.[props.dataset]?.includes(props.collection) ?? false
})

const resultComponent = computed(() => (isSingle.value ? ContentResult : ContentResults))

function determineComponent(item) {
  return 'component' in item ? AutocompleteInput : TextInput
}

function sendData() {
  const fields = { ...store.fields?.[props.dataset]?.[props.collection] }
  Object.keys(fields).forEach((k) => {
    if (!fields[k]) delete fields[k]
  })
  const query = objectToQueryString(fields)
  const path = `/${props.dataset}?tab=${props.collection}&${query}`
  if (route.fullPath !== path) {
    router.replace(path)
  }
}

function clearData() {
  store.resetSearch({
    dataset: props.dataset,
    collection: props.collection,
  })
}

function processRoute() {
  if (route.path.slice(1) !== props.dataset) return
  const params = { ...route.query }
  if (params.tab !== props.collection) return
  delete params.tab
  const query = objectToQueryString(params)
  if (!query) return
  if (query !== store.querystrings?.[props.dataset]?.[props.collection]) {
    store.search({
      dataset: props.dataset,
      collection: props.collection,
      queryString: query,
      resetPagination: true,
    })
  }
}

function handleFetchMore(newQuery) {
  store.search({
    dataset: props.dataset,
    collection: props.collection,
    queryString: newQuery,
    resetPagination: false,
  })
}

onMounted(processRoute)
watch(route, processRoute, { immediate: true })
</script>

<style scoped>
.q-gutter-md > * {
  flex: 1 1 300px;
}
</style>
