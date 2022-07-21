<template>
  <div class="content">
    <div class="header">
      <img src="../../assets/images/logo.png"/>
    </div>

    <div class="list">
      <div class="list-call">
        <img class="img" src="../../assets/images/1.png">
        <input class="sl-input" v-model="userInfo.username" type="text" placeholder="用户名"/>
      </div>
      <div class="list-call">
        <img class="img" src="../../assets/images/2.png">
        <input class="sl-input" v-model="userInfo.password" :type="!state.showPassword?'password':'text'" maxlength="32"
               placeholder="登录密码"
        />

        <div @click="display">
          <img v-if="state.showPassword===true"
               src="../../assets/images/op.png" class="img"/>
          <img src="../../assets/images/cl.png" class="img" alt="" v-else>
        </div>

      </div>
    </div>

    <div class="button-login" @click="bindLogin">
      <text>注册</text>
    </div>

    <div class="agreement">
      <div @click="agreementSuccess">
        <img v-if="state.agreement===true"
             src="../../assets/images/ty1.png"/>
        <img src="../../assets/images/ty0.png" alt="" v-else>
      </div>

      <span @click="agreementSuccess"> 同意</span>
      <span>《软件用户协议》</span>
    </div>
    <div class="agreement" style="margin-top: 0.2rem;font-size: 0.24rem" @click="$router.push('/login')">
      前往登录页面
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Toast } from 'vant';
import { reqRegister } from '../../api/api'
import { useRouter } from 'vue-router'
import md5 from 'js-md5'

const router = useRouter()
const userInfo = reactive({
  username: '',
  password: '',
})
const state = reactive({
  agreement: true,
  showPassword: false,
})
const display = () => {
  state.showPassword = !state.showPassword
}

const agreementSuccess = () => {
  state.agreement = !state.agreement;
}
const bindLogin = () => {
  if (userInfo.username === '') {
    Toast.fail('请输入用户名');
    return;
  }
  if (userInfo.password === '') {
    Toast.fail('密码不能为空');
    return
  }

  const data = {
    username: userInfo.username,
    password: md5(userInfo.password)
  }
  reqRegister(data).then(res => {
    if (res.data.ok === 1){
      Toast.success('注册成功');
      router.push('/login')
    }
  })

}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header {
  width: 1.6rem;
  height: 1.6rem;
  margin-top: 0.3rem;
  margin-left: auto;
  margin-right: auto;
}

.header img {
  width: 1.6rem;
  height: 1.6rem;
}

.list {
  display: flex;
  flex-direction: column;
  padding-top: 0.5rem;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
}

.list-call {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 1rem;
  color: #333333;
  border-bottom: 0.5px solid #e2e2e2;
}

.list-call .img {
  width: 0.4rem;
  height: 0.4rem;
}


.list-call .sl-input {
  flex: 1;
  text-align: left;
  font-size: 0.32rem;
  margin-left: 0.16rem;
  border: none;
}


.button-login {
  color: #FFFFFF;
  font-size: 0.34rem;
  width: 4.7rem;
  height: 1rem;
  background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
  box-shadow: 0px 0px 0.12rem 0px rgba(164, 217, 228, 0.2);
  border-radius: 0.5rem;
  line-height: 1rem;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
}


.button-login:hover {
  background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));

}


.agreement {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 0.3rem;
  margin-top: 0.8rem;
  color: #FFA800;
  text-align: center;
  height: 0.4rem;
  line-height: 0.4rem;
}

.agreement img {
  width: 0.4rem;
  height: 0.4rem;
}
</style>
