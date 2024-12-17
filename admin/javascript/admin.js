let adminProducts = []; // Simpan data produk

// Fungsi untuk mengambil produk dari server (API Laravel)
async function fetchProducts() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/new_products');
        const data = await response.json();
        
        if (data.error) {
            console.error("Error fetching products:", data.error);
        } else {
            adminProducts = data;  // Simpan produk yang diambil
            renderAdminProducts();
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Fungsi untuk menampilkan produk di halaman admin
function renderAdminProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    adminProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <div>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p><strong>Rp. ${product.price}</strong></p>
                <!-- Menampilkan gambar dengan tag <img> -->
                <img src="${product.image}" alt="${product.name}" style="width: 100px; height: auto;"/>
            </div>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Fungsi untuk menambahkan produk ke server (API Laravel)
async function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;

    const newProduct = { name, image, description, price };

    try {
        const response = await fetch('http://127.0.0.1:8000/api/new_products', {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        
        if (data.error) {
            alert("Error adding product: " + data.error);
        } else {
            adminProducts.push(data.data);  // Menambahkan produk baru ke daftar lokal
            renderAdminProducts();
            document.getElementById("product-form").reset();
        }
    } catch (error) {
        console.error("Error adding product:", error);
    }
}

// Fungsi untuk menghapus produk (API Laravel)
async function deleteProduct(id) {
    const product = adminProducts.find(p => p.id === id);
    if (product) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/new_products/${product.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            
            if (data.error) {
                alert("Error deleting product: " + data.error);
            } else {
                adminProducts = adminProducts.filter(p => p.id !== id);
                renderAdminProducts();
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }
}

// Inisialisasi halaman dengan mengambil data produk
document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();  // Ambil produk saat halaman dimuat
    const form = document.getElementById("product-form");
    form.addEventListener("submit", addProduct);
});
