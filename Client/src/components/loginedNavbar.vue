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
            input(type="password", v-model="currentPassword")
        .box
          .title 변경할 비밀번호
          .sep :
          .description
            input(type="password", v-model="changePassword")
        .box
          .title 프로필 사진
          .sep :
          .description
            form#ajaxFrom(enctype="multipart/form-data", ref="form")
              input#ajaxFile(type="file", ref="file")
        a.btn(@click="changeInfo") 변경사항 저장
    router-link.logo(to='/dashboard')
    .profile-wrap(@click="profileToggle")
      img.profile-img(:src="this.$store.getters.getUserProfile" ref="profile" ,width="45", height="45")
      .profile-title {{username}}
      .profile-dropdown(v-bind:class="{visible : profileIsVisible}")
        .img-wrap
          .profile(:style="{ 'background-image': 'url(' + this.$store.getters.getUserProfile + ')' }")
            .cover
              .name {{username}}
        a(@click="showSetting") SETTING
        a.logout(@click="logout") LOGOUT
  .sep
  .section
    router-link.title(to='/dashboard', :class="{active : pathname === 'dashboard'}") 대시보드
    router-link.title(to='/list', :class="{active : pathname === 'list'}") 과제 수행
    router-link.title(to='/upload', :class="{active : pathname === 'upload'}") 과제 의뢰
    router-link.title(to='/credit', :class="{active : pathname === 'credit'}") 크레딧
  .cover(v-if="isLoading")
    .loader
</template>

<script>
export default {
  name: 'dashboardNavbar',
  data () {
    return {
      profileIsVisible: false,
      username: 'temp_username',
      pathname: null,
      image: "../assets/default-user.png",
      currentPassword: null,
      changePassword: null,
    }
  },
  created () {
    this.username = this.$store.getters.getUsername
    this.pathname = window.location.pathname.split("/")[1]
    if(this.pathname === 'refine' || this.pathname === 'collect') {
      this.pathname = 'list'
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.getIsLoading
    },
  },
  watch: {
    $route () {
      this.pathname = window.location.pathname.split("/")[1]
      if(this.pathname === 'refine' || this.pathname ===  'collect') {
        this.pathname = 'list'
      }
    }
  },
  methods: {
    profileToggle () {
      this.profileIsVisible = !this.profileIsVisible
    },
    showSetting () {
      this.$modal.show('profile-setting')
    },
    hide () {
      this.$modal.hide('profile-setting')
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    async changeInfo () {
      var formData = new FormData()
      if (this.$refs.file.files[0]) {
        await formData.append('file', this.$refs.file.files[0])
      }
      if(this.changePassword) {
        await formData.append('password', this.changePassword)
      }
      this.$http.put('/api/userInfo',formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        if(res.data.success) {
          this.$http.get('/api/userInfo/profile').then((res) => {
            this.$store.commit('userProfile', 'data:image/jpg;base64,' + res.data)
          })
        }
        this.$modal.hide('profile-setting')
      })
    }
  }
}
</script>

<style scoped>
  .cover {
    background-color: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top:0; left:0; right:0; bottom:0;
    z-index: 9999;
  }
  .loader {
    border: 10px solid #f3f3f3;
    border-radius: 50%;
    border-top: 10px solid #2979ff;
    width: 80px;
    height: 80px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
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
    width: 170px;
    height: 100%;
    background-size: 170px;
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
    border-radius: 50%;
  }
  nav > .container > .profile-wrap > .profile-title {
    display: inline-block;
    margin-left: 8px;
  }
  .profile-dropdown {
    display: flex;
    flex-flow: column;
    position: absolute;
    top: 50px; right: 0;
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
    font-weight: bold;
    border-bottom: 3px solid rgba(255,255,255,0);
    transition: all 0.4s;
  }
  nav > .section > .title:hover {
    border-color: #e4e4e4;
  }
  nav > .section > .title.active {
    border-color: #2979ff;
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
    nav {
      min-width: 400px;
    }
    nav > .container > .logo {
      width: 100px;
      background-size: 100px;
    }
    nav > .container > .profile-wrap > .profile-title {
      display: none;
    }
  }
</style>
