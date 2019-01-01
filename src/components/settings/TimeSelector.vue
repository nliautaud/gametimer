<template>
  <div class="field">
    <label class="label has-text-light">
      {{ text }}
    </label>
    <div class="field has-addons">
      <p class="control">
        <input class="input"
          type="number"
          min="O"
          placeholder="-"
          v-model="model">
      </p>
      <p class="control">
        <span class="select">
          <select v-model="unit">
            <option value="minutes">{{ $t('minutes') }}</option>
            <option value="seconds">{{ $t('seconds') }}</option>
          </select>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
const moment = require('moment')
export default {
  props: {
    text: String,
    settingName: String
  },
  data: () => {
    return {
      unit: 'seconds'
    }
  },
  computed: {
    model: {
      get () {
        let time = this.$store.getters[this.settingName]
        if (time == null) return
        switch (this.unit) {
          case 'minutes':
            return time.asMinutes()
          default:
            return time.asSeconds()
        }
      },
      set (value) {
        let duration = null
        if (value) duration = moment.duration(parseInt(value), this.unit).asSeconds()
        this.$store.commit('changeSetting', {
          setting: this.settingName,
          value: duration
        })
      }
    }
  },
}
</script>

<style lang="sass">
input
  width: 5em !important
</style>

<i18n>
{
  "en": {
    "minutes": "Minutes",
    "seconds": "Seconds"
  },
  "fr": {
    "minutes": "Minutes",
    "seconds": "Secondes"
  }
}
</i18n>