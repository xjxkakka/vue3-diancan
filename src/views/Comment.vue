<template>
<div class="comment-container">
  <div class="top">
    <NavBar title="订单评论"></NavBar>
  </div>
  <div class="center">
    <div class="star">
      <div class="title">
        商品评价
      </div>
      <van-rate
          v-model="state.star"
          :size="25"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
      />
    </div>
    <div class="text-content">
        <van-field
            v-model="state.message"
            rows="2"
            autosize
            type="textarea"
            maxlength="100"
            placeholder="请输入评论内容"
            show-word-limit
        />
    </div>

    <div class="uploader">
      <van-divider>上传图片</van-divider>
      <van-uploader v-model="state.fileList" multiple :after-read="afterRead" />
      <div class="comment-btn">
        <van-button type="primary" @click="handleSubComment">评论</van-button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import NavBar from '../components/NavBar/index.vue'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { reqSubmitComment } from '../api/api'
import { Toast } from 'vant';
const route = useRoute()
const router = useRouter()

const state = reactive({
  order_no:'',
  star:0,// 星星颗数
  message:'',// 评论内容
  fileList:[], // 上传的图片
})
onMounted(()=>{
  if (route.query.order_no){
    state.order_no = route.query.order_no
  }
})


// 如果需要处理 可以在这里上传后 获取到数据然后处理
const afterRead =  (event) =>  {
  //console.log(event)

  // if (/\/(?:jpeg|png)/i.test(event.file.type) && event.file.size > 50000) {
  //   // 创建Canvas对象(画布)
  //   let canvas = document.createElement('canvas');
  //   // 获取对应的CanvasRenderingContext2D对象(画笔)
  //   let context = canvas.getContext('2d');
  //   // 创建新的图片对象
  //   let img = new Image();
  //   // 指定图片的DataURL(图片的base64编码数据)
  //   img.src = event.content;
  //   // 监听浏览器加载图片完成，然后进行进行绘制
  //   img.onload = () => {
  //     // 指定canvas画布大小，该大小为最后生成图片的大小
  //     canvas.width = 400;
  //     canvas.height = 300;
  //     /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
  //   如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/
  //
  //     context.drawImage(img, 0, 0, 400, 300);
  //     // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
  //     //console.log(event.file.type);
  //     event.content = canvas.toDataURL(event.file.type, 0.92);
  //     //console.log(event.content);
  //
  //
  //   };
  // }
}
// 提交评论
const handleSubComment = ()=>{
  Toast.loading({
    duration: 0,
    forbidClick: true,
    message: '提交中...',
  });
  // const data = JSON.stringify(state)
  // console.log(data)
  // 需要传入 订单号和评论内容
  reqSubmitComment({ state:JSON.stringify(state), order_no:state.order_no} ).then(res=>{
    console.log(res)
    if (res.data.ok === 1){
      Toast.loading({
        duration: 1000,
        forbidClick: true,
        message: '已评论!',
        type:'success'
      });
      router.push('/orderlist')
    }
  })
}
</script>

<style lang="less" >
.comment-container{
  height: 100vh;
  width: 100%;
  background-color: #f7f8fa;
  .center{
    .star{
      height: 3rem;
      background-color: #fff;
      .title{
        height: 1.6rem;
        display: flex;
        justify-content: center;
        line-height: 2rem;
        font-size: 0.4rem;
      }
      .van-rate{
        display: flex;
        justify-content: center;
      }
    }
    .text-content{
      margin-top: 0.4rem;
      width: 100%;
    }
    .uploader{
      height: 100%;
      width: 100%;
      background-color: #fff;
      .van-divider{
        padding: 0.2rem 0;
      }
      .van-uploader{
        padding-bottom: 0.2rem;
        padding-left: 0.2rem;
      }
      .comment-btn{
        box-sizing:border-box;
        width: 100%;
        padding: 0 0.2rem;
        .van-button{
          width: 100%;
        }
      }
    }
  }
}
</style>