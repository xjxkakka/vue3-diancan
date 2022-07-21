<template>

  <div class="orderList-container">

    <div class="nav-top">
      <div class="title">
        <h3>小五餐厅</h3>
      </div>
      <van-tabs v-model:active="tabsActive" @click-tab="onClickTab" style="z-index:999">
        <van-tab title="全部订单"></van-tab>
        <van-tab title="未付款"/>
        <van-tab title="已送出"/>
        <van-tab title="待评价"/>
      </van-tabs>
    </div>

    <div class="order-center">

      <div v-if="orderList.length !== 0">
        <div class="goods-wrap" v-for="item in orderList" :key="item.id">
          <div class="shop-name">
            <div class="name">
              <van-icon name="shop-o"/>
              小五餐厅
            </div>
            <div class="status">
              <van-tag type="danger" v-if="item.status == 0">未付款</van-tag>
              <van-tag type="warning" v-else-if="item.status == 1">已送出</van-tag>
              <van-tag type="success" v-else-if="item.status == 2">已完成</van-tag>
            </div>
          </div>
          <div class="foods">
            <div class="foods-item" v-for="goods in item.goods" :key="goods.id" @click="handleToDetail(item)">
              <div class="pic">
                <img :src="goods.pic" alt="">
              </div>
              <div class="desc">
                <div class="title">{{ goods.title }}</div>
                <div class="price">￥{{ goods.price }}.00</div>
              </div>
              <div class="count">
                x{{ goods.price }}
              </div>
            </div>
            <div class="foods-total">
              小计: ￥ <span>{{ item.totalAmount }}.00</span>
            </div>
          </div>
          <div>
            <div class="order-btn">
              <van-button type="default" size="mini">删除订单</van-button>
              <van-button type="danger" size="mini" v-if="item.status == 0" @click="handlePay(item.order_no)">去支付
              </van-button>
              <van-button type="primary" size="mini" v-else-if="item.status == 1" @click="handleOrderConfirm(item.order_no)">确认收货</van-button>
              <van-button type="default" size="mini" v-else-if="item.status == 2 && item.is_comment != 1" @click="handleToComment(item.order_no)">去评价</van-button>
              <!--            <van-button type="default" size="mini">点击查看详情</van-button>-->
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <van-empty image="search" description="您还没有相关订单" />
      </div>
    </div>
    <div class="footer">
      <Footer :active="2"></Footer>
    </div>
  </div>

  <!-- 密码弹出窗 -->
  <van-popup v-model:show="state.password_popup_show" closeable position="bottom" @close="handleClosePopup"
             :style="{ height: '60%' }">
    <template #default>
      <div class="pay-wrap">
        <div class="order_no">
          订单号:{{ state.order_no }}
        </div>
        <van-password-input
            :value="password"
            info="密码为 6 位数字"
            :error-info="errorInfo"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
        />
        <van-number-keyboard
            v-model="password"
            :show="showKeyboard"
            @blur="showKeyboard = true"
        />
      </div>
    </template>
  </van-popup>
</template>

<script>
export default {
  name: 'OrderList'
}
</script>
<script setup>
import TopNav from '../components/TopNav/index.vue'
import Footer from '../components/Footer/index.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { orderIsPay, reqGetOrdersList, reqOrderConfirm } from '../api/api'
import { Toast } from 'vant';
import { useRouter } from 'vue-router'

