<template lang="pug">
  div.container
    modal(name="charge-modal" width="450" height="auto" scrollable=true)
      .modal-container
        a.close-btn(@click="hide")
        .box
          .title 충전할 크레딧
          .sep :
          .description
            input(type="tel" v-model="chargeCredit")
            | 원
        a.btn(@click="charge") 크레딧 충전
    modal(name="withdraw-modal" width="450" height="auto" scrollable=true)
      .modal-container
        a.close-btn(@click="hide")
        .box
          .title 은행명
          .sep :
          .description {{bank}}
        .box
          .title 계좌번호
          .sep :
          .description {{bankAccount}}
        .box
          .title 예금주
          .sep :
          .description {{username}}
        .box
          .title 총 크레딧
          .sep :
          .description {{usableCredit}}원
        .box
          .title 출금할 크레딧
          .sep :
          .description
            input(type="tel" v-model="amountWithdraw")
            | 원
        a.btn(@click="withdraw") 크레딧 출금
    section
      .btn(@click="showCharge") 입금하기
    .divider
    section
      .btn(@click="showWithdraw") 출금하기
</template>

<script>
  export default {
    name: "credit",
    methods: {
      showCharge () {
        this.$modal.show('charge-modal')
      },
      showWithdraw () {
        this.$modal.show('withdraw-modal')
      },
      hide() {
        this.$modal.hide('charge-modal')
        this.$modal.hide('withdraw-modal')
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 150px;
    overflow: hidden;
  }
  .divider {
    background-color: #eee;
    height:1px;
    margin: 5px 0;
  }
  section {
    width: 880px;
    margin: 0 auto;
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
</style>
