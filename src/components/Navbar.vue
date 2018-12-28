<template>
  <nav
    class="level is-mobile has-background-dark"
    role="navigation"
    aria-label="main navigation">
    <div class="level-left">
      <div class="level-item">
        <button class="button is-outlined is-primary"
          @click="$store.commit('addTimer')">+</button>
      </div>
      <div class="level-item">
        <button class="button is-outlined is-primary"
          @click="$store.commit('removeTimer')">-</button>
      </div>
    </div>

    <div class="level-item">
      <PlayPauseButton
        :isPaused="$store.state.isPaused"
        />
    </div>

    <div class="level-right">
      <div class="level-item">
        <button 
          class="button is-dark"
          @click="$store.commit('toggleSettings')">
          Settings
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import PlayPauseButton from './PlayPauseButton.vue'
export default {
  components: {
    PlayPauseButton
  }
}
</script>

<style scoped lang="sass">
.level
  padding: 1em
  margin: 0 !important
  .level-left
    button
      font-weight: bold
</style>
