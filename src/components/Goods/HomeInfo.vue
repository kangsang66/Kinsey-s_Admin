<template>
	<div id="UserInfo">
		<el-skeleton v-if="useItemStore().show" :rows="10" animated :throttl="0" />
		<div v-if="!useItemStore().show">
			<div class="todos">
				<h3>今日待办</h3>
				<el-button type="primary" @click="Add" round>添加</el-button>
			</div>
			<div class="info">
				<span>完成</span>
				<span>编辑</span>
				<span>删除</span>
			</div>
			<div class="cards">
				<el-empty description="今日任务已清空" v-show="todoList.length === 0" />
				<div
					v-for="(item, id) in todoList.slice(pre, next)"
					:key="id"
					class="text item box-card-inner"
					v-show="item"
				>
					{{ item }}
					<div class="ico">
						<span @click="finish(item)">
							<Finished style="width: 22px; color: #0960bd; height: 22px" />
						</span>

						<span @click="edit(item)">
							<Edit style="width: 22px; color: #0960bd; height: 22px" />
						</span>

						<el-popconfirm
							confirm-button-text="确认"
							cancel-button-text="取消"
							:icon="InfoFilled"
							icon-color="#626AEF"
							title="确认删除?"
							@confirm="del(item)"
						>
							<template #reference>
								<span>
									<Delete style="width: 22px; color: #0960bd; height: 22px" />
								</span>
							</template>
						</el-popconfirm>
					</div>
				</div>
				<div class="pagination">
					<el-pagination
						v-model:current-page="currentPage"
						:page-size="pageSize"
						background
						layout="prev, pager, next"
						:total="todoList.length"
						class="mt-4"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	// == vue ==
	import { watch, ref, onMounted } from 'vue';
	// == 动画 ==
	import JSConfetti from 'js-confetti';
	// == 引入 ==
	import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';

	// == 接口 ==
	import { GetdujitangAPI } from '../../api/index';

	// == pinia ==
	import { useItemStore } from '../../store';
	import { InfoFilled } from '@element-plus/icons-vue';
	const data = useItemStore();
	let todoList: string[] = data.todoList;

	// == 添加 ==
	const Add = () => {
		ElMessageBox.prompt('请输入需要添加的待办事件', '添加', {
			confirmButtonText: '提交',
			cancelButtonText: '取消',
			inputPattern: /\s*\S+?/,
			inputErrorMessage: '不能为空',
			draggable: true,
		})
			.then(({ value }) => {
				// == 如果已经存在 ==
				if (todoList.includes(value)) {
					ElMessage({
						type: 'warning',
						message: '已经存在该事件',
					});
				} else {
					todoList.unshift(value.trim());
					ElMessage({
						type: 'success',
						message: '添加成功',
					});
				}
			})
			.catch(() => {
				ElMessage({
					type: 'info',
					message: '取消添加',
				});
			});
	};
	// == 删除 ==
	const del = (todo: any) => {
		// == 注意这里 ==
		todoList.splice(todoList.indexOf(todo), 1);
		ElNotification({
			title: '成功',
			message: '删除成功',
			duration: 1500,
		});
		console.log(todoList.length);
	};
	// == 编辑 ==
	const edit = (todo: any) => {
		ElMessageBox.prompt('请输入要修改的内容', '修改', {
			confirmButtonText: '提交',
			cancelButtonText: '取消修改',
			inputValue: todoList[todoList.indexOf(todo)],
			inputPattern: /\s*\S+?/,
			inputErrorMessage: '不能为空',
			draggable: true,
		})
			.then(({ value }) => {
				// == 如果已经存在 ==
				if (todoList[todoList.indexOf(todo)] === value) {
					ElMessage({
						type: 'info',
						message: '未做修改',
					});
					// == 判断是否做了修改 ==
				} else if (todoList.includes(value)) {
					ElMessage({
						type: 'warning',
						message: '已经存在该事件',
					});
				} else {
					todoList[todoList.indexOf(todo)] = value;
					ElMessage({
						type: 'success',
						message: '修改成功',
					});
				}
			})
			.catch(() => {
				ElMessage({
					type: 'info',
					message: '取消修改',
				});
			});
	};
	// == 完成 ==
	const finish = async (todo: any) => {
		let res = await GetdujitangAPI();
		todoList.splice(todoList.indexOf(todo), 1);
		ElMessageBox.alert(`${res.data.text}`, '每日激励', {
			confirmButtonText: '确认',
		});
	};
	// == 动画 ==
	const confetti: any = new JSConfetti();
	watch(
		() => todoList.length,
		() => {
			if (todoList.length === 0) {
				confetti.addConfetti();
			}
		}
	);

	// == 分页数据 ==
	const currentPage: any = ref<number>(1);
	const pageSize: any = ref<number>(5);
	const pre = ref<number>(0);
	const next = ref<number>(5);

	// == 切换页功能 ==
	watch(
		// - 监视页数 -
		() => currentPage.value,
		(newValue, oldValue) => {
			const preValue = pageSize.value * (newValue - oldValue);
			const nextValue = pageSize.value * (oldValue - newValue);
			// (0,5)  (5,10)
			// 0 = 5
			// 5 = 10
			if (newValue > oldValue) {
				pre.value += preValue;
				// 5 * 1
				next.value += preValue;
			} else if (newValue < oldValue) {
				// 5 = 0
				// 10 = 5
				pre.value -= nextValue;
				next.value -= nextValue;
			}
		}
	);

</script>

<style lang="less" scoped>
	#UserInfo {
		position: relative;
		flex: 2;
		height: 480px;
		padding: 20px;
		border-radius: 15px;
		background-color: #fff;
		margin-right: 20px;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

		.todos {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.info {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 13px;
			color: #409eff;
			margin-top: 20px;
			padding: 0 22px 0 0;
			cursor: default;

			span {
				margin: 0px 2px;
			}
		}

		.cards {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin: 10px 0;
			transition: 0.6s;

			.box-card {
				&-inner {
					width: 100%;
					height: 50px;
					margin: 5px 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					background-color: #f5f7fa;
					transition: 0.3s;
					padding: 0 20px;
					border-radius: 10px;
					color: #333;

					&:hover {
						box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
					}

					.ico {
						span {
							margin: 0px 5px;
						}
					}

					svg {
						cursor: pointer;
						border-radius: 50%;
						transition: 0.3s;

						&:hover {
							background-color: #eee;
							box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
								rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
						}
					}
				}
			}

			.pagination {
				position: absolute;
				bottom: 0%;
				left: 50%;
				transform: translate(-50%, -50%);
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
