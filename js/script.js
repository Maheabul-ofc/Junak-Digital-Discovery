// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  initMobileMenu();

  // Enrollment form functionality
  initEnrollmentForm();

  // Gallery functionality
  initGallery();

  // Smooth scrolling for anchor links
  initSmoothScrolling();

  // Form validation
  initFormValidation();
});

// Mobile Menu Functionality
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";

      this.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("active");

      // Animate hamburger menu
      this.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        mobileMenuToggle.setAttribute("aria-expanded", "false");
        mobileMenuToggle.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove("active");
        mobileMenuToggle.setAttribute("aria-expanded", "false");
        mobileMenuToggle.classList.remove("active");
      }
    });
  }
}

// Enrollment Form Functionality
function initEnrollmentForm() {
  const enrollButtons = document.querySelectorAll(".enroll-btn");
  const modal = document.getElementById("enrollmentModal");
  const closeModal = document.querySelector(".close-modal");
  const courseNameField = document.getElementById("courseName");
  const form = document.getElementById("enrollmentForm");

  if (!modal) return;

  // Open modal when enroll button is clicked
  enrollButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const courseName = this.getAttribute("data-course");
      if (courseNameField) {
        courseNameField.value = courseName;
      }

      modal.style.display = "block";
      modal.setAttribute("aria-hidden", "false");

      // Focus on first input field for accessibility
      const firstInput = modal.querySelector('input[type="text"]');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal functionality
  function closeModalFunc() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";

    // Reset form
    if (form) {
      form.reset();
    }
  }

  if (closeModal) {
    closeModal.addEventListener("click", closeModalFunc);
  }

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModalFunc();
    }
  });

  // Form submission handling
  if (form) {
    form.addEventListener("submit", function (e) {
      // Show loading state
      const submitBtn = form.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Submitting...";
      submitBtn.disabled = true;

      // Formspree will handle the actual submission
      // After submission, show success message
      setTimeout(() => {
        alert("Thank you for your enrollment! We will contact you soon.");
        closeModalFunc();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }
}

// Gallery Functionality
function initGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const imageModal = document.getElementById("imageModal");
  const modalImage = document.querySelector(".modal-image");
  const modalCaption = document.querySelector(".modal-caption");
  const closeImageModal = document.querySelector(".close-image-modal");

  if (!imageModal) return;

  // Open image modal
  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector(".gallery-image");
      const caption = this.querySelector(".gallery-overlay p");

      if (img && modalImage) {
        modalImage.src = img.src;
        modalImage.alt = img.alt;

        if (caption && modalCaption) {
          modalCaption.textContent = caption.textContent;
        }

        imageModal.style.display = "block";
        imageModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
    });

    // Add keyboard support for gallery items
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });

    // Make gallery items focusable
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", "View larger image");
  });

  // Close image modal
  function closeImageModalFunc() {
    imageModal.style.display = "none";
    imageModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
  }

  if (closeImageModal) {
    closeImageModal.addEventListener("click", closeImageModalFunc);
  }

  // Close when clicking outside image
  imageModal.addEventListener("click", function (e) {
    if (e.target === imageModal) {
      closeImageModalFunc();
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && imageModal.style.display === "block") {
      closeImageModalFunc();
    }
  });
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Focus target for accessibility
        targetElement.focus();
      }
    });
  });
}

// Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input[required], textarea[required]");

    inputs.forEach((input) => {
      // Real-time validation
      input.addEventListener("blur", function () {
        validateField(this);
      });

      input.addEventListener("input", function () {
        // Clear error state when user starts typing
        this.classList.remove("error");
        const errorMsg = this.parentNode.querySelector(".error-message");
        if (errorMsg) {
          errorMsg.remove();
        }
      });
    });

    form.addEventListener("submit", function (e) {
      let isValid = true;

      inputs.forEach((input) => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        e.preventDefault();
        // Focus first invalid field
        const firstError = form.querySelector(".error");
        if (firstError) {
          firstError.focus();
        }
      }
    });
  });
}

// Field Validation Helper
function validateField(field) {
  const value = field.value.trim();
  const fieldType = field.type;
  let isValid = true;
  let errorMessage = "";

  // Remove existing error
  field.classList.remove("error");
  const existingError = field.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Required field validation
  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "This field is required.";
  }
  // Email validation
  else if (fieldType === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = "Please enter a valid email address.";
    }
  }
  // Phone validation
  else if (fieldType === "tel" && value) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(value)) {
      isValid = false;
      errorMessage = "Please enter a valid phone number.";
    }
  }

  // Show error if validation failed
  if (!isValid) {
    field.classList.add("error");
    const errorElement = document.createElement("span");
    errorElement.className = "error-message";
    errorElement.textContent = errorMessage;
    errorElement.style.color = "#E25C5B";
    errorElement.style.fontSize = "0.9rem";
    errorElement.style.display = "block";
    errorElement.style.marginTop = "5px";
    field.parentNode.appendChild(errorElement);
  }

  return isValid;
}

// Intersection Observer for Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".feature-card, .course-card, .faculty-card, .mv-card, .gallery-item"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });
}

// Initialize scroll animations after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initScrollAnimations();
});

// Utility Functions

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Back to top functionality
function initBackToTop() {
  const backToTopButton = document.createElement("button");
  backToTopButton.innerHTML = "↑";
  backToTopButton.className = "back-to-top";
  backToTopButton.setAttribute("aria-label", "Back to top");
  backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: 2px solid white;   /* 🔹 Added border */
        border-radius: 50%;
        background: var(--primary-green);
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

  document.body.appendChild(backToTopButton);

  // Show/hide button based on scroll position
  const toggleBackToTop = throttle(() => {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  }, 100);

  window.addEventListener("scroll", toggleBackToTop);

  // Scroll to top when clicked
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Initialize back to top button
document.addEventListener("DOMContentLoaded", initBackToTop);
//new features.................................................................

// Add these functions to your existing script.js file

// Demo Class Modal Functionality
function initDemoModal() {
  const demoButtons = document.querySelectorAll(".demo-button");
  const demoModal = document.getElementById("demoModal");
  const closeDemoModal = demoModal?.querySelector(".close-modal");
  const demoForm = document.getElementById("demoForm");

  if (!demoModal) return;

  // Open modal when demo button is clicked
  demoButtons.forEach((button) => {
    button.addEventListener("click", function () {
      demoModal.style.display = "block";
      demoModal.setAttribute("aria-hidden", "false");

      // Focus on first input field
      const firstInput = demoModal.querySelector('input[type="text"]');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal functionality
  function closeDemoModalFunc() {
    demoModal.style.display = "none";
    demoModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";

    // Reset form
    if (demoForm) {
      demoForm.reset();
    }
  }

  if (closeDemoModal) {
    closeDemoModal.addEventListener("click", closeDemoModalFunc);
  }

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === demoModal) {
      closeDemoModalFunc();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && demoModal.style.display === "block") {
      closeDemoModalFunc();
    }
  });

  // Form submission handling
  if (demoForm) {
    demoForm.addEventListener("submit", function (e) {
      const submitBtn = demoForm.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Booking...";
      submitBtn.disabled = true;

      // After submission, show success message
      setTimeout(() => {
        alert(
          "Thank you! We will contact you soon to schedule your free demo class."
        );
        closeDemoModalFunc();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }
}

// Testimonials Slider Functionality
function initTestimonialSlider() {
  const testimonialItems = document.querySelectorAll(".testimonial-item");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;

  if (testimonialItems.length === 0) return;

  // Show specific slide
  function showSlide(index) {
    testimonialItems.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialItems.length;
    showSlide(currentSlide);
  }

  // Dot click functionality
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto-advance slides
  setInterval(nextSlide, 5000); // Change slide every 5 seconds

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && currentSlide > 0) {
      currentSlide--;
      showSlide(currentSlide);
    } else if (
      e.key === "ArrowRight" &&
      currentSlide < testimonialItems.length - 1
    ) {
      currentSlide++;
      showSlide(currentSlide);
    }
  });
}

// Free Counselling Popup Functionality
function initCounsellingPopup() {
  const popup = document.getElementById("counsellingPopup");
  const closePopup = popup?.querySelector(".close-popup");

  if (!popup) return;

  // Show popup after 10 seconds
  setTimeout(() => {
    popup.style.display = "block";
  }, 10000);

  // Close popup
  if (closePopup) {
    closePopup.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  // Auto-hide popup after 30 seconds if not interacted
  setTimeout(() => {
    if (popup.style.display !== "none") {
      popup.style.display = "none";
    }
  }, 40000);

  // Show popup again after 5 minutes if closed
  closePopup?.addEventListener("click", () => {
    setTimeout(() => {
      popup.style.display = "block";
    }, 300000); // 5 minutes
  });
}

// Initialize new functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Existing functions
  initMobileMenu();
  initEnrollmentForm();
  initGallery();
  initSmoothScrolling();
  initFormValidation();
  initBackToTop();

  // New functions
  initDemoModal();
  initTestimonialSlider();
  initCounsellingPopup();
});
// Course Header Slideshow Functionality
function initCourseHeaderSlideshow() {
  const slideItems = document.querySelectorAll(".slide-item");
  const slideItemsMobile = document.querySelectorAll(".slide-item-mobile");
  const indicators = document.querySelectorAll(".slide-indicators .indicator");
  const slideshow = document.querySelector(".header-slideshow");

  if (slideItems.length === 0 && slideItemsMobile.length === 0) return;

  let currentSlide = 0;
  let slideInterval;
  let isTransitioning = false;

  // Determine which set of slides to use based on screen size
  function getCurrentSlideItems() {
    return window.innerWidth <= 768 ? slideItemsMobile : slideItems;
  }

  // Set background images from data attributes
  function setBackgroundImages() {
    slideItems.forEach((slide) => {
      const bgImage = slide.getAttribute("data-bg");
      if (bgImage) {
        slide.style.backgroundImage = `url(${bgImage})`;
      }
    });

    slideItemsMobile.forEach((slide) => {
      const bgImage = slide.getAttribute("data-bg");
      if (bgImage) {
        slide.style.backgroundImage = `url(${bgImage})`;
      }
    });
  }

  // Preload images for better performance
  function preloadImages() {
    const allSlides = [...slideItems, ...slideItemsMobile];
    allSlides.forEach((slide) => {
      const bgImage = slide.getAttribute("data-bg");
      if (bgImage) {
        const img = new Image();
        img.onload = () => {
          slide.classList.add("loaded");
        };
        img.onerror = () => {
          console.warn(`Failed to load image: ${bgImage}`);
          // Fallback to gradient background
          slide.style.background =
            "linear-gradient(135deg, var(--primary-green), var(--coral-red))";
        };
        img.src = bgImage;
      }
    });
  }

  // Show specific slide
  function showSlide(index, slides = null) {
    if (isTransitioning) return;

    const currentSlides = slides || getCurrentSlideItems();
    if (currentSlides.length === 0) return;

    isTransitioning = true;

    // Remove active class from all slides and indicators
    currentSlides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    // Add loading animation
    if (currentSlides[index]) {
      currentSlides[index].classList.add("loading");
    }

    // Smooth transition
    setTimeout(() => {
      // Add active class to current slide and indicator
      if (currentSlides[index]) {
        currentSlides[index].classList.add("active");
        currentSlides[index].classList.remove("loading");
      }

      if (indicators[index]) {
        indicators[index].classList.add("active");
      }

      isTransitioning = false;
    }, 100);
  }

  // Next slide function
  function nextSlide() {
    const currentSlides = getCurrentSlideItems();
    currentSlide = (currentSlide + 1) % currentSlides.length;
    showSlide(currentSlide, currentSlides);
  }

  // Start automatic slideshow
  function startSlideshow() {
    stopSlideshow(); // Clear any existing interval
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  // Stop automatic slideshow
  function stopSlideshow() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Handle indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      if (isTransitioning) return;

      currentSlide = index;
      const currentSlides = getCurrentSlideItems();
      showSlide(currentSlide, currentSlides);

      // Restart slideshow timer
      startSlideshow();
    });

    // Keyboard support
    indicator.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        indicator.click();
      }
    });
  });

  // Handle window resize
  function handleResize() {
    const currentSlides = getCurrentSlideItems();
    showSlide(currentSlide, currentSlides);
  }

  // Throttled resize handler
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 250);
  });

  // Pause slideshow when page is not visible (performance optimization)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  });

  // Pause slideshow on hover (user experience)
  if (slideshow) {
    slideshow.addEventListener("mouseenter", stopSlideshow);
    slideshow.addEventListener("mouseleave", startSlideshow);

    // Touch events for mobile
    slideshow.addEventListener("touchstart", stopSlideshow);
    slideshow.addEventListener("touchend", () => {
      setTimeout(startSlideshow, 2000); // Resume after 2 seconds
    });
  }

  // Initialize
  setBackgroundImages();
  preloadImages();

  // Show first slide
  setTimeout(() => {
    const currentSlides = getCurrentSlideItems();
    showSlide(0, currentSlides);
    startSlideshow();
  }, 100);

  // Handle reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    stopSlideshow();
  }
}

