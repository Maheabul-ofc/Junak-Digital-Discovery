// Course details data
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

// Get modal elements
const modal = document.getElementById("courseModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalEnrollBtn = document.getElementById("modalEnrollBtn");
const closeBtn = document.querySelector(".close-btn");

// Add event listeners to all "View Details" buttons
document.querySelectorAll(".view-details-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const courseName = this.getAttribute("data-course");
    showCourseDetails(courseName);
  });
});

// Add event listeners to all "Enroll Now" buttons
document.querySelectorAll(".enroll-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const courseName = this.getAttribute("data-course");
    enrollInCourse(courseName);
  });
});

// Modal enroll button
modalEnrollBtn.addEventListener("click", function () {
  const courseName = modalTitle.textContent.replace(" - Course Details", "");
  enrollInCourse(courseName);
  modal.style.display = "none";
});

// Close modal events
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Function to show course details
function showCourseDetails(courseName) {
  const course = courseDetails[courseName];
  if (course) {
    modalTitle.textContent = `${courseName} - Course Details`;

    let topicsHtml =
      '<h4 style="color: #2c3e50; margin-bottom: 20px;">What you will learn:</h4>';
    topicsHtml += '<ul class="course-topics">';

    course.topics.forEach((topic) => {
      topicsHtml += `<li>${topic}</li>`;
    });

    topicsHtml += "</ul>";

    modalBody.innerHTML = topicsHtml;
    modal.style.display = "block";
  }
}

// Function to handle enrollment
function enrollInCourse(courseName) {
  alert(
    `Enrolling in ${courseName}. You will be redirected to the payment page.`
  );
  // Here you can add actual enrollment logic
}

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
  }
});
