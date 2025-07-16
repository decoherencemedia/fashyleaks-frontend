<template>
  <div cols="12" sm="4" class="flex flex-center q-mx-lg q-mb-lg" :title="`Search ${title} dataset`">
    <q-btn flat stretch :to="`/${props.dataset}`">
      <div>
        <div class="no-caps text-h5 text-info q-mb-sm text-weight-bold">
          {{ title }}
        </div>
        <component :is="iconComponent" style="font-size: 80px" color="info" />
      </div>
    </q-btn>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import { datasetToTitle } from '@/utils/query.js'

const props = defineProps({
  dataset: {
    type: String,
    required: true,
  },
})

const title = datasetToTitle(props.dataset)

const iconComponent = ref(null)

const loadIcon = async () => {
  const icon = await import(`@/components/icons/${title.replace(' ', '')}Icon.vue`)
  iconComponent.value = markRaw(icon.default)
}

loadIcon()
</script>

<style>
.no-caps {
  text-transform: none !important;
}
</style>
