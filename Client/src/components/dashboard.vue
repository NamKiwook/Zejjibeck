<template lang="pug">
div.container
  .title Dash Board
  .btn-wrap
    router-link.btn(to='/refine') 과제풀기
    router-link.btn(to='/upload') 과제등록
  modal(name="charge-modal" width="450" height="auto" scrollable="ture")
    .modal-container
      .box
        .title 충전할 크레딧
        .sep :
        .description
          input(type="tel")
          | 원
      .btn 크레딧 충전
  modal(name="withdraw-modal" width="450" height="auto" scrollable="ture")
    .modal-container
      .box
        .title 은행명
        .sep :
        .description 국민은행
      .box
        .title 계좌번호
        .sep :
        .description 7051231231231
      .box
        .title 예금주
        .sep :
        .description 박성준
      .box
        .title 총 크레딧
        .sep :
        .description 2500원
      .box
        .title 출금할 크레딧
        .sep :
        .description
          input(type="tel")
          | 원
      .btn 크레딧 출금
  carousel.project(per-page=3, scroll-per-page=true, pagination-color='#fff', pagination-padding=5, pagination-active-color='#666')
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
        .col-xs-6
          .inner-content.text-center
            .c100.p33.center
              span 33%
              .slice
                .bar
                .fill
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
        .col-xs-6
          .inner-content.text-center
            .c100.p62.center
              span 62%
              .slice
                .bar
                .fill
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
        .col-xs-6
          .inner-content.text-center
            .c100.p10.center
              span 10%
              .slice
                .bar
                .fill
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
        .col-xs-6
          .inner-content.text-center
            .c100.p33.center
              span 33%
              .slice
                .bar
                .fill
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
        .col-xs-6
          .inner-content.text-center
            .c100.p33.center
              span 33%
              .slice
                .bar
                .fill
  section.credit
    .title Credit
    .credit-wrap
      .available
        .text 사용가능 포인트
        .point 3230원
      .expected
        .text 적립예정 포인트
        .point 300원
      .btn-wrap
        a.btn(@click="showCharge") 충전
        a.btn(@click="showWithdraw") 출금
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      username: null
    }
  },
  created () {
    this.$http.get('/api/dashboard').then((res) => {
      this.username = res.data.decode.userId
    })
  },
  methods: {
    showCharge () {
      this.$modal.show('charge-modal');
    },
    showWithdraw() {
      this.$modal.show('withdraw-modal');
    },
    hide () {
      this.$modal.hide('chage-modal');
      this.$modal.hide('withdraw-modal');
    }
  }

}
</script>

<style scoped>
  .container {
    margin-left: 250px;
    margin-top: 60px;
    overflow: hidden;
  }
  .container > .btn-wrap {
    display: flex;
    width: 100%;
    padding: 10px 10px 20px;
  }
  .container > .btn-wrap > .btn {
    flex: 1;
    margin: 0 10px;
    padding: 20px;
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
    margin: 20px 20px 0;
    padding: 15px;
    border: 1px solid rgba(211, 215, 219, 1.0);
    border-radius: 4px;
    cursor: pointer;
  }
  .project-wrap:hover .c100{
    cursor: default;
  }
  .project-wrap:hover .c100 > span {
    width: 3.33em;
    line-height: 3.33em;
    font-size: 0.3em;
    color: #4e4e4e;
  }
  .project-wrap:hover .c100:after {
    top: 0.04em;
    left: 0.04em;
    width: 0.92em;
    height: 0.92em;
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
    margin-top: 3px;
    font-size: 14px;
  }
  .credit {
    background-color: #fff;
    padding: 15px;
    border: 1px solid rgba(211, 215, 219, 1.0);
    margin: 20px;
  }
  .credit > .title {
    font-size: 18px;
    font-weight: 600;
  }
  .credit > .credit-wrap {
    display: flex;
    flex-flow: row;
    text-align: center;
    margin-top: 20px;
  }
  .credit > .credit-wrap > .available {
    flex: 3;
    border-right: 1px solid rgba(211, 215, 219, 1.0);
  }
  .credit > .credit-wrap > .expected {
    flex: 2;
    border-right: 1px solid rgba(211, 215, 219, 1.0);
  }
  .credit > .credit-wrap > div > .text {
    font-size: 16px;
    font-weight: 600;
    color: #a7b3bf;
    margin-top: 10px;
  }
  .credit > .credit-wrap > div > .point {
    font-size: 32px;
    margin-top: 10px;
  }
  .credit > .credit-wrap > .btn-wrap {
    flex: 2;
  }
  .credit > .credit-wrap > .btn-wrap > .btn {
    width: 60%;
    margin: 5px;
    padding: 10px;
  }
  .modal-container {
    padding: 50px 20px;
    text-align: center;
    position: relative;
  }
  .modal-container > .close-btn {
    display: inline-block;
    background-image: url("../assets/close.png");
    background-position: center;
    background-size: 15px;
    background-repeat: no-repeat;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 10px; top: 10px;
  }
  .modal-container > .box {
    display: flex;
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid #eeeeee;
  }
  .modal-container > .box > .title {
    width: 100px;
    font-weight: 800;
    font-size: 12px;
  }
  .modal-container > .box > .sep {
    font-size: 12px;
    padding: 0 10px;
  }
  .modal-container > .box > .description {
    font-size: 12px;
    margin-left: auto;
  }
  .modal-container > .box > .description > input {
    border: 1px solid #eee;
    border-radius : 2px;
    text-align: right;
    width: 100px;
  }
  .modal-container > .btn {
    margin-top: 20px;
    padding: 15px 60px;
  }
  @media only screen and (max-width: 1080px) {
    .container {
      margin-left: 0;
    }
  }
</style>
