<template>
  <van-tabbar v-model="active">
    <router-link class="nav" style="text-decoration: none;" to="/home">
      <van-tabbar-item icon="home-o">
        首页
      </van-tabbar-item>
    </router-link>
    <router-link class="nav" style="text-decoration: none;" to="/classify">
      <van-tabbar-item icon="qr">
        分类
      </van-tabbar-item>
    </router-link>

    <router-link class="nav" style="text-decoration: none;" to="/orderlist">
      <van-tabbar-item icon="description">
        订单
      </van-tabbar-item>
    </router-link>


    <router-link class="nav" style="text-decoration: none;" to="/profile">
      <van-tabbar-item icon="user-circle-o">
        我的
      </van-tabbar-item>
    </router-link>
  </van-tabbar>
</template>

<script setup>


defineProps({
  active:{
    type:Number,
    default:0
  }
})

</script>

<style lang="less">
.van-tabbar .nav{
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
</style>