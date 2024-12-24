import './assets/main.css'
import '@/styles/index.scss'
import 'virtual:uno.css'
import 'element-plus/theme-chalk/src/message.scss'

import { createApp } from 'vue'
import store from './stores'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import SvgIcon from '~virtual/svg-component'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
})
app.component(SvgIcon.name as string, SvgIcon)

app.mount('#app')