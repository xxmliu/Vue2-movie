<template>
  <div>
    <!-- views/cinema/ShowingonPlanAdd.vue -->
    
    <b style="color:#409EFF;">{{ roomInfo.cinema_name }}</b>
    的
    <b style="color:#409EFF;">
      {{ roomInfo.cinema_room_name }}
      {{ roomInfo.cinema_room_type }}
    </b>
    的排片计划列表
    <el-divider></el-divider>

    <!-- 显示表格 -->
    <el-table :data="plans">
      <el-table-column label="电影名称" prop="title"></el-table-column>
      <el-table-column label="放映日期" prop="showingon_date"></el-table-column>
      <el-table-column label="放映场次" prop="showingon_time"></el-table-column>
      <el-table-column label="票价">
        <template slot-scope="scope">
          ￥{{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="发布状态">
        <template slot-scope="scope">
          <el-switch
            @change="changeStatus(scope.row.plan_id, $event)"
            :active-value="1"
            :inactive-value="0"
            active-text="已发布"
            inactive-text="暂未发布"
            v-model="scope.row.status"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button 
            @click="del(scope.row.plan_id)"
            size="small" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    

  </div>
</template>

<script>
import httpApi from '@/http';
import { del } from 'vue';

export default {
  data() {
    return {
      roomId: this.$route.params.roomId,  // 保存放映厅id
      roomInfo: {},  // 保存放映厅基本信息
      plans: [],  // 保存排片计划
    }
  },

  methods: {

    /** 当改变开关状态时，执行该方法 */
    changeStatus(plan_id, e) {
      console.log({plan_id, e})
      if(e){  // 改为发布状态
        httpApi.showingonPlanApi.publish({id: plan_id}).then(res=>{
          if(res.data.code==200){
            this.$message({
              message: '排片计划发布成功',
              type: 'success'
            })
          }          
        })
      }else { // 改为未发布状态
        httpApi.showingonPlanApi.noPublish({id: plan_id}).then(res=>{
          if(res.data.code==200){
            this.$message({
              message: '已经取消发布该排片计划',
              type: 'warning'
            })
          }          
        })
      }
    },

    // 加载放映厅中的排片计划列表
    showingonPlan(){
      httpApi.showingonPlanApi.queryByRoomId({room_id:this.roomId}).then(res=>{
        console.log('加载排片计划',res)
        this.plans = res.data.data
      })
    },

    // 通过id删除排片计划
    del(id){
      console.log(id);
      this.$confirm('是否永久移除该排片？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res=>{
        // 执行删除影院，发送删除请求
        httpApi.showingonPlanApi.delete({id}).then(res=>{
          console.log(res)
          if(res.data.code==200){
            this.$message({
                message: '恭喜，删除成功',
                type: 'success'
              })
              this.showingonPlan()
            }
          })
        })
      },
    },


  mounted () {
    // 调用加载放映厅中的排片计划列表方法
    this.showingonPlan()
    
    // 加载放映厅详情数据
    let params = {id:this.roomId}
    httpApi.cinemaRoomApi.queryById(params).then(res=>{
      console.log('加载放映厅详情', res)
      this.roomInfo = res.data.data
    })
  },
};
</script>

<style lang="scss" scoped>
</style>