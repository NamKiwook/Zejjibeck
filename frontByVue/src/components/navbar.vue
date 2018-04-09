<template lang="pug">
nav(v-bind:class="{scrolled:isScrolled}" v-on:scroll="navScrolled")
  .container
    router-link(to="/") DATAG
    .menu
      a.mobileHidden(data-target='#home') HOME
      a.mobileHidden(data-target='#about') ABOUT
      router-link(to="/login") SIGN IN
</template>

<script>
export default {
  name: 'navbar',
  data: function () {
    return {isScrolled: false}
  },
  methods: {
    navScrolled: function () {
      var scrollPostion = this.scrollTop()
      console.log(scrollPostion)
      if (scrollPostion >= 50) {
        return {isScrolled: true}
      } else {
        return {isScrolled: false}
      }
    }
  }
}
</script>

<style scoped>

</style>
