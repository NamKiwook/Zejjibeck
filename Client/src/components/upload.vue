<template lang="pug">
  .container
    .loading-bar
      .gaze(:style="{ width: uploadPercent+'%' }")
    section.textWrap
      .title 프로젝트 이름
      input.text#projectName(type='text', v-model="projectName")
    section.textWrap
      .title 프로젝트 설명
      textarea.text#description(v-model="description")
    section.textWrap
      .title 프로젝트 질문
      textarea.text#question(v-model="question")

    section.textWrap
      .title 프로젝트 비용
      input.text#totalCredit(type='text', v-model="totalCredit", placeholder="0")
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
      input.text#blockSize(type='text', v-model="blockSize", placeholder="10")
    section.textWrap(v-if="projectType === 'Refine' || projectType === 'Refine&Collect'")
      .title 문제당 최소 정제 횟수
      input.text#minimumRefine(type='text', v-model="minimumRefine", placeholder="0")
    section.tagValue(v-if="(refineType === 'Radio' || refineType === 'Checkbox') && (projectType === 'Refine' || projectType === 'Refine&Collect')")
      .title Tag Value
      .valueWrap
        .textWrap#valueField
          input.text(type='text', v-for="n in tagNumber", v-model="refineList[n-1]")
        .btnWrap
          a#plus.btn(@click="tagPlus") +
    section.upload.active(v-if="projectType === 'Refine'")
      .title Upload
      form#ajaxFrom(enctype="multipart/form-data")
        input#ajaxFile(type="file", multiple="multiple", ref="files")
    input.btn.register(type="button", @click="submit", value="REGISTER")
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
      uploadPercent: 0
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
  methods: {
    tagPlus () {
      this.tagNumber++
    },
    submit () {
      if (this.projectType === 1) {
        this.state = '1'
      } else {
        this.state = '0'
      }
      if (this.$refs.files != null) {
        this.fileList = this.$refs.files.files
        for (var i = 0; i < this.fileList.length; i++) {
          this.fileNames[i] = this.fileList[i].name
        }
      } else {
        this.fileList = null
      }
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
          alert(res.data.errorMessage)
        } else {
          if (this.$refs.files != null) {
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
              if (i === this.fileList.length - 1) {
                this.$router.push('/dashboard')
              }
              this.uploadPercent = parseInt((i/this.fileList.length) *100)
            }
          } else {
            this.$router.push('/dashboard')
          }
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
    border: 1px solid rgba(211, 215, 219, 1.0);
    border-radius: 4px;
    width: 100%;
  }
  textarea.text {
    padding: 10px;
    border: 1px solid rgba(211, 215, 219, 1.0);
    border-radius: 4px;
    width: 100%;
    resize: none;
  }
  .title {
    font-size: 16px;
    margin-bottom: 10px;
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
  .tagValue > .valueWrap > .textWrap > input {
    margin-bottom: 10px;
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
