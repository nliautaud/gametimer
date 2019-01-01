<template>
  <nav
    class="level is-mobile has-background-dark"
    role="navigation"
    aria-label="main navigation">
    <div class="level-left">
      <div class="level-item">
        <button 
          class="button is-dark"
          @click="$store.commit('toggleSettings')">
          GameTimer
        </button>
      </div>
    </div>

    <div class="level-item">
      <button 
        class="button is-dark"
        @click="$store.commit('toggleBars')">
        <span class="chevron chevron-top"/>
      </button>
    </div>

    <div class="level-right">
      <div class="level-item">
        <button 
          class="button is-dark"
          @click="$store.commit('toggleSettings')">
          {{ $t('settings') }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  components: {
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
