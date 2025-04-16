import { Fancybox } from "@fancyapps/ui";

document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('[data-fancybox]'); 

    if(items){
        Fancybox.bind('[data-fancybox]', {});
    }
});
