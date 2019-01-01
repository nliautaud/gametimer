<template>
  <div class="card has-background-dark">
    <header class="card-header">
      <p class="card-header-title has-text-light">
        {{ $t('settings') }}
      </p>

      <LocaleSelector class="card-header-icon" />

    </header>
    <div class="card-content">

      <OptionToggle
        settingName="showMilliseconds"
        :text="$t('showMillis')"
        />
      <OptionToggle
        settingName="showColors"
        :text="$t('showColors')"
        />
      <OptionToggle
        settingName="alwaysSwitchToNext"
        :text="$t('nextTurn')"
        />
      <OptionToggle
        settingName="useCountdown"
        :text="$t('countdown')"
        />
      <TimeSelector
        settingName="timeByPlayer"
        :text="$t('timeByPlayer')"
        />
      <TimeSelector
        settingName="timeByTurn"
        :text="$t('timeByTurn')"
        />

    </div>

    <header class="card-footer">
      <button class="button is-dark is-danger is-fullwidth"
        @click="$store.commit('reset')">
        {{ $t('reset') }}
      </button>
    </header>
  </div>
</template>

<script>
import OptionToggle from './OptionToggle.vue'
import TimeSelector from './TimeSelector.vue'
import LocaleSelector from './LocaleSelector.vue'
export default {
  components: {
    OptionToggle,
    TimeSelector,
    LocaleSelector
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

<i18n>
{
  "en": {
    "countdown": "Countdown",
    "showMillis": "Show milliseconds",
    "showColors": "Show colors",
    "nextTurn": "Always skip to next turn",
    "timeByPlayer": "Time by player",
    "timeByTurn": "Time by turn",
    "reset": "Reset all timers"
  },
  "fr": {
    "countdown": "Compte à rebours",
    "showMillis": "Afficher les millisecondes",
    "showColors": "Afficher les couleurs",
    "nextTurn": "Toujours passer au tour suivant",
    "timeByPlayer": "Temps par joueur",
    "timeByTurn": "Temps par tour",
    "reset": "Remettre les compteurs à zéro"
  }
}
</i18n>
