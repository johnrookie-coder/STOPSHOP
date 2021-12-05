"use strict";
// in-use
const cards = document.querySelectorAll(".get-started__row");
const addToCart = document.querySelectorAll(".btn--prod");

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

//  ***************************** Add to Cart ***********************
(function () {
  addToCart.forEach((cart) => {
    cart.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target.closest(".btn--prod")) {
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

        const item = {};

        // Adds properties to the empty item object
        item.name = productName;
        item.price = finalPrice;
        item.quantity = quantity;
        item.img = `img${partialPath}`;

        console.log(item);

        // layout foreach item
        const cartContainer = document.querySelector(".cart__details");
        const cartItem = document.createElement("div");

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

        // Let the user know that the items are already added to the cart
        window.alert("Items added to the cart");

        cartContainer.prepend(cartItem);
        showTotals();

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
      }
    });
  });
})();

// show totals
function showTotals() {
  const total = [];
  const quantities = [];

  const items = document.querySelectorAll(".cart__details__price");
  const qty = document.querySelectorAll(".cart__details__input");

  qty.forEach((quantity) => {
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
}

// IIFE
(function () {
  const cart = document.querySelector(".cart");

  const cartInfo = document.querySelector(".cart__details");

  cart.addEventListener("click", (e) => {
    e.preventDefault();
    cartInfo.classList.toggle("show");
  });
})();

/*
Things to add in JS Add to Cart feature.

  1. Add a notification that the item is already added to the cart. - DONE (Will create a layout later)

  2. Create a navigation cart icon. - DONE

  3. Option to remove items from the cart. - DONE

  4. Computes the total amount of each items from the cart. - DONE

  5. List of Products on cart shows when toggle -DONE

  6. Total and Checkout button will be added once there is an item to the cart. - DONE

  7. Add text change to the cart, whenever user increases or decreases the value.

  8. Masked the text when the product name is too long. (More than 32) - DONE


  // CSS
  1. Cart details on smaller screen - DONE
  

*/
