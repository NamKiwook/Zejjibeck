<template lang="pug">
div.container
  modal(name="project-modal" adaptive=true width="90%" maxWidth=600 height="auto" scrollable=true)
    .modal-container
      a.close-btn(@click="hide")
      .box
        .title 과제 제목
        .sep :
        .description {{modalProject.projectName}}
      .box
        .title 과제 설명
        .sep :
        .description {{modalProject.description}}
      .box
        .title 과제 유형
        .sep :
        .description {{projectStateName(modalProject.projectState)}}
      .box
        .title 데이터 유형
        .sep :
        .description {{projectDataName(modalProject.dataType)}}
      .box
        .title 적립금
        .sep :
        .description
          | 개당 {{modalProject.stateCredit.toLocaleString()}}원
      a.btn(@click="selectProject(modalProject)") START

  modal(name="my-project-modal" adaptive="true" width="90%" maxWidth="600" height="auto" scrollable=true)
    .modal-container
      a.close-btn(@click="hide")
      .box
        .title 과제 제목
        .sep :
        .description {{modalProject.projectName}}
      .box
        .title 과제 설명
        .sep :
        .description(v-if="!isEditDescription") {{modalProject.description}}
          .edit-btn(@click="edit('Description')")
        .edit-wrap(v-else)
          textarea(:value="modalProject.description" ref="changeDescription", spellcheck='false')
          .save.btn(@click="saveEdit('Description',modalProject)") 저장
          .close.btn(@click="closeEdit('Description')") 취소
      .box
        .title 과제 유형
        .sep :
        .description {{projectTypeName(modalProject.projectType)}}
      .box
        .title 데이터 유형
        .sep :
        .description {{projectDataName(modalProject.dataType)}}
      .box
        .title 적립금
        .sep :
        .description
          | {{modalProject.totalCredit.toLocaleString()}}원
      a.download.btn(:href="dataUrl" download v-if="modalProject.projectType !== 'Refine' && modalProject.projectState === 'finished'") Collection 다운로드
      a.download.btn(:href="refineUrl" download v-if="modalProject.projectType !== 'Collect' && modalProject.projectState === 'finished'") Refine 다운로드
  section.credit-section
    .profile-wrap
      img.profile-img(:src="this.$store.getters.getUserProfile" ref="profile")
      .profile-title {{username}}
    .credit-wrap
      .wrap
        .dot.green
        .name 나의 프로젝트
      .point {{processingProjectNo + processedProjectNo}}
      .wrap
        .title 완료된 프로젝트
        .point {{processedProjectNo}}
      .divider
      .wrap
        .title 진행중인 프로젝트
        .point {{processingProjectNo}}
    .credit-wrap
      .wrap
        .dot.blue
        .name 총 크레딧
      .point {{(usableCredit+prearrangedCredit).toLocaleString()}}
      .wrap
        .title 사용 가능
        .point {{usableCredit.toLocaleString()}}
      .divider
      .wrap
        .title 적립 예정
        .point {{prearrangedCredit.toLocaleString()}}
    <!--router-link.detail(to='/credit')-->
  .divider(v-if="projectsInfoList.length !== 0")
  carousel.register-project(:perPage="perpage", scroll-per-page=true, pagination-color='#c8c8c8', :paginationPadding=5, pagination-active-color='#2979ff', :navigation-enabled="isMobile", v-if="projectsInfoList.length !== 0")
    slide(v-for="projectInfo in projectsInfoList", :key="projectInfo.projectName")
      .project-wrap(@click="showMyProject(projectInfo)", v-if="projectInfo.projectState === 'Collect' || projectInfo.projectState === 'cValidate' || (projectInfo.projectType === 'Collect' && projectInfo.projectState === 'finished')")
        .type(:class="projectStateClass(projectInfo.projectState)") {{projectStateName(projectInfo.projectState)}}
        .title {{projectInfo.projectName}}
        .problem-wrap
          .total
            .num {{projectInfo.maxCollect}}
            .text 총 수집할 파일
          .solved
            .num {{projectInfo.currentCollect}}
            .text 현재 수집된 파일
        .col-xs-6
          .inner-content.text-center
            .c100.center(:class="[[percent(projectInfo.currentCollect / projectInfo.maxCollect * 100)], projectStateClass(projectInfo.projectState)]")
              span(:class="projectStateClass(projectInfo.projectState)") {{Math.round(projectInfo.currentCollect / projectInfo.maxCollect * 100)}}%
              .slice
                .bar
                .fill
      .project-wrap(@click="showMyProject(projectInfo)" v-else)
        .type(:class="projectStateClass(projectInfo.projectState)") {{projectStateName(projectInfo.projectState)}}
        .title {{projectInfo.projectName}}
        .problem-wrap
          .total
            .num {{projectInfo.fileNo}}
            .text 총 정제할 파일
          .solved
            .num {{currentRefine(projectInfo)}}
            .text 현재 정제된 파일
        .col-xs-6
          .inner-content.text-center
            .c100.center(:class="[[percent(currentRefine(projectInfo) / projectInfo.fileNo * 100)], projectStateClass(projectInfo.projectState)]")
              span(:class="projectStateClass(projectInfo.projectState)") {{Math.round(currentRefine(projectInfo) / projectInfo.fileNo * 100)}}%
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
        .date {{parseDate(project)}}
        .title {{project.projectName}}
      .type(:class="project.projectState") {{projectStateName(project.projectState)}}
      .credit {{project.stateCredit.toLocaleString()}}원
        .text / 개당
      .progress-bar
        .gaze(:class="project.projectState") 10/300

