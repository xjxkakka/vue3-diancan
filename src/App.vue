<template>
  <router-view></router-view>

<!--  <router-view v-slot="{ Component, route }">-->
<!--    <keep-alive :include="store.state.cacheKeepAlive">-->
<!--      <component :is="Component" />-->
<!--    </keep-alive>-->
<!--  </router-view>-->


</template>


<script>


import { onMounted } from 'vue'
import { getAddress } from './api/api'
import {useStore} from 'vuex'
export default {
  name: 'App',
  setup(){
    const store = useStore()
    onMounted(()=>{
      // 判断是否有token 有的情况下在发送 获取地址
      if (localStorage.getItem("token")) {
          store.dispatch('getAddress')
      }
    })
    return{store}
  }
}
</script>
<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
*{
  padding: 0;
  margin: 0;
}
html,body{ width: 100%; height: 100%; overflow: scroll;}
html::-webkit-scrollbar, body::-webkit-scrollbar{width:0px;height:0px;}
</style>
