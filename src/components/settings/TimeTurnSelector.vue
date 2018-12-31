<template>
  <div class="field">
    <label class="label has-text-light">
      Temps par tour
    </label>
    <div class="field has-addons has-addons-centered">
      <p class="control">
        <input class="input"
          type="number"
          min="O"
          placeholder="-"
          disabled
          v-model="timeByTurn">
      </p>
      <p class="control">
        <span class="select">
          <select v-model="unit" disabled>
            <option value="minutes">Minutes</option>
            <option value="seconds">Secondes</option>
          </select>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
const moment = require('moment')
export default {
  data: () => {
    return {
      unit: 'seconds'
    }
  },
  computed: {
    timeByTurn: {
      get () {
        let time = this.$store.getters.timeByTurn
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
          setting: 'timeByTurn',
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
