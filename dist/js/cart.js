"use strict";

const addToCart = document.querySelectorAll(".btn--prod");
const cart = document.querySelector(".cart");
const cartInfo = document.querySelector(".cart__details");
const wrapper0 = document.querySelector(".cart__details__wrapper--0");
const wrapper1 = document.querySelector(".cart__details__wrapper--1");

// The set currency is "PHP"
const formattedPHP = function (num) {
  const number = +num;
  const opt = {
    style: "currency",
    currency: "PHP",
  };

  const formattedMoney = new Intl.NumberFormat(opt).format(number);

  return formattedMoney;
};

// Masked strings/ product name longer than 25
const maskedStr = function (str) {
  const strLength = str.length;
  let receivedStr;

  strLength <= 30
    ? (receivedStr = str)
    : (receivedStr = str.slice(0, 25).padEnd(30, "."));

  return receivedStr;
};

const purchaseCheckout = function () {
  alert("Order has been processed");

  // Continously remove child nodes in the cart info
  while (cartInfo.hasChildNodes()) {
    cartInfo.removeChild(cartInfo.firstChild);
  }

  // Displays when no items added to the cart
  if (!cartInfo.hasChildNodes()) {
    const layout = `
          <p><strong>No items on the cart</strong></p>
        `;

    wrapper0.innerHTML = layout;
    wrapper0.style.display = "block";
    wrapper1.style.display = "none";
    cartInfo.classList.remove("show");
    cartInfo.append(wrapper0);
    location.reload();
  }
};

// Show totals
function showTotals() {
  const total = [];
  const quantities = [];

  const items = document.querySelectorAll(".cart__details__price");
  const qty = document.querySelectorAll(".cart__details__input");

  qty.forEach((quantity, idx) => {
    return quantities.push(quantity.value);
  });

  items.forEach((item, i) => {
    const prodItem = +item.textContent * quantities[i];
    total.push(prodItem);
  });

  // Totals
  const totalAmount = total.reduce((total, item) => {
    total += item;
    return total;
  }, 0);

  // Quantity in cart counter
  const totalQuantities = quantities.reduce((total, item) => {
    total += +item;
    return total;
  }, 0);

  // Formatted total amount
  const formattedCurrency = formattedPHP(totalAmount);

  // total amount in text
  document.querySelector(".cart__total").textContent =
    "Total: PHP " + formattedCurrency;
  document.querySelector(".cart__notif").textContent = totalQuantities;

  if (quantities.length !== 0) {
    const wrapper0 = document.querySelector(".cart__details__wrapper--0");
    const wrapper1 = document.querySelector(".cart__details__wrapper--1");

    wrapper0.classList.add("hidden");
    wrapper1.classList.add("show");
  }

  if (quantities.length === 0) {
    const wrapper0 = document.querySelector(".cart__details__wrapper--0");
    const wrapper1 = document.querySelector(".cart__details__wrapper--1");

    wrapper0.classList.add("show");
    wrapper0.classList.remove("hidden");

    wrapper1.classList.remove("show");
    wrapper1.classList.add("hidden");
  }
}

//  ***************************** General layout ***********************
(function () {
  // Initial layout, no items on the cart
  const layout = `
            <p class="mb-sm mt-md">
              <strong>No items on the cart</strong>
            </p>
      `;
  wrapper0.innerHTML = layout;

  cart.addEventListener("click", (e) => {
    // Shows products / items added to the cart once clicked
    cartInfo.classList.toggle("show");

    const notif = +document.querySelector(".cart__notif").textContent;

    // Guard Clauses
    if (notif === 0) return;

    // Add click event to the checkout button
    document
      .querySelector(".btn--checkout")
      .addEventListener("click", purchaseCheckout);

    // Updates the price
    showTotals();
    e.preventDefault();
  });
})();

//  ***************************** Add to Cart ***********************
(function () {
  addToCart.forEach((cart) => {
    cart.addEventListener("click", (e) => {
      e.preventDefault();

      // layout foreach item
      const cartContainer = document.querySelector(".cart__details");
      const cartItem = document.createElement("div");
      const prodInputs = document.querySelectorAll(".product__input");

      if (e.target.closest(".btn--prod")) {
        const item = {};

        // Get the image location based where the click happens
        let imgPath =
          e.target.parentElement.parentElement.parentElement
            .previousElementSibling.firstElementChild.src;

        let imgPos = imgPath.indexOf("img") + 3;
        let partialPath = imgPath.slice(imgPos);

        // Get the productName
        let productName =
          e.target.parentElement.parentElement.children[0].textContent
            .trim()
            .toUpperCase();

        // Get the price of the product
        let price = e.target.parentElement.parentElement.children[2].textContent
          .trim()
          .toUpperCase();

        // Make the sure the string is converted into a number
        let finalPrice = +price.slice(3).trim().replace(",", "");

        // Get the number of quantity
        let quantity = +e.target.parentElement.children[0].children[1].value;

        // Adds properties to the empty item object
        item.name = productName;
        item.price = finalPrice;
        item.quantity = quantity;
        item.img = `img${partialPath}`;

        cartItem.classList.add("cart__details__prod", "mb-xl");

        cartItem.innerHTML = `
          <div class="cart__details__img">
            <img src="${item.img}" alt="${item.name}" />
          </div>
          <div class="cart__details__contents">
            <div class="col-1">
              <p>${maskedStr(item.name)}</p>
              <p>
                <strong class="cart__details__price">${item.price.toFixed(
                  2
                )}</strong>
              </p>
            </div>
            <div class="col-2">
              <input type="number" class="cart__details__input" value="${
                item.quantity
              }" />
              <button class="btn btn--xs btn__remove">Remove</button>
            </div>
          </div>
        `;

        // Close the "cart" whenever user adding items
        if (cartContainer.classList.contains("show")) {
          cartContainer.classList.remove("show");
        }

        // Let the user know that the items are already added to the cart
        window.alert("Items added to the cart");

        // Set the value back to "one" whenever user add new items on the cart
        prodInputs.forEach((inputs) => {
          inputs.value = 1;
        });

        cartContainer.prepend(cartItem);
      }

      // load total layout
      const layout = `
              <div class="layout">
                <p class="mb-sm mt-md h4">
                  <strong class="cart__total">Total: Php 0.00</strong>
                </p>
                <button class="btn btn--md btn--primary btn--checkout">
                  Checkout
                </button>
              </div>
          `;

      wrapper1.innerHTML = layout;
      showTotals();

      //  ***************************** Input value has been changed ***********************
      const prodQty = document.querySelectorAll(".cart__details__input");
      prodQty.forEach((changes) => {
        changes.addEventListener("input", (e) => {
          e.preventDefault();
          showTotals();
        });
      });

      //  ***************************** Remove functionality ***********************
      const removeBtns = document.querySelectorAll(".btn__remove");
      for (let i = 0; i < removeBtns.length; i++) {
        const btn = removeBtns[i];

        btn.addEventListener("click", (e) => {
          // target where the click event happens and removes it.
          const btnClicked = e.target;
          btnClicked.parentElement.parentElement.parentElement.remove();

          // Updates the total price
          showTotals();
        });
      }
    });
  });
})();

// Lazy Loading
const allImages = document.querySelectorAll("img[data-src]");

const lazyLoading = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy__img");
  });

  observer.unobserve(entry.target);
};

const options = {
  root: null,
  threshold: 0,
};

const imageObserver = new IntersectionObserver(lazyLoading, options);
allImages.forEach((img) => imageObserver.observe(img));
