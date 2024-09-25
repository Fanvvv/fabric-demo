import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/iconfont/iconfont.css'
import './assets/iconfont-avatar/iconfont-avatar.css'
import './style.css'
import './assets/index.css'

import App from './App.vue'

const pinia = createPinia()
createApp(App).use(pinia).mount('#app')
