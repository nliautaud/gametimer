<template>
  <div id="app" class="has-background-grey-lighter">
    <component
      v-for="block in blocks"
      :key="block.id"
      :index="block.id == 'controlbar' ? undefined : block.id"
      :is="block.id == 'controlbar' ? 'Navbar' : 'Timer'"
      :class="block.id"
      :style="style(block)"
      />
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
    while(this.$store.state.timers.length < 2) {
      this.$store.commit('addTimer')
    }
  },
  computed: {
    blocks() {
      let blocks = this.$store.state.timers.slice(0)
      
      let controlBarPos = 0
      if (this.$store.state.settings.layout != 'default') {
        controlBarPos = Math.ceil(blocks.length / 2)
      }
      blocks.splice(controlBarPos, 0, {
        id: 'controlbar'
      })
      return blocks
    }
  },
  methods: {
    style (block) {
      let count = this.$store.state.timers.length
      switch (this.$store.state.settings.layout) {
        case 'facing':
          return this.styleFacing(block, count)
        default:
          return
      }
    },
    styleFacing (block, count) {
      let style = {}
      if (block.id !== 'controlbar'
      && block.id < count / 2
      && count > 1
      ) {
        style.transform = 'scaleY(-1)'
      }
      return style
    }
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
    justify-content: center

  header
    display: flex
    padding: 1em

  .timer
    flex: 1
    &.is-active
      flex: 2
</style>
