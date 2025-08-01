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
const authorLink = useAuthorLink(props.item, props.dataset)
</script>
