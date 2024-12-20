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
const icon = document.querySelector("#icon")

dropdownButton.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
  icon.classList.toggle("rotate-180")
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


// Carousel
const imageColors = {
  0: "bg-sky-500",
  1: "bg-green-500",
  2: "bg-blue-500",
  3: "bg-red-500",
  4: "bg-stone-500",
};
const carousel = document.querySelector(".carousel-images");
const images = document.querySelectorAll(".carousel-images img");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const indicators = document.querySelectorAll("#indicators img");

let currentIndex = 0;
let autoplayInterval;

// Function to show image and update indicator
function showImage(index) {
  const offset = -index * 100;
  carousel.style.transform = `translateX(${offset}%)`;
  updateIndicators(index);
}
// Update the active indicator
function updateIndicators(index) {
  indicators.forEach((indicator, i) => {
    if (i === index) {
      indicator.classList.add(imageColors[index]);
      indicator.classList.remove("bg-white");
    } else {
      indicator.classList.remove(imageColors[index]);
      indicator.classList.add("bg-white");
    }
  });
}
// Move to the next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}
// Move to the previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}
// Autoplay the carousel
function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
}

// Stop autoplay when interacting with arrows
function stopAutoplay() {
  clearInterval(autoplayInterval);
}
// Event Listeners for Arrows
nextBtn.addEventListener("click", () => {
  stopAutoplay();
  nextSlide();
  startAutoplay(); // Restart autoplay after manual navigation
});

prevBtn.addEventListener("click", () => {
  stopAutoplay();
  prevSlide();
  startAutoplay(); // Restart autoplay after manual navigation
});
// Event Listeners for Indicators
indicators.forEach((indicator, i) => {
  indicator.addEventListener("click", () => {
    stopAutoplay();
    currentIndex = i;
    showImage(currentIndex);
    startAutoplay(); // Restart autoplay after selecting an indicator
  });
});
// Initialize carousel
showImage(currentIndex);
startAutoplay();


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