<template>
  <div class="nav-bar">
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      fixed
      safe-area-inset-top
      placeholder
  />
  </div>
</template>

<script setup>

import { useRouter,useRoute} from 'vue-router'

defineProps({
  title:{
    type:String,
    require:true
  }
})
const router = useRouter()
const route = useRoute()

const onClickLeft = () => {
  if (route.path === '/orderpay'){
    router.push('/orderlist')
    return
  }
  history.back();
}
</script>

<style lang="less">
.nav-bar{
  .van-nav-bar{
    background-color: rgb(255, 165, 50);
    .van-nav-bar__content{
      height: 0.8rem;
      .van-nav-bar__title{
        color: #fff !important;
      }
      .van-badge__wrapper{
        color: #fff !important;

      }
    }
  }
}
</style>