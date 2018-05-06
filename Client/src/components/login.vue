<template lang="pug">
  .container
    .img-cover
      .content
        .description-wrap
          .logo-img DATAG
          .slogun 필요한 데이터를 쉽고 빠르게
          .divider
          .text 장점1
          .text 장점2
          .text 장점3
        .login-wrap
          .title Sign In
          input.id(type="text", name="userID", placeholder="Enter Email", v-model="userId")
          input.password(type="password", name="password", placeholder="Enter Password", v-model="password")
          a.signin.btn(v-on:click="submit") Sign In
          router-link.btn.signup(to="/signUp") Sign Up
          a.text Forgot password?
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      userId: '',
      password: ''
    }
  },
  methods: {
    submit () {
      this.$http.get('/api/login', {params: {userId: this.userId, password: this.password}})
        .then(async (res) => {
          if (res.data.pass === 'yes') {
            await this.$store.dispatch('login', res.data.token)
            alert('success')
            await this.$router.push('/dashboard')
          } else {
            alert('fail')
          }
        })
    }
  }
}
</script>
<style scoped>
  .container {
    background-image: url("../assets/login-img.png");
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 4px;
    box-shadow: 0 0 20px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100vh;
    position: relative;
  }
  .container > .img-cover {
    width: 100%;
    height: 100%;
    background-color: rgba(30,30,30,0.8);
    padding: 40px;
  }
  .container > .img-cover > .content {
    background-color: rgba(11, 17, 31, 0.5);
    border-radius: 4px;
    margin: 20vh auto 0;
    position: relative;
    width: 900px;
    height: 500px;
  }
  .description-wrap {
    padding: 40px;
    width: 500px;
  }
  .description-wrap > .logo-img {
    display: inline-block;
    color: #fff;
    font-weight: 800;
    font-size: 43px;
    margin-top: 60px;
  }
  .description-wrap > .slogun {
    color: #fff;
    padding: 5px 0;
  }
  .description-wrap > .divider {
    width: 100px;
    height: 2px;
    background-color: #2979ff;
    margin: 20px 0;
  }
  .description-wrap > .text {
    color: #fff;
    padding: 10px 0;
  }
  .login-wrap {
    background-color: #fff;
    width: 400px;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    position: absolute;
    top: 0; right: 0; bottom: 0;
    padding: 20px;
  }
  .login-wrap > .title {
    font-size: 18px;
    margin-top: 20px;
    padding: 30px 0;
  }
  .login-wrap > input {
    background-color: inherit;
    border-bottom: 1px solid #245eae;
    padding: 10px;
    width: 100%;
    margin-bottom: 25px;
    outline: none;
  }
  .login-wrap > .btn {
    margin-top: 15px;
    width: 100%;
  }
  .login-wrap > .signin {
    background-color: #2979ff;
  }
  .login-wrap > .signup {
    background-color: #fff;
    color: #2979ff;
    border: 1px solid #eee;
  }
  .login-wrap >.text {
    display: inline-block;
    font-size: 12px;
    margin-top: 20px;
    color: #4e4e4e;
  }
</style>
