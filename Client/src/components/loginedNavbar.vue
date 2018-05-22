<template lang="pug">
nav
  .container
    modal(name="profile-setting" adaptive=true width="90%" maxWidth=450, height="auto" scrollable=true)
      .modal-container
        a.close-btn(@click="hide")
        .box
          .title 현재 비밀번호
          .sep :
          .description
            input(type="password")
        .box
          .title 변경할 비밀번호
          .sep :
          .description
            input(type="password")
        a.btn(@click="changeInfo") 변경사항 저장
    router-link.logo(to='/dashboard')
    .profile-wrap(@click="profileToggle")
      img.profile-img(src="../assets/default-user.png", width="30", height="30")
      <!--.profile-title {{username}} //유저네임 넣어주는게 더 나은것같으면 주석해제-->
      .profile-dropdown(v-bind:class="{visible : profileIsVisible}")
        .img-wrap
          .profile
            .cover
              .name {{username}}
        a PROFILE
        a(@click="showSetting") SETTING
        a.logout LOGOUT
  .sep
  .section
    router-link.title(to='/dashboard', :class="{active : pathname === '/dashboard'}") Dashboard
    router-link.title(to='/list', :class="{active : pathname === '/list'}") Project
    router-link.title(to='/upload', :class="{active : pathname === '/upload'}") Upload

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
    },
    showSetting () {
      this.$modal.show('profile-setting')
    },
    hide () {
      this.$modal.hide('profile-setting')
    },
    changeInfo () {

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
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
  }
  nav > .container > .profile-wrap > .profile-img {
  }
  nav > .container > .profile-wrap > .profile-title {
    display: inline-block;
    margin-left: 8px;
  }
  .profile-dropdown {
    display: flex;
    flex-flow: column;
    position: absolute;
    top: 35px; right: 0;
    visibility: hidden;
    z-index: 999;
    background-color: #262931;
    box-shadow: 0 15px 50px 0 rgba(213,216,228,.3);
    border-radius: 5px;
    width: 200px;
  }
  .profile-dropdown.visible {
    visibility: visible;
  }
  .profile-dropdown > .img-wrap {
  }
  .profile-dropdown > .img-wrap > .profile {
    background-image: url("../assets/profileImg1.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 200px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 200px;
    height: 200px;
    position: relative;
  }
  .profile-dropdown > .img-wrap > .profile > .cover {
    background-color: rgba(11, 17, 31, 0.5);
    border-radius: 5px 5px 0 0;
    position:absolute;
    top:0; left:0; right:0; bottom:0;
  }
  .profile-dropdown > .img-wrap > .profile > .cover > .name {
    text-align: center;
    color: #fff;
    font-size: 16px;
    margin-top: 150px;
  }
  .profile-dropdown > .img-wrap > .title {
    text-align: center;
  }
  .profile-dropdown > a {
    text-align: left;
    border: 0;
    color: #b9b9b9;
    width: 100%;
    padding: 20px 30px;
    font-size: 13px;
  }
  .profile-dropdown > a:hover {
    color: #fff;
  }
  .profile-dropdown > .logout {
    border-top: 1px solid #4e4e4e;
  }
  nav > .sep {
    background-color: #eee;
    height: 1px;
  }
  nav > .section {
    display: flex;
    align-items: center;
    width: 90%;
    max-width: 880px;
    height: 49px;
    margin: 0 auto;
  }
  nav > .section > .title {
    height: 100%;
    line-height: 49px;
    margin-right: 20px;
  }
  nav > .section > .title:hover {
    border-bottom: 3px solid #e4e4e4;
  }
  nav > .section > .title.active {
    border-bottom: 3px solid #2979ff;
  }
  @media only screen and (max-width: 1170px) {
    nav > .container {
      width: 100%;
      padding: 0 10px;
    }
    nav > .section {
    }
  }
  .modal-container {
    padding: 50px 20px;
    text-align: center;
    position: relative;
  }
  .modal-container > .close-btn {
    display: inline-block;
    background-image: url("../assets/close.png");
    background-position: center;
    background-size: 15px;
    background-repeat: no-repeat;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 10px; top: 10px;
  }
  .modal-container > .box {
    display: flex;
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid #eeeeee;
  }
  .modal-container > .box > .title {
    width: 100px;
    font-weight: 800;
    font-size: 12px;
  }
  .modal-container > .box > .sep {
    font-size: 12px;
    padding: 0 10px;
  }
  .modal-container > .box > .description {
    font-size: 12px;
    margin-left: auto;
    width: calc(100% - 130px);
  }
  .modal-container > .box > .description > input {
    border: 1px solid #eee;
    border-radius : 2px;
    width: 100%;
  }
  .modal-container > .btn {
    margin-top: 20px;
    padding: 15px 60px;
  }
  @media only screen and (max-width: 550px) {
    nav > .container > .logo {
      width: 100px;
      background-size: 100px;
    }
  }
</style>
