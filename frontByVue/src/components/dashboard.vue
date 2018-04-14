<template lang="pug">
div.sections
  .title Dash Board
  carousel.hi(per-page='3', pagination-color="#fff")
    slide.project-item
      .title Project 1
      .progressbar
        .gauge 60%
    <!--slide.project-item-->
      <!--.title Project 1-->
      <!--.progressbar-->
        <!--.gauge 60%-->
    <!--slide.project-item-->
      <!--.title Project 1-->
      <!--.progressbar-->
        <!--.gauge 60%-->
    <!--slide.project-item-->
      <!--.title Project 1-->
      <!--.progressbar-->
        <!--.gauge 60%-->
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
    overflow-x: scroll;
  }
  .sections > .title {
    font-weight: 800;
    font-size: 32px;
    margin-top: 20px;
  }
  .project-wrap {
    height: 400px;
  }
  .project-item {
    display: inline-block;
    background-color: #fff;
    border: 1px solid rgba(211,215,219,1.0);
    border-radius: 4px;
    width: 300px;
    height: 100%;
    margin: 10px;
  }
  /*section {*/
    /*background-color: #fff;*/
    /*border-radius: 4px;*/
    /*padding: 20px;*/
    /*border: 1px solid rgba(211, 215, 219, 1.0);*/
    /*margin-top: 20px;*/
  /*}*/
  /*section > .title {*/
    /*font-size: 20px;*/
  /*}*/
  /*section > .flex-container {*/
    /*display: flex;*/
    /*flex-flow: row;*/
  /*}*/
  /*.project-wrap {*/
    /*display: flex;*/
    /*flex-flow: column;*/
    /*width: 400px;*/
    /*padding: 10px;*/
    /*margin: 15px;*/
    /*border: 1px solid rgba(211, 215, 219, 1.0);*/
    /*border-radius: 8px;*/
  /*}*/
  /*.project-wrap > .title {*/
    /*flex: 1;*/
  /*}*/
  /*.project-wrap > .progressbar {*/
    /*flex: 3;*/
    /*margin-top: 10px;*/
  /*}*/
  @media only screen and (max-width: 1080px) {
    .sections {
      margin: 0;
    }
  }
</style>
<style>
  body {
    background-color: rgba(235, 237, 239, 1.0);
  }
</style>
