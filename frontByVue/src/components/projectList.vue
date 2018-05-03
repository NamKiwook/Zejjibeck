<template lang="pug">
  div.container
    .title Project List
    modal(name="project" height="auto" scrollable="ture")
      .modal-container
        .title 프로젝트이름01
        .description
          | 안녕하세요
          br
          | 이 프로젝트는 테스트용 프로젝트입니다.
          br
          | 안녕하세요
          br
          | 반갑습니다
          br
          | 하하하하하
          | 안녕하세요
        .type
          .project-type Refine
          .data-type Image
        .credit 5000원
        .btn START
    section
      .menu
        .title Project Name
        .type Type
        .credit Credit
      .project(@click="show")
        .title Project1
        .type Refine
        .credit 100,000원
      .project(@click="show")
        .title Project1
        .type Refine
        .credit 200원
      .project(@click="show")
        .title Project1
        .type Refine
        .credit 200원
      .project(@click="show")
        .title Project1
        .type Refine
        .credit 200원
</template>
<script>
  export default {
    name: 'projectList',
    methods: {
      show () {
        this.$modal.show('project');
      },
      hide () {
        this.$modal.hide('project');
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
    padding: 40px 20px;
    text-align: center;
  }
  .modal-container > .title {
    font-size: 24px;
    margin-bottom: 5px;
    text-align: left;
  }
  .modal-container > .description {
    margin-bottom: 5px;
    text-align: left;
  }
  .modal-container > .btn {
    padding: 15px 60px;
  }
  .menu {
    display: flex;
    padding: 5px;
  }
  .menu > .title {
    flex: 5;
  }
  .menu > .type {
    flex: 2;
  }
  .menu > .credit {
    flex: 1;
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
    flex: 5;
  }
  .project > .type {
    flex: 2;
  }
  .project > .credit {
    flex: 1;
    min-width: 60px;
  }
  @media only screen and (max-width: 1080px) {
    .container {
      margin-left: 0;
    }
  }
</style>
