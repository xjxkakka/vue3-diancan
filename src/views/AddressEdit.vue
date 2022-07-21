<template>
  <nav-bar :title="route.params.address?'编辑地址':'新增地址'"></nav-bar>
  <div class="addressEdit-container">
    <van-address-edit
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        ref="addressEdit"
        :address-info="AddressInfo"
    />
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar/index.vue'
import { onMounted, ref } from 'vue'
import { Toast } from 'vant'
import { areaList } from '@vant/area-data';
import { addAddress, delAddress, EditAddress, getAddressCode } from '../api/api'
import { useRouter ,useRoute} from 'vue-router'
// 使用省市区选择需要下载 npm包 npm i @vant/area-data

const router = useRouter()
const route = useRoute()
const searchResult = ref([]);
// 地址信息占位
const AddressInfo = ref({})
onMounted(()=>{
  if (route.params.address){
    // console.log(route.params.address)
    const item = JSON.parse(route.params.address)
    getAddressCode({ id:parseInt(item.id) }).then(res=>{
      // console.log(res)
      const item = res.data[0]
      AddressInfo.value = {
        id: item.id * 1, //收货人信息初始值
        name: item.name, //姓名
        tel: item.phone, //电话
        province: item.province, //省份
        city: item.city, //城市
        county: item.county, //区县
        areaCode: item.areaCode, //地址code：ID
        addressDetail: item.address, //详细地址
        isDefault: item.is_default === '1', //是否选择默认
      }
    })

  }
})
const onSave = (content) => {
  console.log(content)
  const token = localStorage.getItem("token")
  const { name, tel, province, city, county, addressDetail, isDefault,areaCode} = content
  const is_default = isDefault === true ? 1 : 0;
  let data = {
    token, name, phone: tel, province, city, county, address:addressDetail,is_default,areaCode
  }
  // 判断是否为修改地址
  if (route.params.address){
    data = {...data,id:AddressInfo.value.id}
    // console.log(data.id)
    EditAddress(data).then(res=>{
      console.log(res)
      if (res.data.ok === 1 ){
        Toast.success('修改成功!')
        // 跳转回收货地址
        router.back()
      }
    })
  }else{
    addAddress(data).then(res=>{
      console.log(res)
      Toast.success('保存成功!')
      // 跳转回收货地址
      router.back()
    })

  }

}
const onDelete = () => {
  if (route.params.address){
    const params = {id:AddressInfo.value.id}
    delAddress(params).then(res=>{
      console.log(res)
      if (res.data.ok === 1){
        Toast.success('删除成功!')
        router.push('/address')
      }
    })
  }else{
    router.push('/address')
  }
};


</script>

<style scoped>

</style>