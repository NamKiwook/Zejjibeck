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

</style>
