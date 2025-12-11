<template>
    <div class="musiclist_container">
        <!--歌曲表格-->
        <table class="music-table">
            <colgroup>
                <col style="width: 6%" />
                <col style="width: 44%" />
                <col style="width: 16%" />
                <col style="width: 16%" />
                <col style="width: 18%" />
            </colgroup>
            <thead>
                <tr>
                    <th class="col-index">#</th>
                    <th class="col-title">歌曲</th>
                    <th class="col-duration">时长</th>
                    <th class="col-type">格式</th>
                    <th class="col-action"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(song, idx) in songs" :key="song.id">
                    <td class="col-index">{{ idx + 1 }}</td>
                    <td class="col-title">{{ song.title }}</td>
                    <td class="col-duration">{{ song.duration }}</td>
                    <td class="col-type">{{ song.type }}</td>
                    <td class="col-action">
                        <button>播放</button>
                        <div class="more">
                            <img src="../assets/DotsThree.png" alt="更多" @click.stop="toggleMore(song.id)">
                            <div class="moreaction" v-show="activeMoreId === song.id" @click.stop>
                                <p @click="onDownload(song, 'original')">下载原曲</p>
                                <p @click="onDownload(song, 'pdf')">下载曲谱</p>
                                <p @click="onDownload(song, 'krc')">下载伴奏</p>
                                <p @click="onSelectFormat(song)">选择格式</p>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 歌曲列表
const songs = ref<Array<{ id: number; title: string; duration: string; type: string; url: string }>>([]);

// 当前激活的更多操作菜单的歌曲 ID
const activeMoreId = ref<number | null>(null);

// 切换更多操作菜单显示状态
function toggleMore(id: number) {
    activeMoreId.value = activeMoreId.value === id ? null : id;
}

// 点击文档其他地方时关闭更多操作菜单
function onDocClick() {
    activeMoreId.value = null;
}

// 监听页面点击以关闭更多操作菜单
onMounted(() => document.addEventListener('click', onDocClick));
onBeforeUnmount(() => document.removeEventListener('click', onDocClick));

// 下载歌曲或相关文件
function onDownload(song: any, mode: string) {
    // 占位：实现下载逻辑
    console.log('download', song, mode);
    activeMoreId.value = null;
}

// 选择格式
function onSelectFormat(song: any) {
    // 占位：实现选择格式逻辑
    console.log('select format', song);
    activeMoreId.value = null;
}

// 动态加载 assets 下的音频文件，并获取时长和格式（仅做加载）
onMounted(async () => {
    // 使用 Vite 的 import.meta.glob 获取所有 mp3/wav/flac 文件
    const loaders = import.meta.glob('../assets/*.{mp3,wav,flac}', { as: 'url' }) as Record<string, () => Promise<string>>;

    const entries = Object.entries(loaders);

    // 保证按文件名排序，方便显示
    entries.sort((a, b) => a[0].localeCompare(b[0], undefined, { sensitivity: 'base' }));

    // 逐个加载文件，获取信息
    for (const [path, loader] of entries) {
        try {
            const url = await loader();
            const filenameRaw = url.split('/').pop() || '';
            const filename = decodeURIComponent(filenameRaw);
            const extMatch = filename.match(/\.([a-zA-Z0-9]+)$/);
            const format = extMatch ? extMatch[1] : '';
            const title = filename.replace(/\.[^\.]+$/, '') || filename || 'unknown';

            const audio = new Audio(url);

            // 获取音频时长
            const durationStr = await new Promise<string>((resolve) => {
                const onLoaded = () => {
                    const d = audio.duration || 0;
                    const mm = Math.floor(d / 60).toString().padStart(2, '0');
                    const ss = Math.round(d % 60).toString().padStart(2, '0');
                    resolve(`${mm}:${ss}`);
                };
                const onError = () => resolve('00:00');
                audio.addEventListener('loadedmetadata', onLoaded, { once: true });
                audio.addEventListener('error', onError, { once: true });
                // 触发加载
                audio.load();
            });

            // 生成稳定 id
            const id = songs.value.length + 1;

            // 添加歌曲信息
            songs.value.push({ id, title, duration: durationStr, type: format || '', url: url || '' });
        } catch (e) {
            console.warn('load audio failed', path, e);
        }
    }
});
</script>

<style scoped lang="less">
.musiclist_container {
    width: 970px;
    margin: 0 auto;
    padding: 15px;
    background: #fff;
    border-radius: 8px;
    display: grid;
    justify-items: center;
}

// 歌曲表格
.music-table {
    width: 100%;
    padding: 0 8px;
    border-collapse: separate;
    border-spacing: 0;
    background: none;
    border: none;
    user-select: none;
    -webkit-user-drag: none;

    th,
    td {
        padding: 8px 13px;
        background: none;
        border: none;
        font-size: 15px;
    }

    th {
        font-weight: 600;
        text-align: left;
    }

    tbody tr {
        background: none;
        overflow: hidden;
    }

    tbody tr td {
        background: none;
        transition: all 0.12s ease-in-out;
    }

    tbody tr:hover td {
        background: #f4f4f474;
    }

    tbody tr td:first-child {
        border-radius: 6px 0 0 6px;
    }

    tbody tr td:last-child {
        border-radius: 0 6px 6px 0;
    }

    .col-index {
        text-align: left;
    }

    .col-title {
        text-align: left;
    }

    .col-duration,
    .col-type {
        text-align: right;
    }

    .col-action {
        display: flex;
        justify-content: right;
        text-align: right;

        button {
            padding: 3px 13px;
            color: #2b2b2b;
            font-size: 14px;
            transition: all 0.15s ease-in-out;
            border: none;
            border-radius: 5px;
            background: transparent;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .more {
            padding: 3px 13px;
            color: #2b2b2b;
            font-size: 14px;
            transition: all 0.15s ease-in-out;
            border: none;
            border-radius: 5px;
            background: transparent;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            position: relative;

            img {
                width: 20px;
            }

            // 更多操作菜单
            .moreaction {
                position: absolute;
                background: #fff;
                border-radius: 5px;
                z-index: 10;
                transform: translateY(25px);
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
                overflow: hidden;
                display: flex;
                flex-direction: column;
                animation: moreactionshow 0.2s ease-in-out;

                p {
                    font-size: 14px;
                    padding: 8px 13px;
                    margin: 0;
                    white-space: nowrap;
                    cursor: pointer;

                    &:hover {
                        color: #fff;
                        background: #2b2b2b;
                    }
                }

                p:first-child {
                    border-radius: 5px 5px 0 0;
                }

                p:last-child {
                    border-radius: 0 0 5px 5px;
                }

                @keyframes moreactionshow {
                    from {
                        opacity: 0;
                        transform: translateY(18px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(25px);
                    }
                }
            }
        }
    }
}
</style>
