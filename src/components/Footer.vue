<template>
    <div class="footer_container">
        <footer>
            <p>&copy; 2025 生命树. All rights reserved.</p>
            <div class="footer_btn">
                <a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备 - 备案中</a>
                <span>|</span>
                <a href="mailto:69927088@qq.com">联系我们</a>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.footer_container {
    width: 970px;
    margin: 0 auto;
    padding: 15px;
    background: #fff;
    border-radius: 8px;
    display: grid;
    justify-items: center;

    footer {
        width: 97%;
        display: flex;
        justify-content: space-between;
    }

    p {
        font-size: 14px;
        color: #888;
    }

    .footer_btn {
        display: flex;
        justify-content: right;
        align-items: center;
        gap: 14px;

        a {
            font-size: 14px;
            color: #888;
            transition: all 0.12s ease-in-out;

            &:hover {
                color: #555;
            }
        }

        span {
            font-size: 13px;
            color: #ccccccc5;
        }
    }
}
</style>
