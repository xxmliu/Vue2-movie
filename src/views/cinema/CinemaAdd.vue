<template>
  <div>
    <!-- 表单 -->
    <el-form 
      label-width="100px" 
      ref="form" :model="form" :rules="rules" style="width:700px;">
      <el-form-item label="电影院名称" prop="cinema_name">
        <el-input v-model="form.cinema_name"></el-input>
      </el-form-item>
      <el-form-item label="选择位置">
        <div 
          id="mapContainer"
          style="height:200px; border:1px solid #666;">
        </div>
      </el-form-item>
      <el-form-item label="详细地址"  prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="省份"  prop="province">
        <el-input v-model="form.province"></el-input>
      </el-form-item>
      <el-form-item label="城市"  prop="city">
        <el-input v-model="form.city"></el-input>
      </el-form-item>
      <el-form-item label="地区"  prop="district">
        <el-input v-model="form.district"></el-input>
      </el-form-item>
      <el-form-item label="经度"  prop="longitude">
        <el-input v-model="form.longitude"></el-input>
      </el-form-item>
      <el-form-item label="纬度"  prop="latitude">
        <el-input v-model="form.latitude"></el-input>
      </el-form-item>
      <el-form-item label="选择标签"  prop="tags">
        <el-select 
          v-model="form.tags" 
          style="width:100%;" 
          placeholder="请选择"
          multiple>
          <el-option 
            v-for="item in tags" :key="item.id"
            :label="item.tagname"
            :value="item.tagname">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确定新增电影院</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import httpApi from '@/http';

export default {
  data() {
    return {
      tags: [], // 保存所有的标签

      form: {
        cinema_name: '',
        address: '',
        province: '',
        city: '',
        district: '',
        longitude: '',
        latitude: '',
        tags: [],
      },
      rules: {
        cinema_name: [
          {required:true, message:'必填', trigger:'blur'}
        ],
        address: [
          {required:true, message:'必填', trigger:'blur'}
        ],
        province: [
          {required:true, message:'必填', trigger:'blur'}
        ],
        city: [
          {required:true, message:'必填', trigger:'blur'}
        ],
        district: [
          {required:true, message:'必填', trigger:'blur'}
        ],
        longitude: [
          {required:true, message:'必填', trigger:'blur'}
        ],
        latitude: [
          {required:true, message:'必填', trigger:'blur'}
        ],
        tags: [
          {required:true, message:'必填', trigger:'change'}
        ],
      },
      
    }
  },

  methods:{
    // 执行提交表单 
    submit(){ 
      this.$refs['form'].validate(valid=>{
        if(valid){ // 所有字段验证通过
          // 整理字段 
          this.form.tags = this.form.tags.join(',')
          console.log(this.form)
          // 发送新增影院请求，执行业务
          httpApi.cinemaApi.add(this.form).then(res=>{
            if(res.data.code==200){ // 新增成功
              this.$message({
                message: '恭喜，影院新增成功',
                type: "success"
              })
              this.$router.push('/home/cinema-list')
            }
          })
        }
      })
    },

    // 初始化地图
    initMap(){

      AMapLoader.load({
        key:"c9d5edc26fe4e11067fca40a655ec499",             // 申请好的Web端开发者Key，首次调用 load 时必填
        version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins:['AMap.Geocoder'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap)=>{
        this.map = new AMap.Map("mapContainer",{  //设置地图容器id
          viewMode:"3D",    //是否为3D地图模式
          zoom:15,           //初始化地图级别
          center:[108.907984,34.246363], //初始化地图中心点位置
        });
        // 为map绑定点击事件，获取经纬度
        this.map.on('click', (e)=>{
          let lng = e.lnglat.KL  // 经度
          let lat = e.lnglat.kT  // 纬度
          console.log({lng, lat})
          // 通过经纬度，访问高德地图服务，执行逆地理编码，获取位置信息       
          let geocoder = new AMap.Geocoder()
          geocoder.getAddress([lng, lat], (status, result)=>{
            console.log(status, result)
            // 回填表单
            this.form.address = result.regeocode.formattedAddress
            let addr = result.regeocode.addressComponent
            this.form.province = addr.province
            this.form.city = addr.city? addr.city:addr.province
            this.form.district = addr.district
            this.form.latitude = lat
            this.form.longitude = lng
          })
        })
      }).catch(e=>{
        console.log(e);
      })
    },
  },

  mounted(){
    this.initMap()
    // 加载所有的影院标签
    httpApi.cinemaApi.queryTypes().then(res=>{
      console.log(res)
      this.tags = res.data.data
    })
  }
};

</script>

<style lang="scss" scoped>
</style>