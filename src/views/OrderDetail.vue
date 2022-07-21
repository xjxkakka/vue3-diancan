<template>
  <div class="order-detail-container">
    <div class="nav-top">
      <NavBar title="订单详情"></NavBar>
    </div>

    <div class="order-status">
      <div class="title">
        <span v-if="orderDetail[0].status == 0">未支付</span>
        <span v-else-if="orderDetail[0].status == 1">已送出</span>
        <span v-else-if="orderDetail[0].status == 2">已完成</span>
      </div>
      <div class="status">
        <span v-if="orderDetail[0].status == 0">该订单未支付,请前往我的订单支付</span>
        <span v-if="orderDetail[0].status == 1">该订单,已送出</span>
        <span v-if="orderDetail[0].status == 2">该订单,已完成</span>
      </div>
    </div>

    <div class="goods-wrap">
      <div class="shop-name">
        <van-icon name="shop-o"/>
        小五餐厅
      </div>
      <div class="foods">
        <div class="foods-item" v-for="item in orderDetail[0].goods" :key="item.id">
          <div class="pic">
            <img :src="item.pic" alt="">
          </div>
          <div class="desc">
            <div class="title">{{ item.title }}</div>
            <div class="price">￥{{ item.price }}.00</div>
          </div>
          <div class="count">
            x{{ item.count }}
          </div>
        </div>
        <div class="foods-total">
          小计: ￥ <span>{{orderDetail[0].totalAmount}}.00</span>
        </div>
      </div>
    </div>

    <div class="orderInfo">
      <div class="order-title">
        订单信息
      </div>
      <div class="order-item">
        <div class="field-left">
          订单号
        </div>
        <div class="field-right">
          {{ orderDetail[0].order_no }}
        </div>
      </div>
      <div class="order-item">
        <div class="field-left">
          配送地址
        </div>
        <div class="field-right">
          {{ orderDetail[0].address.address }}
        </div>
      </div>
      <div class="order-item">
        <div class="field-left">
          下单时间
        </div>
        <div class="field-right">
          {{ orderDetail[0].create_time }}
        </div>
      </div>
      <div class="order-item">
        <div class="field-left">
          支付方式
        </div>
        <div class="field-right">
          在线支付
        </div>
      </div>
    </div>
    <div class="bottom-tips">
      到底了 ~
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail'
}
</script>

<script setup>
import NavBar from '../components/NavBar/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { ordersInfo } from '../api/api'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  ordersInfo({ order_no: route.params.order_no }).then(res => {
    // console.log(res.data.data[0])
    orderDetail.value = res.data.data
    orderDetail.value.forEach(item => {
      item.address = JSON.parse(item.address)
      item.goods = JSON.parse(item.goods)
    })
    console.log(orderDetail.value)
  })

})
// 订单的所有信息
const orderDetail = ref([{
  status: 0,
  goods: {
    title: '',
    price: '',
    pic: '',
    count: '',
    totalAmount: 0
  },
  order_no: '',
  address: {
    address: ''
  },
  create_time:''
}])
</script>

<style lang="less">
.order-detail-container {
  height: 100vh;
  width: 100%;
  background-color: #f7f8fa;

  .order-status {
    margin: 0.4rem auto 0;
    padding: 0 0.3rem;
    box-sizing: border-box;
    height: 2rem;
    width: 93%;
    background-color: #fff;
    border-radius: 0.2rem;

    .title {
      height: 0.8rem;
      line-height: 0.8rem;
      border-bottom: 0.02rem solid #e8e8e8;
    }

    .status {
      height: 1.2rem;
      display: flex;
      align-items: center;
    }
  }

  .goods-wrap {
    margin: 0.4rem auto 0;
    padding: 0 0.3rem;
    box-sizing: border-box;
    width: 93%;
    background-color: #fff;
    border-radius: 0.2rem;

    .shop-name {
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
  }

  .orderInfo {
    margin: 0.4rem auto;
    padding: 0 0.3rem;
    box-sizing: border-box;
    width: 93%;
    background-color: #fff;
    border-radius: 0.2rem;

    .order-title {
      height: 0.8rem;
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 0.32rem;
    }

    .order-item {
      width: 100%;
      padding: 0.1rem 0;
      display: flex;

      .field-left {
        width: 2rem;
        color: #888888;
        font-size: 0.28rem;
      }

      .field-right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        font-size: 0.28rem;
        text-align: right;
      }
    }
  }

  .bottom-tips {
    width: 100%;
    color: #8c8c8c;
    display: flex;
    justify-content: center;
    font-size: 0.26rem;
  }
}
</style>