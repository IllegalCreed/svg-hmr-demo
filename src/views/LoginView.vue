<template>
    <div class="login-root-container">
      <img src="../assets/logo.png" width="300" class="logo light-png" />
      <h1 style="margin-bottom: 80px;letter-spacing: .35em;font-size: 3em;margin-right: -.35em;">集团门户网站</h1>
  
      <el-input v-model="loginform.account" class="login-input" placeholder="账号" />
      <el-input v-model="loginform.password" class="login-input" type="password" placeholder="密码" show-password />
  
      <div class="code-panel">
        <el-input v-model="loginform.code" class="code-input" placeholder="验证码" />
        <img :src="codeUrl" @click="getCode" class="login-code-img" />
      </div>
  
      <el-button class="login-btn" type="primary" @click="Login" :loading="loginLoading">登录</el-button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAccountStore } from '@/stores/modules/account';
  const { login: loginAction, getCode: getCodeAction } = useAccountStore();
  const router = useRouter();
  
  const codeUrl = ref('');
  const loginform = ref<LoginForm>({
    account: "",
    password: "",
    code: "",
    uuid: ""
  });
  const loginLoading = ref(false);
  
  function getCode() {
    getCodeAction().then((res: any) => {
      codeUrl.value = "data:image/gif;base64," + res.img;
      loginform.value.uuid = res.uuid;
    });
  }
  
  function Login() {
    loginLoading.value = true;
    loginAction(loginform.value)
      .then(() => {
        router.push({
          name: 'home'
        })
      })
      .catch(error => {
        getCode();
      })
      .finally(() => {
        loginLoading.value = false;
      })
  }
  
  getCode();
  </script>
  
  <style scoped>
  .login-root-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .login-input {
    width: 240px;
    margin: 10px;
  }
  
  .login-btn {
    width: 100px;
    margin-top: 50px;
  }
  
  .logo {
    margin-bottom: 10px;
  }
  
  .code-panel {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 240px;
    margin: 10px;
  }
  
  .code-input {
    flex: 2;
  }
  
  .login-code-img {
    flex: 1;
    cursor: pointer;
    vertical-align: middle;
    height: 32px;
    margin-left: 5px;
    background-color: gainsboro;
    border-radius: 5px;
  }
  </style>
  