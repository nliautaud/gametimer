<template>
  <section>
    <b-modal :active.sync="$store.state.showSettings" has-modal-card>
      <Settings/>
    </b-modal>
  </section>
</template>

<script>
import Settings from './Settings.vue'
export default {
  components: {
    Settings
  },
  data() {
    return {
    }
  }
}
</script>
