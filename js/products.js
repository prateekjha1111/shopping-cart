import data from './data.js';

document.addEventListener('DOMContentLoaded', () => {
const cartValue = document.querySelector('.cart-value');

document.querySelector('.cart-icon').addEventListener('click', () => {
  window.location.href = 'cart.html';
});

const cartArray = JSON.parse(localStorage.getItem('cart')) || [];

if (!data.length) {
  const info = document.createElement('section');
  info.innerHTML = '<div>No products available</div>';
  document.body.appendChild(info);
}

else {
  const container = document.createElement('section'); 
  container.className = 'product-container';

  container.innerHTML = data
    .map(
      (product) => `
        <div class="card" style="width: 18rem; margin: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <img src="${product.image}" class="card-img-top productImage" alt="${product.name}" style="max-height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title productName">${product.name}</h5>
            <p class="card-text text-muted">Price: <strong class="productPrice">$${product.price}</strong></p>
            <div class="gap-1 buttons">
            <button class="decrement-btn btn-secondary">-</button> <span class="quantity">0</span> <button class="increment-btn">+</button>
            </div>
            <p class="card-text">Available Quantity: <strong class="left-quantity">${product.availableQuantity}</strong></p>
            <a href="#" class="btn btn-dark w-100 cart-button">Add to Cart</a>
          </div>
        </div>
      `
    )
    .join('');

  document.body.appendChild(container); 
}

const productCards = document.querySelectorAll('.card');

productCards.forEach((product, id) => {
  const decrementButton = product.querySelector('.decrement-btn');
  const incrementButton = product.querySelector('.increment-btn');
  const inputQuantity = product.querySelector('.quantity');
  const availableQuantity = product.querySelector('.left-quantity');
  const cartButton = product.querySelector('.cart-button');

  let quantity = 0;
  let leftQuantity = parseInt(availableQuantity.textContent);

  // Decrement button click
  decrementButton.addEventListener('click', () => {
    if (quantity > 0) {
      quantity -= 1;
      leftQuantity += 1;
      inputQuantity.textContent = quantity;
      availableQuantity.textContent = leftQuantity;
    }
  });

  // Increment button click
  incrementButton.addEventListener('click', () => {
    if (leftQuantity > 0) {
      quantity += 1;
      leftQuantity -= 1;
      inputQuantity.textContent = quantity;
      availableQuantity.textContent = leftQuantity;
    }
  });

  let productImage = product.querySelector('.productImage').src;
  let productName = product.querySelector('.productName').textContent;
  let productPrice = Number(product.querySelector('.productPrice').textContent.replace('$', ''));
  id = id + 1;

  // Add to cart button click
  cartButton.addEventListener('click', () => {
    if (quantity > 0) {
      // Check if product already exists in cart
      const existingProduct = cartArray.find(item => item.id === id);

      // with current date
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      if (existingProduct) {
        existingProduct.units += quantity;
        existingProduct.total += quantity * productPrice;

        leftQuantity -= quantity;
        availableQuantity.textContent = leftQuantity >= 0 ? leftQuantity : 0;
      } else {
        // new cart item
        const newItem = {
          id,
          name: productName,
          image: productImage,
          units: quantity,
          price: productPrice,
          total: quantity * productPrice,
          date: formattedDate
        };
        cartArray.push(newItem);
        cartValue.textContent = cartArray.length;
      }

      // Update local storage
      localStorage.setItem('cart', JSON.stringify(cartArray));

      // Reset quantity
      quantity = 0;
      inputQuantity.textContent = 0;
    } else {
      if(quantity === 0 && leftQuantity !== 0) {
        alert("Please add items to your cart first!");
        cartValue.textContent = cartArray.length;
      }
      else if(leftQuantity === 0) {
        alert('Sorry! No more available.');
      }
    }
  });
});

cartValue.textContent = cartArray.length;
console.log(cartArray);
});
