<template lang="pug">
div.container
  .title Dash Board
  .btn-wrap
    router-link.btn(to='/list/1/recent/all') 과제풀기
    router-link.btn(to='/upload') 과제등록
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
  modal(name="project-modal" height="auto" scrollable=true)
    .modal-container
      a.close-btn(@click="hide")
      .box
        .title 프로젝트 이름
        .sep :
        input(value="프로젝트 123")
      .box
        .title 프로젝트 설명
        .sep :
        .description
          | 이 프로젝트는
          br
          | 테스트를 위한
          br
          | 프로젝트입니다
          br
          | 감사합니다
      .box
        .title 프로젝트 타입
        .sep :
        .description Refine
      .box
        .title 데이터 타입
        .sep :
        .description Image
      .box
        .title 적립금
        .sep :
        .description
          | 8000원 (프로젝트 완료시)
          br
          | 100원 (대상 초과시)
      .btn 다운로드
  carousel.project(:perPage="perpage", scroll-per-page=true, pagination-color='#fff', :paginationPadding=5, pagination-active-color='#666')
    slide(v-for="projectInfo in projectsInfoList", :key="projectInfo.projectName")
      .project-wrap
        .title {{projectInfo.projectName}}
        .sub.title {{projectInfo.projectType}}
        .problem-wrap
          .total
            .num {{projectInfo.blockNo}}
            .text Total Block
          .solved
            .num {{projectInfo.completedBlock}}
            .text Solved Block
        .col-xs-6
          .inner-content.text-center
            .c100.center(:class="percent(projectInfo.completedBlock / projectInfo.blockNo * 100)")
              span {{Math.round(projectInfo.completedBlock / projectInfo.blockNo * 100)}}%
              .slice
                .bar
                .fill
  section.credit
    .title Credit
    .credit-wrap
      .available
        .text 사용가능 포인트
        .point {{usableCredit}}원
      .expected
        .text 적립예정 포인트
        .point {{prearrangedCredit}}원
      .btn-wrap
        a.btn(@click="showCharge") 충전
        a.btn(@click="showWithdraw") 출금
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      perpage: 2,
      bank: '은행 이름',
      username: '유저 이름',
      bankAccount: '계좌번호',
      usableCredit: 1000,
      prearrangedCredit: 100,
      amountWithdraw: 0,
      chargeCredit: 0,
      projectNo: 0,
      projectsInfoList: []
    }
  },
  created () {
    this.$http.get('/api/dashboard').then((res) => {
      this.username = res.data.userInfo.username
      this.bank = res.data.userInfo.bank
      this.bankAccount = res.data.userInfo.bankAccount
      this.usableCredit = res.data.userInfo.usableCredit
      this.prearrangedCredit = res.data.userInfo.prearrangedCredit
      this.projectNo = res.data.projectsInfoList.length
      this.projectsInfoList = res.data.projectsInfoList
      if (this.projectNo === 0 || window.innerWidth < 1050) {
        this.perpage = 1
      } else if (this.projectNo > 3) {
        this.perpage = 3
      } else {
        this.perpage = this.projectNo
      }
    })
  },
  methods: {
    percent (percent) {
      return 'p' + Math.round(percent)
    },
    showCharge () {
      this.$modal.show('charge-modal')
    },
    showWithdraw () {
      this.$modal.show('withdraw-modal')
    },
    showProject () {
      this.$modal.show('project-modal')
    },
    hide () {
      this.$modal.hide('charge-modal')
      this.$modal.hide('withdraw-modal')
      this.$modal.hide('project-modal')
    },
    withdraw () {

    },
    charge () {

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
