<template lang="pug">
  div.container
    modal(name="charge-modal" adaptive=true width="90%" maxWidth=450 height="auto" scrollable=true)
      .modal-container
        a.close-btn(@click="hide")
        .box
          .title 충전할 크레딧
          .sep :
          .description
            input(type="text" v-model="amountCharge" placeholder=0)
            | 원
        a.btn(@click="charge") 크레딧 충전
    modal(name="withdraw-modal" adaptive=true width="90%" maxWidth=450 height="auto" scrollable=true)
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
          .description {{userInfo.usableCredit.toLocaleString()}}원
        .box
          .title 출금할 크레딧
          .sep :
          .description
            input(type="text" v-model="amountWithdraw" placeholder=0)
            | 원
        a.btn(@click="withdraw") 크레딧 출금
    section.credit
      .credit-wrap
        .wrap
          .name 총 크레딧
        .point {{(userInfo.prearrangedCredit + userInfo.usableCredit).toLocaleString()}}
          .btn(@click="showWithdraw") 출금
          .btn(@click="showCharge") 충전
        .wrap
          .title 사용 가능
          .point {{userInfo.usableCredit.toLocaleString()}}
        .divider
        .wrap
          .title 적립 예정
          .point {{userInfo.prearrangedCredit.toLocaleString()}}
      .core.wrap
        p 사용 가능 크레딧
        .credit {{userInfo.usableCredit.toLocaleString()}}
          span 원
      .wrap
        p 적립 예정 크레딧
        .credit {{userInfo.prearrangedCredit.toLocaleString()}}
          span 원
      .wrap
        .btn(@click="showCharge") 충전
        .btn(@click="showWithdraw") 출금
    .divider
    section.list
      .wrap(v-for="log in logList")
        .title(:class="titleClass(log)") {{log.type}}
        .content
          .date {{log.date}}
          p {{log.note}}
        .credit {{symbol(log) + log.credit.toLocaleString()}}
      a.more.btn(@click="addList" v-if="isAddList") + 더보기
</template>

<script>
export default {
  name: 'credit',
  data () {
    return {
      userInfo: {usableCredit: null, prearrangedCredit: null, bank: '', bankAccount: '', username: ''},
      amountWithdraw: null,
      amountCharge: null,
      logList: null,
      index: 0,
      isAddList: true
    }
  },
  methods: {
    titleClass (log) {
      if (log.type === '충전' || log.type === '적립') {
        return 'plus'
      } else {
        return 'minus'
      }
    },
    symbol (log) {
      if (log.type === '충전' || log.type === '적립') {
        return '+'
      } else {
        return '-'
      }
    },
    showCharge () {
      this.amountCharge = null
      this.$modal.show('charge-modal')
    },
    showWithdraw () {
      this.amountWithdraw = null
      this.$modal.show('withdraw-modal')
    },
    hide () {
      this.$modal.hide('charge-modal')
      this.$modal.hide('withdraw-modal')
    },
    withdraw () {
      this.$http.get('/api/credit/withdraw', {params: {
        withdrawCredit: parseInt(this.amountWithdraw)
      }}).then((res) => {
        if (res.data.success) {
          this.userInfo.usableCredit = res.data.credit
          this.index = 0
          this.isAddList = true
          this.$http.get('/api/credit/list', {params: {index: this.index}}).then((res) => {
            this.logList = res.data.logList
          })
        } else {
          alert(res.data.errorMessage)
        }
      }).catch((err) => {
        alert(err)
      })
      this.$modal.hide('withdraw-modal')
    },
    charge () {
      this.$http.get('/api/credit/charge', {params: {
        chargeCredit: parseInt(this.amountCharge)
      }}).then((res) => {
        if (res.data.success) {
          this.userInfo.usableCredit = res.data.credit
          this.index = 0
          this.isAddList = true
          this.$http.get('/api/credit/list', {params: {index: this.index}}).then((res) => {
            this.logList = res.data.logList
          })
        } else {
          alert(res.data.errorMessage)
        }
      }).catch((err) => {
        alert(err)
      })
      this.$modal.hide('charge-modal')
    },
    addList () {
      this.index++
      this.$http.get('/api/credit/list', {params: {index: this.index}}).then((res) => {
        if (res.data.logList.length === 0) {
          this.isAddList = false
        }
        for (var i = 0; i < res.data.logList.length; i++) {
          this.logList.push(res.data.logList[i])
        }
      })
    }
  },
  created () {
    this.$http.get('/api/userInfo').then((res) => {
      this.userInfo = res.data.userInfo
    })
    this.$http.get('/api/credit/list', {params: {index: this.index}}).then((res) => {
      this.logList = res.data.logList
    })
  },
  destroyed () {
    this.store.commit('userUsableCredit', this.userInfo.usableCredit)
    this.store.commit('userPrearrangedCredit', this.userInfo.prearrangedCredit)
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
    max-width: 880px;
    margin: 0 auto;
    width: 90%;
    display: flex;
  }
  section.credit {
    padding: 50px 10px 30px;
    vertical-align: top;
  }
  section.credit > .credit-wrap {
    flex: 1;
    display: none;
  }
  section.credit > .credit-wrap > .wrap {
    display: flex;
    align-items: center;
  }
  section.credit > .credit-wrap > .wrap > .name {
    font-size: 18px;
    font-weight: bold;
  }
  section.credit > .credit-wrap > .point {
    font-size: 40px;
    font-weight: bold;
    padding: 20px 0;
  }
  section.credit > .credit-wrap > .point > .btn {
    float: right;
    margin: 8px 0 0 8px;
    border-radius: 30px;
    padding: 10px 20px;
  }
  section.credit > .credit-wrap > .wrap > .title {
    font-size: 14px;
  }
  section.credit > .credit-wrap > .wrap > .point {
    margin-left: auto;
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
    padding-bottom: 100px;
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
  section.list > .more.btn {
    margin-top: 20px;
    border-radius: 40px;
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
  @media only screen and (max-width:800px) {
    section.credit > .credit-wrap {
      display: inline-block;
    }
    section.credit > .core.wrap {
      display: none;
    }
    section.credit > .wrap {
      display: none;
    }
  }
</style>
