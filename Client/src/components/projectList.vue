<template lang="pug">
  div.container#listTop
    modal(name="project" adaptive="true" width="90%" maxWidth="600" height="auto" scrollable=true)
      .modal-container
        a.close-btn(@click="hide")
        .project-name {{modalProject.projectName}}
          p 진행상황
          .progress-bar
            .gaze 30 / 100
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
    section
      .menu
        a.title(@click="dateClick") PROJECT
          .filter-arrow
            .up
            .down
        a.type(:class="{active : isTypeClicked}", @click="typeClick") TYPE
          .filter-arrow
            .down
          .dropdown-box
            a(@click="selectType('ALL')") 모두
            a(@click="selectType('Refine')") 정제
            a(@click="selectType('Collect')") 수집
        a.credit(@click="creditClick") CREDIT
          .filter-arrow
            .up
            .down
      .project(@click="show(project)" v-for="project in projectList")
        .title-wrap
          .date {{parseDate(project)}}
          .title {{project.projectName}}
        .type(:class="project.projectState") {{projectStateName(project.projectState)}}
        .credit {{project.stateCredit.toLocaleString()}}원
          .text / 개당
        .progress-bar
          .gaze(:class="project.projectState") 10/300

      .pagination
        a(@click="nextList(currentPage - 10)",  v-scroll-to="'#listTop'") &laquo;
        a(@click="nextList(n + startNavigator - 1)",  v-scroll-to="'#listTop'", v-for="n in endNavigator - startNavigator + 1", :class="{active : n + startNavigator - 1 === currentPage}") {{n + startNavigator - 1}}
        a(@click="nextList(currentPage + 10)",  v-scroll-to="'#listTop'") &raquo;
