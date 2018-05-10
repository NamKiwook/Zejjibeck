<template lang="pug">
  .container
    .img-cover
      .content
        .description-wrap
          .title DATAG
          .slogun 필요한 데이터를 쉽고 빠르게
          .divider
          .text 장점1
          .text 장점2
          .text 장점3
        .login-wrap
          .title Sign Up
          input#name(type="text", placeholder="Full Name", v-model="username")
          input#id(type="text", name="userID", placeholder="Email", v-model="userId")
          input#password(type="password", name="password", placeholder="Password", v-model="password")
          input#bank(type="text", name="bank", placeholder="은행", v-model="bank")
          input#bankAccount(type="text", name="bankAccount", placeholder="계좌번호", v-model="bankAccount")

          a.register.btn(v-on:click="submit") Register
          router-link.text(to="/login") Already have an account?
</template>

<script>
export default {
  name: 'sign-up',
  data () {
    return {
      username: null,
      userId: null,
      password: null,
      bank: null,
      bankAccount: null
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
          username: this.username,
          bank: this.bank,
          bankAccount: this.bankAccount}})
        .then((res) => {
          if (res.data.success) {
            alert('complete')
            this.$router.push('/login')
          } else {
            alert(res.data.errorMassage)
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
    margin: 10vh auto 0;
    position: relative;
    width: 900px;
    height: 550px;
  }
  .description-wrap {
    padding: 40px;
    width: 500px;
  }
  .description-wrap > .title {
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
  .login-wrap > .register {
    background-color: #2979ff;
  }
  .login-wrap >.text {
    display: inline-block;
    font-size: 12px;
    margin-top: 20px;
    color: #4e4e4e;
  }
  /*.container {*/
    /*border: 1px solid #3c4858;*/
    /*border-radius: 8px;*/
    /*background-color: #fff;*/
    /*box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(0, 0, 0, 0.04);*/
    /*display: flex;*/
    /*flex-flow: column;*/
    /*max-width: 420px;*/
    /*margin: 25vh auto;*/
    /*padding: 20px;*/
    /*text-align: center;*/
  /*}*/
  /*.container > .title {*/
    /*font-size: 24px;*/
    /*padding-top: 20px;*/
  /*}*/

  /*.container > input {*/
    /*border: 1px solid rgba(211, 215, 219, 1.0);*/
    /*padding: 16px 20px;*/
    /*border-bottom: none;*/
  /*}*/

  /*.container > #name {*/
    /*border-top-left-radius: 2px;*/
    /*border-top-right-radius: 2px;*/
    /*border-bottom: none;*/
  /*}*/

  /*.container > #password {*/
    /*border-bottom-left-radius: 2px;*/
    /*border-bottom-right-radius: 2px;*/
    /*border-bottom: 1px solid rgba(211, 215, 219, 1.0);*/
  /*}*/

  /*.container > .register {*/
    /*color: #fff;*/
    /*border-width: 0;*/
    /*background-color:#2E76B1;*/
    /*font-size: 16px;*/
    /*margin-top: 15px;*/
    /*padding: 16px 0;*/
  /*}*/

  /*.container > .text {*/
    /*color: #a7b3bf;*/
    /*margin: 15px 0 20px;*/
  /*}*/

  /*.container > .text > a {*/
    /*color: #2E76B1;*/
    /*margin-left: 10px;*/
  /*}*/

  /*.container > #chkfield {*/
    /*color: #c7254e;*/
    /*font-size: 10px;*/
    /*text-align: left;*/
    /*margin-top: 10px;*/
    /*height: 10px;*/

  /*}*/
</style>
