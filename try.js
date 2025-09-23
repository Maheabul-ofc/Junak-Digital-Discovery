// Modal functionality for both Home and Course pages
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('courseModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = modal.querySelector('button[aria-label="Close modal"]');
    const modalEnrollBtn = document.getElementById('modalEnrollBtn');
    
    // Function to open modal with course details
    function openCourseModal(courseName) {
        if (courseDetails[courseName]) {
            const course = courseDetails[courseName];
            
            // Set modal title
            modalTitle.textContent = courseName.toUpperCase() + ' - COURSE DETAILS';
            
            // Clear and populate modal body
            modalBody.innerHTML = '';
            const topicsList = document.createElement('ul');
            topicsList.style.cssText = 'list-style: none; padding: 0; margin: 0;';
            
            course.topics.forEach(topic => {
                const listItem = document.createElement('li');
                
                // Check if it's a month title
                if (topic.includes("class='month-title'") || topic.includes('MONTH')) {
                    listItem.style.cssText = `
                        padding: 20px 0 10px 0;
                        font-weight: bold;
                        font-size: 1.2rem;
                        color: #2E8B57;
                        border-bottom: 2px solid #2E8B57;
                        margin-bottom: 15px;
                        text-transform: uppercase;
                    `;
                    listItem.innerHTML = topic;
                } else {
                    listItem.style.cssText = `
                        padding: 15px 20px;
                        margin-bottom: 8px;
                        background: white;
                        border-radius: 12px;
                        border-left: 5px solid #2E8B57;
                        display: flex;
                        align-items: center;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                        transition: all 0.3s ease;
                    `;
                    
                    listItem.innerHTML = `
                        <span style="color: #2E8B57; font-weight: bold; margin-right: 15px; font-size: 1.2rem; background: #f0f8f0; border-radius: 50%; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center;">✓</span>
                        ${topic}
                    `;
                    
                    // Add hover effect
                    listItem.addEventListener('mouseenter', function() {
                        this.style.transform = 'translateX(5px)';
                        this.style.boxShadow = '0 4px 12px rgba(46, 139, 87, 0.15)';
                    });
                    
                    listItem.addEventListener('mouseleave', function() {
                        this.style.transform = 'translateX(0)';
                        this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                    });
                }
                
                topicsList.appendChild(listItem);
            });
            
            modalBody.appendChild(topicsList);
            
            // Set up enroll button
            modalEnrollBtn.onclick = function() {
                // Handle enrollment - you can add your enrollment logic here
                alert('Enrollment functionality for ' + courseName);
                modal.style.display = 'none';
            };
            
            // Show modal
            modal.style.display = 'block';
        } else {
            console.error('Course details not found for:', courseName);
            alert('Course details not available for: ' + courseName);
        }
    }
    
    // Add event listeners for all "View Details" buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-details-btn')) {
            e.preventDefault();
            const courseName = e.target.getAttribute('data-course');
            if (courseName) {
                openCourseModal(courseName);
            }
        }
    });
    
    // Close modal functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});

// Add CSS styles for month titles
const style = document.createElement('style');
style.textContent = `
    .month-title {
        font-weight: bold;
        font-size: 1.2rem;
        color: #2E8B57;
        display: block;
        padding: 20px 0 10px 0;
        border-bottom: 2px solid #2E8B57;
        margin-bottom: 15px;
        text-transform: uppercase;
    }
`;
document.head.appendChild(style);