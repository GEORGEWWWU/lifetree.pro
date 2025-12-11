import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { install as notificationInstall } from './plugins/notification'

const app = createApp(App)
app.use(router)
app.use(notificationInstall)
app.mount('#app')
