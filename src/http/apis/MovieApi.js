// Movie.js 封装电影模块相关接口
import myaxios from '../MyAxios'
import BASEURL from '../BaseUrl'
const BMDURL = BASEURL.BMDURL

const movieApi = {

    /** 根据id，更新电影信息 */
    update(params){
        let url = BMDURL + "/movie-info/update"
        return myaxios.post(url, params)
    },

    /** 通过id查询电影详情 */
    queryById(params){
        let url = BMDURL + "/movie-info/query"
        return myaxios.get(url, params)
    },

    /**
     * 新增电影
     * @param {Object} params 
     */
    add(params){
        let url = BMDURL + "/movie-info/add"
        return myaxios.post(url, params)
    },

    /** 查询电影类型 */
    queryTypes(){
        let url = BMDURL + "/movie-types" 
        return myaxios.get(url)
    },

    /**
     * 删除业务
     * @param {Object} params 请求参数：{id:1}
     */
    delete(params){
        let url = BMDURL + "/movie-info/del"
        return myaxios.post(url, params)
    },

    /**
     * 根据电影名称关键字，模糊查询电影列表
     * @param {Object} params 请求参数对象 
     *        params的格式如： {name:关键字, page:1, pagesize:2}
     */
    queryByNameLike(params){
        let url = BMDURL + "/movie-infos/name"
        return myaxios.post(url, params)
    },
    
    /** 查询所有电影，接收参数params: {page:1, pagesize:10} */
    queryAll(params){
        let url = BMDURL + "/movie-infos"
        return myaxios.get(url, params)
    }
}

export default movieApi;