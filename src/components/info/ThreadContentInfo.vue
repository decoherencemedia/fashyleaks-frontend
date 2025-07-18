<template>
  <div class="row" :class="wrapperClass">
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
      <span v-if="item.views != null">Views: {{ item.views }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useQuasar } from 'quasar'
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

const $q = useQuasar()
const dateAndTime = useDateAndTime(props.item)
const authorLink = useAuthorLink(props.item, props.dataset)

const wrapperClass = computed(() => {
  return $q.platform.is.mobile ? 'wrapper-mobile' : 'wrapper-desktop'
})
</script>

<style scoped>
.wrapper-desktop {
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0.5em;
  align-items: flex-start;
  flex-wrap: nowrap;
}

.wrapper-mobile {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 0.5em;
  min-width: 140px;
}

.post-info,
.post-info-right {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  word-break: break-word;
  margin-bottom: 0.5em;
}

/* Desktop only: fixed width */
.wrapper-desktop .post-info,
.wrapper-desktop .post-info-right {
  min-width: 140px;
  max-width: 140px;
  flex: 0 0 auto;
  overflow: hidden;
}

/* Mobile: full width */
.wrapper-mobile .post-info,
.wrapper-mobile .post-info-right {
  min-width: 100%;
  max-width: 100%;
  flex: 1 1 auto;
}
</style>
