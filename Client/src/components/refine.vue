<template lang="pug">
  .container
    section
      .sequence-wrap
        .now-sequence {{nowSequence}}
        .total-sequence / {{totalSequence}}
      .project-wrap
        .project-title 프로젝트 01
      .problem-wrap
        .img-wrap
          img(src='../assets/profileImg1.jpg')
        .problem-title 위의 그림이 나타내는 것을 적어주세요.
      .refine-wrap.text(v-if="dataType === 'text'")
        input(type="text" placeholder="정답을 입력해주세요")
      .refine-wrap.checkbox(v-if="dataType === 'checkbox'")
        label.inputWrap a
          input(type="checkbox", name="checkbox", value="a")
          span.checkmark
        label.inputWrap b
          input(type="checkbox", name="checkbox", value="b")
          span.checkmark
        label.inputWrap c
          input(type="checkbox", name="checkbox", value="c")
          span.checkmark
      .refine-wrap.radio(v-if="dataType === 'radio'")
        label.inputWrap 가
          input(type="radio", name="radio", value="가")
          span.radiomark
        label.inputWrap 나
          input(type="radio", name="radio", value="나")
          span.radiomark
        label.inputWrap 다
          input(type="radio", name="radio", value="다")
          span.radiomark
      .btnWrap
        .prev.btn PREV
        .next.btn NEXT
</template>

<script>
export default {
  name: 'refine',
  data () {
    return {
      dataType: 'checkbox',
      totalSequence: 20,
      nowSequence: 1
    }
  },
  created () {
    console.log(this.$route.params.projectId)
  }
}
</script>

<style scoped>
  .container {
    width: 1170px;
    margin: 150px auto 0;
    overflow: hidden;
    text-align: center;
  }
  section {
    background-color: #fff;
    border-radius: 2px;
    margin: 40px auto;
    max-width: 500px;
    text-align: center;
  }
  .sequence-wrap {
    display: flex;
    position: fixed;
    bottom: 30px; right: 50px;
  }
  .sequence-wrap > .now-sequence {
    font-size: 30px;
    font-weight: 900;
    margin-right: 10px;
  }
  .sequence-wrap > .total-sequence {
    font-size: 30px;
    font-weight: 900;
    color: #a7b3bf;
  }
  .project-wrap {
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  .project-wrap > .project-title {
    color: #2979ff;
    padding: 10px 0;
    font-size: 14px;
    font-weight: bold;
  }
  .problem-wrap {
    background-color: #f5f5f5;
    padding: 20px;
  }
  .problem-wrap > .problem-title {
    font-size: 16px;
    text-align: left;
    padding-top: 20px;
  }
  .img-wrap {
    text-align: center;
  }
  .img-wrap > img {
    width: 100%;
  }
  .refine-wrap {
    display: inline-block;
    text-align: left;
    width: 100%;
  }
  .refine-wrap > .title {
    font-size: 18px;
    margin-bottom: 15px;
  }
  .refine-wrap.text > input {
    display: inline-block;
    width: 100%;
    padding: 10px;
    border: 1px solid rgba(211, 215, 219, 1.0);
    border-radius: 2px;
  }

  /* 체크박스 */
  .refine-wrap.checkbox > .inputWrap{
    display: block;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 35px;
    padding: 20px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .refine-wrap.checkbox > .inputWrap:hover {
    background-color: #a7b3bf;
  }
  .refine-wrap.checkbox > .inputWrap > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  .checkmark {
    /*position: absolute;*/
    /*left: 45px;*/
    /*height: 25px;*/
    /*width: 25px;*/
    /*background-color: #eee;*/
    /*border-radius: 4px;*/
    background-image: url("../assets/check.png");
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: center;
    display:inline-block;
    width: 20px;
    height: 20px;
  }
  .inputWrap > input:checked ~ .checkmark {
    background-image: url("../assets/check-active.png");
  }

  /* 라디오버튼 */
  .refine-wrap.radio > .inputWrap{
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .refine-wrap.radio > .inputWrap > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  .radiomark {
    position: absolute;;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 50%;
  }
  .inputWrap > input:checked ~ .radiomark {
    background-color: #2E76B1;
  }
  .inputWrap > .radiomark:after {
    content: "";
    position: absolute;
    display: none;
    width: 8px;
    height: 8px;
    top: 9px;
    left: 9px;
    border-radius: 50%;
    background-color: #fff;
  }
  .inputWrap > input:checked ~ .radiomark:after {
    display: block;
  }

  section > .btnWrap {
    display: flex;
    padding: 0 20px;
    justify-content: center;
  }
  section > .btnWrap > .btn {
    padding: 10px 40px;
    margin: 10px;
    border: 0;
    color: #fff;
    background-color: #2979ff;
  }
  section > .btnWrap > .next {
  }

  @media only screen and (max-width:1080px) {
    .container {
      margin-left: 0;
    }
    section > .btnWrap {
      padding: 0;
    }
  }
</style>
