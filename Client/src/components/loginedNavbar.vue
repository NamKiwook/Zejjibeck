<template lang="pug">
nav
  .container
    router-link.logo(to='/dashboard')
    .profile-wrap
      img.profile-img(src="../assets/default-user.png", width="30", height="30")
      .profileTitle {{username}}
  .sep
  .section
    router-link.title(to='/dashboard', :class="{active : pathname === '/dashboard'}") Dashboard
    router-link.title(to='/list', :class="{active : pathname === '/list'}") Project
    router-link.title(to='/upload', :class="{active : pathname === '/upload'}") Upload
  <!--.menu(@click="menuToggle")-->
  <!--router-link.logo(to='/dashboard') DATAG-->
  <!--.btn.profileWrap(@click="profileToggle")-->
    <!--img.profileImg(src="../assets/default-user.png", width="30", height="30")-->
    <!--.profileTitle {{username}}-->
    <!--.dropdownMenu(v-bind:class="{visible : profileIsVisible}")-->
      <!--a.btn Profile-->
      <!--a.btn Setting-->
      <!--a.btn Logout-->
</template>

<script>
export default {
  name: 'dashboardNavbar',
  data () {
    return {
      profileIsVisible: false,
      username: 'temp_username',
      pathname: null
    }
  },
  watch: {
    $route () {
      this.pathname = window.location.pathname
    }
  },
  created () {
    this.username = this.$store.getters.getUsername
    this.pathname = window.location.pathname
  },
  methods: {
    profileToggle () {
      this.profileIsVisible = !this.profileIsVisible
    },
    menuToggle () {
      this.$store.commit('menuToggle')
    }
  }
}
</script>

<style scoped>
  nav {
    background-color: #fff;
    box-shadow: 0 1px 0 0 rgba(0,0,0,.11);
    position: absolute;
    left:0; top: 0; right: 0;
  }
  nav > .container {
    max-width: 1170px;
    display: flex;
    margin:auto;
    height: 100px;
    align-items: center;
    overflow: hidden;
  }
  nav > .container > .logo {
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
  nav > .container > .profile-wrap {
    margin-left: auto;
  }
  nav > .container > .profile-wrap > .profile-img {
  }
  nav > .container > .profile-wrap > .profileTitle {
    display: inline-block;
    margin-left: 8px;
  }
  nav > .sep {
    background-color: #eee;
    height: 1px;
  }
  nav > .section {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 880px;
    height: 49px;
    margin: 0 auto;
  }
  nav > .section > .title {
    height: 100%;
    line-height: 49px;
    margin-right: 20px;
  }
  nav > .section > .title.active {
    border-bottom: 3px solid #2979ff;
  }
  /*nav {*/
    /*height: 60px;*/
    /*background-color:#222;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*position: fixed;*/
    /*top:0; left:0; right:0;*/
    /*z-index: 999;*/
  /*}*/
  /*nav .btn {*/
    /*background-color: rgba(0,0,0,0);*/
  /*}*/
  /*nav > .menu {*/
    /*background-image: url('../assets/iconmonstr-menu-1-240.png');*/
    /*background-size: 18px;*/
    /*background-repeat: no-repeat;*/
    /*background-position: center;*/
    /*display: none;*/
    /*height: 100%;*/
    /*border: 0;*/
  /*}*/

  /*nav > .logo {*/
    /*font-size: 28px;*/
    /*font-weight: 800;*/
    /*color: #fff;*/
    /*display: inline-block;*/
    /*margin-left: 70px;*/
  /*}*/

  /*nav > .profileWrap {*/
    /*display: flex;*/
    /*align-items: center;*/
    /*margin-left: auto;*/
    /*height: 100%;*/
    /*padding: 20px;*/
    /*border: 0;*/
  /*}*/

  /*nav > .profileWrap > .profileImg {*/
    /*border-radius: 50%;*/
    /*!* padding: 0 15px; *!*/
    /*!* border: 2px solid rgba(211, 215, 219, 1.0); *!*/
  /*}*/

  /*nav > .profileWrap > .profileTitle {*/
    /*padding-top: 5px;*/
    /*margin-left: 10px;*/
    /*color: #fff;*/
  /*}*/

  /*nav > .profileWrap > .dropdownMenu {*/
    /*display: flex;*/
    /*flex-flow: column;*/
    /*position: fixed;*/
    /*top: 60px; right: 0;*/
    /*background-color: #222;*/
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    /*visibility: hidden;*/
    /*z-index: 999;*/
  /*}*/
  /*nav > .profileWrap > .dropdownMenu.visible {*/
    /*visibility: visible;*/
  /*}*/
  /*nav > .profileWrap > .dropdownMenu > a {*/
    /*background-image: url("../assets/iconmonstr-power-on-off-8-240.png");*/
    /*background-repeat: no-repeat;*/
    /*background-size: 14px;*/
    /*background-position: 15px center;*/
    /*text-align: left;*/
    /*border: 0;*/
    /*color: #fff;*/
    /*width: 150px;*/
    /*padding: 10px 15px 10px 40px;*/
  /*}*/
  /*@media only screen and (max-width:1080px) {*/
    /*nav > .menu {*/
      /*display: inline-block;*/
      /*width: 60px;*/
    /*}*/

    /*nav > .logo {*/
      /*text-align: center;*/
      /*flex: 1;*/
      /*margin: 0;*/
    /*}*/

    /*nav > .profileWrap {*/
      /*width: 60px;*/
      /*margin: 0;*/
      /*padding: 15px;*/
    /*}*/

    /*nav > .profileWrap > .profileTitle {*/
      /*visibility: hidden;*/
      /*width: 0;*/
      /*margin: 0;*/
    /*}*/
  /*}*/
</style>
