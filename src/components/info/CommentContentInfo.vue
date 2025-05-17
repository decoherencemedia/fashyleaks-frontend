<template>
  <div class="post-info">
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
      Comment ID:
      <router-link :to="`/${dataset}?tab=comments&id=${item.id}`">
        {{ item.id }}
      </router-link>
    </span>

    <span>
      Article ID:
      <router-link :to="`/${dataset}?tab=articles&id=${item.article_id}`">
        {{ item.article_id }}
      </router-link>
    </span>

    <span v-if="item.parent_id">
      Reply To:
      <router-link :to="`/${dataset}?tab=comments&id=${item.parent_id}`">
        {{ item.parent_id }}
      </router-link>
    </span>

    <span>
      <a :href="`mailto:${item.author_email}`">{{ item.author_email }}</a>
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

const dateAndTime = computed(() => {
  if (!props.item.date) return ['', '']
  const parsedDate = new Date(props.item.date)
  return parsedDate.toLocaleString().split(',')
})

const authorLink = computed(() => {
  const { author_email, author_name } = props.item
  if (author_email) {
    return `/${props.dataset}?tab=commenters&id=${encodeURIComponent(author_email)}`
  } else if (author_name) {
    return `/${props.dataset}?tab=commenters&name=${encodeURIComponent(author_name)}`
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
