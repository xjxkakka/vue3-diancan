<template>
  <nav-bar title="地址管理"></nav-bar>
  <div class="address-container">

    <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        :switchable="false"
        @click-item="handleToOrder"
    />
    <template v-if="true">
      <div class="tips" style="text-align: center">还没地址信息快去添加吧</div>
    </template>
  </div>

</template>

<script setup>
import NavBar from '../components/NavBar/index.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getAddress } from '../api/api'

const store = useStore()
const router = useRouter()
const route = useRoute()
// 返回上一层
const handleReturn = () => {
  router.back()
}
const chosenAddressId = ref('1');

const addressList = ref([])
const init = ()=>{
  // 发请求获取收货地址
  getAddress({ token: localStorage.getItem("token") }).then(res => {
    console.log(res.data)
    addressList.value = res.data.map(item=>{
      return {
        //这里返回的要跟ui组件的模板一样
        id: item.id,
        name: item.name,
        tel: item.phone,
        address: `${item.province}${item.city}${item.county}${item.address}`,
        isDefault: item.is_default === '1'
      }
    })
  })
}
onMounted(()=>{
  init()
})

//  下面两个事件存在冲突，如果用户想点击编辑按钮会点不了，所以设置一个变量控制一下 下面是会先执行编辑按钮
let fnStop = false
const handleToOrder = (item)=>{
  // 如果为true 不执行下面函数
  if (fnStop) return
  // 使用query 如果用户添加地址后也不会失去type
  if (route.query.type){
    console.log(item)
    // 点击后跳转回去
    router.push({name:'OrderPreview',params: { newAddress:JSON.stringify(item)}})
  }
}

// 点击编辑按钮
const onEdit = (item, index) => {
  fnStop = true
  console.log(item)
  router.push({name:'AddressEdit',params:{address:JSON.stringify(item)}})
}
// 点击新增地址
const onAdd = () =>{
  router.push('/addressedit')
}
</script>

<style lang="less" scoped>
.header {
  height: 1rem;
  width: 100%;
}

</style>