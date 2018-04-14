<template lang="pug">
nav
  .menu
  router-link.logo(to='/dashboard') DATAG
  .btn.profileWrap
    img.profileImg(src="../assets/profileImg1.jpg", width="30", height="30")
    .profileTitle Park Seongjun
    .dropdownMenu
      a.btn Profile
      a.btn Setting
      a.btn Logout
</template>

<script>
export default {
  name: 'dashboardNavbar'
}
</script>

<style scoped>
   nav {
    height: 60px;
    background-color:#222;
    display: flex;
    align-items: center;
    /*position: fixed;*/
    top:0; left:0; right:0;
    z-index: 999;
  }

  nav > .menu {
    background-image: url('../assets/iconmonstr-menu-1-240.png');
    background-size: 18px;
    background-repeat: no-repeat;
    background-position: center;
    display: none;
    height: 100%;
    border: 0;
  }

  nav > .logo {
    font-size: 28px;
    font-weight: 800;
    color: #fff;
    display: inline-block;
    margin-left: 70px;
  }

  nav > .profileWrap {
    display: flex;
    align-items: center;
    margin-left: auto;
    height: 100%;
    padding: 20px;
    border: 0;
  }

  nav > .profileWrap > .profileImg {
    border-radius: 50%;
    /* padding: 0 15px; */
    /* border: 2px solid rgba(211, 215, 219, 1.0); */
  }

  nav > .profileWrap > .profileTitle {
    padding-top: 5px;
    margin-left: 10px;
    color: #fff;
  }

  nav > .profileWrap > .dropdownMenu {
    display: flex;
    flex-flow: column;
    position: fixed;
    top: 60px; right: 0;
    background-color: #222;
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
    visibility: hidden;
  }
  nav > .profileWrap > .dropdownMenu.visible {
    visibility: visible;
  }
  nav > .profileWrap > .dropdownMenu > a {
    background-image: url("../assets/iconmonstr-power-on-off-8-240.png");
    background-repeat: no-repeat;
    background-size: 14px;
    background-position: 15px center;
    text-align: left;
    border: 0;
    color: #fff;
    width: 150px;
    padding: 10px 15px 10px 40px;
  }
  @media only screen and (max-width:1080px) {
    nav > .menu {
      display: inline-block;
      width: 60px;
    }

    nav > .logo {
      text-align: center;
      flex: 1;
      margin: 0;
    }

    nav > .profileWrap {
      width: 60px;
      margin: 0;
      padding: 15px;
    }

    nav > .profileWrap > .profileTitle {
      visibility: hidden;
      width: 0;
      margin: 0;
    }
  }
</style>
