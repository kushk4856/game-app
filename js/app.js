document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle with proper function and local storage
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or use preferred-color-scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
        // Check user preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlElement.classList.toggle('dark', prefersDark);
        localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }

    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        localStorage.setItem('theme', htmlElement.classList.contains('dark') ? 'dark' : 'light');
    });

    // Mobile Menu Toggle with smoother animation using GSAP
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        if (mobileMenu.classList.contains('mobile-menu-active')) {
            gsap.to(mobileMenu, {
                left: '-100%',
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    mobileMenu.classList.remove('mobile-menu-active');
                }
            });
        } else {
            mobileMenu.classList.add('mobile-menu-active');
            gsap.fromTo(mobileMenu, 
                { left: '-100%' },
                { left: 0, duration: 0.3, ease: 'power2.out' }
            );
        }
    });

    // Close mobile menu on click outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('mobile-menu-active') && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuButton.contains(e.target)) {
            gsap.to(mobileMenu, {
                left: '-100%',
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    mobileMenu.classList.remove('mobile-menu-active');
                }
            });
        }
    });

    // Smooth hover effects with GSAP for sidebar links
    // const sidebarLinks = document.querySelectorAll('.sidebar-link:not(.active)');
    
    // sidebarLinks.forEach(link => {
    //     link.addEventListener('mouseenter', () => {
    //         gsap.to(link, {
    //             x: 10,
    //             duration: 0.2,
    //             ease: 'power1.out',
    //             color: '#00A3FF'
    //         });
    //     });
        
    //     link.addEventListener('mouseleave', () => {
    //         gsap.to(link, {
    //             x: 0,
    //             duration: 0.2,
    //             ease: 'power1.out',
    //             color: 'inherit'
    //         });
    //     });
    // });

    // Hero card hover animation with GSAP
    const heroCards = document.querySelectorAll('.hero-card');
    
    heroCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -0,
                scale: 1.02,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Stagger animation for app cards on page load
    const appCards = document.querySelectorAll('.bg-white.dark\\:bg-dark-card');
    
    gsap.from(appCards, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2
    });
    
    // Preload images for smooth transitions
    const imageUrls = document.querySelectorAll('img');
    imageUrls.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.src;
    });
});

// ===navbar === 

// document.addEventListener("DOMContentLoaded", function() {
//     const background = document.querySelector('.background');
//     const navItems = document.querySelectorAll('.nav-item');
//     const navbar = document.querySelector('.navbar');
    
//     // Calculate initial measurements
//     function updateLayout() {
//       // Calculate equal widths
//       const navWidth = navbar.offsetWidth;
//       const itemWidth = navWidth / navItems.length;
      
//       // Set fixed width for background - slightly less than item width to create visual padding
//       const backgroundWidth = itemWidth  - 16; // Subtract for visual padding
//       background.style.width = backgroundWidth + 'px';
      
//       // Center the background under each nav item
//       const activeIndex = Array.from(navItems).findIndex(item => item.classList.contains('active'));
//       updateBackgroundPosition(activeIndex);
//     }
    
//     // Function to update background position
//     function updateBackgroundPosition(index) {
//       const navWidth = navbar.offsetWidth;
//       const itemWidth = navWidth / navItems.length;
//       const backgroundWidth = itemWidth - 16;
      
//       // Calculate center point of the nav item
//       const itemCenter = (index * itemWidth) + (itemWidth / 2);
      
//       // Position background centered on the item center
//       const leftPos = itemCenter - (backgroundWidth / 2);
//       background.style.left = leftPos + 'px';
//     }
    
//     // Initialize layout
//     updateLayout();
    
//     // Add click event listeners
//     navItems.forEach((item, index) => {
//       item.addEventListener('click', function() {
//         // Remove active class from all items
//         navItems.forEach(navItem => navItem.classList.remove('active'));
        
//         // Add active class to clicked item
//         this.classList.add('active');
        
//         // Move background
//         updateBackgroundPosition(index);
//       });
//     });
    
//     // Handle window resize
//     window.addEventListener('resize', updateLayout);
//   });

