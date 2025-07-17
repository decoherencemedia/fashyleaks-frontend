import { computed } from 'vue'

export function useAuthorLink(item, dataset, options = {}) {
  const { idKey = 'author_id', nameKey = 'author_name', tab = 'users' } = options
  return computed(() => {
    const value = item.value ? item.value : item
    if (value[idKey]) {
      return `/${dataset.value || dataset}?tab=${tab}&id=${encodeURIComponent(value[idKey])}`
    } else if (value[nameKey]) {
      return `/${dataset.value || dataset}?tab=${tab}&name=${encodeURIComponent(value[nameKey])}`
    }
    return null
  })
}