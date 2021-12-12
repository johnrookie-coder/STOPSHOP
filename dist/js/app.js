"use strict";

const cards = document.querySelectorAll(".get-started__row");
const navItem = document.querySelectorAll(".navbar__item");
const learnMore = document.querySelector(".btn--learnMore");

// Nav Item click event
const navItemEvent = function () {
  navItem.forEach((item) => {
    item.addEventListener("click", () => {
      const link = item.firstElementChild.href;
      const srcLoc = link.indexOf("#");
      const path = link.slice(srcLoc);

      location.href = path;
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

// Hamburger menu
const mobileNav = function () {
  const menuBtn = document.querySelector(".btn--menu");
  let menuOpen = false;
  menuBtn.addEventListener("click", () => {
    if (!menuOpen) {
      menuBtn.classList.toggle("active");
    }
  });
};

// IIFE
(function () {
  mobileNav();
  navItemEvent();
  cardsEvent();
  learnBtn();
})();
