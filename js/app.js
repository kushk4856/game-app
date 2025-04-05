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
    
    // heroCards.forEach(card => {
    //     card.addEventListener('mouseenter', () => {
    //         gsap.to(card, {
    //             y: -0,
    //             scale: 1.02,
    //             boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
    //             duration: 0.3,
    //             ease: 'power2.out'
    //         });
    //     });
        
    //     card.addEventListener('mouseleave', () => {
    //         gsap.to(card, {
    //             y: 0,
    //             scale: 1,
    //             boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    //             duration: 0.3,
    //             ease: 'power2.out'
    //         });
    //     });
    // });

    // Stagger animation for app cards on page load
    const appCards = document.querySelectorAll('.bg-white.dark\\:bg-dark-card');
    
    // gsap.from(appCards, {
    //     y: 30,
    //     opacity: 0,
    //     duration: 0.6,
    //     stagger: 0.1,
    //     ease: 'power2.out',
    //     delay: 0.2
    // });
    
    // Preload images for smooth transitions
    // const imageUrls = document.querySelectorAll('img');
    // imageUrls.forEach(img => {
    //     const tempImg = new Image();
    //     tempImg.src = img.src;
    // });
});

// ===navbar === 



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

//   ======================= switch tab navbar ================ 
document.addEventListener("DOMContentLoaded", function() {
    const tab_bar_background = document.querySelector('.tab_bar-background');
    const tab_bar_navItems = document.querySelectorAll('.tab_bar-item');
    const tab_bar_navbar = document.querySelector('.tab_bar-navigation');
    const tab_bar_scrollContainer = document.querySelector('.tab_bar-scroll-container');
    
    // Calculate initial measurements
    function tab_bar_updateLayout() {
      // Calculate widths
      const tab_bar_navWidth = tab_bar_navbar.offsetWidth;
      const tab_bar_itemWidth = tab_bar_navWidth / tab_bar_navItems.length;
      
      // Get active index
      const tab_bar_activeIndex = Array.from(tab_bar_navItems).findIndex(item => item.classList.contains('active'));
      
      // Update background position
      tab_bar_updateBackgroundPosition(tab_bar_activeIndex);
    }
    
    // Function to update background position
    function tab_bar_updateBackgroundPosition(index) {
      // Get the active item
      const tab_bar_activeItem = tab_bar_navItems[index];
      
      // Calculate the width of the active item
      const tab_bar_itemWidth = tab_bar_activeItem.offsetWidth;
      
      // Get the exact position (left offset) of the active item
      const tab_bar_itemLeft = tab_bar_activeItem.offsetLeft;
      
      // Make the background slightly narrower than the item for better aesthetics
      const tab_bar_backgroundWidth = tab_bar_itemWidth * 0.95;
      
      // Update background width and position
      tab_bar_background.style.width = tab_bar_backgroundWidth + 'px';
      tab_bar_background.style.left = (tab_bar_itemLeft + (tab_bar_itemWidth - tab_bar_backgroundWidth) / 2) + 'px';
      
      // Scroll the active tab into view with smooth behavior
      scrollTabIntoView(tab_bar_activeItem);
    }
    
    // Function to scroll tab into view
    function scrollTabIntoView(tabElement) {
      const scrollContainer = tab_bar_scrollContainer;
      const tabLeft = tabElement.offsetLeft;
      const tabWidth = tabElement.offsetWidth;
      const containerWidth = scrollContainer.offsetWidth;
      const scrollLeft = scrollContainer.scrollLeft;
      
      // Calculate the center position for the tab
      const desiredScrollPosition = tabLeft - (containerWidth / 2) + (tabWidth / 2);
      
      // Scroll smoothly to the new position
      scrollContainer.scrollTo({
        left: desiredScrollPosition,
        behavior: 'smooth'
      });
    }
    
    // Initialize layout
    setTimeout(tab_bar_updateLayout, 100); // Small delay to ensure DOM has updated
    
    // Add click event listeners
    tab_bar_navItems.forEach((item, index) => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all items
        tab_bar_navItems.forEach(navItem => navItem.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Move background
        tab_bar_updateBackgroundPosition(index);
        
        // Update content (in a real app, this would probably load different content)
        const tab_bar_contentId = this.getAttribute('href').substring(1);
        document.querySelector('.content-section').id = tab_bar_contentId + '-content';
        document.querySelector('h1').textContent = this.textContent;
      });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      setTimeout(tab_bar_updateLayout, 100); // Small delay to ensure DOM has updated
    });
    
    // Force layout update on orientation change for mobile devices
    window.addEventListener('orientationchange', function() {
      setTimeout(tab_bar_updateLayout, 200); // Longer delay for orientation changes
    });
  });






  
//   ============================testimonial carausel === 

