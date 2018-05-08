<template lang="pug">
  div.container
    .title Project List
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
        a.btn(@click="selectProject(modalProject)") START
    section
      .menu
        .title Project Name
        .type Type
        .credit Credit
      .project(@click="show(project)" v-for="project in projectList")
        .title {{project.projectName}}
        .type {{project.projectType}}
        .credit {{project.credit}}원
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
      modalProject: {projectName: 'default', blockNo: 0, completedBlock: 0, projectType: 'default', credit: 0, description: 'default', dataType: 'default'},
      projectList: [],
      currentPage: 1,
      totalPage: 1,
      filter: 'recent',
      category: 'all',
      startNavigator: 1,
      endNavigator: 1
    }
  },
  watch: {
    $route () {
      this.loadList()
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    loadList () {
      this.currentPage = Number.parseInt(this.$route.params.page)
      this.filter = this.$route.params.filter
      this.category = this.$route.params.category
      this.$http.get('/api/project/list', {params: {
        page: this.currentPage,
        filter: this.filter,
        category: this.category,
        listNumber: 10
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
      this.$router.push({path: `/list/${page}/${this.filter}/${this.category}`})
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
  .container {
    margin-left: 250px;
    margin-top: 60px;
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
    background-color: #fff;
    border: 1px solid rgba(211, 215, 219, 1.0);
    border-radius: 4px;
    padding: 20px;
    margin: 20px;
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
  .menu {
    display: flex;
    padding: 10px 0;
  }
  .menu > .title {

  }
  .menu > .type {
    margin-left: auto;
    width: 120px;
  }
  .menu > .credit {
    width: 120px;
  }
  .project {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
  }
  .project:hover {
    background-color: #eee;
  }
  .project > .title {

  }
  .project > .type {
    margin-left: auto;
    width: 120px;
  }
  .project > .credit {
    width: 120px;
  }
  .pagination {
    text-align: center;
    padding: 10px 0;
  }
  .pagination > a {
    display: inline-block;
    border-radius: 8px;
    padding: 8px 16px;
    text-decoration: none;
  }
  .pagination a.active {
    background-color: #4e4e4e;
    color: white;
  }
  .pagination a:hover:not(.active) {
    background-color: #ddd;
  }
  @media only screen and (max-width: 1080px) {
    .container {
      margin-left: 0;
    }
  }
</style>
