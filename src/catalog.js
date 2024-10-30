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


// Initialize empty cart array
let cart = [];

// Function to show notifications
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;

  // Change background color
  if (type === "success") {
    notification.classList.add("bg-green-500");
  } else {
    notification.classList.remove("bg-green-500");
  }

  // Show notification with fade-in and slide-up effect
  notification.classList.remove("hidden", "opacity-0", "translate-y-5");
  notification.classList.add("opacity-100", "translate-y-0");

  // Hide notification after 2 seconds
  setTimeout(() => {
    notification.classList.remove("opacity-100", "translate-y-0");
    notification.classList.add("opacity-0", "translate-y-5");

    // After the transition, hide the element again
    setTimeout(() => {
      notification.classList.add("hidden");
    }, 300); // Time matches transition duration
  }, 3000); // Notification stays visible for 3 seconds
}

// Function to render sneakers
function renderSneakers(filteredSneakers, data) {
  const sneakerList = document.getElementById("sneaker-list");
  sneakerList.innerHTML = ""; // Clear current sneakers

  filteredSneakers.forEach((sneaker, index) => {
    const sneakerCard = `
      <div data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000" class="p-3 rounded-lg border shadow-md text-sm sm:px-5 xl:px-8">
        <div class="grid">
          <img src="${sneaker.image}" alt="${sneaker.model}" class="w-full min-h-24 max-h-28 mx-auto xs:w-36 sm:w-44 sm:max-h-72">
        </div>
        <h3 class="font-medium mt-4 ">${sneaker.model}</h3>
        <p class=" text-gray-500"> ${sneaker.category}</p>
        <p class="text-lg font-bold text-darkBlue">$${sneaker.price}</p>
        <p class="">${sneaker.rating}</p>
        <button class="add-to-cart bg-blue-500 text-white text-xs w-full px-4 py-3 rounded shadow-md mt-4 hover:text-darkBlue hover:bg-gray-200" data-index="${index}">ADD TO CART</button>
      </div>
    `;
    sneakerList.innerHTML += sneakerCard;
  });

  // Add event listeners to each "Add to Cart" button
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      addToCart(index, data); // Ensure `data` is passed here
    });
  });
}

// Fetch sneakers data from JSON file and render them
fetch("sneakers.json")
  .then((response) => response.json())
  .then((data) => {
    renderSneakers(data, data); // Pass `data` to renderSneakers

    // Handle button clicks for filtering and setting active class
    document.querySelectorAll(".filter-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const filter = e.target.getAttribute("data-filter");

        // Remove active class from all buttons
        document
          .querySelectorAll(".filter-btn")
          .forEach((btn) => btn.classList.remove("active"));

        // Add active class to the clicked button
        e.target.classList.add("active");

        if (filter === "All") {
          // Show all sneakers if 'All' is clicked
          renderSneakers(data, data);
        } else {
          // Filter sneakers by brand
          const filteredSneakers = data.filter(
            (sneaker) => sneaker.brand === filter
          );
          renderSneakers(filteredSneakers, data);
        }
      });
    });
  })
  .catch((error) => console.error("Error fetching sneakers data:", error));

// Function to add items to the cart
function addToCart(index, sneakersData) {
  const selectedSneaker = sneakersData[index];

  // Check if item already exists in the cart
  const existingItem = cart.find(
    (item) => item.model === selectedSneaker.model
  );

  if (existingItem) {
    existingItem.quantity += 1; // Increment quantity if already in the cart
  } else {
    cart.push({ ...selectedSneaker, quantity: 1 }); // Add new item to cart
  }

  updateCartCount();
  saveCartToLocalStorage();

  // Show notification when an item is added to the cart
  showNotification("Cart Updated Successfully !✅");
}

// Function to update the cart count in the icon
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (totalItems > 0) {
    cartCount.textContent = totalItems;
    cartCount.classList.remove("hidden");
  } else {
    cartCount.classList.add("hidden");
  }
}

// Save the cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load the cart from localStorage
function loadCartFromLocalStorage() {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  if (Array.isArray(storedCart)) {
    cart = storedCart;
  } else {
    cart = [];
  }
  updateCartCount();
}

// Load cart when the page loads
loadCartFromLocalStorage();
