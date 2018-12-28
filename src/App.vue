<template>
  <div id="app">
    <Navbar/>
    <main class="timers has-background-grey-lighter">
      <Timer
        v-for="(timer, index) in $store.state.timers"
        :key="index"
        :index="index"
        />
    </main>
    <SettingsModal/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import SettingsModal from './components/settings/SettingsModal.vue'
import Timer from './components/Timer.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    SettingsModal,
    Timer
  },
  mounted () {
    this.$store.commit('addTimer')
    this.$store.commit('addTimer')
  }
}
</script>

<style lang="sass">
html,
body,
#app
  height: 100%

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

  display: flex
  flex-flow: column

  header
    display: flex
    padding: 1em

  .timers
    display: flex
    flex-flow: column
    flex: 1
    justify-content: center

    .timer
      flex: 1
      &.is-active
        flex: 2
</style>
