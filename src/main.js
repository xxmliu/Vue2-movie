import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 声明全局变量UPLOADURL，保存上传文件的url前缀
// UPLOADURL将直接绑定在每一个Vue对象上
// 所以每一个组件都可以直接访问该属性
import BaseUrl from './http/BaseUrl';
Vue.prototype.UPLOADURL = BaseUrl.UPLOADURL;

// 明文保存JS安全密钥
window._AMapSecurityConfig = {
  securityJsCode:'ef3d0a426bfcf8dfc18583531715f4d9',
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')