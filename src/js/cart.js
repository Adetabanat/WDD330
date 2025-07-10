import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const totalCostElement = document.querySelector(".cart-total");

  productList.innerHTML = ""; // clear if needed

  if (cart.length === 0) {
    cartFooter.classList.add("hide");
    return;
  }

  let total = 0;

  cart.forEach(product => {
    const item = document.createElement("li");
    item.classList.add("cart-card", "divider");

    item.innerHTML = `
      <a href="#" class="cart-card__image">
        <img src="${product.image}" alt="${product.name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${product.name}</h2>
      </a>
      <p class="cart-card__color">${product.color || "N/A"}</p>
      <p class="cart-card__quantity">qty: ${product.quantity || 1}</p>
      <p class="cart-card__price">$${product.price.toFixed(2)}</p>
    `;

    productList.appendChild(item);
    total += product.price * (product.quantity || 1);
  });

  cartFooter.classList.remove("hide");
  totalCostElement.textContent = `Total: $${total.toFixed(2)}`;
});


renderCartContents();
