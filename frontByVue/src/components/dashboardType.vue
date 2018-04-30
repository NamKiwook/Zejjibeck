<template lang="pug">
div.boardType
  a 과제풀기
  router-link#upload(to='/upload') 과제등록
  router-link#mypage(to='/dashboard') 마이페이지

</template>

<script>
export default {
  name: 'dashboardType'
}
</script>

<style scoped>
  .boardType {
    padding: 10px 0;
    text-align: right;
    border-bottom: 1px solid rgba(211, 215, 219, 1.0);
  }

  .boardType > a {
    display: inline-block;
    position: relative;
    border-radius: 20px;
    padding: 12px 20px;
    margin: 0 3px;
  }
  .boardType > a::after {
    display: block;
    position: absolute;
    border-radius: 20px;
    left: 0; top: 0; right: 0; bottom: 0;
  }

  .boardType > a:hover::after {
    content: "";
    background-color: #000;
    opacity: 0.08;
  }
  .boardType > .active {
    background-color: #425262;
    color: #fff;
  }

</style>
