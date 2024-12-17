const orderList = document.getElementById("order-list");
const totalSummary = document.getElementById("total-summary");
const taxInfo = document.getElementById("tax-info");

// Ambil data dari localStorage
let orderData = JSON.parse(localStorage.getItem("order"));

function updatePage() {
  if (orderData) {
    // Kosongkan daftar untuk pembaruan
    orderList.innerHTML = "";

    // Buat elemen item pesanan
    const orderItem = document.createElement("li");
    orderItem.innerHTML = `
      <span>
        <button class="delete-btn">-</button>
        ${orderData.name} x${orderData.quantity} ...................................................... Rp. ${orderData.total.toLocaleString("id-ID")},00
      </span>
    `;
    orderList.appendChild(orderItem);

    // Hitung total harga dengan PPN
    const tax = Math.round(orderData.total * 0.1);
    const totalPrice = orderData.total + tax;

    // Update informasi harga
    totalSummary.textContent = `Total Price : Rp. ${totalPrice.toLocaleString("id-ID")},00`;
    taxInfo.textContent = `PPN (10%) : Rp. ${tax.toLocaleString("id-ID")},00`;

    // Tambahkan event listener untuk tombol hapus
    document.querySelector(".delete-btn").addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this item?")) {
        localStorage.removeItem("order");
        orderData = null; // Set data menjadi null
        orderList.innerHTML = "No order data found! Please select a product first.";
        totalSummary.textContent = "";
        taxInfo.textContent = "";
      }
    });
  } else {
    // Tampilkan pesan jika tidak ada data
    orderList.innerHTML = "No order data found! Please select a product first.";
    totalSummary.textContent = "";
    taxInfo.textContent = "";
  }
}

updatePage();

// Event listener untuk tombol "Pay Now"
document.querySelector(".pay-now-btn").addEventListener("click", () => {
  window.location.href = "../../Invoice/html/invoice.html";
});
