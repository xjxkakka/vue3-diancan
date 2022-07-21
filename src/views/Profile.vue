<template>
  <TopNav></TopNav>
  <div class="profile-container">
  <div class="user-info">
  <div class="info">
    <div class="pic">
      <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2F80%2Fv2-c1748343e68d08167b4c950fb54c4bf6_720w.jpg%3Fsource%3D1940ef5c&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660114139&t=5645baac0bb7091bea6fcfdeedd09bb6" alt="">
    </div>
    <div class="desc">
      <div class="name">
        <span>昵称: {{username}}</span>
        <span>个性签名: 好好学习，天天向上！</span>
      </div>
    </div>
  </div>
  </div>
    <div class="profile-cell">
      <van-cell title="地址管理" is-link to="address"/>
      <van-cell title="我的订单"  is-link to="OrderList"/>
      <van-cell value="退出登录" @click="logout" />
    </div>
  </div>
<Footer :active="3"></Footer>
</template>

<script setup>
import Footer from '../components/Footer/index.vue'
import TopNav from '../components/TopNav/index.vue'
import { useRouter } from 'vue-router'
import { Dialog } from 'vant';
import { ref } from 'vue'

const router = useRouter()
// 获取用户信息
const username = ref(JSON.parse(localStorage.getItem("userInfo")).username)
const logout = ()=>{
  Dialog.confirm({
    message:
        '确认退出登录？',
  })
      .then(() => {
        localStorage.removeItem("token")
        router.push('/')
      })
      .catch(() => {
        // on cancel
      });

}
</script>

<style lang="less">
.profile-container{
  box-sizing:border-box;
  padding:1rem 0 ;
  height: 100vh;
  width: 100%;

  background-color: rgb(247,247,247);
  .user-info{
    height: 2.3rem;
    width: 7rem;
    background: linear-gradient(90deg,#31c7A7,#A1C7C7);
    box-shadow: 0 0.04rem 0.1rem #269090;
    margin: 0 auto;
    .info{
      box-sizing:border-box;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 0.6rem;
      .pic{
        width: 1rem;
        margin-right: 0.4rem;
        img{
          height: 100%;
          width:100%;
        }
      }
      .desc{
        height: 1rem;
        width: 100%;
        font-size: 0.28rem;
        .name{
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }
  }
  .profile-cell{
    width: 100%;
    .van-cell{
      margin: 0.4rem 0;
      .van-cell__value--alone{
          text-align: center;
      }
    }
  }
}
</style>