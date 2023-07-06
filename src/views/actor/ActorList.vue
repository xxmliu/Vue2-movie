<template>
  <div>
    <!-- Index.vue -->

    <!-- 模糊搜索的表单 -->
    <el-form :inline="true"  @submit.native.prevent>
      <el-form-item label="姓名：">
        <el-input 
          @keyup.native.enter="search"
          v-model="name" placeholder="请输入演员姓名关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">演员列表</el-divider>

    <!-- 输出查询结果 -->
    <person 
      @delete="deleteActor(item.id,$event)"
      v-for="item in actors"  :key="item.id"
      :name="item.actor_name" 
      :avatar="item.actor_avatar"></person>

  </div>
</template>

<script>
import Person from '@/components/Person.vue';
import myaxios from '@/http/MyAxios'
import httpApi from '@/http/index'

export default { 
  components: {
    Person
  },
  data() {
    return {
      name: '',    // 绑定输入框的值
      actors: [],  // 绑定演员列表
    }
  },
  methods: {
    cp(){ alert(1) },

    deleteActor(id,e){

      this.$confirm('是否永久移除该演员?','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type: 'warning'
      }).then(res=>{

        // console.log('捕获到用户点了叉子...',id)
        // 执行删除演员业务，发送删除请求
        httpApi.actorApi.delete({id}).then(res=>{
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

    listActorsByName(){ // 通过关键字查询演员列表
      httpApi.actorApi.queryByNameLike({name:this.name}).then(res=>{
        this.actors = res.data.data
      })
    },

    listActors() {  // 加载默认的首页演员列表
      httpApi.actorApi.queryAllActors().then(res=>{
        this.actors = res.data.data
      })
      
    }
  },

  /** 当前组件挂载完毕后执行 */
  mounted(){
    // 加载演员列表
    this.listActors()
  }
};
</script>

<style lang="scss" scoped>
</style>