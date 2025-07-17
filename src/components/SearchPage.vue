<template>
  <div>
    <div v-if="getCollectionFields(collection).length > 0">
      <q-form @submit.prevent="sendData">
        <q-card flat :class="$q.platform.is.mobile ? 'q-mx-sm' : 'q-mx-md'">
          <div row class="text-h6">Searching {{ title }} {{ collection }}</div>
          <q-card-section class="q-px-none">
            <div :class="$q.platform.is.mobile ? 'q-gutter-y-md row' : 'q-gutter-lg row'">
              <component
                :is="determineComponent(item)"
                v-for="item in getCollectionFields(collection)"
                :key="item.variable"
                :field="item.variable"
                :label="item.label"
                :dataset="dataset"
                :collection="collection"
                :additional="item.additional ?? {}"
                @onEnter="sendData"
                :class="$q.platform.is.mobile ? 'row' : 'col q-px-lg'"
              />

              <q-btn
                :class="$q.platform.is.mobile ? 'col-auto q-ml-none' : 'col-auto q-ml-md'"
                color="info"
                label="Search"
                @click="sendData"
                :title="`Search for ${collection} matching query`"
                unelevated
                style="border-radius: 6px"
              >
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </q-form>

      <q-banner v-if="rawError" class="q-mt-md text-white bg-negative" style="text-align: center">
        <template v-slot:avatar>
          <q-icon name="warning" color="white" size="lg" />
        </template>
        <div v-html="errorMessageHtml" />
      </q-banner>
    </div>
    <AccountDetail
      v-if="isSingle"
      :data="results"
      :dataset="dataset"
      :collection="collection"
      :use-markdown="useMarkdown"
      @clickedRow="sendData()"
      @clearedData="clearData()"
    />
    <ContentItemList
      v-else
      :data="results"
      :dataset="dataset"
      :collection="collection"
      :use-markdown="useMarkdown"
      @fetchMore="handleFetchMore"
    >
    </ContentItemList>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import AccountDetail from './AccountDetail.vue'
import ContentItemList from './ContentItemList.vue'
import TextInput from './TextInput.vue'
import AutocompleteInput from './AutocompleteInput.vue'
import { getCollectionFields, isSingleCollection, usesMarkdown } from '@/utils/configHelper.js'
import { objectToQueryString } from '@/utils/query'

import { useFieldStore } from '@/stores/FieldStore'
import { datasetToTitle } from '@/utils/query.js'

const props = defineProps({
  dataset: String,
  collection: String,
})

const store = useFieldStore()

const route = useRoute()
const router = useRouter()

const rawError = computed(() => store.error?.[props.dataset]?.[props.collection] ?? '')

const errorMessageHtml = computed(() => {
  return rawError.value.replace(/`([^`]+)`/g, '<i>$1</i>')
})

const results = computed(() => store.results?.[props.dataset]?.[props.collection])

const isSingle = computed(() => isSingleCollection(props.collection))

const useMarkdown = computed(() => usesMarkdown(props.dataset, props.collection))

function determineComponent(item) {
  return item.component === 'AutocompleteInput' ? AutocompleteInput : TextInput
}

function sendData() {
  const fields = { ...store.fields?.[props.dataset]?.[props.collection] }
  if (Object.values(fields).every((val) => val === '' || val === undefined)) return
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
  if (route.path.slice(1) !== props.dataset) {
    return
  }
  const params = { ...route.query }
  if (params.tab !== props.collection) {
    return
  }
  delete params.tab
  const query = objectToQueryString(params)
  if (!query) {
    return
  }
  if (query !== store.querystrings?.[props.dataset]?.[props.collection]) {
    store.search({
      dataset: props.dataset,
      collection: props.collection,
      queryString: query,
      resetPagination: true,
    })
  } else {
    for (const [key, value] of Object.entries(params)) {
      store.setField({
        dataset: props.dataset,
        collection: props.collection,
        field: key,
        value,
      })
    }
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

const title = datasetToTitle(props.dataset)

onMounted(processRoute)
watch(route, processRoute, { immediate: true })
</script>

<style scoped>
.q-gutter-md > * {
  flex: 1 1 300px;
}
</style>
