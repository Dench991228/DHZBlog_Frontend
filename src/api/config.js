import QS from "qs";
export default {
  //baseURL: "http://localhost:8081/api/",
  baseURL: "http://182.92.223.226/",
  method: "GET",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json"
  },
  params: {},
  timeout: 10000,
  withCredentials: false,
  responseType: "json",
  maxContentLength: 2000,
  validateStatus: function(status) {
    return status >= 200 && status < 500;
  },
  maxRedirects: 5,
  transformRequest: [data => QS.stringify(data)], //post请求,对data进行转换
  paramsSerializer: params => QS.stringify(params), //get请求
  data: {}
};
