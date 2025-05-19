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

    <span class="q-mt-sm">{{ dateAndTime[0] }}</span>
    <span>{{ dateAndTime[1] }}</span>

    <span class="q-mt-sm">
      Post ID:
      <router-link :to="`/${dataset}?tab=posts&id=${item.id}`">
        {{ item.id }}
      </router-link>
    </span>

    <span>
      Thread ID:
      <router-link :to="`/${dataset}?tab=posts&thread_id=${item.thread_id}`">
        {{ item.thread_id }}
      </router-link>
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
})

const authorLink = computed(() => {
  if (props.item.author_id) {
    return `/${props.dataset}?tab=users&id=${props.item.author_id}`
  } else if (props.item.author_name) {
    return `/${props.dataset}?tab=users&name=${props.item.author_name}`
  }
  return null
})

const dateAndTime = computed(() => {
  if (!props.item.date) return ['', '']
  const parsedDate = new Date(props.item.date)
  return parsedDate.toLocaleString().split(',')
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
