import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'popper.js'
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)

app.config.globalProperties.emitter = mitt()

app.use(router).mount('#app')
