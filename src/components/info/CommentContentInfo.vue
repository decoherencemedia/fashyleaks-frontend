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

    <span class="q-mt-sm">{{ dateAndTime[0] }}</span>
    <span>{{ dateAndTime[1] }}</span>

    <span class="q-mt-sm">
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
  </div>
</template>

<script setup>
import { useDateAndTime } from '@/composables/useDateAndTime'
import { useAuthorLink } from '@/composables/useAuthorLink'

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

const dateAndTime = useDateAndTime(props.item)
const authorLink = useAuthorLink(props.item, props.dataset, { idKey: 'author_email', nameKey: 'author_name', tab: 'commenters' })
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
