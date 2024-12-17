// Ambil elemen container produk
const productContainer = document.getElementById("product-container");

// Fungsi untuk memuat produk dari backend (Laravel API)
function loadProducts() {
  // Menggunakan URL API Laravel untuk mendapatkan data produk
  fetch("http://127.0.0.1:8000/api/products")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parsing JSON
    })
    .then(data => {
      // Pastikan data berbentuk array
      if (!Array.isArray(data)) {
        throw new Error("Data is not an array");
      }
      console.log("Products loaded:", data);

      // Bersihkan kontainer sebelum menambahkan produk
      productContainer.innerHTML = "";

      // Looping data produk dan tambahkan ke halaman
      data.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
          <div class="product-image">
            <img src="../../images/shirt_front.png" alt="${product.name} Front">
            <img src="../../images/shirt_back.png" alt="${product.name} Back">
          </div>
          <div class="product-details">
            <p class="publish-date">Publish on ${new Date(product.created_at).toLocaleDateString()}</p>
            <h3>Rp. ${product.price.toLocaleString()} <br><span>${product.name}</span></h3>
            <p class="description">${product.description}</p>
            <div class="order-section">
              <div class="quantity-control">
                <button class="decrease-quantity" data-id="${product.id}">-</button>
                <span class="quantity" id="quantity-${product.id}">1</span>
                <button class="increase-quantity" data-id="${product.id}">+</button>
              </div>
              <button class="order-now-btn" data-id="${product.id}">Order Now</button>
            </div>
            <p class="available-items">Available Items: <span id="available-items-${product.id}">${product.quantity}</span></p>
          </div>
        `;

        // Tambahkan produk ke container
        productContainer.appendChild(productCard);

        // Tambahkan event listener untuk tombol order
        attachOrderEvents(product.id, product.price, product.quantity);
      });
    })
    .catch(error => console.error("Error loading products:", error));
}

// Fungsi untuk menambahkan event listener ke tombol order
function attachOrderEvents(productId, productPrice, maxQuantity) {
  let quantity = 1;

  // Tombol untuk menambah jumlah produk
  document.querySelector(`.increase-quantity[data-id="${productId}"]`).addEventListener("click", () => {
    if (quantity < maxQuantity) {
      quantity++;
      updateQuantity(productId, quantity, maxQuantity);
    }
  });

  // Tombol untuk mengurangi jumlah produk
  document.querySelector(`.decrease-quantity[data-id="${productId}"]`).addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      updateQuantity(productId, quantity, maxQuantity);
    }
  });

  // Tombol untuk memesan produk
  document.querySelector(`.order-now-btn[data-id="${productId}"]`).addEventListener("click", () => {
    const orderData = {
      id: productId,
      name: document.querySelector(`.product-details h3 span`).textContent,
      price: productPrice,
      quantity: quantity,
      total: productPrice * quantity,
    };

    // Simpan data ke localStorage
    localStorage.setItem("order", JSON.stringify(orderData));

    // Redirect ke halaman Buy
    window.location.href = "../../Buy/html/buy.html";
  });
}

// Fungsi untuk memperbarui jumlah dan stok
function updateQuantity(productId, quantity, maxQuantity) {
  document.getElementById(`quantity-${productId}`).textContent = quantity;
  document.getElementById(`available-items-${productId}`).textContent = maxQuantity - quantity;
}

// Panggil fungsi loadProducts saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadProducts);
