<template>
  <div class="search-wrap">
    <div class="search">
      <div class="return" @click="handleReturn">
        <van-icon name="arrow-left"/>
      </div>
      <h3>订单确认</h3>
    </div>
  </div>

  <div class="container">
    <div class="address-wrap" @click="handleToAddress">
      <template v-if="userAddress.name">
        <div class="contact">
          <span>{{ userAddress.name }}</span>
          <span>{{ userAddress.phone || userAddress.tel }}</span>
        </div>
        <div class="address">
          {{ userAddress.province }}{{ userAddress.city }}{{ userAddress.county }}{{ userAddress.address }}
        </div>
      </template>
      <div class="no-address" v-else>
        还没设置收货地址，请点击此处设置收货地址
      </div>
      <div class="edit">
        <van-icon name="arrow"/>
      </div>
    </div>

    <div class="foods-list">
      <div class="title">商品清单</div>
      <div class="food-item" v-for="(item,index) in cartList" :key="index">
        <div class="pic">
          <img
              :src="item.pic"
          />
        </div>
        <div class="info">
          <div class="dishName">
            {{ item.title }}
          </div>
          <div class="saleInfo">
            <div class="price">￥{{ item.price }}.00</div>
            <div class="count">x{{ item.count }}</div>
          </div>
        </div>
      </div>


      <div class="total-price">
        小计: <span>￥{{ $store.getters.totalPrice }}.00</span>
      </div>
    </div>

    <div class="privacy-wrap">
      <div class="privacy">
        <div class="privacy-phone">
          号码保护
          <van-switch v-model="phoneChecked" size="0.4rem"/>
        </div>
        <div class="tips">
          <div>对商家、骑手隐藏您的真实手机号码，保护您的隐私</div>
          <div style="color: #f8b83f">为保障服务质量，开启号码保护的订单通话可能会被录音</div>
        </div>
      </div>
    </div>

    <div class="pay-way">
      <van-cell-group>
        <van-cell title="支付方式" value="在线支付"/>
        <van-cell title="备注" :value="orderRemark" @click="handleRemark" is-link/>
        <van-cell title="发票" value="本店不支持发票"/>

      </van-cell-group>
    </div>

  </div>
  <div class="submit-bar">
    <div class="total">
      合计: <span>￥{{ $store.getters.totalPrice }}.00</span>
    </div>
    <div class="btn">
      <van-button round @click="handleSub" color="linear-gradient(to right, #ff6034, #ee0a24)">
        提交订单
      </van-button>
    </div>
  </div>
  <van-popup v-model:show="isShowPopup"
             @click-overlay="handleClosePopup" @click-close-ico="handleClosePopup"
             closeable position="bottom" round :style="{ height: '50%' }">
    <template #default >
      <div class="popup-title">
        订单备注
      </div>
      <div class="remark-text">
        <van-cell-group inset>
          <van-field
              v-model="remark_message"
              rows="2"
              autosize
              type="textarea"
              maxlength="50"
              placeholder="请输入备注"
              show-word-limit
          />
        </van-cell-group>
      </div>
      <div class="popup-btn">
      <van-button round color="linear-gradient(to right, #ff6034, #ee0a24)" @click="handleSaveRemark">
        确认
      </van-button>
      </div>
    </template>
  </van-popup>
</template>

<script>
export default {
  name: 'OrderPreview'
}
</script>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, reactive, ref } from 'vue'
import { Toast,Popup } from 'vant';
import { useStore } from 'vuex'
import { createOrders, getAddress } from '../api/api'

const route = useRoute()
const router = useRouter()
const store = useStore()
const handleReturn = () => {
  router.back()
}
onMounted(() => {
  console.log(123)
  // 避免冲突 如果是 地址列表回来的 不在发送请求获取地址
  if (route.params.newAddress) {
    console.log(route.params.newAddress)
    userAddress.value = JSON.parse(route.params.newAddress)
  } else {
    // 发请求获取收货地址
    getAddress({ token: localStorage.getItem("token") }).then(res => {
      // console.log(res)
      if (res.data.length !== 0) {
        res.data.forEach(item => {
          // console.log(item)
          if (item.is_default === '1') {
            userAddress.value = item
          }
        })
        // 如果name不存在代表没有设置默认地址 获取地址库的第一个地址
        if (!userAddress.value.name) {
          res.data.forEach((item, index) => {
            if (index === 0) {
              userAddress.value = item
            }
          })
        }
      }
    })


  }


})
// 获取用户地址
let userAddress = ref({})

const onEdit = () => Toast('edit');

