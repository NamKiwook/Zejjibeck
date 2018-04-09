<template lang="pug">
div.sections
  section.sectionFirst#home
    .imgCover
      .container
        .slogan Necessary data get easily.
        .text We can help you get the data you need more easily
        .sign
          router-link.signIn.btn(to="/login") Start DATAG
          router-link.signUp(to="/signUp") Don't have an account yet?
  section.sectionSecond#about
    .container
      .content
        img(src="../assets/iconmonstr-coin-10-240.png", width='120', height='120')
        .title cash
        .text 우리껄 쓰면 돈을 벌 수 있다 블라블라블라블라블라블라블라블라블라블라블라블라
      .content
        img(src='../assets/iconmonstr-file-9-240.png', width='120', height='120')
        .title data
        .text 우리껄 쓰면 원하는 데이터를 얻을 수 있다 블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라
      .content
        img(src="../assets/iconmonstr-time-19-240.png", width='120', height='120')
        .title speed
        .text 우리껄 쓰면 빠른시간안에 데이터를 얻을 수 있다 블라블라블라블라블라블라블라블라블라블라블라블라
  section.sectionThird
    .text Copyright © Zejjibeck
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>
  @media only screen and (max-width: 550px) {
    .sectionFirst > .imgCover > .container > .slogan {
      font-size: 28px;
    }
    .sectionFirst > .imgCover > .container > .text {
      font-size: 14px;
    }
    .sectionFirst > .imgCover > .container > .sign > .signIn{
      font-size: 16px;
    }
    .sectionFirst > .imgCover > .container > .sign > .signUp{
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 1080px) {
    .container {
      padding: 0 20px;
    }
    .sectionSecond > .container {
      flex-flow: column;
    }
    .sectionSecond > .container > .content {
      padding: 50px 15px;
    }
    .sectionSecond > .container > .content > .text{
      max-width: 320px;
      margin: 15px auto;
    }
  }
  .sections {
    height: 100%;
  }
  .sectionFirst {
    background-image: url('../assets/paper-3249919_1920.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    align-items: center;
  }
  .sectionFirst > .imgCover {
    background-image: linear-gradient(127deg, rgba(40, 47, 62, 0.9), rgba(40, 47, 62, 0.82) 34%, rgba(40, 47, 62, 0.75));
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width:100%;
    height: 100%;
  }

  .sectionFirst > .imgCover > .container > .slogan {
    color: #fff;
    font-size: 54px;
    font-weight: 100;
    margin: auto;
    padding-bottom: 20px;
  }

  .sectionFirst > .imgCover > .container > .text {
    color: #fff;
    font-size: 24px;
    font-style: italic;
    font-weight: 100;
    padding-bottom: 40px;
  }

  .sectionFirst > .imgCover > .container > .sign {
    width: 80%;
    margin: auto;
  }

  .sectionFirst > .imgCover > .container > .sign > .signIn {
    color: #fff;
    border-width: 0;
    background-color:#2E76B1;
    font-size: 20px;
    padding: 16px 70px;
    width: 100%;
  }

  .sectionFirst > .imgCover > .container > .sign > .signUp {
    color: #fff;
    float: right;
    text-align: right;
    margin-top: 15px;
    font-weight: 100;
  }

  .sectionSecond {
    padding: 120px 0 180px;
  }
  .sectionSecond > .container {
    display: flex;
    flex-flow: row;
    max-width: 1080px;
    margin: auto;
  }

  .sectionSecond > .container > .content {
    text-align: center;
    padding:0 30px;
  }

  .sectionSecond > .container > .content > .title {
    font-size: 24px;
    margin-top: 20px;
  }

  .sectionSecond > .container > .content > .text {
    margin-top: 15px;
  }

  .sectionThird {
    background-color: #242424;
    height: 400px;
    padding-top: 120px;
    text-align: center;
  }
  .sectionThird > .text {
    font-size: 18px;
    color: #777;
  }
</style>
