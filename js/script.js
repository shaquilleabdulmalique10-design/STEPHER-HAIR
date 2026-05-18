// Preloader - Only on index.html (home page)
window.addEventListener("load", function () {
  const preloader = document.querySelector('.preloader');
  
  if (preloader) {
    // Show preloader for 5 seconds on home page
    setTimeout(function() {
      preloader.classList.add('fade-out');
      setTimeout(function() {
        preloader.style.display = 'none';
      }, 500);
    }, 5000);
  }
});

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// Modern Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".modern-navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});

// Mobile menu toggle (Legacy support)
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      navMenu &&
      hamburger &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navMenu.classList.remove("active");
    }
  });
}

// Counter animation
const counters = document.querySelectorAll(".stat-number");

const animateCounters = () => {
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
};

// Trigger counter when in viewport
const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const statsSection = document.querySelector(".stats");
if (statsSection) {
  observer.observe(statsSection);
}

// Portfolio filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-card");

if (filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      // Filter items
      portfolioItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
          item.style.animation = "fadeInUp 0.5s ease";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// Lightbox functionality
function openLightbox(element) {
  const imgSrc = element.closest(".portfolio-card").querySelector("img").src;
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="${imgSrc}" alt="Portfolio Image">
        </div>
    `;
  document.body.appendChild(lightbox);

  lightbox.style.display = "flex";
  lightbox.style.position = "fixed";
  lightbox.style.top = "0";
  lightbox.style.left = "0";
  lightbox.style.width = "100%";
  lightbox.style.height = "100%";
  lightbox.style.backgroundColor = "rgba(0,0,0,0.95)";
  lightbox.style.zIndex = "2000";
  lightbox.style.alignItems = "center";
  lightbox.style.justifyContent = "center";

  lightbox.querySelector(".close-lightbox").addEventListener("click", () => {
    lightbox.remove();
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.remove();
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Page load animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Custom Toast Notification System
function showToast(message, type = 'success') {
  // Remove any existing toasts
  const existingToast = document.querySelector('.custom-toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `custom-toast ${type}`;
  
  // Icon based on type
  let icon = '';
  if (type === 'success') {
    icon = '<i class="fas fa-check-circle"></i>';
  } else if (type === 'error') {
    icon = '<i class="fas fa-exclamation-circle"></i>';
  } else if (type === 'info') {
    icon = '<i class="fas fa-info-circle"></i>';
  }
  
  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);
}

// Form submissions
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Thank you for your booking! We will contact you shortly to confirm your appointment.", "success");
    bookingForm.reset();
  });
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Thank you for your message! We will get back to you soon.", "success");
    contactForm.reset();
  });
}

// Close mobile menu when clicking outside (moved to legacy support above)

// Scroll to top button
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

