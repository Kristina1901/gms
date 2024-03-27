function getDeviceType() {
  if (window.matchMedia("(max-width: 1439px)").matches) {
    return "mobile";
  } else {
    return "desktop";
  }
}

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

function showToast(message, duration = 3000) {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerText = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 500);
    }, duration);
  }, 100);
}

let totalOrder = 0;

document.addEventListener("DOMContentLoaded", function () {
  let productList = document.querySelector(".products__list");
  let clickCounts = JSON.parse(sessionStorage.getItem("clickCounts")) || {};
  let storedTotalOrder = parseInt(sessionStorage.getItem("totalOrder")) || 0;
  totalOrder = storedTotalOrder;

  let totalOrderNumber = document.getElementById("totalOrder");
  let totalOrderNumber1 = document.getElementById("totalOrder1");

  if (Object.keys(clickCounts).length !== 0) {
    totalOrderNumber.style.display = "flex";
    totalOrderNumber.innerHTML = totalOrder;
    totalOrderNumber1.style.display = "flex";
    totalOrderNumber1.innerHTML = totalOrder;
  }

  function renderProducts(startIndex, count) {
    for (let i = startIndex; i < startIndex + count; i++) {
      if (i >= productsData.length) {
        break;
      }
      let listItem = document.createElement("li");
      listItem.className = "products__list-item";
      let product = productsData[i];
      listItem.id = product.id;
      listItem.innerHTML = `
          <img src="${product.imagePath}" alt="games" width="294" height="300">
         <div>
          <div class="products__list-item-price-info">
            <p class="products__list-item-priceinfo-price">${product.price}</p>
            <button class="products__list-item-priceinfo-buy" data-product-id="${product.id}"></button>
          </div>
          <div class="products__list-item-rate">
            <p class="products__list-item-rate-name">${product.name}</p>
            <div class="stars"></div>
          </div>
        </div>
        `;
      productList.appendChild(listItem);
    }
  }

  function handleBuyButtonClick(event) {
    let productId = event.target.getAttribute("data-product-id");
    if (clickCounts[productId] !== undefined) {
      clickCounts[productId]++;
    } else {
      clickCounts[productId] = 1;
    }
    increaseTotal();
    sessionStorage.setItem("clickCounts", JSON.stringify(clickCounts));
    showToast(
      `
    পণ্য সফলভাবে যোগ করা হয়েছে`,
      2000
    );
  }

  function updateItemCount() {
    let deviceType = getDeviceType();
    let itemCount = deviceType === "mobile" ? 3 : 6;

    productList.innerHTML = "";
    renderProducts(0, itemCount);
  }

  function increaseTotal() {
    totalOrder += 1;
    totalOrderNumber.style.display = "flex";
    totalOrderNumber.innerHTML = totalOrder;
    totalOrderNumber1.style.display = "flex";
    totalOrderNumber1.innerHTML = totalOrder;
    sessionStorage.setItem("totalOrder", totalOrder.toString());
  }

  renderProducts(0, 6);
  window.addEventListener("resize", updateItemCount);
  productList.addEventListener("click", function (event) {
    if (event.target.classList.contains("products__list-item-priceinfo-buy")) {
      handleBuyButtonClick(event);
    }
  });

  document.getElementById("load").addEventListener("click", function () {
    let loadedItems = productList.querySelectorAll(
      ".products__list-item"
    ).length;
    let deviceType = getDeviceType();
    let itemCount = deviceType === "mobile" ? 3 : 6;

    renderProducts(loadedItems, itemCount);
  });
});
