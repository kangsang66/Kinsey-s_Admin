export interface LoginDataType {
	userName: string;
	passWord: string;
}
// 使用class
export class LoginData {
	ruleForm: LoginDataType = {
		userName: '',
		passWord: '',
	};
}
