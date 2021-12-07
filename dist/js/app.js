"use strict";
// in-use
const cards = document.querySelectorAll(".get-started__row");
const navItem = document.querySelectorAll(".navbar__item");
const learnMore = document.querySelector(".btn--learnMore");

//  ***************************** Nav Item click event ***********************
navItem.forEach((item) => {
  item.addEventListener("click", () => {
    const link = item.firstElementChild.href;
    const srcLoc = link.indexOf("#");
    const path = link.slice(srcLoc);

    location.href = path;
  });
});

learnMore.addEventListener("click", (e) => {
  e.preventDefault();
  location.href = "#services";
});
//  ***************************** Cards click event ***********************
// Cards open new HTML page
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
