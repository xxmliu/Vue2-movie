<template>
  <div>
    <!-- views/cinema/ShowingonPlanAdd.vue -->
    为
    <b style="color:#409EFF;">{{ roomInfo.cinema_name }}</b>
    的
    <b style="color:#409EFF;">
      {{ roomInfo.cinema_room_name }}
      {{ roomInfo.cinema_room_type }}
    </b>
    添加排片计划
    <el-divider></el-divider>
    <!-- 表单 -->
    <el-form label-width="80px" style="width: 700px">
      <el-form-item label="选择电影">
        <el-select 
          ref="selector"
          style="width: 100%;" 
          placeholder="请选择电影"
          v-model="form.movie_id"
          filterable
          remote
          reserve-keyword
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option v-for="item in movies" :key="item.id" 
          :label="item.title" 
          :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="放映日期">
        <el-col :span="11">
          <el-date-picker 
            v-model="form.showingon_date"
            type="date" 
            value-format="yyyy-MM-dd"
            placeholder="选择日期" 
            style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2" style="text-align: center;">-</el-col>
        <el-col :span="11">
          <el-time-select 
            v-model="form.showingon_time"
            :picker-options="{
              start: '06:00',
              step: '00:15',
              end: '23:59'
            }"
            placeholder="选择时间" 
            style="width: 100%;"></el-time-select>
        </el-col>
      </el-form-item>
      <el-form-item label="票价">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="立即发布">
        <el-switch 
          :active-value="1"
          :inactive-value="0"
          v-model="form.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form> 

  </div>
</template>

<script>
import httpApi from '@/http';

export default {
  data() {
    return {
      form: {
        cinema_id: '',
        cinema_room_id: this.$route.params.roomId,
        movie_id: '',
        showingon_date: '',
        showingon_time: '',
        status: 0,
        price: ''
      },
      roomInfo: {},  // 保存放映厅基本信息
      loading: false,  //保存是否正在加载
      movies: [],   // 保存模糊查询电影列表的方法
    }
  },

  methods:{

    submit(){
      this.form.cinema_id = this.roomInfo.cinema_id
      console.log(this.form);
      // 发送请求，执行新增业务
      httpApi.showingonPlanApi.add(this.form).then(res=>{
        console.log('新增排片计划结果',res);
        if(res.data.code == 200) {  // 新增成功
          let name = this.$refs['selector'].selectedLabel
          this.$notify({
            title: '成功',
            dangerouslyUseHTMLString: true,
            message: `
              <p>电影名称:《${name}》</p>
              <p>播放日期:${this.form.showingon_date}${this.form.showingon_time}</p>
              <p>放映厅:${this.roomInfo.cinema_room_name}(${this.roomInfo.cinema_room_type})</p>
              <p style="color:red;">票价:￥${this.form.price}</p> 
            `,
            type: 'success'
          })
        }
      })
    },

    remoteMethod(query){  // 远程搜索电影列表的方法
      if(query != ''){
        this.loading = true
        let params = {page:1, pagesize:20, name:query}
        httpApi.movieApi.queryByNameLike(params).then(res=>{
          console.log('模糊查询电影列表结果',res)
          this.loading = false
          this.movies = res.data.data.result
        })

      }
    }
  },

  mounted () {
    let params = {id:this.form.cinema_room_id}
    httpApi.cinemaRoomApi.queryById(params).then(res=>{
      console.log('加载放映厅详情', res)
      this.roomInfo = res.data.data
    })
  },
};
</script>

<style lang="scss" scoped>
</style>