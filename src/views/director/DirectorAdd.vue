<template>
  <div>
    <!-- Index.vue -->
    

    <!-- 表单 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width: 600px">
      <el-form-item label="导演姓名" prop="directorName">
        <el-input v-model="form.directorName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="导演头像" prop="directorAvatar">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:9000/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img style="object-fit: cover;" v-if="form.directorAvatar" :src="form.directorAvatar" class="avatar" />
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
import myaxios from '@/http/MyAxios'

export default {
  data() {
    return {
      form: {
        directorName: '',    // 绑定导演名字
        directorAvatar: ''   // 绑定导演头像 
      },
      rules: {
        directorName: [
          {required: true, message:'该字段必填', trigger:'blur'}
        ],
        directorAvatar: [
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
          let url = 'http://localhost:3010/movie-director/add'
          myaxios.post(url, this.form).then(res=>{
            console.log('新增导演', res)
            this.$message({
              message: '恭喜添加成功',
              type: 'success'
            })
            // 重置表单将会重置每个表单项，需要form-item提供prop属性
            this.$refs['form'].resetFields()
          })
        }
      })
    },

    // 上传成功后执行
    handleAvatarSuccess(res, file) {
      console.log('上传成功', res) 
      // 将返回的图片访问路径 存入 this.form中
      this.form.directorAvatar = res.data 
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