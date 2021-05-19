import { ref } from 'vue'

export const loading = ref(false)

export const hasError = ref(false)

export const callable = async (callable) => {
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
