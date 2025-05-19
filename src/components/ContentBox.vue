<template>
  <div class="post-wrapper" :style="{ backgroundColor }">
    <div>
      <PostContentInfo v-if="collection == 'posts'" :item="item" :dataset="dataset" />
      <MessageContentInfo v-else-if="collection == 'messages'" :item="item" :dataset="dataset" />
      <ThreadContentInfo v-else-if="collection == 'threads'" :item="item" :dataset="dataset" />
      <ArticleContentInfo v-else-if="collection == 'articles'" :item="item" :dataset="dataset" />
      <CommentContentInfo v-else-if="collection == 'comments'" :item="item" :dataset="dataset" />
      <EmailContentInfo v-else-if="collection == 'emails'" :item="item" :dataset="dataset" />

      <q-btn
        class="mb-1"
        size="sm"
        color="secondary"
        @click="copyPermalink"
        label="Permalink"
        icon="link"
        unelevated
        style="border-radius: 6px"
        :title="`Copy permanent link to this ${collection.slice(0, -1)}`"
      >
      </q-btn>
    </div>

    <div class="post-content ml-2">
      <div v-if="item.content && item.content.trim() !== ''" class="post-text">
        <div
          v-if="useMarkdown"
          :class="postClass"
          ref="postSpan"
          v-html="markdown(item.content)"
          @click="toggleButton"
        />
        <div v-else :class="postClass" ref="postSpan" v-html="item.content" @click="toggleButton" />

        <q-btn
          v-if="isOverflowing || expanded"
          class="mb-1"
          size="sm"
          color="grey-6"
          @click="toggleButton"
          :label="buttonText"
          :icon-right="buttonIcon"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { marked } from 'marked'
import PostContentInfo from './info/PostContentInfo.vue'
import MessageContentInfo from './info/MessageContentInfo.vue'
import ThreadContentInfo from './info/ThreadContentInfo.vue'
import ArticleContentInfo from './info/ArticleContentInfo.vue'
import CommentContentInfo from './info/CommentContentInfo.vue'
import EmailContentInfo from './info/EmailContentInfo.vue'

const props = defineProps({
  item: Object,
  dataset: String,
  collection: String,
  useMarkdown: Boolean,
  backgroundColor: String,
})

const $q = useQuasar()

const postSpan = ref(null)
const isMounted = ref(false)
const expanded = ref(false)

const permalink = computed(() => {
  const path = `/${props.dataset}?tab=${props.collection}&id=${props.item.id}`
  return window.location.origin + path
})

const isOverflowing = computed(() => {
  if (!isMounted.value) return false
  const el = postSpan.value
  return el ? el.offsetHeight < el.scrollHeight : false
})

const buttonText = computed(() => (expanded.value ? 'Show Less' : 'Show More'))
const buttonIcon = computed(() => (expanded.value ? 'expand_less' : 'expand_more'))

const postClass = computed(() => {
  return `post-span ${expanded.value ? 'expanded' : 'contracted'} ${
    props.useMarkdown ? 'markdown' : ''
  }`
})

function markdown(content) {
  return marked.parseInline(content)
}

async function copyPermalink() {
  try {
    await navigator.clipboard.writeText(permalink.value)
    $q.notify({
      type: 'positive',
      message: 'Copied to clipboard',
      timeout: 2000,
    })
  } catch (e) {
    console.log(`Copying permalink failed with error ${e}`)
    $q.notify({
      type: 'negative',
      message: `Copying failed`,
      timeout: 2000,
    })
  }
}

function toggleButton() {
  if (isOverflowing.value) {
    expanded.value = !expanded.value
  }
}

onMounted(() => {
  isMounted.value = true
})
</script>

<style>
img {
  max-height: 500px;
  max-width: 500px;
  height: auto;
  width: auto;
}

@media (max-width: 1000px) {
  img {
    max-height: 100% !important;
    max-width: 100% !important;
    height: auto;
    width: auto;
  }
}

blockquote {
  padding: 5px 10px;
  margin: 10px;
  outline: thin solid #888;
}

.iframe {
  width: 100% !important;
}

.post-wrapper {
  border-bottom: 1px solid #999;
  padding: 0.5em;
  text-align: left;
  display: flex;
}

.post-content {
  font-size: 14px;
  text-align: left;
  overflow-x: auto;
}

.post-text {
  color: #000;
}

.post-span {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;
  width: 100%;
}

.expanded {
  --max-lines: none;
  -webkit-line-clamp: var(--max-lines);
}

.contracted {
  --max-lines: 20;
  -webkit-line-clamp: var(--max-lines);
}

.markdown {
  white-space: pre-wrap !important;
}
</style>