// Add to your existing DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
  // Existing functions
  initMobileMenu();
  initEnrollmentForm();
  initGallery();
  initSmoothScrolling();
  initFormValidation();
  initBackToTop();

  // Add the new slideshow function
  initCourseHeaderSlideshow();
});
// Auto-hide Navbar on Scroll
function initAutoHideNavbar() {
  let lastScrollTop = 0;
  const navbar = document.querySelector(".header");
  const featuredSection = document.querySelector(".featured-courses");

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.classList.add("hidden");
      if (featuredSection) {
        featuredSection.classList.add("navbar-hidden");
      }
    } else {
      // Scrolling up
      navbar.classList.remove("hidden");
      if (featuredSection) {
        featuredSection.classList.remove("navbar-hidden");
      }
    }

    lastScrollTop = scrollTop;
  });
}

// Floating Demo Button Functionality
function initFloatingDemoButton() {
  const floatingBtn = document.getElementById("floatingDemoBtn");
  const demoModal = document.getElementById("demoModal");

  if (!floatingBtn || !demoModal) return;

  floatingBtn.addEventListener("click", function () {
    demoModal.style.display = "block";
    demoModal.setAttribute("aria-hidden", "false");

    // Focus on first input field
    const firstInput = demoModal.querySelector('input[type="text"]');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  });
}

// Enhanced Counselling Popup with Timing Control
function initEnhancedCounsellingPopup() {
  const popup = document.getElementById("counsellingPopup");
  const closePopup = popup?.querySelector(".close-popup");

  if (!popup) return;

  let showInterval;
  let isUserClosed = false;

  function showPopup() {
    if (!isUserClosed) {
      popup.style.display = "block";

      // Auto-hide after 8 seconds if not interacted
      setTimeout(() => {
        if (popup.style.display === "block" && !isUserClosed) {
          popup.style.display = "none";
        }
      }, 8000);
    }
  }

  function hidePopup() {
    popup.style.display = "none";
  }

  // Show popup every 10 seconds initially, then every 20 seconds
  function startPopupCycle() {
    // First show after 15 seconds
    setTimeout(showPopup, 15000);

    // Then show every 25 seconds
    showInterval = setInterval(showPopup, 25000);
  }

  // Close popup functionality
  if (closePopup) {
    closePopup.addEventListener("click", () => {
      hidePopup();
      isUserClosed = true;

      // Allow popup to show again after 2 minutes
      setTimeout(() => {
        isUserClosed = false;
      }, 120000);
    });
  }

  // Pause when WhatsApp button is clicked
  const whatsappBtn = popup.querySelector(".popup-btn");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      hidePopup();
      clearInterval(showInterval);
    });
  }

  // Start the popup cycle
  startPopupCycle();

  // Pause popup when page is not visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(showInterval);
    } else if (!isUserClosed) {
      startPopupCycle();
    }
  });
}

// Enhanced Mobile Image Handling
function initResponsiveImages() {
  const desktopBg = document.querySelector(".hero-bg-img.desktop-bg");
  const mobileBg = document.querySelector(".hero-bg-img.mobile-bg");

  function handleImageVisibility() {
    const isMobile = window.innerWidth <= 768;

    if (desktopBg && mobileBg) {
      if (isMobile) {
        desktopBg.style.display = "none";
        mobileBg.style.display = "block";
      } else {
        desktopBg.style.display = "block";
        mobileBg.style.display = "none";
      }
    }
  }

  // Initial check
  handleImageVisibility();

  // Handle resize
  window.addEventListener("resize", debounce(handleImageVisibility, 250));
}

// Smooth scroll with navbar adjustment
function initSmoothScrollWithNavbar() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const navbar = document.querySelector(".navbar");
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const offsetTop = targetElement.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Performance optimization for animations
function initPerformanceOptimizations() {
  // Reduce motion for users who prefer it
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Disable blinking animations
    const style = document.createElement("style");
    style.textContent = `
            .floating-demo-btn { animation: none !important; }
            .counselling-popup { animation: none !important; }
            * { transition-duration: 0.1s !important; }
        `;
    document.head.appendChild(style);
  }

  // Pause animations when tab is not visible
  document.addEventListener("visibilitychange", () => {
    const body = document.body;
    if (document.hidden) {
      body.classList.add("animations-paused");
    } else {
      body.classList.remove("animations-paused");
    }
  });
}

// Update your main DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
  // Existing functions
  initMobileMenu();
  initEnrollmentForm();
  initGallery();
  initSmoothScrolling();
  initFormValidation();
  initBackToTop();
  initDemoModal();
  initTestimonialSlider();

  // New enhanced functions
  initAutoHideNavbar();
  initFloatingDemoButton();
  initEnhancedCounsellingPopup();
  initResponsiveImages();
  initSmoothScrollWithNavbar();
  initPerformanceOptimizations();
});

// Additional CSS for animations paused state
const additionalStyles = `
.animations-paused * {
    animation-play-state: paused !important;
}
`;

