<template lang="pug">
  .container
    section
      .sequence {{nowSequence}} / {{totalSequence}}
      .imgWrap
        img(src='../assets/profileImg1.jpg')
      .problemWrap.text(v-if="dataType === 'text'")
        p.title 위의 그림이 나타내는 것을 적어주세요.
        input(type="text" placeholder="정답을 입력해주세요")
      .problemWrap.checkbox(v-if="dataType === 'checkbox'")
        p.title 위의 그림이 나타내는 것을 적어주세요.
        label.inputWrap a
          input(type="checkbox", name="checkbox", value="a")
          span.checkmark
        label.inputWrap b
          input(type="checkbox", name="checkbox", value="b")
          span.checkmark
        label.inputWrap c
          input(type="checkbox", name="checkbox", value="c")
          span.checkmark
      .problemWrap.radio(v-if="dataType === 'radio'")
        p.title 위의 그림이 나타내는 것을 적어주세요.
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
  }
}
</script>

<style scoped>
  .container {
    margin-left: 250px;
    margin-top: 60px;
    overflow: hidden;
  }
  section {
    background-color: #fff;
    border: 1px solid rgba(211, 215, 219, 1.0);
    border-radius: 4px;
    padding: 20px;
    margin: 20px;
    text-align: center;
  }
  section > .sequence {
    display: inline-block;
    color: #333333;
    padding: 10px;
    border-radius: 20px;
    float: right;
  }
  .imgWrap {
    text-align: center;
    margin-top: 45px;
  }
  .imgWrap > img {
    width: 100%;
    max-width: 350px;
  }
  .problemWrap {
    display: inline-block;
    text-align: left;
    width: 100%;
    max-width: 400px;
    margin-top: 15px;
    margin-bottom: 40px;
  }
  .problemWrap > .title {
    font-size: 18px;
    margin-bottom: 15px;
  }
  .problemWrap.text > input {
    display: inline-block;
    width: 100%;
    padding: 10px;
    border: 1px solid rgba(211, 215, 219, 1.0);
    border-radius: 2px;
  }

  /* 체크박스 */
  .problemWrap.checkbox > .inputWrap{
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
  .problemWrap.checkbox > .inputWrap > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 4px;
  }
  .inputWrap > input:checked ~ .checkmark {
    background-color: #2E76B1;
  }
  .inputWrap > .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .inputWrap > input:checked ~ .checkmark:after {
    display: block;
  }

  /* 라디오버튼 */
  .problemWrap.radio > .inputWrap{
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
  .problemWrap.radio > .inputWrap > input {
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
  }
  section > .btnWrap > .btn {
    padding: 10px 40px;
    background-color: #2E76B1;
    border: 0;
    color: #fff;
  }
  section > .btnWrap > .next {
    margin-left: auto;
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
