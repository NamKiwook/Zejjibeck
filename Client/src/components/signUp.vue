<template lang="pug">
  .container
    .img-cover
      .content
        .description-wrap
          .title DATAG
          .slogun 필요한 데이터를 쉽고 빠르게
          .divider
          .text 쉽고 간편한 데이터 수집 및 정제
            .dot
          .text 이미지, 음성, 텍스트의 다양한 유형의 데이터
            .dot
          .text 분류부터 영역선택까지 다양한 데이터 정제 유형 제공
            .dot
        .login-wrap
          .title Sign Up
          input#name(type="text", placeholder="Full Name", spellcheck='false', v-model="username")
          input#id(type="text", name="userID", spellcheck='false', placeholder="Email", v-model="userId")
          input#password(type="password", name="password", placeholder="Password", v-model="password")
          input#bank(type="text", name="bank", placeholder="은행", spellcheck='false', v-model="bank")
          input#bankAccount(type="text", name="bankAccount", placeholder="계좌번호", spellcheck='false', v-model="bankAccount")

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
  methods: {
    submit () {
      this.$store.commit('isLoadingTrue')
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
            this.$store.commit('isLoadingFalse')
          } else {
            alert(res.data.errorMassage)
            this.$store.commit('isLoadingFalse')
          }
        })
    }
  }
}
</script>

<style scoped>
  .dot {
    float: left;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #7789a8;
    margin-top: 8px;
    margin-right: 10px;
  }
  .container {
    background-image: url("../assets/login-img.png");
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 4px;
    box-shadow: 0 0 20px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    position: relative;
  }
  .container > .img-cover {
    width: 100%;
    background-color: rgba(30,30,30,0.8);
    padding: 40px;
  }
  .container > .img-cover > .content {
    background-color: rgba(11, 17, 31, 0.5);
    border-radius: 4px;
    margin: 20vh auto;
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
    margin-top: 35px;
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
  @media only screen and (max-width: 1170px) {
    .container > .img-cover > .content {
      width: 400px;
    }
    .container > .img-cover > .content > .description-wrap {
      display: none;
    }
  }
  @media only screen and (max-width: 550px) {
    .container > .img-cover {
      padding: 40px 15px;
    }
    .container > .img-cover > .content {
      width: 100%;
    }
    .container > .img-cover > .content > .login-wrap {
      width: 100%;
    }
  }
</style>
