<template lang="pug">
  .container
    section.textWrap
      .title Project Name
      input.text#projectName(type='text', v-model="projectName")
    section.textWrap
      .title Project Description
      input.text#description(type='text', v-model="description")
    section.textWrap
      .title Credit
      input.text#totalCredit(type='text', v-model="totalCredit", ref="tc", placeholder="0")
    section.textWrap
      .title Minimum Number of Refine
      input.text#minimumRefine(type='text', v-model="minimumRefine", ref="mr", placeholder="0")
    section.textWrap
      .title Block Size (Basic = 10)
      input.text#blockSize(type='text', v-model="blockSize", ref="bs")
    section.typeWrap
      p.title Project Type
      label.radioWrap Only Data
        input.type(type="radio", name="projectType", value="Collect", v-model="projectType")
        span.radiomark
      label.radioWrap Only Refine
        input.type(type="radio", name="projectType", value="Refine", v-model="projectType")
        span.radiomark
      label.radioWrap Data/Refine
        input.type(type="radio", name="projectType", value="Refine&Collect", v-model="projectType")
        span.radiomark
    section.typeWrap
      p.title Data Type
      label.radioWrap Image
        input.type#typeImg(type="radio", name="dataType", value="Image", v-model="dataType")
        span.radiomark
      label.radioWrap Audio
        input.type(type="radio", name="dataType", value="Audio", v-model="dataType")
        span.radiomark
      label.radioWrap Text
        input.type(type="radio", name="dataType", value="Text", v-model="dataType")
        span.radiomark
    section.tagTypeWrap
      p.title Refine Type
      label.radioWrap Radio
        input.tagType#radioTag(type="radio", name="refineType", value="Radio", v-model="refineType")
        span.radiomark
      label.radioWrap Check box
        input.tagType#checkboxTag(type="radio", name="refineType", value="Checkbox", v-model="refineType")
        span.radiomark
      label.radioWrap Text
        input.tagType(type="radio", name="refineType", value="Text", v-model="refineType")
        span.radiomark
      label.radioWrap#dragType(v-bind:style="isImg") Drag
        input.tagType(type="radio", name="refineType", value="Drag", v-model="refineType")
        span.radiomark
    section.tagValue(v-bind:style="isBox")
      .title Tag Value
      .valueWrap
        .textWrap#valueField
          input.text(type='text', v-for="n in tagNumber", v-model="refineList[n-1]")
        .btnWrap
          a#plus.btn(@click="tagPlus") +
    section.upload.active
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
      totalCredit: null,
      description: null,
      blockSize: 10,
      projectType: null,
      refineType: null,
      dataType: null,
      state: null,
      fileNames: [],
      refineList: [],
      tagNumber: 1,
      fileList: []
    }
  },
  updated () {
    if (this.$refs.tc.value) {
      if (this.$refs.tc.value.replace(/[^0-9]/g, '') === '') {
        this.$refs.tc.value = 0
      } else {
        this.$refs.tc.value = Number.parseInt(this.$refs.tc.value.replace(/[^0-9]/g, ''))
      }
    }
    if (this.$refs.mr.value) {
      if (this.$refs.mr.value.replace(/[^0-9]/g, '') === '') {
        this.$refs.mr.value = 0
      } else {
        this.$refs.mr.value = Number.parseInt(this.$refs.mr.value.replace(/[^0-9]/g, ''))
      }
    }
    if (this.$refs.bs.value) {
      if (this.$refs.bs.value.replace(/[^0-9]/g, '') === '') {
        this.$refs.bs.value = 0
      } else {
        this.$refs.bs.value = Number.parseInt(this.$refs.bs.value.replace(/[^0-9]/g, ''))
      }
    }
  },
  methods: {
    tagPlus () {
      var maxFields = 5
      if (this.tagNumber < maxFields) {
        this.tagNumber++
      }
    },
    submit () {
      if (this.projectType === 1) {
        this.state = '1'
      } else {
        this.state = '0'
      }
      this.fileList = this.$refs.files.files
      for (var i = 0; i < this.fileList.length; i++) {
        this.fileNames[i] = this.fileList[i].name
      }
      this.$http.post('/api/upload', {
        projectName: this.projectName,
        projectType: this.projectType,
        refineType: this.refineType,
        dataType: this.dataType,
        minimumRefine: this.minimumRefine,
        state: this.state,
        description: this.description,
        totalCredit: this.totalCredit,
        refineList: this.refineList,
        fileNames: this.fileNames,
        blockSize: this.blockSize}).then(async (res) => {
        if (res.data.pass === 'no') {
          alert('fail')
        } else if (res.data.pass === 'dup') {
          alert('Already exist project Name!')
        } else if (res.data.pass === 'ok') {
          for (var i = 0; i < this.fileList.length; i++) {
            var file = this.fileList[i]
            var uploadCount = 0

            this.$http.get('/api/upload/url', {
              params:
                {
                  projectName: this.projectName,
                  fileName: this.fileNames[i],
                  fileNo: i.toString()
                }
            }).then((res) => {
              this.$http({
                method: 'put',
                url: res.data.url,
                contentType: false,
                processData: false,
                data: file
              }).then((res) => {
                uploadCount = uploadCount + 1
                if (uploadCount === this.fileList.length) {
                  alert('complete' + this.fileList.length)
                  this.$router.push('/dashboard')
                }
              }).catch((err) => {
                alert('data upload err' + err)
              })
            }).catch((err) => {
              alert('get upload url err' + err)
            })
          }
        }
      })
    }
  },
  computed: {
    isImg () {
      if (this.dataType === 'image') {
        return {
          display: 'inline-block'
        }
      } else {
        return {
          display: 'none'
        }
      }
    },
    isBox () {
      if (this.refineType === 'radio' || this.refineType === 'checkbox') {
        return {
          display: 'flex'
        }
      } else {
        return {
          display: 'none'
        }
      }
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
    width: 100px;
    margin-right: 50px;
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
    position: absolute;;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
    border-radius: 50%;
  }
  .radioWrap > input:checked ~ .radiomark {
    background-color: #2E76B1;
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
    background-color: #fff;
    border: 1px solid rgba(211, 215, 219, 1.0);
    border-radius: 4px;
    padding: 20px;
    padding-bottom: 60px;
    margin: 20px;
    position: absolute;
    left: 250px;
    top: 60px;
  }

  section {
    margin: 15px 0;
    display: inline-block;
    width: 100%;
  }
  section > #dragType {
    display: none;
  }
  input.text {
    padding: 10px;
    border: 1px solid rgba(211, 215, 219, 1.0);
    border-radius: 4px;
    width: 100%;
  }
  .title {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .tagValue {
    display: none;
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
    background-color: #2E76B1;
    color: #fff;
  }
  .btn.register {
    margin-top: 30px;
    float: right;
  }
  @media only screen and (max-width: 1080px) {
    .container {
      left: 0;
      margin: 0;
    }
  }
</style>
