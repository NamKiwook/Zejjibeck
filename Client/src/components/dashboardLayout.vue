<template lang="pug">
  div.dashboardLayout
    navbar
    menubar
</template>

<script>
import dashboardNavbar from './dashboardNavbar'
import dashboardMenubar from './dashboardMenubar'

export default {
  name: 'dashboardLayout',
  components: {
    navbar: dashboardNavbar,
    menubar: dashboardMenubar
  }
}
</script>

<style scoped>
  .dashboardLayout {
    margin-left: 0;
    background-color: rgba(235, 237, 239, 1);
  }
</style>
