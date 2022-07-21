import axios from "axios";
import router from '../router/index'

const request = axios.create({
    baseURL:' http://192.168.0.110:3001',
    //代表请求超过的时间5S
    timeout: 5000
});

//请求拦截器:在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
request.interceptors.request.use((config) => {

    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = 'Bearer ' + token
    }
    //config:配置对象，对象里面有一个属性很重要，headers请求头
    return config;
})
//响应拦截器  有两个参数可以写，成功和失败，可以只写成功的
request.interceptors.response.use((res) => {

        return res
}, (error => {
    console.log(error.response)
    // 如果401 就跳到登录页面
    if (error.response.status === 401){
        router.push('/login')
    }
    return Promise.reject(error.response)
}))

//对外暴露
export default request;