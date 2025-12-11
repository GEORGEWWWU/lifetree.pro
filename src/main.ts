import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { install as notificationInstall } from './plugins/notification'
import { vLazy } from '@/stores/lazy'

const app = createApp(App)

app.use(router)
app.use(notificationInstall)
app.directive('lazy', vLazy)

app.mount('#app')