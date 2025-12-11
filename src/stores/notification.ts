import { ref, reactive } from 'vue';

// 定义消息类型
export interface NotificationItem {
  id: string;
  message: string;
  duration?: number;
  autoClose?: boolean;
}

// 消息队列
const notifications = ref<NotificationItem[]>([]);
// 当前显示的消息
const currentNotification = ref<NotificationItem | null>(null);

// 生成唯一ID
function generateId(): string {
  return `notification-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

// 添加消息到队列
function addNotification(message: string, options: { duration?: number; autoClose?: boolean } = {}): string {
  const id = generateId();
  const notification: NotificationItem = {
    id,
    message,
    duration: options.duration ?? 3000,
    autoClose: options.autoClose ?? true
  };
  
  notifications.value.push(notification);
  
  // 如果当前没有显示消息，则显示这条消息
  if (!currentNotification.value) {
    showNextNotification();
  }
  
  return id;
}

// 显示下一条消息
function showNextNotification() {
  if (notifications.value.length === 0) {
    currentNotification.value = null;
    return;
  }
  
  currentNotification.value = notifications.value.shift() || null;
}

// 移除当前消息并显示下一条
function removeCurrentNotification() {
  currentNotification.value = null;
  // 使用setTimeout确保当前消息完全移除后再显示下一条
  setTimeout(() => {
    showNextNotification();
  }, 300);
}

// 根据ID移除特定消息
function removeNotification(id: string) {
  // 如果是当前显示的消息
  if (currentNotification.value?.id === id) {
    removeCurrentNotification();
    return;
  }
  
  // 如果在队列中，从队列中移除
  const index = notifications.value.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications.value.splice(index, 1);
  }
}

// 清空所有消息
function clearAllNotifications() {
  notifications.value = [];
  currentNotification.value = null;
}

// 导出状态和方法
export function useNotification() {
  return {
    // 状态
    notifications,
    currentNotification,
    
    // 方法
    addNotification,
    removeNotification,
    removeCurrentNotification,
    clearAllNotifications
  };
}

// 创建一个全局实例
const globalNotification = useNotification();

// 导出全局方法，方便在任何地方调用
export function showNotification(message: string, options: { duration?: number; autoClose?: boolean } = {}): string {
  return globalNotification.addNotification(message, options);
}

export function hideNotification(id: string): void {
  globalNotification.removeNotification(id);
}

export function clearNotifications(): void {
  globalNotification.clearAllNotifications();
}