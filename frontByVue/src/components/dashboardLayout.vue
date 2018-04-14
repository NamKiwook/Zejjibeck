<template lang="pug">
  div.dashboardLayout
    navbar
    menubar
    type

</template>

<script>
import dashboardNavbar from './dashboardNavbar'
import dashboardMenubar from './dashboardMenubar'
import dashboardType from './dashboardType'

export default {
  name: 'dashboardLayout',
  components: {
    navbar: dashboardNavbar,
    menubar: dashboardMenubar,
    type: dashboardType
  }
}
</script>

<style scoped>
  .dashboardLayout {
    margin-left: 0;
    background-color: rgba(235, 237, 239, 1.0);
  }
</style>
