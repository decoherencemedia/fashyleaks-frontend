<template>
  <div>
    <div v-show="!showCard">
      <UserTable :dataset="dataset" :collection="collection" @clickedRow="clickRow" />
    </div>
    <div v-show="showCard">
      <div class="row justify-center q-my-md">
        <q-card class="q-pa-0" style="max-width: 750px; width: 100%" bordered flat>
          <div class="row items-start">
            <div v-if="datum.images" class="q-pr-none">
              <a :href="datum.images[0]" target="_blank">
                <q-tooltip>{{ imageTooltip(datum.images[0]) }}</q-tooltip>
                <img
                  :src="datum.images[0]"
                  :alt="imageTooltip(datum.images[0])"
                  style="max-height: 100px; max-width: 100px"
                />
              </a>
            </div>
            <div class="col">
              <div class="text-h5 q-ml-lg q-my-lg" style="">
                {{ datum[config.resultTitleField[props.collection]] }}
              </div>
            </div>
            <div class="col-auto self-start">
              <q-btn
                icon="close"
                flat
                round
                dense
                @click="clearData"
                aria-label="Close user information"
              />
            </div>
          </div>

          <q-markup-table flat>
            <tbody>
              <tr v-for="item in displayFields" :key="item.text">
                <td class="wrap-cell text-bold">{{ item.text }}</td>
                <td class="wrap-cell text-right">
                  <router-link
                    v-if="item.link"
                    :to="item.link.path + encodeURIComponent(datum[item.link.field])"
                  >
                    {{ datum[item.property] }}
                  </router-link>
                  <span v-else>{{ datum[item.property] }}</span>
                </td>
              </tr>
              <tr v-if="displayImages">
                <td class="text-bold">More Images</td>
                <td></td>
              </tr>
            </tbody>
          </q-markup-table>

          <div class="row q-col-gutter-sm">
            <div v-for="n in numberImages" :key="n" class="col-3">
              <a :href="datum.images[n]" target="_blank">
                <q-tooltip>{{ imageTooltip(datum.images[n]) }}</q-tooltip>
                <q-img
                  :src="datum.images[n]"
                  ratio="1"
                  class="bg-grey-2"
                  style="max-height: 100px; max-width: 100px"
                />
              </a>
            </div>
          </div>
        </q-card>
      </div>

      <div class="row justify-center q-ml-sm q-mt-sm">
        <q-btn
          class="mb-1"
          size="md"
          color="secondary"
          @click="copyPermalink"
          label="Permalink"
          icon="link"
          unelevated
          :title="`Copy permanent link to this ${collection.slice(0, -1)}`"
          style="border-radius: 6px"
        >
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar, useMeta } from 'quasar'
import config from '@/assets/config.json'
import UserTable from './UserTable.vue'
import { datasetToTitle } from '@/utils/query.js'
import { useFieldStore } from '@/stores/FieldStore'

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
const $q = useQuasar()

const emit = defineEmits(['clickedRow', 'clearedData'])

const router = useRouter()
const route = useRoute()

const showCard = computed(() => props.data && props.data.length > 0)
const datum = computed(() => {
  return props.data && props.data.length > 0 ? props.data[0] : {}
})
const permalink = computed(() => {
  const path = `/${props.dataset}?tab=${props.collection}&id=${datum.value.id}`
  return window.location.origin + path
})
const displayImages = computed(() => datum.value.images && datum.value.images.length > 1)
const numberImages = computed(() => (datum.value.images?.length || 1) - 1)

const displayFields = computed(() => {
  return (
    config.resultFields[props.dataset]?.[props.collection]?.filter(
      (f) => datum.value[f.property],
    ) || []
  )
})

async function copyPermalink() {
  try {
    await navigator.clipboard.writeText(permalink.value)
    $q.notify({
      type: 'positive',
      message: 'Copied to clipboard',
      timeout: 2000,
    })
  } catch (e) {
    console.log(`Copying permalink failed with error ${e}`)
    $q.notify({
      type: 'negative',
      message: `Copying failed`,
      timeout: 2000,
    })
  }
}

function clickRow() {
  emit('clickedRow')
}

function clearData() {
  const newPath = `/${props.dataset}?tab=${props.collection}`
  if (route.fullPath !== newPath) router.replace(newPath)
  emit('clearedData')
}

function imageTooltip(url) {
  if (url.includes('email')) return 'Image from email address'
  const datasetTitle = datasetToTitle(props.dataset)
  return `Image from ${datasetTitle} profile picture`
}

function metaTitle() {
  const datasetTitle = datasetToTitle(props.dataset)
  const fields = store.fields[props.dataset]?.[props.collection]
  const name = datum.value?.[config.resultTitleField[props.collection]]
  if (!!fields.id && Object.keys(fields).every((key) => key === 'id' || fields[key] === '')) {
    return `${datasetTitle} ${props.collection.slice(0, -1)} #${fields.id}: ${name}`
  } else {
    return `Searching ${datasetTitle} ${props.collection}`
  }
}

useMeta(() => ({
  title: metaTitle(),
}))
</script>

<style scoped>
img {
  max-height: 100px;
  max-width: 100px;
  margin: 0;
  padding: 0;
  display: block;
}

a {
  margin: 0;
  padding: 0;
  display: block;
}

.wrap-cell {
  max-width: 250px;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
}
</style>
