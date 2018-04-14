<template lang="pug">
  .container
    section.textWrap
      .title Project Name
      input.text#projectName(type='text')
    section.textWrap
      .title Project Description
      input.text#description(type='text')
    section.textWrap
      .title Credit
      input.text#totalCredit(type='number')
    section.textWrap
      .title Minimum Number of Refine
      input.text#minimumRefine(type='number')
    section.textWrap
      .title Block Size (Basic = 10)
      input.text#blockSize(type='number', value=10)
    section.typeWrap
      p.title Project Type
      label.radioWrap Only Data
        input.type(type="radio", name="projectType", value="data")
        span.radiomark
      label.radioWrap Only Refine
        input.type(type="radio", name="projectType", value="refine")
        span.radiomark
      label.radioWrap Data/Refine
        input.type(type="radio", name="projectType", value="data&refine")
        span.radiomark
    section.typeWrap
      p.title Data Type
      label.radioWrap Image
        input.type#typeImg(type="radio", name="dataType", value="image")
        span.radiomark
      label.radioWrap Audio
        input.type(type="radio", name="dataType", value="audio")
        span.radiomark
      label.radioWrap Text
        input.type(type="radio", name="dataType", value="text")
        span.radiomark
    section.tagTypeWrap
      p.title Refine Type
      label.radioWrap Radio
        input.tagType#radioTag(type="radio", name="refineType", value="radio")
        span.radiomark
      label.radioWrap Check box
        input.tagType#checkboxTag(type="radio", name="refineType", value="checkbox")
        span.radiomark
      label.radioWrap Text
        input.tagType(type="radio", name="refineType", value="text")
        span.radiomark
      label.radioWrap#dragType Drag
        input.tagType(type="radio", name="refineType", value="drag")
        span.radiomark
    section.tagValue
      .title Tag Value
      .valueWrap
        .textWrap#valueField
          input.text(type='text')
        .btnWrap
          a#plus.btn +
    section.upload
      .title Upload
      form#ajaxFrom(enctype="multipart/form-data")
        input#ajaxFile(type="file", multiple="multiple")
        input(type="button", onclick="upload();", value="업로드")
</template>

<script>
export default {
  name: 'upload'
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


  body > .container {
    background-color: #fff;
    border: 1px solid rgba(211, 215, 219, 1.0);
    border-radius: 4px;
    padding: 20px;
    margin-top: 20px;
    padding-bottom: 60px;
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
    padding: 10px 20px;
    background-color: #2E76B1;
    border: 0;
    color: #fff;
    float: right;
  }
</style>
