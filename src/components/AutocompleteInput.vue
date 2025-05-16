<template>
  <q-select
    v-model="variable"
    :label="label"
    :options="items"
    :option-label="itemText"
    :option-value="itemValue"
    :loading="isLoading"
    use-input
    input-debounce="300"
    @filter="onFilter"
    emit-value
    map-options
    clearable
    outlined
    dense
    class="q-mx-md"
  >
    <template v-slot:option="scope">
      <div v-if="itemText !== itemValue">
        {{ scope.opt[itemText] }} ({{ scope.opt[itemValue] }})
      </div>
      <div v-else>
        {{ scope.opt[itemText] }}
      </div>
    </template>
  </q-select>
</template>

<script setup>
import { computed } from 'vue'
import { useFieldStore } from '../stores/FieldStore'
import config from '../assets/config.json'

const props = defineProps({
  dataset: String,
  collection: String,
  field: String,
  label: String,
  additional: Object,
})

const store = useFieldStore()

const endpoint = computed(() => props.additional.type)

const itemText = computed(() => config.autocompletes[endpoint.value].itemText)
const itemValue = computed(() => config.autocompletes[endpoint.value].itemValue)

const variable = computed({
  get() {
    return store.fields[props.dataset]?.[props.collection]?.[props.field] ?? ''
  },
  set(value) {
    store.setField({
      dataset: props.dataset,
      collection: props.collection,
      field: props.field,
      value,
    })
  },
})

const items = computed(() => store.lists[props.dataset]?.[endpoint.value] ?? [])
const isLoading = computed(() => store.listsLoading[props.dataset]?.[endpoint.value] ?? false)

function onFilter(val, update) {
  update(() => {
    const list = store.lists[props.dataset]?.[endpoint.value]
    const loading = store.listsLoading[props.dataset]?.[endpoint.value]

    if (list?.length > 0 || loading) return

    store.loadList({
      dataset: props.dataset,
      endpoint: endpoint.value,
    })
  })
}
</script>