// Add the styles to head
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Code by Mahea
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide-item");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let current = 0;
  let autoSlide;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.backgroundImage = `url(${slide.dataset.bg})`;
      slide.classList.toggle("active", i === index);
      indicators[i]?.classList.toggle("active", i === index);
    });
    current = index;
  }

  function nextSlide() {
    let newIndex = (current + 1) % slides.length;
    showSlide(newIndex);
  }

  function prevSlide() {
    let newIndex = (current - 1 + slides.length) % slides.length;
    showSlide(newIndex);
  }

  // Auto slide every 5s
  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  // Button events
  nextBtn.addEventListener("click", () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
  });
  prevBtn.addEventListener("click", () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  // Indicator click
  indicators.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      stopAutoSlide();
      startAutoSlide();
    });
  });

  // Init
  showSlide(current);
  startAutoSlide();
});

// Topic
// Course data for different courses
const courseData = {
  "Digital Marketing": {
    title: "Digital Marketing Courses",
    tiers: [
      {
        title: "Basic Digital Marketing",
        duration: "(1 Month)",
        price: "Rs.1500",
        modules: [
          "SEO Fundamentals",
          "Social Media Marketing",
          "Google Ads Basics",
        ],
      },
      {
        title: "Advanced Digital Marketing",
        duration: "(2 Months)",
        price: "Rs.2500",
        modules: [
          "Advanced SEO",
          "PPC Campaigns",
          "Analytics & Reporting",
          "Content Strategy",
        ],
      },
      {
        title: "Digital Marketing Mastery",
        duration: "(3 Months)",
        price: "Rs.3500",
        modules: [
          "Marketing Automation",
          "Conversion Optimization",
          "Email Marketing",
          "Brand Strategy",
          "ROI Analysis",
        ],
      },
    ],
  },
  "Artificial Intelligence": {
    title: "Artificial Intelligence Courses",
    tiers: [
      {
        title: "AI Fundamentals",
        duration: "(2 Months)",
        price: "Rs.2000",
        modules: [
          "Introduction to AI",
          "Machine Learning Basics",
          "Python Programming",
          "Data Analysis",
        ],
      },
      {
        title: "Advanced AI & ML",
        duration: "(4 Months)",
        price: "Rs.4000",
        modules: [
          "Deep Learning",
          "Neural Networks",
          "Computer Vision",
          "Natural Language Processing",
          "AI Ethics",
        ],
      },
      {
        title: "AI Specialization",
        duration: "(6 Months)",
        price: "Rs.6000",
        modules: [
          "Advanced Deep Learning",
          "Reinforcement Learning",
          "AI Research Methods",
          "Industry Projects",
          "AI Deployment",
          "Career Guidance",
        ],
      },
    ],
  },
  "Mass Communication": {
    title: "Mass Communication Courses",
    tiers: [
      {
        title: "Basic Communication",
        duration: "(1 Month)",
        price: "Rs.1200",
        modules: [
          "Communication Theory",
          "Media Writing",
          "Public Speaking",
          "Journalism Basics",
        ],
      },
      {
        title: "Advanced Media Studies",
        duration: "(3 Months)",
        price: "Rs.2800",
        modules: [
          "Broadcast Journalism",
          "Digital Media",
          "Public Relations",
          "Media Ethics",
          "Video Production",
        ],
      },
      {
        title: "Media Professional",
        duration: "(5 Months)",
        price: "Rs.4500",
        modules: [
          "Advanced Journalism",
          "Media Management",
          "Documentary Production",
          "Media Law",
          "Crisis Communication",
          "Portfolio Development",
        ],
      },
    ],
  },
  Entrepreneurship: {
    title: "Entrepreneurship Courses",
    tiers: [
      {
        title: "Startup Basics",
        duration: "(1 Month)",
        price: "Rs.1800",
        modules: [
          "Business Idea Validation",
          "Market Research",
          "Business Plan Basics",
          "Financial Planning",
        ],
      },
      {
        title: "Business Development",
        duration: "(3 Months)",
        price: "Rs.3200",
        modules: [
          "Advanced Business Planning",
          "Funding & Investment",
          "Marketing Strategy",
          "Operations Management",
          "Legal Aspects",
        ],
      },
      {
        title: "Enterprise Leadership",
        duration: "(4 Months)",
        price: "Rs.5000",
        modules: [
          "Scaling Strategies",
          "Team Building",
          "Innovation Management",
          "Global Markets",
          "Exit Strategies",
          "Mentorship Program",
        ],
      },
    ],
  },
  "Graphic Design": {
    title: "Graphic Design Courses",
    tiers: [
      {
        title: "Basic Graphic Design",
        duration: "(1 Month)",
        price: "Rs.1600",
        modules: [
          "Design Fundamentals",
          "Color Theory",
          "Typography Basics",
          "Adobe Photoshop",
        ],
      },
      {
        title: "Advanced Graphic Design",
        duration: "(2 Months)",
        price: "Rs.2800",
        modules: [
          "Adobe Illustrator",
          "Brand Identity Design",
          "Layout & Composition",
          "Print Design",
          "Digital Graphics",
        ],
      },
      {
        title: "Professional Designer",
        duration: "(3 Months)",
        price: "Rs.4200",
        modules: [
          "Advanced Branding",
          "Motion Graphics",
          "UI/UX Basics",
          "Client Management",
          "Portfolio Development",
          "Freelancing Guide",
        ],
      },
    ],
  },
  "Web Design": {
    title: "Web Design Courses",
    tiers: [
      {
        title: "Web Design Basics",
        duration: "(1 Month)",
        price: "Rs.1700",
        modules: [
          "HTML Fundamentals",
          "CSS Basics",
          "Responsive Design",
          "Web Typography",
        ],
      },
      {
        title: "Advanced Web Design",
        duration: "(2 Months)",
        price: "Rs.3000",
        modules: [
          "JavaScript Basics",
          "Interactive Design",
          "WordPress Development",
          "SEO for Websites",
          "Performance Optimization",
        ],
      },
      {
        title: "Full-Stack Web Designer",
        duration: "(4 Months)",
        price: "Rs.5200",
        modules: [
          "Advanced JavaScript",
          "Backend Basics",
          "Database Integration",
          "E-commerce Design",
          "Professional Projects",
          "Career Support",
        ],
      },
    ],
  },
};

// Get DOM elements
const modal = document.getElementById("courseModal");
const closeBtn = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const courseTiers = document.getElementById("courseTiers");
const learnMoreBtns = document.querySelectorAll(".enroll-btn-new");

// Add event listeners to all "Learn more" buttons
learnMoreBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const courseName = btn.getAttribute("data-course");
    showCourseDetails(courseName);
  });
});

// Close modal events
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

function showCourseDetails(courseName) {
  const course = courseData[courseName];
  if (!course) return;

  modalTitle.textContent = course.title;

  // Clear existing tiers
  courseTiers.innerHTML = "";

  // Create tier cards
  course.tiers.forEach((tier) => {
    const tierCard = createTierCard(tier);
    courseTiers.appendChild(tierCard);
  });

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function createTierCard(tier) {
  const card = document.createElement("div");
  card.className = "tier-card";

  const modules = tier.modules
    .map((module) => `<div class="module-item">${module}</div>`)
    .join("");

  card.innerHTML = `
                <div class="tier-header">
                    <div class="tier-title">${tier.title}</div>
                    <div class="tier-duration">${tier.duration}</div>
                    <div class="tier-price">${tier.price}</div>
                </div>
                <div class="tier-modules">
                    ${modules}
                </div>
                <button class="tier-enroll-btn">Enroll Now</button>
            `;

  // Add enroll button functionality
  const enrollBtn = card.querySelector(".tier-enroll-btn");
  enrollBtn.addEventListener("click", () => {
    alert(`Enrollment initiated for ${tier.title}!`);
  });

  return card;
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}



function createTierCard(tier) {
  const card = document.createElement("div");
  card.className = "tier-card";

  const modules = tier.modules
    .map((module) => `<div class="module-item">${module}</div>`)
    .join("");

  card.innerHTML = `
        <div class="tier-header">
            <div class="tier-title">${tier.title}</div>
            <div class="tier-duration">${tier.duration}</div>
            <div class="tier-price">${tier.price}</div>
        </div>
        <div class="tier-modules">
            ${modules}
        </div>
        <button class="tier-enroll-btn">Enroll Now</button>
    `;

  // Use your existing form modal
  const enrollBtn = card.querySelector(".tier-enroll-btn");
  enrollBtn.addEventListener("click", () => {
    const modal = document.getElementById("enrollmentModal");
    const courseNameField = document.getElementById("courseName");

    // Set course name from tier
    if (courseNameField) {
      courseNameField.value = tier.title;
    }

    // Show modal
    if (modal) {
      modal.style.display = "block";
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      // Focus first input
      const firstInput = modal.querySelector('input[type="text"]');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  });

  return card;
}


//further code
// course image sliding

// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".slide-item");
const mobileSlides = document.querySelectorAll(".slide-item-mobile");
const indicators = document.querySelectorAll(".indicator");
const prevBtn = document.querySelector(".slide-btn.prev");
const nextBtn = document.querySelector(".slide-btn.next");
const slideshow = document.querySelector(".header-slideshow");

// Mark slideshow as loaded
setTimeout(() => {
  slideshow.classList.add("loaded");
}, 1000);

function showSlide(index) {
  // Remove active class from all slides and indicators
  slides.forEach((slide) => slide.classList.remove("active"));
  mobileSlides.forEach((slide) => slide.classList.remove("active"));
  indicators.forEach((indicator) => indicator.classList.remove("active"));

  // Add active class to current slide and indicator
  if (slides[index]) slides[index].classList.add("active");
  if (mobileSlides[index]) mobileSlides[index].classList.add("active");
  if (indicators[index]) indicators[index].classList.add("active");

  currentSlide = index;
}

function nextSlide() {
  const totalSlides = Math.max(slides.length, mobileSlides.length);
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  const totalSlides = Math.max(slides.length, mobileSlides.length);
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

// Event listeners for navigation buttons
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Event listeners for indicators
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => showSlide(index));

  // Keyboard accessibility for indicators
  indicator.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      showSlide(index);
    }
  });
});

