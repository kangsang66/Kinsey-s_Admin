<template>
	<div id="UserTime">
		<el-skeleton v-if="useItemStore().show" :rows="10" animated :throttl="0" />
	</div>
</template>

<script setup lang="ts">
	import * as echarts from 'echarts/core';
	import { useItemStore } from '../../store/index';
	import {
		TitleComponent,
		TitleComponentOption,
		ToolboxComponent,
		ToolboxComponentOption,
		TooltipComponent,
		TooltipComponentOption,
		GridComponent,
		GridComponentOption,
		LegendComponent,
		LegendComponentOption,
	} from 'echarts/components';
	import { LineChart, LineSeriesOption } from 'echarts/charts';
	import { UniversalTransition } from 'echarts/features';
	import { CanvasRenderer } from 'echarts/renderers';
	import { onMounted, ref } from 'vue';
	// == 接口 ==
	import { GetUserTimeDataAPI } from '../../api/index';
	echarts.use([
		TitleComponent,
		ToolboxComponent,
		TooltipComponent,
		GridComponent,
		LegendComponent,
		LineChart,
		CanvasRenderer,
		UniversalTransition,
	]);

	type EChartsOption = echarts.ComposeOption<
		| TitleComponentOption
		| ToolboxComponentOption
		| TooltipComponentOption
		| GridComponentOption
		| LegendComponentOption
		| LineSeriesOption
	>;
	// == 名称数据 ==
	const NameArr: string[] = [];
	// == 结果数据 ==
	const ValueArr: number[] = [];
	const getEchartsData = async () => {
		const res = await GetUserTimeDataAPI();
		return res;
	};
	async function UserTime() {
		// == 接收数据 ==
		const res = await getEchartsData();
		res.data.forEach((ele: any) => {
			ValueArr.push(ele.value);
			NameArr.push(ele.name);
		});
		var chartDom = document.getElementById('UserTime')!;
		var myChart = echarts.init(chartDom);
		var option: EChartsOption;

		option = {
			color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
			title: {
				text: '本周用户活跃度',
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985',
					},
				},
			},
			toolbox: {
				show: false,
			},
			grid: {
				left: '3%',
				right: '3%',
				bottom: '3%',
				containLabel: true,
			},
			xAxis: [
				{
					type: 'category',
					boundaryGap: false,
					data: NameArr,
				},
			],
			yAxis: [
				{
					type: 'value',
				},
			],
			series: [
				{
					name: '访问量',
					type: 'line',
					stack: 'Total',
					smooth: true,
					lineStyle: {
						width: 5,
					},
					showSymbol: true,
					areaStyle: {
						opacity: 0.8,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: 'rgb(128, 255, 165)',
							},
							{
								offset: 1,
								color: 'rgb(1, 191, 236)',
							},
						]),
					},
					emphasis: {
						focus: 'series',
					},
					data: ValueArr,
				},
			],
		};

		option && myChart.setOption(option);
	}

	// == 加入异步 ==
	onMounted(() => {
		if (useItemStore().show === true) {
			setTimeout(() => {
				UserTime();
			}, 2000);
		} else {
			UserTime();
		}
	});
</script>

<style lang="less" scoped>
	#UserTime {
		flex: 7;
		height: 480px;
		background-color: #fff;
		border-radius: 15px;
		padding: 20px;
		margin-bottom: 20px;
	}
</style>
