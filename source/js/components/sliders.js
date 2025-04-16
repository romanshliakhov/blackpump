import Swiper from "../vendor/swiper.js";
import vars from "../_vars.js";
import { FreeMode } from "swiper/modules";

document.addEventListener("DOMContentLoaded", function () {
  const { reviewsSliders, mainSliders, gallerySliders, serviceSliders, blogSliders } = vars;

  reviewsSliders.forEach(function (slider) {
    const container = slider.querySelector(".swiper-container");
    const nextBtn = slider.querySelector(".swiper-btn.next");
    const prevBtn = slider.querySelector(".swiper-btn.prev");

    const mainSwiper = new Swiper(container, {
      spaceBetween: 30,
      slidesPerView: 3,
      centeredSlides: true,
      initialSlide: 2,
      speed: 1800,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      loop: true,

      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      breakpoints: {
        320: {
          slidesPerView: 1.3,
          spaceBetween: 25,
        },
        450: {
          slidesPerView: 1.5,
          spaceBetween: 25,
        },
        576: {
          slidesPerView: 2.5,
          spaceBetween: 25,
        },
        800: {
          slidesPerView: 2.5,
          spaceBetween: 25,
        },
        870: {
          slidesPerView: 3,
          spaceBetween: 37,
        },
        1400: {
          spaceBetween: 47,
        },
        1800: {
          spaceBetween: 65,
        },
      },
    });
  });

  mainSliders.forEach(function (slider) {
    const container = slider.querySelector(".swiper-container");
    const pagination = slider.querySelector(".swiper-pagination");

    const mainSwiper = new Swiper(container, {
      spaceBetween: 0,
      slidesPerView: 1,
      speed: 1800,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      loop: true,
      autoplay: { delay: 4500 },

      pagination: {
        el: pagination,
        clickable: true,
      },
    });
  });

  gallerySliders.forEach(function (slider) {
    const container = slider.querySelector(".swiper-container");
    const nextBtn = slider.querySelector(".swiper-btn.next");
    const prevBtn = slider.querySelector(".swiper-btn.prev");

    const mainSwiper = new Swiper(container, {
      spaceBetween: 5,
      slidesPerView: 3,
     
      speed: 1400,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      loop: true,
      slideToClickedSlide: true,
      centeredSlides: true,
      initialSlide: 2,

      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      breakpoints: {
        320: {
          centeredSlides: false,
          initialSlide: 1,
          slidesPerView: 1.05,
          spaceBetween: 10,
        },
        576:{
          slidesPerView: 1.2,
          spaceBetween: 20,
        },
        768: {
             centeredSlides: true,
      initialSlide: 2,
          slidesPerView: 2.5,
          spaceBetween: 5,
        },
        870: {
          slidesPerView: 3,
        }
      },
    });
  });

  serviceSliders.forEach(function (slider) {
    const container = slider.querySelector(".swiper-container");
    const nextBtn = slider.querySelector(".swiper-btn.next");
    const prevBtn = slider.querySelector(".swiper-btn.prev");

    const mainSwiper = new Swiper(container, {
      spaceBetween: 30,
      slidesPerView: 3,
      speed: 1800,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      loop: true,

      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      breakpoints: {
        320: {
          slidesPerView: 1.3,
          spaceBetween: 10,
        },
        870: {
          slidesPerView: 3,
          spaceBetween: 14,
        },
        1400: {
          spaceBetween: 20,
        },
        1800: {
          spaceBetween: 19,
        },
      },
    });
  });

  blogSliders.forEach(function (slider) {
    const container = slider.querySelector(".swiper-container");
    const nextBtn = slider.querySelector(".swiper-btn.next");
    const prevBtn = slider.querySelector(".swiper-btn.prev");

    const mainSwiper = new Swiper(container, {
      spaceBetween: 30,
      slidesPerView: 3,
      speed: 1800,
      watchOverflow: true,
      observer: true,
      observeParents: true,

      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      breakpoints: {
        320: {
          slidesPerView: 1.1,
          spaceBetween: 10,
        },
        450: {
          slidesPerView: 1.3,
          spaceBetween: 10,
        },
        500: {
          slidesPerView: 1.5,
          spaceBetween: 10,
        },
        576: {
          spaceBetween: 10,
          slidesPerView: 2.2,
        },
        650: {
          spaceBetween: 10,
          slidesPerView: 2.5,
        },
        874: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1400: {
          spaceBetween: 77,
        },
        1800: {
          spaceBetween: 94,
        },
      },
    });
  });


  let swipers = [];

  function initSwipers() {
    const bannerSliders = document.querySelectorAll('.services-slider');
  
    bannerSliders.forEach((slider) => {
      const swiperContainer = slider.querySelector('.swiper-container');
      const paginationEl = slider.querySelector('.swiper-pagination');
  
      if (window.innerWidth < 768) {
        if (!swiperContainer.swiper) {
          paginationEl.innerHTML = '';
  
          const slides = swiperContainer.querySelectorAll('.swiper-slide');
          slides.forEach((slide, index) => {
            const title = slide.dataset.title;
            const bullet = document.createElement('span');
            bullet.classList.add('custom-bullet');
            bullet.textContent = title;
            bullet.dataset.index = index;
            paginationEl.appendChild(bullet);
          });
  
          const swiper = new Swiper(swiperContainer, {
            spaceBetween: 20,
            speed: 800,
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            freemode: true,
            on: {
              slideChange: function () {
                updateActiveBullet(swiper, paginationEl);
              }
            }
          });
  
          paginationEl.addEventListener('click', (e) => {
            if (e.target.classList.contains('custom-bullet')) {
              const index = parseInt(e.target.dataset.index, 10);
              swiper.slideTo(index);
            }
          });
  
          updateActiveBullet(swiper, paginationEl);
  
          swipers.push(swiper);
        }
      } else {
        if (swiperContainer.swiper) {
          swiperContainer.swiper.destroy(true, true);
        }
      }
    });
  }

  function updateActiveBullet(swiper, paginationEl) {
    const bullets = paginationEl.querySelectorAll('.custom-bullet');
    bullets.forEach((bullet, index) => {
      bullet.classList.toggle('active', index === swiper.realIndex);
    });
  }
  
  window.addEventListener('load', initSwipers);
  window.addEventListener('resize', initSwipers);
  

  // infoSliders.forEach(function (slider) {
  //   const container = slider.querySelector(".swiper-container");
  //   const nextBtn = slider.querySelector(".swiper-button-next");
  //   const prevBtn = slider.querySelector(".swiper-button-prev");
  //   const pagination = slider.querySelector(".swiper-pagination");

  //   const slides = container.querySelectorAll(".swiper-slide");
  //   const isSingleSlide = slides.length === 1;

  //   const infoSwiper = new Swiper(container, {
  //     spaceBetween: 20,
  //     slidesPerView: 1,
  //     speed: 1800,
  //     watchOverflow: true,
  //     observer: true,
  //     observeParents: true,
  //     loop: !isSingleSlide,
  //     autoplay: !isSingleSlide ? { delay: 3000 } : false,

  //     navigation: {
  //       nextEl: nextBtn,
  //       prevEl: prevBtn,
  //     },
  //     pagination: {
  //       el: pagination,
  //       clickable: true,
  //     },
  //   });
  // });

 


});
