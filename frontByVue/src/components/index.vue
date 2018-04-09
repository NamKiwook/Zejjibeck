<template lang="pug">
div
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

</style>
