import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home/index'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'index',
        name: '/home/index',
        component: () => import('../views/Index.vue'),
      },{
        path: 'actor-list',
        name: '/home/actor-list',
        component: () => import('../views/actor/ActorList.vue'),
        meta:{
          breadcrumbs:['演员管理','演员列表'],
          roles: ['admin1']
        }
      },{
        path: 'actor-add',
        name: '/home/actor-add',
        component: () => import('../views/actor/ActorAdd.vue'),
        meta:{
          breadcrumbs:['演员管理','新增演员']
        }
      },{
        path: 'director-list',
        name: '/home/director-list',
        component: () => import('../views/director/DirectorList.vue'),
        meta:{
          breadcrumbs:['导演管理','导演列表']
        }
      },{
        path: 'director-add',
        name: '/home/director-add',
        component: () => import('../views/director/DirectorAdd.vue'),
        meta:{
          breadcrumbs:['导演管理','新增导演']
        }
      },
      {
        path: 'movie-list',
        name: '/home/movie-list',
        component: () => import('../views/movie/MovieList.vue'),
        meta:{
          breadcrumbs:['电影管理','电影列表']
        }
      },
      {
        path: 'movie-list/:page',
        name: '/home/movie-list/page',
        component: () => import('../views/movie/MovieList.vue'),
        meta:{
          breadcrumbs:['电影管理','电影列表']
        }
      },
      {
        path: 'movie-add',
        name: '/home/movie-add',
        component: () => import('../views/movie/MovieAdd.vue'),
        meta:{
          breadcrumbs:['电影管理','新增电影']
        }
      },
      {
        path: 'movie-update/:id',
        name: '/home/movie-update',
        component: () => import('../views/movie/MovieUpdate.vue'),
        meta:{
          breadcrumbs:['电影管理','修改电影']
        }
      },
      {
        path: 'cinema-add',
        name: '/home/cinema-add',
        component: () => import('../views/cinema/CinemaAdd.vue'),
        meta:{
          breadcrumbs:['电影院管理','新增电影院']
        }
      },
      {
        path: 'cinema-list',
        name: '/home/cinema-list',
        component: () => import('../views/cinema/CinemaList.vue'),
        meta:{
          breadcrumbs:['电影院管理','电影院列表']
        }
      },
      {
        path: 'cinema-update/:id',
        name: '/home/cinema-update',
        component: () => import('../views/cinema/CinemaUpdate.vue'),
        meta:{
          breadcrumbs:['电影院管理','修改电影院']
        }
      },
      {
        path: 'cinema-room-list/:id',
        name: '/home/cinema-room-list',
        component: () => import('../views/cinema/CinemaRoomList.vue'),
        meta:{
          breadcrumbs:['电影院管理',
          { path:'/home/cinema-list', name:'电影院列表' }, 
          '放映厅列表']
        }
      },
      {
        path: 'showingon-plan-add/:roomId',
        name: '/home/showingon-plan-add',
        component: () => import('../views/cinema/ShowingonPlanAdd.vue'),
        meta:{
          breadcrumbs:['电影院管理','电影院列表','放映厅列表','新增放映厅拍片计划']
        }
      },
      {
        path: 'showingon-plan-list/:roomId',
        name: '/home/showingon-plan-list',
        component: () => import('../views/cinema/ShowingonPlanList.vue'),
        meta:{
          breadcrumbs:['电影院管理','电影院列表','放映厅列表','排片计划列表']
        }
      },
      {
        path: 'seat-template/:id',
        name: '/home/seat-template',
        component: () => import('../views/cinema/CinemaRoomSeatTemplate.vue'),
        meta:{
          breadcrumbs:['电影院管理','电影院列表','放映厅列表','配置座位详情']
        }
      },
    ]
  },
  {
    path: '/user/login',
    name: '/user/login',
    component: () => import('../views/user/Login.vue')
  },
]

// 全局路由管理器
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局的前置路由守卫，将会在每一次路由跳转时执行（目标显示之前）
router.beforeEach((to, from, next)=>{
  console.log('from:', from)
  console.log('to:', to)
  // 此处做判断，如果目标组件是登录组件，则继续显示登录页面
  if(to.path == '/user/login'){
    // 调用next()方法才可以继续原本的跳转业务流程
    next()
    return;
  }
  //否则判断vuex中是否有登录用户
  let user = store.state.user
  if (user){ // 用户已经登录
    next()
  }else {  // 用户还没有登录
    router.push('/user/login')
  }
})

export default router