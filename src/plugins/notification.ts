import type { App } from 'vue';
import { showNotification, hideNotification, clearNotifications } from '../stores/notification';

// 创建全局消息对象
const globalNotification = {
  show: showNotification,
  hide: hideNotification,
  clear: clearNotifications
};

// 安装插件
export function install(app: App) {
  // 全局属性 $notification
  app.config.globalProperties.$notification = globalNotification;

  // 提供全局注入
  app.provide('notification', globalNotification);
}

// 导出默认对象
export default globalNotification;