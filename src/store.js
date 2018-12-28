import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    timers: [],
    colors: [ // sorted by accessibility
      '#ffe119',
      '#4363d8',
      '#f58231',
      '#fabebe',
      '#e6beff',
      '#800000',
      '#000075',
      '#a9a9a9',
      '#e6194B',
      '#3cb44b',
      '#42d4f4',
      '#f032e6',
      '#469990',
      '#9A6324',
      '#fffac8',
      '#aaffc3',
      '#911eb4'
    ],
    currentTimer: 0,
    timerInterval: 10,
    isPaused: true,
    showSettings: false,
    settings: {
      timeByPlayer: null,
      timeByTurn: null,
      useCountdown: false,
      showMilliseconds: true,
      showColors: true
    }
  },
  mutations: {
    addTimer (state) {
      state.timers.push({
        name: '',
        elapsed: moment.duration(0),
        lastTick: null,
        interval: null,
        color: state.colors[state.timers.length]
      })
    },
    removeTimer (state) {
      if (state.timers.length < 2) return
      state.timers.pop()
      if (state.currentTimer >= state.timers.length - 1) {
        state.currentTimer = 0
      }
    },
    updateName (state, payload) {
      state.timers[payload.index].name = payload.value
    },
    resume (state) {
      state.isPaused = false
    },
    pause (state) {
      state.isPaused = true
    },
    nextTurn (state) {
      if (state.currentTimer >= state.timers.length - 1) {
        state.currentTimer = 0
      } else state.currentTimer++
    },
    reset (state) {
      state.isPaused = true
      state.currentTimer = 0
      state.showSettings = false
    },
    toggleSettings (state) {
      state.showSettings = !state.showSettings
      state.isPaused = state.showSettings
    },
    changeSetting (state, opt) {
      if (!opt.setting) return
      if (state.settings[opt.setting] === undefined) return
      state.settings[opt.setting] = opt.value
    }
  },
  actions: {
    tap ({ commit, state, index }) {
      if (state.isPaused) commit('resume')
      else if (state.timers.length === 1) {
        commit('pause')
      } else commit('nextTurn')
    }
  },
  getters: {
    timeByPlayer: state => {
      if (!state.settings.timeByPlayer) return null
      return moment.duration({
        seconds: state.settings.timeByPlayer
      })
    },
    timeByTurn: state => {
      if (!state.settings.timeByTurn) return null
      return moment.duration({
        seconds: state.settings.timeByTurn
      })
    },
    timer: state => index => {
      return state.timers[index]
    }
  }
})
