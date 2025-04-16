import {
  toggleCustomClass,
  addCustomClass,
  removeCustomClass,
  removeClassInArray,
} from "../functions/customFunctions";

let openedAccordion = null;

const getAccordions = (accordionParent, dataName) => {
  return accordionParent.querySelectorAll(`[${dataName}]`);
};

const closeAccordion = (accordion, className = "active") => {
  accordion.style.maxHeight = 0;
  removeCustomClass(accordion, className);
};

const openAccordion = (accordion, className = "active", height = false) => {
  accordion.style.maxHeight = height ? height : `${accordion.scrollHeight}px`;
  addCustomClass(accordion, className);
};

const toggleAccordionButton = (button, className = "active") => {
  toggleCustomClass(button, className);
  toggleCustomClass(button.parentNode, className);
};

const checkIsAccordionOpen = (accordion) => {
  return accordion.classList.contains("active");
};

const accordionClickHandler = function (e) {
  e.preventDefault();

  const currentDataNumber = this.getAttribute("data-id");
  const accordionParent = this.closest("[data-accordion-init]");
  const accordionContent = accordionParent.querySelector(
    `[data-content="${currentDataNumber}"]`
  );
  const isAccordionOpen = checkIsAccordionOpen(accordionContent);
  const isSingle = accordionParent.dataset.single === "true";
  const hasBreakpoint = accordionParent.dataset.breakpoint !== undefined;

  // Если аккордеон открыт, то закрываем его
  if (isAccordionOpen) {
    closeAccordion(accordionContent);
    toggleAccordionButton(this); // Удаляем active у кнопки
    openedAccordion = null;
  } else {
    // Если single true и нет breakpoint, закрываем предыдущий аккордеон всегда
    if (
      isSingle &&
      (!hasBreakpoint ||
        document.documentElement.clientWidth <=
          accordionParent.dataset.breakpoint)
    ) {
      if (openedAccordion) {
        closeAccordion(openedAccordion);
        const previousButton = accordionParent.querySelector(
          `[data-id="${openedAccordion.getAttribute("data-content")}"]`
        );
        toggleAccordionButton(previousButton); // Удаляем active у кнопки предыдущего аккордеона
      }
    }

    openAccordion(accordionContent);
    toggleAccordionButton(this); // Добавляем active к текущей кнопке
    openedAccordion = accordionContent;
  }
};

const activateAccordion = (accordions, handler) => {
  accordions.forEach((accordion) => {
    accordion.addEventListener("click", handler);
  });
};

const deactivateAccordion = (accordions, handler) => {
  accordions.forEach((accordion) => {
    accordion.removeEventListener("click", handler);
  });
};

const syncButtonWithContent = (accordionParent, dataBtn, dataContent) => {
  const accordions = getAccordions(accordionParent, dataBtn);
  accordions.forEach((button) => {
    const contentId = button.getAttribute(dataBtn);
    const content = accordionParent.querySelector(
      `[${dataContent}="${contentId}"]`
    );
    if (checkIsAccordionOpen(content)) {
      addCustomClass(button, "active"); // Синхронизируем состояние кнопки с контентом
    }
  });
};

const accordionDefaultOpen = (accordionParent, currentId) => {
  const defaultOpenContent = accordionParent.querySelector(
    `[data-content="${currentId}"]`
  );
  const defaultOpenButton = accordionParent.querySelector(
    `[data-id="${currentId}"]`
  );

  // Если есть начально открытый аккордеон, добавляем ему класс active
  toggleAccordionButton(defaultOpenButton); // Устанавливаем active на кнопку
  openAccordion(defaultOpenContent); // Открываем контент аккордеона
  openedAccordion = defaultOpenContent;
};

export const accInit = (accParents, dataBtn, dataContent) => {
  accParents.forEach((accordionParent) => {
    if (accordionParent) {
      const accordions = getAccordions(accordionParent, dataBtn);

      if (accordionParent.hasAttribute("data-always-open")) {
        accordions.forEach((button) => {
          const contentId = button.getAttribute(dataBtn);
          const content = accordionParent.querySelector(
            `[${dataContent}="${contentId}"]`
          );

          openAccordion(content);
          addCustomClass(button, "active");

          button.removeEventListener("click", accordionClickHandler);
        });
        return;
      }

      if (accordionParent.dataset.default) {
        accordionDefaultOpen(accordionParent, accordionParent.dataset.default);
      }

      syncButtonWithContent(accordionParent, dataBtn, dataContent);

      activateAccordion(accordions, accordionClickHandler);
    }
  });
};

export const accReinit = (accordionParent, dataBtn, dataContent) => {
  if (accordionParent) {
    const accordions = getAccordions(accordionParent, dataBtn);
    deactivateAccordion(accordions, accordionClickHandler);

    if (openedAccordion) {
      closeAccordion(openedAccordion);
      openedAccordion = null;
    }

    accInit([accordionParent], dataBtn, dataContent);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const accParents = document.querySelectorAll("[data-accordion-init]");

  accInit(accParents, "data-id", "data-content");
});

document.addEventListener("DOMContentLoaded", () => {
  const priceParents = document.querySelectorAll(".prices-accordion");

  priceParents &&
    priceParents.forEach((accordion) => {
      const buttons = accordion.querySelectorAll(".prices-accordion__btn");

      if (!buttons.length) return;

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const content = button.nextElementSibling;

          if (
            !content ||
            !content.classList.contains("prices-accordion__content")
          )
            return;

          const isOpen = content.classList.contains("open");

          if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + "px";

            content.addEventListener(
              "transitionend",
              () => {
                content.style.maxHeight = "initial";
              },
              { once: true }
            );

            addCustomClass(content, 'open');
            addCustomClass(button, 'open');
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
            setTimeout(() => {
              content.style.maxHeight = "0";
            }, 10);

            content.addEventListener(
              "transitionend",
              () => {
                content.style.maxHeight = "";
              },
              { once: true }
            );

            removeCustomClass(content, 'open');
            removeCustomClass(button, 'open');
          }
        });
      });
    });
});
