<template>
  <div>
    <q-form @submit.prevent="sendData">
      <q-card flat>
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

            <q-btn class="q-ml-md" color="primary" label="Search" @click="sendData">
              <q-tooltip>Search for posts matching query</q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-form>

    <q-banner v-if="errorMessage" class="q-mt-md" dense rounded color="negative" text-color="white">
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
    />
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import queryString from 'query-string'

import ContentResult from './ContentResult.vue'
import ContentResults from './ContentResults.vue'
import TextInput from './TextInput.vue'
import AutocompleteInput from './AutocompleteInput.vue'
import config from '../assets/config.json'

import { useFieldStore } from '../stores/FieldStore'

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
  const query = queryString.stringify(fields, { skipEmptyString: true })
  const path = `/${props.dataset}?tab=${props.collection}&${query}`
  if (route.fullPath !== path) router.replace(path)
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
  const query = queryString.stringify(params, { skipEmptyString: true })
  if (query !== store.querystrings?.[props.dataset]?.[props.collection]) {
    store.search({
      dataset: props.dataset,
      collection: props.collection,
      queryString: query,
      resetPagination: true,
    })
    store.setQueryString({
      dataset: props.dataset,
      collection: props.collection,
      value: query,
    })
  } else if (Object.keys(params).length === 0) {
    clearData()
  }
}

watch(route, processRoute, { immediate: true })
onMounted(processRoute)
</script>

<style scoped>
.q-gutter-md > * {
  flex: 1 1 300px;
}
</style>
