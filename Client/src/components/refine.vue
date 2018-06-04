<template lang="pug">
  .container#problemTop
    section.problem
      .sequence-wrap
        .now-sequence {{nowSequence}}
        .total-sequence / {{urlList.length}}
      .project-wrap
        .project-title {{projectInfo.projectName}}

      .problem-wrap(v-if="projectInfo.dataType === 'Image' && projectInfo.refineType !== 'Drag'")
        .content
          img(:src="urlSrc")
        .problem-title {{projectInfo.question}}

      .problem-wrap(v-if="projectInfo.refineType === 'Drag'")
        .content
          canvas(ref="myCanvas", width="1000" height="1000" ,@mousedown="mousedown", @mouseup="mouseup", @mousemove="mousemove", @touchstart="mousedown", @touchend="mouseup",@touchmove="mousemove")
          .delete.btn(@click="dragDel") 선택 삭제
        .problem-title {{projectInfo.question}}

      .problem-wrap(v-if="projectInfo.dataType === 'Text'")
        .content
          .text {{textData}}
        .problem-title {{projectInfo.question}}

      .problem-wrap(v-if="projectInfo.dataType === 'Audio'")
        .content
          audio(controls controlsList="nodownload", :src="urlSrc")
        .problem-title {{projectInfo.question}}

      .refine-wrap.text(v-if="projectInfo.refineType === 'Text'")
        input(type="text" placeholder="정답을 입력해주세요" v-model="refineList[nowSequence-1]")

      .refine-wrap.select(v-if="projectInfo.refineType === 'Checkbox'")
        label.inputWrap(v-for="(tag, index ) in projectInfo.refineList") {{tag}}
          input(type="checkbox", :value="index", v-model="refineList[nowSequence-1]")
          span.mark
      .refine-wrap.select(v-if="projectInfo.refineType === 'Radio'")
        label.inputWrap(v-for="(tag, index) in projectInfo.refineList") {{tag}}
          input(type="radio", name="radio", :value="index" v-model="refineList[nowSequence-1]")
          span.mark

      .btnWrap
        .prev.btn.disable(v-scroll-to="'#problemTop'" v-if="nowSequence === 1") PREV
        .prev.btn(@click="nowSequence--",  v-scroll-to="'#problemTop'" v-else) PREV
        .next.btn.disable(v-scroll-to="'#problemTop'" v-if="nowSequence < urlList.length && isNull") NEXT
        .next.btn(@click="nowSequence++",  v-scroll-to="'#problemTop'" v-else-if="nowSequence < urlList.length && !isNull") NEXT
        .next.btn.disable(v-scroll-to="'#problemTop'" v-else-if="nowSequence === urlList.length && isNull") SUBMIT
        .next.btn(@click="submit()",  v-scroll-to="'#problemTop'" v-else-if="nowSequence === urlList.length && !isNull") SUBMIT

    section.user-info
      .profile-wrap
        .profile-img(:style="{ 'background-image': 'url(' + this.$store.getters.getUserProfile + ')' }")
        .profile-title {{this.$store.getters.getUsername}}
      .credit-wrap
        .wrap
          .dot
          .title 사용가능
          .credit {{this.$store.getters.getUserUsableCredit}}
        .wrap
          .dot
          .title 적립예정
          .credit {{this.$store.getters.getUserPrearrangedCredit}}
</template>

