<template>
	  <md-card>
    
    <md-card-media class="swiper-inner">
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide class="slide1"></swiper-slide>
        <swiper-slide class="slide2"></swiper-slide>
        <swiper-slide class="slide3"></swiper-slide>
        <swiper-slide class="slide4"></swiper-slide>
        <swiper-slide class="slide5"></swiper-slide>
        <swiper-slide class="slide6"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </md-card-media>
  </md-card>
</template>

<script>
	// import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'carrousel',
    data() {
      return {
        swiperOption: {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
          },
          pagination: {
            el: '.swiper-pagination'
          },
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .swiper-inner {
    width: 100%;
    height: 400px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;
  }	
  .slide1 {
  	background: url('https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4247781442,1470012665&fm=26&gp=0.jpg') center center no-repeat;
  	background-size: contain;
  }
  .slide2 {
  	background: url('http://img0.imgtn.bdimg.com/it/u=3604212772,3793994646&fm=26&gp=0.jpg') center center no-repeat;
  	background-size: contain;
  	
  }
  .slide3 {
  	background: url('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=108677447,3508261868&fm=26&gp=0.jpg') center center no-repeat;
  	background-size: contain;
  }
  .slide4 {
  	background: url('https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2116377700,2489133862&fm=26&gp=0.jpg') center center no-repeat;
  	background-size: contain;
  }
  .slide5 {
  	background: url('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3590073027,4012517707&fm=26&gp=0.jpg') center center no-repeat;
  	background-size: contain;
  }
  .slide6 {
  	background: url('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2970650429,1024053828&fm=26&gp=0.jpg') center center no-repeat;
  	background-size: contain;
  }
</style>