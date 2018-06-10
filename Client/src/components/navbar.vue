<template lang="pug">
nav(v-bind:class="{scrolled : isScrolled}")
  .container
    router-link.logoImage(to="/")
    .menu
      a.mobileHidden(href="#home" v-scroll-to="'#home'" v-if="!isLoginPage") HOME
      a.mobileHidden(href="#about" v-scroll-to="'#about'" v-if="!isLoginPage") ABOUT
      a.mobileHidden(href="#team" v-scroll-to="'#member'" v-if="!isLoginPage") MEMBER
      router-link(to="/login" v-if="!isLoginPage") SIGN IN
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      isLoginPage: false
    }
  },
  watch: {
    $route () {
      if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
        this.isLoginPage = true
      } else {
        this.isLoginPage = false
      }
    }
  },
  computed: {
    isScrolled () {
      return this.$store.getters.getScrolled
    }
  },
  created () {
    if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
      this.isLoginPage = true
    } else {
      this.isLoginPage = false
    }
    return this.isScrolled
  }
}
</script>

<style scoped>
  .scrolled {
    height: 100px;
    background-color: rgba(0,0,0,0.6);
  }
  nav {
    height: 140px;
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
    max-width: 1170px;
    display: flex;
    margin: auto;
    padding-right: 20px;
    height: 100%;
    overflow: hidden;
    align-items: center;
  }
  nav > .container > .logoImage {
    background-image: url("../assets/logo-black.png");
    width: 150px;
    height: 100%;
    background-size: 150px;
    background-position: center;
    background-repeat: no-repeat;
    color: #000;
    display: inline-block;
    font-weight: 800;
    font-size: 28px;
  }
  nav > .container > .menu {
    margin-left: auto;
  }
  nav > .container > .menu a {
    padding: 20px;
    font-weight: 700;
  }
  nav.scrolled .logoImage {
    background-image: url("../assets/logo-white.png");
  }
  nav.scrolled .menu a {
    color: #fff;
  }
  @media only screen and (max-width: 1170px) {
    nav > .container {
      padding: 0 15px;
    }
  }
  @media only screen and (max-width: 550px) {
    nav {
      min-width: 400px;
    }
    nav > .container > .logoImage {
      width: 100px;
      background-size: 100px;
    }
    nav > .container > .menu > a {
      padding: 0;
    }
    nav > .container > .menu > .mobileHidden {
      display: none;
    }
  }
</style>
