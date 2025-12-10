<template>
    <div class="home_page">
        <main>
            <section>
                <!--大标题-->
                <div class="container leadtitle">
                    <h2>音乐来自宇宙时空的深处</h2>
                    <p class="leadtext">
                        我们相信，音乐来自宇宙时空的深处。生命树致力于用旋律搭建心灵的桥梁，用节奏传递温暖的力量，通过音乐创作、演出与公益项目，服务社会，疗愈人心，让爱的乐章在每一个需要的角落生根发芽。</p>
                    <a href="#music" class="playBtn">聆听我们的音乐</a>
                </div>
            </section>

            <section>
                <!--音乐列表组件-->
                <MusicListVue />
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import MusicListVue from '@/components/MusicList.vue';

</script>

<style scoped lang="less">
@import url('../../static/home.less');
</style>
