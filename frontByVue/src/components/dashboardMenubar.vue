<template lang="pug">
div.menubar
  section
    a.btn 과제풀기
    router-link.btn(to='/upload') 과제등록
  section
    router-link.btn(to="/type1") type1
    a.btn menu4
    a.btn menu1
    a.btn menu2
    a.btn menu3
    a.btn menu4
</template>

<script>
export default {
  name: 'dashboardManubar'
}
</script>

<style scoped>
  body {
    background-color: rgba(235, 237, 239, 1.0);
    margin-left: 250px;
    padding: 60px 20px;
  }
  .menubar {
    position: absolute;
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

  .menubar section {
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