// 购物车列表
const cartList = computed(() => {
  return store.state.cartFoods
})
// 订单备注信息
const orderRemark = ref('口味、偏好等要求')
// 订单备注弹窗
const isShowPopup = ref(false)
// 弹出层关闭，取消备注
const handleClosePopup = ()=>{
  remark_message.value = ''
}
// 点击备注
const remark_message = ref('')
const handleRemark = () => {
  isShowPopup.value = true
}
// 弹出层点击确认按钮
const handleSaveRemark = ()=>{
  orderRemark.value = remark_message.value
  isShowPopup.value = false
}
// 号码保护按钮
const phoneChecked = ref(false)
// 提交订单
const handleSub = () => {
  // const {  totalAmount , address ,create_time,goods } = req.body

  const data = {
    totalAmount:store.getters.totalPrice,
    address:JSON.stringify(userAddress.value),
    goods:JSON.stringify(cartList.value),
    remark:orderRemark.value==='口味、偏好等要求'?'':orderRemark.value
  }
  console.log(data)
  createOrders(data).then(res=>{
    // 清空购物车
    store.dispatch('clearCartList')
    console.log(res)
    router.push({name:'OrderPay',query:{order_no:res.data.order_no,totalAmount:data.totalAmount}})

  })
  // 提交订单 跳转支付页面
  Toast('下单成功，去支付');

}
// 点击地址跳转至地址库
const handleToAddress = () => {
  router.push({ name: 'Address', query: { type: 'order' } })
}

</script>

<style lang="less">
.search-wrap {
  width: 100%;
  height: 0.8rem;

  .search {
    z-index: 999;
    position: fixed;
    top: 0;
    height: 0.8rem;
    width: 100%;
    background-color: rgb(255, 165, 50);
    line-height: 0.8rem;

    .return {
      position: absolute;
      left: 0.4rem;
    }

    h3 {
      font-weight: 0;
      text-align: center;
      color: white;
      font-size: 0.32rem;
    }
  }
}

.container {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.3rem;

  .address-wrap {
    margin-top: 0.4rem;
    position: relative;
    width: 100%;
    height: 2rem;
    box-shadow: 0 0 0.1rem rgb(210, 206, 206);
    transform: translate3d(0, -0.04rem, 0);

    .contact {
      box-sizing: border-box;
      padding: 0 0.2rem;
      font-size: 0.26rem;
      height: 0.8rem;
      line-height: 1.2rem;

      span {
        margin-right: 0.2rem;
      }
    }

    .address {
      box-sizing: border-box;
      padding: 0 0.2rem;
      height: 0.8rem;
      font-size: 0.26rem;
      width: 6rem;
      margin-top: 0.1rem;
    }

    .no-address {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.26rem;
    }

    .edit {
      position: absolute;
      right: 0.2rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.4rem;

    }

    &::before {
      position: absolute;
      right: 0;
      bottom: 0.2rem;
      left: 0;
      height: 0.04rem;
      background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0);
      background-size: 1.6rem;
      content: '';
    }
  }

  .foods-list {
    box-sizing: border-box;
    padding: 0px 0.2rem;
    margin-top: 0.4rem;
    width: 100%;
    box-shadow: 0 0 0.1rem rgb(210, 206, 206);
    transform: translate3d(0, -0.04rem, 0);

    .title {
      font-size: 0.4rem;
      padding: 0.1rem 0;
      border-bottom: 0.02rem solid rgba(194, 192, 192, 0.5);
    }

    .food-item {
      box-sizing: border-box;
      padding: 0 0.2rem;
      background-color: rgba(217, 215, 215, 0.13);
      display: flex;
      margin: 0.2rem 0;
      height: 1.6rem;
      align-items: center;

      .pic {
        //height: 60px;
        width: 1.2rem;

        img {
          //height: 100%;
          width: 100%;
          border-radius: 15%;
        }

        padding: 0 0.1rem;
      }

      .info {
        height: 1.2rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .saleInfo {
          display: flex;
          justify-content: space-between;
        }
      }
    }

    .total-price {
      border-top: 0.02rem solid rgba(187, 185, 185, 0.47);
      display: flex;
      justify-content: right;
      align-items: center;
      width: 100%;
      height: 0.8rem;

      span {
        color: red;
      }
    }
  }

  .privacy-wrap {
    margin-top: 0.4rem;
    width: 100%;
    height: 2rem;
    box-shadow: 0 0 0.1rem rgb(210, 206, 206);

    .privacy {
      box-sizing: border-box;
      padding: 0 0.2rem;

      .privacy-phone {
        height: 0.7rem;
        display: flex;
        align-items: center;
        border-bottom: 0.02rem solid rgba(194, 192, 192, 0.5);
        padding-bottom: 0.1rem;
      }

      .tips {
        font-size: 0.26rem;
        height: 1rem;
        padding-top: 0.2rem;
      }
    }
  }

  .pay-way {
    margin: 0.4rem 0 1.4rem;
    //height: 100px;
    width: 100%;
    box-shadow: 0 0 0.1rem rgb(210, 206, 206);
  }
}

.submit-bar {
  width: 100%;
  height: 1rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content:flex-end;

  .total {
    font-size: 0.34rem;
    margin-right: 0.4rem;

    span {
      color: red;
    }
  }

  .btn {
    height: 0.8rem;
    width: 2rem;
    margin-right: 0.4rem;

    .van-button {
      height: 100%;
      width: 100%;
    }
  }
}
.popup-title{
  height: 1rem;
  width: 100%;
  font-size: 0.3rem;
  //line-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

  .popup-btn{
    position: absolute;
    bottom: 0.4rem!important;
    left: 0;
    height: 0.7rem;
    width: 100%;
    .van-button{
      width: 100%;
      height: 100%;
    }
  }


.remark-text{
.van-cell{
  background-color: #f3f3f3 !important;
}
}

</style>