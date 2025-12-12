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
                <!-- <button @click="testNotification">测试通知</button> -->
                <button>登录</button>
            </div>
        </header>
        <div class="mobile_header">
            <div class="m_header_left">
                <a href="#music" @click="handleMusicClick">曲目</a>
                <router-link to="/media">视频与画廊</router-link>
            </div>
            <button>登录</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
// import { getCurrentInstance } from 'vue';
const route = useRoute();
const router = useRouter();

// 获取全局通知实例
// const instance = getCurrentInstance();
// const notification = instance?.appContext.config.globalProperties.$notification;

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

// 测试消息弹窗
// function testNotification() {
//     if (notification) {
//         notification.show('这是一条测试消息，展示了iOS灵动岛风格的通知效果');
//     }
// }
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

            img {
                width: 28px;
                height: 28px;
                display: none;
            }
        }
    }

    // 移动端header
    .mobile_header {
        display: none;
    }
}

@media (max-width: 768px) {
    .header_container {
        position: fixed !important;
        background: #fff !important;
        width: 100vw !important;
        max-width: 100vw !important;
        z-index: 99;
    }

    header {
        width: 100% !important;
        max-width: 100vw !important;
        padding: 0 15px !important;
        box-sizing: border-box !important;
        position: relative;
        z-index: 101;

        .logo {
            img {
                width: 36px !important;
                height: 36px !important;
            }

            h1 {
                font-size: 15px !important;
            }

            p {
                font-size: 10px !important;
            }
        }

        .nav {

            a,
            button {
                display: none;
            }
        }
    }

    // 移动端header
    .mobile_header {
        width: 100% !important;
        padding: 4px 0px 8px 0px !important;
        box-sizing: border-box !important;
        display: flex !important;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: #fff !important;
        gap: 13px;

        .m_header_left {
            display: flex;
            flex-direction: row;
            justify-content: left;
            align-items: center;
            gap: 13px;

            a {
                font-size: 14px;
                padding: 4px 8px;
                border-radius: 6px;
                transition: all 0.12s ease-in-out;
                margin-left: 13px;

                &:hover {
                    background: #f4f4f4;
                }

                &:active {
                    transform: scale(0.96);
                }
            }
        }

        button {
            font-size: 14px;
            padding: 4px 16px;
            border-radius: 6px;
            background: #2b2b2b;
            color: #fff;
            margin-right: 13px;
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
</style>
