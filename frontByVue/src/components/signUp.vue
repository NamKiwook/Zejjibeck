<template lang="pug">
  .container
    .title Let's create an account
    .text Already have an account?
      router-link(to="/login") Log In
    input#name(type="text", placeholder="Full Name", v-model="username")
    input#id(type="text", placeholder="Email", v-model="userId")
    input#password(type="password", placeholder="Password",v-model="password")
    .btn.register(@click="submit") REGISTER
</template>

<script>
export default {
  name: 'sign-up',
  data () {
    return {
      username: null,
      userId: null,
      password: null
    }
  },
  mounted () {
    document.body.style.backgroundColor = '#425262'
  },
  beforeDestroy () {
    document.body.style.backgroundColor = 'rgba(235,237,239,1.0)'
  },
  methods: {
    submit () {
      this.$http.get('/api/signup',
        {params: {
          userId: this.userId,
          password: this.password,
          username: this.username}})
        .then((res) => {
          if (res.data.pass === 'ok') {
            alert('complete')
            this.$router.push('/login')
          } else {
            alert('exist id')
          }
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
    border-bottom: none;
  }

  .container > #name {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    border-bottom: none;
  }

  .container > #password {
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    border-bottom: 1px solid rgba(211, 215, 219, 1.0);
  }

  .container > .register {
    color: #fff;
    border-width: 0;
    background-color:#2E76B1;
    font-size: 16px;
    margin-top: 15px;
    padding: 16px 0;
  }

  .container > .text {
    color: #a7b3bf;
    margin: 15px 0 20px;
  }

  .container > .text > a {
    color: #2E76B1;
    margin-left: 10px;
  }

  .container > #chkfield {
    color: #c7254e;
    font-size: 10px;
    text-align: left;
    margin-top: 10px;
    height: 10px;

  }
</style>
