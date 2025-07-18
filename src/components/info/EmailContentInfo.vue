<template>
  <div class="post-info">
    <span class="tofrom">From</span>
    <span class="channel-name">
      <router-link :to="authorLink">
        {{ item.from_name ? item.from_name : item.from_address }}
      </router-link>
    </span>

    <span class="tofrom q-mt-xs">To</span>
    <span class="channel-name">
      <router-link :to="receivedLink">
        {{ item.to_name ? item.to_name : item.to_address }}
      </router-link>
    </span>

    <span class="q-mt-sm">{{ dateAndTime[0] }}</span>
    <span>{{ dateAndTime[1] }}</span>

    <span class="q-mt-sm">
      Email ID:
      <router-link :to="`/${dataset}?tab=emails&id=${item.id}`">
        {{ item.id }}
      </router-link>
    </span>

    <span>
      Conversation ID:
      <router-link :to="`/${dataset}?tab=emails&conversation_id=${item.conversation_id}`">
        {{ item.conversation_id }}
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

const dateAndTime = computed(() => {
  if (!props.item.date) return ['', '']
  const parsedDate = new Date(props.item.date)
  return parsedDate.toLocaleString().split(',')
})

const authorLink = computed(() => {
  return `/${props.dataset}?tab=emails&address_1=${encodeURIComponent(props.item.from_address)}`
})

const receivedLink = computed(() => {
  return `/${props.dataset}?tab=emails&address_1=${encodeURIComponent(props.item.to_address)}`
})
</script>
