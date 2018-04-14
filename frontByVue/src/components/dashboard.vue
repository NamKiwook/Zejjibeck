<template lang="pug">
div.container
  .title Dash Board
  carousel.project(per-page=3, scroll-per-page=true, pagination-color='#fff', pagination-padding=5)
    slide
      .project-wrap
        .title Project1
        .sub.title #231
        .problem-wrap
          .total
            .num 8,421
            .text Total Problem
          .solved
            .num 341
            .text Solved Problem
    slide
      .project-wrap
        .title Project1
        .sub.title #231
        .problem-wrap
          .total
            .num 8,421
            .text Total Problem
          .solved
            .num 341
            .text Solved Problem
    slide
      .project-wrap
        .title Project1
        .sub.title #231
        .problem-wrap
          .total
            .num 8,421
            .text Total Problem
          .solved
            .num 341
            .text Solved Problem
    slide
      .project-wrap
        .title Project1
        .sub.title #231
        .problem-wrap
          .total
            .num 8,421
            .text Total Problem
          .solved
            .num 341
            .text Solved Problem
    slide
      .project-wrap
        .title Project1
        .sub.title #231
        .problem-wrap
          .total
            .num 8,421
            .text Total Problem
          .solved
            .num 341
            .text Solved Problem
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
  .container {
    margin-left: 250px;
    margin-top: 60px;
  }
  .container > .title {
    display: inline-block;
    width: 100%;
    font-weight: 800;
    font-size: 32px;
    padding: 10px;
    margin: 10px;
  }
  .project-wrap {
    height: 400px;
    background-color: #fff;
    margin: 20px;
    padding: 15px;
    border: 1px solid rgba(211, 215, 219, 1.0);
    border-radius: 4px;
  }
  .project-wrap > .title {
    font-size: 18px;
    font-weight: 600;
    display: inline-block;
  }
  .project-wrap > .sub {
    color: #a7b3bf;
    margin-left: 5px;
  }
  .problem-wrap {
    display: flex;
    padding: 20px 0;
    margin: 10px 0 20px;
  }
  .problem-wrap > div {
    flex: 1;
    text-align: center;
  }
  .problem-wrap > div > .num {
    font-weight: 800;
    font-size: 20px;
  }
  .problem-wrap > div > .text {
    color: #a7b3bf;
  }
  @media only screen and (max-width: 1080px) {
    .container {
      margin-left: 0;
    }
  }
</style>
<style>
  body {
    background-color: rgba(235, 237, 239, 1.0);
  }
</style>
