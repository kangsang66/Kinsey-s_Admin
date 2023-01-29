import axios from 'axios'
const server = axios.create({
  timeout: 3000,
  headers: {
    // 请求头格式声明
    'Content-Type': 'application/json;charest=utf-8',
  },
})
// == 获取首页头部数据 ==
export const GetIndexHeaderData = () => server({
  url: 'http://localhost:5000/index',
  method: 'GET'
})
// == 获取UserInfo数据 == 
export const GetUserInfoData = () => server({
  url: 'http://localhost:5000/UserInfo',
  method: 'GET'
})
// == 获取UserTime数据 == 
export const GetUserTimeData = () => server({
  url: 'http://localhost:5000/UserTime',
  method: 'GET'
})
// == 获取毒鸡汤 ==
export const Getdujitang = () => server({
  url: 'http://api.btstu.cn/yan/api.php?charset=utf-8&encode=json',
  method: 'GET'
})