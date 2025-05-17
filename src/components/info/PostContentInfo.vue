<template>
  <div class="post-info">
    <span v-if="authorLink" class="channel-name">
      <RouterLink :to="authorLink">
        {{ item.author_name || 'Unknown User' }}
      </RouterLink>
    </span>
    <span v-else class="channel-name">
      {{ item.author_name || 'Unknown User' }}
    </span>

    <span v-for="infoField in infoFields" :key="infoField.value">
      {{ infoField.text ? infoField.text + ': ' : '' }}
      <RouterLink v-if="infoField.link" :to="infoField.link">
        {{ infoField.value }}
      </RouterLink>
      <div v-else>{{ infoField.value }}</div>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
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

const authorLink = computed(() => {
  if (props.item.author_id) {
    return `/${props.dataset}?tab=users&id=${props.item.author_id}`
  } else if (props.item.author_name) {
    return `/${props.dataset}?tab=users&name=${props.item.author_name}`
  }
  return null
})
</script>

<style scoped>
.post-info {
  display: flex;
  flex-direction: column;
  color: #000;
  font-size: 12px;
  width: 140px;
  flex-grow: 0;
  flex-shrink: 0;
  overflow: hidden;
  margin-bottom: 0.5em;
}

.channel-name {
  font-weight: bold;
}
</style>
