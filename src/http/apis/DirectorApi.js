// DirectorApi.js 封装导演模块相关接口
import myaxios from '../MyAxios'
import BASEURL from '../BaseUrl'
const BMDURL = BASEURL.BMDURL

const directorApi = {

    /** 查询所有导演 返回Promise对象 */
    queryAllDirectors(){
        let url = BMDURL + "/movie-directors"
        return myaxios.get(url, {page:1, pagesize:100})
    },

    /**
     * 通过姓名模糊查询导演列表
     * @param {Object} params 请求参数对象。例如： {name:'张'}
     * @return Promise
     */
    queryByNameLike(params){
        let url = BMDURL + "/movie-directors/name"
        return myaxios.post(url, params)
    },

    /**
     * 添加导演
     * @param {Object} params 参数对象。
     *  例如：{directorName:导演名称, directorAvatar:导演头像}
     * @return Promise
     */
    add(params){
        let url = BMDURL + "/movie-director/add"
        return myaxios.post(url, params)
    },

    /**
     * 删除导演
     * @param {Object} params 参数对象。  {id:导演id}
     * @return Promise
     */
    delete(params){
        let url = BMDURL + "/movie-director/del"
        return myaxios.post(url, params)
    }

}
export default directorApi;