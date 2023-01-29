import { defineStore } from 'pinia'
import router from '../router'
// 导入唯一id名
import { name } from './store-name'
import moment from 'moment'
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useItemStore = defineStore(name.name, {
  state: () => { // state是一个箭头函数
    return {
      historicRecords: new Set(['首页']),
      todoList: ['写代码', '复习', '学习英语', '总结'],
      userList: [],
      tableData: [
        {
          UserId: '1',
          UserName: '鸡哥',
          data: moment().subtract(5, 'day').format('YYYY-MM-DD'),
          authority: '超级管理员',
          OpenAuthority: true,
        },
        {
          UserId: '2',
          UserName: 'CXK',
          data: moment().subtract(4, 'day').format('YYYY-MM-DD'),
          authority: '超级管理员',
          OpenAuthority: false,
        },
        {
          UserId: '3',
          UserName: '丁真',
          data: moment().subtract(3, 'day').format('YYYY-MM-DD'),
          authority: '超级管理员',
          OpenAuthority: true,
        },
        {
          UserId: '4',
          UserName: '鲍勃',
          data: moment().subtract(2, 'day').format('YYYY-MM-DD'),
          authority: '员工',
          OpenAuthority: true,
        },
        {
          UserId: '5',
          UserName: '得韦德',
          data: moment().subtract(1, 'day').format('YYYY-MM-DD'),
          authority: '员工',
          OpenAuthority: false,
        },
      ],
      show: true, // 骨架屏
      Permission: [] // 权限
    }
  },
  // 修饰值 相当于computed
  getters: {
  },
  // 处理值 相当于methods
  actions: {
    // == 强制退出 ==
    logOut () {
      localStorage.clear()
      router.replace('/login')
    },
    // == 查询userList ==
    searchUserListById (id: number) {

    }
  },
})
