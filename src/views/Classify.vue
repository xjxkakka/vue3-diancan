<template>
  <TopNav></TopNav>
  <van-tabs v-model:active="activeTabs" class="tabs-wrap">
    <van-tab title="点餐">
      <!--  使用gird布局  -->
      <div class="menu">

        <van-sidebar class="leftSideBar" v-model="activeSidebar" @change="changeActiveSidebar">
          <van-sidebar-item :badge="foodName.sum" :title="foodName.name" v-for="foodName in menuList"
                            :key="foodName.id"/>
        </van-sidebar>

        <div class="menu-wrap" ref="menuRef">
          <div class="menu-list" v-for="item in menuList" :key="item.id">
            <h2>{{ item.name }}</h2>
            <van-card
                v-for="card in item.menu" :key="card.id"
                :price="card.price + '.00'"
                :desc="card.desc"
                :title="card.title"
                :thumb="card.pic"
            >
              <template #num>
                <van-stepper v-model="card.count" button-size="20" min="0" theme="round"
                             @plus="changeCount(item.id,card,null)" @minus="changeCount(item.id,card,null)"

                />
              </template>
            </van-card>
          </div>
        </div>
      </div>
      <!--      <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">-->
      <van-submit-bar :price="totalPrice" button-text="提交订单" :disabled="totalCount<=0"
                      @submit="onSubmit" style="background: rgb(206,201,201)">
        <template #default>
          <svg class="icon" aria-hidden="true" style="width: 2em;height: 2em" @click="showPopup">
            <use xlink:href="#icon-gouwuche" :style="totalPrice>0?'color:red':''"></use>
          </svg>
          <span style="margin-left: 0.2rem">共:{{ totalCount }}件</span>
        </template>
      </van-submit-bar>
      <!-- 购物车弹出层 -->
      <van-popup v-model:show="isShowPopup" position="bottom" :style="{ height: '40%' }">
        <div class="popup-wrap">
          <div class="topTitle">
            <div>购物车</div>
            <div @click="clearCartList">清空购物车</div>
          </div>
          <div class="cartList">
            <div class="cartItem" v-for="cart in cartList" :key="cart.id">
              <van-card
                  :price="cart.price+'.00'"
                  :title="cart.title"
                  :thumb="cart.pic"
              >
                <template #num>
                  <van-stepper v-model="cart.count" button-size="20" min="0" theme="round"
                               @plus="changeCount(cart.fid,cart,'cart')" @minus="changeCount(cart.fid,cart,'cart')"
                  />
                </template>
              </van-card>
            </div>
          </div>
        </div>
      </van-popup>
    </van-tab>
    <van-tab title="评价">
      <div class="comment-main">
        <div class="comment-wrap">
          <div class="comment-item" v-for="(item,i) in commentList" :key="i">
            <div class="user">
              <div class="pic">
                <img
                    src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2F80%2Fv2-c1748343e68d08167b4c950fb54c4bf6_720w.jpg%3Fsource%3D1940ef5c&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660114139&t=5645baac0bb7091bea6fcfdeedd09bb6"/>
              </div>
              <div class="msg">
                <div class="name">{{ item.username }}</div>
                <div class="time">{{ item.create_time }}</div>
              </div>
            </div>
            <div class="title-wrap">
              <div class="title">{{ item.comment.message }}</div>
              <div class="pic">
                <template v-if="item.comment.fileList.length !== 0">
                  <van-image
                      v-for="(Img,ImgIndex) in item.comment.fileList" :key="ImgIndex"
                      width="2rem"
                      height="2rem"
                      fit="cover"
                      :src="Img.content"
                      @click="handleImg(item.comment.fileList,ImgIndex)"
                  />
                </template>

              </div>
            </div>
          </div>
        </div>
      </div>
    </van-tab>
  </van-tabs>
  <Footer :active="1"></Footer>
  <van-image-preview v-model:show="ImageShow" :images="images" @change="onChangeImage"
                     :start-position="startPositionIndex">
    <template #index="{index}">
      {{ ImageIndex }}/{{ images.length }}
    </template>
  </van-image-preview>
</template>

