<template>
  <div class="text-h4">Results</div>
  <div class="text-h5">{{ props.dataset }}</div>
  <div class="text-h6">{{ props.collection }}</div>
</template>

<script setup>
const props = defineProps({
  dataset: String,
  collection: String,
})
</script>
