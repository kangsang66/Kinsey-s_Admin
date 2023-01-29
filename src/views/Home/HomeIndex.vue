<template>
	<!-- 用户欢迎页 -->
	<!-- 来几个盒子可以hover + 阴影  -->
	<!-- echarts图来三个  + 数据通过node连接数据库-->
	<!-- == 盒子 ==  -->
	<el-row :gutter="20">
		<el-col
			class="animate__fadeInUp animate__animated"
			:span="6"
			v-for="item in dataResult"
			:key="item.id"
		>
			<div class="grid-content ep-bg-purple">
				<el-skeleton v-if="useItemStore().show" :rows="3" animated :throttl="0" />
				<div v-if="!useItemStore().show">
					<div class="header">
						<span>{{ item.name }}</span>
						<span>
							<svg class="icon" aria-hidden="true">
								<use :xlink:href="item.littleIcon"></use>
							</svg>
						</span>
					</div>
					<div class="main">
						<div class="main-left">
							<span>${{ item.value.toFixed(0) }}</span>
							<span>
								<svg class="icon" aria-hidden="true">
									<use :xlink:href="item.iconName"></use>
								</svg>
							</span>
						</div>
						<div class="main-right">
							<span>总访问数</span>
							<span>${{ item.Allvalue }}</span>
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
	<!-- == echarts ==  -->
	<div class="echarts">
		<HomeInfo />
		<HomeCalendar />
		<HomePercentage />
	</div>
	<div>
		<HomeTime />
	</div>
</template>

<script setup lang="ts">
	import HomePercentage from '../../components/Goods/HomePercentage.vue';
	import HomeCalendar from '../../components/Goods/HomeCalendar.vue';
	import HomeInfo from '../../components/Goods/HomeInfo.vue';
	import HomeTime from '../../components/Goods/HomeTime.vue';
	import { gsap } from 'gsap';
	import { onMounted, ref } from 'vue';
	import { GetIndexHeaderDataAPI } from '../../api/index';
	import { useItemStore } from '../../store/index';
	// == 获取数据 ==
	const dataResult: any = ref([]);
	const getdata = async () => {
		const res: any = await GetIndexHeaderDataAPI();
		dataResult.value = res.data;
	};

	// == gsap数字过渡 ==
	const trsNum = () => {
		setTimeout(() => {
			dataResult.value.forEach((ele: any) => {
				gsap.from(ele, {
					duration: 2,
					value: 0,
				});
			});
		}, 30);
	};

	// == 挂载 ==
	onMounted(() => {
		if (useItemStore().show === true) {
			setTimeout(() => {
				useItemStore().show = false;
				trsNum();
			}, 2000);
		}
		getdata();
	});
</script>

<style scoped lang="less">
	.el-row {
		margin-bottom: 20px;
	}
	.el-row:last-child {
		margin-bottom: 0;
	}
	.el-col {
		border-radius: 4px;
	}

	.grid-content {
		padding: 10px;
		background-color: #fff;
		border-radius: 4px;
		min-height: 36px;
		height: 200px;
		border-radius: 15px;
		&:hover {
			transition: 0.3s;
			transform: scale(105%);
			box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
		}
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 40px;
			padding: 10px 30px;
			border-bottom: 1px solid #eee;
			.icon {
				width: 1.5em;
				height: 1.5em;
			}
		}
		.main {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20px 25px;
			flex-wrap: wrap;
			height: 160px;
			.icon {
				width: 2em;
				height: 2em;
			}
			span {
				font-size: 30px;
				margin: 5px;
			}
			&-left,
			&-right {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			&-right {
				span {
					font-size: 22px;
				}
			}
		}
	}
	.echarts {
		display: flex;
		height: 520px;
	}
</style>
