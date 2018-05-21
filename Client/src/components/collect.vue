<template lang="pug">
  .container
    section.problem
      .project-wrap
        .project-title {{projectInfo.projectName}}
      .problem-wrap
        .description
          | {{projectInfo.description}}
      .submit-wrap
        form#ajaxFrom(enctype="multipart/form-data")
          input#ajaxFile(type="file", multiple="multiple", ref="files")
          input.btn.register(type="button", @click="submit", value="SUBMIT")
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
  name: 'collect',
  data () {
    return {
      projectInfo: {},
      dataType: 'text',
      fileList: [],
      numberCollect: 0
    }
  },
  created () {
    this.$http.get('/api/collect', {params : {
        projectId: this.$route.params.projectId
      }}).then((res) => {
      this.projectInfo = res.data.projectInfo
    })
  },
  methods: {
    submit () {
      if (this.$refs.files != null) {
        this.fileList = this.$refs.files.files
        this.$http.put('/api/collect/check',{
          projectId: this.$route.params.projectId,
          fileNo: this.fileList.length
        }).then(async (res) => {
          if (res.data.success) {
            for (var i = 0; i < this.fileList.length; i++) {
              var res1 = await this.$http.get('/api/collect/url', {
                params: {
                  projectId: this.$route.params.projectId,
                  fileName: this.fileList[i].name
                }
              })
              if (res1.data.success) {
                console.log(res1.data.url)
                var res2 = await this.$http.put('/api/collect/urlAck', {
                  projectId: this.$route.params.projectId,
                  index: res1.data.index
                })
                if (res2.data.success) {
                  this.numberCollect++
                  if ( i === this.fileList.length - 1) {
                    alert('succeed' + this.numberCollect)
                    this.$router.push('/dashboard')
                  }
                }
              } else {
                alert(res1.data.errorMessage)
              }
            }
          } else {
            alert(res.data.errorMessage + res.data.available)
          }
        })
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
  .problem-wrap > .description {
    text-align: left;
  }
  .problem-wrap > .problem-title {
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    padding-top: 20px;
  }
  .submit-wrap {
    padding: 20px;
    text-align: right;
  }
  .submit-wrap > form > #ajaxFile {
    display: block;
  }
  .submit-wrap > form > .btn {
    margin: 20px 10px 10px;
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
  @media only screen and (max-width:1000px) {
    .container {
      padding: 40px 5%;
    }
    .user-info {
      display: none;
    }
  }
</style>
