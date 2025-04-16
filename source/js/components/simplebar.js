import SimpleBar from "simplebar";

const bars = document.querySelectorAll('[data-simplebar]');

bars && bars.forEach(function(bar){
    new SimpleBar(bar);
})