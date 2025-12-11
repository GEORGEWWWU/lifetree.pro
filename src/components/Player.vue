<template>
    <div class="player_container">
        <div class="player">播放器</div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.player_container {
    width: 100vw;
    padding: 10px 0;
    background: #f9f9f9;
    border-radius: 8px;
    display: grid;
    justify-items: center;

    .player {
        width: 1100px;
        margin: 0 auto;
        padding: 8px 15px;
        background: #fff;
        border-radius: 8px;
    }
}
</style>