<script>
import { ref, reactive, toRefs, computed, onMounted, nextTick, watch, onUnmounted } from "vue";
import { useStore } from 'vuex'
import TopNav from '../components/TopNav/index.vue'
import Footer from '../components/Footer/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { Dialog ,Toast  } from 'vant';
import { getCommentList } from '../api/api'
import smoothscroll from 'smoothscroll-polyfill';
export default {
  name: "Classify",
  components: { Footer, TopNav },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      activeTabs: 0,
      activeSidebar: 0,
      // 每个元素距离顶部的高度
      everyTop: [],
      flag: false,
      isShowPopup: false
    })
    const menuRef = ref(null)

    // 评论列表
    const commentList = ref([])
    // 图片预览
    const ImageShow = ref(false)
    const ImageIndex = ref(1);
    // 指定图片索引
    const startPositionIndex = ref(0)
    //
    let images = ref([]);
    const onChangeImage = (newIndex) => {
      ImageIndex.value = newIndex + 1;
    };
    // 点击当前图片
    const handleImg = (value, index) => {
      console.log(value, index)
      // 获取到当前点击的图片索引，以及全部图片 替换掉上面的images
      images.value = []
      images.value = value.map(item => {
        return item.content
      })
      // 并且把指定图片索引修改，点击那个图片索引改为哪个
      startPositionIndex.value = index
      // 让图片展示
      ImageShow.value = true
      console.log(images)
    }
    // 图片预览

    // 用计算属性获取菜单列表
    const menuList = computed(() => {
      return store.state.foodsInfo
    })

    // 购物车列表
    const cartList = computed(() => {
      // 通过
      return store.state.cartFoods
    })

    onMounted(() => {
      // 初始化高度 兼容safari
      initHeight()
      // 获取评论列表
      getCommentList().then(res => {
        console.log(res)
        if (res.data.res.length !== 0) {
          commentList.value = res.data.res.map(item => {
            item.comment = JSON.parse(item.comment)
            return item
          })
        }
      })
      //发送vuex请求获取食物菜单
      store.dispatch('getMenu');

      nextTick(() => {

        setTimeout(() => {
          document.querySelectorAll(".menu-list").forEach(item => {
            state.everyTop.push(item.offsetTop)
          })
          // console.log(state.everyTop)
          // 判断如果带有active进来的话就直接滚动到那个菜单名
          if (route.params.active) {
            const active = Number(route.params.active)
            state.activeSidebar = active
            document.querySelector(".menu-wrap").scrollTo({
              top: state.everyTop[active],
              behavior: 'smooth'
            })

          }
          // 开启滚动条监听事件
          document.querySelector(".menu-wrap").addEventListener("scroll", rightScroll, true);
        }, 600)
      })


    })

    // 防抖
    let timer;
    // 右侧滚动条事件
    const rightScroll = (e) => {
      // 设置个变量在这里 如果是点击左侧滚动的话就不执行这里
      if (state.flag === true) return
      // console.log(123)
      clearTimeout(timer)
      // 防抖
      timer = setTimeout(() => {
        // 滚动了多少
        const scrollTop = document.querySelector(".menu-wrap").scrollTop
        // console.log(scrollTop)
        // 遍历返回当前滚动到哪个区域
        state.everyTop.some((item, index) => {
          // 首先判断下是不是最后一个 是最后一个的话在判断是否 item 是否小于滚动条的值 是话的直接赋值
          if (!state.everyTop[index + 1]) {
            if (item < scrollTop) {
              state.activeSidebar = index
            }
          } else {
            // 返回 item 小于 当前滚动值 并且要比下一个值小 的index
            if (item < scrollTop && state.everyTop[index + 1] > scrollTop) {
              state.activeSidebar = index
            }
          }
        })
      }, 300)

    }

    // 左侧点击后高亮发生改变 右侧滚动条也要发生改变
    const changeActiveSidebar = (index) => {
      state.flag = true
      console.log(index)
      smoothscroll.polyfill();
      document.querySelector(".menu-wrap").scrollTo({
        top: state.everyTop[index],
        behavior: 'smooth'
      })

    }
    // 监听下 flag 如果变为true后500 ms 后变回false
    let t2;
    watch(() => state.flag, () => {
      // 如果为true 500毫秒后变回false
      if (state.flag) {
        clearTimeout(t2)
        t2 = setTimeout(() => {
          state.flag = false
        }, 1000)
      }
    })

    // 更改数量
    let changeCountTimer;
    const changeCount = (id, card, type) => {
      console.log(type, 189)
      // console.log(2222)
      // console.log(id,card)
      clearTimeout(changeCountTimer)
      changeCountTimer = setTimeout(() => {
        // console.log(id,card,count)
        // 拿到后派发 action changeCount
        store.dispatch('changeCount', { id, card, type })
      }, 300)

    }
    let changeCartCountTimer;
    const changeCartCount = (id, card) => {
      console.log(1111)
      clearTimeout(changeCartCountTimer)
      changeCartCountTimer = setTimeout(() => {
        // console.log(id,card,count)
        // 拿到后派发 action changeCount
        store.dispatch('changeCount', { id, card })
      }, 300)

    }

    // 添加到购物车的总数量
    const totalCount = computed(() => {
      return store.getters.totalCount
    })
    const totalPrice = computed(() => {
      return store.getters.totalPrice * 100
    })

    // 购物车弹出层
    const showPopup = () => {
      state.isShowPopup = true;
    };
    // 清空购物车
    const clearCartList = () => {
      Dialog.confirm({
        title: '提示',
        message:
            '您确认要清空购物车吗？',
      })
          .then(() => {
            store.dispatch("clearCartList")
          })
          .catch(() => {
            // on cancel
          });
    }
    // 监听购物车列表为空自动关闭
    watch(() => cartList.value, () => {
      if (cartList.value.length === 0) {
        state.isShowPopup = false
      }
    })

    // 提交订单
    const onSubmit = () => {
      router.push('/orderpreview')
    }


    // 兼容safari浏览器
  let windowVH  = null;
    const initHeight = () =>{
        windowVH = window.innerHeight / 100
        // 设置 css 全局变量
        document.documentElement.style.setProperty('--vh', windowVH + 'px')

      // 这里判断是否横屏
      let i = 'orientationchange' in window ? 'orientationchange' : 'resize'

      window.addEventListener(i, initHeight)
    }
    // 事件卸载
    onUnmounted(()=>{
      // 把定时器 监听都卸载
      clearTimeout(changeCartCountTimer)
      window.removeEventListener('orientationchange',initHeight)
      window.removeEventListener('resize',initHeight)
    })
    return {
      onSubmit, menuRef, ImageShow, images, onChangeImage, ImageIndex, commentList, startPositionIndex,
      ...toRefs(state), menuList, changeCartCount, clearCartList,
      changeActiveSidebar, showPopup, cartList,
      changeCount, totalCount, totalPrice, handleImg
    };
  },
}
</script>

