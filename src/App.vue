<template>
  <div class="app">
    <!--导航栏组件-->
    <Header />

    <!--路由视图-->
    <router-view />

    <!--全局消息弹窗组件-->
    <Notification v-if="currentNotification" :key="currentNotification.id" :message="currentNotification.message"
      :duration="currentNotification.duration" :auto-close="currentNotification.autoClose"
      @notification-ended="removeCurrentNotification" />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Notification from './components/Notification.vue';
import { useNotification } from './stores/notification';

// 使用消息管理
const { currentNotification, removeCurrentNotification } = useNotification();
</script>

<style scoped lang="less">
@import url('./static/index.less');
</style>
