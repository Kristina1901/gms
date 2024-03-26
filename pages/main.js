const currentYear = new Date().getFullYear();
document.getElementById("year").innerText = currentYear;
document.getElementById("year1").innerText = currentYear;
let clickCounts = JSON.parse(sessionStorage.getItem("clickCounts")) || {};
let productsData = [
  {
    id: 1,
    imagePath: "../img/thor.jpg",
    price: "BDT 6569",
    name: "শিশুদের জন্য",
  },
  {
    id: 2,
    imagePath: "../img/cards.jpg",
    price: "BDT 3516",
    name: "প্রতখেলা কার্ড",
  },
  {
    id: 3,
    imagePath: "../img/joker.jpg",
    price: "BDT 4432",
    name: "উপহারের জন্য",
  },
  {
    id: 4,
    imagePath: "../img/cowboy.jpg",
    price: "BDT 4312",
    name: "প্রতিষ্ঠানের জন্য",
  },
  {
    id: 5,
    imagePath: "../img/monopoly.jpg",
    price: "BDT 3690",
    name: "মনোপলি খেলা",
  },
  {
    id: 6,
    imagePath: "../img/cube.jpg",
    price: "BDT 2321",
    name: "জেঙ্গা খেলা",
  },
];
let listProducts = document.querySelector(".buying__list");
let productIdFromStorage = Object.keys(clickCounts);
productIdFromStorage.forEach((productId) => {
  let product = productsData.find((item) => item.id === parseInt(productId));
  if (product) {
    let buyingListItem = document.createElement("li");
    buyingListItem.className = "buying__list-item";
    let clicks = clickCounts[productId];
    let sum = parseInt(product.price.split(" ")[1]) * clicks;
    buyingListItem.innerHTML = `
    <p class="buying__list-item-text">পণ্য</p>
    <div class="buying__list-item-info">
      <img src="${product.imagePath}" alt="games" width="75" height="75">
      <div class="buying__list-item-wrapper"><span class="buying__list-item-name">${product.name}</span> <button class="buying__list-item-button-close" id="close_${productId}" onclick="removeItem(${productId})"></button></div>
      </div>
      <div class="buying__list-item-info-wrapper">
      <div class="buying__list-item-line">
        <p class="buying__list-item-header">মূল্য</p>
        <p class="buying__list-item-priece">${product.price}</p>
      </div>
      <div class="buying__list-item-line">
      <p class="buying__list-item-header">পরিমাণ</p>
      <ul class="buying__list-item-quantity">
      <li>
      <button class="buying__list-item-button" onclick="decreaseQuantity(${productId})">
      <span class="minus"></span>
     </button>
      </li>
      <li class="buying__list-item-quantity-number" data-product-id="${productId}">${clickCounts[productId]}</li>
      <li>
      <button class="buying__list-item-button" onclick="increaseQuantity(${productId})"><span class="plus"></span></button>
      </li>
      </div
      </ul>
       <div class="buying__list-item-line">
        <p class="buying__list-item-header">মোট</p>
        <p class="buying__list-item-priece" data-product-id="${productId}">BDT ${sum}</p>
      </div>
      </div>
      <div class="buying__list-item-button-close-desktop-wrapper">
      <button class="buying__list-item-button-close-desktop" id="close_${productId}" onclick="removeItem(${productId})"></button>
      </div
    `;
    listProducts.appendChild(buyingListItem);
  }
});

function decreaseQuantity(productId) {
  if (clickCounts[productId] > 1) {
    clickCounts[productId]--;
    updateSessionStorageAndDisplay(productId);
  } else if (clickCounts[productId] === 1) {
    clickCounts[productId]--;
    updateSessionStorageAndDisplay(productId);
  }
  updateTotalCountByProducts();
}
function increaseQuantity(productId) {
  clickCounts[productId]++;
  updateSessionStorageAndDisplay(productId);
  updateTotalCountByProducts();
}
function updateTotalCountByProducts() {
  let totalCount = Object.values(clickCounts).reduce(
    (acc, cur) => acc + cur,
    0
  );
  totalCountByProducts = totalCount;
  updateTotalOrderDisplay();
}
function updateSessionStorageAndDisplay(productId) {
  sessionStorage.setItem("clickCounts", JSON.stringify(clickCounts));
  let updatedItem = document.querySelector(
    `.buying__list-item-quantity-number[data-product-id="${productId}"]`
  );

  updatedItem.innerText = clickCounts[productId] || "";
  let product = productsData.find((item) => item.id === parseInt(productId));
  if (clickCounts[productId]) {
    let sum = parseInt(product.price.split(" ")[1]) * clickCounts[productId];
    let totalPrice = document.querySelector(
      `.buying__list-item-priece[data-product-id="${productId}"]`
    );
    totalPrice.innerText = `BDT ${sum}`;
  } else {
    let listItemToRemove = document
      .getElementById(`close_${productId}`)
      .closest(".buying__list-item");
    listItemToRemove.remove();
  }
}
function removeItem(productId) {
  let listItemToRemove = document
    .getElementById(`close_${productId}`)
    .closest(".buying__list-item");
  listItemToRemove.remove();
  delete clickCounts[productId];
  updateSessionStorageAndDisplayAfterRemoval();
  updateTotalCountByProducts();
  updateTotalOrderDisplay();
}

function updateSessionStorageAndDisplayAfterRemoval() {
  sessionStorage.setItem("clickCounts", JSON.stringify(clickCounts));
}
function updateTotalOrderDisplay() {
  let totalOrderNumber = document.getElementById("totalOrder");
  let totalOrderNumber1 = document.getElementById("totalOrder1");
  let totalOrder = 0;

  Object.keys(clickCounts).forEach((productId) => {
    totalOrder += clickCounts[productId];
  });

  if (parseInt(totalOrderNumber.innerHTML) !== totalOrder) {
    totalOrderNumber.style.display = totalOrder > 0 ? "flex" : "none";
    totalOrderNumber.innerHTML = totalOrder;
    totalOrderNumber1.innerHTML = totalOrder;
    totalOrderNumber1.style.display = totalOrder > 0 ? "flex" : "none";
    totalOrderNumber1.style.display = totalOrder > 0 ? "flex" : "none";
  }
}

updateTotalOrderDisplay();