document.addEventListener('DOMContentLoaded', function() {
    const testimonialCarousel = new Swiper('#testimonial_carousel_swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      navigation: {
        nextEl: '#testimonial_carousel_button_next',
        prevEl: '#testimonial_carousel_button_prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      }
    });
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

  //   ===========faq tab section ==== 
  document.addEventListener("DOMContentLoaded", function() {
    const faq_tab_background = document.querySelector('.faq_tab-background');
    const faq_tab_navItems = document.querySelectorAll('.faq_tab-item');
    const faq_tab_navbar = document.querySelector('.faq_tab-navigation');
    const faq_tab_contents = document.querySelectorAll('.faq_tab-content');
    
    // Function to check if we're in mobile view
    function faq_tab_isMobileView() {
        return window.innerWidth <= 768;
    }
    
    // Calculate initial measurements
    function faq_tab_updateLayout() {
        // Only update background position in desktop view
        if (!faq_tab_isMobileView()) {
            // Get active index
            const faq_tab_activeIndex = Array.from(faq_tab_navItems).findIndex(item => item.classList.contains('active'));
            
            // Update background position
            faq_tab_updateBackgroundPosition(faq_tab_activeIndex);
        } else {
            // In mobile view, hide the main background element
            faq_tab_background.style.display = 'none';
        }
        
        // Scroll active tab into view in mobile
        if (faq_tab_isMobileView()) {
            const faq_tab_activeIndex = Array.from(faq_tab_navItems).findIndex(item => item.classList.contains('active'));
            const activeTab = faq_tab_navItems[faq_tab_activeIndex];
            
            setTimeout(() => {
                activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }, 100);
        }
    }
    
    // Function to update background position (desktop only)
    function faq_tab_updateBackgroundPosition(index) {
        if (faq_tab_isMobileView()) return;
        
        const activeTab = faq_tab_navItems[index];
        
        // Show the background element in desktop
        faq_tab_background.style.display = 'block';
        
        // Get the actual width and position of the active tab
        const activeRect = activeTab.getBoundingClientRect();
        const navbarRect = faq_tab_navbar.getBoundingClientRect();
        
        // Calculate the width and left position for the background
        const bgWidth = activeRect.width;
        const bgLeft = activeTab.offsetLeft;
        
        // Apply to background
        faq_tab_background.style.width = bgWidth + 'px';
        faq_tab_background.style.left = bgLeft + 'px';
    }
    
    // Function to show tab content
    function faq_tab_showContent(index) {
        // Hide all content sections
        faq_tab_contents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Show the selected content
        const targetId = faq_tab_navItems[index].getAttribute('href').substring(1);
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }
    
    // Set initial active tab (first tab)
    if (faq_tab_navItems.length > 0) {
        // Remove active class from all items first
        faq_tab_navItems.forEach(navItem => navItem.classList.remove('active'));
        
        // Add active class to first tab
        faq_tab_navItems[0].classList.add('active');
        
        // Show first tab content
        faq_tab_showContent(0);
    }
    
    // Initialize layout
    faq_tab_updateLayout();
    
    // Add click event listeners for tabs
    faq_tab_navItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            faq_tab_navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Move background (desktop only)
            if (!faq_tab_isMobileView()) {
                faq_tab_updateBackgroundPosition(index);
            }
            
            // Show corresponding content
            faq_tab_showContent(index);
            
            // Scroll item into view on mobile
            if (faq_tab_isMobileView()) {
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }, 100);
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        faq_tab_updateLayout();
    });
    
    // Force layout update on orientation change for mobile devices
    window.addEventListener('orientationchange', function() {
        setTimeout(faq_tab_updateLayout, 100); // Small delay to ensure DOM has updated
    });
});



// ============= app listing form ============ 
document.addEventListener('DOMContentLoaded', function() {
  // Handle file uploads
  const fileInputs = [
      {
          input: document.getElementById('app_listing-logo-upload'),
          display: document.getElementById('app_listing-logo-file-name')
      },
      {
          input: document.getElementById('app_listing-images-upload'),
          display: document.getElementById('app_listing-images-file-name')
      },
      {
          input: document.getElementById('app_listing-awards-upload'),
          display: document.getElementById('app_listing-awards-file-name')
      }
  ];
  
  fileInputs.forEach(item => {
      item.input.addEventListener('change', function() {
          if (this.files.length > 0) {
              if (this.files.length === 1) {
                  item.display.textContent = this.files[0].name;
              } else {
                  item.display.textContent = `${this.files.length} files selected`;
              }
          } else {
              item.display.textContent = '';
          }
      });
  });
  
  // Handle form submission
  const form = document.getElementById('app_listing-form');
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Add your form submission logic here
      alert('Form submitted successfully!');
  });
  
  // Input focus effect
  const inputs = document.querySelectorAll('.app_listing-input');
  inputs.forEach(input => {
      input.addEventListener('focus', function() {
          this.classList.add('active');
      });
      
      input.addEventListener('blur', function() {
          if (this.value === '') {
              this.classList.remove('active');
          }
      });
  });
});







//  ============================= search form ========================== 

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





// ========================== redirection delay == 
function delayedRedirect(event, url) {
    event.preventDefault(); // Prevent default navigation
    setTimeout(() => {
      window.location.href = url; // Redirect after 2 seconds
    }, 500);
  }



