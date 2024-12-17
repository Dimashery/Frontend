let products = []; // Array untuk menyimpan produk

// Fungsi untuk mengambil data produk dari server (API Laravel)
async function fetchProducts() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/new_products');
        const data = await response.json();

        if (data.error) {
            console.error("Error fetching products:", data.error);
        } else {
            products = data;  // Menyimpan data produk yang diambil
            displayProducts(); // Menampilkan produk setelah data diterima
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Fungsi untuk menampilkan produk di halaman What's New
function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";  // Clear previous products

    // Menampilkan setiap produk
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">Rp. ${product.price}</p>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Inisialisasi halaman dengan mengambil data produk
document.addEventListener("DOMContentLoaded", fetchProducts);
