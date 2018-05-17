<template lang="pug">
  .container#problemTop
    section.problem
      .sequence-wrap
        .now-sequence {{nowSequence}}
        .total-sequence / {{projectInfo.blockSize}}
      .project-wrap
        .project-title {{projectInfo.projectName}}

      .problem-wrap(v-if="projectInfo.dataType === 'Image'")
        .content
          img(:src="urlSrc")
        .problem-title {{projectInfo.question}}

      .problem-wrap(v-if="projectInfo.dataType === 'Text'")
        .content
          .text
            | 안녕하세요 제 이름은 박성준입니다.
            br
            | 만나서 반갑습니다.
        .problem-title {{projectInfo.question}}

      .problem-wrap(v-if="projectInfo.dataType === 'Audio'")
        .content
          audio(controls controlsList="nodownload" src=urlSrc)
        .problem-title {{projectInfo.question}}

      .refine-wrap.text(v-if="projectInfo.refineType === 'Text'")
        input(type="text" placeholder="정답을 입력해주세요" v-model="refineList[nowSequence-1]")

      .refine-wrap.select(v-if="projectInfo.refineType === 'Checkbox'")
        label.inputWrap(v-for="tag in projectInfo.refineList") {{tag}}
          input(type="checkbox", name="checkbox", :value="tag" v-model="refineList[nowSequence-1]")
          span.mark

      .refine-wrap.select(v-if="projectInfo.refineType === 'Radio'")
        label.inputWrap(v-for="tag in projectInfo.refineList") {{tag}}
          input(type="radio", name="radio", :value="tag" v-model="refineList[nowSequence-1]")
          span.mark

      .btnWrap
        .prev.btn(@click="goToPrev()",  v-scroll-to="'#problemTop'") PREV
        .next.btn(@click="goToNext()",  v-scroll-to="'#problemTop'") NEXT

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
      projectInfo: {blockSize: 20, projectName: 'default', dataType: 'Image', question: 'default',refineType: 'Checkbox'},
      nowSequence: 1,
      urlList: [],
      blockId: null,
      urlSrc: null,
      refineList: []
    }
  },
   created() {
      console.log(this.projectInfo)
     this.$http.get('/api/refine', {params: {projectId: this.$route.params.projectId}}).then((res) => {
       console.log(res.data)
       this.projectInfo = res.data.projectInfo
       this.urlList = res.data.urlList
       this.blockId = res.data.blockId
       this.urlSrc = this.urlList[0]
     }).catch((err) => {
       alert(err)
     })
   },
  watch: {
    nowSequence () {
      this.urlSrc = this.urlList[this.nowSequence -1]
    }
  },
  methods: {
    isNull () {
      if (this.refineList[this.nowSequence - 1] === null) {
        return true
      }
      return false
    },
    goToPrev () {
      if (this.nowSequence > 1) {
        this.nowSequence--
      }
    },
    goToNext () {
      if (this.nowSequence < this.projectInfo.blockSize) {
        this.nowSequence++
      } else if (this.nowSequence === this.projectInfo.blockSize) {
/*        this.$http.post('/api/refine', {
          refineList: this.refineList,
          blockId: this.blockId
        }).then((res) => {
          if (res.data.success) {
            alert('성공')
          } else {
            alert('실패')
          }
        }).catch((err) => {
          alert(err)
        })*/
        console.log(this.refineList)
      }
    }
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