</template>
<script>
export default {
  name: 'projectList',
  data () {
    return {
      modalProject: {
        projectName: 'default',
        blockNo: 0,
        completedBlock: 0,
        projectType: 'default',
        stateCredit: 0,
        description: 'default',
        dataType: 'default'
      },
      projectList: [],
      currentPage: 1,
      totalPage: 1,
      filter: 'recent',
      category: 'ALL',
      startNavigator: 1,
      endNavigator: 1,
      isTypeClicked: false,
      sortedBy: 'dec'
    }
  },
  watch: {
    $route () {
      this.loadList()
    },
    category () {
      this.$router.push({path: `/list/${this.currentPage}/${this.filter}/${this.category}/${this.sortedBy}`})
    },
    filter () {
      this.$router.push({path: `/list/${this.currentPage}/${this.filter}/${this.category}/${this.sortedBy}`})
    },
    currentPage () {
      this.$router.push({path: `/list/${this.currentPage}/${this.filter}/${this.category}/${this.sortedBy}`})
    },
    sortedBy () {
      this.$router.push({path: `/list/${this.currentPage}/${this.filter}/${this.category}/${this.sortedBy}`})
    }
  },
  async created () {
    await this.loadList()
  },
  methods: {
    projectDataName (dataType) {
      if (dataType === 'Image') {
        return '이미지'
      } else if (dataType === 'Audio') {
        return '오디오'
      } else {
        return '텍스트'
      }
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
      return projectState
    },
    parseDate (project) {
      var date = new Date(project.uploadTime)
      var month = date.getMonth() + 1
      return date.getFullYear() + '. ' + month + '. ' + date.getDate()
    },
    dateClick () {
      if (this.filter === 'recent') {
        if (this.sortedBy === 'dec') {
          this.sortedBy = 'inc'
        } else {
          this.sortedBy = 'dec'
        }
      } else {
        this.filter = 'recent'
        this.sortedBy = 'dec'
      }
    },
    creditClick () {
      if (this.filter === 'credit') {
        if (this.sortedBy === 'dec') {
          this.sortedBy = 'inc'
        } else {
          this.sortedBy = 'dec'
        }
      } else {
        this.filter = 'credit'
        this.sortedBy = 'dec'
      }
    },
    selectType (category) {
      this.category = category
    },
    typeClick () {
      this.isTypeClicked = !this.isTypeClicked
    },
    loadList () {
      if (this.$route.params.sortedBy) {
        this.sortedBy = this.$route.params.sortedBy
      }
      if (this.$route.params.page) {
        this.currentPage = Number.parseInt(this.$route.params.page)
      }
      if (this.$route.params.filter) {
        this.filter = this.$route.params.filter
      }
      if (this.$route.params.category) {
        this.category = this.$route.params.category
      }
      this.$http.get('/api/project/list', {
        params: {
          page: this.currentPage,
          filter: this.filter,
          category: this.category,
          listNo: 10,
          sortedBy: this.sortedBy
        }
      }).then((res) => {
        this.projectList = res.data.projectList
        this.totalPage = res.data.totalPage

        if (this.currentPage - 4 > 0) {
          this.startNavigator = this.currentPage - 4
        } else {
          this.startNavigator = 1
        }
        if (this.currentPage + 4 < this.totalPage) {
          this.endNavigator = this.currentPage + 4
        } else {
          this.endNavigator = this.totalPage
        }
      }).catch((err) => {
        alert(err)
      })
    },
    nextList (page) {
      if (page > this.totalPage) {
        page = this.totalPage
      }
      if (page <= 0) {
        page = 1
      }
      this.currentPage = page
    },
    show (project) {
      this.modalProject = project
      this.$modal.show('project')
    },
    hide () {
      this.$modal.hide('project')
    },
    selectProject (project) {
      this.$modal.hide('project')
      if (project.projectState === 'Refine') {
        this.$router.push({path: `/refine/${project._id}`})
      } else if (project.projectState === 'Collect') {
        this.$router.push({path: `/collect/${project._id}`})
      }
    }
  }
}
</script>
<style scoped>
  .filter-arrow {
    margin-left: 5px;
    margin-top: 2px;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }

  .filter-arrow > .up {
    background-image: url("../assets/up-arrow.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 6px;
    height: 6px;
  }

  .filter-arrow > .down {
    background-image: url("../assets/down-arrow.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 6px;
    height: 6px;
  }

  .container {
    margin-top: 150px;
    overflow: hidden;
  }

  .container > .title {
    display: inline-block;
    width: 100%;
    font-weight: 800;
    font-size: 32px;
    padding: 10px;
    margin: 10px;
  }

  .container > section {
    max-width: 880px;
    width: 90%;
    margin: 20px auto;
  }

  .menu {
    padding: 20px;
    height: 50px;
  }

  .menu > .title {
    text-align: center;
    border-radius: 4px;
    display: flex;
    float: left;
    font-size: 14px;
    color: #a7b3bf;
  }

  .menu > .credit {
    display: flex;
    align-items: center;
    float: right;
    width: 85px;
    margin-right: 40px;
    font-size: 14px;
    color: #a7b3bf;
  }

  .menu > .type {
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

  .menu > .type > .dropdown-box {
    display: none;
    flex-flow: column;
    position: absolute;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #eee;
    top: 20px;
  }

  .menu > .type.active > .dropdown-box {
    display: flex;
  }

  .menu > .type > .dropdown-box > a {
    padding: 5px 10px;
  }

  .menu > .type > .dropdown-box > a:hover {
    background-color: #eee;
  }

  .menu > .type > .dropdown {
    color: #a7b3bf;
    font-size: 12px;
    margin-left: auto;
  }

  .project {
    background-color: #fff;
    padding: 18px 20px;
    border-radius: 2px;
    margin: 3px 0;
    transition: all 0.3s;
  }

  .project:hover {
    box-shadow: 0 0 14px 4px rgba(0, 0, 0, 0.05);
  }

  .project > .title-wrap {
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: calc(100% - 300px);
  }

  .project > .title-wrap > .date {
    font-size: 11px;
    color: #8492a6;
    margin-bottom: 5px;
  }

  .project > .title-wrap > .title {
    display: inline-block;
    font-weight: bold;
  }

  .project > .credit {
    width: 120px;
    line-height: 20px;
    font-size: 15px;
    margin-top: 30px;
    text-align: right;
    float: right;
    margin-right: 50px;
  }
  .project > .credit > .text {
    float: right;
    font-size: 10px;
    color: #bcbcbc;
    margin-left: 4px;
    margin-top: 1.5px;
  }

  .project > .type {
    background-color: #2979ff;
    color: #fff;
    line-height: 35px;
    font-size: 12px;
    text-align: center;
    width: 60px;
    float: right;
    border-radius: 20px;
    margin-top: 24px;
    margin-right: 20px;
  }

  .project > .type.Refine {
    background-color: #5991ee;
  }

  .project > .type.Collect {
    background-color: #62ce8d;
  }

  .project > .progress-bar {
    background-color: #eee;
    width: 80%;
    height: 15px;
    border-radius: 10px;
    margin-top: 8px;
    width: calc(100% - 300px);
  }
  .project > .progress-bar > .gaze {
    border-radius: 10px;
    width: 80%;
    height: 100%;
    color: #fff;
    font-size: 10px;
    text-align: center;
  }
  .project > .progress-bar > .gaze.Refine {
    background-color: #5991ee;
  }
  .project > .progress-bar > .gaze.Collect {
    background-color: #62ce8d;
  }

  .pagination {
    text-align: center;
    padding: 10px 0;
  }

  .pagination > a {
    display: inline-block;
    border-radius: 50%;
    padding: 8px 15px;
    text-decoration: none;
  }

  .pagination a.active {
    background-color: #4e4e4e;
    color: white;
  }

  .modal-container {
    text-align: center;
    position: relative;
  }
  .modal-container > .project-name {
    font-size: 32px;
    text-align: left;
    display: block;
    padding: 40px 20px 20px;
    font-weight: bold;
    background-color: #448aff;
    color: #fff;
    margin-bottom: 10px;
  }
  .modal-container > .project-name > p {
    color: #fff;
    text-align: right;
    font-size: 12px;
    margin-top: 12px;
    padding-right: 5px;
  }
  .modal-container > .project-name > .progress-bar {
    background-color: #eee;
    width: 80%;
    height: 25px;
    border-radius: 20px;
    margin-top: 8px;
    width: 100%;
  }
  .modal-container > .project-name > .progress-bar > .gaze {
    background-color: #21dc6d;
    color: #fff;
    height: 100%;
    width: 40%;
    font-size: 14px;
    border-radius: 20px;
    text-align: center;
    line-height: 25px;
  }

  .modal-container > .close-btn {
    display: inline-block;
    background-image: url("../assets/close-gray.png");
    background-position: center;
    background-size: 15px;
    background-repeat: no-repeat;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .modal-container > .box {
    display: flex;
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid #eeeeee;
    margin: 0 15px;
  }

  .modal-container > .box > .title {
    width: 100px;
    font-weight: 800;
    font-size: 13px;
  }

  .modal-container > .box > .sep {
    font-size: 13px;
    padding: 0 10px;
  }

  .modal-container > .box > .description {
    font-size: 13px;
    width: calc(100% - 130px);
  }

  .modal-container > .btn {
    margin-top: 20px;
    padding: 15px 60px;
    margin-bottom: 30px;
  }

  @media only screen and (max-width: 1080px) {
    .container {
      margin-left: 0;
    }

    .menu > .credit {
      margin-right: 20px;
    }

    .project {
      height: 120px;
    }

    .project > .title-wrap {
      display: block;
      margin-bottom: 10px;
      width: 100%;
    }

    .project > .credit {
      margin-right: 30px;
      margin-top: 15px;
    }
    .project > .type {
      margin-top: 8px;
    }

    .project > .progress-bar {
      margin-top: 28px;
    }
  }
  @media only screen and (max-width: 600px) {
    .project > .progress-bar {
      display: none;
    }
  }
</style>