<script>
export default {
  name: 'refine',
  data () {
    return {
      projectInfo: {projectName: '', dataType: '', question: '', refineType: 'Drag'},
      nowSequence: 1,
      urlList: [],
      blockId: null,
      urlSrc: null,
      refineList: [],
      nextButton: 'NEXT',
      textData: '',
      canvas: null,
      ctx: null,
      imageObj: new Image(),
      preX: null,
      preY: null,
      curX: null,
      curY: null,
      isDrawing: false
    }
  },
  mounted () {
    this.$http.get('/api/refine', {params: {projectId: this.$route.params.projectId}}).then((res) => {
      this.projectInfo = res.data.projectInfo
      this.urlList = res.data.urlList
      this.blockId = res.data.blockId
      this.urlSrc = this.urlList[0]
      if (this.projectInfo.refineType === 'Checkbox') {
        for (var i = 0; i < this.urlList.length; i++) {
          this.refineList[i] = []
        }
      }
      if (this.projectInfo.dataType === 'Text') {
        this.loadTextData()
      }
      if (this.projectInfo.refineType === 'Drag') {
        this.canvas = this.$refs.myCanvas
        this.ctx = this.canvas.getContext('2d')
        this.ctx.lineWidth = 5
        this.ctx.strokeStyle = '#2979ff'
        this.imageObj.onload = this.imageUpdate
        this.imageObj.src = this.urlSrc
        for (var j = 0; j < this.urlList.length; j++) {
          this.refineList[j] = {prevX: null, prevY: null, curX: null, curY: null}
        }
      }
      if (this.urlList.length === 1) {
        this.nextButton = 'SUBMIT'
      }
    }).catch((err) => {
      alert(err)
    })
  },
  watch: {
    nowSequence () {
      this.urlSrc = this.urlList[this.nowSequence - 1]
      if (this.projectInfo.refineType === 'Drag') {
        this.imageObj.src = this.urlSrc
      }
      if (this.projectInfo.dataType === 'Text') {
        this.loadTextData()
      }
      if (this.nowSequence === this.urlList.length) {
        this.nextButton = 'SUBMIT'
      } else {
        this.nextButton = 'NEXT'
      }
    }
  },
  computed: {
    isNull () {
      console.log(this.refineList)
      console.log(this.curY)
      if (this.refineList[this.nowSequence - 1] === 0) {
        return false
      }
      if (this.refineList[this.nowSequence - 1]) {
        if (this.refineList[this.nowSequence - 1].length !== 0 && this.projectInfo.refineType !== 'Drag') {
          return false
        } else if (this.refineList[this.nowSequence - 1].curY !== null && this.projectInfo.refineType !== 'Checkbox') {
          return false
        }
      }
      return true
    }
  },
  methods: {
    dragDel () {
      this.curY = null
      this.clearCanvas()
      this.refineList[this.nowSequence - 1].curY = null
    },
    getMousePos (canvas, evt) {
      var rect = canvas.getBoundingClientRect()
      if (evt.changedTouches) {
        return {
          x: parseInt((evt.changedTouches[0].clientX - rect.left) / (rect.right - rect.left) * this.canvas.width),
          y: parseInt((evt.changedTouches[0].clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height)
        }
      } else {
        return {
          x: parseInt((evt.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width),
          y: parseInt((evt.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height)
        }
      }
    },
    mousemove (event) {
      event.preventDefault()
      if (this.isDrawing) {
        var mousePos = this.getMousePos(this.canvas, event)
        console.log(mousePos)
        this.curX = mousePos.x
        this.curY = mousePos.y
        this.clearCanvas()
        this.ctx.strokeRect(this.preX, this.preY, this.curX - this.preX, this.curY - this.preY)
        this.refineList[this.nowSequence - 1].prevX = this.preX / this.canvas.width
        this.refineList[this.nowSequence - 1].prevY = this.preY / this.canvas.height
        this.refineList[this.nowSequence - 1].curX = this.curX / this.canvas.width
        this.refineList[this.nowSequence - 1].curY = this.curY / this.canvas.height
      }
    },
    mousedown (event) {
      this.isDrawing = true
      var mousePos = this.getMousePos(this.canvas, event)
      this.preX = mousePos.x
      this.preY = mousePos.y
    },
    mouseup (event) {
      this.isDrawing = false
    },
    clearCanvas () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(this.imageObj, 0, 0, this.canvas.width, this.canvas.height)
    },
    imageUpdate () {
      this.ctx.drawImage(this.imageObj, 0, 0, this.canvas.width, this.canvas.height)
      if (this.refineList[this.nowSequence - 1].curY !== null) {
        this.ctx.strokeRect(this.refineList[this.nowSequence - 1].prevX * this.canvas.width, this.refineList[this.nowSequence - 1].prevY * this.canvas.height, this.refineList[this.nowSequence - 1].curX * this.canvas.width - this.refineList[this.nowSequence - 1].prevX * this.canvas.width, this.refineList[this.nowSequence - 1].curY * this.canvas.height - this.refineList[this.nowSequence - 1].prevY * this.canvas.height)
      }
    },
    loadTextData () {
      this.$http.get(this.urlList[this.nowSequence - 1]).then((res) => {
        this.textData = res.data
      })
    },
    submit () {
      this.$store.commit('isLoadingTrue')
      this.$http.post('/api/refine', {
        refineList: this.refineList,
        projectId: this.$route.params.projectId,
        blockId: this.blockId
      }).then((res) => {
        if (res.data.success) {
          this.$store.commit('isLoadingFalse')
          this.$router.push('/dashboard')
        } else {
          this.$store.commit('isLoadingFalse')
          alert('실패')
        }
      }).catch((err) => {
        this.$store.commit('isLoadingFalse')
        alert(err)
      })
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
    overflow: hidden;
  }
  .content > img {
    width: 100%;
  }
  canvas {
    max-width: 100%;
  }
  .content > .delete.btn {
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 12px;
    float: right;
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
    padding: 10px 20px;
    text-align: center;
    position: relative;
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
    background-size: cover;
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
  @media only screen and (max-width:1000px) {
    .container {
      padding: 40px 5%;
    }
    .sequence-wrap {
      float: right;
      margin-right: 10px;
      position: initial;
      padding-top: 7px;
    }
    .sequence-wrap > .now-sequence {
      font-size: 18px;
      font-weight: 900;
      margin-right: 10px;
    }
    .sequence-wrap > .total-sequence {
      font-size: 18px;
      font-weight: 900;
      color: #a7b3bf;
    }
    .user-info {
      display: none;
    }
  }
</style>
