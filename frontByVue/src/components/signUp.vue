<template lang="pug">
  .container
    .title Let's create an account
    .text Already have an account?
      router-link(to="/login") Log In
    input#name(type="text", placeholder="Full Name", v-model="name")
    input#id(type="text", placeholder="Email", v-model="email")
    input#password(type="password", placeholder="Password",v-model="password")
    .btn.register REGISTER
    p {{name + email + password}}
</template>

<script>
export default {
  name: 'sign-up',
  data () {
    return {
      name: null,
      email: null,
      password: null
    }
  },
  methods: {
    submit () {

    }
  }
}
</script>

<style scoped>

</style>
