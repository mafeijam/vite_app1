import store from '~/store'
import { ref } from 'vue'

export const loading = ref(false)

export const hasError = ref(false)

export const dispatch = async (action, payload = null) => {
  try {
    loading.value = true
    await store.dispatch(action, payload)
  } catch (e) {
    hasError.value = true
  } finally {
    loading.value = false
  }
}
