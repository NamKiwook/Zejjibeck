<template lang="pug">
  .container
    section.problem
      .sequence-wrap
        .now-sequence {{nowSequence}}
        .total-sequence / {{totalSequence}}
      .project-wrap
        .project-title 프로젝트 01

      .problem-wrap(v-if="dataType === 'Image'")
        .content
          img(src='../assets/login-img.jpg')
        .problem-title 위의 그림이 나타내는 것을 적어주세요.

      .problem-wrap(v-if="dataType === 'Text'")
        .content
          .text
            | 안녕하세요 제 이름은 박성준입니다.
            br
            | 만나서 반갑습니다.
        .problem-title 위의 글이 나타내는 것을 적어주세요.

      .problem-wrap(v-if="dataType === 'Audio'")
        .content
          audio(controls controlsList="nodownload" src="http://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.oga")
        .problem-title 위의 소리가 나타내는 것을 적어주세요.

      .refine-wrap.text(v-if="refineType === 'Text'")
        input(type="text" placeholder="정답을 입력해주세요")

      .refine-wrap.select(v-if="refineType === 'Checkbox'")
        label.inputWrap a
          input(type="checkbox", name="checkbox", value="a")
          span.mark
        label.inputWrap b
          input(type="checkbox", name="checkbox", value="b")
          span.mark
        label.inputWrap c
          input(type="checkbox", name="checkbox", value="c")
          span.mark

      .refine-wrap.select(v-if="refineType === 'Radio'")
        label.inputWrap 가
          input(type="radio", name="radio", value="가")
          span.mark
        label.inputWrap 나
          input(type="radio", name="radio", value="나")
          span.mark
        label.inputWrap 다
          input(type="radio", name="radio", value="다")
          span.mark

      .btnWrap
        .prev.btn PREV
        .next.btn.disable NEXT
    section.user-info
      .profile-wrap
        .profile-img
        .profile-title 박성준
      .rating-wrap
        .title 나의 등급
        .rating 다이아
      .credit-wrap
        .wrap
          .dot
          .title 사용가능
          .credit 2000
        .wrap
          .dot
          .title 적립예정
          .credit 100
</template>

<script>
export default {
  name: 'refine',
  data () {
    return {
      dataType: 'Audio',
      refineType: 'Checkbox',
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
    margin: 150px auto 0;
    width: 100%;
    max-width: 950px;
    overflow: hidden;
    text-align: center;
    padding: 40px 0;
  }
  .dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: #2e76b1;
    border-radius: 50%;
    margin-right: 8px;
  }
  section {
    box-shadow: 0 15px 50px 0 rgba(213,216,228,.3);
  }
  section.problem {
    display: inline-block;
    background-color: #fff;
    border-radius: 2px;
    max-width: 630px;
    width: 100%;
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
    color: #8492a6;
    padding: 10px 0;
    font-size: 14px;
    font-weight: bold;
  }
  .problem-wrap {
    background-color: #eee;
    padding: 20px;
  }
  .problem-wrap > .problem-title {
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    padding-top: 20px;
  }
  .content {
    text-align: center;
  }
  .content > img {
    width: 100%;
  }
  .content > .text {
    font-size: 24px;
    font-weight: bold;
    color: #000;
    padding: 20px 0;
    line-height: 1.6;
  }
  .content > audio {
    margin: 20px 0;
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
    padding: 20px 30px;
    border-bottom: 1px solid rgba(211, 215, 219, 1.0);
    border-radius: 2px;
    outline: none;
  }

  /* 셀렉트 */
  .refine-wrap.select > .inputWrap{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 35px;
    padding: 20px 30px;
    cursor: pointer;
    font-size: 22px;
     -webkit-user-select: none;
     -moz-user-select: none;
     -ms-user-select: none;
    user-select: none;
    font-size: 16px;
  }
  .refine-wrap.select > .inputWrap:hover {
    background-color: #eff4ff;
  }
  .refine-wrap.select > .inputWrap > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  .mark {
    background-image: url("../assets/check.png");
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: center;
    display:inline-block;
    width: 20px;
    height: 20px;
    margin-left: auto;
  }
  .inputWrap > input:checked ~ .mark {
    background-image: url("../assets/check-active.png");
  }
  .btnWrap {
    display: flex;
    padding: 10px 20px;
    justify-content: center;
  }
  .btnWrap > .btn {
    padding: 10px 40px;
    margin: 10px;
    border: 0;
    color: #fff;
  }
  .user-info {
    display: inline-block;
    width: 230px;
    background-color: #fff;
    border-radius: 2px;
    margin-left: 20px;
    vertical-align: top;
  }
  .user-info > .profile-wrap {
    border-bottom: 1px solid #eee;
    padding: 20px 0;
  }
  .user-info > .profile-wrap > .profile-img {
    display: inline-block;
    background-image: url("../assets/default-user.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: 1px solid #eee;
    border-radius: 50px;
    width: 40px;
    height: 40px;
    margin-top: 10px;
  }
  .user-info > .profile-wrap > .profile-title {
    margin-top: 10px;
    font-weight: bold;
  }
  .user-info > .rating-wrap {
    border-bottom: 1px solid #eee;
    padding: 20px;
    display: flex;
    align-items: center;
  }
  .user-info > .rating-wrap > .title {
    font-size: 12px;
    font-weight: bold;
  }
  .user-info > .rating-wrap > .rating {
    font-size: 14px;
    margin-left: auto;
  }
  .user-info > .credit-wrap {
    padding: 20px;
  }
  .user-info > .credit-wrap > .wrap {
    display: flex;
    align-items: center;
    padding: 5px 0;
  }
  .user-info > .credit-wrap > .wrap > .title {
    font-size: 12px;
    font-weight: bold;
  }
  .user-info > .credit-wrap > .wrap > .credit {
    margin-left: auto;
  }
  @media only screen and (max-width:1080px) {

  }
</style>
