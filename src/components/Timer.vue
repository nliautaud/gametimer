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
        <div class="time">

          <template v-if="hours || (maxTime && maxTime.hours())">
            <span class="hours" v-html="time.hours()" />
            <span class="hours-sep">:</span>
          </template>
          <span class="minutes" v-html="minutes" />
          <span class="minutes-sep">:</span>
          <span class="seconds" v-html="seconds" />
          <template v-if="$store.state.settings.showMilliseconds">
            <span class="millis-sep">.</span>
            <span class="millis" v-html="milliseconds" />
          </template>
        </div>
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
        : '#242424'

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
    maxTime () {
      if (this.$store.getters.timeByPlayer) {
        return this.$store.getters.timeByPlayer.clone()
      }
      return null
    },
    time () {
      let time = this.elapsed

      if (this.$store.state.settings.useCountdown) {
        if (this.$store.getters.timeByPlayer) {
          time = this.$store.getters.timeByPlayer.clone()
        } else time = moment.duration(0)
        time.subtract(this.elapsed)
      }
      
      return time
    },
    hours () {
      return this.time.hours()
    },
    minutes () {
      return this.pad(this.time.minutes(), 2)
    },
    seconds () {
      return this.pad(this.time.seconds(), 2)
    },
    milliseconds () {
      if (!this.$store.state.settings.showMilliseconds) {
        return null
      }
      return this.pad(this.time.milliseconds(), 2)
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
    },
    pad (num, length) {
      let str = num.toString().substring(0, length)
      while (str.length < length)
        str = '0' + str;
      return str;
    }
  },
  watch: {
    isRunning: function (value) {
      if (value) {
        this.start()
        this.$el.scrollIntoView(false)
      }
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
  cursor: pointer
  user-select: none

  .inner
    width: 100%
    height: 100%
    position: relative
    display: flex
    justify-content: center
    align-items: center
    padding: 1rem
    border-radius: 5px
  &.is-active
    .inner
      border-radius: 0px
  
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
