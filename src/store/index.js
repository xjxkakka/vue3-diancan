import { createStore } from 'vuex'
import { clearClassify, EditCarts, getAddress, getClassify } from "../api/api";

export default createStore({
    state: {
        foodsInfo: [],//菜单
        cartFoods: [],//购物车中食物的列表
        addressList: [],// 收货地址
        cacheKeepAlive:['OrderPreview'], // 需要缓存的页面
    },
    mutations: {
        GET_FOODSINFO (state, foodsInfo) {
            state.foodsInfo = foodsInfo
        },

        // 更改购物车数量
        CHANGE_CARTCOUNT (state, { id, card, type }) {
            // 第一个id是父类id
            // 如果type是cart代表在购物车中删减的  需要处理下 foodsInfo中的count数
            if (type === 'cart') {
                state.foodsInfo.forEach(item => {
                    if (item.id === id) {
                        item.menu.forEach(i => {
                            if (i.id === card.id) {
                                i.count = card.count
                            }
                        })
                    }
                })
            }
            // console.log(id, card)
            card = { ...card, fid: id }
            // console.log(888)
            if (state.cartFoods.length === 0) {
                // 还要在判断是否card.count为0 ,代表最后一个 减号
                if (card.count === 0) {
                    state.cartFoods = []
                } else {
                    state.cartFoods.unshift(card)
                }
            } else {
                // 首先遍历是否存在购物车中
                const isExist = state.cartFoods.some(item => {
                    return item.id === card.id
                })
                // console.log(isExist)
                // console.log(123)
                // 存在
                if (isExist) {
                    state.cartFoods.forEach((item, index) => {
                        // 找到匹配的ID 直接添加数量或者减少，但是要判断传进来的数量是否等于0 ，等于0 的话直接删除掉
                        if (item.id === card.id) {
                            if (card.count === 0) {
                                state.cartFoods.splice(index, 1)
                            } else {
                                state.cartFoods[index] = card
                            }
                        }
                    })
                } else {
                    // 如果不存在直接Unshift进去
                    // console.log("不存在123")
                    state.cartFoods.unshift(card)
                }


            }
            // console.log(state.cartFoods, "购物车")
        },

        // 初始化购物车
        INIT_CART (state, foodsInfo) {
            state.cartFoods = foodsInfo
        },
        CLEAR_CART (state, foodsInfo) {
            // 清空购物车
            state.cartFoods = []
            state.foodsInfo = foodsInfo
        },

        // 收货地址
        GET_ADDRESS (state, payload) {
            state.addressList = payload
        },

        // 动态设置路由缓存
        //  设置路由缓存
        setKeepAlive(state,payload){
            // 缓存过就不用在添加了
            if (!state.cacheKeepAlive.includes(payload)){
                state.cacheKeepAlive.push(payload)
            }
        },
        // 删除路由缓存
        removeKeepAlive(state,payload){
            // 移除缓存页面
            state.cacheKeepAlive =  state.cacheKeepAlive.filter(item=>item!==payload)
        },
    },
    actions: {
        //第一次发送请求获取菜单
        getMenu (context) {
            getClassify().then(res => {
                context.commit('GET_FOODSINFO', res.data)
                // console.log(res.data)
                // 根据菜单初始化购物车
                const cart = []
                // 遍历菜单 count不为0的都加入数组中
                res.data.forEach(item => {
                    item.menu.forEach(i => {
                        if (i.count !== 0) {
                            i.fid = item.id
                            cart.unshift(i)
                        }
                    })
                })
                context.commit('INIT_CART', cart)
                // console.log(cart)
            })
        },

        //点击加减号的时候修改个数
        changeCount (context, { id, card, type }) {
            // console.log(id, card, "store")

            // 修改完成后不需要重新赋值，因为界面数据已经更改了只要数据库更新好了就行
            EditCarts({ id, card }).then(res => {
                // console.log(res,3333)
            })
            // // 添加进购物车 cartFoods
            context.commit('CHANGE_CARTCOUNT', { id, card, type })
        },
        // 清空购物车
        clearCartList (context) {
            clearClassify().then(res => {
                // console.log(res)
                context.commit("CLEAR_CART", res.data)
            })
        },

        // 获取收货地址
        getAddress ({ commit }) {
            if (localStorage.getItem("token")) {
                const params = {
                    token: localStorage.getItem("token")
                }
                getAddress(params).then(res => {
                    // console.log(res)
                    commit('GET_ADDRESS', res.data)

                })
            }
        }
    },
    getters: {
        //总数量
        totalCount (state) {
            /*
            * 求数组项之和
            * var arr = [3,9,4,3,6,0,9];
            * var sum = arr.reduce(function (prev, cur) {
                     return prev + cur;
                        },0);
              由于传入了初始值0，所以开始时prev的值为0，cur的值为数组第一项3，相加之后返回值为3作为下一轮回调的prev值，
            * 然后再继续与下一个数组项相加，以此类推，直至完成所有数组项的和并返回。
            * */
            return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
        },
        //总金额
        totalPrice (state) {
            return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
        }
    }

})
