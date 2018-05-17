<template lang="pug">
  div.container
    modal(name="project" height="auto" scrollable=true)
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

    section
      .menu
        .title PROJECT
        a.type(:class="{active : isTypeClicked}", @click="typeClick") TYPE
          .filter-arrow
            .down
          .dropdown-box
            a(@click="selectType('ALL')") All
            a(@click="selectType('Refine')") Refine
            a(@click="selectType('Collect')") Collect
        a.credit(@click="creditClick") CREDIT
          .filter-arrow
            .up
            .down
      .project(@click="show(project)" v-for="project in projectList")
        .title {{project.projectName}}
        .type(:class="project.projectState") {{project.projectState}}
        .credit {{project.stateCredit}}원

      .pagination
        a(@click="nextList(currentPage - 10)") &laquo;
        a(@click="nextList(n + startNavigator - 1)", v-for="n in endNavigator - startNavigator + 1", :class="{active : n + startNavigator - 1 === currentPage}") {{n + startNavigator - 1}}
        a(@click="nextList(currentPage + 10)") &raquo;
</template>
<script>
export default {
  name: 'projectList',
  data () {
    return {
      modalProject: {projectName: 'default', blockNo: 0, completedBlock: 0, projectType: 'default', stateCredit: 0, description: 'default', dataType: 'default'},
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
  created () {
    this.loadList()
  },
  methods: {
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
      this.$http.get('/api/project/list', {params: {
        page: this.currentPage,
        filter: this.filter,
        category: this.category,
        listNo: 10,
        sortedBy: this.sortedBy
      }}).then((res) => {
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
      this.$router.push({path: `/refine/${project._id}`})
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
    width: 880px;
    margin: 20px auto;
  }
  .menu {
    padding: 15px 20px;
  }
  .menu > .title {
    text-align: center;
    border-radius: 4px;
    display: inline-block;
    font-size: 14px;
    color: #a7b3bf;
  }
  .menu > .credit {
    display:flex;
    align-items: center;
    float: right;
    width: 65px;
    margin-right: 50px;
    font-size: 14px;
    color: #a7b3bf;
  }
  .menu > .type {
    display:flex;
    justify-content: center;
    align-items: center;
    float: right;
    width: 80px;
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
    box-shadow: 0 0 14px 4px rgba(0,0,0,0.05);
  }
  .project > .title {
    display: inline-block;
    line-height: 35px;
    font-weight: bold;
  }
  .project > .credit {
    width: 100px;
    line-height: 35px;
    font-size: 14px;
    text-align: right;
    float: right;
    margin-right: 50px;
  }
  .project > .type {
    background-color: #2979ff;
    color: #fff;
    line-height: 35px;
    font-size: 12px;
    text-align: center;
    width: 80px;
    border-radius: 20px;
    float: right;
    margin-right: 20px;
  }
  .project > .type.Refine {
    background-color: #5991ee;
  }
  .project > .type.Collect {
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
