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
    <span class="q-mt-sm">{{ dateAndTime[0] }}</span>
    <span>{{ dateAndTime[1] }}</span>
    <span class="q-mt-sm">
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
import { useDateAndTime } from '@/composables/useDateAndTime'
import { useAuthorLink } from '@/composables/useAuthorLink'

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
const dateAndTime = useDateAndTime(props.item)
const authorLink = useAuthorLink(props.item, props.dataset)
</script>
