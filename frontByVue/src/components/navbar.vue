<template lang="pug">
nav(v-bind:class="{scrolled : isScrolled}")
  .container
    router-link.logoImage(to="/") DATAG
    .menu
      a.mobileHidden(href="#home" v-scroll-to="'#home'") HOME
      a.mobileHidden(href="#about" v-scroll-to="'#about'") ABOUT
      router-link(to="/login") SIGN IN
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      isScrolled: false
    }
  },
  methods: {
    handleScroll () {
      var scrollPosition = window.scrollY
      if (scrollPosition >= 50) {
        this.isScrolled = true
      } else {
        this.isScrolled = false
      }
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
  .scrolled {
    height: 60px;
    background-color: rgba(0,0,0,0.8);
  }

  nav {
    height: 100px;
    background-color: inherit;
    left: 0;
    right: 0;
    top: 0;
    position: fixed;
    width: 100%;
    z-index: 999;
    transition: all 0.2s;
  }

  nav > .container {
    max-width: 1080px;
    display: flex;
    margin: auto;
    padding: 0 20px;
    height: 100%;
    overflow: hidden;
    align-items: center;
  }

  nav > .container > .logoImage {
    color: #fff;
    display: inline-block;
    font-weight: 800;
    font-size: 28px;
  }

  nav > .container > .menu {
    margin-left: auto;
  }

  nav > .container > .menu a {
    color: #fff;
    padding: 20px;
    font-weight: 700;
  }

  @media only screen and (max-width: 550px) {
    nav > .container > .menu > a {
      padding: 0;
    }
    nav > .container > .menu > .mobileHidden {
      visibility: hidden;
    }
  }
</style>
