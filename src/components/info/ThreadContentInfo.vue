<template>
  <div class="row wrapper">
    <div class="post-info-right">
      <span class="channel-name">
        <RouterLink v-if="authorLink" :to="authorLink">
          {{ item.author_name || 'Unknown User' }}
        </RouterLink>
        <template v-else>
          {{ item.author_name || 'Unknown User' }}
        </template>
      </span>
      <span>{{ dateAndTime[0] }}</span>
      <span>{{ dateAndTime[1] }}</span>
    </div>

    <div class="post-info">
      <span>
        Thread ID:
        <RouterLink :to="`/${dataset}?tab=posts&thread_id=${item.id}`">
          {{ item.id }}
        </RouterLink>
      </span>
      <span>
        Posts:
        <RouterLink :to="`/${dataset}?tab=posts&thread_id=${item.id}`">
          {{ item.posts }}
        </RouterLink>
      </span>
      <span>Views: {{ item.views }}</span>
    </div>
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

const dateAndTime = computed(() => {
  const parsedDate = new Date(props.item.date)
  return parsedDate.toLocaleString().split(',')
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
.wrapper {
  display: flex;
  flex-direction: row; /* Ensures side-by-side layout */
  gap: 1em; /* Optional spacing between columns */
  padding-left: 0.5em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  flex-grow: 0;
  flex-shrink: 1;
  overflow: hidden;
}

.post-info,
.post-info-right {
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

.post-info-right {
  height: 100%;
}

.channel-name {
  font-weight: bold;
}
</style>
