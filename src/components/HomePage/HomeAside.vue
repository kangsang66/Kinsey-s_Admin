<template>
	<!-- 侧边栏 -->
	<el-col>
		<el-menu
			background-color="#001628"
			class="el-menu-vertical-demo menu"
			v-if="useItemStore().Permission[0]"
			:default-active="defaultActive"
			:unique-opened="true"
			text-color="#ffffffb3"
			router
		>
			<div class="menu-title">
				<!-- logo -->
				<div class="aside-top">
					<img class="aside-logo" src="https://www.kangsang666.top/logo.png" alt="" />
					<span class="aside-name">Kinsey's Admin</span>
				</div>
				<el-menu-item
					v-if="useItemStore().Permission[0]"
					index="/Home/Index"
					@click="AddHistory(useItemStore().Permission[0].authName)"
				>
					<el-icon>
						<component :is="ELiconsName[4]"></component>
					</el-icon>
					<span>{{ useItemStore().Permission[0].authName }}</span>
				</el-menu-item>
				<el-sub-menu
					:index="item.path"
					v-for="(item, id) in useItemStore().Permission.slice(1)"
					:key="id"
				>
					<template #title>
						<div class="menu-svg">
							<el-icon>
								<component :is="ELiconsName[id]"></component>
							</el-icon>
						</div>
						<span>{{ item.authName }}</span>
					</template>
					<el-menu-item
						:index="it.path"
						v-for="it in item.children"
						@click="AddHistory(it.authName)"
						:key="item.id"
					>
						<span>{{ it.authName }}</span>
					</el-menu-item>
				</el-sub-menu>
			</div>
		</el-menu>
	</el-col>
</template>

<script setup lang="ts">
	import { MenudataAPI } from '../../api/index';
	import { onMounted, ref, watch } from 'vue';
	import { useItemStore } from '../../store';
	import { useRouter } from 'vue-router';
	// == router ==
	const router = useRouter();
	// == ICON 图标 ==
	const ELiconsName = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart']);

	// == 默认菜单高亮 ==
	const defaultActive: any = ref('/Home/Index');
	// == 监视路由路径 ==
	watch(
		() => router.currentRoute.value.fullPath,
		() => {
			defaultActive.value = router.currentRoute.value.fullPath;
		},
		{
			immediate: true,
			deep: true,
		}
	);
	// == 菜单数据 ==
	const getMenudata = async () => {
		const res = await MenudataAPI();
		useItemStore().Permission = res.data;
	};

	// == 自动去重 ==
	const itemdata = useItemStore().historicRecords;
	const AddHistory = (name: any) => {
		// == 类型断言 ==
		itemdata.add(name as never);
	};

	// == 挂载渲染 ==
	onMounted(() => {
		getMenudata();
	});
</script>

<style lang="less" scoped>
	:deep(.el-menu .el-menu--inline .el-menu-item) {
		span {
			margin-left: 10px !important;
		}
	}

	:deep(.el-sub-menu__title),
	:deep(.el-menu-item) {
		&:hover {
			transition: 0.4s;
			color: #fff !important;
		}
	}

	.el-menu-item {
		&-hover {
			color: #fff !important;
		}
	}

	.el-menu {
		border: 0;
		svg {
			width: 30px;
			height: 30px;
		}

		.menu-svg {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.el-menu-item.is-active {
		color: #fff !important;
		background-color: #0960bd !important;
	}

	.aside-top {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background-color: #001529;
		height: 70px;
		padding: 0 10px;
		line-height: 70px;
	}

	.aside-logo {
		width: 35px;
		border-radius: 50%;
	}

	.aside-name {
		font-size: 18px;
		color: #fff;
		margin-left: 5px;
		font-weight: 700;
	}
</style>
