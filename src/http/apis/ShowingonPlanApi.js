import myaxios from "../MyAxios";

import URLENV from "@/http/BaseUrl";
const BMDURL = URLENV.BMDURL;

const showingonPlanApi = {
  /**
   * 添加排片计划接口
   * @param {Object} params
   */
  add(params) {
    return myaxios.post(BMDURL + "/plan/add", params);
  },

  /**
   * 通过roomId，查询放映厅列表
   * @param {Object} params {room_id: 1}
   */
  queryByRoomId(params) {
    return myaxios.get(BMDURL + "/plans/roomid", params);
  },

  /**
   * 根据ID删除排片计划
   * @param {Object} params  {id:1}
   */
  delete(params) {
    return myaxios.post(BMDURL + "/plan/del", params);
  },

  /**
   * 发布排片计划
   * @param {Object} params  {id:1}
   */
  publish(params) {
    return myaxios.post(BMDURL + "/plan/publish", params);
  },

  /**
   * 将排片计划设置为未发布状态
   * @param {Object} params  {id:1}
   */
  noPublish(params) {
    return myaxios.post(BMDURL + "/plan/no-publish", params);
  },
};

export default showingonPlanApi;
