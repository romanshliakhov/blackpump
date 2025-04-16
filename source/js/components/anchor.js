import vars from "../_vars.js";
const { header } = vars;

import SmoothScroll from "smooth-scroll";

document.addEventListener("DOMContentLoaded", function () {
  const scroll = new SmoothScroll('a[href*="#"]', {

    offset: function (anchor) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      return headerHeight; 
    }
  });
});
