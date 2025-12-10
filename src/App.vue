<template>
  <div class="app">
    <!--导航栏组件-->
    <Header />

    <!--路由视图-->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
</script>

<style scoped lang="less">
@import url('./static/index.less');
</style>
