<template lang="pug">
  .container
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

</style>
