<template>
    <div class="player_container">
        <div class="player">
            <div class="process"></div>
            <div class="controls">
                <div class="name_time">
                    <p>未在播放</p>
                    <span>|</span>
                    <p>00:00 / 00:00</p>
                </div>
                <div class="music_control">
                    <button>
                        <img src="../assets/上一首.png" alt="上一首">
                    </button>
                    <button class="play_pause">
                        <img src="../assets/暂停中.png" alt="暂停中">
                    </button>
                    <button>
                        <img src="../assets/下一首.png" alt="下一首">
                    </button>
                </div>
                <div class="orther_control">
                    <button>
                        <p>下载原曲</p>
                        <img src="../assets/下载.png" alt="下载">
                    </button>
                    <div ref="volumeRef" class="volumeRef" style="position: relative;">
                        <button @click.stop="toggleVolume">
                            <p>音量调整</p>
                            <img src="../assets/音量.png" alt="音量">
                        </button>
                        <input v-show="showVolume" type="range" min="0" max="100" @click.stop @mousemove="resetAutoHide"
                            @mousedown="resetAutoHide" />
                    </div>
                    <button>
                        <p>链接分享</p>
                        <img src="../assets/分享.png" alt="分享">
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 音量控制
const showVolume = ref(false);
const volumeRef = ref<HTMLElement | null>(null);
let autoHideTimer: number | null = null;

// 开始自动隐藏计时
function startAutoHide() {
    if (autoHideTimer) {
        clearTimeout(autoHideTimer);
    }
    autoHideTimer = window.setTimeout(() => {
        showVolume.value = false;
        autoHideTimer = null;
    }, 5000);
}

// 清除自动隐藏计时
function clearAutoHide() {
    if (autoHideTimer) {
        clearTimeout(autoHideTimer);
        autoHideTimer = null;
    }
}

// 重置自动隐藏计时
function resetAutoHide() {
    if (showVolume.value) startAutoHide();
}

// 切换音量显示状态
function toggleVolume() {
    showVolume.value = !showVolume.value;
    if (showVolume.value) {
        // show -> 开始计时
        startAutoHide();
    } else {
        clearAutoHide();
    }
}

// 点击文档其他地方时关闭音量控制
function onDocClick(e: MouseEvent) {
    const target = e.target as Node;
    if (!volumeRef.value) return;
    if (showVolume.value && !volumeRef.value.contains(target)) {
        showVolume.value = false;
        clearAutoHide();
    }
}

// 监听页面点击以关闭音量控制
onMounted(() => document.addEventListener('click', onDocClick));
onBeforeUnmount(() => document.removeEventListener('click', onDocClick));
</script>

<style scoped lang="less">
.player_container {
    width: 100vw;
    padding: 10px 0;
    background: #f9f9f9;
    border-radius: 8px;
    display: grid;
    justify-items: center;

    // 播放器
    .player {
        width: 1000px;
        margin: 0 auto;
        padding: 0px 15px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 8px 13px #c5c5c51a;
        display: grid;
        justify-items: center;
        align-items: center;
        padding-top: 10px;

        // 进度条
        .process {
            width: 100%;
            height: 3px;
            background: #e1e1e1;
            border-radius: 2px;
        }

        // 控制按钮
        .controls {
            width: 100%;
            height: 45px;
            padding: 8px 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            // 歌曲名与播放时间
            .name_time {
                min-width: 150px;
                display: flex;
                justify-content: left;
                align-items: center;
                gap: 13px;

                p {
                    font-size: 14px;
                    font-weight: bold;
                    color: #868686cc;
                    transform: translateY(-0.5px);
                }

                span {
                    color: #d1d1d1bd;
                    font-weight: normal;
                    transform: translateY(-1px);
                    font-size: 13px;
                }
            }

            // 音频控制
            .music_control {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                gap: 8px;
                transform: translateY(2px);
                height: 40px;
                position: fixed;
                left: 50%;
                transform: translate(-50%, 1px);
                z-index: 100;

                button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 3px 18px;
                    border-radius: 10vh;

                    &:hover {
                        background: #f5f5f5bb;
                    }

                    &:active {
                        transform: scale(0.98);
                    }

                    img {
                        width: 26px;
                        height: 26px;
                        opacity: 0.88;
                        transform: translateY(1px);
                    }
                }

                .play_pause {
                    padding: 3px 18px;
                    background: #f5f5f5de;
                    border-radius: 10vh;
                    transition: all 0.12s ease-in-out;

                    &:hover {
                        background: #f0f0f0de;
                    }

                    &:active {
                        transform: scale(0.98);
                    }

                    img {
                        width: 32px;
                        height: 32px;
                    }
                }
            }

            // 其他控制
            .orther_control {
                min-width: 150px;
                display: flex;
                flex-direction: row;
                justify-content: right;
                align-items: center;
                gap: 32px;
                transition: all 0.15s ease-in-out;
                transform: translateY(2px);

                button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    display: grid;
                    justify-items: center;
                    align-items: center;

                    &:hover {
                        p {
                            display: block;
                        }
                    }

                    img {
                        width: 18px;
                        height: 18px;
                        opacity: 0.6;
                        transition: all 0.15s ease-in-out;

                        &:hover {
                            opacity: 0.88;
                        }
                    }

                    p {
                        width: 80px;
                        padding: 3px 0px;
                        color: #2b2b2bc5;
                        background: #fff;
                        border-radius: 6px;
                        position: absolute;
                        font-size: 14px;
                        box-shadow: 0 4px 12px rgba(122, 122, 122, 0.1);
                        transform: translateY(-30px);
                        animation: controlTip 0.3s ease-in-out;
                        display: none;
                    }

                    @keyframes controlTip {
                        from {
                            opacity: 0;
                            transform: translateY(-25px);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(-30px);
                        }
                    }
                }

                .volumeRef {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;

                    input {
                        width: 98px;
                        margin-left: 13px;
                        cursor: pointer;
                        height: 5px;
                        border-radius: 3px;
                        background: #e1e1e1;
                        outline: none;
                        opacity: 0.5;
                        transition: opacity 0.2s;
                        accent-color: #2b2b2b;
                        animation: rangeShow 0.2s ease-in-out;
                    }

                    @keyframes rangeShow {
                        from {
                            opacity: 0;
                            transform: translateX(10px);
                        }

                        to {
                            opacity: 0.5;
                            transform: translateX(0);
                        }
                    }
                }
            }
        }
    }
}
</style>
