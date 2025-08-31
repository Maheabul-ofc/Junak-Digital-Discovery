// DOM Content Loaded - Main initialization
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initMobileMenu();
  initEnrollmentForm();
  initGallery();
  initSmoothScrolling();
  initFormValidation();
  initBackToTop();
  initDemoModal();
  initTestimonialSlider();
  initCourseHeaderSlideshow();
  initAutoHideNavbar();
  initFloatingDemoButton();
  initEnhancedCounsellingPopup();
  initResponsiveImages();
  initPerformanceOptimizations();
  initIntegratedCourseDetailsSystem();
  initModalCloseFunctionality();
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
      document.body.style.overflow = "hidden";

      // Focus on first input field for accessibility
      const firstInput = modal.querySelector('input[type="text"]');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
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
      const submitBtn = form.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Submitting...";
      submitBtn.disabled = true;

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

    // Add keyboard support
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });

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

  imageModal.addEventListener("click", function (e) {
    if (e.target === imageModal) {
      closeImageModalFunc();
    }
  });

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
        
        const navbar = document.querySelector(".navbar");
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const offsetTop = targetElement.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

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
      input.addEventListener("blur", function () {
        validateField(this);
      });

      input.addEventListener("input", function () {
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
    errorElement.style.cssText = `
      color: #E25C5B;
      font-size: 0.9rem;
      display: block;
      margin-top: 5px;
    `;
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

  const animateElements = document.querySelectorAll(
    ".feature-card, .course-card, .faculty-card, .mv-card, .gallery-item"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });
}

// Utility Functions
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
    border: 2px solid white;
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

  const toggleBackToTop = throttle(() => {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  }, 100);

  window.addEventListener("scroll", toggleBackToTop);

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Demo Class Modal Functionality
function initDemoModal() {
  const demoButtons = document.querySelectorAll(".demo-button");
  const demoModal = document.getElementById("demoModal");
  const closeDemoModal = demoModal?.querySelector(".close-modal");
  const demoForm = document.getElementById("demoForm");

  if (!demoModal) return;

  demoButtons.forEach((button) => {
    button.addEventListener("click", function () {
      demoModal.style.display = "block";
      demoModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      const firstInput = demoModal.querySelector('input[type="text"]');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    });
  });

  function closeDemoModalFunc() {
    demoModal.style.display = "none";
    demoModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";

    if (demoForm) {
      demoForm.reset();
    }
  }

  if (closeDemoModal) {
    closeDemoModal.addEventListener("click", closeDemoModalFunc);
  }

  window.addEventListener("click", function (e) {
    if (e.target === demoModal) {
      closeDemoModalFunc();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && demoModal.style.display === "block") {
      closeDemoModalFunc();
    }
  });

  if (demoForm) {
    demoForm.addEventListener("submit", function (e) {
      const submitBtn = demoForm.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Booking...";
      submitBtn.disabled = true;

      setTimeout(() => {
        alert("Thank you! We will contact you soon to schedule your free demo class.");
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
  let slideInterval;

  if (testimonialItems.length === 0) return;

  function showSlide(index) {
    testimonialItems.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialItems.length;
    showSlide(currentSlide);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
      
      // Restart interval
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    });
  });

  // Start auto-advance
  slideInterval = setInterval(nextSlide, 5000);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    const isTestimonialFocused = document.activeElement.closest('.testimonials-section');
    if (!isTestimonialFocused) return;

    if (e.key === "ArrowLeft" && currentSlide > 0) {
      currentSlide--;
      showSlide(currentSlide);
    } else if (e.key === "ArrowRight" && currentSlide < testimonialItems.length - 1) {
      currentSlide++;
      showSlide(currentSlide);
    }
  });
}

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

  function getCurrentSlideItems() {
    return window.innerWidth <= 768 ? slideItemsMobile : slideItems;
  }

  function setBackgroundImages() {
    [...slideItems, ...slideItemsMobile].forEach((slide) => {
      const bgImage = slide.getAttribute("data-bg");
      if (bgImage) {
        slide.style.backgroundImage = `url(${bgImage})`;
      }
    });
  }

  function preloadImages() {
    [...slideItems, ...slideItemsMobile].forEach((slide) => {
      const bgImage = slide.getAttribute("data-bg");
      if (bgImage) {
        const img = new Image();
        img.onload = () => slide.classList.add("loaded");
        img.onerror = () => {
          console.warn(`Failed to load image: ${bgImage}`);
          slide.style.background = "linear-gradient(135deg, var(--primary-green), var(--coral-red))";
        };
        img.src = bgImage;
      }
    });
  }

  function showSlide(index, slides = null) {
    if (isTransitioning) return;

    const currentSlides = slides || getCurrentSlideItems();
    if (currentSlides.length === 0) return;

    isTransitioning = true;

    currentSlides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    if (currentSlides[index]) {
      currentSlides[index].classList.add("loading");
    }

    setTimeout(() => {
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

  function nextSlide() {
    const currentSlides = getCurrentSlideItems();
    currentSlide = (currentSlide + 1) % currentSlides.length;
    showSlide(currentSlide, currentSlides);
  }

  function startSlideshow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      if (isTransitioning) return;

      currentSlide = index;
      showSlide(currentSlide);
      startSlideshow();
    });

    indicator.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        indicator.click();
      }
    });
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      showSlide(currentSlide);
    }, 250);
  });

  // Visibility change handling
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  });

  // Mouse/touch events
  if (slideshow) {
    slideshow.addEventListener("mouseenter", stopSlideshow);
    slideshow.addEventListener("mouseleave", startSlideshow);
    slideshow.addEventListener("touchstart", stopSlideshow);
    slideshow.addEventListener("touchend", () => {
      setTimeout(startSlideshow, 2000);
    });
  }

  // Initialize
  setBackgroundImages();
  preloadImages();

  setTimeout(() => {
    showSlide(0);
    startSlideshow();
  }, 100);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    stopSlideshow();
  }
}

