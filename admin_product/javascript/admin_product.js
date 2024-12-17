const apiUrl = "http://127.0.0.1:8000/api/products"; // Laravel API URL

// Load products
async function loadProducts() {
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";
    products.forEach(product => {
      const row = `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.description}</td>
          <td>${product.price}</td>
          <td>${product.quantity}</td>
          <td>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button class="btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
          </td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  } catch (error) {
    console.error("Failed to load products:", error);
  }
}

// Add or Update product
async function saveProduct(event) {
  event.preventDefault();
  const id = document.getElementById("productId").value;
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;

  const product = { name, description, price, quantity };
  const options = {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  };

  const url = id ? `${apiUrl}/${id}` : apiUrl;

  try {
    await fetch(url, options);
    document.getElementById("productForm").reset();
    loadProducts();
  } catch (error) {
    console.error("Failed to save product:", error);
  }
}

// Edit product
async function editProduct(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    const product = await response.json();

    document.getElementById("productId").value = product.id;
    document.getElementById("name").value = product.name;
    document.getElementById("description").value = product.description;
    document.getElementById("price").value = product.price;
    document.getElementById("quantity").value = product.quantity;
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }
}

// Delete product
async function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      loadProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  }
}

// Event listeners
document.getElementById("productForm").addEventListener("submit", saveProduct);

// Initial load
loadProducts();
