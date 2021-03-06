<template>
  <div
    id="app"
    :class="{'bars-hidden': $store.state.hideBars}"
    >
    <Navbar class="bar top" @dblclick.native="hideBars"/>
    <div class="bar top-back">
      <button 
        class="button is-dark"
        @click="$store.commit('toggleBars')">
        <span class="chevron"/>
      </button>
    </div>
    <main
      class="timers"
      :class="{
        'has-2': $store.state.timers.length === 2,
        'has-3-or-more': $store.state.timers.length >= 3,
      }">
      <Timer
        v-for="timer in $store.state.timers"
        :key="timer.id"
        :index="timer.id"
        :style="style(timer)"
        />
    </main>
    <Controlbar class="bar bottom" @dblclick.native="hideBars"/>
    <SettingsModal/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Controlbar from './components/Controlbar.vue'
import SettingsModal from './components/settings/SettingsModal.vue'
import Timer from './components/Timer.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Controlbar,
    SettingsModal,
    Timer
  },
  mounted () {
    this.$i18n.locale = this.$store.state.settings.locale
    while(this.$store.state.timers.length < 2) {
      this.$store.commit('addTimer')
    }
  },
  computed: {
  },
  methods: {
    style (timer) {
      let count = this.$store.state.timers.length
      switch (this.$store.state.settings.layout) {
        case 'facing':
          return this.styleFacing(timer, count)
        default:
          return
      }
    },
    styleFacing (timer, count) {
      let style = {}
      if (timer.id !== 'controlbar'
      && timer.id < count / 2
      && count > 1
      ) {
        style.transform = 'scaleY(-1)'
      }
      return style
    },
    hideBars (event) {
      console.log(event)
      this.$store.state.hideBars = !this.$store.state.hideBars
    }
  }
}
</script>

<style lang="sass">
html,
body,
#app
  height: 100%

html,
body,
.bar
  background-color: #363636

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

  .chevron
    width: 2em
    display: flex
    justify-content: center
  .chevron::after
    border: 3px solid #7957d5
    border-radius: 2px
    border-right: 0
    border-top: 0
    content: " "
    display: block
    height: 0.625em
    margin-top: -0.4375em
    pointer-events: none
    position: absolute
    top: 50%
    transform: rotate(-45deg)
    transform-origin: center
    width: 0.625em
  .chevron-top::after
    transform: rotate(135deg)

  .bar 
    position: fixed
    width: 100%
    height: 48pt
    z-index: 9
    transition: all .25s ease
    &.top
      top: 0
    &.top-back
      text-align: center
      z-index: 8
      height: 25pt
      .button
        width: 100%
        height: 100%

    &.bottom
      bottom: 0
    
  .timers 
    display: grid
    grid-template: auto / 1fr
    min-height: 100%
    padding: 48pt 0
    overflow: auto
    transition: all .25s ease

    &.has-2
      @media (min-aspect-ratio: 2/3)
        grid-template: auto / 1fr 1fr
    &.has-3-or-more
      @media (min-aspect-ratio: 2/3)
        grid-template: auto / 1fr 1fr
      @media (min-aspect-ratio: 1/1) and (min-width: 50em)
        grid-template: auto / 1fr 1fr 1fr

    .timer
      .inner
        padding: 1rem
        transition: all .2s cubic-bezier(0.37, -0.43, 0.49, 1.71)
        transform: scale(.9)
      &.is-active .inner
        transform: scale(1)
    
  

  &.bars-hidden
    .bar
      &.top
        transform: translateY(-50pt)
        opacity: 0
      &.bottom
        transform: translateY(50pt)
        opacity: 0
    .timers
      padding-top: 25pt
      padding-bottom: 0
</style>
