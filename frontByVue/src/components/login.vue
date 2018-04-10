<template lang="pug">
  .container
    .title Welcome back!
    .text Don't have an account?
      a(href='/signUp') Sign Up
    input.id(type="text", name="userID", placeholder="Email", v-model="id")
    input.password(type="password", name="password", placeholder="Password", v-model="password")
    a.login.btn(v-on:click="submit") Sign In
    a.google.btn Sign in with Google
    .text Forgot your password?
      a Reset it
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      id: '',
      password: ''
    }
  },
  methods: {
    submit () {
      this.$http.get('/api/login/certification/', {params: {id: this.id, password: this.password}})
        .then((res) => {
          console.log(res)
        })
    }
  }
}
</script>
<style scoped>
  .container {
    border: 1px solid #3c4858;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-flow: column;
    max-width: 420px;
    margin: 25vh auto;
    padding: 20px;
    text-align: center;
  }
  .container > .title {
    font-size: 24px;
    padding-top: 20px;
  }

  .container > input {
    border: 1px solid rgba(211, 215, 219, 1.0);
    padding: 16px 20px;
  }

  .container > .id {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    border-bottom: none;
  }
  .container > .password {
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .container > .login {
    color: #fff;
    border-width: 0;
    background-color:#2E76B1;
    font-size: 20px;
    margin-top: 20px;
    padding: 16px 0;
  }

  .container > .google {
    border-color: rgba(211, 215, 219, 1.0);
    font-size: 16px;
    padding: 16px 0;
    margin-top: 20px;
  }

  .container > .text {
    color: #a7b3bf;
    margin: 15px 0 20px;
  }

  .container > .text > a {
    color: #2E76B1;
    margin-left: 10px;
  }
</style>
