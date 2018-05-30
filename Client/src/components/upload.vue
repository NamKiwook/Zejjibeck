<template lang="pug">
  .container
    .loading-bar
      .gaze(:style="{ width: uploadPercent+'%' }")
    section.textWrap
      .title 프로젝트 이름
        .detail ?
        .description
          p 프로젝트 이름을 입력해주세요
      input.text#projectName(type='text', spellcheck='false', v-model="projectName")
    section.textWrap
      .title 프로젝트 설명
        .detail ?
        .description
          p 프로젝트 설명을 입력해주세요
      textarea.text#description(spellcheck='false', v-model="description")
    section.textWrap
      .title 프로젝트 질문
        .detail ?
        .description
          p 프로젝트 질문을 입력해주세요
      textarea.text#question(spellcheck='false', v-model="question")
    section.textWrap
      .title 프로젝트 비용
      input.text#totalCredit(type='text',spellcheck='false',  v-model="totalCredit", placeholder="0")
    section.typeWrap
      p.title 프로젝트 타입
      label.radioWrap 데이터 수집
        input.type(type="radio", name="projectType", value="Collect", v-model="projectType")
        span.radiomark
      label.radioWrap 데이터 정제
        input.type(type="radio", name="projectType", value="Refine", v-model="projectType")
        span.radiomark
      label.radioWrap 수집 및 정제
        input.type(type="radio", name="projectType", value="Refine&Collect", v-model="projectType")
        span.radiomark
    section.typeWrap
      p.title 데이터 타입
      label.radioWrap 이미지
        input.type#typeImg(type="radio", name="dataType", value="Image", v-model="dataType")
        span.radiomark
      label.radioWrap 오디오
        input.type(type="radio", name="dataType", value="Audio", v-model="dataType")
        span.radiomark
      label.radioWrap 텍스트
        input.type(type="radio", name="dataType", value="Text", v-model="dataType")
        span.radiomark
    section.tagTypeWrap(v-if="projectType === 'Refine' || projectType === 'Refine&Collect'")
      p.title 정제 타입
      label.radioWrap 단수 선택
        input.tagType#radioTag(type="radio", name="refineType", value="Radio", v-model="refineType")
        span.radiomark
      label.radioWrap 복수 선택
        input.tagType#checkboxTag(type="radio", name="refineType", value="Checkbox", v-model="refineType")
        span.radiomark
      label.radioWrap 텍스트
        input.tagType(type="radio", name="refineType", value="Text", v-model="refineType")
        span.radiomark
      label.radioWrap#dragType(v-if="dataType === 'Image' && (projectType === 'Refine' || projectType === 'Refine&Collect')") 영역선택
        input.tagType(type="radio", name="refineType", value="Drag", v-model="refineType")
        span.radiomark
    section.textWrap(v-if="projectType === 'Collect' || projectType === 'Refine&Collect'")
      .title Maximum Number of Data
      input.text(type='text', v-model="maxCollect", placeholder="0")
    section.textWrap(v-if="projectType === 'Refine' || projectType === 'Refine&Collect'")
      .title Block Size (Basic = 10)
      input.text#blockSize(type='text', v-model="blockSize", placeholder="0")
    section.textWrap(v-if="projectType === 'Refine' || projectType === 'Refine&Collect'")
      .title 문제당 최소 정제 횟수
      input.text#minimumRefine(type='text', v-model="minimumRefine", placeholder="0")
    section.tagValue(v-if="(refineType === 'Radio' || refineType === 'Checkbox') && (projectType === 'Refine' || projectType === 'Refine&Collect')")
      .title Tag Value
      .valueWrap
        .textWrap#valueField
          .inputWrap(v-for="number in tagNumber")
            input.text(type='text' v-model="refineList[number-1]" placeholder="입력해주세요!", @keydown="isEnter")
            .delete(@click="tagValueDel(number)")
        .btnWrap
          a#plus.btn(@click="tagPlus") +
    section.upload.active(v-if="projectType === 'Refine'")
      .title Upload
      form#ajaxFrom(enctype="multipart/form-data")
        input#ajaxFile(type="file", multiple="multiple", @change="fileChange")
    input.btn.register(type="button", @click="submit", value="REGISTER", v-if="!isSubmited && isAble")
    input.btn.register.disable(type="button", value="REGISTER", v-else)
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      projectName: null,
      minimumRefine: null,
      question: null,
      totalCredit: null,
      description: null,
      blockSize: null,
      projectType: null,
      refineType: null,
      dataType: null,
      state: null,
      fileNames: [],
      refineList: [],
      tagNumber: 1,
      fileList: [],
      maxCollect: null,
      uploadPercent: 0,
      isSubmited: false
    }
  },
  watch: {
    totalCredit: function () {
      if (this.totalCredit) {
        this.totalCredit = Number.parseFloat(this.totalCredit.toString().replace(/[^0-9]/g, ''))
      } else {
        this.totalCredit = 0
      }
    },
    minimumRefine: function () {
      if (this.minimumRefine) {
        this.minimumRefine = Number.parseFloat(this.minimumRefine.toString().replace(/[^0-9]/g, ''))
      } else {
        this.minimumRefine = 0
      }
    },
    blockSize: function () {
      if (this.blockSize) {
        this.blockSize = Number.parseInt(this.blockSize.toString().replace(/[^0-9]/g, ''))
      } else {
        this.blockSize = 0
      }
    },
    maxCollect: function () {
      if (this.maxCollect) {
        this.maxCollect = Number.parseInt(this.maxCollect.toString().replace(/[^0-9]/g, ''))
      } else {
        this.maxCollect = 0
      }
    }
  },
  computed: {
    isAble () {
      if (this.projectType && this.description && this.question && this.totalCredit && this.projectName && this.dataType) {
        if (this.projectType === 'Refine') { // Collect 인 경우
          if ((this.blockSize && this.minimumRefine && this.fileList.length && this.refineList)) {
            return true
          }
        } else if (this.projectType === 'Collect') {
          if (this.maxCollect) {
            return true
          }
        } else if (this.projectType === 'Refine&Collect') {
          if ((this.maxCollect && this.blockSize && this.minimumRefine && this.refineList)) {
            return true
          }
        }
      }
      return false
    }
  },
  methods: {
    isEnter (e) {
      if (e.keyCode === 13) {
        this.tagNumber++
      }
    },
    tagValueDel (number) {
      console.log(number)
      this.refineList.splice(number - 1, 1)
      this.tagNumber--
      console.log(this.refineList)
    },
    fileChange (e) {
      this.fileList = e.target.files
      for (var i = 0; i < this.fileList.length; i++) {
        this.fileNames[i] = this.fileList[i].name
      }
    },
    tagPlus () {
      this.tagNumber++
    },
    submit () {
      this.$store.commit('isLoadingTrue')
      this.isSubmited = true
      this.$http.post('/api/upload', {
        projectName: this.projectName,
        projectType: this.projectType,
        refineType: this.refineType,
        question: this.question,
        dataType: this.dataType,
        maxCollect: this.maxCollect,
        minimumRefine: this.minimumRefine,
        state: this.state,
        description: this.description,
        blockSize: this.blockSize,
        totalCredit: this.totalCredit,
        refineList: this.refineList,
        fileNames: this.fileNames,
        end: this.fileNames}).then(async (res) => { // TODO: DELETE THIS, 'end' IS DUMMY!
        if (res.data.success === false) {
          this.$store.commit('isLoadingFalse')
          this.isSubmited = false
          alert(res.data.errorMessage)
        } else {
          for (var i = 0; i < this.fileList.length; i++) {
            var file = this.fileList[i]
            var response = await
            this.$http.get('/api/upload/url', {
              params:
                {
                  projectName: this.projectName,
                  fileName: this.fileNames[i],
                  fileNo: i.toString()
                }
            })
            await this.$http({
              method: 'put',
              url: response.data.url,
              contentType: false,
              processData: false,
              data: file
            })
            this.uploadPercent = parseInt((i / this.fileList.length) * 100)
          }
          this.$store.commit('isLoadingFalse')
          this.$router.push('/dashboard')
        }
      })
    }
  }
}
</script>

