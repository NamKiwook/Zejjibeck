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
          .title Sign In
          input.id(type="text", name="userID", spellcheck='false', placeholder="Email", v-model="userId")
          input.password(type="password", name="password", placeholder="Password", v-model="password")
          a.signin.btn(v-on:click="submit") Sign In
          router-link.btn.signup(to="/signup") Sign Up
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
      this.$store.commit('isLoadingTrue')
      this.$http.get('/api/login', {params: {userId: this.userId, password: this.password}})
        .then(async (res) => {
          if (res.data.success) {
            await this.$store.dispatch('login', res.data.token)
            await this.$store.commit('username', res.data.userInfo.username)
            this.$http.get('/api/userInfo/profile').then((res) => {
              this.$store.commit('userProfile', 'data:image/jpg;base64,' + res.data)
            })
            this.$store.commit('isLoadingFalse')
            await this.$router.push('/dashboard')
          } else {
            this.$store.commit('isLoadingFalse')
            alert('아이디가 존재하지 않거나 비밀번호가 잘못되었습니다.')
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
    height: 500px;
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
