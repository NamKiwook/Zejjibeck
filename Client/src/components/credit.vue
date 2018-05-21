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
          .description {{userInfo.bank}}
        .box
          .title 계좌번호
          .sep :
          .description {{userInfo.bankAccount}}
        .box
          .title 예금주
          .sep :
          .description {{userInfo.username}}
        .box
          .title 총 크레딧
          .sep :
          .description {{userInfo.usableCredit}}원
        .box
          .title 출금할 크레딧
          .sep :
          .description
            input(type="tel" v-model="amountWithdraw")
            | 원
        a.btn(@click="withdraw") 크레딧 출금
    section.credit
      .core.wrap
        p 사용가능 크레딧
        .credit {{userInfo.usableCredit}}
          span 원
      .wrap
        p 적립예정 크레딧
        .credit {{userInfo.prearrangedCredit}}
          span 원
      .wrap
        .btn(@click="showWithdraw") 출금
        .btn(@click="showCharge") 입금
    .divider
    section.list
      .wrap
        .title.plus 적립
        .content
          .date 2018. 05. 18
          p 적립 예정
        .credit + 400원
      .wrap
        .title.minus 사용
        .content
          .date 2018. 05. 18
          p 적립 예정
        .credit - 40원
</template>

<script>
export default {
  name: "credit",
  data () {
    return {
      userInfo : { usableCredit: 10000,prearrangedCredit: 1000, bank: '농협', bankAccount: '111-1111-1111-11', username: 'default'},
      amountWithdraw : 0,
      amountCharge : 0
    }
  },
  methods: {
    showCharge () {
      this.$modal.show('charge-modal')
    },
    showWithdraw () {
      this.$modal.show('withdraw-modal')
    },
    hide () {
      this.$modal.hide('charge-modal')
      this.$modal.hide('withdraw-modal')
    },
    withdraw () {
      this.$http.get('/api/credit/withdraw', {params: {
          withdrawCredit: this.amountWithdraw
        }}).then((res) => {
        if(res.data.success) {
          this.userInfo.usableCredit = res.data.credit
        } else {
          alert(res.data.errorMassage)
        }
      }).catch((err) => {
        alert(err)
      })
    },
    charge () {
      this.$http.get('/api/credit/charge', {params: {
          chargeCredit: this.amountCharge
        }}).then((res) => {
        if(res.data.success) {
          this.userInfo.usableCredit = res.data.credit
        } else {
          alert(res.data.errorMassage)
        }
      }).catch((err) => {
        alert(err)
      })
    }
  },
  created () {
    this.$http.get('/api/userInfo').then((res) => {
      this.userInfo = res.data.userInfo
    })
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
    display: flex;
  }
  section.credit {
    padding: 50px 10px 30px;
    vertical-align: top;
  }
  section.credit > .core.wrap {
    background-image: url("../assets/credit3.png");
    background-repeat: no-repeat;
    background-position: 0 center;
    background-size: 60px;
    width: 40%;
    padding-left: 75px;
    display: inline-block;
    border: 0;
    text-align: left;
  }
  section.credit > .wrap {
    width: 30%;
    height: 100px;
    display: inline-block;
    border-left: 1px solid #eee;
    text-align: center;
  }
  section.credit > .wrap > p {
    color: #a7b3bf;
    font-weight: bold;
    margin-top: 15px;
  }
  section.credit > .wrap > .credit {
    font-size: 42px;
    font-weight: bold;
  }
  section.credit > .wrap > .credit > span {
    font-size: 28px;
    font-weight: 500;
  }
  section.credit >.wrap > .btn {
    width: 60%;
    margin-top: 10px;
    padding: 10px 0;
  }
  section.list {
    flex-flow: column;
  }
  section.list > .wrap {
    display: flex;
    align-items: center;
    padding: 30px 0;
    border-bottom: 1px solid #eee;
  }
  section.list > .wrap > .title {
    font-size: 18px;
    height: 94px;
    width: 94px;
    line-height: 90px;
    text-align: center;
    border: 1px solid;
    border-radius: 50%;
  }
  section.list > .wrap >  .title.plus {
    color: #2979ff;
    border-color: #2979ff;
  }
  section.list > .wrap > .title.minus {
    color: #d95555;
    border-color: #d95555;
  }
  section.list > .wrap > .content {
    margin-left: 30px;
  }
  section.list > .wrap > .content > .date {
    font-size: 14px;
    color: #8492a6;
  }
  section.list > .wrap > .content > p {
    font-size: 18px;
    margin-top: 5px;
  }
  section.list > .wrap > .credit {
    margin-left: auto;
    width: 100px;
    text-align: right;
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