// Auto-hide Navbar on Scroll
function initAutoHideNavbar() {
  let lastScrollTop = 0;
  const navbar = document.querySelector(".header");
  const featuredSection = document.querySelector(".featured-courses");

  const handleScroll = throttle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar?.classList.add("hidden");
      featuredSection?.classList.add("navbar-hidden");
    } else {
      navbar?.classList.remove("hidden");
      featuredSection?.classList.remove("navbar-hidden");
    }

    lastScrollTop = scrollTop;
  }, 100);

  window.addEventListener("scroll", handleScroll);
}

// Floating Demo Button Functionality
function initFloatingDemoButton() {
  const floatingBtn = document.getElementById("floatingDemoBtn");
  const demoModal = document.getElementById("demoModal");

  if (!floatingBtn || !demoModal) return;

  floatingBtn.addEventListener("click", function () {
    demoModal.style.display = "block";
    demoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const firstInput = demoModal.querySelector('input[type="text"]');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  });
}

// Enhanced Counselling Popup
function initEnhancedCounsellingPopup() {
  const popup = document.getElementById("counsellingPopup");
  const closePopup = popup?.querySelector(".close-popup");

  if (!popup) return;

  let showInterval;
  let isUserClosed = false;

  function showPopup() {
    if (!isUserClosed && !document.hidden) {
      popup.style.display = "block";

      setTimeout(() => {
        if (popup.style.display === "block" && !isUserClosed) {
          popup.style.display = "none";
        }
      }, 8000);
    }
  }

  function startPopupCycle() {
    setTimeout(showPopup, 15000);
    showInterval = setInterval(showPopup, 25000);
  }

  if (closePopup) {
    closePopup.addEventListener("click", () => {
      popup.style.display = "none";
      isUserClosed = true;

      setTimeout(() => {
        isUserClosed = false;
      }, 120000);
    });
  }

  const whatsappBtn = popup.querySelector(".popup-btn");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      popup.style.display = "none";
      clearInterval(showInterval);
    });
  }

  startPopupCycle();

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

  handleImageVisibility();
  window.addEventListener("resize", debounce(handleImageVisibility, 250));
}

