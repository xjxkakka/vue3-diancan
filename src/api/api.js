import request from "./request.js";

// 获取商品列表
export function getClassify(){
    return request({
        url:'/menuList',
        method:'get',
    })
}


// 增减商品
export function EditCarts(data){
    return request({
        url:'/menu',
        method:'post',
        data
    })
}
// 清空购购物车
export function clearClassify(){
    return request({
        url:'/reset/menu',
        method:'delete',
    })
}

// 校验账号密码
export function reqLogin(data){
    return request({
        url:'/login',
        method:'post',
        data
    })
}

// 注册
export function reqRegister(data){
    return request({
        url:'/register',
        method:'post',
        data
    })
}

// 获取地址  params 带上 用户token  这里没写好 应该在请求头上携带token 后端在请求头获取
export function getAddress(params){
    return request({
        url:'/address',
        method:'get',
        params
    })
}

// 添加地址
export function addAddress(data){
    return request({
        url:'/address',
        method:'post',
        data
    })
}
// 添加地址
export function delAddress(params){
    return request({
        url:'/address',
        method:'delete',
        params
    })
}

// 查询地址编码 /address/areaCode
export function getAddressCode(params){
    return request({
        url:'/address/areaCode',
        method:'get',
        params
    })
}
// 修改地址 需传id
export function EditAddress(data){
    return request({
        url:'/addressEdit',
        method:'post',
        data
    })
}

// 创建订单
export function createOrders(data){
    return request({
        url:'/orders',
        method:'post',
        data
    })
}

// 订单支付 需要传入订单号
export function orderIsPay(data){
    return request({
        url:'/ordersPay',
        method:'post',
        data
    })
}

// 查询订单  1代表已支付已送出  2代表已完成
export function ordersInfo(params){
    return request({
        url:'/ordersInfo',
        method:'get',
        params
    })
}

// 获取订单
export function reqGetOrdersList(params){
    return request({
        url:'/ordersList',
        method:'get',
        params
    })
}

// 确认收货
export function reqOrderConfirm(data){
    return request({
        url:'/ordersStatus',
        method:'post',
        data
    })
}


// 提交评价
export function reqSubmitComment(data){
    return request({
        url:'/ordersComment',
        method:'post',
        data
    })
}

// 获取评论列表
export function getCommentList(){
    return request({
        url:'/commentList',
        method:'get'
    })
}