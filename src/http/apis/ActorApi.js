// ActorApi.js 封装演员模块相关接口
import myaxios from '../MyAxios'
import BASEURL from '../BaseUrl'
const BMDURL = BASEURL.BMDURL

const actorApi = {

    /** 查询所有演员 返回Promise对象 */
    queryAllActors(){
        let url = BMDURL + "/movie-actors"
        return myaxios.get(url, {page:1, pagesize:100})
    },

    /**
     * 通过姓名模糊查询演员列表
     * @param {Object} params 请求参数对象。例如： {name:'张'}
     * @return Promise
     */
    queryByNameLike(params){
        let url = BMDURL + "/movie-actors/name"
        return myaxios.post(url, params)
    },

    /**
     * 添加演员
     * @param {Object} params 参数对象。
     *  例如：{actorName:演员名称, actorAvatar:演员头像}
     * @return Promise
     */
    add(params){
        let url = BMDURL + "/movie-actor/add"
        return myaxios.post(url, params)
    },

    /**
     * 删除演员
     * @param {Object} params 参数对象。  {id:演员id}
     * @return Promise
     */
    delete(params){
        let url = BMDURL + "/movie-actor/del"
        return myaxios.post(url, params)
    }

}
export default actorApi;