<template lang="pug">
div.sections
  section.main-section#home
    .content
      .main-left
        .title
          |데이터 습득을 위한
          br
          |데이터유통플랫폼
        .description 안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요
        router-link(to="/login").btn 서비스 시작하기
      .main-right
        .main-img
  section.description-section#about
    .content
      .section-title PRODUCT FEATURES AND BENEFITS
      .title 우리의 장점을 써보자
      .description 나에게 꼭 필요한 데이터만 수집을 할 수 있다 나에게 꼭 필요한 데이터만 수집을 할 수 있다 나에게 꼭 필요한 데이터만 수집을 할 수 있다나에게 꼭 필요한 데이터만 수집을 할 수 있다
  section.team-section#member
    .content
      .team-profile
        .profile-wrap
          .profile-img
          .profile-content
            .name 조현성
            .role Backend
            .description  awefadfawef
        .profile-wrap
          .profile-img
          .profile-content
            .name 편경민
            .role Backend
            .description awefadfawef
        .profile-wrap
          .profile-img
          .profile-content
            .name 박성준
            .role Frontend
            .description awefadfawef
        .profile-wrap
          .profile-img
          .profile-content
            .name 남기욱
            .role Frontend
            .description awefadfawef
        .profile-wrap
          .profile-img
          .profile-content
            .name 김태우
            .role mentor
            .description awefadfawef
  section.last-section
    .img-cover
      .content
        .title Copyright © Zejjibeck
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
    font-size: 24px;
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
    background-image: url("../assets/profileImg1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
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
    margin-bottom: 25px;
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
  .last-section .title {
    text-align: center;
    padding-top: 140px;
    font-size: 18px;
    color: #c8c8c8;
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
      .main-section > .content > .main-left > .title {
        font-size: 28px;
      }
      .main-section > .content > .main-left > .description {
        font-size: 16px;
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
      .team-profile > .profile-wrap > .profile-img {
        width: 150px;
        height: 150px;
      }

    }
  }
</style>
