export default {
  windowEl: window,
  documentEl: document,
  htmlEl: document.documentElement,
  bodyEl: document.body,
  activeClass: 'active',
  activeClassMode: 'mode',
  header: document.querySelector('header'),
  footer: document.querySelector('footer'),

  reviewsSliders: document.querySelectorAll('.reviews-slider'),
  mainSliders: document.querySelectorAll('.main-slider'),
  gallerySliders: document.querySelectorAll('.gallery-slider'),
  serviceSliders: document.querySelectorAll('.service-slider'),
  blogSliders: document.querySelectorAll('.blog-slider'),


  infoSliders: document.querySelectorAll('.info-slider'),
  cookingSliders: document.querySelectorAll('.cooking-slider'),
  parentSliders: document.querySelectorAll('.product-slider'),
  filterBtn: document.querySelector('[data-aside-btn]'),
  filterAside: document.querySelector('.product-section__aside'),

  burger: document.querySelectorAll('.burger'),
  mobileMenu: document.querySelector('.mobile'),
  overlay: document.querySelector('[data-overlay]'),
  modals: [...document.querySelectorAll('[data-popup]')],
  modalsMode: [...document.querySelectorAll('[data-mode-modal]')],
  modalsButton: [...document.querySelectorAll("[data-btn-modal]")],
}
