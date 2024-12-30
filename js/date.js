document.addEventListener('DOMContentLoaded', () => {
  // Set the current date
  const orderDateElement = document.getElementById('order-date');
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  orderDateElement.textContent = `Order Date: ${formattedDate}`;
});

function redirectToOrders() {
  window.location.href = 'viewOrders.html'; 
}

function logOut() {
  window.location.href = 'index.html'
  alert('You have logged out successfully!');
};
