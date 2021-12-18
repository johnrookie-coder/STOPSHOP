"use strict";

const cards = document.querySelectorAll(".get-started__row");
const navItem = document.querySelectorAll(".navbar__item");
const navigationItems = document.querySelectorAll(".navigation__items");
const learnMore = document.querySelector(".btn--learnMore");

// Nav Item (Desktop)
const navItemEvent = function () {
  navItem.forEach((item) => {
    item.addEventListener("click", () => {
      const link = item.firstElementChild.href;
      const srcLoc = link.indexOf("#");

      if (srcLoc != -1) {
        const path = link.slice(srcLoc);
        location.href = path;
      } else {
        location.href = link;
      }
    });
  });
};

// Navigation Hamburger menu
const navigationItemsEvent = function () {
  navigationItems.forEach((item) => {
    item.addEventListener("click", () => {
      const link = item.firstElementChild.href;
      const srcLoc = link.indexOf("#");

      console.log(srcLoc);
      console.log(link);
      if (srcLoc != -1) {
        const path = link.slice(srcLoc);
        location.reload(path);
      } else {
        location.href = link;
      }
    });
  });
};

// Learn more click event
const learnBtn = function () {
  if (learnMore !== null) {
    learnMore.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = "#services";
    });
  }
};

// Cards click event
// Cards opens in new HTML page
const cardsEvent = function () {
  cards.forEach((card, i) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();

      if (i === 0) {
        window.open("product.html");
      }
      if (i === 1) {
        window.open("delivery.html");
      }

      if (i === 2) {
        window.open("payment.html");
      }
    });
  });
};

// IIFE
(function () {
  navigationItemsEvent();
  navItemEvent();
  cardsEvent();
  learnBtn();
})();