const router = useRouter()
const state = reactive({
  // 输入密码弹窗
  password_popup_show: false,
  // 当前支付的订单号信息
  order_no: '',
  status: 3,
  is_comment: 1, // 这个不需要改动

})
// 点击标签页
const onClickTab = ({ name }) => {
  if (name === 0) {
    // 全部订单
    state.status = 3
    getOrderList()
  } else if (name === 1){
    // 未付款
    state.status = 0
    getOrderList()

  }else if (name === 2) {
    // 已送出/已支付
    state.status = 1
    getOrderList()

  } else if (name === 3) {
    // 待评价
    state.status = -1
    getOrderList()
  }
}
// 所有订单
const orderList = ref([])
// 封装请求方法
const getOrderList = () => {
  // 0代表未支付 1代表已支付发出，2代表还未确认收货，3 获取所有订单 要查询待评价的订单需要把status改为 -1
  reqGetOrdersList({ status: state.status, is_comment: state.is_comment }).then(res => {
    orderList.value = res.data.data
  })
}
onMounted(() => {
  getOrderList();
})
// 遮罩层关闭
const handleClosePopup = () => {
  password.value = ''
}
// 点击支付按钮
const handlePay = (order_no) => {
  state.order_no = order_no
  // 点击支付按钮
  state.password_popup_show = true
}
// 点击确认收货
const handleOrderConfirm = (order_no)=>{
  Toast.loading({
    duration: 0,
    forbidClick: true,
    message: '确认收货中...',
  });
  reqOrderConfirm({order_no}).then(res=>{
    if (res.data.ok === 1){
      Toast.loading({
        duration: 1000,
        type:'success',
        forbidClick: true,
        message: '确认收货成功!',
      });
      getOrderList();
    }
  })
}
// 点击去评价
const handleToComment = (order_no)=>{
  router.push({name:'Comment',query:{order_no}})
}
// 控制tab的变量
const tabsActive = ref(0)

// 密码输入框 S
const password = ref('');
const errorInfo = ref('');
const showKeyboard = ref(true);

watch(password, (newVal) => {
  if (newVal.length === 6 && newVal !== '123456') {
    errorInfo.value = '密码错误';
  } else {
    errorInfo.value = '';
  }
  // 密码正确发送请求
  if (newVal.length === 6 && newVal === '123456') {
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '支付中...',
    });
    orderIsPay({ order_no: state.order_no }).then(res => {
      console.log(res)
      if (res.data.ok === 1) {
        Toast.clear();
        Toast.loading({
          duration: 1000,
          type: 'success',
          forbidClick: true,
          message: '支付成功!',
        });
        // 重新获取订单
        getOrderList()
        // 密码框清空 弹窗关闭
        password.value = ''
        state.password_popup_show = false;
      }
    })
  }
});
// 密码输入框 E

//点击商品跳转至订单详情
const handleToDetail = ({order_no})=>{
  // console.log(order_no)
  router.push({name:'OrderDetail',params:{order_no}})
}
</script>

<style lang="less">

.orderList-container {
  position: relative;
  box-sizing: border-box;
  padding-bottom: 1rem;
  width: 100%;
  height: 100%;

  .nav-top {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;

    .title {
      height: 0.8rem;
      line-height: 0.8rem;
      background-color: rgb(255, 165, 50);

      h3 {
        text-align: center;
        color: white;
        font-size: 0.32rem;
      }
    }

  }

  .footer {
    height: 1rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .order-center {
    box-sizing: border-box;
    height: 100%;
    padding-top: 1.8rem;
  }

  .goods-wrap {
    margin: 0.4rem auto;
    padding: 0 0.3rem;
    box-sizing: border-box;
    width: 93%;
    background-color: #fff;
    border-radius: 0.2rem;
    box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.1);

    .shop-name {
      display: flex;
      justify-content: space-between;
      padding: 0.1rem 0;
    }

    .foods {
      box-sizing: border-box;

      .foods-item {
        display: flex;
        padding: 0.3rem 0;

        .pic {
          height: 1rem;
          width: 1rem;
          margin-right: 0.2rem;

          img {
            height: 100%;
            width: 100%;
          }
        }

        .desc {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          height: 1rem;

          .title {
            font-size: 0.28rem;
          }

          .price {
            font-size: 0.3rem;
          }
        }

        .count {
          width: 0.4rem;
          height: 1rem;
          display: flex;
          align-items: flex-end;
          color: #8c8c8c;
        }
      }

      .foods-total {
        height: 1rem;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }

    .order-btn {
      padding-bottom: 0.2rem;
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }

}

.pay-wrap {
  .order_no {
    height: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>