// Auto-play slideshow
let autoPlay = setInterval(nextSlide, 5000);

// Pause auto-play on hover
slideshow.addEventListener("mouseenter", () => {
  clearInterval(autoPlay);
});

// Resume auto-play when mouse leaves
slideshow.addEventListener("mouseleave", () => {
  autoPlay = setInterval(nextSlide, 5000);
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
    clearInterval(autoPlay);
    autoPlay = setInterval(nextSlide, 5000);
  } else if (e.key === "ArrowRight") {
    nextSlide();
    clearInterval(autoPlay);
    autoPlay = setInterval(nextSlide, 5000);
  }
});

// Touch/swipe support for mobile
let startX = 0;
let endX = 0;
let startTime = 0;

slideshow.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].clientX;
    startTime = new Date().getTime();
  },
  { passive: true }
);

slideshow.addEventListener(
  "touchend",
  (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  },
  { passive: true }
);

function handleSwipe() {
  const threshold = 50;
  const timeThreshold = 300;
  const diff = startX - endX;
  const timeDiff = new Date().getTime() - startTime;

  if (Math.abs(diff) > threshold && timeDiff < timeThreshold) {
    clearInterval(autoPlay);

    if (diff > 0) {
      nextSlide(); // Swipe left - next slide
    } else {
      prevSlide(); // Swipe right - previous slide
    }

    // Resume auto-play after swipe
    autoPlay = setInterval(nextSlide, 5000);
  }
}

// Visibility API to pause slideshow when tab is not active
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearInterval(autoPlay);
  } else {
    autoPlay = setInterval(nextSlide, 5000);
  }
});

// Preload images for better performance
function preloadImages() {
  const allImages = [...slides, ...mobileSlides];
  allImages.forEach((img) => {
    const imageObj = new Image();
    imageObj.src = img.src;
  });
}

// Initialize slideshow
document.addEventListener("DOMContentLoaded", () => {
  preloadImages();
  showSlide(0);
});


///////////////////////////////////////////////////// Home section image sliding   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\




