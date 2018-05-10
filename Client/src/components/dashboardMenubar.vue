<script src="../router/index.js"></script>
<template lang="pug">
div.menubar(v-bind:class="{visible : isVisible}")
  section
    router-link.btn(to="/upload") 과제등록
    router-link.btn(to="/list") 과제풀기
  section
    a.btn menu4
    a.btn menu1
    a.btn menu2
    a.btn menu3
    a.btn menu4
</template>

<script>
export default {
  name: 'dashboardManubar',
  computed: {
    isVisible () {
      return this.$store.getters.menuIsVisible
    }
  }
}
</script>

<style scoped>
  .menubar {
    position: fixed;
    top: 60px; left: 0px; bottom: 0px;
    width: 250px;
    background-color: #425262;
    transition: all 0.4s;
    padding: 20px 0;
    z-index: 900;
    max-height: 100%;
  }

  .menubar.hide {
    left: -250px;
  }

  .menubar > section {
    margin-top: 20px;
  }
  .menubar > section > .btn {
    background-image: url("../assets/iconmonstr-briefcase-1-240.png");
    background-repeat: no-repeat;
    background-size: 14px;
    background-position: 30px center;
    background-color: rgba(0,0,0,0);
    width: 100%;
    color: rgba(255, 255, 255, 0.5);
    border-width: 0;
    padding: 20px 20px 20px 60px;
    text-align: left;
  }
  @media only screen and (max-width:1080px) {
    .menubar {
      left: -250px;
    }
    .menubar.visible {
      left: 0px;
    }
  }
</style>
