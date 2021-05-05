<script>
import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'foo',
  setup() {
    return () => h('div', 'fooooo')
  }
})
</script>
