<template>
  <div>
    <div style="height: 250px; border: 1px solid #666" id="mapContainer"></div>
    <el-divider content-position="left">电影院列表</el-divider>
    <!-- 表格 -->
    <el-table :data="cinemas">
      <el-table-column
        sortable
        :sort-method="sortByName"
        width="280px"
        label="影院名称"
        prop="cinema_name"
      ></el-table-column>
      <el-table-column label="影院地址" prop="address"></el-table-column>
      <el-table-column label="影院位置" width="200px">
        <template slot-scope="scope">
          {{ scope.row.province }}
          {{ scope.row.city }}
          {{ scope.row.district }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230px">
        <template slot-scope="scope">
          <el-button 
            @click="moveToPosition(scope.row.longitude,scope.row.latitude)"
            ize="small" type="info" icon="el-icon-location-outline" circle></el-button>
          <el-button 
            @click="$router.push(
              `/home/cinema-room-list/${scope.row.id}`)"
              size="small" type="primary" icon="el-icon-view" circle></el-button>
          <el-button 
            @click="$router.push(
              `/home/cinema-update/${scope.row.id}`)" 
              size="small" type="warning" icon="el-icon-edit" circle></el-button>
          <el-button 
            @click="del(scope.row.id)"
            size="small" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import httpApi from "@/http";
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
  data() {
    return {
      cinemas: [], // 保存所有影院信息
    };
  },

  methods: {

    // 将地图移动到某一个定位点为止
    moveToPosition(lng,lat){
      // console.log({lng,lat});
      // 将地图中心点移动到该位置
      this.map.setZoomAndCenter(17,[lng, lat], false, 1000)
    },

    // 初始化地图
    initMap() {
      AMapLoader.load({
        key: "c9d5edc26fe4e11067fca40a655ec499", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Geocoder"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.map = new AMap.Map("mapContainer", {
            //设置地图容器id
            viewMode: "3D", //是否为3D地图模式
            zoom: 17, //初始化地图级别
            center: [108.907984, 34.246363], //初始化地图中心点位置
          });

          // 地图加载完毕后，加载影院列表
          this.listCinemas();
          
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // 自定义排序规则 将会传入两个元素 需要返回数字 -1 0 1
    sortByName(a, b) {
      return a.length - b.length;
    },

    // 加载所有影院信息
    listCinemas() {
      httpApi.cinemaApi.queryAll().then((res) => {
        console.log(res);
        this.cinemas = res.data.data;

        this.cinemas.forEach(item=>{
          let lnglat = [item.longitude,item.latitude]
          console.log(lnglat);
          // 添加一个Marker对象
          let marker = new AMap.Marker({
            position: lnglat
          })
          this.map.add(marker)
        })
      })
    },

    // 通过id删除放映厅
    del(id){
      this.$confirm('是否永久移除该影院？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res=>{
        // 执行删除影院，发送删除请求
        httpApi.cinemaApi.delete({id}).then(res=>{
          if(res.data.code==200){
            this.$message({
                message: '恭喜，删除成功',
                type: 'success'
              })
            this.listCinemas()
          }
        })
      })
    },

  },

  /** 生命周期 */
  mounted() {
    this.initMap()
  },
}
</script>

<style lang="scss" scoped></style>
