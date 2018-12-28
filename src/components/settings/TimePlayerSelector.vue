<template>
  <div class="field">
    <label class="label has-text-light">
      Temps par joueur
    </label>
    <div class="field has-addons has-addons-centered">
      <p class="control">
        <input class="input"
          type="number"
          min="O"
          placeholder="-"
          v-model="timeByPlayer">
      </p>
      <p class="control">
        <span class="select">
          <select v-model="unit">
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
      unit: 'minutes'
    }
  },
  computed: {
    timeByPlayer: {
      get () {
        let time = this.$store.getters.timeByPlayer
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
          setting: 'timeByPlayer',
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
