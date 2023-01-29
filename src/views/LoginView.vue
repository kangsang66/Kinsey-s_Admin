<template>
	<div id="bg" :style="{ 'background-image': `url(${changeBgImg})` }">
		<teleport to="body">
			<div class="systemMsg fade-in-left">
				<h1>Kinsey's Admin</h1>
				<img class="systemMsg-img" src="../assets/computer.svg" alt="" />
				<span class="systemMsg-text">基于Vue3 + ts + element-plus的后台管理系统</span>
			</div>
			<div class="login fade-in-bottom" :style="{ 'background-color': changeBgColor }">
				<h1 :style="{ color: changeTextColor }">登录</h1>
				<!-- 表单 -->
				<el-form
					ref="ruleFormRef"
					:model="ruleForm"
					status-icon
					:rules="rules"
					label-width="0"
					class="login-ruleForm w-50 m-2"
				>
					<!-- 表单个人信息 -->
					<el-form-item prop="userName">
						<el-input
							v-model="ruleForm.userName"
							size="large"
							type="password"
							placeholder="admin"
							autocomplete="off"
						/>
					</el-form-item>
					<el-form-item prop="checkPass">
						<el-input
							v-model="ruleForm.passWord"
							size="large"
							type="password"
							placeholder="123456"
							autocomplete="off"
						/>
					</el-form-item>
					<el-form-item>
						<el-button class="login-btn" type="primary" round @click="submitForm(ruleFormRef)"
							>登录</el-button
						>
						<el-button class="login-btn" @click="resetForm(ruleFormRef)" round>重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="changeColor" @click="changeColor">
				<div class="changeColor-box" :style="{ transform: `translateX(${changeTrsx})` }"></div>
				<!-- moon -->
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					></path>
				</svg>
				<!-- sun -->
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
					></path>
				</svg>
			</div>
		</teleport>
	</div>
</template>

<script setup lang="ts">
	import { reactive, toRefs, ref } from 'vue';
	import { FormInstance } from 'element-plus';
	// ts接口类型
	import { LoginData } from '../type/Login';
	// 接口
	import { LoginAPI } from '../api/index';
	// 路由
	import { useRouter } from 'vue-router';
	// 引入外部ts 并实例化限制数据类型
	const data = reactive(new LoginData());
	// == 校验规则 ==
	const rules = {
		userName: [
			{ required: true, message: '请输入账号', trigger: 'blur' },
			{ min: 5, max: 12, message: '账号长度为5到12', trigger: 'blur' },
		],
		passWord: [
			{ required: true, message: '请输入密码', trigger: 'blur' },
			{ min: 6, max: 16, message: '密码长度为6到16', trigger: 'blur' },
		],
	};
	// == 定义路由 ==
	const router = useRouter();
	// == 动画 ==
	const trs = ref<string>('0');
	// == 验证规则 ==
	const ruleFormRef = ref<FormInstance>();
	// == 登录验证 ==
	const submitForm = (formEl: FormInstance | undefined) => {
		// 如果不存在表单数据
		if (!formEl) return;
		// 验证表单数据
		formEl.validate((valid) => {
			// 返回表单验证
			if (valid) {
				LoginAPI(data.ruleForm).then(
					(res) => {
						const DateNow: number = Date.now();
						trs.value = 40 + '%';
						localStorage.setItem('token', res.data.token);
						localStorage.setItem('token-time', JSON.stringify(DateNow));
						setTimeout(() => {
							router.push('/Home');
						}, 1000);
					},
					(err) => {
						throw err;
					}
				);
			} else {
				return false;
			}
		});
	};
	// == 重置表单 ==
	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return;
		formEl.resetFields();
	};
	const { ruleForm } = toRefs(data);
	// == 主题颜色 ==
	const changeTextColor = ref<string>('#282828');
	const changeBgColor = ref<string>('#fff');
	const changeBgImg = ref<string>('/src/assets/login-bg.b9f5c736.svg');
	const changeTrsx = ref<string>('0');
	const isDark = ref<boolean>(false);
	// == 切换主题 ==
	const changeColor = () => {
		if (isDark.value === false) {
			changeTrsx.value = 30 + 'px';
			changeBgColor.value = '#293146';
			changeTextColor.value = '#b3b5bd';
			changeBgImg.value = '/src/assets/login-bg-dark.446f95f2.svg';
		} else if (isDark.value === true) {
			changeTrsx.value = 0 + 'px';
			changeBgColor.value = '#fff';
			changeTextColor.value = '#282828';
			changeBgImg.value = '/src/assets/login-bg.b9f5c736.svg';
		}
		isDark.value = !isDark.value;
	};
</script>

<style lang="less" scoped>
	:deep(.el-input__inner) {
		border: none;
		outline: none;
	}

	:deep(.el-input_wrapper .is-focus) {
		box-shadow: none !important;
	}

	#bg {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		width: 105%;
		height: 100vh;
		background-size: 100% 100%;
		background-image: url(../assets/login-bg.b9f5c736.svg);
		margin-left: -48%;
		background-position: 100%;
		background-repeat: no-repeat;
		background-size: auto 100%;
		transform: translateX(v-bind(trs));
		transition: 1s;
	}

	.systemMsg {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		top: 100px;
		left: 200px;
		width: 300px;
		height: 500px;

		&-img {
			width: 100%;
		}

		&-text {
			text-align: center;
			letter-spacing: 1px;
			height: 100px;
			font-size: 20px;
			color: #fff;
		}

		h1 {
			color: #fff;
			font-size: 28px;
			transition: 0.6s;

			&:hover {
				color: pink;
			}
		}
	}

	.login {
		margin: 30vh 0 0 60vw;
		padding: 40px;
		width: 400px;
		height: 300px;
		box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
		border-radius: 20px;
		transition: 0.6s;

		h1 {
			text-align: left;
			font-size: 24px;
			height: 60px;
		}

		&-ruleForm {
			width: 80%;
		}

		&-btn {
			width: 46%;
		}
	}

	.changeColor {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0px 5px;
		position: fixed;
		top: 10px;
		right: 20px;
		width: 60px;
		height: 30px;
		line-height: 30px;
		background-color: brown;
		border-radius: 15px;
		text-align: center;

		svg {
			width: 15px;
			height: 15px;
		}

		&-box {
			position: absolute;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			background-color: #fff;
			transition: 0.6s;
			will-change: transform;
		}
	}

	.fade-in-bottom {
		-webkit-animation: fade-in-bottom 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
		animation: fade-in-bottom 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
	}

	.fade-in-left {
		-webkit-animation: fade-in-left 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
		animation: fade-in-left 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
	}

	@-webkit-keyframes fade-in-bottom {
		0% {
			-webkit-transform: translateY(50px);
			transform: translateY(50px);
			opacity: 0;
		}

		100% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes fade-in-bottom {
		0% {
			-webkit-transform: translateY(50px);
			transform: translateY(50px);
			opacity: 0;
		}

		100% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			opacity: 1;
		}
	}

	@-webkit-keyframes fade-in-left {
		0% {
			-webkit-transform: translateX(-50px);
			transform: translateX(-50px);
			opacity: 0;
		}

		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes fade-in-left {
		0% {
			-webkit-transform: translateX(-50px);
			transform: translateX(-50px);
			opacity: 0;
		}

		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			opacity: 1;
		}
	}
</style>
