import service from '../utils/request';
interface LoginType {
	userName: string;
	passWord: string;
}
// 登录
export const Login = (data: LoginType) =>
	service({
		url: '/login',
		method: 'POST',
		data,
	});
