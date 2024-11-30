import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueDragPlayground from 'vue-drag-playground'
const app = createApp(App)
app.use(VueDragPlayground)
app.mount('#app')
