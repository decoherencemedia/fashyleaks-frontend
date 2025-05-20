<template>
  <div :id="dataset">
    <q-toolbar class="text-accent bg-primary">
      <component :is="iconComponent" color="secondary" size="2rem" :title="title"> </component>
      <q-tabs
        class="scroll"
        v-model="tab"
        inline-label
        indicator-color="secondary"
        mobile-arrows
        style="max-width: 100%"
      >
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
        :class="$q.platform.is.mobile ? 'q-px-none' : ''"
      >
        <search-page :dataset="dataset" :collection="tab" />
      </q-tab-panel>
      <q-tab-panel key="about" name="about" :transition="false" :reverse-transition="false">
        <component :is="aboutComponent" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
// import { ref, watch, onMounted, markRaw, computed } from 'vue'
import { ref, watch, onMounted, markRaw } from 'vue'

import config from '@/assets/config.json'
import SearchPage from '@/components/SearchPage.vue'
import { useRoute, useRouter } from 'vue-router'
import { useFieldStore } from '@/stores/FieldStore'
import { useMeta } from 'quasar'
import { datasetToTitle } from '@/utils/query.js'

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

const title = datasetToTitle(props.dataset)

const oneWordTitle = title.replace(' ', '')

const tab = ref(defaultTab)
const iconComponent = ref(null)
const aboutComponent = ref(null)

const loadIcon = async () => {
  const icon = await import(`@/components/icons/${oneWordTitle}Icon.vue`)
  iconComponent.value = markRaw(icon.default)
}

const loadAbout = async () => {
  const about = await import(`@/pages/about/About${oneWordTitle}.vue`)
  aboutComponent.value = markRaw(about.default)
}
loadIcon()
loadAbout()

const route = useRoute()
const router = useRouter()

function initializeTabFromURL() {
  const queryTab = route.query.tab
  if (!route.query || Object.keys(route.query).length === 0) {
    router.replace({
      query: {
        tab: defaultTab,
      },
    })
    return
  }
  const targetTab = validTabs.includes(queryTab) ? queryTab : defaultTab
  tab.value = targetTab
  const queryString = store.querystrings?.[props.dataset]?.[targetTab]
  if (queryString) {
    const queryParams = Object.fromEntries(new URLSearchParams(queryString))
    router.replace({
      query: {
        tab: targetTab,
        ...queryParams,
      },
    })
  } else if (!validTabs.includes(queryTab)) {
    router.replace({
      query: {
        ...route.query,
        tab: defaultTab,
      },
    })
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
  const queryString = store.querystrings?.[props.dataset]?.[newTab]
  if (!queryString) {
    router.replace({
      query: {
        tab: newTab,
      },
    })
    return
  } else {
    const queryParams = Object.fromEntries(new URLSearchParams(queryString))
    router.replace({
      query: {
        tab: newTab,
        ...queryParams,
      },
    })
  }
})

function metaTitle() {
  if (tab.value === 'about') {
    return `Decoherence Archive | About ${title}`
  } else {
    return `Decoherence Archive | Search ${title} ${tab.value}`
  }
}

useMeta(() => {
  return {
    title: metaTitle(),
  }
})
</script>

<style>
/* .q-tab {
  font-weight: 400;
  letter-spacing: 0.0892857143em;
  text-indent: 0.0892857143em;
  text-transform: uppercase;
} */
</style>
