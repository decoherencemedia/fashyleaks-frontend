<template>
  <div>
    <div v-show="!showCard">
      <UserTable :dataset="dataset" :collection="collection" @clickedRow="clickRow" />
    </div>
    <div v-show="showCard">
      <div class="row justify-center q-my-md">
        <q-card
          class="q-pa-0 position-relative"
          style="max-width: 750px; width: 100%"
          bordered
          flat
        >
          <div v-if="coverImage != ''" ref="container" class="image-crop-window">
            <img :src="coverImage" alt="Cropped" />
          </div>
          <div class="foreground-content q-pa-md">
            <div class="row items-start">
              <a
                v-if="datum.images"
                :href="datum.images[0]"
                target="_blank"
                style="
                  border: 1px solid rgba(255, 255, 255, 0.8);
                  border-radius: 6px;
                  overflow: hidden;
                "
              >
                <q-tooltip>{{ imageTooltip(datum.images[0]) }}</q-tooltip>

                <img
                  :src="datum.images[0]"
                  :alt="imageTooltip(datum.images[0])"
                  style="
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                    background-color: rgba(255, 255, 255, 0.8);
                  "
                  class="profile-picture"
                />
              </a>
              <div class="col">
                <div
                  class="text-h5 q-ml-lg q-my-lg"
                  style="
                    background-color: rgba(255, 255, 255, 0.8);
                    display: inline-block;
                    padding: 4px 8px;
                    border-radius: 6px;
                  "
                >
                  {{ datum[getResultTitleField(props.collection)] }}
                </div>
              </div>
              <div class="col-auto self-start">
                <q-btn
                  icon="close"
                  flat
                  round
                  dense
                  @click="clearData"
                  style="background-color: rgba(255, 255, 255, 0.8)"
                  aria-label="Close user information"
                />
              </div>
            </div>
          </div>

          <q-markup-table flat class="table-section">
            <tbody>
              <tr v-for="item in displayFields" :key="item.text">
                <td class="wrap-cell text-bold">{{ item.text }}</td>
                <td class="wrap-cell text-right">
                  <router-link
                    v-if="item.link"
                    :to="item.link.path.replace('{value}', encodeURIComponent(datum.id))"
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

          <div
            class="row q-col-gutter-none q-ml-none q-pb-none"
            :style="{
              backgroundColor:
                displayFields.length % 2 === 0 ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0)',
            }"
          >
            <div
              v-for="n in numberImages"
              :key="n"
              class="col-auto"
              style="width: 100px; height: 100px"
            >
              <a
                :href="datum.images[n]"
                target="_blank"
                style="display: block; width: 100px; height: 100px"
              >
                <q-tooltip>{{ imageTooltip(datum.images[n]) }}</q-tooltip>
                <q-img
                  :src="datum.images[n]"
                  style="width: 100%; height: 100%; object-fit: cover"
                  class="bg-grey-2 q-pa-none q-ma-none"
                  :ratio="1"
                  no-spinner
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
          color="info"
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
import { useQuasar } from 'quasar'
import UserTable from './UserTable.vue'
import { datasetToTitle } from '@/utils/query.js'
import { getResultFields, getResultTitleField } from '@/utils/configHelper.js'

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

const $q = useQuasar()

const emit = defineEmits(['clickedRow', 'clearedData'])

const router = useRouter()
const route = useRoute()

const showCard = computed(() => props.data && props.data.length > 0)
const datum = computed(() => {
  if (props.data && props.data.length > 0) {
    const value = props.data[0]
    if ('country' in value && value.country != null) {
      value['ip_address'] =
        [...value.country.toUpperCase()]
          .map((char) => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65))
          .join('') +
        ' ' +
        value['ip_address']
    }
    delete value.country
    return value
  } else {
    return {}
  }
})
const coverImage = computed(() => {
  const images = datum.value.images || []
  return images.find((img) => img.toLowerCase().includes('cover')) || ''
})

const permalink = computed(() => {
  const path = `/${props.dataset}?tab=${props.collection}&id=${datum.value.id}`
  if (typeof window !== 'undefined') {
    return window.location.origin + path
  }

  return path
})
const displayImages = computed(() => datum.value.images && datum.value.images.length > 1)
const numberImages = computed(() => (datum.value.images?.length || 1) - 1)

const displayFields = computed(() => {
  const allFields = getResultFields(props.dataset, props.collection)
  const titleField = getResultTitleField(props.collection)
  // Remove the field used as the card title
  const filtered = allFields.filter(f => f.property !== titleField)
  // Partition into non-linked and linked fields
  const nonLinked = filtered.filter(f => !f.link)
  const linked = filtered.filter(f => f.link)
  // Non-linked fields first, then linked fields, but only if datum has a value for the property
  return [...nonLinked, ...linked].filter(f => datum.value[f.property])
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
  if (url.includes('cover')) return `Image from ${datasetTitle} cover picture`
  if (url.includes('wayback'))
    return `Image from ${datasetTitle} profile picture (via Wayback Machine)`
  return `Image from ${datasetTitle} profile picture`
}
</script>

<style scoped>
.profile-picture {
  max-height: 100px;
  max-width: 100px;
  margin: 0 !important;
  padding: 0 !important;
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

.image-crop-window {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150px;
  overflow: hidden;
  z-index: 0;
}

.image-crop-window img {
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  display: block;
}

.position-relative {
  position: relative;
}

.foreground-content {
  position: relative;
  z-index: 1;
  /* Ensure content doesn't overlap with table during SSR hydration */
  min-height: 150px;
}

.table-section {
  position: relative;
  z-index: 1;
  /* Prevent SSR hydration layout shift */
  margin-top: 0;
}

.cover-image-container {
  height: 150px;
  overflow: hidden;
  position: relative;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-section {
  position: relative;
}
</style>
