<template>
	<div class="canlendar">
		<el-skeleton v-if="useItemStore().show" :rows="10" animated :throttl="0" />
		<el-calendar v-if="!useItemStore().show">
			<template #dateCell="{ data }">
				<p :class="data.isSelected ? 'is-selected' : ''">
					{{ data.day.split('-').slice(1).join('-') }}
					{{ data.isSelected ? '✔️' : '' }}
				</p>
			</template>
		</el-calendar>
	</div>
</template>

<script setup lang="ts">
	import { template } from 'lodash';
	import { useItemStore } from '../../store/index';
</script>

<style scoped lang="less">
	:deep(.el-calendar-day) {
		height: 60px !important;
	}

	:deep(.el-calendar__body) {
		padding: 0px !important;
	}

	:deep(.el-calendar) {
		border-radius: 20px;
	}

	.is-selected {
		color: #1989fa;
	}

	.canlendar {
		flex: 5;
		height: 480px;
		padding: 15px 20px;
		border-radius: 20px;
		background-color: #fff;
	}
</style>
