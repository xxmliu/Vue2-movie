import myaxios from "../MyAxios";

import URLENV from "@/http/BaseUrl";
const BMDURL = URLENV.BMDURL;

const adminApi = {
  /**
   * 执行登录业务
   * @param {Object} params {username:xx,  password:xxx}
   */
  login(params) {
    return myaxios.post(BMDURL + "/user/login", params);
  },
};

export default adminApi;
