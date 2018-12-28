<template>
  <button
    class="button is-dark"
    :class="{
      'is-primary': !isPaused, 
      'is-success': isPaused
    }"
    @click="$store.commit(isPaused ? 'resume' : 'pause')">
    <svg
      v-if="!isPaused"
      width="1em" height="1em" viewBox="10 10 16 16" >
      <path d="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26" />
    </svg>
    <svg
      v-else 
      width="1em" height="1em" viewBox="10 10 16 16" >
      <path d="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28" />
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    isPaused: Boolean
  }
}
</script>

<style scoped lang="sass">
path
  fill: white
</style>
