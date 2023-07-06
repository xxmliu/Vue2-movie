// index.js 提供访问具体某接口模块对象
import actorApi from './apis/ActorApi'
import directorApi from './apis/DirectorApi'
import movieApi from './apis/MovieApi'
import cinemaApi from './apis/CinemaApi'
import cinemaRoomApi from './apis/CinemaRoomApi'
import showingonPlanApi from './apis/ShowingonPlanApi'
import adminApi from './apis/AdminApi'

const httpApi = {
    actorApi,
    directorApi,
    movieApi,
    cinemaApi,
    cinemaRoomApi,
    showingonPlanApi,
    adminApi
}

export default httpApi;
