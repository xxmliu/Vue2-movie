import httpApi from '@/http'
import Vue from 'vue'
import Vuex from 'vuex'
import {Notification} from 'element-ui'
import router from '@/router'
import {KEYS, set, get} from '@/utils/Storage'

Vue.use(Vuex)

export default new Vuex.Store({
  // 状态: vuex的单一状态树，用于存储全局共享的数据信息
  state: {
    // 该user对象就是存储在vuex中的可以供组件直接全局状态信息
    user: get(KEYS.USER_INFO),
    token: get(KEYS.TOKEN),
  },
  getters: {
  },
  mutations: {
    saveToken(state,token) {
      state.token = token
    },
    /** 
     *  此处声明方法，该方法将被vuex所管理
     *  方法用于修改state中的用户数据，如果需要修改用户数据
     *  state:   vuex自动传入的state对象
     *  payload: 用户调用当前方法时传递的自定义参数
     */
    updateUser(state,payload){
      state.user = payload
    }
  },
  actions: {
    /**
     * 执行异步登录业务，登陆成功后将用户对象存入state(调用mutations)
     * @param  store  vuex自动传入 Store对象
     * @param  params 用户传递的参数  {username:xx, password:xx}
     */
    login(store,params){
      httpApi.adminApi.login(params).then(res=>{
        if(res.data.code == 200) {  // 登录成功
          store.commit('updateUser',res.data.data.user)
          store.commit('saveToken',res.data.data.token)
          // 向Storage中存储user对象
          set(KEYS.USER_INFO, res.data.data.user)
          // 向Storage中存储token字符串
          set(KEYS.TOKEN, res.data.data.token)
          Notification.success({
            message: '登录成功,欢迎来到百慕大影城后台管理'
          })
          router.replace('/home/index')
        }else {   // 登录失败
          Notification.error({message:res.data.msg})
        }
      })
    }
  },
  modules: {
  }
})
