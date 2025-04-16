import {
  removeClassInArray,
  addCustomClass,
} from "../functions/customFunctions";

// --------------- tabs custom function --------------- //

const tabsFunction = function (
  tabsDataInitArray,
  tabsNavAttr,
  tabsContentAttr,
  active = "active"
) {
  if (!tabsDataInitArray) return;

  tabsDataInitArray.forEach((tabParent) => {
    if (!tabParent) return;

    const tabNav = [...tabParent.querySelectorAll(`[${tabsNavAttr}]`)];
    const tabContent = [...tabParent.querySelectorAll(`[${tabsContentAttr}]`)];

    const activateTab = (tabId, updateHash = false) => {
      if (!tabId) return;

      removeClassInArray(tabNav, active);
      removeClassInArray(tabNav, "disabled");
      removeClassInArray(tabContent, active);
      removeClassInArray(tabContent, "disabled");

      const targetNav = tabParent.querySelector(`[${tabsNavAttr}="${tabId}"]`);
      const targetContent = tabParent.querySelector(
        `[${tabsContentAttr}="${tabId}"]`
      );

      if (targetNav && targetContent) {
        addCustomClass(targetNav, active);
        addCustomClass(targetContent, active);

        if (updateHash) {
          history.pushState(null, null, `#${tabId}`);
        }
      }
    };

    tabNav.forEach((nav) => {
      nav.addEventListener("click", (e) => {
        const href = nav.getAttribute("href");
        const tabId = nav.getAttribute(tabsNavAttr);

        if (href && href.startsWith("#") && tabId) {
          e.preventDefault(); 
          history.pushState(null, null, href);
          activateTab(tabId, false);
        } else if (tabId) {
          e.preventDefault();
          activateTab(tabId);
        }
      });
    });

    const checkHash = () => {
      const currentHash = location.hash.replace("#", "");
      if (currentHash) {
        const targetNav = tabParent.querySelector(`[href="#${currentHash}"]`);
        const tabId = targetNav ? targetNav.getAttribute(tabsNavAttr) : null;
        if (tabId) {
          activateTab(tabId);
        }
      }
    };

    window.addEventListener("load", checkHash);
    window.addEventListener("hashchange", checkHash);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  tabsFunction(
    document.querySelectorAll("[data-tabs-parrent]"),
    "data-tab",
    "data-tab-content"
  );
  tabsFunction(
    document.querySelectorAll("[data-inner-parrent]"),
    "data-inner-tab",
    "data-inner-content"
  );
});
