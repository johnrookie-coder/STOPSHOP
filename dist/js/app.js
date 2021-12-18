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

      if (srcLoc != -1) {
        const path = link.slice(srcLoc);
        location.href = path;
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
  navItemEvent();
  cardsEvent();
  learnBtn();
})();

/*  
  Things to modify:
    index.html - mobile navigation - some links are not working the way it should be.
    cart.js - 1cart, remove items, Error: though NO items on the cart, it still can checkout the product.
    styles.css - alignment of card (minor)
*/
