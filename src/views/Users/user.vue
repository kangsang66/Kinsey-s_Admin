<template>
	<div class="main animate__fadeIn animate__animated">
		<div class="title">
			<h3>商品列表</h3>
		</div>
		<div class="formHeader">
			<el-form size="large" :inline="true" :model="SearchInfo" class="Search">
				<div class="Search-left">
					<el-form-item label="搜索商品ID">
						<el-input v-model="SearchInfo.SearchData.shopId" placeholder="搜索商品ID" />
					</el-form-item>
					<el-form-item label="搜索商品名称">
						<el-input v-model="SearchInfo.SearchData.shopName" placeholder="搜索商品名称" />
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							@click="onSearchId(SearchInfo.SearchData.shopId, SearchInfo.SearchData.shopName)"
							>搜索</el-button
						>
					</el-form-item>
					<el-form-item>
						<el-button type="info" @click="dialogFormVisible = true">添加</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="success" @click="delSlectDel">删除</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="warning" @click="onShowAll">清除搜索条件</el-button>
					</el-form-item>
				</div>
				<div class="Search-right">
					<el-form-item class="refersh" @click="refersh">
						<el-icon :size="28"><Refresh /></el-icon>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<div class="table" ref="table">
			<el-table
				stripe
				table-layout="fixed"
				:highlight-current-row="true"
				:border="true"
				:data="currentShowData"
				:default-sort="{ prop: 'shopId', order: 'ascending' }"
				@select="selectDel"
			>
				<el-table-column type="selection" width="45" />
				<el-table-column fixed prop="shopId" sortable label="商品ID" width="100" />
				<el-table-column prop="shopName" label="商品名称(name)" />
				<el-table-column prop="shopMsg" label="商品介绍" />
				<el-table-column prop="salesPrice" label="商品价格(￥)" />
				<el-table-column prop="shopKind" label="商品类别" />
				<el-table-column prop="salesQuantity" label="商品数量(quantity)" />
				<el-table-column prop="salesAllowance" label="余量" />
				<el-table-column prop="shopLogo" label="图片">
					<template #default="img">
						<el-image style="width: 100px; height: 40px" :src="img.row.shopLogo" />
					</template>
				</el-table-column>
				<el-table-column align="center" width="120">
					<template #default="scope">
						<el-button size="small" @click="openeditList(scope.$index, scope.row)">
							<el-icon><Edit /></el-icon><span>编辑</span></el-button
						>
					</template>
				</el-table-column>
				<el-table-column align="center" width="120">
					<template #default="scope">
						<el-button size="small" type="danger" @click="deleteRow(scope.$index)">
							<el-icon><CircleCloseFilled /></el-icon>
							<span>删除</span>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="pagination">
				<el-pagination
					v-model:current-page="currentPage"
					:page-size="pageSize"
					:total="useItemStore().userList.length"
					background
					layout="total,prev, pager, next"
				/>
			</div>
			<!-- 商品信息添加 -->
			<div class="addform">
				<el-dialog v-model="dialogFormVisible" title="新增商品" draggable>
					<el-form v-model="addGoods.MockData">
						<el-form-item label="商品名" :label-width="formLabelWidth">
							<el-input v-model="addGoods.MockData" autocomplete="off" />
						</el-form-item>
						<el-form-item label="商品价格" :label-width="formLabelWidth">
							<el-input v-model="addGoods.MockData" autocomplete="off" />
						</el-form-item>
						<el-form-item label="商品类别" :label-width="formLabelWidth">
							<el-select v-model="addGoods.MockData" placeholder="请选择商品类别">
								<el-option label="零食" value="lingshi" />
								<el-option label="日用" value="riyong" />
								<el-option label="家具" value="jiaju" />
								<el-option label="饮料" value="yinliao" />
							</el-select>
						</el-form-item>
					</el-form>
					<template #footer>
						<span class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取消</el-button>
							<el-button type="primary" @click="addList">完成</el-button>
						</span>
					</template>
				</el-dialog>
			</div>
			<!-- 商品信息修改 -->
			<div class="editform">
				<el-dialog v-model="editForm" title="新增商品" draggable>
					<el-form v-if="editGoods" :model="editGoods">
						<el-form-item label="商品id" :label-width="formLabelWidth">
							<el-input v-model="editGoods.shopId" autocomplete="off" />
						</el-form-item>
						<el-form-item label="商品名" :label-width="formLabelWidth">
							<el-input v-model="editGoods.shopName" autocomplete="off" />
						</el-form-item>
						<el-form-item label="商品介绍" :label-width="formLabelWidth">
							<el-input v-model="editGoods.shopMsg" autocomplete="off" />
						</el-form-item>
						<el-form-item label="商品价格" :label-width="formLabelWidth">
							<el-input v-model="editGoods.salesPrice" autocomplete="off" />
						</el-form-item>
						<el-form-item label="商品数量" :label-width="formLabelWidth">
							<el-input v-model="editGoods.salesQuantity" autocomplete="off" />
						</el-form-item>
						<el-form-item label="已售商品" :label-width="formLabelWidth">
							<el-input v-model="editGoods.hasSaled" autocomplete="off" />
						</el-form-item>
						<el-form-item label="剩余数量" :label-width="formLabelWidth">
							<el-input v-model="editGoods.salesAllowance" autocomplete="off" />
						</el-form-item>
						<el-form-item label="图片信息" :label-width="formLabelWidth">
							<el-input v-model="editGoods.shopLogo" autocomplete="off" />
						</el-form-item>
						<el-form-item label="商品类别" :label-width="formLabelWidth">
							<el-input v-model="editGoods.shopKind" autocomplete="off" />
						</el-form-item>
					</el-form>
					<template #footer>
						<span class="dialog-footer">
							<el-button @click="editForm = false">取消</el-button>
							<el-button type="primary" @click="editForm = false">完成</el-button>
						</span>
					</template>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, reactive, ref, computed, Ref, markRaw, watch } from 'vue';
	import { MockData, SearchData, TypeMock } from '../../type/GoodsList';
	import { ElMessageBox, ElMessage, ElLoading } from 'element-plus';
	import { Delete } from '@element-plus/icons-vue';
	import { useItemStore } from '../../store/index';
	import axios from 'axios';
	const MockInfo = reactive(new MockData());
	const SearchInfo = reactive(new SearchData());
	// == 搜索 ==
	const onSearchId = (id?: number, name?: string) => {
		// == 清空输入 ==
		if (MockInfo.MockData) {
			// == id查询 ==
			if (id) {
				SearchInfo.SearchData.shopId = null;
				MockInfo.MockData = MockInfo.MockData.filter((ele) => {
					if (ele.shopId == id) {
						return ele;
					}
				});
				console.log(MockInfo.MockData);
			} else if (name) {
				// == 名称查询 ==
				SearchInfo.SearchData.shopName = null;
				MockInfo.MockData = MockInfo.MockData.filter((ele) => {
					if (ele.shopName == name) {
						return ele;
					}
				});
			}
		}
	};
	// == 显示所有 ==
	const onShowAll = () => {
		MockInfo.MockData = useItemStore().userList;
	};

	// == 分页 ==
	const pageSize: Ref<number> = ref(10); //
	const currentPage: Ref<number> = ref(1);
	const currentShowData = computed(() => {
		// 根据当前页码以及页显示个数来slice
		// 1 => (0,10)
		// 2 => (10,20)
		// 3 => (20,30)
		return MockInfo.MockData.slice(
			(currentPage.value - 1) * pageSize.value,
			currentPage.value * pageSize.value
		);
	});
	// == 删除 ==
	const deleteRow = (index: number) => {
		ElMessageBox.confirm('你确定要删除吗?', '删除商品', {
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			type: 'warning',
			icon: markRaw(Delete),
		})
			.then(() => {
				// == 如果为首页,不需要处理 ==
				if (currentPage.value === 1) {
					useItemStore().userList.splice(index, 1);
					MockInfo.MockData = useItemStore().userList;
				} else {
					// == 如果不为首页,就处理 ==
					useItemStore().userList.splice(index + (currentPage.value - 1) * pageSize.value, 1);
					MockInfo.MockData = useItemStore().userList;
				}
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
	// == 筛选删除 ==
	let arrList: TypeMock[] = reactive([]);
	const selectDel = (Lists: TypeMock[]) => {
		arrList = Lists;
	};
	const delSlectDel = () => {
		arrList.forEach((ele) => {
			useItemStore().userList.splice(useItemStore().userList.indexOf(ele), 1);
		});
		MockInfo.MockData = useItemStore().userList;
	};
	// == 添加 ==
	const dialogFormVisible = ref(false);
	const formLabelWidth = '140px';
	const addGoods = reactive(new MockData());
	const addList = () => {
		useItemStore().userList.unshift({
			shopId: 0,
			shopName: '新增商品',
			shopMsg: '新增介绍xxxxxxxxxx',
			salesPrice: 1234,
			salesQuantity: 1111,
			hasSaled: 123,
			salesAllowance: 111,
			shopLogo: 'https://www.kangsang666.top/logo.png',
			shopKind: '家用',
		});
		dialogFormVisible.value = false;
	};

	// == 编辑 ==
	const editForm = ref(false);
	// 注意这里必须设为空值
	let editGoods = ref(null);
	const openeditList = (index: number, list: any) => {
		editGoods.value = list;
		// == 双向绑定赋值 ==
		editForm.value = !editForm.value;
	};

	// == 刷新数据 ==
	const table = ref(null);
	const refersh = () => {
		const loading = ElLoading.service({
			text: '刷新中...',
			background: '#fff',
			fullscreen: false,
			target: table.value,
		});
		setTimeout(() => {
			loading.close();
		}, 2000);
		getMockdata();
	};
	function getMockdata() {
		axios
			.get('/GoodsList/list')
			.then((res) => {
				// == 存入pinia ==
				useItemStore().userList = res.data.data.GoodsList;
				MockInfo.MockData = useItemStore().userList;
			})
			.catch((err) => {
				throw err;
			});
	}
	// == 监视pinia ==
	watch(
		() => useItemStore().userList,
		() => {
			if (useItemStore().userList) {
				MockInfo.MockData = useItemStore().userList;
			}
		}
	);
	// == mock请求 ==
	onMounted(() => {
		getMockdata();
	});
</script>

<style scoped lang="less">
	:deep(.el-table__row) {
		font-size: 20px;
		height: 60px !important;
	}
	:deep(.el-button) {
		font-size: 17px;
	}
	:deep(.refersh .el-form-item__content) {
		cursor: pointer;
	}
	.main {
		background-color: #fff;
		padding: 20px;
		border-radius: 5px;
		.title {
			h3 {
				height: 30px;
			}
		}
		.pagination {
			display: flex;
			justify-content: flex-end;
			margin-top: 15px;
		}
		.Search {
			display: flex;
			justify-content: space-between;
		}
	}
</style>
