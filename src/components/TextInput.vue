<template>
  <q-input
    v-model="variable"
    class="q-mx-md"
    :label="label"
    @keyup.enter="emitSendData"
    outlined
    dense
    clearable
  />
</template>

<script setup>
import { computed } from 'vue'
import { useFieldStore } from '../stores/FieldStore'

const props = defineProps({
  dataset: String,
  collection: String,
  field: String,
  label: String,
  additional: Object,
})

const emit = defineEmits(['onEnter'])

const fieldStore = useFieldStore()

const variable = computed({
  get() {
    return fieldStore.fields[props.dataset]?.[props.collection]?.[props.field] ?? ''
  },
  set(value) {
    fieldStore.setField({
      dataset: props.dataset,
      collection: props.collection,
      field: props.field,
      value,
    })
  },
})

function emitSendData() {
  emit('onEnter')
}
</script>
