import { computed } from 'vue'
import { useQuasar } from 'quasar'

export function usePermalink(dataset, collection, id) {
  const permalink = computed(() => {
    const datasetVal = dataset.value || dataset
    const collectionVal = collection.value || collection
    const idVal = id.value || id
    const path = `/${datasetVal}?tab=${collectionVal}&id=${idVal}`
    if (typeof window !== 'undefined') {
      return window.location.origin + path
    }
    return path
  })

  const $q = useQuasar()
  async function copyPermalink() {
    try {
      await navigator.clipboard.writeText(permalink.value)
      $q.notify({
        type: 'positive',
        message: 'Copied to clipboard',
        timeout: 2000,
      })
    } catch (e) {
      $q.notify({
        type: 'negative',
        message: `Copying failed with error ${e}`,
        timeout: 2000,
      })
    }
  }

  return { permalink, copyPermalink }
}
