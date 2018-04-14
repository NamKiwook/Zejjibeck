<template lang="pug">
  .container
    .title Let's create an account
    .text Already have an account?
      router-link(to="/login") Log In
    input#name(type="text", placeholder="Full Name")
    input#id(type="text", placeholder="Email")
    input#password(type="password", placeholder="Password")
    .btn.register REGISTER
</template>

<script>
export default {
  name: 'sign-up'
}
</script>

<style scoped>

</style>
