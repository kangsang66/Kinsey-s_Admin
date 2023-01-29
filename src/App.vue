<template>
	<el-config-provider :locale="locale">
		<div @contextmenu.prevent="">
			<router-view />
		</div>
	</el-config-provider>
</template>

<script setup lang="ts">
	// == 国际化 ==
	import { ElConfigProvider } from 'element-plus';
	import zhCn from 'element-plus/lib/locale/lang/zh-cn';
	const locale = zhCn;
</script>

<style lang="less">
	.fade-in-bottom {
		-webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
		animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
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

	// 整个滚动条
	::-webkit-scrollbar {
		width: 5px;
		height: 10px;
		background-color: #eee;
		// 滚动条轨道
		&-track {
			box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
			background-color: transparent;
		}
		// 滚动滑块
		&-thumb {
			background-color: #0960bd;
			background-image: -webkit-linear-gradient(
				45deg,
				rgba(255, 255, 255, 0.4) 25%,
				transparent 25%,
				transparent 50%,
				rgba(255, 255, 255, 0.4) 50%,
				rgba(255, 255, 255, 0.4) 75%,
				transparent 75%,
				transparent
			);
			border-radius: 2em;
		}
	}

	.icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
		color: black;
	}
</style>
