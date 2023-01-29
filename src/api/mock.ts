import axios from 'axios'
const mock = axios.create({
  baseURL: 'http://localhhost:5173',
  timeout: 5000,
  headers: {
    // 请求头格式声明
    'Content-Type': 'application/json;charest=utf-8',
  },
})
// Mock数据
export const Mockdata = () => mock({
  url: '/GoodsList/list',
  method: 'GET',
})