document.addEventListener("DOMContentLoaded", function() {
    const background = document.querySelector('.background');
    const navItems = document.querySelectorAll('.nav-item');
    const navbar = document.querySelector('.navbar');
    
    // Calculate initial measurements
    function updateLayout() {
      // Calculate equal widths
      const navWidth = navbar.offsetWidth;
      const itemWidth = navWidth / navItems.length;
      
      // Get active index
      const activeIndex = Array.from(navItems).findIndex(item => item.classList.contains('active'));
      
      // Special handling for width based on which item is active
      updateBackgroundPosition(activeIndex);
    }
    
    // Function to update background position
    function updateBackgroundPosition(index) {
      const navWidth = navbar.offsetWidth;
      const itemWidth = navWidth / navItems.length;
      const lastIndex = navItems.length - 1;
      
      // Determine background width based on which item is active
      let backgroundWidth;
      let offsetAdjustment = 0;
      
      if (index === lastIndex) {
        // Don't subtract width for the last item to avoid extra padding at the end
        backgroundWidth = itemWidth - 8;
        offsetAdjustment = -6;
      } else if (index === 0) {
        // For first item, use standard width but add left padding
        backgroundWidth = itemWidth - 8;
        offsetAdjustment = 8; // Add 8px padding on the left side
      } else {
        // For other items, subtract as before
        backgroundWidth = itemWidth ;
      }
      
      // Update background width
      background.style.width = backgroundWidth + 'px';
      
      // Calculate center point of the nav item
      const itemCenter = (index * itemWidth) + (itemWidth / 2);
      
      // Position background centered on the item center, plus any offset adjustment
      const leftPos = itemCenter - (backgroundWidth / 2) + offsetAdjustment;
      background.style.left = leftPos + 'px';
    }
    
    // Initialize layout
    updateLayout();
    
    // Add click event listeners
    navItems.forEach((item, index) => {
      item.addEventListener('click', function() {
        // Remove active class from all items
        navItems.forEach(navItem => navItem.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Move background
        updateBackgroundPosition(index);
      });
    });
    
    // Handle window resize
    window.addEventListener('resize', updateLayout);
  });



//   search form ========================== 

  // Sample data for subcategories
  const subCategories = {
    games: ['Action', 'Adventure', 'Arcade', 'Puzzle', 'Racing', 'Role Playing', 'Strategy'],
    productivity: ['Calendar', 'Notes', 'Planner', 'Project Management', 'To-do Lists'],
    education: ['Languages', 'Math', 'Science', 'Coding', 'History'],
    social: ['Messaging', 'Dating', 'Forums', 'Social Networks'],
    entertainment: ['Music', 'Video', 'Streaming', 'Photo']
};

// Sample apps data
const sampleApps = [
    { name: 'Puzzle Quest', category: 'Games', subCategory: 'Puzzle', rating: 4.5, users: '10M+' },
    { name: 'Task Master', category: 'Productivity', subCategory: 'To-do Lists', rating: 4.8, users: '5M+' },
    { name: 'Language Pro', category: 'Education', subCategory: 'Languages', rating: 4.2, users: '2M+' },
    { name: 'Chat Connect', category: 'Social', subCategory: 'Messaging', rating: 3.9, users: '50M+' },
    { name: 'Music Stream', category: 'Entertainment', subCategory: 'Music', rating: 4.7, users: '20M+' },
    { name: 'Math Wizard', category: 'Education', subCategory: 'Math', rating: 4.1, users: '500K+' }
];

// DOM elements
const categorySelect = document.getElementById('category');
const subCategorySelect = document.getElementById('subCategory');
const searchForm = document.getElementById('searchForm');
const resultsContainer = document.getElementById('results');
const resultsList = document.getElementById('resultsList');

// Populate subcategories based on selected category
categorySelect.addEventListener('change', function() {
    const category = this.value;
    
    // Clear current options
    subCategorySelect.innerHTML = '<option value="">Select Sub Category</option>';
    
    if (category && subCategories[category]) {
        // Enable the select element
        subCategorySelect.disabled = false;
        
        // Add new options
        subCategories[category].forEach(subCat => {
            const option = document.createElement('option');
            option.value = subCat.toLowerCase().replace(' ', '-');
            option.textContent = subCat;
            subCategorySelect.appendChild(option);
        });
    } else {
        // Disable if no category selected
        subCategorySelect.disabled = true;
    }
});

// Form submission
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show results container
    resultsContainer.style.display = 'block';
    
    // Clear previous results
    resultsList.innerHTML = '';
    
    // In a real app, you would filter based on form values
    // For this demo, we'll just display all sample apps
    sampleApps.forEach(app => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card';
        
        const starRating = '★'.repeat(Math.floor(app.rating)) + 
                          (app.rating % 1 >= 0.5 ? '½' : '') +
                          '☆'.repeat(5 - Math.ceil(app.rating));
        
        appCard.innerHTML = `
            <div class="app-name">${app.name}</div>
            <div class="app-category">${app.category} > ${app.subCategory}</div>
            <div class="app-rating">
                <span class="stars">${starRating}</span>
                <span>${app.rating}</span>
            </div>
            <div class="users">${app.users} users</div>
        `;
        
        resultsList.appendChild(appCard);
    });

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
});



// ========================= faq accordion ============ 
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Set initial states
    faqItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        const content = item.querySelector('.faq-answer-content');
        
        if (item.classList.contains('active')) {
            answer.style.maxHeight = content.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0px';
        }
    });
    
    // Add click event listeners
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-answer').style.maxHeight = '0px';
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                const content = item.querySelector('.faq-answer-content');
                answer.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});