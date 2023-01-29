import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '../src/router/index';
import 'default-passive-events';
import 'element-plus/dist/index.css';
import '../src/normalize/normalize.css';
import '../src/assets/fontIcon/iconfont.css';
import '../src/assets/fontIcon/iconfont.js';
import '../src/flexible/flexible.min.js';
import { isValidKey } from '../src/utils/type';
import * as ELIcons from '@element-plus/icons-vue';
// == 引入mock ==
import '../src/mock/index';
const pinia = createPinia();
const app = createApp(App).use(router);
for (const iconName in ELIcons) {
	if (isValidKey(iconName, ELIcons)) {
		app.component(iconName, ELIcons[iconName]);
	}
}
app.use(pinia);
app.mount('#app');

