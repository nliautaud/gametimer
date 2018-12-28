<template>
  <div
    class="timer"
    :class="{'is-active': isActive}"
    @click="onTap"
    >
    <div class="inner"
      :style="style">
      <div
        class="timer-content"
        :class="{
          'has-text-light': !isActive,
          'has-background-grey': !isActive,
          'has-background-light': isActive
        }">
        <div class="time">{{ displayTime }}</div>
        <progress
          v-if="$store.getters.timeByPlayer"
          class="progress is-small is-success"
          :value="progress"
          max="1"
          :class="{
            'is-warning': progress > .65,
            'is-danger': progress == 1,
          }"
          />
      </div>
    </div>
  </div>
</template>

<script>
const moment = require('moment')
require('moment-duration-format')

export default {
  props: {
    index: Number
  },
  data: () => {
    return {
      elapsed: moment.duration(0),
      lastTick: null,
      interval: null
    }
  },
  mounted: function () {
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'reset':
          this.reset()
          break
        default:
          break
      }
      // console.log(mutation.payload)
    })
  },
  computed: {
    timer () {
      return this.$store.getters.timer(this.index)
    },
    isActive () {
      return this.$store.state.currentTimer === this.index
    },
    isRunning () {
      return this.isActive && !this.$store.state.isPaused
    },
    showColors () {
      return this.$store.state.settings.showColors
    },
    style () {
      let style = {}
      style.backgroundColor = this.showColors
        ? this.timer.color
        : '#ccc'

      return style
    },
    name: {
      get () {
        return this.$store.getters.name(this.index)
      },
      set (value) {
        this.$store.commit('updateName', {
          index: this.index,
          value: value
        })
      }
    },
    displayTime () {
      let time = this.elapsed

      if (this.$store.state.settings.useCountdown) {
        if (this.$store.getters.timeByPlayer) {
          time = this.$store.getters.timeByPlayer.clone()
        } else time = moment.duration(0)
        time.subtract(this.elapsed)
      }

      return time.format(this.displayFormat, {
        trim: false
      })
    },
    displayFormat () {
      if (this.$store.state.settings.showMilliseconds) return 'm:ss:SS'
      return 'm:ss'
    },
    progress () {
      let r = this.elapsed.asSeconds() / this.$store.getters.timeByPlayer.asSeconds()
      return Math.max(0, Math.min(1, r))
    }
  },
  methods: {
    reset () {
      this.elapsed = moment.duration(0)
    },
    start () {
      this.lastTick = moment()
      this.interval = window.setInterval(this.tick, this.$store.state.timerInterval)
    },
    stop () {
      window.clearInterval(this.interval)
    },
    tick () {
      let now = moment()
      this.elapsed.add(now.diff(this.lastTick))
      this.lastTick = now
    },
    onTap () {
      this.$store.dispatch('tap', this.index)
    }
  },
  watch: {
    isRunning: function (value) {
      if (value) this.start()
      else this.stop()
    }
  },
  beforeDestroy: function () {
    this.stop()
  }
}
</script>

<style scoped lang="sass">
.timer
  font-size: 2.5rem
  &.is-active
    font-size: 4rem
  cursor: pointer
  transition: all .18s cubic-bezier(0.21, -0.01, 0.61, 1.26)
  user-select: none
  padding: .5rem 0

  .inner
    width: 100%
    height: 100%
    position: relative
    display: flex
    justify-content: center
    align-items: center
  
  .timer-content
    position: relative
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    padding: 1rem 1.5rem
    min-width: 12rem
    border-radius: 5px
</style>
