import { createRouter, createWebHistory ,createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Classify from "../views/Classify.vue";
import Address from '../views/Address.vue'
import AddressEdit from '../views/AddressEdit.vue'
import OrderList from '../views/OrderList.vue'
import Comment from '../views/Comment.vue'
import Profile from '../views/Profile.vue'
import store from '../store/index'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login/login.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Login/reg.vue'),
    },
    {
        path: '/orderpreview',
        name: 'OrderPreview',
        component: () => import('../views/OrderPreview.vue'),
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/address',
        name: 'Address',
        component: () => import('../views/Address.vue'),
    },
    {
        path: '/addressedit',
        name: 'AddressEdit',
        component: () => import('../views/AddressEdit.vue'),
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),

    },
    {
        path: '/classify',
        name: 'Classify',
        component: () => import('../views/Classify.vue'),
    },
    {
        path: '/orderpay',
        name: 'OrderPay',
        component: () => import('../views/OrderPay.vue'),
    },
    {
        path: '/orderdetail',
        name: 'OrderDetail',
        component: () => import('../views/OrderDetail.vue'),
    },
    {
        path: '/orderlist',
        name: 'OrderList',
        component: () => import('../views/OrderList.vue'),
    },
    {
        path: '/comment',
        name: 'Comment',
        component: () => import('../views/Comment.vue'),
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path==='/login'){
        next()
    }else if (!localStorage.getItem("token")){
        next('/login')
    }else if(from.path==='/orderdetail' && to.path === '/orderpay'){
        next('/orderlist')
    }else{
        next();
    }
    // if(to.name==='OrderPreview'){
    //     //不管从哪个页面来，只要是去到OrderPreview页面，都将OrderPreview页面添加到缓存区
    //     store.commit('setKeepAlive','OrderPreview')
    // }
    // 如果是在订单列表跳转，去的是订单详情把订单列表缓存起来

        //登录进来后全部放行
        // if (from.name === 'OrderList' && to.name === 'OrderDetail') {
        //     store.commit('setKeepAlive', 'OrderList')
        // }
        // // 如果从订单列表不是去订单详情就删除订单列表的缓存
        // if (from.name === 'OrderList' && to.name !== 'OrderDetail') {
        //     store.commit('removeKeepAlive', 'OrderList')
        // }

})

export default router
