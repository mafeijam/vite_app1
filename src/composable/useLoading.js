import { ref } from 'vue'

export default () => {
  const loading = ref(false)

  const hasError = ref(false)

  const callable = async (callable) => {
    try {
      loading.value = true
      hasError.value = false
      await callable()
    } catch (e) {
      hasError.value = e
    } finally {
      loading.value = false
    }
  }

  return {
    loading, hasError, callable
  }
}
