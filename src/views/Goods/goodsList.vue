<template>
	<div class="User">
		<div class="title">
			<h3>角色列表</h3>
		</div>
		<!-- == 搜索 ==  -->
		<div class="Seach">
			<div>
				<el-input
					v-model="SearchValueById"
					class="w-50 m-2"
					size="large"
					placeholder="请输入用户id"
					:prefix-icon="Search"
				/>
			</div>
			<div>
				<el-input
					v-model="SearchValueByName"
					class="w-50 m-2"
					size="large"
					placeholder="请输入用户名"
					:prefix-icon="Search"
				/>
			</div>
			<div class="Search-Text">
				<el-button round type="primary" @click="SearchUser(SearchValueById, SearchValueByName)"
					>搜索</el-button
				>
				<el-button round type="primary" @click="AdddUserDialog = true">添加</el-button>
			</div>
		</div>
		<!--== 用户列表 == -->
		<div class="UserList" ref="table">
			<el-table
				highlight-current-row
				:data="MockInfo.Mockdata"
				size="large"
				style="width: 100%"
				stripe
			>
				<el-table-column type="expand" label="所有权限" width="120">
					<el-row
						:class="['bdbottom']"
						v-for="(item1, i1) in useItemStore().Permission.slice(1)"
						:key="i1"
					>
						<!-- 列 -->
						<el-col :span="5">
							<!-- 渲染一级权限 -->
							<el-tag type="success">{{ item1.authName }}</el-tag>
							<el-icon color="#409eff"><Right /></el-icon>
						</el-col>
						<el-col :span="19">
							<!-- 行 -->
							<el-row
								:class="[i2 === 0 ? '' : 'bdtop']"
								v-for="(item2, i2) in item1.children"
								:key="i2"
							>
								<!-- 渲染二、三级权限 -->
								<el-col :span="6">
									<el-tag type="info">{{ item2.authName }}</el-tag>
									<el-icon color="#409eff">
										<Right />
									</el-icon>
								</el-col>
								<el-col :span="18">
									<el-row>
										<el-tag
											type="warning"
											closable
											@close="removeRightById(item3)"
											v-for="(item3, i3) in item2.children"
											:key="i3"
										>
											{{ item3.authName }}
										</el-tag>
									</el-row>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</el-table-column>
				<el-table-column prop="UserId" label="Id" width="160" />
				<el-table-column prop="UserName" label="姓名" width="180" />
				<el-table-column prop="data" label="注册时间" width="180" />
				<el-table-column prop="authority" label="权限" />
				<el-table-column>
					<!-- 这里使用scope将prop -->
					<template #default="scope">
						<el-switch
							v-model="scope.row.OpenAuthority"
							size="large"
							active-text="Open"
							inactive-text="Close"
						/>
					</template>
				</el-table-column>
				<el-table-column align="right">
					<template #default="scope">
						<el-button size="large">编辑</el-button>
						<el-popconfirm title="你确定要删除此项 ?" @confirm="deleteList(scope.row)">
							<template #reference>
								<el-button size="large" type="danger">删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
	<!-- 弹出框 -->
	<el-dialog v-model="AdddUserDialog" title="添加管理角色" draggable center>
		<el-form v-model="form">
			<el-form-item label="用户名" :label-width="formLabelWidth">
				<el-input v-model="form.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="权限类别" :label-width="formLabelWidth">
				<el-select v-model="form.Permissions" placeholder="请选择权限类别">
					<el-option label="超级管理员" value="管理员" />
					<el-option label="员工" value="yuangong" />
				</el-select>
			</el-form-item>
			<el-form-item label="权限类别" :label-width="formLabelWidth">
				<el-transfer
					v-model="value"
					filterable
					:filter-method="filterMethod"
					filter-placeholder="搜索权限"
					:data="data"
				/>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="AdddUserDialog = false">Cancel</el-button>
				<el-button type="primary" @click="AddUser">Confirm</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
	import moment from 'moment';
	import { onMounted, ref, reactive, watch } from 'vue';
	import { Search } from '@element-plus/icons-vue';
	import { useItemStore } from '../../store/index';
	import { TypeUserMock, Mockdata } from '../../type/UserList';
	import { ElLoading, ElMessageBox, ElMessage } from 'element-plus';
	// == 类型 ==

	const MockInfo = reactive(new Mockdata());
	// == 搜索 ==
	const SearchValueById = ref<string>('');
	const SearchValueByName = ref<string>('');

	// == 搜索 ==
	const SearchUser = (id: string, UserName: string) => {
		if (id) {
			MockInfo.Mockdata = MockInfo.Mockdata.filter((ele: TypeUserMock): TypeUserMock => {
				// 根据id搜索
				if (ele.UserId == id) {
					Loading();
					return ele;
				}
			});
		} else if (UserName) {
			MockInfo.Mockdata = MockInfo.Mockdata.filter((ele: TypeUserMock): TypeUserMock => {
				// 根据id搜索
				if (ele.UserName == UserName) {
					Loading();
					return ele;
				}
			});
		}
	};
	// == 搜索加载 ==
	const table = ref(null);
	const Loading = () => {
		const loading = ElLoading.service({
			text: '刷新中...',
			background: '#fff',
			fullscreen: false,
			target: table.value,
		});
		setTimeout(() => {
			loading.close();
		}, 500);
	};
	// == 添加用户列表 ==
	const formLabelWidth = '140px';
	const form = reactive({
		name: '',
		Permissions: '',
		Date: moment().subtract(10, 'days').calendar(),
	});
	const AdddUserDialog = ref(false);
	// == 穿梭框 ==
	interface Option {
		key: number;
		label: string;
		initial: string;
	}
	const AddUser = () => {
		MockInfo.Mockdata.push();
	};
	const generateData = () => {
		const data: Option[] = [];
		const states = [
			'用户管理',
			'用户列表',
			'权限管理',
			'角色列表',
			'权限列表',
			'商品管理',
			'商品列表',
			'分类参数',
			'商品分类',
			'订单管理',
			'订单数据',
			'配送中',
			'待配送',
		];
		const initials = ['UM', 'LU', 'PM', 'LR', 'PL', 'MM', 'LP', 'CP', 'PC', 'OM', 'OD', 'IT', 'PD'];
		states.forEach((Permission, index) => {
			data.push({
				label: Permission,
				key: index,
				initial: initials[index],
			});
		});
		return data;
	};
	const data = ref<Option[]>(generateData());
	const value = ref([]);
	const filterMethod = (query, item) => {
		return item.label.includes(query);
	};
	// == 删除用户列表 ==
	const deleteList = (list: TypeUserMock) => {
		MockInfo.Mockdata = MockInfo.Mockdata.filter((ele) => {
			return ele != list;
		});
	};
	// == 删除tag标签 ==
	const removeRightById = (item) => {
		ElMessageBox.confirm('确定要删除该权限吗?', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
		})
			.then(() => {
				useItemStore().Permission.filter((ele) => {
					if (ele.children) {
						ele.children.forEach((e) => {
							if (e.children) {
								e.children.forEach((i) => {
									if (i.authName === item.authName) {
										e.children.splice(e.children.indexOf(i), 1);
									}
								});
							}
						});
					}
				});
				ElMessage({
					type: 'success',
					message: '删除成功',
				});
			})
			.catch(() => {
				ElMessage({
					type: 'info',
					message: '取消删除',
				});
			});
	};
	// == 监视输入 ==
	watch(
		() => [SearchValueById.value, SearchValueByName.value],
		() => {
			if (!SearchValueById.value && !SearchValueByName.value) {
				MockInfo.Mockdata = useItemStore().tableData;
			}
		}
	);
	// == 挂载获取pinia数据 ==
	onMounted(() => {
		MockInfo.Mockdata = useItemStore().tableData;
	});
</script>

<style scoped lang="less">
	:deep(.el-row) {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	:deep(.el-col-5),
	:deep(.el-col-6) {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	:deep(.el-col .el-col-16) {
		justify-content: flex-start;
	}
	:deep(.el-col-18) {
		float: left;
	}
	:deep(.el-tag) {
		cursor: pointer;
		margin: 8px;
		font-size: 18px;
		width: 120px;
		height: 30px;
	}
	:deep(.el-transfer) {
		text-align: center;
	}
	:deep(.el-button > span) {
		font-size: 18px;
	}
	.bdtop {
		border-top: 1px solid #eee;
	}
	.bdbottom {
		border-bottom: 1px solid #eee;
	}
	.User {
		padding: 20px;
		background-color: #fff;
		.Seach {
			max-width: 40%;
			min-width: 30%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.el-input {
				min-width: 120px;
			}
			.Search-Text {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.UserList {
			height: auto;
			border: 1px solid #eee;
			margin-top: 20px;
		}
	}
	.title {
		h3 {
			height: 30px;
		}
	}
</style>
