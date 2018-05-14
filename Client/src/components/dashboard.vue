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
  modal(name="project-modal" height="auto" scrollable=true)
    .modal-container
      a.close-btn(@click="hide")
      .box
        .title 프로젝트 이름
        .sep :
        .description {{modalProject.projectName}}
      .box
        .title 프로젝트 설명
        .sep :
        .description {{modalProject.description}}
      .box
        .title 프로젝트 타입
        .sep :
        .description {{modalProject.projectType}}
      .box
        .title 데이터 타입
        .sep :
        .description {{modalProject.dataType}}
      .box
        .title 적립금
        .sep :
        .description
          | {{modalProject.credit}}원 (프로젝트 완료시)
          br
          | 100원 (대상 초과시)
      .btn 다운로드
  carousel.project(:perPage="perpage", scroll-per-page=true, pagination-color='#fff', :paginationPadding=5, pagination-active-color='#666')
    slide(v-for="projectInfo in projectsInfoList", :key="projectInfo.projectName")
      .project-wrap(@click="showProject(projectInfo)")
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
    .profile-wrap
      .profile-img
      .profile-title 박성준
      .rating 다이아
    .credit-wrap
      .wrap
        .dot.blue
        .name 총 획득 크레딧
      .point 2100
      .wrap
        .title 사용 가능
        .point 2000
      .sep
      .wrap
        .title 적립 예정
        .point 100
    .credit-wrap
      .wrap
        .dot.green
        .name 총 참여 프로젝트
      .point 10
      .wrap
        .title 완료된 프로젝트
        .point 8
      .sep
      .wrap
        .title 진행중인 프로젝트
        .point 2
  .sep
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      modalProject: {projectName: 'default', blockNo: 0, completedBlock: 0, projectType: 'default', credit: 0, description: 'default', dataType: 'default'},
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
    showProject (modalProject) {
      this.modalProject = modalProject
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
  .dot {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .dot.blue {
    background-image: linear-gradient( 135deg, #08f 10%, #6bd1ef 100%);
  }
  .dot.green {
    background-image: linear-gradient(313deg,#00a1ff,#26d06b);
  }
  .sep {
    height: 1px;
    background-color: #eee;
    margin: 5px 0;
  }
  .container {
    margin: 150px auto 0;
    overflow: hidden;
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
    width: 880px;
    display: flex;
    padding: 15px;
    margin: 20px auto;
  }
  .credit > .profile-wrap {
    display: flex;
    flex-flow: column;
    justify-content: center;
    flex: 1;
  }
  .credit > .profile-wrap > .profile-img {
    display: inline-block;
    background-image: url("../assets/default-user.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: 1px solid #eee;
    border-radius: 50px;
    width: 70px;
    height: 70px;
    margin-top: 10px;
  }
  .credit > .profile-wrap > .profile-title {
    margin-top: 15px;
    font-weight: bold;
  }
  .credit > .profile-wrap > .rating {
    margin-top: 8px;
    font-size: 14px;
  }
  .credit > .credit-wrap {
    flex: 1;
    margin: 0 50px;
  }
  .credit > .credit-wrap > .wrap {
    display: flex;
    align-items: center;
  }
  .credit > .credit-wrap > .wrap > .name {
    font-size: 18px;
    font-weight: bold;
  }
  .credit > .credit-wrap > .point {
    font-size: 40px;
    font-weight: bold;
    padding: 20px 0;
  }
  .credit > .credit-wrap > .wrap > .title {
    font-size: 14px;
  }
  .credit> .credit-wrap > .wrap > .point {
    margin-left: auto;
  }
  .credit > .btn-wrap {
    display: flex;
    flex-flow: column;
    width: 150px;
    align-items: center;
    justify-content: center;
  }
  .credit > .btn-wrap > .btn {
    width: 100%;
    margin: 10px 0;
  }
  /*.credit > .title {*/
    /*font-size: 18px;*/
    /*font-weight: 600;*/
  /*}*/
  /*.credit > .credit-wrap {*/
    /*display: flex;*/
    /*flex-flow: row;*/
    /*text-align: center;*/
    /*margin-top: 20px;*/
  /*}*/
  /*.credit > .credit-wrap > .available {*/
    /*flex: 3;*/
    /*border-right: 1px solid rgba(211, 215, 219, 1.0);*/
  /*}*/
  /*.credit > .credit-wrap > .expected {*/
    /*flex: 2;*/
    /*border-right: 1px solid rgba(211, 215, 219, 1.0);*/
  /*}*/
  /*.credit > .credit-wrap > div > .text {*/
    /*font-size: 16px;*/
    /*font-weight: 600;*/
    /*color: #a7b3bf;*/
    /*margin-top: 10px;*/
  /*}*/
  /*.credit > .credit-wrap > div > .point {*/
    /*font-size: 32px;*/
    /*margin-top: 10px;*/
  /*}*/
  /*.credit > .credit-wrap > .btn-wrap {*/
    /*flex: 2;*/
  /*}*/
  /*.credit > .credit-wrap > .btn-wrap > .btn {*/
    /*width: 60%;*/
    /*margin: 5px;*/
    /*padding: 10px;*/
  /*}*/
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
