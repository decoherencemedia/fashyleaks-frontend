import { computed } from 'vue'

export function useDateAndTime(item, dateKey = 'date') {
  return computed(() => {
    const value = item.value ? item.value : item
    if (!value[dateKey]) return ['', '']
    const parsedDate = new Date(value[dateKey])
    return parsedDate.toLocaleString().split(',')
  })
}