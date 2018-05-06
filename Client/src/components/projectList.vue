<template lang="pug">
  div.container
    .title Project List
    modal(name="project" height="auto" scrollable="ture")
      .modal-container
        a.close-btn(@click="hide")
        .box
          .title 프로젝트 이름
          .sep :
          .description 프로젝트 123
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
      .pagination
        a(href="#") &laquo;
        a.active(href="#") 1
        a(href="#") 2
        a(href="#") 3
        a(href="#") 4
        a(href="#") 5
        a(href="#") &raquo;

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
