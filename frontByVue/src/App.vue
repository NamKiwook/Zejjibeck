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
  * {
    border: 0;
    box-sizing: border-box;
    color: #3c4858;
    font-size: 14px;vsad
  font-family: 'Spoqa Han Sans', 'Sans-serif';
    margin: 0;
    padding: 0;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  .btn {
    display: inline-block;
    text-align: center;
    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
    transition: all 0.2;
    position: relative;
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

  html {
    height: 100%;
  }

  body {
    background-color: #425262;
    height: 100%;
  }

  #app {
    height: 100%;
  }
</style>
