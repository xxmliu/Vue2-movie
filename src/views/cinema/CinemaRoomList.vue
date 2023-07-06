<template>
  <div>
    <!-- 放映厅列表页 -->
    <el-button 
      @click="dialogFormVisible = true"
      type="primary" plain>新增放映厅</el-button>
    <el-divider content-position="left">放映厅列表</el-divider>

    <!-- 放映厅表格数据 -->
    <el-table :data="rooms">
      <el-table-column label="放映厅名称" prop="room_name"></el-table-column>
      <el-table-column label="放映厅类型" prop="room_type"></el-table-column>
      <el-table-column label="放映厅座位数">
        <template slot-scope="scope">
          {{ scope.row.room_size ? scope.row.room_size+'个座位': '[暂未分配作为模版]'}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button 
            @click="$router.push('/home/showingon-plan-list/'+scope.row.id)"
            size="small" type="success" icon="el-icon-view" circle></el-button>
          <el-button 
            @click="$router.push('/home/showingon-plan-add/'+scope.row.id)"
            size="small" type="primary" icon="el-icon-plus" circle></el-button>
          <el-button 
            @click="$router.push('/home/seat-template/'+scope.row.id)"
            size="small" type="warning" icon="el-icon-s-grid" circle></el-button>
          <el-button 
            @click="del(scope.row.id)"
            size="small" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>



    <!-- 自定义新增放映厅的对话框 -->
    <el-dialog title="新增放映厅" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="110px">
        <el-form-item label="放映厅名称" prop="room_name">
          <el-input v-model="form.room_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="放映厅类型">
          <el-select 
            v-model="form.room_type" 
            placeholder="请选择放映厅类型" prop="room_type">
            <el-option 
              v-for="item in types" :key="item.id"
              :label="item.type_name" :value="item.type_name"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
import httpApi from '@/http'

  export default {
    data() {
      return {
        rooms:[],   // 绑定所有的放映厅数据
        types: [],  // 绑定所有的放映厅类型
        dialogFormVisible: false,
        form: {
          room_name: '',
          room_type: '',
          movie_cinema_id: this.$route.params.id,
        },
        rules: {
        room_name: [
          {required: true, message:'必填', trigger:'blur'}
        ],
        room_type: [
          {required: true, message:'必填', trigger:'change'}
        ],
        movie_cinema_id: [
          {required: true, message:'必填', trigger:'blur'}
        ],
      },
      }
    },

    methods: {

      submit(){
      this.$refs['form'].validate(valid=>{
        if(valid){
          console.log(this.form)
          httpApi.cinemaRoomApi.add(this.form).then(res=>{
            if(res.data.code == 200){ // 添加成功
              this.$message({
                message: '恭喜，添加成功',
                type: 'success'
              })
              this.dialogFormVisible = false // 隐藏弹窗
              this.listRooms()
            }
          })
        }
      })
    },

      listTypes() {
        httpApi.cinemaRoomApi.queryAllTypes().then(res=>{
          console.log(res);
          this.types = res.data.data
        })
      },

      /** 加载所有放映厅 */
      listRooms(){
        let params = {cinema_id: this.form.movie_cinema_id}
        httpApi.cinemaRoomApi.list(params).then(res=>{
          console.log(res);
          this.rooms = res.data.data
        })
      },

      // 通过id删除放映厅
      del(id){
      this.$confirm('是否永久移除该放映厅？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res=>{
        // 执行删除放映厅，发送删除请求
        httpApi.cinemaRoomApi.delete({id}).then(res=>{
          if(res.data.code==200){
            this.$message({
                message: '恭喜，删除成功',
                type: 'success'
              })
            this.listRooms()
          }
        })
      })
    },

    },

    mounted () {
      // 加载类型列表
      this.listTypes()
      // 加载放映厅列表
      this.listRooms()
    }
  }
</script>

<style lang="scss" scoped>

</style>