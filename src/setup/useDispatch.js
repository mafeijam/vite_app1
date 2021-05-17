import store from '~/store'
import { ref } from 'vue'

export const loading = ref(false)

export const hasError = ref(false)

export const dispatch = async (action, payload = null) => {
  try {
    loading.value = true
    hasError.value = false
    await store.dispatch(action, payload)
  } catch (e) {
    hasError.value = e
  } finally {
    loading.value = false
  }
}
