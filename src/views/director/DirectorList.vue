<template>
  <div>
    <!-- Index.vue -->
    

    <!-- 模糊搜索的表单 -->
    <el-form :inline="true"  @submit.native.prevent>
      <el-form-item label="姓名：">
        <el-input 
          @keyup.native.enter="search"
          v-model="name" placeholder="请输入导演姓名关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">导演列表</el-divider>

    <!-- 输出查询结果 -->
    <person 
      @delete="deleteDirector(item.id,$event)"
      v-for="item in directors"  :key="item.id"
      :name="item.director_name" 
      :avatar="item.director_avatar"></person>

  </div>
</template>

<script>
import Person from '@/components/Person.vue';
import myaxios from '@/http/MyAxios'

export default { 
  components: {
    Person
  },
  data() {
    return {
      name: '',    // 绑定输入框的值
      directors: [],  // 绑定导演列表
    }
  },
  methods: {
    cp(){ alert(1) },

    deleteDirector(id,e){


      this.$confirm('是否永久移除该导演?','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type: 'warning'
      }).then(res=>{
        
        // console.log('捕获到用户点击了叉子')
        let url = 'http://localhost:3010/movie-director/del'
        myaxios.post(url,{id}).then(res=>{
          console.log('删除导演的结果:',res);
            if(res.data.code==200){
              this.search()
            }
        })
      })
      


    },

    search() {  // 当点击查询按钮后，执行该方法
      if(this.name.trim()){  // 有关键字，执行模糊查询
        this.listActorsByName()
      }else {  // 没有关键字，查询所有
        this.listActors()
      }
    },

    listActorsByName(){ // 通过关键字查询导演列表
      let url = "http://localhost:3010/movie-directors/name"
      myaxios.post(url, {name:this.name}).then(res=>{
        console.log('模糊查询', res)
        this.directors = res.data.data
      })
    },

    listActors() {  // 加载默认的首页导演列表
      let url = 'http://localhost:3010/movie-directors'
      let params = {page:1, pagesize:100}
      myaxios.get(url, params).then(res=>{
        console.log('加载导演列表', res)
        // 将导演数组存入data，渲染页面
        this.directors = res.data.data
      })
    }
  },

  /** 当前组件挂载完毕后执行 */
  mounted(){
    // 加载导演列表
    this.listActors()
  }
};
</script>

<style lang="scss" scoped>
</style>