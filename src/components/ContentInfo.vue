<template>
  <div class="text-h4">{{ props.dataset }}</div>
  <div class="text-h5">{{ props.item }}</div>
  <div class="text-h6">{{ props.infoFields }}</div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {}
    },
  },
  dataset: {
    type: String,
    default: '',
  },
  infoFields: {
    type: Array,
    required: true,
  },
})
</script>
