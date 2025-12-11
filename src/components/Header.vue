<template>
    <div class="header_container">
        <header>
            <div class="logo">
                <img src="/logo.png" alt="LIFETREE">
                <div class="webname">
                    <h1>生命树</h1>
                    <p>我们以音乐服务社会。</p>
                </div>
            </div>
            <div class="nav">
                <router-link to="/" @click="scrollToTop">主页</router-link>
                <a href="#music" @click="handleMusicClick">曲目</a>
                <router-link to="/media">视频与画廊</router-link>
                <button>登录</button>
            </div>
        </header>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

// 滚动到顶部
function scrollToTop() {
    window.scrollTo(0, 0);
}

// 处理曲目链接点击
function handleMusicClick(e: MouseEvent) {
    if (route.path !== '/') {
        e.preventDefault();
        router.push('/#music');
    }
}
</script>

<style scoped lang="less">
.header_container {
    width: 100vw;
    height: 65px;
    display: grid;
    justify-items: center;
    position: fixed;
    top: 0;
    background: #f9f9f9e3;
    z-index: 99;
    backdrop-filter: blur(10px);

    header {
        width: 1000px;
        height: 65px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        // logo部分
        .logo {
            display: flex;
            justify-content: left;
            align-items: center;
            gap: 13px;

            img {
                width: 48px;
                height: 48px;
                border-radius: 6px;
            }

            .webname {
                display: grid;
                justify-items: left;
                align-items: center;

                h1 {
                    font-size: 17px;
                }

                p {
                    color: #2b2b2b90;
                    font-size: 11px;
                }
            }
        }

        // nav部分
        .nav {
            display: flex;
            justify-content: right;
            align-items: center;
            gap: 22px;

            a {
                font-size: 15px;
                padding: 6px 13px;
                border-radius: 6px;
                transition: all 0.12s ease-in-out;

                &:hover {
                    background: #f4f4f4;
                }

                &:active {
                    transform: scale(0.96);
                }
            }

            button {
                font-size: 15px;
                padding: 5.5px 20px;
                border-radius: 6px;
                background: #2b2b2b;
                color: #fff;
                transition: all 0.12s ease-in-out;

                &:hover {
                    background: #1e1e1e;
                }

                &:active {
                    transform: scale(0.96);
                }
            }
        }
    }
}
</style>
