<template>
  <TopNav></TopNav>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item><img
        src="https://img0.baidu.com/it/u=2074560261,4001171369&fm=253&fmt=auto&app=138&f=JPEG?w=550&h=365" alt="">
    </van-swipe-item>
    <van-swipe-item><img
        src="https://img2.baidu.com/it/u=3857505570,1696752544&fm=253&fmt=auto&app=138&f=JPEG?w=749&h=500" alt="">
    </van-swipe-item>
    <van-swipe-item><img
        src="https://img0.baidu.com/it/u=125278625,3210248731&fm=253&fmt=auto&app=138&f=JPEG?w=472&h=355" alt="">
    </van-swipe-item>
    <van-swipe-item><img
        src="https://img2.baidu.com/it/u=2842514113,2856952473&fm=253&fmt=auto&app=120&f=JPEG?w=650&h=434" alt="">
    </van-swipe-item>
  </van-swipe>


  <van-grid :column-num="3" class="menu-grid">
    <template v-for="item in gridItem" :key="item.active">
    <van-grid-item :text="item.text" @click="handleGoMenu(item.active)">
      <template #icon>
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="item.icon"></use>
        </svg>
      </template>
    </van-grid-item>
    </template>

  </van-grid>

  <Footer :active="0"></Footer>

</template>

<script setup>
import TopNav from '../components/TopNav/index.vue'
import Footer from '../components/Footer/index.vue'
import { useRouter } from 'vue-router'

const gridItem = [
  {
    text: '热菜',
    icon: '#icon-kaoji',
    active:0
  },
  {
    text: '凉菜',
    icon: '#icon-liangcai-',
    active:1
  },
  {
    text: '甜点',
    icon: '#icon-tiandian-',
    active:2
  },
  {
    text: '汤',
    icon: '#icon-tang',
    active:3
  },
  {
    text: '饮料',
    icon: '#icon-yinliao',
    active:4
  },
  {
    text: '大杂烩',
    icon: '#icon-mifan',
    active:5
  },
]

const router = useRouter()
// 点击跳转
const handleGoMenu = (active)=>{
  router.push({name:'Classify',params:{active}})
}
</script>

<style lang="less" scoped>
.van-swipe-item {
  margin-top: 0.8rem;
}

.van-swipe-item img {
  height: 3.6rem;
  width: 100%;
}


.menu-grid {
  height: 4rem;
  width: 100vw;

  .icon {
    width: 1rem;
    height: 1rem;
  }

}
</style>