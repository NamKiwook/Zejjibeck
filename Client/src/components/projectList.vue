<template lang="pug">
  div.container
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
        .title PROJECT
        a.type.active TYPE
          .filter-arrow
            .down
          .dropdown-box
            a all
            a refine
            a collect
        a.credit CREDIT
          .filter-arrow
            .up
            .down
      .project(@click="show")
        .title 프로젝트 1234567
        .type.refine Refine
        .credit 100,000원
      .project(@click="show")
        .title Project1
        .type.collect Collect
        .credit 100,000원
      .project(@click="show")
        .title Project1
        .type.collect Collect
        .credit 100,000원
      .project(@click="show")
        .title Project1
        .type.refine Refine
        .credit 100,000원
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
  .project > .type.refine {
    background-color: #5991ee;
  }
  .project > .type.collect {
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
