<template>
  <q-select
    v-model="variable"
    :label="label"
    :options="filteredItems"
    :option-label="itemText"
    :option-value="itemValue"
    :loading="isLoading"
    use-input
    fill-input
    hide-selected
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
      <q-item v-bind="scope.itemProps" clickable>
        <q-item-section>
          <div v-if="itemTextKey !== itemValueKey">
            {{ scope.opt[itemTextKey] }} ({{ scope.opt[itemValueKey] }})
          </div>
          <div v-else>
            {{ scope.opt[itemTextKey] }}
          </div>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useFieldStore } from '@/stores/FieldStore'
import config from '@/assets/config.json'

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

const itemTextKey = itemText.value
const itemValueKey = itemValue.value

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

onMounted(() => {
  const existingList = store.lists[props.dataset]?.[endpoint.value]
  if (!Array.isArray(existingList) || existingList.length === 0) {
    store.loadList({ dataset: props.dataset, endpoint: endpoint.value })
  }
})

const items = computed(() => store.lists[props.dataset]?.[endpoint.value] ?? [])

const isLoading = computed(() => store.listsLoading[props.dataset]?.[endpoint.value] ?? false)

const filteredItems = ref([])

watch(
  items,
  (newItems) => {
    filteredItems.value = newItems
  },
  { immediate: true },
)

function onFilter(val, update) {
  update(() => {
    const list = store.lists[props.dataset]?.[endpoint.value] ?? []

    if (!val || val.trim() === '') {
      filteredItems.value = list
      return
    }

    const filterVal = val.toLowerCase()
    filteredItems.value = list.filter((item) => {
      const label = (item[itemText.value] ?? '').toLowerCase()
      const value = (item[itemValue.value] ?? '').toString().toLowerCase()
      return label.includes(filterVal) || value.includes(filterVal)
    })
  })
}
</script>
