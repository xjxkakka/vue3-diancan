<template>
  <NavBar title="付款"></NavBar>
  <div class="pay-container">
    <div class="cell-price">
      支付金额<span style="color: red">￥{{orderInfo.totalAmount}}</span>
    </div>
    <div class="pay-way">
      <div class="title">
        选择支付方式
      </div>
      <van-radio-group v-model="orderPayChecked">
      <div class="pay">
      <div class="pic">
        <img src="../assets/images/alipay.jpeg" alt=""/>
      </div>
        <div class="desc">
          <div class="pay-name">支付宝支付</div>
          <div class="tips">推荐有支付宝账号用户支付</div>
        </div>
        <div class="isCheck">
          <van-radio name="alipay"></van-radio>
        </div>
      </div>
      <div class="pay">
        <div class="pic">
          <img src="../assets/images/wechat-pay.jpeg" alt=""/>
        </div>
        <div class="desc">
          <div class="pay-name">微信支付</div>
          <div class="tips">推荐有微信账号用户支付</div>
        </div>
        <div class="isCheck">
          <van-radio name="wechat"></van-radio>
        </div>
      </div>
    </van-radio-group>
    </div>
    <div class="order-pay-btn">
    <van-button type="primary" size="large" @click="handleToPay">确认支付</van-button>
    </div>
    <van-popup v-model:show="orderPayPopup" position="bottom" closeable :style="{ height: '65%' }">
      <template #default>
        <div class="pay-price">
          ￥{{orderInfo.totalAmount}}
        </div>
        <van-password-input
            :value="value"
            :error-info="errorInfo"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
        />
        <van-number-keyboard
            v-model="value"
            :show="showKeyboard"
            @blur="showKeyboard = false"

        />
      </template>
    </van-popup>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar/index.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { orderIsPay } from '../api/api'

const router = useRouter()
const route = useRoute()
import { Toast } from 'vant';

onMounted(()=>{
 const {order_no,totalAmount}= route.query;
  console.log(route.query)
 orderInfo.order_no = order_no
 orderInfo.totalAmount = totalAmount
})
// 订单信息
const orderInfo = reactive({
  order_no:'',
  totalAmount:''
})

const handleToPay = ()=>{
  orderPayPopup.value = true
}
// 单选框
const orderPayChecked = ref('alipay');
// 支付框弹出
const orderPayPopup = ref(false)
// 密码框
const value = ref('');
const errorInfo = ref('');
// 获取焦点
const showKeyboard = ref(true);

watch(value, (newVal) => {
  if (newVal.length === 6 && newVal === '123456') {
    // 密码输入正确 发送请求 修改订单支付状态
    const data = {order_no:orderInfo.order_no}
    console.log(data)
    orderIsPay(data).then(res=>{
      console.log(res)
      if (res.data.ok === 1){
        Toast.success('支付成功!');
        // 先跳回首页，后面跳转到订单详情  把订单号传过去
        router.push({name:'OrderDetail',params:data})
      }
    })
    return
  }
  if (newVal.length === 6 && newVal !== '123456') {
    errorInfo.value = '密码错误';
  } else {
    errorInfo.value = '';
  }
});
</script>

<style lang="less">
.pay-container{
  height: 100%;
  width: 100%;
  background-color: #f7f8fa;
  .cell-price{
    background-color: #fff;
    box-sizing:border-box;
    padding: 0 0.3rem;
    height: 1rem;
    width: 100%;
    font-size: 0.36rem;
    display: flex;
    align-items: center;

  }
  .pay-way{
    box-sizing:border-box;
    padding: 0 0.3rem;
    margin-top: 0.4rem;
    background-color: #fff;
    .title{
      height: 2rem;
      font-size: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 0.02rem solid rgba(201, 203, 205, 0.25);
    }
    .pay{
      border-bottom: 0.02rem solid rgba(201, 203, 205, 0.25);
      display: flex;
      height: 1.6rem;
      align-items: center;
      .pic{
        height: 0.6rem;
        width: 0.6rem;
        margin-right: 0.2rem;
        img{
          height: 100%;
          width: 100%;
        }
      }
      .desc{
        height: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 0.2rem;
        .tips{
          color: #b8b8b8;
        }
      }
    }
  }
  .order-pay-btn{
    box-sizing:border-box;
    padding: 0 0.2rem;
    margin-top: 0.4rem;

  }
  .pay-price{
    font-size: 0.6rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>