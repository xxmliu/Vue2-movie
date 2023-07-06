import myaxios from "../MyAxios";

import URLENV from "@/http/BaseUrl";
const BMDURL = URLENV.BMDURL;

const cinemaRoomApi = {


  /**
   * 删除放映厅接口
   * @param {Object} params {id:4}
   */
  delete(params){
    return myaxios.post(BMDURL + "/cinema-room/del", params)
  },

  /**
   * 添加放映厅接口
   * @param {Object} params 详见接口文档
   */
  add(params) {
    return myaxios.post(BMDURL + "/cinema-room/add", params);
  },

  /**
   * 根据影院ID查询所有放映厅
   */
  list(params){
    return myaxios.get(BMDURL + "/cinema-rooms/cinemaid", params)
  },

  /**
   * 查询所有放映厅类型
   */
  queryAllTypes() {
    return myaxios.get(BMDURL + "/cinema-room/types");
  },

  /**
   * 修改座位模板
   */
  updateSeatTemplate(params){
    return myaxios.post(BMDURL + "/cinema-room/edit-seat-template", params)
  },

  /**
   * 通过ID所有放映厅信息
   */
   queryById(params) { 
    return myaxios.get(BMDURL + "/cinema-room/query", params);
  },

};

export default cinemaRoomApi;
