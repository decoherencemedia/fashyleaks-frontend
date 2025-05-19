<template>
  <div class="post-info">
    <span class="tofrom">From</span>
    <span v-if="authorLink" class="channel-name">
      <router-link :to="authorLink">
        {{ props.item.msg_author_name || 'Unknown User' }}
      </router-link>
    </span>
    <span v-else class="channel-name">
      {{ props.item.msg_author_name || 'Unknown User' }}
    </span>

    <span class="tofrom mt-2">To</span>
    <span v-if="receivedLink" class="channel-name">
      <router-link :to="receivedLink">
        {{ props.item.msg_received_name || 'Unknown User' }}
      </router-link>
    </span>
    <span v-else class="channel-name">
      {{ props.item.msg_received_name || 'Unknown User' }}
    </span>

    <span class="q-pt-sm">{{ dateAndTime[0] }}</span>
    <span>{{ dateAndTime[1] }}</span>

    <span class="q-pt-sm">
      Message ID:
      <router-link :to="`/${props.dataset}?tab=messages&id=${props.item.id}`">
        {{ props.item.id }}
      </router-link>
    </span>
    <span>
      Conversation ID:
      <router-link
        :to="`/${props.dataset}?tab=messages&conversation_id=${props.item.conversation_id}`"
      >
        {{ props.item.conversation_id }}
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
  const parsedDate = new Date(props.item.date)
  return parsedDate.toLocaleString().split(',')
})

const authorLink = computed(() => {
  if (props.item.msg_author_id) {
    return `/${props.dataset}?tab=users&id=${props.item.msg_author_id}`
  } else if (props.item.msg_author_name) {
    return `/${props.dataset}?tab=users&name=${props.item.msg_author_name}`
  }
  return null
})

const receivedLink = computed(() => {
  if (props.item.msg_received_id) {
    return `/${props.dataset}?tab=users&id=${props.item.msg_received_id}`
  } else if (props.item.msg_received_name) {
    return `/${props.dataset}?tab=users&name=${props.item.msg_received_name}`
  }
  return null
})
</script>

<style scoped>
.tofrom {
  font-size: 10px !important;
  line-height: 1em;
}

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
