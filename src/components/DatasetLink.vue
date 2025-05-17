<template>
  <div cols="12" sm="4" class="flex flex-center q-mx-lg q-mb-lg">
    <q-btn flat stretch :to="`/${props.dataset}`">
      <div>
        <div class="no-caps text-h4 text-blue q-mb-sm text-weight-medium">
          {{ title }}
        </div>
        <component :is="iconComponent" style="font-size: 80px" color="blue" />
      </div>
    </q-btn>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'

const props = defineProps({
  dataset: {
    type: String,
    required: true,
  },
})

const title = props.dataset
  .toLowerCase()
  .split('-')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ')

const iconComponent = ref(null)

const loadIcon = async () => {
  const icon = await import(`../components/icons/${title.replace(' ', '')}Icon.vue`)
  iconComponent.value = markRaw(icon.default)
}

loadIcon()
</script>

<style>
.no-caps {
  text-transform: none !important;
}
</style>
