<template>
  <div>
    <!-- Index.vue -->
    
    <!-- 表单 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width: 600px">
      <el-form-item label="演员姓名" prop="actorName">
        <el-input v-model="form.actorName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="演员头像" prop="actorAvatar">
        <el-upload
          class="avatar-uploader"
          :action="`${UPLOADURL}/upload`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img style="object-fit: cover;" v-if="form.actorAvatar" :src="form.actorAvatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即新增</el-button>
        <el-button>重置</el-button>
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
        actorName: '',    // 绑定演员名字
        actorAvatar: ''   // 绑定演员头像 
      },
      rules: {
        actorName: [
          {required: true, message:'该字段必填', trigger:'blur'}
        ],
        actorAvatar: [
          {required: true, message:'该字段必填', trigger:'blur'}
        ]
      }
    }
  },
  methods: {

    // 提交表单
    submit(){

      this.$refs['form'].validate(valid=>{
        if(valid){
          httpApi.actorApi.add(this.form).then(res=>{
            if(res.data.code==200){
              this.$message({
                message: '恭喜添加成功',
                type: 'success'
              })
              // 重置表单将会重置每个表单项，需要form-item提供prop属性
              this.$refs['form'].resetFields()
            }
          })
        }
      })
    },

    // 上传成功后执行
    handleAvatarSuccess(res, file) {
      console.log('上传成功', res) 
      // 将返回的图片访问路径 存入 this.form中
      this.form.actorAvatar = res.data 
    },

    // 头像上传前执行：格式、大小的验证，该方法需要返回true、false
    // true:  验证通过可以上传   
    // false: 验证不通过，阻止上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>