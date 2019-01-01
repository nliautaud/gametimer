<template>
  <div class="field">
    <p class="control">
      <span class="select">
        <select
          v-model="$i18n.locale">
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
  }
}
</script>