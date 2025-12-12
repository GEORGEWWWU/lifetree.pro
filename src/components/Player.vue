<template>
    <div class="player_container">
        <div class="player">
            <!-- 进度条 -->
            <div class="process" @click="seekTo">
                <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
            </div>

            <!-- 音频元素 -->
            <audio ref="audioRef" :src="currentSong?.url" @timeupdate="onTimeUpdate" @loadedmetadata="onLoadedMetadata"
                @ended="onEnded"></audio>

            <div class="controls">
                <div class="name_time">
                    <p>{{ currentSong?.title || '未在播放' }}</p>
                    <span>|</span>
                    <p>{{ formattedCurrentTime }} / {{ formattedDuration }}</p>
                </div>
                <div class="music_control">
                    <button @click="playPrevious">
                        <img src="../assets/上一首.png" alt="上一首">
                    </button>
                    <button class="play_pause" @click="togglePlay">
                        <img :src="isPlaying ? pauseIcon : playIcon" :alt="isPlaying ? '暂停中' : '播放中'">
                    </button>
                    <button @click="playNext">
                        <img src="../assets/下一首.png" alt="下一首">
                    </button>
                </div>
                <div class="orther_control">
                    <button @click="downloadCurrentSong" :disabled="!currentSong">
                        <p>下载原曲</p>
                        <img src="../assets/下载.png" alt="下载">
                    </button>
                    <div ref="volumeRef" class="volumeRef" style="position: relative;">
                        <button @click.stop="toggleVolume">
                            <p>音量调整</p>
                            <img src="../assets/音量.png" alt="音量">
                        </button>
                        <input v-show="showVolume" type="range" min="0" max="100" :value="volume * 100"
                            @input="onVolumeChange" @click.stop @mousemove="resetAutoHide" @mousedown="resetAutoHide" />
                    </div>
                    <button @click="shareCurrentSong">
                        <p>链接分享</p>
                        <img src="../assets/分享.png" alt="分享">
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick, getCurrentInstance } from 'vue';
import { usePlayer } from '../stores/player';
import pauseIcon from '../assets/播放中.png';
import playIcon from '../assets/暂停中.png';

// 使用播放器状态管理
const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    formattedCurrentTime,
    formattedDuration,
    progressPercentage,
    togglePlay,
    playNext,
    playPrevious,
    updateTime,
    updateDuration,
    setVolume
} = usePlayer();

// 获取全局通知实例
const instance = getCurrentInstance();
const notification = instance?.appContext.config.globalProperties.$notification;

// 音频元素引用
const audioRef = ref<HTMLAudioElement | null>(null);

// 音量控制
const showVolume = ref(false);
const volumeRef = ref<HTMLElement | null>(null);
let autoHideTimer: number | null = null;

// 监听播放状态变化
watch(isPlaying, (newVal) => {
    if (audioRef.value) {
        if (newVal) {
            audioRef.value.play();
        } else {
            audioRef.value.pause();
        }
    }
});

// 监听当前歌曲变化
watch(currentSong, () => {
    if (audioRef.value) {
        nextTick(() => {
            if (isPlaying.value) {
                audioRef.value?.play();
            }
        });
    }
});

// 监听音量变化
watch(volume, (newVal) => {
    if (audioRef.value) {
        audioRef.value.volume = newVal;
    }
});

// 音频事件处理
function onTimeUpdate() {
    if (audioRef.value) {
        updateTime(audioRef.value.currentTime);
    }
}

// 音频元数据加载完成
function onLoadedMetadata() {
    if (audioRef.value) {
        updateDuration(audioRef.value.duration);
    }
}

// 播放结束后自动播放下一首
function onEnded() {
    playNext();
}

// 进度条点击跳转
function seekTo(event: MouseEvent) {
    if (!audioRef.value || !duration.value) return;

    const processElement = event.currentTarget as HTMLElement;
    const rect = processElement.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const seekTime = percentage * duration.value;

    audioRef.value.currentTime = seekTime;
    updateTime(seekTime);
}

// 音量控制
function onVolumeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newVolume = parseInt(target.value) / 100;
    setVolume(newVolume);
}

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

// 下载当前歌曲
function downloadCurrentSong() {
    if (!currentSong.value) return;

    const link = document.createElement('a');
    link.href = currentSong.value.url;
    link.download = currentSong.value.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 显示下载成功消息
    if (notification) {
        notification.show('下载成功');
    }
}

// 分享当前歌曲
function shareCurrentSong() {
    // 显示分享功能开发中消息
    if (notification) {
        notification.show('分享功能开发中！');
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
onMounted(() => {
    document.addEventListener('click', onDocClick);
    // 初始化音量
    if (audioRef.value) {
        audioRef.value.volume = volume.value;
    }
});
onBeforeUnmount(() => {
    document.removeEventListener('click', onDocClick);
});

// 导出图片资源供模板使用
defineExpose({
    playIcon,
    pauseIcon
});
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
            cursor: pointer;
            position: relative;
            transition: all 0.12s ease-in-out;

            &:hover {
                height: 5px;
                border-radius: 4px;
            }

            .progress-bar {
                height: 100%;
                background: #2b2b2b;
                border-radius: 2px;
                width: 0%;
                transition: width 0.1s linear;
            }
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

// 移动端适配（响应式）
@media (max-width: 768px) {
    .player_container {
        width: 100% !important;
        background: #fff !important;
        padding: 8px 0 !important;

        .process {
            width: 90% !important;
            height: 5px !important;
        }

        .player {
            width: 100% !important;
            padding: 0px !important;

            .controls {
                height: auto !important;
                display: grid !important;
                justify-content: center !important;
                grid-template-rows: 1fr 1fr !important;
                gap: 5px !important;
                padding: 10px 0 !important;

                .name_time {
                    min-width: auto !important;
                    justify-content: center !important;
                    text-align: center;
                    order: 1;
                }

                .music_control {
                    position: static !important;
                    transform: none !important;
                    order: 2;
                }

                .orther_control {
                    display: none !important;
                    visibility: hidden !important;
                }
            }
        }
    }
}
</style>
