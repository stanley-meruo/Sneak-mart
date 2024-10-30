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



// Function to render cart items
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<div class="text-center grid py-4">
        <i class="fi fi-rr-shopping-bag bg-gray-100 px-6 py-4 mb-4 rounded-full mx-auto text-6xl lg:text-8xl"></i>
        <p class="">Your cart is empty!</p>
        <p class="text-sm my-6">Browse on our catalogs and discover our best deals!</p>
        <button id="shopping" class=" bg-blue-500 px-4 py-2 rounded shadow-md text-white">CONTINUE SHOPPING</button>
      </div>`;
    cartTotalElement.textContent = "";

    // Add event listener for the "Continue Shopping" button
    document.getElementById("shopping").addEventListener("click", () => {
      // Navigate to product page
      window.location.href = "./catalog.html"; // Replace with your desired path
    });
    return;
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (item, index) => `
    <div class="border p-3 rounded shadow-md flex items-center justify-between gap-6 mb-5 xs:h-60 xs:px-5 sm:px-8 md:h-72 lg:px-6 xl:gap-8">
      <div class="grid gap-6 sm:gap-4 md:gap-6">
        <img src="${item.image}" alt="${
        item.model
      }" class="w-36 h-20 m-auto xs:min-w-40 xs:min-h-28 sm:min-w-48 sm:min-h-32 md:max-w-56 md:max-h-40 lg:max-h-48 lg:max-w-32 ">
        <button class="remove text-red-500 text-sm m-auto" data-index="${index}">Remove</button>
      </div>
      <div class="grid xs:gap-2 sm:gap-4 lg:gap-2 xl:gap-3">
        <h3 class="text-sm md:text-base">${item.model}</h3>
        <p class="text-sm text-gray-500 md:text-base">${item.brand} | ${
        item.category
      }</p>
        <p class="text-lg font-bold text-blue-950 md:text-xl">$${item.price}</p>
        
        <div class="flex items-center gap-4 mt-2 xs:mt-4 sm:gap-8">
          <i class="fi fi-rr-minus-small decrement bg-blue-500 text-white text-2xl pt-1 px-1 rounded ${item.quantity === 1 ? "bg-opacity-50 cursor-not-allowed" : ""}" data-index="${index}" ${item.quantity === 1 ? "disabled" : ""}"></i>
          <span class="mx-4">${item.quantity}</span>
          <i class="fi fi-rr-plus-small increment bg-blue-500 text-white text-2xl pt-1 px-1 rounded" data-index="${index}"></i>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  cartTotalElement.className =`font-bold text-white bg-blue-500 p-4 w-full text-center rounded shadow-md md:p-5`;
  cartTotalElement.textContent = `CHECKOUT : $${totalPrice.toFixed(2)}`;
  
  

  // Add event listeners for increment, decrement, and remove buttons
  document.querySelectorAll(".increment").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      incrementQuantity(index);
    });
  });

  document.querySelectorAll(".decrement").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      decrementQuantity(index);
    });
  });

  document.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      removeItem(index);
    });
  });
}

// Function to increment quantity
function incrementQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += 1;
  saveCartToLocalStorage(cart);
  renderCartItems();
}

// Function to decrement quantity
function decrementQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index].quantity > 1) {
    cart[index].quantity--;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems(); // Re-render cart items
  } else {
    // Optionally, you can display a message or disable the button
    console.log("Quantity cannot be less than 1.");
  }

  saveCartToLocalStorage(cart);
  renderCartItems();
}

// Function to remove item from cart
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Remove item by index
  saveCartToLocalStorage(cart);
  renderCartItems();
}

// Function to save the cart back to localStorage
function saveCartToLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load and render cart items when the cart page loads
document.addEventListener("DOMContentLoaded", renderCartItems);

// Cart page
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Remove item by index
  saveCartToLocalStorage(cart);
  renderCartItems();

  // Show notification when an item is removed
  showNotification("Item has been removed from the cart.");
}

// Function to show notifications
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;

  // Change background color
  if (type === "success") {
    notification.classList.add("bg-green-500");
  } else if (type === "error") {
    notification.classList.add("bg-red-500");
  }

  // Show notification with fade-in and slide-up effect
  notification.classList.remove("hidden", "opacity-0", "translate-y-5");
  notification.classList.add("opacity-100", "translate-y-0");

  // Hide after 3 seconds with fade-out and slide-down effect
  setTimeout(() => {
    notification.classList.remove("opacity-100", "translate-y-0");
    notification.classList.add("opacity-0", "translate-y-5");

    // After the transition, hide the element again
    setTimeout(() => {
      notification.classList.add("hidden");
    }, 300); // Time to match the transition duration
  }, 3000); // Notification stays visible for 3 seconds
}
