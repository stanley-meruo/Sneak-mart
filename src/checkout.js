// Animation on scroll
AOS.init({
  easing: "ease-out-back",
  duration: 1000,
});

// Toggle mobile menu when the hamburger icon is clicked
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeBtn = document.getElementById("close-btn");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  if (!mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.add("opacity-100");
    mobileMenu.classList.remove("opacity-0");
  } else {
    mobileMenu.classList.add("opacity-0");
    mobileMenu.classList.remove("opacity-100");
  }
  // Close mobile menu when the close icon is clicked
  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Display the submenu link on the Mobile menu
const dropdownButton = document.querySelector(".m-link");
const dropdownMenu = document.querySelector(".m-submenu");
const icon = document.querySelector("#icon");

dropdownButton.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
  icon.classList.toggle("rotate-180");
});

// Change navbar background on scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("bg-blue-300", "shadow-lg");
    navbar.classList.remove("bg-transparent");
  } else {
    navbar.classList.add("bg-transparent");
    navbar.classList.remove("bg-blue-300", "shadow-lg");
  }
});

// Scroll back to top Button
const scrollBtn = document.getElementById("scrollBtn");
// Show the button when the user scrolls down
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    // Adjust the scroll position threshold as needed
    scrollBtn.classList.remove("hidden");
  } else {
    scrollBtn.classList.add("hidden");
  }
});
// Scroll to the top when the button is clicked
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});



// Load and render cart items in checkout summary
function renderCartSummary() {
  const cartSummaryContainer = document.getElementById("cart-items-summary");
  const cartTotalSummary = document.getElementById("cart-total-summary");
  const completeCheckoutButton = document.getElementById("complete-checkout");

  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
  } catch (error) {
    console.error("Error parsing cart data:", error);
    localStorage.removeItem("cart"); // Clear invalid data
  }

  if (cart.length === 0) {
    cartSummaryContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalSummary.textContent = "";
    completeCheckoutButton.disabled = true;
    return;
  }

  completeCheckoutButton.disabled = false;
  cartSummaryContainer.innerHTML = cart
    .map(
      (item) => `
      <div class="flex justify-between gap-2 mb-2">
        <div class="flex flex-row text-sm xs:gap-2 md:gap-4">
          <span>${item.model}</span>
          <span class="text-green-500">(${item.quantity})</span>
        </div>
        <span class="text-darkBlue">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>`
    )
    .join("");

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  cartTotalSummary.className = `font-bold text-lg p-4 w-full text-center md:p-5`;
  cartTotalSummary.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Show confirmation overlay
function showConfirmationOverlay() {
  const overlay = document.getElementById("confirmation-overlay");
  overlay.classList.remove("hidden");
  overlay.innerHTML = `
    <div class="bg-white p-6 rounded shadow-md text-center">
      <h2 class="text-2xl font-bold mb-2">Order Confirmed!</h2>
      <p class="mb-4">Thank you for your purchase.</p>
      <button id="close-overlay" class="mt-4 px-4 py-2 bg-green-500 text-white rounded">Close</button>
    </div>
  `;

  // Close overlay event
  document.getElementById("close-overlay").addEventListener("click", () => {
    overlay.classList.add("hidden");
    window.location.href = "./index.html"; // Redirect to Home page
  });
}

// Handle form submission and validate fields
document.getElementById("complete-checkout").addEventListener("click", (e) => {
  e.preventDefault();

  const deliveryForm = document.getElementById("delivery-form");
  const paymentForm = document.getElementById("payment-form");
  const errorMessage = document.getElementById("error-message");

  // Clear previous error message
  errorMessage.textContent = "";

  // Validate forms
  if (!deliveryForm.checkValidity() || !paymentForm.checkValidity()) {
    errorMessage.textContent = "Please fill out all required fields.";
    return;
  }

  // Mocking checkout success and clear cart
  localStorage.removeItem("cart");
  showConfirmationOverlay(); // Show confirmation overlay
});

// Load summary when page loads
document.addEventListener("DOMContentLoaded", renderCartSummary);