<style scoped>
  .radioWrap{
    display: inline-block;
    position: relative;
    padding-left: 25px;
    padding-top: 3px;
    cursor: pointer;
    width: 120px;
    margin-right: 50px;
    margin-bottom: 15px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .radioWrap > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    outline: none;
  }
  .radiomark {
    position: absolute;
    margin-top: 3px;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
    border-radius: 50%;
  }
  .radioWrap > input:checked ~ .radiomark {
    background-color: #2979ff;
  }
  .radioWrap > .radiomark:after {
    content: "";
    position: absolute;
    display: none;
    width: 6px;
    height: 6px;
    top: 7px;
    left: 7px;
    border-radius: 50%;
    background-color: #fff;
  }
  .radioWrap > input:checked ~ .radiomark:after {
    display: block;
  }

  .container {
    padding: 20px 0 60px;
    margin: 150px auto 50px;
    max-width: 880px;
    width: 90%;
  }
  .loading-bar {
    height: 2px;
    z-index: 9999;
    position:fixed;
    top: 0; left: 0; right: 0;
  }
  .loading-bar > .gaze {
    background-color: #2979ff;
    height: 100%;
    transition: all 0.4s;
  }
  section {
    margin: 15px 0;
    display: inline-block;
    width: 100%;
  }
  section > #dragType {
    display: inline-block;
  }
  input.text {
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    width: 100%;
    outline: none;
  }
  textarea.text {
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    width: 100%;
    resize: none;
    outline: none;
  }
  .title {
    font-size: 16px;
    margin-bottom: 10px;
    position: relative;
  }
  .title > .detail {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: bottom;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.15);
    border: 1px solid rgba(0,0,0,.05);
    border-radius: 50%;
    background-color: #fff;
    text-align: center;
    margin-left: 8px;
    font-size: 12px;
    font-weight: bold;
    color: #999;
    cursor: pointer;
    position: relative;
  }
  .title > .detail:hover {
    background-color: #fafafa;
  }
  .title > .description {
    background-color: #5991ee;
    border-radius: 10px;
    transition: all 0.5s;
    opacity: 0;
    height: 0;
    position: absolute;
    left: 150px; bottom: -8px;
  }
  .title > .detail:hover ~ .description {
    opacity: 1;
    height: auto;
  }
  .title > .detail:hover ~ .description:after {
    background-color: #5991ee;
    display:inline-block;
    width: 10px;
    height: 10px;
    content: "";
    position: absolute;
    left: -4px; bottom: 10px;
    transform: rotate(45deg);
  }
  .title > .description > p {
    padding: 15px;
    color: #fff;
    font-weight: 300;
    font-size: 12px;
  }
  .tagValue {
    display: block;
    flex-flow: column;
  }
  .tagValue > .valueWrap {
    display: flex;
  }
  .tagValue > .valueWrap > .textWrap {
    display: flex;
    flex: 1;
    flex-flow: column;
  }
  .tagValue > .valueWrap > .textWrap > .inputWrap {
    margin-bottom: 10px;
    display: flex;
  }
  .tagValue > .valueWrap > .textWrap > .inputWrap > input {
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    outline: none;
  }
  .tagValue > .valueWrap > .textWrap > .inputWrap > .delete {
    width: 39.6px;
    height: 39.6px;
    color: #62ce8d;
    border: 1px solid #eee;
    border-left: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: #fff;
    background-position: center;
    background-size: 8px;
    background-repeat: no-repeat;
  }
  .tagValue > .valueWrap > .textWrap > .inputWrap:hover > .delete {
    background-image: url("../assets/close-gray.png");
    cursor: pointer;
  }
  .tagValue > .valueWrap > .btnWrap {
    position: relative;
    width: 50px;
  }
  .tagValue > .valueWrap > .btnWrap > .btn {
    position: absolute;
    right: 0;
    bottom: 11px;
    padding: 10px 15px;
    border: 0;
    background-color: #2979ff;
    color: #fff;
  }
  .btn.register {
    margin-top: 30px;
    float: right;
  }
</style>