// Performance optimizations
function initPerformanceOptimizations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const style = document.createElement("style");
    style.textContent = `
      .floating-demo-btn { animation: none !important; }
      .counselling-popup { animation: none !important; }
      * { transition-duration: 0.1s !important; }
    `;
    document.head.appendChild(style);
  }

  document.addEventListener("visibilitychange", () => {
    document.body.classList.toggle("animations-paused", document.hidden);
  });
}

// Integrated Course Details System
function initIntegratedCourseDetailsSystem() {
  // Course details data for "View Details" modal
  const courseDetails = {
    "Digital Marketing": {
      topics: [
        "Search Engine Optimization (SEO) Fundamentals",
        "Google Ads & Paid Search Marketing",
        "Social Media Marketing Strategies",
        "Email Marketing Campaigns",
        "Content Marketing & Copywriting",
        "Google Analytics & Data Analysis",
        "Conversion Rate Optimization",
        "Marketing Automation Tools",
        "Digital Marketing Strategy Planning",
        "ROI Measurement & Reporting",
      ],
    },
    "Social Media Marketing": {
      topics: [
        "Platform-Specific Content Strategies",
        "Instagram Marketing & Stories",
        "Facebook Advertising & Business Manager",
        "LinkedIn Marketing for B2B",
        "Twitter/X Marketing Techniques",
        "YouTube Channel Growth Strategies",
        "Influencer Marketing & Collaborations",
        "Social Media Analytics & Insights",
        "Community Management",
        "Crisis Management on Social Platforms",
      ],
    },
    "Website Design": {
      topics: [
        "HTML5 & CSS3 Fundamentals",
        "Responsive Web Design Principles",
        "User Experience (UX) Design",
        "User Interface (UI) Design",
        "Figma & Design Tools",
        "JavaScript Basics for Interactivity",
        "WordPress Development",
        "Web Accessibility Standards",
        "Performance Optimization",
        "Domain & Hosting Management",
      ],
    },
    "AI-Powered Digital Marketing": {
      topics: [
        "Introduction to AI in Marketing",
        "ChatGPT for Content Creation",
        "AI-Powered SEO Tools & Strategies",
        "Automated Social Media Management",
        "AI Analytics & Predictive Modeling",
        "Personalization & Customer Segmentation",
        "AI Chatbots for Customer Service",
        "Programmatic Advertising with AI",
        "Voice Search Optimization",
        "AI Ethics in Marketing",
      ],
    },
    "Brand Building Course": {
      topics: [
        "Brand Identity & Visual Design",
        "Brand Strategy Development",
        "Target Audience Research & Personas",
        "Brand Positioning & Messaging",
        "Logo Design & Brand Guidelines",
        "Brand Voice & Tone Development",
        "Digital Brand Management",
        "Brand Reputation Management",
        "Brand Storytelling Techniques",
        "Brand Consistency Across Channels",
      ],
    },
    "AI Master Course": {
      topics: [
        "Machine Learning Fundamentals",
        "Python Programming for AI",
        "Data Science & Analytics",
        "Natural Language Processing (NLP)",
        "Computer Vision Applications",
        "Deep Learning & Neural Networks",
        "AI Model Development & Training",
        "AI Automation Tools & Workflows",
        "AI Ethics & Responsible Development",
        "Real-World AI Project Implementation",
      ],
    },
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
    const topicsCloseBtn = topicsModal.querySelector(".close-btn");

    // Add event listeners to "View Details" buttons
    document.querySelectorAll(".view-details-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const courseName = this.getAttribute("data-course");
        showCourseTopics(courseName);
      });
    });

    // Topics modal close events
    if (topicsCloseBtn) {
      topicsCloseBtn.addEventListener("click", function () {
        topicsModal.style.display = "none";
      });
    }

    topicsModal.addEventListener("click", function (event) {
      if (event.target === topicsModal) {
        topicsModal.style.display = "none";
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

  // Close modals with Escape key
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
// Close Button Fix - Add this to your script.js file

document.addEventListener("DOMContentLoaded", function () {
    // Initialize close button functionality for all modals
    initModalCloseFunctionality();
});

function initModalCloseFunctionality() {
    // Function to close any modal
    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
        }
    }

    // Handle all close buttons - multiple selectors for different modal types
    const closeButtons = document.querySelectorAll(`
        .close-btn, 
        .close-modal, 
        #closeModal, 
        .close-popup,
        .close-image-modal
    `);
    
    console.log('Found close buttons:', closeButtons.length); // Debug line

    closeButtons.forEach((closeBtn, index) => {
        console.log(`Setting up close button ${index}:`, closeBtn); // Debug line
        
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Close button clicked:', this); // Debug line
            
            // Find the parent modal
            let modal = this.closest('.modal');
            if (!modal) {
                modal = this.closest('.course-details-modal');
            }
            if (!modal) {
                modal = this.closest('[role="dialog"]');
            }
            if (!modal) {
                // Fallback - find any visible modal
                modal = document.querySelector('.modal[style*="display: block"]') || 
                        document.querySelector('.course-details-modal.active') ||
                        document.querySelector('#courseModal');
            }
            
            console.log('Found modal to close:', modal); // Debug line
            closeModal(modal);
        });
    });

    // Handle clicks outside modal (backdrop click)
    document.addEventListener('click', function(e) {
        // Check if clicked element is a modal backdrop
        if (e.target.classList.contains('modal') || 
            e.target.classList.contains('course-details-modal')) {
            closeModal(e.target);
        }
    });

    // Handle Escape key for all modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Find any open modal
            const openModals = document.querySelectorAll(`
                .modal[style*="display: block"],
                .course-details-modal.active,
                #courseModal[style*="display: block"]
            `);
            
            openModals.forEach(modal => closeModal(modal));
        }
    });

    // Specific fix for your course details modals
    const topicsModal = document.querySelector('#courseModal.modal');
    const tiersModal = document.querySelector('.course-details-modal');
    
    // Topics Modal (View Details) - direct selector fix
    if (topicsModal) {
        const topicsCloseBtn = topicsModal.querySelector('.close-btn');
        if (topicsCloseBtn) {
            topicsCloseBtn.onclick = function() {
                console.log('Topics modal close clicked'); // Debug
                topicsModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            };
        }
    }

    // Tiers Modal (Learn More) - direct selector fix
    if (tiersModal) {
        const tiersCloseBtn = tiersModal.querySelector('#closeModal');
        if (tiersCloseBtn) {
            tiersCloseBtn.onclick = function() {
                console.log('Tiers modal close clicked'); // Debug
                tiersModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            };
        }
    }

    // Enrollment modal close fix
    const enrollmentModal = document.getElementById('enrollmentModal');
    if (enrollmentModal) {
        const enrollCloseBtn = enrollmentModal.querySelector('.close-modal');
        if (enrollCloseBtn) {
            enrollCloseBtn.onclick = function() {
                console.log('Enrollment modal close clicked'); // Debug
                enrollmentModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            };
        }
    }
}

// Alternative approach - Force override any existing close button handlers
function forceCloseButtonFix() {
    setTimeout(() => {
        // Get all close buttons again after page is fully loaded
        const allCloseButtons = document.querySelectorAll('button, [role="button"]');
        
        allCloseButtons.forEach(btn => {
            const buttonText = btn.textContent.trim();
            const hasCloseClass = btn.className.includes('close');
            const hasCloseSymbol = buttonText.includes('×') || buttonText.includes('✕');
            
            if (hasCloseClass || hasCloseSymbol) {
                console.log('Force-fixing close button:', btn);
                
                // Remove all existing event listeners
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                
                // Add new event listener
                newBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close all open modals
                    const modals = document.querySelectorAll('.modal, .course-details-modal');
                    modals.forEach(modal => {
                        modal.style.display = 'none';
                        modal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    });
                });
            }
        });
    }, 1000);
}

// Run both fixes
document.addEventListener("DOMContentLoaded", function() {
    initModalCloseFunctionality();
    forceCloseButtonFix();
});