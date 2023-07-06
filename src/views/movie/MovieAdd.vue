<template>
  <div>
    <!-- Index.vue -->
    
    <!-- 表单 -->
    <el-form 
      ref="form" 
      :model="form" :rules="rules"
      label-width="100px" style="width: 600px">
      <el-form-item label="封面图片" prop="cover">
        <el-upload
          class="avatar-uploader"
          :action="`${UPLOADURL}/upload`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img 
            v-if="form.cover"
            style="object-fit: cover;" 
            :src="form.cover" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="电影类别" prop="categoryId">
        <el-radio-group v-model="form.categoryId">
          <el-radio label="1">热映</el-radio>          
          <el-radio label="2">待映</el-radio>          
          <el-radio label="3">经典</el-radio>          
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电影名称" prop="title">
        <el-input v-model="form.title" placeholder="输入电影名称"></el-input>
      </el-form-item>
      <el-form-item label="电影类型"  prop="type">
        <el-select 
          style="width: 100%;"
          v-model="form.type"
          multiple placeholder="选择电影类型（多选）">
          <el-option 
            v-for="item in types" :key="item.id"
            :label="item.typename" 
            :value="item.typename">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电影主演" prop="starActor">
        <el-select
          v-model="form.starActor"
          style="width:100%;"
          multiple
          filterable
          remote
          reserve-keyword
          :remote-method="remoteMethod"
          :loading="loading"
          placeholder="请输入关键词">
          <el-option 
            v-for="item in actors" :key="item.id"
            :label="item.actor_name" 
            :value="item.actor_name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上映时间" prop="showingon">
        <el-date-picker 
          type="date" 
          value-format="yyyy-MM-dd"
          v-model="form.showingon"
          placeholder="请选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="电影评分" prop="score">
        <el-rate
          v-model="form.score" 
          :max="10"
          style="height:40px; display:flex; align-items: center;">
        </el-rate>
      </el-form-item>
      <el-form-item label="电影时长" prop="duration">
        <el-input v-model="form.duration" placeholder="输入电影时长（分钟）"></el-input>
      </el-form-item>
      <el-form-item label="电影简介" prop="description">
        <div style="border: 1px solid #ccc;">
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :defaultConfig="toolbarConfig"
                :mode="mode"
            />
            <Editor
                style="height: 300px; overflow-y: hidden;"
                v-model="form.description"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="onCreated"
            />
        </div>
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
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor } from '@wangeditor/editor'

export default {
  components: { Editor, Toolbar },

  data() {
    return {
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: { 
        excludeKeys: ["blockquote", "header1", "header2", "header3", "|", "through", "bgColor", "clearStyle", "|", "bulletedList", "numberedList", "todo", "|", "insertLink",  "insertVideo", "insertTable", "codeBlock", "|", "undo", "redo", "|", "fullScreen"]
      },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'simple', // or 'simple'

      form: {
        categoryId: '1',
        cover: '',
        title: '',
        type: [],
        starActor: [],
        showingon: '',
        score: 5,
        description: '',
        duration: '',
      },

      rules: {
        categoryId: [
          {required:true, message:'该字段必填', trigger:'blur'}
        ],
        cover: [
          {required:true, message:'该字段必填', trigger:'change'}
        ],
        title: [
          {required:true, message:'该字段必填', trigger:'blur'}
        ],
        type: [
          {required:true, message:'该字段必填', trigger:'change'}
        ],
        starActor: [
          {required:true, message:'该字段必填', trigger:'change'}
        ],
        showingon: [
          {required:true, message:'该字段必填', trigger:'blur'}
        ],
        score: [
          {required:true, message:'该字段必填', trigger:'blur'}
        ],
        description: [
          {required:true, message:'该字段必填', trigger:'blur'}
        ],
        duration: [
          {required:true, message:'该字段必填', trigger:'blur'}
        ],
      },

      types: [],  // 绑定电影类别数组
      loading: false,  // 表示select是否正在异步加载数据
      actors: [],  // 绑定演员数组
    }
  },

  mounted(){
    // 加载所有的电影类别
    this.listMovieTypes()
  },

  methods: {

    /** 提交表单 */
    submit(){
      this.$refs['form'].validate(valid=>{
        if(valid) { // 验证通过
          // 需要再次处理this.form中的一些属性，整理数据结构
          // this.form.starActor数组  this.form.type数组
          // 需要修改为字符串： ['黄渤', '徐峥']  =>  "黄渤 / 徐峥"
          this.form.starActor = this.form.starActor.join('／')
          this.form.type = this.form.type.join('／')
          console.log(this.form)
          httpApi.movieApi.add(this.form).then(res=>{
            if(res.data.code==200){ // 添加成功
              this.$router.push('/home/movie-list/1')
            }else {
              this.$message({
                message: '添加失败',
                type: 'error'
              })
              // this.$refs['form'].resetFields()
            }
          })
        }
      })
    },

    /** 当在select中写入关键字后，将会触发该方法并传入关键字 */
    remoteMethod(query){
      console.log(query)
      // 通过query关键字，查询符合条件的演员列表，显示为option
      httpApi.actorApi.queryByNameLike({name:query}).then(res=>{
        console.log('模糊查询演员列表', res)
        this.actors = res.data.data
      })

    },

    /** 列出所有的电影类别 */
    listMovieTypes(){
      httpApi.movieApi.queryTypes().then(res=>{
        console.log('加载所有电影类别', res)
        this.types = res.data.data
      })
    },

    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },

    // 上传成功后执行
    handleAvatarSuccess(res, file) {
      // console.log('上传成功', res) 
      // // 将返回的图片访问路径 存入 this.form中
      this.form.cover = res.data 
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

  beforeDestroy() {
      const editor = this.editor
      if (editor == null) return
      editor.destroy() // 组件销毁时，及时销毁编辑器
  }
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>

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
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    display: block;
  }
</style>
