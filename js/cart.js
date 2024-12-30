
document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const totalPrice = document.querySelector('.total-price');
  const checkoutBtn = document.querySelector('.checkout');

  let cartValue = document.querySelector('.cart-value');
  const tableBody = document.querySelector('.table-body');

  if (cartValue) {
    cartValue.textContent = cart.length;
  }

  // if cart is empty
  if(cart.length === 0) {
    tableBody.innerHTML = `<tr>
        <td colspan="6" class="text-center fs-5">Your cart is empty.</td>
      </tr> `
      return;
  }

  tableBody.innerHTML = cart
    .map(
      (item) => `
      <tr>
        <td>${item.name}</td>
        <td>
          <img src="${item.image}" alt="${item.name}" class="img-fluid" style="max-height: 80px;">
        </td>
        <td>${item.units}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${item.total.toFixed(2)}</td>
        <td>
          <button class="btn btn-danger btn-sm remove-button" data-id="${item.id}">Remove</button>
        </td>
      </tr>`
    )
    .join('');

    document.querySelectorAll('.remove-button').forEach((button) => {
      button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id);

        const newCart = cart.filter((item) => item.id !== productId);

        localStorage.setItem('cart', JSON.stringify(newCart));
        location.reload();
      })
    })

    let total = 0; 
    cart.forEach((item) => {
      total += item.total;
    });

    totalPrice.textContent = total;

    checkoutBtn.addEventListener('click', () => {
      if(total > 0) {
        window.location.href = 'order.html';
      }
    })
});

