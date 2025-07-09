const products = [
  { id: 1, name: "Tomatoes", price: 40, img: "https://source.unsplash.com/250x150/?tomato" },
  { id: 2, name: "Onions", price: 30, img: "https://source.unsplash.com/250x150/?onion" },
  { id: 3, name: "Potatoes", price: 25, img: "https://source.unsplash.com/250x150/?potato" },
  { id: 4, name: "Carrots", price: 35, img: "https://source.unsplash.com/250x150/?carrot" },
  { id: 5, name: "Spinach", price: 20, img: "https://source.unsplash.com/250x150/?spinach" },
  { id: 6, name: "Broccoli", price: 50, img: "https://source.unsplash.com/250x150/?broccoli" },
];

let cart = [];

function renderProducts() {
  const container = document.getElementById('product-list');
  container.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}/kg</p>
      <input type="number" min="1" value="1" id="qty-${product.id}" />
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join('');
}

function addToCart(id) {
  const qty = parseInt(document.getElementById(`qty-${id}`).value);
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }
  updateCart();
}

function updateCart() {
  document.getElementById('cart-count').innerText = cart.reduce((a, b) => a + b.qty, 0);
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = cart.map(item => `
    <div>
      ${item.name} - ${item.qty}kg - ₹${item.qty * item.price}
      <button onclick="removeItem(${item.id})">Remove</button>
    </div>
  `).join('');
  document.getElementById('cart-total').innerText = cart.reduce((a, b) => a + b.price * b.qty, 0);
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function toggleCart() {
  const cartPanel = document.getElementById('cart');
  cartPanel.style.display = cartPanel.style.display === 'flex' ? 'none' : 'flex';
}

function checkout() {
  alert("Checkout not implemented. Thanks for shopping with us!");
}

function submitForm(e) {
  e.preventDefault();
  alert("Thank you for contacting us! We'll get back to you soon.");
}

renderProducts();
