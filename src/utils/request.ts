import axios from 'axios';
// 判断token是否过期
import { diffTokenTime } from './auth';
import { useItemStore } from '../store/index';
import { ElMessage } from 'element-plus';
// 创建axios实例
const service = axios.create({
	baseURL: 'https://www.fastmock.site/mock/bd48ce8ff97bf753ed1f2f5244a68d98/vue3_ts',
	timeout: 5000,
	headers: {
		// 请求头格式声明
		'Content-Type': 'application/json;charest=utf-8',
	},
});
// 请求拦截器
service.interceptors.request.use(
	(config) => {
		// 可能不存在该属性=> 赋值为空对象
		config.headers = config.headers || {};
		// 判断是否登录
		if (localStorage.getItem('token')) {
			// 可能不存在token => 赋值为空字符串
			config.headers.token = localStorage.getItem('token') || '';
			if (diffTokenTime()) {
				// 如果过期就转到登录页
				useItemStore().logOut();
				return ElMessage('Token已过期,请重新登录!');
			}
		}
		return config;
	},
	(err) => {
		throw err;
	}
);

// 响应拦截器
service.interceptors.response.use(
	(res) => {
		// 获取响应状态码
		const code: number = res.data.code;
		// 如果失败
		if (code != 200) {
			// 抛出失败
			return Promise.reject();
		}
		// 返回响应的数据
		return res.data;
	},
	(err) => {
		throw err;
	}
);
export default service;
