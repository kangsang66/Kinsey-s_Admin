import service from '../utils/request';

// menu数据
export const Menudata = () => service({
  url: '/menuList',
  method: 'GET',
})
