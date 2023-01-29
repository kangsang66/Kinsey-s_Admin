<template>
	<div class="progress">
		<el-skeleton v-if="useItemStore().show" :rows="10" animated :throttl="0" />
		<div class="progress-main" v-if="!useItemStore().show">
			<el-progress
				:percentage="Number(percentageOne.toFixed(0))"
				:show-text="true"
				:format="format"
				:stroke-width="10"
				color="#e6a23c"
				type="circle"
			/>
			<span>苹果用户</span>
		</div>
		<div class="progress-main" v-if="!useItemStore().show">
			<el-progress
				:percentage="Number(percentageTwo.toFixed(0))"
				:format="format"
				:show-text="true"
				:stroke-width="10"
				color="#13ce66"
				type="circle"
			/>
			<span>安卓用户</span>
		</div>
		<div class="progress-main" v-if="!useItemStore().show">
			<el-progress
				:percentage="Number(percentageThree.toFixed(0))"
				:format="format"
				:show-text="true"
				:stroke-width="10"
				color="#ff4949"
				type="circle"
			/>
			<span>电脑用户</span>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { gsap } from 'gsap';
	import { useItemStore } from '../../store/index';
	// == gsap数字过渡 ==
	const percentageOne = ref<number>(30);
	const percentageTwo = ref<number>(50);
	const percentageThree = ref<number>(70);
	const format = (percentage: any) => (percentage === 100 ? 'Full' : `${percentage}%`);
	const trsNum = () => {
		gsap.from(percentageOne, {
			duration: 2,
			value: 0,
		});
		gsap.from(percentageTwo, {
			duration: 2,
			value: 0,
		});
		gsap.from(percentageThree, {
			duration: 2,
			value: 0,
		});
	};

</script>

<style scoped lang="less">
	.progress {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		flex: 2;
		height: 480px;
		margin-left: 15px;
		border-radius: 20px;
		padding: 20px;
		background-color: #fff;

		&-main {
			flex: 1;
			width: 80%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			span {
				font-size: 24px;
			}
		}
	}
</style>
