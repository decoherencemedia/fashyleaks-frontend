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

    <span class="tofrom q-mt-xs">To</span>
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
const authorLink = useAuthorLink(props.item, props.dataset, { idKey: 'msg_author_id', nameKey: 'msg_author_name' })
const receivedLink = useAuthorLink(props.item, props.dataset, { idKey: 'msg_received_id', nameKey: 'msg_received_name' })
</script>
