import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const routes: Readonly<RouteRecordRaw[]> = [
	{
		path: '/',
		redirect: '/Login', // 首次进入路由路径
	},
	{
		path: '/Login',
		name: 'login',
		component: () => import('../views/LoginView.vue'),
	},
	{
		path: '/Home',
		name: 'home',
		redirect: '/Home/Index',
		component: () => import('../views/Home.vue'),
		children: [
			{
				path: '/Home/Index',
				name: 'Index',
				component: () => import('../views/Home/HomeIndex.vue'),
				meta: {
					isShow: true,
					title: '首页',
					keepAlive: true,
				},
			},
			{
				path: '/users/userList',
				name: 'userList',
				component: () => import('../views/Permissions/roleList.vue'),
				meta: {
					isShow: true,
					title: '用户列表',
				},
			},
			{
				path: '/permissions/roleList',
				name: 'roleList',
				component: () => import('../views/Goods/goodsList.vue'),

				meta: {
					isShow: true,
					title: '角色列表',
				},
			},
			{
				path: '/permissions/permissionList',
				name: 'permissionList',
				component: () => import('../views/Permissions/permissionList.vue'),
				meta: {
					isShow: true,
					title: '权限列表',
				},
			},
			{
				path: '/goodsMange/goodsList',
				name: 'goodsList',
				component: () => import('../views/Users/user.vue'),
				meta: {
					isShow: true,
					title: '商品列表',
				},
			},
			{
				path: '/goodsMange/parameter',
				name: 'parameter',
				component: () => import('../views/Goods/parameter.vue'),
				meta: {
					isShow: true,
					title: '分类参数',
				},
			},
			{
				path: '/goodsMange/goodsKinds',
				name: 'goodsKinds',
				component: () => import('../views/Goods/goodsKinds.vue'),
				meta: {
					isShow: true,
					title: '商品分类',
				},
			},
			{
				path: '/orders/orderdata',
				name: 'orderdata',
				component: () => import('../views/Orders/orderdata.vue'),
				meta: {
					isShow: true,
					title: '订单数据',
				},
			},
			{
				path: '/orders/intransit',
				name: 'pintransit',
				component: () => import('../views/Orders/intransit.vue'),
				meta: {
					isShow: true,
					title: '配送中',
				},
			},
			{
				path: '/orders/Pendingdelivery',
				name: 'Pendingdelivery',
				component: () => import('../views/Orders/Pendingdelivery.vue'),
				meta: {
					isShow: true,
					title: '待配送',
				},
			},
		],
	},
];

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes,
});
router.beforeEach((to, from, next) => {
	if (to.path === '/Home') {
		// 如果有
		if (localStorage.getItem('token')) {
			next();
		} else {
			next('/Login');
		}
	} else {
		next();
	}
});
export default router;