<style lang="less">
:root {
  --vh: null;
}
.tabs-wrap {
  margin-top: 0.8rem;
}

.menu {
  box-sizing: border-box;
  width: 100%;
  //height: calc(100vh - 3.7rem);
  height: calc(var(--vh) * 100 - 3.7rem);

  padding-top: 0.2rem;
  // 开启 grid 布局
  display: grid;
  // 代表分成 2列 一列80px宽度 一列是剩余的铺满
  grid-template-columns: 1.6rem 1fr;
  // 两列之间的间隙
  gap: 0.1rem;
  overflow: hidden;

  .leftSideBar {
    max-height: 11.4rem;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0 !important;
    }

    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0;
    }
  }

  .menu-wrap {
    width: 100%;
    //height: 11.4rem;
    height: 100%;
    //overflow: hidden;
    position: relative;
    overflow-y: scroll;
    //white-space: nowrap;
    &::-webkit-scrollbar {
      width: 0 !important;
    }

    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0;
    }

    .menu-list {
      box-sizing: border-box;

      .van-card {
        background-color: #fff;
      }
    }
  }

  .van-badge__wrapper {
    width: 1rem;
  }
}


.van-submit-bar {
  position: fixed;
  bottom: 1rem !important;
}

.popup-wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.3rem;

  .topTitle {
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cartList {
    height: 4.16rem;
    width: 100%;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      width: 0 !important;
    }

    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0;
    }
  }
}

// 评价
.comment-main {
  box-sizing: border-box;
  height: calc(var(--vh) * 100 - 1.8rem - 1rem);
  width: 100%;
  overflow: hidden;

  .comment-wrap {
    height: 100%;
    width: 100%;
    position: relative;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0 !important;
    }

    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0;
    }

    .comment-item {
      box-sizing: border-box;
      padding: 0.2rem;
      border-bottom: 0.02rem solid rgba(170, 170, 170, 0.39);

      &:last-child {
        border-bottom: 0;
      }

      .user {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;

        .pic {
          width: 0.8rem;
          height: 0.8rem;
          margin-right: 0.2rem;

          img {
            width: 100%;
          }
        }

        .msg {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 0.8rem;
          width: 100%;

          .name {
            font-weight: bold;
            font-size: 0.3rem;
          }

          .time {
            font-size: 0.24rem;
            color: #8c8c8c;
          }
        }
      }
    }


    .title-wrap {
      .title {
        padding: 0.2rem 0;
      }

      .pic {
        .van-image {
          margin-right: 0.2rem;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>