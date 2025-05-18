<template>
  <div :id="dataset">
    <q-toolbar class="text-accent bg-primary">
      <component :is="iconComponent" color="secondary" size="2rem" />
      <q-tabs v-model="tab" inline-label indicator-color="secondary">
        <q-tab
          v-for="collection in config.collections[props.dataset]"
          :key="collection"
          :name="collection"
          :title="`Search ${title} ${collection}`"
        >
          {{ collection }}
        </q-tab>
        <q-tab name="about" :title="`About ${title}`">About</q-tab>
      </q-tabs>
    </q-toolbar>
    <q-tab-panels v-model="tab">
      <q-tab-panel
        v-for="collection in config.collections[props.dataset]"
        :name="collection"
        :key="collection"
        :value="collection"
      >
        <div class="text-h6">Searching {{ title }} {{ tab }}</div>
        <search-page :dataset="dataset" :collection="tab" />
      </q-tab-panel>
      <q-tab-panel key="about" name="about" :transition="false" :reverse-transition="false">
        <component :is="aboutComponent" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, markRaw } from 'vue'
import config from '../assets/config.json'
import SearchPage from '../components/SearchPage.vue'
import { useRoute, useRouter } from 'vue-router'
import { useFieldStore } from '../stores/FieldStore'

const props = defineProps({
  dataset: {
    type: String,
    required: true,
  },
})

const store = useFieldStore()

const collections = config.collections[props.dataset] || []
const validTabs = [...collections, 'about']
const defaultTab = collections[0] || 'about'

const title = props.dataset
  .toLowerCase()
  .split('-')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ')

const oneWordTitle = title.replace(' ', '')

const tab = ref(defaultTab)
const iconComponent = ref(null)
const aboutComponent = ref(null)

const loadIcon = async () => {
  const icon = await import(`../components/icons/${oneWordTitle}Icon.vue`)
  iconComponent.value = markRaw(icon.default)
}

const loadAbout = async () => {
  const about = await import(`../pages/about/About${oneWordTitle}.vue`)
  aboutComponent.value = markRaw(about.default)
}
loadIcon()
loadAbout()

const route = useRoute()
const router = useRouter()

function initializeTabFromURL() {
  const queryTab = route.query.tab
  if (validTabs.includes(queryTab)) {
    tab.value = queryTab
  } else {
    tab.value = defaultTab
    if (route.query) {
      router.replace({
        query: {
          ...route.query,
          tab: defaultTab,
        },
      })
    } else {
      router.replace({
        query: {
          tab: defaultTab,
          ...route.query,
        },
      })
    }
  }
}

onMounted(() => {
  initializeTabFromURL()
})

watch(
  () => route.query.tab,
  (newTab) => {
    if (validTabs.includes(newTab)) {
      tab.value = newTab
    }
  },
)

watch(tab, (newTab) => {
  if (route.query.tab === newTab) return

  const queryString = store.querystrings?.[props.dataset]?.[newTab] || ''
  console.log('queryString: ', queryString)

  // Convert query string back into an object
  const queryParams = Object.fromEntries(new URLSearchParams(queryString))

  console.log('queryParams: ', queryParams)
  router.replace({
    query: {
      tab: newTab,
      ...queryParams,
    },
  })
})
</script>
