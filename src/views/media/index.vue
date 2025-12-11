<template>
  <div class="medias_page">
    <!--内容区域-->
    <main>
      <section>
        <!--大标题-->
        <div class="container leadtitle">
          <h2>视觉与声音的艺术之旅</h2>
          <p class="leadtext">
            生命树不仅用音乐传递情感，更通过视觉艺术创造沉浸式体验。在这里，每一幅画面都是一段故事，每一个视频都是一次心灵的触动。我们用镜头捕捉生活中的美好瞬间，用画面诠释音乐的深层含义，让您在视听交融中感受艺术的无限魅力。
          </p>
        </div>
      </section>

      <section>
        <!--视频展示区域-->
        <div class="container media-section">
          <div class="video-container">
            <video v-lazy="videoUrl" controls>
              <source type="video/mp4">
              您的浏览器不支持视频播放。
            </video>
          </div>
        </div>
      </section>

      <section>
        <!--图片展示区域-->
        <div class="container media-section">
          <div class="image-gallery">
            <div class="image-item">
              <img v-lazy="imageUrl[0]" alt="精彩瞬间1">
            </div>
            <div class="image-item">
              <img v-lazy="imageUrl[1]" alt="精彩瞬间2">
            </div>
            <div class="image-item">
              <img v-lazy="imageUrl[2]" alt="精彩瞬间3">
            </div>
            <div class="image-item">
              <img v-lazy="imageUrl[3]" alt="精彩瞬间4">
            </div>
            <div class="image-item">
              <img v-lazy="imageUrl[4]" alt="精彩瞬间5">
            </div>
            <div class="image-item">
              <img v-lazy="imageUrl[5]" alt="精彩瞬间6">
            </div>
            <div class="image-item">
              <img v-lazy="imageUrl[6]" alt="精彩瞬间7">
            </div>
          </div>
        </div>
      </section>

      <section>
        <!--底部信息-->
        <div class="container footer-section">
          <p>&copy; 2025 生命树 - 用艺术传递爱与希望</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const videoUrl = '/src/assets/video_20251211_1.mp4'
const imageUrl = [
  '/src/assets/1.jpg',
  '/src/assets/2.jpg',
  '/src/assets/3.jpg',
  '/src/assets/4.jpg',
  '/src/assets/5.jpg',
  '/src/assets/6.jpg',
  '/src/assets/7.jpg',
]
</script>

<style scoped lang="less">
@import url('../../static/medias.less');
</style>
