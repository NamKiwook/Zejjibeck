<template lang="pug">
div.sections
  section.firstSection 안녕하세요
  section.secondSection 반갑습니다
  section.thirdSection 나는 {{ userId }}
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      userId: null
    }
  },
  created () {
    this.$http.get('/api/dashboard').then((res) => {
      this.userId = res.data.decode.userId
    })
  }
}
</script>

<style scoped>
  .sections {
    margin-left: 250px;
    padding: 0px 20px;
  }
  section {
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid rgba(211, 215, 219, 1.0);
    margin-top: 20px;
  }
  @media only screen and (max-width: 1080px) {
    .sections {
      margin: 0;
    }
  }
</style>
<style>
  body {
    height: 100%;
    background-color: rgba(235, 237, 239, 1.0);
  }
</style>
