<template>
  <div>
    <!-- Index.vue -->
    

    <!-- 模糊搜索的表单 -->
    <el-form :inline="true"  @submit.native.prevent>
      <el-form-item label="电影名称：">
        <el-input 
          @keyup.native.enter="submit"
          v-model="name" placeholder="请输入电影名称关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">电影列表</el-divider>

    <!-- 加载表格 -->
    <el-table v-if="moviesData" :data="moviesData.result">
      <el-table-column align="center" width="110px" label="封面">
        <template slot-scope="scope">
          <img width="60px" :src="scope.row.cover" alt="">
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="主演" prop="star_actor"></el-table-column>
      <el-table-column align="center" width="110px" label="上映时间" prop="showingon"></el-table-column>
      <el-table-column align="center" width="110px" label="时长">
        <template slot-scope="scope">
          {{scope.row.duration}} 分钟
        </template>
      </el-table-column>
      <el-table-column width="150px" label="所属类别" prop="type"></el-table-column>
      <el-table-column width="200px" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="info" icon="el-icon-user" circle></el-button>
          <el-button size="small" type="primary" icon="el-icon-picture" circle></el-button>
          <el-button @click="$router.push(
                  `/home/movie-update/${scope.row.id}`)" size="small" type="warning" icon="el-icon-edit" circle></el-button>
          <el-button @click="del(scope.row.id)" size="small" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 显示分页 -->
    <el-pagination
      background
      style="margin: 20px;"
      backgroundawaekfhsadklfssadf
      layout="->, total, prev, pager, next, jumper"
      @current-change="changeCurrentPage"
      :current-page="moviesData.page"
      :page-size="moviesData.pagesize"
      :total="moviesData.total">
    </el-pagination>

  </div>
</template>

<script>
import httpApi from '@/http/index'

export default { 
  data() {
    return {
      // 绑定输入框的值
      name: sessionStorage.getItem('MovieKeyWord') ? 
              sessionStorage.getItem('MovieKeyWord') : '',       

      moviesData: {   // 存储当前页面需要显示的电影列表相关数据
        // 当前页
        page: this.$route.params.page ? 
                parseInt(this.$route.params.page) : 1,  
        pagesize: 3,    // 每页多少条
        result: [],     // 电影列表
        total: 0        // 一共有多少条
      }
    }
  },
  methods: {
    del(id){
      this.$confirm('是否永久移除该电影？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res=>{
        // 执行删除演员业务，发送删除请求
        httpApi.movieApi.delete({id}).then(res=>{
          if(res.data.code==200){
            this.search()
          }
        })
      })
    },

    /** 当前页改变时触发执行 */
    changeCurrentPage(e){
      console.log('改变了当前页', e)  // e就是当前页码
      // 跳转路由（当前组件与目标组件相同，则不执行组件销毁挂载过程）
      this.$router.push(`/home/movie-list/${e}`)
      // 修改当前页
      this.moviesData.page = e
      this.search()
    },

    submit(){
      // 初始化第一页
      if(this.$route.path != '/home/movie-list'){
        this.$router.push(`/home/movie-list`)
      }
      this.moviesData.page = 1 
      this.search()
    },

    // 当点击查询按钮后，执行该方法  判断是否有关键字，做分支
    search() { 
      // 为了f5刷新后关键字依然保存，需要将关键字存起来
      sessionStorage.setItem('MovieKeyWord', this.name.trim())
      if(this.name.trim()){ // 有关键字
        // 模糊查询
        this.listMoviesByName()
      } else { // 无关键字
        this.listMovies()
      }
    },

    /** 模糊查询电影列表 */
    listMoviesByName(){
      console.log('模糊查询电影列表')
      // 整理参数，发送post请求
      let params = {
        name: this.name,
        page: this.moviesData.page,
        pagesize: this.moviesData.pagesize
      }
      httpApi.movieApi.queryByNameLike(params).then(res=>{
        this.moviesData = res.data.data
      })

    },

    /** 列出首页电影数据 */
    listMovies(){
      let params = {
        page: this.moviesData.page,
        pagesize: this.moviesData.pagesize 
      }
      console.log(params)
      httpApi.movieApi.queryAll(params).then(res=>{
        console.log('加载首页电影列表数据', res)
        // 将数组存入data.moviesData   使用el-table显示这些数据
        this.moviesData = res.data.data
      })
    }
  },
  
  /** 当前组件挂载完毕后执行 */
  mounted(){
    // 加载首页电影列表数据
    this.search()
  }
};
</script>

<style lang="scss" scoped>
</style>