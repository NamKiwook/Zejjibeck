<template lang="pug">
div.sections
  section.main-section#home
    .content
      .main-left
        .title
          | 데이터 유통 플랫폼
          br
          | DATAG
        .description
          | 누구나 다양한 유형의 데이터를 의뢰할 수 있고,
          br
          | 의뢰에 맞는 데이터 판매, 가공을 할 수 있습니다!
        router-link(to="/login").btn 시작하기
      .main-right
        .main-img
  section.description-section#about
    .content
      .section-title EASY & POWERFUL DATAG
      .title
        | 다양한 유형의 데이터의
        br
        | 수집과 정제를 간단하게!
      .item-wrap
        .item
          img(src="../assets/data.png")
          .text
            | 원하는 다양한 유형의 데이터를
            br
            | 쉽고 빠르게 얻을 수 있습니다.
        .item
          img(src="../assets/mouse.png")
          .text
            | 간단한 클릭 및 짧은 타이핑으로
            br
            | 데이터 수집 및 정제가 가능합니다.
        .item
          img(src="../assets/computer.png")
          .text
            | PC뿐만 아니라 모바일에서도
            br
            | 손쉽게 서비스 이용이 가능합니다.

  section.team-section#member
    .content
      .team-profile
        .profile-wrap
          img.profile-img(src="../assets/cho.jpeg")
          .profile-content
            .name 조현성
            .role Backend
        .profile-wrap
          img.profile-img(src="../assets/pyeon.png")
          .profile-content
            .name 편경민
            .role Backend
        .profile-wrap
          img.profile-img(src="../assets/profileImg1.jpg")
          .profile-content
            .name 박성준
            .role HTML/CSS
        .profile-wrap
          img.profile-img(src="../assets/nam.jpg")
          .profile-content
            .name 남기욱
            .role Vue.js
        .profile-wrap
          img.profile-img(src="../assets/mentor.jpg")
          .profile-content
            .name 김태우
            .role mentor
  section.last-section
    .img-cover
      .contact
        .title contact
        .wrap
          span 이메일
          p listenme1@naver.com
        .wrap
          span 문의처
          p 010 4180 9116
        .wrap
          p © team Zejjibeck
          a(href="https://github.com/peter1201/Zejjibeck" target="_blank").icon
</template>

