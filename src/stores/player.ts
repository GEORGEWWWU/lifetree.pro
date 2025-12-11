import { ref, computed, watch } from 'vue';

// 定义歌曲类型
export interface Song {
    id: number;
    title: string;
    duration: string;
    type: string;
    url: string;
}

// 播放器状态
const currentSong = ref<Song | null>(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(0.7);
const playlist = ref<Song[]>([]);
const currentIndex = ref(-1);

// 从localStorage加载音量设置
const savedVolume = localStorage.getItem('playerVolume');
if (savedVolume) {
    volume.value = parseFloat(savedVolume);
}

// 监听音量变化并保存到localStorage
watch(volume, (newVolume) => {
    localStorage.setItem('playerVolume', newVolume.toString());
});

// 计算属性
const formattedCurrentTime = computed(() => {
    const minutes = Math.floor(currentTime.value / 60);
    const seconds = Math.floor(currentTime.value % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

// 格式化总时长
const formattedDuration = computed(() => {
    const minutes = Math.floor(duration.value / 60);
    const seconds = Math.floor(duration.value % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

// 计算进度条百分比
const progressPercentage = computed(() => {
    return duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0;
});

// 播放器功能函数
function setPlaylist(songs: Song[]) {
    playlist.value = songs;
}

// 播放指定歌曲
function playSong(song: Song) {
    currentSong.value = song;
    currentIndex.value = playlist.value.findIndex(s => s.id === song.id);
    isPlaying.value = true;
}

// 切换播放状态
function togglePlay() {
    if (!currentSong.value) return;
    isPlaying.value = !isPlaying.value;
}

// 播放下一首
function playNext() {
    if (playlist.value.length === 0) return;

    const nextIndex = (currentIndex.value + 1) % playlist.value.length;
    currentSong.value = playlist.value[nextIndex] || null;
    currentIndex.value = nextIndex;
    isPlaying.value = true;
}

// 播放上一首
function playPrevious() {
    if (playlist.value.length === 0) return;

    const prevIndex = currentIndex.value <= 0
        ? playlist.value.length - 1
        : currentIndex.value - 1;
    currentSong.value = playlist.value[prevIndex] || null;
    currentIndex.value = prevIndex;
    isPlaying.value = true;
}

// 更新当前时间
function updateTime(time: number) {
    currentTime.value = time;
}

// 更新总时长
function updateDuration(dur: number) {
    duration.value = dur;
}

// 设置音量
function setVolume(vol: number) {
    volume.value = Math.max(0, Math.min(1, vol));
}

// 导出播放器状态和方法
export function usePlayer() {
    return {
        // 状态
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        playlist,
        currentIndex,

        // 计算属性
        formattedCurrentTime,
        formattedDuration,
        progressPercentage,

        // 方法
        setPlaylist,
        playSong,
        togglePlay,
        playNext,
        playPrevious,
        updateTime,
        updateDuration,
        setVolume
    };
}