// DOM Elements
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const backToTopBtn = document.getElementById("backToTop");
const appointmentForm = document.getElementById("appointmentForm");
const reviewSlides = document.querySelectorAll(".review-slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Mobile Menu Toggle
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.innerHTML = navMenu.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Back to Top Button
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Active navigation link on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Reviews Slider
let currentSlide = 0;

function showSlide(index) {
  // Hide all slides
  reviewSlides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Remove active class from all dots
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Show the current slide
  reviewSlides[index].classList.add("active");
  dots[index].classList.add("active");
  currentSlide = index;
}

// Next slide
nextBtn.addEventListener("click", () => {
  let nextIndex = currentSlide + 1;
  if (nextIndex >= reviewSlides.length) {
    nextIndex = 0;
  }
  showSlide(nextIndex);
});

// Previous slide
prevBtn.addEventListener("click", () => {
  let prevIndex = currentSlide - 1;
  if (prevIndex < 0) {
    prevIndex = reviewSlides.length - 1;
  }
  showSlide(prevIndex);
});

// Dot click events
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});

// Auto slide every 5 seconds
setInterval(() => {
  let nextIndex = currentSlide + 1;
  if (nextIndex >= reviewSlides.length) {
    nextIndex = 0;
  }
  showSlide(nextIndex);
}, 5000);

// Appointment Form Submission
appointmentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    petType: document.getElementById("petType").value,
    service: document.getElementById("service").value,
    date: document.getElementById("date").value,
  };

  // Basic validation
  if (
    !formData.name ||
    !formData.email ||
    !formData.phone ||
    !formData.petType ||
    !formData.service ||
    !formData.date
  ) {
    alert("Please fill in all fields");
    return;
  }

  // In a real application, you would send this data to a server
  // For demo purposes, we'll just show a success message
  alert(
    `Appointment request submitted successfully!\n\nWe will contact you at ${formData.phone} to confirm your appointment for ${formData.date}.`
  );

  // Reset form
  appointmentForm.reset();
});

// Set minimum date for appointment to today
const dateInput = document.getElementById("date");
const today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);

// Newsletter form submission
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    if (emailInput.value) {
      alert("Thank you for subscribing to our newsletter!");
      emailInput.value = "";
    }
  });
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer (if needed)
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Initialize first slide
  showSlide(0);
});
