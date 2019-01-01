<template>
  <div class="field">
    <p class="control">
      <span class="select">
        <select
          v-model="locale">
          <option
            v-for="(lang, i) in langs"
            :key="`Lang${i}`"
            :value="lang.code"
          >{{ lang.name }}</option>
        </select>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      langs: [
        {code: 'en', name: 'English'},
        {code: 'fr', name: 'Francais'}
      ]
    }
  },
  computed: {
    locale: {
      get () {
        return this.$i18n.locale
      },
      set (value) {
        this.$i18n.locale = value
        this.$store.commit('changeSetting', {
          setting: 'locale',
          value: value
        })
      }
    }
  },
}
</script>