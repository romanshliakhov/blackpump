document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector(".contacts-form__area");

    if (textarea) {
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10); 
      const maxSingleLineHeight = lineHeight * 1.1;
  
      textarea.addEventListener("input", () => {

        console.log(lineHeight, maxSingleLineHeight);

        if (textarea.scrollHeight > maxSingleLineHeight) {
          textarea.style.maxHeight = "none";
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      });
    }
  });