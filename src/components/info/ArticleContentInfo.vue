<template>
  <div class="post-info">
    <span v-if="item.article_title">
      <b
        ><i>{{ item.article_title }}</i></b
      >
    </span>
    <span v-if="authorLink" class="channel-name">
      <router-link :to="authorLink">
        {{ item.author_name ? item.author_name : 'Unknown User' }}
      </router-link>
    </span>
    <span v-else class="channel-name">
      {{ item.author_name ? item.author_name : 'Unknown User' }}
    </span>
    <span>{{ dateAndTime[0] }}</span>
    <span>{{ dateAndTime[1] }}</span>
    <span>
      Article ID:
      <router-link :to="`/${dataset}?tab=articles&id=${item.id}`">
        {{ item.id }}
      </router-link>
    </span>
    <span>
      Comments:
      <router-link :to="`/${dataset}?tab=comments&article_id=${item.id}`">
        {{ item.comments }}
      </router-link>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
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

// Computed properties
const dateAndTime = computed(() => {
  if (!props.item.date) return ['', '']
  const parsedDate = new Date(props.item.date)
  return parsedDate.toLocaleString().split(',')
})

const authorLink = computed(() => {
  if (props.item.author_id) {
    return `/${props.dataset}?tab=users&id=${props.item.author_id}`
  } else if (props.item.author_name) {
    return `/${props.dataset}?tab=users&name=${props.item.author_name}`
  } else {
    return null
  }
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
