import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
// == Mock ==
import { viteMockServe } from 'vite-plugin-mock';
// 引入相关ele plus 自动按需引入插件
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer';
const localEnabled: boolean = (process.env.USE_MOCK as unknown as boolean) || false;
export default defineConfig({
	base: './',
	mode: 'production', // 生产模式
	build: {
		chunkSizeWarningLimit: 2000,
		cssCodeSplit: true,
		sourcemap: false,
		minify: 'terser',
		outDir: 'put', // 输出文件夹
		assetsInlineLimit: 4000,
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
		rollupOptions: {
			output: {
				chunkFileNames: 'assets/js/[name]-[hash].js',
				entryFileNames: 'assets/js/[name]-[hash].js',
				assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
				// 分块打包
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				},
			},
		},
	},
	plugins: [
		vue(),
		visualizer({ open: true }),
		viteCompression({
			verbose: true,
			disable: false,
			threshold: 10240,
			algorithm: 'gzip',
			ext: '.gz',
		}),
		viteMockServe({
			supportTs: true,
			// == 解析地址 ==
			mockPath: './src/mock/index', // 解析，路径可根据实际变动
			localEnabled: localEnabled, // 开发环境
			watchFiles: true, // 监听文件内容变更
		}),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
	],
	define: {
		'process.env': {},
	},
});
