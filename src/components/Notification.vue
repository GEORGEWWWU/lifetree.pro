<template>
    <transition name="notification-slide">
        <div v-if="isVisible" class="notification-container">
            <div class="notification-content">
                <div class="notification-message">{{ message }}</div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 定义props
interface Props {
    message: string;
    duration?: number; // 显示时长，毫秒，默认3000ms
    autoClose?: boolean; // 是否自动关闭，默认true
}

const props = withDefaults(defineProps<Props>(), {
    duration: 1000,
    autoClose: true
});

// 定义emits
const emit = defineEmits(['notification-ended']);

// 组件状态
const isVisible = ref(false);
let timer: number | null = null;

// 显示通知
const show = () => {
    isVisible.value = true;

    // 如果设置了自动关闭
    if (props.autoClose && props.duration > 0) {
        timer = setTimeout(() => {
            hide();
        }, props.duration);
    }
};

// 隐藏通知
const hide = () => {
    isVisible.value = false;
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    // 通知父组件消息已结束
    emit('notification-ended');
};

// 组件挂载时自动显示
onMounted(() => {
    show();
});

// 组件卸载时清除定时器
onUnmounted(() => {
    if (timer) {
        clearTimeout(timer);
    }
});

// 暴露方法给父组件
defineExpose({
    show,
    hide
});
</script>

<style scoped>
.notification-container {
    position: fixed;
    top: 65px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    pointer-events: none;
    /* 允许点击穿透 */
}

.notification-content {
    background-color: #ffffffe3;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: #2b2b2b;
    padding: 10px 20px;
    border-radius: 10vh;
    box-shadow: 0 4px 15px rgba(184, 184, 184, 0.1);
    max-width: 100%;
    text-align: center;
    font-size: 15px;
    line-height: 1.5;
    transition: all 0.3s ease;
    font-weight: bold;
}

.notification-message {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 动画效果 */
.notification-slide-enter-active,
.notification-slide-leave-active {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.notification-slide-enter-from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
}

.notification-slide-enter-to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}

.notification-slide-leave-from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}

.notification-slide-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
}
</style>