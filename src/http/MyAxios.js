// MyAxios.js
import axios from 'axios'
// qs模块可以将对象转换为查询字符串
import qs from 'qs'
import store from '@/store'


// 创建axios实例
const instance = axios.create()


// 添加请求拦截器
instance.interceptors.request.use(function(config){
    // 对config进行操作
    let token = store.state.token
    if(token){
        config.headers['Authorization'] = token
    }
    return config
})



let myaxios = {
    /**
     * 发送get请求
     * @param {string} url  请求路径
     * @param {object} params  请求参数（对象的形式传递）
     * @returns Promise
     */
    get(url, params){
        return instance({
            url, 
            method: 'GET', 
            params
        })
    },

    /**
     * 发送post请求
     * @param {string} url  请求路径
     * @param {object} params  请求参数（对象的形式传递）
     * @returns Promise
     */
    post(url, params){
        return instance({
            url, 
            method: 'POST',
            data: qs.stringify(params)
        })
    }
}

export default myaxios;