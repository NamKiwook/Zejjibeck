<template lang="pug">
div.container
  modal(name="project-modal" adaptive=true width="90%" maxWidth=600 height="auto" scrollable=true)
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
        .description {{modalProject.projectState}}
      .box
        .title 데이터 타입
        .sep :
        .description {{modalProject.dataType}}
      .box
        .title 적립금
        .sep :
        .description
          | 개당 {{modalProject.stateCredit}}원
      a.btn(@click="selectProject(modalProject)") START

  modal(name="my-project-modal" adaptive="true" width="90%" maxWidth="600" height="auto" scrollable=true)
    .modal-container
      a.close-btn(@click="hide")
      .box
        .title 프로젝트 이름
        .sep :
        .description {{modalProject.projectName}}
      .box
        .title 프로젝트 설명
        .sep :
        .description(v-if="!isEditDescription") {{modalProject.description}}
          .edit-btn(@click="edit('Description')")
        .edit-wrap(v-else)
          textarea(:value="modalProject.description")
          .save.btn(@click="saveEdit('Description')") 저장
          .close.btn(@click="closeEdit('Description')") 취소
      .box
        .title 프로젝트 질문
        .sep :
        .description(v-if="!isEditQuestion") {{modalProject.question}}
          .edit-btn(@click="edit('Question')")
        .edit-wrap(v-else)
          textarea(:value="modalProject.question")
          .save.btn(@click="saveEdit('Question')") 저장
          .close.btn(@click="closeEdit('Question')") 취소
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
          | {{modalProject.totalCredit}}원
      .btn 다운로드
  section.credit-section
    .profile-wrap
      img.profile-img(:src="this.$store.getters.getUserProfile" ref="profile")
      .profile-title {{username}}
    .credit-wrap
      .wrap
        .dot.green
        .name 총 참여 프로젝트
      .point 10
      .wrap
        .title 완료된 프로젝트
        .point 8
      .divider
      .wrap
        .title 진행중인 프로젝트
        .point 2
    .credit-wrap
      .wrap
        .dot.blue
        .name 총 크레딧
      .point {{usableCredit+prearrangedCredit}}
      .wrap
        .title 사용 가능
        .point {{usableCredit}}
      .divider
      .wrap
        .title 적립 예정
        .point {{prearrangedCredit}}
    router-link.detail(to='/credit')
  .divider(v-if="projectsInfoList.length !== 0")
  carousel.register-project(:perPage="perpage", scroll-per-page=true, pagination-color='#c8c8c8', :paginationPadding=5, pagination-active-color='#2979ff', navigation-enabled=true, v-if="projectsInfoList.length !== 0")
    slide(v-for="projectInfo in projectsInfoList", :key="projectInfo.projectName")
      .project-wrap(@click="showMyProject(projectInfo)", v-if="projectInfo.projectState === 'Collect' || projectInfo.projectState === 'cValidate' || (projectInfo.projectType === 'Collect' && projectInfo.projectState === 'finished')")
        .type(:class="projectInfo.projectState") {{projectInfo.projectState}}
        .title {{projectInfo.projectName}}
        .problem-wrap
          .total
            .num {{projectInfo.maxCollect}}
            .text Total Collect
          .solved
            .num {{projectInfo.currentCollect}}
            .text Current Collect
        .col-xs-6
          .inner-content.text-center
            .c100.center(:class="[percent(projectInfo.currentCollect / projectInfo.maxCollect * 100), projectInfo.projectState]")
              span(:class="projectInfo.projectState") {{Math.round(projectInfo.currentCollect / projectInfo.maxCollect * 100)}}%
              .slice
                .bar
                .fill
      .project-wrap(@click="showMyProject(projectInfo)" v-else)
        .type(:class="projectInfo.projectState") {{projectInfo.projectState}}
        .title {{projectInfo.projectName}}
        .problem-wrap
          .total
            .num {{projectInfo.totalBlock}}
            .text Total Refine Block
          .solved
            .num {{projectInfo.currentBlock}}
            .text Current Refine Block
        .col-xs-6
          .inner-content.text-center
            .c100.center(:class="[percent(projectInfo.currentBlock / projectInfo.totalBlock * 100), projectInfo.projectState]")
              span(:class="projectInfo.projectState") {{Math.round(projectInfo.currentBlock / projectInfo.totalBlock * 100)}}%
              .slice
                .bar
                .fill
  .divider
  section.project-list
    .section-title 참여 가능 프로젝트
    .menu
      .title PROJECT
      .type TYPE
      .credit CREDIT
    .project(@click="showProject(project)" v-for="project in projectList")
      .title-wrap
        .date 2018.01.01
        .title {{project.projectName}}
      .type(:class="project.projectState") {{project.projectState}}
      .credit {{project.stateCredit}}원

