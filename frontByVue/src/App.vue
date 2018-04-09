<template>
  <div id="app">
    <router-view name="nav"></router-view>
    <router-view name="side-bar"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    height: 100%;
  }
</style>
