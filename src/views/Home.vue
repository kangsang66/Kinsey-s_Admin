<template>
	<div class="Home">
		<el-container>
			<!-- 侧边栏 -->
			<el-aside width="210px">
				<Aside />
			</el-aside>

			<el-container>
				<!-- 头部 -->

				<el-header class="Home-header">
					<el-row :gutter="0">
						<el-col class="Home-header-center" :span="20">
							<el-breadcrumb>
								<!-- 面包屑 -->
								<el-breadcrumb-item class="breadcrumbBox">
									<div
										class="Breadcrumbs swing-in-left-bck"
										:ref="BreadBox"
										v-for="(item, id) in itemArr"
										:key="id"
										@click="jumpRoutes(item)"
									>
										<span>{{ item }}</span>
										<el-icon v-if="item != '首页'" @click="deleteBreadBox(item)">
											<CloseBold />
										</el-icon>
									</div>
								</el-breadcrumb-item>
							</el-breadcrumb>
						</el-col>
						<el-col class="Home-header-right" :span="4">
							<span class="Home-header-right-fullscreen" @click="fullScreen">
								<FullScreen style="width: 22px; color: #0960bd; height: 22px" />
							</span>
							<el-avatar :size="30" src="https://www.kangsang666.top/logo.png"> </el-avatar>
							<el-button text @click="open">退出</el-button>
						</el-col>
					</el-row>
				</el-header>
				<!-- 内容区域 -->
				<el-main class="fade-in-bottom">
					<div>
						<router-view />
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
	import Aside from '../components/HomePage/HomeAside.vue';
	import screenfull from 'screenfull';
	import { CloseBold } from '@element-plus/icons-vue';
	import { ElMessage, ElMessageBox } from 'element-plus';
	import { useRouter } from 'vue-router';
	import { useItemStore } from '../store';
	// == pinia ==
	const itemdata = useItemStore().historicRecords;
	const itemArr = itemdata;

	// == router ==
	const router = useRouter();
	const routes = useRouter().getRoutes();
	// == 面包屑路由跳转 ==
	const jumpRoutes = (index: any) => {
		routes.forEach((item) => {
			if (item.meta.title === index) {
				router.push(item.path);
			} else {
				return;
			}
		});
	};
	// == 面包屑跳转样式 ==
	const BreadBox = (e: any) => {
		// 如果当前这个元素是对应itemdata
		if (e) {
			if (e.textContent.trim() === router.currentRoute.value.meta.title) {
				e.style.backgroundColor = '#0960bd';
				e.style.color = '#fff';
			} else {
				e.style.backgroundColor = '#fff';
				e.style.color = '#000';
			}
		}
	};
	// == 退出功能 ==
	const open = () => {
		ElMessageBox.confirm('你确定退出登录吗?', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
			beforeClose: (action, instance, done) => {
				if (action === 'confirm') {
					instance.confirmButtonLoading = true;
					instance.confirmButtonText = 'Loading...';
					setTimeout(() => {
						done();
						setTimeout(() => {
							instance.confirmButtonLoading = false;
							router.push('/Login');
						}, 300);
					}, 1500);
				} else {
					done();
				}
			},
		})
			.then(() => {
				ElMessage({
					type: 'success',
					message: '退出成功',
				});
			})
			.catch(() => {
				ElMessage({
					type: 'info',
					message: '取消退出',
				});
			});
	};
	// == 删除面包屑 ==
	const deleteBreadBox = (item: any) => {
		if (item === '首页') {
			return;
		} else {
			itemdata.delete(item);
		}
	};
	// == 全屏 ==
	const fullScreen = () => {
		if (screenfull.isEnabled) {
			screenfull.toggle();
		} else {
			return;
		}
	};
</script>

<style lang="less" scoped>
	:deep(.el-breadcrumb__inner) {
		display: flex;
		justify-content: space-between;
	}

	.el-header {
		height: 70px;
		padding-left: 0px;
	}

	.el-aside {
		padding-left: 0px;
		background-color: #001529;
	}

	.el-main {
		padding: 20px;
		height: calc(100vh - 70px);
		background-color: #eee;
	}

	.Home {
		&-header {
			width: 100%;

			&-center {
				text-align: center;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px;

				.breadcrumbBox {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.Breadcrumbs {
						position: relative;
						cursor: pointer;
						color: #fff;
						display: flex;
						justify-content: center;
						align-items: center;
						width: auto;
						margin: 10px;
						height: 30px;
						padding: 5px;
						background-color: #0960bd;
						transition: 0.6s;
						border: 1px solid #eee;

						.el-icon svg {
							color: #ee6666;
							transition: 0.3s;
							opacity: 0;
						}

						&:hover .el-icon svg {
							opacity: 1;
						}
					}
				}
			}

			&-right {
				display: flex;
				justify-content: flex-end;
				align-items: center;

				&-fullscreen {
					display: flex;
					justify-content: center;
					align-items: center;
					transition: 0.5s;
					background-color: #fff;
					margin-right: 15px;

					&:hover {
						background-color: #eee;
					}
				}
			}
		}
	}

	.swing-in-left-bck {
		-webkit-animation: swing-in-left-bck 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
		animation: swing-in-left-bck 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
	}

	@-webkit-keyframes swing-in-left-bck {
		0% {
			-webkit-transform: rotateY(-70deg);
			transform: rotateY(-70deg);
			-webkit-transform-origin: left;
			transform-origin: left;
			opacity: 0;
		}

		100% {
			-webkit-transform: rotateY(0);
			transform: rotateY(0);
			-webkit-transform-origin: left;
			transform-origin: left;
			opacity: 1;
		}
	}

	@keyframes swing-in-left-bck {
		0% {
			-webkit-transform: rotateY(-70deg);
			transform: rotateY(-70deg);
			-webkit-transform-origin: left;
			transform-origin: left;
			opacity: 0;
		}

		100% {
			-webkit-transform: rotateY(0);
			transform: rotateY(0);
			-webkit-transform-origin: left;
			transform-origin: left;
			opacity: 1;
		}
	}
</style>
