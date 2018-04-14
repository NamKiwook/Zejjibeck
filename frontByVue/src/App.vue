<template>
  <div id="app">
    <router-view name="nav"></router-view>
    <router-view name="sidebar"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  * {
    border: 0;
    box-sizing: border-box;
    color: #3c4858;
    font-size: 14px;
    font-family: 'Spoqa Han Sans', 'Sans-serif';
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
   }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  .btn {
    display: inline-block;
    color: #fff;
    background-color: #2E76B1;
    text-align: center;
    border-radius: 2px;
    border-width: 0px;
    border-style: solid;
    position: relative;
    padding: 15px 20px;
    user-select: none;
  }

  .btn::after {
    display: block;
    position: absolute;
    left: 0; top: 0; right: 0; bottom: 0;
  }

  .btn:hover::after {
    content: "";
    background-color: #fff;
    opacity: 0.08;
  }

  .btn:active::after {
    content: "";
    background-color: #000;
    opacity: 0.16;
  }

  .btn.white {
    background-color: #fff;
    border-width: 1px;
  }
  .progressbar {
    width: 100%;
    height: 24px;
    background-color: #f1f1f1;
    border-radius: 8px;
  }
  .progressbar > .gauge {
    width: 60%;
    height: 100%;
    background-color: #333333;
    text-align: center;
    line-height: 24px;
    color: #fff;
    border-radius: 8px;
  }



  body {
    background-color: #425262;
  }

  #app {
    height: 100%;
  }
</style>
