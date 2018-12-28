<template>
  <div class="field has-text-light">
    <b-switch
      v-model="setting">
      {{ text }}
    </b-switch>
  </div>
</template>

<script>
export default {
  props: {
    settingName: String,
    text: String
  },
  computed: {
    setting: {
      get () {
        return this.$store.state.settings[this.settingName]
      },
      set (value) {
        this.$store.commit('changeSetting', {
          setting: this.settingName,
          value: value
        })
      }
    }
  },
}
</script>