</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      modalProject: {projectName: 'default', blockNo: 0, completedBlock: 0, projectType: 'default', credit: 0, description: 'default', dataType: 'default'},
      perpage: 2,
      username: '',
      usableCredit: null,
      prearrangedCredit: null,
      projectNo: null,
      projectsInfoList: [],
      projectList: [],
      isEditDescription: false,
      isEditQuestion: false
    }
  },
  created () {
    this.$http.get('/api/dashboard').then((res) => {
      this.username = res.data.userInfo.username
      this.usableCredit = res.data.userInfo.usableCredit
      this.prearrangedCredit = res.data.userInfo.prearrangedCredit
      this.projectNo = res.data.projectsInfoList.length
      this.projectsInfoList = res.data.projectsInfoList
      this.carouselPerpage()
      this.loadList()
    })
  },
  beforeMount () {
    window.addEventListener('resize', this.carouselPerpage)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.carouselPerpage)
  },
  methods: {
    edit (str) {
      if (str === 'Description') {
        this.isEditDescription = true
      }
      if (str === 'Question') {
        this.isEditQuestion = true
      }
    },
    saveEdit (str) {
      if (str === 'Description') {
        this.isEditDescription = false
      }
      if (str === 'Question') {
        this.isEditQuestion = false
      }
    },
    closeEdit (str) {
      if (str === 'Description') {
        this.isEditDescription = false
      }
      if (str === 'Question') {
        this.isEditQuestion = false
      }
    },
    loadList () {
      this.$http.get('/api/project/list', {params: {
        page: 1,
        filter: 'credit',
        category: 'ALL',
        listNo: 3,
        sortedBy: 'dec'
      }}).then((res) => {
        this.projectList = res.data.projectList
      }).catch((err) => {
        alert(err)
      })
    },
    carouselPerpage () {
      if (this.projectNo === 0 || window.innerWidth < 620 ) {
        this.perpage = 1
      } else if (window.innerWidth < 1050 && window.innerWidth > 620) {
        this.perpage = 2
      } else if (this.projectNo > 3) {
        this.perpage = 3
      } else {
        this.perpage = this.projectNo
      }
    },
    download (project) {
      console.log(project._id)
    },
    percent (percent) {
      return 'p' + Math.round(percent)
    },
    showMyProject (modalProject) {
      this.modalProject = modalProject
      this.$modal.show('my-project-modal')
    },
    showProject (modalProject) {
      this.modalProject = modalProject
      this.$modal.show('project-modal')
    },
    selectProject (project) {
      this.$modal.hide('project-modal')
      if (project.projectState === 'Refine') {
        this.$router.push({path: `/refine/${project._id}`})
      } else if (project.projectState === 'Collect') {
        this.$router.push({path: `/collect/${project._id}`})
      }
    },
    hide () {
      this.$modal.hide('my-project-modal')
      this.$modal.hide('project-modal')
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
.divider {
  height: 1px;
  background-color: #eee;
  margin: 5px 0;
}
.container {
  margin: 150px auto;
  overflow: hidden;
}
.container > section {
  max-width: 880px;
  width: 90%;
  margin: 20px auto;
}
.section-title {
  font-weight: bold;
  padding: 10px 0 20px;
}
.credit-section {
  display: flex;
  padding: 30px 15px 20px;
  position: relative;
}
.credit-section > .profile-wrap {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.credit-section > .profile-wrap > .profile-img {
  display: inline-block;
  border: 1px solid #eee;
  border-radius: 50%;
  width: 130px;
  height: 130px;
}
.credit-section > .profile-wrap > .profile-title {
  margin-top: 15px;
  font-weight: bold;
}
.credit-section > .profile-wrap > .rating {
  margin-top: 8px;
  font-size: 14px;
}
.credit-section > .credit-wrap {
  flex: 1;
  margin: 0 50px;
}
.credit-section > .detail {
  background-color: #fff;
  background-image: url("../assets/magnifier.png");
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.15);
  border: 1px solid rgba(0,0,0,.05);
  display: inline-block;
  position: absolute;
  top: 10px; right: 10px;
  height: 45px;
  width: 45px;
  border-radius: 50px;
  float: right;
  cursor: pointer;
}
.credit-section > .detail:hover {
  background-color: #fafafa;
}
.credit-section > .credit-wrap > .wrap {
  display: flex;
  align-items: center;
}
.credit-section > .credit-wrap > .wrap > .name {
  font-size: 18px;
  font-weight: bold;
}
.credit-section > .credit-wrap > .point {
  font-size: 40px;
  font-weight: bold;
  padding: 20px 0;
}
.credit-section > .credit-wrap > .wrap > .title {
  font-size: 14px;
}
.credit-section> .credit-wrap > .wrap > .point {
  margin-left: auto;
}
.credit-section > .btn-wrap {
  display: flex;
  flex-flow: column;
  width: 150px;
  align-items: center;
  justify-content: center;
}
.credit-section > .btn-wrap > .btn {
  width: 100%;
  margin: 10px 0;
}
.register-project {
  width: 950px;
  padding-top: 15px;
  margin: 0 auto;
}
.register-project .project-wrap {
  height: 400px;
  background-color: #fff;
  margin: 20px 20px 0;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  cursor: pointer;
}
.register-project .project-wrap:hover .c100{
  cursor: default;
}
.register-project .project-wrap:hover .c100 > span {
  width: 3.33em;
  line-height: 3.33em;
  font-size: 0.3em;
  color: #2979ff;
}
.register-project .project-wrap:hover .c100 > span.Refine {
  color: #5991ee;
}
.register-project .project-wrap:hover .c100 > span.Collect {
  color: #62ce8d;
}
.register-project .project-wrap:hover .c100:after {
  top: 0.04em;
  left: 0.04em;
  width: 0.92em;
  height: 0.92em;
}
.pie,
.c100.Collect .bar,
.c100.Collect.p51 .fill,
.c100.Collect.p52 .fill,
.c100.Collect.p53 .fill,
.c100.Collect.p54 .fill,
.c100.Collect.p55 .fill,
.c100.Collect.p56 .fill,
.c100.Collect.p57 .fill,
.c100.Collect.p58 .fill,
.c100.Collect.p59 .fill,
.c100.Collect.p60 .fill,
.c100.Collect.p61 .fill,
.c100.Collect.p62 .fill,
.c100.Collect.p63 .fill,
.c100.Collect.p64 .fill,
.c100.Collect.p65 .fill,
.c100.Collect.p66 .fill,
.c100.Collect.p67 .fill,
.c100.Collect.p68 .fill,
.c100.Collect.p69 .fill,
.c100.Collect.p70 .fill,
.c100.Collect.p71 .fill,
.c100.Collect.p72 .fill,
.c100.Collect.p73 .fill,
.c100.Collect.p74 .fill,
.c100.Collect.p75 .fill,
.c100.Collect.p76 .fill,
.c100.Collect.p77 .fill,
.c100.Collect.p78 .fill,
.c100.Collect.p79 .fill,
.c100.Collect.p80 .fill,
.c100.Collect.p81 .fill,
.c100.Collect.p82 .fill,
.c100.Collect.p83 .fill,
.c100.Collect.p84 .fill,
.c100.Collect.p85 .fill,
.c100.Collect.p86 .fill,
.c100.Collect.p87 .fill,
.c100.Collect.p88 .fill,
.c100.Collect.p89 .fill,
.c100.Collect.p90 .fill,
.c100.Collect.p91 .fill,
.c100.Collect.p92 .fill,
.c100.Collect.p93 .fill,
.c100.Collect.p94 .fill,
.c100.Collect.p95 .fill,
.c100.Collect.p96 .fill,
.c100.Collect.p97 .fill,
.c100.Collect.p98 .fill,
.c100.Collect.p99 .fill,
.c100.Collect.p100 .fill {
  border-color: #62ce8d;
}
.pie,
.c100.Refine .bar,
.c100.Refine.p51 .fill,
.c100.Refine.p52 .fill,
.c100.Refine.p53 .fill,
.c100.Refine.p54 .fill,
.c100.Refine.p55 .fill,
.c100.Refine.p56 .fill,
.c100.Refine.p57 .fill,
.c100.Refine.p58 .fill,
.c100.Refine.p59 .fill,
.c100.Refine.p60 .fill,
.c100.Refine.p61 .fill,
.c100.Refine.p62 .fill,
.c100.Refine.p63 .fill,
.c100.Refine.p64 .fill,
.c100.Refine.p65 .fill,
.c100.Refine.p66 .fill,
.c100.Refine.p67 .fill,
.c100.Refine.p68 .fill,
.c100.Refine.p69 .fill,
.c100.Refine.p70 .fill,
.c100.Refine.p71 .fill,
.c100.Refine.p72 .fill,
.c100.Refine.p73 .fill,
.c100.Refine.p74 .fill,
.c100.Refine.p75 .fill,
.c100.Refine.p76 .fill,
.c100.Refine.p77 .fill,
.c100.Refine.p78 .fill,
.c100.Refine.p79 .fill,
.c100.Refine.p80 .fill,
.c100.Refine.p81 .fill,
.c100.Refine.p82 .fill,
.c100.Refine.p83 .fill,
.c100.Refine.p84 .fill,
.c100.Refine.p85 .fill,
.c100.Refine.p86 .fill,
.c100.Refine.p87 .fill,
.c100.Refine.p88 .fill,
.c100.Refine.p89 .fill,
.c100.Refine.p90 .fill,
.c100.Refine.p91 .fill,
.c100.Refine.p92 .fill,
.c100.Refine.p93 .fill,
.c100.Refine.p94 .fill,
.c100.Refine.p95 .fill,
.c100.Refine.p96 .fill,
.c100.Refine.p97 .fill,
.c100.Refine.p98 .fill,
.c100.Refine.p99 .fill,
.c100.Refine.p100 .fill {
  border-color: #5991ee;
}
.register-project .project-wrap > .title {
  font-size: 16px;
  font-weight: 600;
  height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 10px;
}
.register-project .project-wrap > .type {
  background-color: #2979ff;
  color: #fff;
  line-height: 24px;
  font-size: 12px;
  text-align: center;
  width: 60px;
  border-radius: 20px;
  float: right;
}
.register-project .type.Refine {
  background-color: #5991ee;
}
.register-project .type.Collect {
  background-color: #62ce8d;
}
.register-project .type.finish {
  background-color: #3c4858;
}
.register-project .problem-wrap {
  display: flex;
  padding: 20px 0;
  margin: 10px 0 20px;
}
.register-project .problem-wrap > div {
  flex: 1;
  text-align: center;
}
.register-project .problem-wrap > div > .num {
  font-weight: 800;
  font-size: 20px;
}
.register-project .problem-wrap > div > .text {
  color: #a7b3bf;
  margin-top: 3px;
  font-size: 14px;
}
.project-list > .menu{
  padding: 15px 20px;
}

.project-list > .menu > .title {
  text-align: center;
  border-radius: 4px;
  display: inline-block;
  font-size: 14px;
  color: #a7b3bf;
}
.project-list > .menu > .credit {
  display: flex;
  align-items: center;
  float: right;
  width: 65px;
  margin-right: 40px;
  font-size: 14px;
  color: #a7b3bf;
}
.project-list > .menu > .type {
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;
  width: 80px;
  position: relative;
  margin-right: 20px;
  font-size: 14px;
  color: #a7b3bf;
}
.project-list > .project{
  background-color: #fff;
  padding: 18px 20px;
  border-radius: 2px;
  margin: 3px 0;
  transition: all 0.3s;
}
.project-list > .project:hover {
  box-shadow: 0 0 14px 4px rgba(0,0,0,0.05);
}
.project-list > .project > .title-wrap {
  display:inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: calc(100% - 300px);
}
.project-list > .project > .title-wrap > .date {
  font-size: 11px;
  color: #8492a6;
  margin-bottom: 5px;
}
.project-list > .project > .title-wrap > .title {
  display: inline-block;
  font-weight: bold;
}
.project-list > .project > .credit {
  width: 100px;
  line-height: 40px;
  font-size: 14px;
  text-align: right;
  float: right;
  margin-right: 50px;
}
.project-list > .project > .type {
  background-color: #2979ff;
  color: #fff;
  line-height: 35px;
  text-align: center;
  font-size: 12px;
  width: 80px;
  float: right;
  border-radius: 20px;
  margin-top: 5px;
  margin-right: 20px;
}
.project-list > .project > .type.Refine {
  background-color: #5991ee;
}
.project-list > .project > .type.Collect {
  background-color: #62ce8d;
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
  width: calc(100% - 130px);
}
.modal-container > .box > .description > input {
  border: 1px solid #eee;
  border-radius : 2px;
  text-align: right;
  width: 100px;
}
.modal-container > .box > .description > .edit-btn {
  display: none;
  width: 16px;
  height: 16px;
  background-image: url("../assets/edit.png");
  background-size: 12px;
  background-position: center;
  background-repeat: no-repeat;
  float: right;
  cursor: pointer;
  border-radius: 4px;
}
.modal-container > .box:hover > .description > .edit-btn {
  display: inline-block;
}
.modal-container > .box > .description > .edit-btn:hover {
  background-image: url("../assets/edit-active.png");
}
.modal-container > .box > .edit-wrap {
  width: calc(100% - 130px);
}
.modal-container > .box > .edit-wrap > textarea {
  width: 100%;
  resize: none;
  background-color: #eee;
  outline: none;
  border-radius: 4px;
  padding: 10px;
}
.modal-container > .box > .edit-wrap > .btn {
  font-size: 12px;
  padding: 5px 10px;
  margin: 5px 0 5px 5px;
  float: right;
}
.modal-container > .btn {
  margin-top: 20px;
  padding: 15px 60px;
}
@media only screen and (max-width: 1000px) {
  .credit-section {
    flex-flow: column-reverse;
    padding: 0 10px;
  }
  .credit-section > .profile-wrap {
    display: none;
  }
  .credit-section > .credit-wrap {
    margin: 30px;
  }
  .project-list > .menu > .credit {
    margin-right: 20px;
  }
  .project-list > .project {
    height: 120px;
  }
  .project-list > .project > .title-wrap {
    display: block;
    margin-bottom: 10px;
    width: 100%;
  }
  .project-list > .project > .credit {
    margin-right: 30px;
  }
}
</style>
