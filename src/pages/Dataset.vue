<template>
  <div :id="dataset">
    <q-toolbar class="text-primary bg-grey-9 text-white">
      <component :is="iconComponent" color="blue" size="2rem" />
      <q-tabs v-model="tab" inline-label indicator-color="blue">
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
        <div class="text-h6">{{ collection }}</div>
        <search-page :dataset="dataset" :collection="collection" />
      </q-tab-panel>
      <q-tab-panel key="about" name="about" :transition="false" :reverse-transition="false">
        <component :is="aboutComponent" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, markRaw } from 'vue'
import config from '../assets/config.json'
import SearchPage from '../components/SearchPage.vue'

const props = defineProps({
  dataset: {
    type: String,
    required: true,
  },
})

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

function syncTabWithHash() {
  const hash = window.location.hash.replace('#', '')
  if (validTabs.includes(hash)) {
    tab.value = hash
  }
}

onMounted(() => {
  syncTabWithHash()
  window.addEventListener('hashchange', syncTabWithHash)
})
onBeforeUnmount(() => {
  window.removeEventListener('hashchange', syncTabWithHash)
})

// Update hash when tab changes
watch(tab, (newVal) => {
  window.location.hash = newVal
})
</script>
