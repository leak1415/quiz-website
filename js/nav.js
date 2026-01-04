// Additional navigation functionality that doesn't conflict with home.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile dropdown toggle - only add if not already handled by home.js
    const dropDowns = document.querySelectorAll('.drop-down');
    
    dropDowns.forEach(dropDown => {
        const dropBtn = dropDown.querySelector('.dropbtn');
        const dropContent = dropDown.querySelector('.dropdown-content');
        
        if (dropBtn && dropContent) {
            dropBtn.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    e.stopPropagation();
                    // Toggle the dropdown for mobile view
                    dropDown.classList.toggle('active');
                }
            });
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        dropDowns.forEach(dropDown => {
            const dropBtn = dropDown.querySelector('.dropbtn');
            const dropContent = dropDown.querySelector('.dropdown-content');
            
            if (dropDown && !dropDown.contains(event.target)) {
                if (dropDown.classList.contains('active')) {
                    dropDown.classList.remove('active');
                }
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });
});