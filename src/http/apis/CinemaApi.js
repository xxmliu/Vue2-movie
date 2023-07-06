/** 存放所有影院模块相关接口 */
import myaxios from "../MyAxios";

import URLENV from "@/http/BaseUrl";
const BMDURL = URLENV.BMDURL;

const CinemaApi = {

    /** 根据id，更新电影院信息 */
    update(params){
        let url = BMDURL + "/cinema/update"
        return myaxios.post(url, params)
    },

    /** 通过id查询影院详情 */
    queryById(params){
        let url = BMDURL + "/cinema/query"
        return myaxios.get(url, params)
    },

    /**
   * 删除影院接口
   * @param {Object} params {id:4}
   */
    delete(params){
        return myaxios.post(BMDURL + "/cinema/del", params)
    },

    /** 查询所有电影院 */
    queryAll(){
        let url = BMDURL + "/cinemas"
        return myaxios.get(url)
    },

    /** 添加影院 */
    add(params){
        let url = BMDURL + "/cinema/add"
        return myaxios.post(url, params)
    },

    /** 查询影院类型 */
    queryTypes(){
        let url = BMDURL + "/cinema/tags"
        return myaxios.get(url)
    }

};
export default CinemaApi;