<script>
export default {
  name: 'index',
  methods: {
    handleScroll () {
      var scrollPosition = window.scrollY
      if (scrollPosition >= 50) {
        this.$store.commit('scrollIsTrue')
      } else {
        this.$store.commit('scrollIsFalse')
      }
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
    this.$store.commit('scrollIsFalse')
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
    this.$store.commit('scrollIsTrue')
  }
}
</script>

<style scoped>
  section {
    overflow: hidden;
  }
  .content {
    width: 1170px;
    margin: 0 auto;
    padding: 0 15px;
  }
  .main-section {
    padding-top: 100px;
    background-color: #fbfbfb;
  }
  .main-section > .content {
    display: flex;
    margin-top: 160px ;
  }
  .main-left {
    width: 550px;
    flex: 1;
  }
  .main-left > .title {
    display: inline-block;
    color: #000;
    font-size: 60px;
    font-weight: bold;
  }
  .main-left > .description {
    display: inline-block;
    font-size: 22px;
    color: #8492a6;
    font-weight: normal;
    line-height: 1.5;
    margin-top: 30px;
  }
  .main-left > .btn {
    background-color: #2979ff;
    width: 265px;
    margin-top: 30px;
    margin-bottom: 200px;
    font-size: 20px;
    box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.05);
    padding: 20px 0;
    font-weight: bold;
    border-radius: 50px;
  }
  .main-right {
    position: relative;
    flex: 1;
  }
  .main-right > .main-img {
    display: inline-block;
    width: 800px;
    height: 800px;
    background-image: url("../assets/index-img.png");
    background-repeat: no-repeat;
    background-size: 800px;
    position: absolute;
    top: 50px;
  }
  .description-section {
    background-color: #fff;
  }
  .description-section > .content {
    text-align: center;
    padding: 200px 15px;
  }
  .description-section > .content > .section-title {
    font-size: 14px;
    letter-spacing: 1.5px;
    font-weight: bold;
    color: #2979ff;
    margin-bottom: 30px;
  }
  .description-section > .content > .title {
    display: inline-block;
    color: #000;
    font-size: 52px;
    font-weight: bold;
  }
  .description-section > .content > .description {
    font-size: 20px;
    color: #8492a6;
    font-weight: normal;
    line-height: 1.5;
    width: 600px;
    margin: 30px auto 0;
  }
  .description-section > .content > .item-wrap {
    display: flex;
    margin-top: 120px;
  }
  .description-section > .content > .item-wrap > .item {
    flex: 1;
    padding: 30px;
  }
  .description-section > .content > .item-wrap > .item > img {
    width: 120px;
    height: 120px;
    margin-bottom: 40px;
  }
  .description-section > .content > .item-wrap > .item > .text {
    font-size: 18px;
    line-height: 1.6;
  }
  .team-section {
    background-color: #fbfbfb;
    padding: 100px 15px;
  }
  .team-section > .content {
  }
  .team-profile {
    display: flex;
    flex-wrap: wrap;
  }
  .team-profile > .profile-wrap{
    display: flex;
    width: 50%;
    padding: 30px 0;
  }
  .team-profile > .profile-wrap > .profile-img {
    display: inline-block;
    width: 250px;
    height: 250px;
    border-radius: 50%;
  }
  .team-profile > .profile-wrap > .profile-content {
    display: flex;
    flex-flow: column;
    margin-left: 30px;
    justify-content: center;
  }
  .team-profile > .profile-wrap > .profile-content > .name {
    font-size: 24px;
    font-weight: bolder;
    color: #000;
    margin-bottom: 5px;
  }
  .team-profile > .profile-wrap > .profile-content > .role {
    color: #8492a6;
    font-weight: bold;
    font-size: 18px;
  }
  .last-section {
    background: url("../assets/business-3370832_1920.jpg") no-repeat;
    background-position-y: -150px;
    background-size: cover;
    height: 400px;
  }
  .last-section > .img-cover {
    background-color: rgba(43, 43, 43, 0.9);
    width:100%;
    height: 100%;
  }
  .last-section .contact {
    width: 1170px;
    margin: 0 auto;
    padding-top: 120px;
    padding-left: 50px;
  }
  .last-section .title {
    color: #fff;
    font-size: 32px;
    margin-bottom: 24px;
    font-weight: bold;
    color: #d6dee9;
  }
  .last-section .wrap {
    display: flex;
    margin-bottom: 15px;
  }
  .last-section p {
    color: #afb7c1;
    font-size: 14px;
    margin-left: 4px;
    line-height: 20px;
    vertical-align: middle;
  }
  .last-section span {
    color: #afb7c1;
    margin-right: 15px;
    font-weight: bold;
    font-size: 13px;
  }
  .last-section .icon {
    display: inline-block;
    background-image: url("../assets/github.png");
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
  @media only screen and (max-width: 1170px) {
    .content {
      width: 500px;
    }
    .main-section > .content {
      flex-flow: column;
    }
    .main-section > .content > .main-left {
      width: 100%;
      text-align: center;
    }
    .main-section > .content > .main-left > .title {
      font-size: 42px;
    }
    .main-section > .content > .main-left > .description {
      font-size: 18px;
    }
    .main-section > .content > .main-left > .btn{
      margin-bottom: 10px;
    }
    .main-section > .content > .main-right {
      height: 400px;
    }
    .main-section > .content > .main-right > .main-img {
      background-size: 100%;
      width: 100%;
    }
    .description-section > .content > .title {
      font-size: 42px;
    }
    .description-section > .content > .description {
      font-size: 18px;
      width: 100%;
    }
    .description-section > .content > .item-wrap {
      flex-flow: column;
    }
    .description-section > .content > .item-wrap > .item {
      margin-bottom: 30px;
    }
    .team-profile > .profile-wrap {
      width: 100%;
    }
    .last-section {
      background-position: center;
    }
    @media only screen and (max-width: 550px) {
      .content {
        width: 90%;
      }
      .main-section > .content {
        margin-top: 100px;
      }
      .main-section > .content > .main-left > .title {
        font-size: 28px;
      }
      .main-section > .content > .main-left > .description {
        font-size: 15px;
      }
      .main-section > .content > .main-right {
        height: 300px;
      }
      .description-section > .content > .title {
        font-size: 28px;
      }
      .description-section > .content > .description {
        font-size: 16px;
        width: 100%;
      }
      .description-section > .content > .item-wrap > .item > img {
        width: 90px;
        height: 90px;
      }
      .description-section > .content > .item-wrap > .item > .text{
        font-size: 14px;
      }
      .team-profile > .profile-wrap > .profile-img {
        width: 150px;
        height: 150px;
      }

    }
  }
</style>