</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      modalProject: {projectName: 'default', blockNo: 0, completedBlock: 0, projectType: 'default', credit: 0, description: 'default', dataType: 'default', stateCredit: 0, totalCredit: 0},
      perpage: 2,
      username: '',
      usableCredit: null,
      prearrangedCredit: null,
      projectNo: null,
      projectsInfoList: [],
      projectList: [],
      isEditDescription: false,
      isEditQuestion: false,
      processingProjectNo: null,
      processedProjectNo: null,
      dataUrl: '#',
      refineUrl: '#',
      isMobile: true
    }
  },
  created () {
    this.$http.get('/api/dashboard').then((res) => {
      this.username = res.data.userInfo.username
      this.usableCredit = res.data.userInfo.usableCredit
      this.prearrangedCredit = res.data.userInfo.prearrangedCredit
      this.projectNo = res.data.projectsInfoList.length
      this.projectsInfoList = res.data.projectsInfoList
      this.processedProjectNo = res.data.processedProjectNo
      this.processingProjectNo = res.data.processingProjectNo
      this.carouselPerpage()
      this.carouselIsMobile()
      this.loadList()
      this.$store.commit('userUsableCredit', res.data.userInfo.usableCredit)
      this.$store.commit('userPrearrangedCredit', res.data.userInfo.prearrangedCredit)
    })
  },
  beforeMount () {
    window.addEventListener('resize', this.carouselPerpage)
    window.addEventListener('resize', this.carouselIsMobile)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.carouselPerpage)
    window.removeEventListener('resize', this.carouselIsMobile)
  },
  methods: {
    currentRefine (project) {
      if (project.currentBlock === project.totalBlock) {
        return project.fileNo
      } else {
        return project.currentBlock * project.blockSize
      }
    },
    parseDate (project) {
      var date = new Date(project.uploadTime)
      var month = date.getMonth() + 1
      return date.getFullYear() + '. ' + month + '. ' + date.getDate()
    },
    projectDataName (dataType) {
      if (dataType === 'Image') {
        return '이미지'
      } else if (dataType === 'Audio') {
        return '오디오'
      } else {
        return '텍스트'
      }
    },
    projectStateClass (projectState) {
      if (projectState === 'rValidate') {
        return 'Refine'
      } else if (projectState === 'cValidate') {
        return 'Collect'
      }
      return projectState
    },
    projectStateName (projectState) {
      if (projectState === 'rValidate' || projectState === 'cValidate') {
        return '검증중'
      } else if (projectState === 'finished') {
        return '완료'
      } else if (projectState === 'Refine') {
        return '정제'
      } else if (projectState === 'Collect') {
        return '수집'
      }
    },
    projectTypeName (projectType) {
      if (projectType === 'Collect') {
        return '데이터 수집'
      } else if (projectType === 'Refine') {
        return '데이터 정제'
      } else {
        return '데이터 수집 & 데이터 정제'
      }
    },
    edit (str) {
      if (str === 'Description') {
        this.isEditDescription = true
      }
      if (str === 'Question') {
        this.isEditQuestion = true
      }
    },
    saveEdit (str, modalProject) {
      if (str === 'Description') {
        this.isEditDescription = false
        modalProject.description = this.$refs.changeDescription.value
        this.$http.put('/api/project', {projectName: modalProject.projectName, projectId: modalProject._id, description: modalProject.description, question: modalProject.question})
      }
      if (str === 'Question') {
        this.isEditQuestion = false
        modalProject.question = this.$refs.changeQuestion.value
        console.log(modalProject)
        this.$http.put('/api/project', {projectName: modalProject.projectName, projectId: modalProject._id, description: modalProject.description, question: modalProject.question})
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
      if (this.projectNo === 0 || window.innerWidth < 620) {
        this.perpage = 1
      } else if (window.innerWidth < 1050 && window.innerWidth > 620 && this.projectNo > 2) {
        this.perpage = 2
      } else if (this.projectNo > 3) {
        this.perpage = 3
      } else {
        this.perpage = this.projectNo
      }
    },
    carouselIsMobile () {
      if (window.innerWidth < 620) {
        this.isMobile = false
      } else {
        this.isMobile = true
      }
    },
    percent (percent) {
      return 'p' + Math.round(percent)
    },
    showMyProject (modalProject) {
      this.modalProject = modalProject
      if (modalProject.projectType !== 'Refine' && modalProject.projectState === 'finished') {
        this.$http.get('/api/project/collectedFile', {params: {projectId: modalProject._id}}).then((res) => {
          if (res.data.success) {
            this.dataUrl = res.data.url
          } else {
            alert(res.data.errorMassage)
          }
        }).catch((err) => {
          alert(err)
        })
      }
      if (modalProject.projectType !== 'Collect' && modalProject.projectState === 'finished') {
        this.$http.get('/api/project/refineResult', {params: {projectId: modalProject._id}}).then((res) => {
          if (res.data.success) {
            this.refineUrl = res.data.url
          } else {
            alert(res.data.errorMassage)
          }
        }).catch((err) => {
          alert(err)
        })
      }
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
.register-project .project-wrap:hover .c100 > span.finished {
  color: #666;
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
.pie,
.c100.finished .bar,
.c100.finished.p51 .fill,
.c100.finished.p52 .fill,
.c100.finished.p53 .fill,
.c100.finished.p54 .fill,
.c100.finished.p55 .fill,
.c100.finished.p56 .fill,
.c100.finished.p57 .fill,
.c100.finished.p58 .fill,
.c100.finished.p59 .fill,
.c100.finished.p60 .fill,
.c100.finished.p61 .fill,
.c100.finished.p62 .fill,
.c100.finished.p63 .fill,
.c100.finished.p64 .fill,
.c100.finished.p65 .fill,
.c100.finished.p66 .fill,
.c100.finished.p67 .fill,
.c100.finished.p68 .fill,
.c100.finished.p69 .fill,
.c100.finished.p70 .fill,
.c100.finished.p71 .fill,
.c100.finished.p72 .fill,
.c100.finished.p73 .fill,
.c100.finished.p74 .fill,
.c100.finished.p75 .fill,
.c100.finished.p76 .fill,
.c100.finished.p77 .fill,
.c100.finished.p78 .fill,
.c100.finished.p79 .fill,
.c100.finished.p80 .fill,
.c100.finished.p81 .fill,
.c100.finished.p82 .fill,
.c100.finished.p83 .fill,
.c100.finished.p84 .fill,
.c100.finished.p85 .fill,
.c100.finished.p86 .fill,
.c100.finished.p87 .fill,
.c100.finished.p88 .fill,
.c100.finished.p89 .fill,
.c100.finished.p90 .fill,
.c100.finished.p91 .fill,
.c100.finished.p92 .fill,
.c100.finished.p93 .fill,
.c100.finished.p94 .fill,
.c100.finished.p95 .fill,
.c100.finished.p96 .fill,
.c100.finished.p97 .fill,
.c100.finished.p98 .fill,
.c100.finished.p99 .fill,
.c100.finished.p100 .fill {
  border-color: #666;
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
.register-project .type.finished {
  background-color: #666;
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
  margin-top: 5px;
  font-size: 12px;
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
  width: 85px;
  margin-right: 40px;
  font-size: 14px;
  color: #a7b3bf;
}
.project-list > .menu > .type {
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;
  width: 60px;
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
  width: 120px;
  line-height: 20px;
  font-size: 15px;
  margin-top: 30px;
  text-align: right;
  float: right;
  margin-right: 50px;
}
.project-list > .project > .credit > .text {
  float: right;
  font-size: 10px;
  color: #bcbcbc;
  margin-left: 4px;
  margin-top: 1.5px;
}
.project-list > .project > .type {
  background-color: #2979ff;
  color: #fff;
  line-height: 35px;
  text-align: center;
  font-size: 12px;
  width: 60px;
  float: right;
  border-radius: 20px;
  margin-top: 24px;
  margin-right: 20px;
}
.project-list > .project > .type.Refine {
  background-color: #5991ee;
}
.project-list > .project > .type.Collect {
  background-color: #62ce8d;
}
.project-list > .project > .progress-bar {
  background-color: #eee;
  width: 80%;
  height: 15px;
  border-radius: 10px;
  margin-top: 8px;
  width: calc(100% - 300px);
}
.project-list > .project > .progress-bar > .gaze {
  border-radius: 10px;
  width: 80%;
  height: 100%;
  color: #fff;
  font-size: 10px;
  text-align: center;
}
.project-list > .project > .progress-bar > .gaze.Refine {
  background-color: #5991ee;
}
.project-list > .project > .progress-bar > .gaze.Collect {
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
.modal-container > .download.btn {
  padding: 10px 30px;
  margin: 20px 5px 0;
}
@media only screen and (max-width: 1000px) {
  .credit-section {
    flex-flow: column;
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
    margin-top: 15px;
  }
  .project-list > .project > .type {
    margin-top: 8px;
  }
  .project-list > .project > .progress-bar {
    margin-top: 28px;
  }
}
@media only screen and (max-width: 600px) {
  .project-list > .project > .progress-bar {
    display: none;
  }
}
</style>
