import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { datasetToTitle } from '@/utils/query.js'
import { getResultTitleField } from '@/utils/configHelper.js'

const api_url = 'https://api.decoherencemedia.com'

export function useAccountMeta() {
  const accountData = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const route = useRoute()

  const isSingleAccountView = computed(() => {
    const { tab, id } = route.query
    return id && ['users', 'commenters'].includes(tab)
  })

  const shouldFetchAccount = computed(() => {
    return isSingleAccountView.value && !accountData.value && !loading.value
  })

  const fetchAccountData = async () => {
    if (!shouldFetchAccount.value) return

    const { tab, id } = route.query
    const dataset = route.path.slice(1) // Remove leading slash

    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${api_url}/${dataset}/${tab}?id=${id}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      accountData.value = data.data?.[0] || null
    } catch (err) {
      error.value = err.message
      console.error('Failed to fetch account data for meta tags:', err)
    } finally {
      loading.value = false
    }
  }

  const accountUsername = computed(() => {
    if (!accountData.value) return null
    const titleField = getResultTitleField(route.query.tab)
    return accountData.value[titleField] || null
  })

  const datasetTitle = computed(() => {
    const dataset = route.path.slice(1)
    return datasetToTitle(dataset)
  })

  const metaDescription = computed(() => {
    if (!isSingleAccountView.value) return null

    if (accountUsername.value) {
      return `View details for ${accountUsername.value} from ${datasetTitle.value} dataset.`
    }

    // Fallback when username is not available yet
    const { id } = route.query
    return `View details for account #${id} from ${datasetTitle.value} dataset.`
  })

  const metaTitle = computed(() => {
    if (!isSingleAccountView.value) return null

    const { tab, id } = route.query
    const collectionName = tab.slice(0, -1) // Remove 's' from 'users' -> 'user'

    if (accountUsername.value) {
      return `${datasetTitle.value} ${collectionName}: ${accountUsername.value}`
    }

    return `${datasetTitle.value} ${collectionName} #${id}`
  })

  return {
    accountData,
    loading,
    error,
    isSingleAccountView,
    accountUsername,
    datasetTitle,
    metaDescription,
    metaTitle,
    fetchAccountData
  }
}