// Ambil data dari localStorage
const orderData = JSON.parse(localStorage.getItem("order"));

// Ambil elemen untuk menampilkan data transaksi
const itemName = document.getElementById('item-name');
const itemPrice = document.getElementById('item-price');
const taxElement = document.getElementById('tax');
const totalPriceElement = document.getElementById('total-price');

// Periksa apakah data order ada
if (orderData) {
    // Menampilkan nama produk dan detail transaksi
    itemName.textContent = `${orderData.name} x${orderData.quantity}`;
    itemPrice.textContent = `${orderData.name} x${orderData.quantity} .......................... Rp. ${orderData.price.toLocaleString("id-ID")},00`;

    // Menghitung PPN (10%)
    const tax = Math.round(orderData.total * 0.1);
    taxElement.textContent = `PPN (10%) : Rp. ${tax.toLocaleString("id-ID")},00`;

    // Menampilkan total harga
    const totalPrice = orderData.total + tax;
    totalPriceElement.textContent = `Rp. ${totalPrice.toLocaleString("id-ID")},00`;
} else {
    // Jika tidak ada data pesanan, tampilkan pesan dan arahkan ke halaman produk
    alert("No order data found! Please select a product first.");
    window.location.href = "../../Product/html/product.html";
}

// Fungsi untuk mengarahkan ke halaman produk lagi
const buyAgainButton = document.getElementById('buyAgainBtn');
buyAgainButton.addEventListener('click', () => {
    window.location.href = '../../Product/html/product.html'; // Redirect ke halaman produk
});
