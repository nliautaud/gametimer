<template>
  <div class="card has-background-dark">
    <header class="card-header">
      <p class="card-header-title has-text-light">
        Settings
      </p>
    </header>
    <div class="card-content">

      <div class="settingsgroup">
        <OptionToggle
          settingName="useCountdown"
          text="Compte à rebours"
          />
        <OptionToggle
          settingName="showMilliseconds"
          text="Afficher les millisecondes"
          />
        <OptionToggle
          settingName="showColors"
          text="Afficher les couleurs"
          />
      </div>

      <TimePlayerSelector />

      <TimeTurnSelector />

    </div>

    <header class="card-footer">
      <button class="button is-dark is-danger is-fullwidth"
        @click="$store.commit('reset')">
        Remettre les compteurs à zéro
      </button>
    </header>
  </div>
</template>

<script>
import OptionToggle from './OptionToggle.vue'
import TimePlayerSelector from './TimePlayerSelector.vue'
import TimeTurnSelector from './TimeTurnSelector.vue'
export default {
  components: {
    OptionToggle,
    TimePlayerSelector,
    TimeTurnSelector
  }
}
</script>

<style lang="sass">
.settingsgroup
  display: flex
  flex-direction: column
  margin-bottom: 1em
  .field
    width: 100%
    text-align: left
</style>
