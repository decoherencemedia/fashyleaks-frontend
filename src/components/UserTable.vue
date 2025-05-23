<template>
  <div :class="$q.platform.is.mobile ? 'q-mx-sm' : 'q-mx-md'">
    <div row :class="$q.platform.is.mobile ? 'text-h6 q-pb-md q-pl-xs' : 'text-h6 q-pb-sm'">
      Searching {{ title }} {{ collection }}
    </div>
    <q-table
      :grid="$q.platform.is.mobile"
      :columns="headers"
      :rows="items"
      :rows-per-page="20"
      :loading="loading"
      loading-label="Fetching data..."
      row-key="name"
      dense
      flat
      bordered
      :filter="search"
      :pagination="{ rowsPerPage: 20 }"
      @row-click="clickRow"
      color="secondary"
    >
      <template v-slot:top>
        <div :class="$q.platform.is.mobile ? 'q-pa-xs row justify-center' : 'q-pa-sm row'">
          <div style="width: 100%" class="q-pa-none">
            <q-input
              v-model="search"
              label="Search Table"
              outlined
              dense
              clearable
              color="secondary"
              class="q-mx-none q-px-none"
              :style="
                $q.platform.is.mobile ? 'max-width: 100%; width: calc(100vw - 8px)' : 'width: 400px'
              "
            />
          </div>
        </div>
      </template>

      <template v-slot:body-cell-joined_date="props">
        <q-td :props="props">
          {{ formatDate(props.row.joined_date) }}
        </q-td>
      </template>
      <template v-slot:item="props">
        <q-card
          flat
          bordered
          :class="props.rowIndex % 2 === 0 ? 'bg-grey-5' : 'bg-white'"
          class="q-ma-xs"
          style="width: 100%"
          @click="clickRow(null, props.row)"
        >
          <q-item class="q-ma-xs q-pa-xs">
            <q-item-section>
              <div v-for="col in props.cols" :key="col.name" class="q-ma-xs">
                <div style="opacity: 0.54; font-weight: 500; font-size: 12px">{{ col.label }}</div>
                <div style="font-size: 13px">{{ col.value }}</div>
              </div>
            </q-item-section>
          </q-item>
        </q-card>
      </template>
      <template #no-data>
        <div>Loading data...</div>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useFieldStore } from '@/stores/FieldStore'
import config from '@/assets/config.json'
import { datasetToTitle } from '@/utils/query.js'

const props = defineProps({
  dataset: String,
  collection: String,
})

const search = ref('')
const store = useFieldStore()

const endpoint = computed(() => {
  return props.collection.slice(0, -1) + '_table'
})

const loading = computed(() => {
  return store.listsLoading?.[props.dataset]?.[endpoint.value] || false
})

onMounted(() => {
  if (
    !store.lists?.[props.dataset]?.[endpoint.value] ||
    store.lists[props.dataset][endpoint.value].length === 0
  ) {
    store.loadList({
      dataset: props.dataset,
      endpoint: endpoint.value,
    })
  }
})

const items = computed(() => {
  const raw = store.lists?.[props.dataset]?.[endpoint.value] || []
  if (raw.length === 0) return []

  const keysToRemove = Object.keys(raw[0]).filter((key) => raw.every((obj) => obj[key] === null))

  return raw.map((obj) => {
    keysToRemove.forEach((key) => {
      delete obj[key]
    })
    return {
      ...obj,
    }
  })
})

const headers = computed(() => {
  const allHeaders = config.headers[props.dataset][props.collection]
  const style = 'max-width: 200px; white-space: normal; word-break: break-word;'

  const decorateHeader = (header) => ({
    ...header,
    name: header.field,
    sortable: true,
    align: 'left',
    style,
    headerStyle: style,
  })

  if (items.value.length === 0) {
    return allHeaders.map(decorateHeader)
  }

  return allHeaders
    .filter((header) => Object.keys(items.value[0]).includes(header.field))
    .map(decorateHeader)
})
function clickRow(_, row) {
  store.setField({
    dataset: props.dataset,
    collection: props.collection,
    field: 'id',
    value: row.id,
  })
  emit('clickedRow')
}

const emit = defineEmits(['clickedRow'])

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleString()
}

const title = datasetToTitle(props.dataset)
</script>

<style scoped>
.td {
  max-width: 200px;
}

::v-deep(.q-table--dense .q-table__top) {
  padding-left: 0px !important;
  padding-right: 0px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>