//---------------------------- Course view details button --------------------------//
// Integrated Course Details System
// This replaces the conflicting modal code in your existing script.js

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all existing functionality
  initMobileMenu();
  initEnrollmentForm();
  initGallery();
  initSmoothScrolling();
  initFormValidation();
  initBackToTop();
  initDemoModal();
  initTestimonialSlider();
  initAutoHideNavbar();
  initFloatingDemoButton();
  initEnhancedCounsellingPopup();
  initResponsiveImages();
  initSmoothScrollWithNavbar();
  initPerformanceOptimizations();

  // Initialize integrated course details system
  initIntegratedCourseDetailsSystem();
});
// Integrated Course Details System
function initIntegratedCourseDetailsSystem() {
  // Course details data for "View Details" modal
const courseDetails = {
  "Digital Marketing": {
    topics: [
      // Month 1
      "<span class='month-title'>MONTH 1</span>",
      "1. INTRODUCTION TO DIGITAL MARKETING & CAREER SCOPE",
      "2. WEBSITE BASICS & BASIC WEBSITE DESIGN (WORDPRESS/NO-CODE)",
      "3. FUNDAMENTALS OF SEO (ON-PAGE)",
      "4. SEO OFF-PAGE & LINK BUILDING",
      "5. GOOGLE MY BUSINESS REGISTRATION & LOCAL SEO",
      "6. SOCIAL MEDIA MARKETING FUNDAMENTALS",
      "7. BASIC DESIGN WITH CANVA & CREATIVE TOOLS",
      "8. CONTENT STRATEGY & CALENDAR",

      // Month 2
      "<span class='month-title'>MONTH 2</span>",
      "9. BASIC GOOGLE SEARCH ADS SETUP",
      "10. PAID ADS BASICS (INTRO TO GOOGLE & META ADS)",
      "11. FACEBOOK & INSTAGRAM MARKETING BASICS",
      "12. WHATSAPP & EMAIL MARKETING BASICS",
      "13. MOBILE MARKETING & APP PROMOTION",
      "14. ANALYTICS BASICS (GOOGLE ANALYTICS, META INSIGHTS)",
      "15. ONLINE REPUTATION MANAGEMENT (ORM)",
      "16. MINI PROJECT 1: CREATE WEBSITE + RUN GMB LISTING",

      // Month 3
      "<span class='month-title'>MONTH 3</span>",
      "17. INFLUENCER & AFFILIATE MARKETING BASICS",
      "18. BLOGGING & CONTENT MARKETING",
      "19. COPYWRITING FOR ADS & SOCIAL MEDIA",
      "20. MARKETING AUTOMATION BASICS",
      "21. INTRO TO E-COMMERCE MARKETING",
      "22. FREELANCING BASICS IN DIGITAL MARKETING",
      "23. CASE STUDIES OF SUCCESSFUL CAMPAIGNS",
      "24. FINAL PROJECT & PRESENTATION"
    ],
  },

  "Advance Digital Marketing": {
    topics: [
      // Note about prerequisites
      "1-3 MONTH DIGITAL MARKETING FUNDAMENTALS COURSE",

      // Month 4
      "<span class='month-title'>MONTH 4</span>",
      "25. ADVANCED SEO (TECHNICAL SEO, SCHEMA, TOOLS)",
      "26. ADVANCED PAID ADS (CAMPAIGN STRUCTURES, RETARGETING)",
      "27. LANDING PAGE DESIGN & CRO (CONVERSION OPTIMIZATION)",
      "28. WHATSAPP AUTOMATION TOOLS (WATI, AI CHATBOTS)",
      "29. EMAIL AUTOMATION (MAILCHIMP, HUBSPOT)",
      "30. AI TOOLS FOR MARKETING (COPYWRITING, SCHEDULING, OPTIMIZATION)",
      "31. IMAGE-TO-VIDEO & TEXT-TO-IMAGE TOOLS (CANVA AI, PICTORY, D-ID, RUNWAY ML)",
      "32. MINI PROJECT 2: GOOGLE ADS + WHATSAPP AUTOMATION",

      // Month 5
      "<span class='month-title'>MONTH 5</span>",
      "33. E-COMMERCE WEBSITE BUILDING (SHOPIFY, WOOCOMMERCE)",
      "34. GOOGLE SHOPPING ADS SETUP",
      "35. FUNNEL BUILDING (LEAD GEN, NURTURING, SALES FUNNELS)",
      "36. BRANDING STRATEGIES FOR STARTUPS",
      "37. LINKEDIN & B2B MARKETING",
      "38. QUORA, REDDIT & MICRO-CONTENT MARKETING",
      "39. EVENT MARKETING & WEBINARS",
      "40. CASE STUDY DISCUSSIONS",

      // Month 6
      "<span class='month-title'>MONTH 6</span>",
      "41. ADVANCED ANALYTICS (GA4, TAG MANAGER, LOOKER STUDIO)",
      "42. MARKETING DASHBOARDS & REPORTS",
      "43. GOOGLE PERFORMANCE MAX ADS (GOOGLE PLEX ADS)",
      "44. SCALING FREELANCE AGENCY MODEL",
      "45. AI IN CONTENT MARKETING (CHATGPT, JASPER)",
      "46. INFLUENCER & AFFILIATE COLLABORATION ADVANCED",
      "47. MINI PROJECT 3: E-COMMERCE STORE + SHOPPING ADS",
      "48. FINAL PRESENTATION & VIVA"
    ],
  },

  "Profesional Digital Marketing": {
    topics: [
      // Note about course flow
      "1-3 MONTH DIGITAL MARKETING FUNDAMENTALS COURSE",
      "3-6 MONTH ADVANCE DIGITAL MARKETING",

      // Month 7
      "<span class='month-title'>MONTH 7</span>",
      "49. AI-POWERED AD MAKING (META AI, GOOGLE AI, CANVA AI ADS)",
      "50. REELS MARKETING & VIRAL CONTENT STRATEGIES",
      "51. VIDEO EDITING TOOLS (CAPCUT, PREMIERE PRO, AI EDITORS)",
      "52. AI CHARACTER DESIGN & VIRTUAL INFLUENCERS (HEYGEN, SYNTHESIA, REFACE)",
      "53. GROWTH HACKING & VIRAL MARKETING",
      "54. NEUROMARKETING & CONSUMER PSYCHOLOGY",
      "55. CRM TOOLS & ADVANCED AUTOMATION",
      "56. MINI PROJECT 4: AI-POWERED REELS & ADS",

      // Month 8
      "<span class='month-title'>MONTH 8</span>",
      "57. YOUTUBE MARKETING & GROWTH STRATEGY",
      "58. YOUTUBE SEO (RANKING, TAGS, ANALYTICS)",
      "59. PROGRAMMATIC ADVERTISING & MEDIA BUYING",
      "60. INTERNATIONAL DIGITAL MARKETING & LOCALIZATION",
      "61. PERSONAL BRANDING & THOUGHT LEADERSHIP",
      "62. CORPORATE TRAINING IN DIGITAL MARKETING",
      "63. LIVE CAMPAIGN MANAGEMENT (INDUSTRY PROJECT)",
      "64. INDUSTRY EXPERT MASTERCLASS",

      // Month 9
      "<span class='month-title'>MONTH 9</span>",
      "65. ADVANCED FREELANCE MARKETPLACE MASTERY",
      "66. AGENCY BUILDING & CLIENT MANAGEMENT",
      "67. CASE STUDIES (AMAZON, ZOMATO, FLIPKART, NYKAA)",
      "68. INFLUENCER CONTRACTING & MONETIZATION",
      "69. CAPSTONE PROJECT (FULL FUNNEL AI CAMPAIGN)",
      "70. PORTFOLIO & RESUME DEVELOPMENT",
      "71. MOCK INTERVIEWS & CAREER GUIDANCE",
      "72. FINAL PROJECT DEFENSE & CERTIFICATION",

      // Month 10 – Internship (Part 1)
      "<span class='month-title'>MONTH 10 – INTERNSHIP (PART 1)</span>",
      "1. INTERNSHIP ORIENTATION & PROJECT ALLOCATION",
      "2. COMPETITOR ANALYSIS FOR LIVE CLIENT",
      "3. KEYWORD RESEARCH FOR CLIENT CAMPAIGN",
      "4. WEBSITE OPTIMIZATION TASK",
      "5. GOOGLE ADS LIVE CAMPAIGN SETUP",
      "6. SOCIAL MEDIA STRATEGY FOR CLIENT",
      "7. SEO OPTIMIZATION & REPORTING",
      "8. INTERNSHIP PROGRESS REVIEW",

      // Month 11 – Internship (Part 2)
      "<span class='month-title'>MONTH 11 – INTERNSHIP (PART 2)</span>",
      "1. CONTENT CALENDAR FOR CLIENT PROJECT",
      "2. FACEBOOK & INSTAGRAM ADS (LIVE EXECUTION)",
      "3. YOUTUBE MARKETING FOR CLIENT",
      "4. WHATSAPP & EMAIL AUTOMATION FOR CLIENT",
      "5. INFLUENCER COLLABORATION EXECUTION",
      "6. ANALYTICS & REPORT SUBMISSION",
      "7. ROI & BUDGET ANALYSIS",
      "8. INTERNSHIP EVALUATION & FEEDBACK",

      // Month 12 – Professional Training
      "<span class='month-title'>MONTH 12 – PROFESSIONAL TRAINING</span>",
      "1. INDUSTRY-LEVEL DIGITAL MARKETING TRENDS",
      "2. ADVANCED AI TOOLS FOR MARKETING",
      "3. PROFESSIONAL CLIENT PROPOSAL & PITCHING",
      "4. AGENCY-STYLE TEAM COLLABORATION",
      "5. INTERNATIONAL FREELANCING & CLIENT HANDLING",
      "6. CASE STUDIES FROM AGENCIES",
      "7. CAPSTONE PROJECT PRESENTATION",
      "8. CAREER GUIDANCE & PLACEMENT SUPPORT"
    ],
  },

  "AI Power Marketing": {
    topics: [
      "CLASS 1 – INTRODUCTION TO AI IN MARKETING",
      "CLASS 2 – AI TOOLS FOR CONTENT CREATION (COPY, BLOGS, ADS)",
      "CLASS 3 – AI-POWERED GRAPHIC DESIGN (CANVA, ADOBE FIREFLY, ETC.)",
      "CLASS 4 – AI VIDEO CREATION & EDITING TOOLS",
      "CLASS 5 – AI FOR SOCIAL MEDIA MANAGEMENT (SCHEDULING, CAPTIONS, INSIGHTS)",
      "CLASS 6 – AI IN SEO & KEYWORD RESEARCH",
      "CLASS 7 – AI FOR EMAIL & AUTOMATION (CHATGPT, MAILCHIMP AI)",
      "CLASS 8 – CAPSTONE PROJECT: AI-POWERED CAMPAIGN"
    ],
  },

  "Advance AI Power Marketing": {
    topics: [
      "MONTH 1 – AI POWER MARKETING TOOLS",

      "<span class='month-title'>MONTH 2</span>",
      "CLASS 9 – AI FOR MARKET RESEARCH & CONSUMER INSIGHTS",
      "CLASS 10 – AI-POWERED AD TARGETING (META ADS AI, GOOGLE ADS AI)",
      "CLASS 11 – AI IN PERSONALIZATION & CUSTOMER JOURNEY MAPPING",
      "CLASS 12 – CHATBOTS & CONVERSATIONAL AI (MANYCHAT, INTERCOM, DRIFT)",
      "CLASS 13 – AI IN E-COMMERCE (RECOMMENDATION ENGINES, SMART UPSELLING)",
      "CLASS 14 – PREDICTIVE ANALYTICS FOR MARKETING",
      "CLASS 15 – AI TOOLS FOR INFLUENCER & AFFILIATE MARKETING",
      "CLASS 16 – AI IN SOCIAL LISTENING & BRAND MONITORING",
      "CLASS 17 – GENERATIVE AI FOR CREATIVE CAMPAIGNS",
      "CLASS 18 – AI IN VIDEO ADS (VOICEOVER, DUBBING, AUTO-EDITING)",
      "CLASS 19 – AI FOR PERFORMANCE TRACKING & REPORTING (DASHBOARDS)",
      "CLASS 20 – ETHICS, RISKS & LIMITATIONS OF AI IN MARKETING",
      "CLASS 21 – FUTURE OF AI IN DIGITAL MARKETING",
      "CLASS 22 – CASE STUDIES: BRANDS USING AI SUCCESSFULLY",
      "CLASS 23 – PROJECT LAB: DESIGNING A FULL AI-POWERED MARKETING PLAN",
      "CLASS 24 – FINAL PRESENTATION & CERTIFICATION"
    ],
  },

  "Startup launch": {
    topics: [
      // MONTH 1 – STARTUP FOUNDATIONS & BUSINESS BASICS
      "<span class='month-title'>MONTH 1 – STARTUP FOUNDATIONS & BUSINESS BASICS</span>",
      "CLASS 1 – INTRODUCTION TO STARTUPS & ENTREPRENEURIAL MINDSET",
      "CLASS 2 – IDENTIFYING PROFITABLE BUSINESS IDEAS & NICHES",
      "CLASS 3 – MARKET RESEARCH & COMPETITOR ANALYSIS",
      "CLASS 4 – BUSINESS MODEL CANVAS & LEAN STARTUP PRINCIPLES",
      "CLASS 5 – LEGAL STRUCTURE, REGISTRATION & COMPLIANCE BASICS",
      "CLASS 6 – BRANDING ESSENTIALS: NAME, LOGO, IDENTITY",
      "CLASS 7 – BUILDING A PROFESSIONAL PORTFOLIO/WEBSITE",
      "CLASS 8 – MINI PROJECT 1: CREATE A BUSINESS IDEA PITCH",

      // MONTH 2 – FREELANCING & DIGITAL BUSINESS SKILLS
      "<span class='month-title'>MONTH 2 – FREELANCING & DIGITAL BUSINESS SKILLS</span>",
      "CLASS 9 – FREELANCING PLATFORMS (UPWORK, FIVERR, LINKEDIN)",
      "CLASS 10 – CREATING WINNING FREELANCE PROFILES & PORTFOLIOS",
      "CLASS 11 – PROPOSAL WRITING & CLIENT COMMUNICATION SKILLS",
      "CLASS 12 – PRICING STRATEGIES & NEGOTIATION TACTICS",
      "CLASS 13 – TIME MANAGEMENT & PRODUCTIVITY TOOLS",
      "CLASS 14 – BUILDING AN ONLINE PRESENCE (PERSONAL BRANDING & SOCIAL MEDIA)",
      "CLASS 15 – PAYMENT GATEWAYS, CONTRACTS & INVOICING",
      "CLASS 16 – MINI PROJECT 2: CREATE A FREELANCE SERVICE PROFILE",

      // MONTH 3 – LAUNCH, GROWTH & SCALING
      "<span class='month-title'>MONTH 3 – LAUNCH, GROWTH & SCALING</span>",
      "CLASS 17 – STARTUP FUNDING (BOOTSTRAPPING, ANGEL, VC)",
      "CLASS 18 – DIGITAL MARKETING FOR STARTUPS & FREELANCERS",
      "CLASS 19 – SALES FUNNEL & CUSTOMER ACQUISITION STRATEGIES",
      "CLASS 20 – NETWORKING & COLLABORATION SKILLS",
      "CLASS 21 – CLIENT RELATIONSHIP MANAGEMENT & RETENTION",
      "CLASS 22 – SCALING A FREELANCE CAREER INTO AN AGENCY",
      "CLASS 23 – CAPSTONE PROJECT: STARTUP LAUNCH PLAN OR FREELANCE GROWTH PLAN",
      "CLASS 24 – FINAL PRESENTATION, FEEDBACK & CERTIFICATION"
    ]
  },

  // NEW COURSES BELOW

  "E-Commerce & Online Business Development": {
    topics: [
      // Month 1 - E-commerce Fundamentals
      "<span class='month-title'>MONTH 1 - E-COMMERCE FUNDAMENTALS</span>",
      "1. INTRODUCTION TO E-COMMERCE & ONLINE BUSINESS MODELS",
      "2. MARKET RESEARCH & NICHE IDENTIFICATION",
      "3. LEGAL REQUIREMENTS & BUSINESS REGISTRATION FOR E-COMMERCE",
      "4. CHOOSING THE RIGHT E-COMMERCE PLATFORM (SHOPIFY, WOOCOMMERCE, AMAZON)",
      "5. PRODUCT SOURCING & SUPPLIER MANAGEMENT",
      "6. INVENTORY MANAGEMENT BASICS",
      "7. E-COMMERCE WEBSITE DESIGN PRINCIPLES",
      "8. MINI PROJECT 1: SET UP BASIC E-COMMERCE STORE",

      // Month 2 - Digital Marketing for E-commerce
      "<span class='month-title'>MONTH 2 - DIGITAL MARKETING FOR E-COMMERCE</span>",
      "9. E-COMMERCE SEO & PRODUCT OPTIMIZATION",
      "10. GOOGLE SHOPPING ADS & PRODUCT LISTINGS",
      "11. FACEBOOK & INSTAGRAM ADS FOR E-COMMERCE",
      "12. EMAIL MARKETING FOR ONLINE STORES",
      "13. CONVERSION RATE OPTIMIZATION (CRO)",
      "14. CUSTOMER REVIEWS & REPUTATION MANAGEMENT",
      "15. AFFILIATE & INFLUENCER MARKETING FOR E-COMMERCE",
      "16. MINI PROJECT 2: CREATE COMPLETE MARKETING CAMPAIGN",

      // Month 3 - Scaling & Advanced Strategies
      "<span class='month-title'>MONTH 3 - SCALING & ADVANCED STRATEGIES</span>",
      "17. PAYMENT GATEWAYS & SECURITY MEASURES",
      "18. LOGISTICS & SHIPPING OPTIMIZATION",
      "19. CUSTOMER SERVICE & CHAT SUPPORT SYSTEMS",
      "20. ANALYTICS & PERFORMANCE TRACKING",
      "21. MARKETPLACE SELLING (AMAZON, FLIPKART, ETSY)",
      "22. INTERNATIONAL E-COMMERCE & CROSS-BORDER SELLING",
      "23. SCALING STRATEGIES & AUTOMATION TOOLS",
      "24. FINAL PROJECT: LAUNCH COMPLETE E-COMMERCE BUSINESS"
    ],
  },

  "Journalism and Mass Communication": {
    topics: [
      // Month 1 - Journalism Fundamentals
      "<span class='month-title'>MONTH 1 - JOURNALISM FUNDAMENTALS</span>",
      "1. INTRODUCTION TO JOURNALISM & MEDIA LANDSCAPE",
      "2. NEWS WRITING PRINCIPLES & INVERTED PYRAMID STRUCTURE",
      "3. RESEARCH TECHNIQUES & FACT-CHECKING METHODS",
      "4. INTERVIEW SKILLS & SOURCE DEVELOPMENT",
      "5. ETHICS IN JOURNALISM & MEDIA LAW BASICS",
      "6. PRINT JOURNALISM & NEWSPAPER LAYOUT",
      "7. FEATURE WRITING & HUMAN INTEREST STORIES",
      "8. MINI PROJECT 1: CREATE NEWS PORTFOLIO",

      // Month 2 - Digital Media & Broadcasting
      "<span class='month-title'>MONTH 2 - DIGITAL MEDIA & BROADCASTING</span>",
      "9. DIGITAL JOURNALISM & ONLINE PUBLISHING",
      "10. SOCIAL MEDIA JOURNALISM & LIVE REPORTING",
      "11. RADIO JOURNALISM & PODCASTING BASICS",
      "12. TELEVISION NEWS PRODUCTION & ANCHORING",
      "13. MOBILE JOURNALISM (MOJO) & CITIZEN REPORTING",
      "14. VIDEO EDITING FOR NEWS & DOCUMENTARIES",
      "15. DATA JOURNALISM & INFOGRAPHICS",
      "16. MINI PROJECT 2: CREATE MULTIMEDIA NEWS PACKAGE",

      // Month 3 - Specialized Areas & Career Development
      "<span class='month-title'>MONTH 3 - SPECIALIZED AREAS & CAREER DEVELOPMENT</span>",
      "17. SPORTS JOURNALISM & BEAT REPORTING",
      "18. BUSINESS & FINANCIAL JOURNALISM",
      "19. ENTERTAINMENT & LIFESTYLE JOURNALISM",
      "20. INVESTIGATIVE JOURNALISM TECHNIQUES",
      "21. PUBLIC RELATIONS & CORPORATE COMMUNICATION",
      "22. FREELANCE JOURNALISM & CONTENT CREATION",
      "23. PORTFOLIO DEVELOPMENT & CAREER GUIDANCE",
      "24. FINAL PROJECT: COMPREHENSIVE MEDIA CAMPAIGN"
    ],
  },

  "Advanced Journalism and Mass Communication": {
    topics: [
      // Prerequisites
      "3-MONTH JOURNALISM AND MASS COMMUNICATION FUNDAMENTALS COURSE",

      // Month 4 - Advanced Reporting & Investigation
      "<span class='month-title'>MONTH 4 - ADVANCED REPORTING & INVESTIGATION</span>",
      "25. INVESTIGATIVE JOURNALISM & DEEP RESEARCH METHODS",
      "26. DATA ANALYSIS & STATISTICAL REPORTING",
      "27. FREEDOM OF INFORMATION ACT (RTI) & LEGAL RESEARCH",
      "28. CONFLICT & CRISIS REPORTING",
      "29. ENVIRONMENTAL & SCIENCE JOURNALISM",
      "30. INTERNATIONAL JOURNALISM & FOREIGN CORRESPONDENCE",
      "31. DOCUMENTARY FILMMAKING BASICS",
      "32. MINI PROJECT 3: INVESTIGATIVE STORY DEVELOPMENT",

      // Month 5 - Digital Innovation & New Media
      "<span class='month-title'>MONTH 5 - DIGITAL INNOVATION & NEW MEDIA</span>",
      "33. IMMERSIVE JOURNALISM (VR/AR IN NEWS)",
      "34. AI IN JOURNALISM & AUTOMATED REPORTING",
      "35. PODCAST PRODUCTION & AUDIO STORYTELLING",
      "36. LIVE STREAMING & REAL-TIME REPORTING",
      "37. SOCIAL MEDIA STRATEGY FOR JOURNALISTS",
      "38. AUDIENCE ENGAGEMENT & COMMUNITY BUILDING",
      "39. MEDIA ENTREPRENEURSHIP & STARTUP JOURNALISM",
      "40. MINI PROJECT 4: LAUNCH DIGITAL MEDIA BRAND",

      // Month 6 - Leadership & Industry Mastery
      "<span class='month-title'>MONTH 6 - LEADERSHIP & INDUSTRY MASTERY</span>",
      "41. NEWSROOM MANAGEMENT & EDITORIAL LEADERSHIP",
      "42. MEDIA ECONOMICS & BUSINESS MODELS",
      "43. CRISIS COMMUNICATION & REPUTATION MANAGEMENT",
      "44. INTERNATIONAL MEDIA SYSTEMS & COMPARATIVE JOURNALISM",
      "45. MEDIA CRITICISM & QUALITY ASSESSMENT",
      "46. PROFESSIONAL NETWORKING & INDUSTRY CONNECTIONS",
      "47. CAPSTONE PROJECT: COMPREHENSIVE MEDIA STRATEGY",
      "48. FINAL PRESENTATION & CERTIFICATION"
    ],
  },

  "AI Master Course": {
    topics: [
      // Month 1 - AI Fundamentals & Machine Learning Basics
      "<span class='month-title'>MONTH 1 - AI FUNDAMENTALS & MACHINE LEARNING BASICS</span>",
      "1. INTRODUCTION TO ARTIFICIAL INTELLIGENCE & ITS APPLICATIONS",
      "2. MACHINE LEARNING CONCEPTS & ALGORITHMS",
      "3. PYTHON PROGRAMMING FOR AI (BASICS TO INTERMEDIATE)",
      "4. DATA PREPROCESSING & FEATURE ENGINEERING",
      "5. SUPERVISED LEARNING (REGRESSION & CLASSIFICATION)",
      "6. UNSUPERVISED LEARNING (CLUSTERING & DIMENSIONALITY REDUCTION)",
      "7. MODEL EVALUATION & PERFORMANCE METRICS",
      "8. MINI PROJECT 1: BUILD YOUR FIRST ML MODEL",

      // Month 2 - Deep Learning & Neural Networks
      "<span class='month-title'>MONTH 2 - DEEP LEARNING & NEURAL NETWORKS</span>",
      "9. INTRODUCTION TO DEEP LEARNING & NEURAL NETWORKS",
      "10. TENSORFLOW & KERAS FRAMEWORKS",
      "11. CONVOLUTIONAL NEURAL NETWORKS (CNNs) FOR IMAGE PROCESSING",
      "12. RECURRENT NEURAL NETWORKS (RNNs) FOR SEQUENCE DATA",
      "13. NATURAL LANGUAGE PROCESSING (NLP) FUNDAMENTALS",
      "14. COMPUTER VISION APPLICATIONS",
      "15. TRANSFER LEARNING & PRE-TRAINED MODELS",
      "16. MINI PROJECT 2: IMAGE CLASSIFICATION SYSTEM",

      // Month 3 - Advanced AI & Generative Models
      "<span class='month-title'>MONTH 3 - ADVANCED AI & GENERATIVE MODELS</span>",
      "17. GENERATIVE ADVERSARIAL NETWORKS (GANs)",
      "18. TRANSFORMER MODELS & ATTENTION MECHANISMS",
      "19. LARGE LANGUAGE MODELS (LLMS) & CHATBOT DEVELOPMENT",
      "20. AI ETHICS, BIAS, & RESPONSIBLE AI DEVELOPMENT",
      "21. AI IN BUSINESS: STRATEGY & IMPLEMENTATION",
      "22. CLOUD AI SERVICES (AWS, GOOGLE CLOUD, AZURE)",
      "23. AI PROJECT DEPLOYMENT & SCALING",
      "24. MINI PROJECT 3: DEPLOY AI APPLICATION",

      // Month 4 - Specialized AI Applications
      "<span class='month-title'>MONTH 4 - SPECIALIZED AI APPLICATIONS</span>",
      "25. AI IN HEALTHCARE & MEDICAL DIAGNOSIS",
      "26. AI IN FINANCE & ALGORITHMIC TRADING",
      "27. AI IN MARKETING & CUSTOMER ANALYTICS",
      "28. ROBOTICS & AI INTEGRATION",
      "29. AI FOR CREATIVE INDUSTRIES (ART, MUSIC, WRITING)",
      "30. AUTONOMOUS SYSTEMS & SELF-DRIVING TECHNOLOGY",
      "31. AI RESEARCH METHODOLOGIES",
      "32. MINI PROJECT 4: SPECIALIZED AI SOLUTION",

      // Month 5 - AI Engineering & Production
      "<span class='month-title'>MONTH 5 - AI ENGINEERING & PRODUCTION</span>",
      "33. MLOPS & AI PIPELINE AUTOMATION",
      "34. MODEL MONITORING & MAINTENANCE",
      "35. AI SYSTEM ARCHITECTURE & SCALABILITY",
      "36. DATA ENGINEERING FOR AI PROJECTS",
      "37. AI SECURITY & PRIVACY PROTECTION",
      "38. EDGE AI & IOT INTEGRATION",
      "39. AI PERFORMANCE OPTIMIZATION",
      "40. INDUSTRY PROJECT: REAL-WORLD AI SOLUTION",

      // Month 6 - Leadership & Advanced Research
      "<span class='month-title'>MONTH 6 - LEADERSHIP & ADVANCED RESEARCH</span>",
      "41. AI TEAM LEADERSHIP & PROJECT MANAGEMENT",
      "42. AI STARTUP & ENTREPRENEURSHIP",
      "43. CUTTING-EDGE AI RESEARCH & PUBLICATIONS",
      "44. AI CONSULTING & CLIENT MANAGEMENT",
      "45. GLOBAL AI TRENDS & FUTURE TECHNOLOGIES",
      "46. AI POLICY & REGULATORY COMPLIANCE",
      "47. CAPSTONE PROJECT: COMPREHENSIVE AI SOLUTION",
      "48. FINAL PRESENTATION, CERTIFICATION & CAREER GUIDANCE"
    ],
  },

  "Social Media Marketing": {
    topics: [
      // Month 1 - Social Media Fundamentals
      "<span class='month-title'>MONTH 1 - SOCIAL MEDIA FUNDAMENTALS</span>",
      "1. INTRODUCTION TO SOCIAL MEDIA MARKETING & PLATFORMS",
      "2. UNDERSTANDING SOCIAL MEDIA ALGORITHMS & USER BEHAVIOR",
      "3. CREATING COMPELLING SOCIAL MEDIA PROFILES & OPTIMIZATION",
      "4. CONTENT STRATEGY & PLANNING FOR SOCIAL PLATFORMS",
      "5. FACEBOOK MARKETING: PAGES, GROUPS & ORGANIC GROWTH",
      "6. INSTAGRAM MARKETING: POSTS, STORIES & REELS STRATEGY",
      "7. VISUAL CONTENT CREATION WITH CANVA & DESIGN TOOLS",
      "8. MINI PROJECT 1: CREATE SOCIAL MEDIA BRAND PRESENCE",

      // Month 2 - Advanced Social Media & Paid Advertising
      "<span class='month-title'>MONTH 2 - ADVANCED SOCIAL MEDIA & PAID ADVERTISING</span>",
      "9. TWITTER/X MARKETING & TREND ENGAGEMENT STRATEGIES",
      "10. LINKEDIN MARKETING FOR PROFESSIONALS & B2B",
      "11. YOUTUBE MARKETING & CHANNEL OPTIMIZATION",
      "12. TIKTOK & SHORT-FORM VIDEO CONTENT STRATEGIES",
      "13. SOCIAL MEDIA ADVERTISING (META ADS, TWITTER ADS)",
      "14. AUDIENCE TARGETING & CUSTOM AUDIENCE CREATION",
      "15. AD CREATIVE DESIGN & A/B TESTING",
      "16. MINI PROJECT 2: RUN PAID SOCIAL MEDIA CAMPAIGNS",

      // Month 3 - Analytics, Automation & Growth
      "<span class='month-title'>MONTH 3 - ANALYTICS, AUTOMATION & GROWTH</span>",
      "17. SOCIAL MEDIA ANALYTICS & PERFORMANCE TRACKING",
      "18. SOCIAL LISTENING & BRAND MONITORING TOOLS",
      "19. INFLUENCER MARKETING & COLLABORATION STRATEGIES",
      "20. SOCIAL MEDIA AUTOMATION TOOLS (HOOTSUITE, BUFFER)",
      "21. COMMUNITY MANAGEMENT & CUSTOMER ENGAGEMENT",
      "22. CRISIS MANAGEMENT ON SOCIAL MEDIA",
      "23. SOCIAL COMMERCE & SELLING ON SOCIAL PLATFORMS",
      "24. FINAL PROJECT: COMPREHENSIVE SOCIAL MEDIA STRATEGY"
    ],
  },

  "Website Design": {
    topics: [
      // Month 1 - Web Design Fundamentals
      "<span class='month-title'>MONTH 1 - WEB DESIGN FUNDAMENTALS</span>",
      "1. INTRODUCTION TO WEB DESIGN & USER EXPERIENCE (UX)",
      "2. HTML5 FUNDAMENTALS & SEMANTIC MARKUP",
      "3. CSS3 STYLING, LAYOUTS & RESPONSIVE DESIGN",
      "4. JAVASCRIPT BASICS FOR INTERACTIVE WEBSITES",
      "5. DESIGN PRINCIPLES: COLOR THEORY, TYPOGRAPHY & LAYOUTS",
      "6. WIREFRAMING & PROTOTYPING TOOLS (FIGMA, SKETCH)",
      "7. ACCESSIBILITY & WEB STANDARDS COMPLIANCE",
      "8. MINI PROJECT 1: BUILD RESPONSIVE LANDING PAGE",

      // Month 2 - Advanced Design & CMS
      "<span class='month-title'>MONTH 2 - ADVANCED DESIGN & CMS</span>",
      "9. WORDPRESS DEVELOPMENT & CUSTOMIZATION",
      "10. NO-CODE WEBSITE BUILDERS (WEBFLOW, WIX, SQUARESPACE)",
      "11. E-COMMERCE WEBSITE DESIGN (SHOPIFY, WOOCOMMERCE)",
      "12. MOBILE-FIRST DESIGN & PROGRESSIVE WEB APPS",
      "13. WEBSITE PERFORMANCE OPTIMIZATION & SPEED",
      "14. SEO-FRIENDLY WEBSITE STRUCTURE & ON-PAGE SEO",
      "15. INTEGRATING FORMS, PAYMENTS & THIRD-PARTY TOOLS",
      "16. MINI PROJECT 2: BUILD COMPLETE BUSINESS WEBSITE",

      // Month 3 - Professional Development & Portfolio
      "<span class='month-title'>MONTH 3 - PROFESSIONAL DEVELOPMENT & PORTFOLIO</span>",
      "17. ADVANCED CSS FRAMEWORKS (BOOTSTRAP, TAILWIND)",
      "18. VERSION CONTROL WITH GIT & GITHUB",
      "19. WEBSITE HOSTING, DOMAINS & DEPLOYMENT",
      "20. WEBSITE MAINTENANCE & SECURITY BEST PRACTICES",
      "21. CLIENT COMMUNICATION & PROJECT MANAGEMENT",
      "22. FREELANCE WEB DESIGN BUSINESS SETUP",
      "23. PORTFOLIO DEVELOPMENT & CASE STUDY CREATION",
      "24. FINAL PROJECT: COMPLETE CLIENT WEBSITE DELIVERY"
    ],
  }
};

  // Course data for tier-based modal (for "Learn more" buttons)
  const courseData = {
    "Digital Marketing": {
      title: "Digital Marketing Courses",
      tiers: [
        {
          title: "Basic Digital Marketing",
          duration: "(1 Month)",
          price: "Rs.1500",
          modules: [
            "SEO Fundamentals",
            "Social Media Marketing",
            "Google Ads Basics",
          ],
        },
        {
          title: "Advanced Digital Marketing",
          duration: "(2 Months)",
          price: "Rs.2500",
          modules: [
            "Advanced SEO",
            "PPC Campaigns",
            "Analytics & Reporting",
            "Content Strategy",
          ],
        },
        {
          title: "Digital Marketing Mastery",
          duration: "(3 Months)",
          price: "Rs.3500",
          modules: [
            "Marketing Automation",
            "Conversion Optimization",
            "Email Marketing",
            "Brand Strategy",
            "ROI Analysis",
          ],
        },
      ],
    },
    "Artificial Intelligence": {
      title: "Artificial Intelligence Courses",
      tiers: [
        {
          title: "AI Fundamentals",
          duration: "(2 Months)",
          price: "Rs.2000",
          modules: [
            "Introduction to AI",
            "Machine Learning Basics",
            "Python Programming",
            "Data Analysis",
          ],
        },
        {
          title: "Advanced AI & ML",
          duration: "(4 Months)",
          price: "Rs.4000",
          modules: [
            "Deep Learning",
            "Neural Networks",
            "Computer Vision",
            "Natural Language Processing",
            "AI Ethics",
          ],
        },
        {
          title: "AI Specialization",
          duration: "(6 Months)",
          price: "Rs.6000",
          modules: [
            "Advanced Deep Learning",
            "Reinforcement Learning",
            "AI Research Methods",
            "Industry Projects",
            "AI Deployment",
            "Career Guidance",
          ],
        },
      ],
    },
    "Mass Communication": {
      title: "Mass Communication Courses",
      tiers: [
        {
          title: "Basic Communication",
          duration: "(1 Month)",
          price: "Rs.1200",
          modules: [
            "Communication Theory",
            "Media Writing",
            "Public Speaking",
            "Journalism Basics",
          ],
        },
        {
          title: "Advanced Media Studies",
          duration: "(3 Months)",
          price: "Rs.2800",
          modules: [
            "Broadcast Journalism",
            "Digital Media",
            "Public Relations",
            "Media Ethics",
            "Video Production",
          ],
        },
        {
          title: "Media Professional",
          duration: "(5 Months)",
          price: "Rs.4500",
          modules: [
            "Advanced Journalism",
            "Media Management",
            "Documentary Production",
            "Media Law",
            "Crisis Communication",
            "Portfolio Development",
          ],
        },
      ],
    },
    Entrepreneurship: {
      title: "Entrepreneurship Courses",
      tiers: [
        {
          title: "Startup Basics",
          duration: "(1 Month)",
          price: "Rs.1800",
          modules: [
            "Business Idea Validation",
            "Market Research",
            "Business Plan Basics",
            "Financial Planning",
          ],
        },
        {
          title: "Business Development",
          duration: "(3 Months)",
          price: "Rs.3200",
          modules: [
            "Advanced Business Planning",
            "Funding & Investment",
            "Marketing Strategy",
            "Operations Management",
            "Legal Aspects",
          ],
        },
        {
          title: "Enterprise Leadership",
          duration: "(4 Months)",
          price: "Rs.5000",
          modules: [
            "Scaling Strategies",
            "Team Building",
            "Innovation Management",
            "Global Markets",
            "Exit Strategies",
            "Mentorship Program",
          ],
        },
      ],
    },
  };

  // Get modal elements for both types
  const topicsModal = document.querySelector("#courseModal.modal"); // Topics modal (View Details)
  const tiersModal = document.querySelector(".course-details-modal"); // Tiers modal (Learn more)

  // Topics Modal Elements (View Details)
  if (topicsModal) {
    const topicsModalTitle = topicsModal.querySelector("#modalTitle");
    const topicsModalBody = topicsModal.querySelector("#modalBody");
    const topicsModalEnrollBtn = topicsModal.querySelector("#modalEnrollBtn");
    
    // FIXED: Find the close button correctly using aria-label attribute
    const topicsCloseBtn = topicsModal.querySelector('button[aria-label="Close modal"]');

    // Add event listeners to "View Details" buttons
    document.querySelectorAll(".view-details-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const courseName = this.getAttribute("data-course");
        console.log("Button clicked!")
        showCourseTopics(courseName);
      });
    });

    

    // Topics modal close events - FIXED
    if (topicsCloseBtn) {
      console.log("Close button found and event listener added"); // Debug log
      topicsCloseBtn.addEventListener("click", function () {
        console.log("Close button clicked"); // Debug log
        topicsModal.style.display = "none";
        document.body.style.overflow = "auto"; // Restore scrolling
      });
    } else {
      console.log("Close button not found!"); // Debug log
    }

    // Click outside to close
    topicsModal.addEventListener("click", function (event) {
      if (event.target === topicsModal) {
        topicsModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });

    // Topics modal enroll button
    if (topicsModalEnrollBtn) {
      topicsModalEnrollBtn.addEventListener("click", function () {
        const courseName = topicsModalTitle.textContent.replace(
          " - Course Details",
          ""
        );
        openEnrollmentModal(courseName);
        topicsModal.style.display = "none";
        document.body.style.overflow = "auto";
      });
    }

    function showCourseTopics(courseName) {
      const course = courseDetails[courseName];
      if (course) {
        topicsModalTitle.textContent = `${courseName} - Course Details`;

        let topicsHtml =
          '<h4 style="color: #2E8B57; margin-bottom: 20px;">What you will learn:</h4>';
        topicsHtml += '<ul class="course-topics">';

        course.topics.forEach((topic) => {
          topicsHtml += `<li>${topic}</li>`;
        });

        topicsHtml += "</ul>";

        topicsModalBody.innerHTML = topicsHtml;
        topicsModal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    }
  }

  // Tiers Modal Elements (Learn more)
  if (tiersModal) {
    const tiersModalTitle = tiersModal.querySelector("#modalTitle");
    const courseTiers = tiersModal.querySelector("#courseTiers");
    const tiersCloseBtn = tiersModal.querySelector("#closeModal");

    // Add event listeners to "Learn more" buttons
    document.querySelectorAll(".enroll-btn-new").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation();
        const courseName = this.getAttribute("data-course");
        showCourseTiers(courseName);
      });
    });

    // Tiers modal close events
    if (tiersCloseBtn) {
      tiersCloseBtn.addEventListener("click", closeTiersModal);
    }

    tiersModal.addEventListener("click", function (e) {
      if (e.target === tiersModal) {
        closeTiersModal();
      }
    });

    function showCourseTiers(courseName) {
      const course = courseData[courseName];
      if (!course) return;

      tiersModalTitle.textContent = course.title;
      courseTiers.innerHTML = "";

      course.tiers.forEach((tier) => {
        const tierCard = createTierCard(tier);
        courseTiers.appendChild(tierCard);
      });

      tiersModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function createTierCard(tier) {
      const card = document.createElement("div");
      card.className = "tier-card";

      const modules = tier.modules
        .map((module) => `<div class="module-item">${module}</div>`)
        .join("");

      card.innerHTML = `
                <div class="tier-header">
                    <div class="tier-title">${tier.title}</div>
                    <div class="tier-duration">${tier.duration}</div>
                    <div class="tier-price">${tier.price}</div>
                </div>
                <div class="tier-modules">
                    ${modules}
                </div>
                <button class="tier-enroll-btn">Enroll Now</button>
            `;

      const enrollBtn = card.querySelector(".tier-enroll-btn");
      enrollBtn.addEventListener("click", () => {
        openEnrollmentModal(tier.title);
        closeTiersModal();
      });

      return card;
    }

    function closeTiersModal() {
      tiersModal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }

  // Regular "Enroll Now" buttons in course cards
  document
    .querySelectorAll(".courses-section .enroll-btn")
    .forEach((button) => {
      button.addEventListener("click", function () {
        const courseName = this.getAttribute("data-course");
        openEnrollmentModal(courseName);
      });
    });

  // Unified enrollment modal opener
  function openEnrollmentModal(courseName) {
    const enrollmentModal = document.getElementById("enrollmentModal");
    const courseNameField = document.getElementById("courseName");

    if (enrollmentModal && courseNameField) {
      courseNameField.value = courseName;
      enrollmentModal.style.display = "block";
      enrollmentModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      const firstInput = enrollmentModal.querySelector('input[type="text"]');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }

  // Close modals with Escape key - UPDATED
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (topicsModal && topicsModal.style.display === "block") {
        topicsModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
      if (tiersModal && tiersModal.classList.contains("active")) {
        tiersModal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    }
  });
}

// Initialize the system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded, initializing course system..."); // Debug log
  initIntegratedCourseDetailsSystem();
});









////////////////////////////// HOME PAGE VIEW DETAILS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



////////////////////////////// Mobile toggle button \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\