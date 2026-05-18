// ===== PRODUCT DATABASE =====
const products = [
    {
        id: 1,
        name: "Elegant Watch",
        category: "Accessories",
        price: 139,
        originalPrice: 199,
        rating: 5,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        isSale: true
    },
    {
        id: 2,
        name: "Classic Sunglasses",
        category: "Accessories",
        price: 89,
        originalPrice: 89,
        rating: 4,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
        isSale: false
    },
    {
        id: 3,
        name: "Designer Handbag",
        category: "Bags",
        price: 224,
        originalPrice: 299,
        rating: 5,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop",
        isSale: true
    },
    {
        id: 4,
        name: "Premium Sneakers",
        category: "Shoes",
        price: 120,
        originalPrice: 120,
        rating: 4,
        image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=300&fit=crop",
        isSale: false
    },
    {
        id: 5,
        name: "Leather Belt",
        category: "Accessories",
        price: 49,
        originalPrice: 70,
        rating: 4,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
        isSale: true
    },
    {
        id: 6,
        name: "Silk Scarf",
        category: "Accessories",
        price: 65,
        originalPrice: 95,
        rating: 5,
        image: "https://images.unsplash.com/photo-1609554544065-e91ef1e32f76?w=300&h=300&fit=crop",
        isSale: true
    },
    {
        id: 7,
        name: "Casual Backpack",
        category: "Bags",
        price: 85,
        originalPrice: 120,
        rating: 4,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
        isSale: true
    },
    {
        id: 8,
        name: "Formal Shoes",
        category: "Shoes",
        price: 159,
        originalPrice: 199,
        rating: 5,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop",
        isSale: true
    },
    {
        id: 9,
        name: "Summer Dress",
        category: "Clothing",
        price: 79,
        originalPrice: 119,
        rating: 4,
        image: "https://images.unsplash.com/photo-1612632411497-a0eca84b3f62?w=300&h=300&fit=crop",
        isSale: true
    },
    {
        id: 10,
        name: "Winter Coat",
        category: "Clothing",
        price: 249,
        originalPrice: 349,
        rating: 5,
        image: "https://images.unsplash.com/photo-1611203188811-0de2e970c8a4?w=300&h=300&fit=crop",
        isSale: true
    },
    {
        id: 11,
        name: "Polo Shirt",
        category: "Clothing",
        price: 45,
        originalPrice: 65,
        rating: 4,
        image: "https://images.unsplash.com/photo-1618873108127-d0864d47ab84?w=300&h=300&fit=crop",
        isSale: true
    },
    {
        id: 12,
        name: "Baseball Cap",
        category: "Accessories",
        price: 35,
        originalPrice: 50,
        rating: 3,
        image: "https://images.unsplash.com/photo-1614008375890-cb53b6c5f8d5?w=300&h=300&fit=crop",
        isSale: true
    }
];

// ===== STATE MANAGEMENT =====
let filteredProducts = [...products];
let currentFilters = {
    search: "",
    categories: ["All Categories"],
    maxPrice: 500,
    ratings: []
};

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', function() {
    // Only run on collections page
    if (document.getElementById('productsContainer')) {
        initializeCollectionsPage();
    }
    
    // Only run on contact page
    if (document.getElementById('contactForm')) {
        initializeContactPage();
    }

    // Mobile menu toggle
    initializeNavigation();
});

// ===== NAVIGATION =====
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// ===== COLLECTIONS PAGE =====
function initializeCollectionsPage() {
    // Display initial products
    displayProducts(products);

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', handleSearch);
    }

    // Category filter
    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', handleCategoryFilter);
    });

    // Price range filter
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            priceValue.textContent = this.value;
            currentFilters.maxPrice = parseInt(this.value);
            applyFilters();
        });
    }

    // Rating filter
    const ratingFilters = document.querySelectorAll('.rating-filter');
    ratingFilters.forEach(filter => {
        filter.addEventListener('change', handleRatingFilter);
    });

    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }

    // Reset filters button
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
}

// ===== SEARCH FUNCTION =====
function handleSearch(e) {
    currentFilters.search = e.target.value.toLowerCase().trim();
    applyFilters();
}

// ===== CATEGORY FILTER =====
function handleCategoryFilter(e) {
    const categoryFilters = document.querySelectorAll('.category-filter:checked');
    currentFilters.categories = Array.from(categoryFilters).map(filter => filter.value);
    
    // If "All Categories" is checked, select all categories
    if (currentFilters.categories.includes('All')) {
        currentFilters.categories = ['Accessories', 'Bags', 'Shoes', 'Clothing'];
    } else if (currentFilters.categories.length === 0) {
        // If nothing is selected, show no products
        currentFilters.categories = [];
    }
    
    applyFilters();
}

// ===== RATING FILTER =====
function handleRatingFilter(e) {
    const ratingFilters = document.querySelectorAll('.rating-filter:checked');
    currentFilters.ratings = Array.from(ratingFilters).map(filter => parseInt(filter.value));
    applyFilters();
}

// ===== APPLY ALL FILTERS =====
function applyFilters() {
    filteredProducts = products.filter(product => {
        // Search filter
        const matchesSearch = product.name.toLowerCase().includes(currentFilters.search) ||
                            product.category.toLowerCase().includes(currentFilters.search);

        // Category filter
        const matchesCategory = currentFilters.categories.length === 0 || 
                              currentFilters.categories.includes(product.category);

        // Price filter
        const matchesPrice = product.price <= currentFilters.maxPrice;

        // Rating filter
        const matchesRating = currentFilters.ratings.length === 0 ||
                            currentFilters.ratings.some(rating => product.rating >= rating);

        return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    displayProducts(filteredProducts);
}

// ===== SORT FUNCTION =====
function handleSort(e) {
    const sortValue = e.target.value;
    let sortedProducts = [...filteredProducts];

    switch(sortValue) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
        default:
            sortedProducts.sort((a, b) => b.id - a.id);
    }

    displayProducts(sortedProducts);
}

// ===== DISPLAY PRODUCTS =====
function displayProducts(productsToDisplay) {
    const container = document.getElementById('productsContainer');
    const noProducts = document.getElementById('noProducts');
    const productCount = document.getElementById('productCount');

    if (productsToDisplay.length === 0) {
        container.innerHTML = '';
        noProducts.style.display = 'block';
        productCount.textContent = '0';
        return;
    }

    noProducts.style.display = 'none';
    productCount.textContent = productsToDisplay.length;

    container.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.isSale ? `<span class="sale-badge">-${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="category">${product.category}</p>
                <div style="margin-bottom: 10px;">
                    <span style="color: #ffc107;">★ ${product.rating}</span>
                </div>
                <div class="price-section">
                    ${product.originalPrice !== product.price ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    <span class="sale-price">$${product.price}</span>
                </div>
                <button class="btn btn-secondary" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// ===== RESET FILTERS =====
function resetFilters() {
    // Reset search
    document.getElementById('searchInput').value = '';
    
    // Reset categories
    document.querySelectorAll('.category-filter').forEach(filter => {
        filter.checked = filter.value === 'All';
    });
    
    // Reset price
    document.getElementById('priceRange').value = 500;
    document.getElementById('priceValue').textContent = '500';
    
    // Reset ratings
    document.querySelectorAll('.rating-filter').forEach(filter => {
        filter.checked = false;
    });
    
    // Reset filters object
    currentFilters = {
        search: "",
        categories: ['Accessories', 'Bags', 'Shoes', 'Clothing'],
        maxPrice: 500,
        ratings: []
    };
    
    // Display all products
    displayProducts(products);
}

// ===== ADD TO CART =====
function addToCart(productName, price) {
    alert(`"${productName}" (${price}$) added to cart! 🛒`);
    // In a real application, this would add the item to a shopping cart
}

// ===== CONTACT PAGE =====
function initializeContactPage() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

// ===== CONTACT FORM SUBMISSION =====
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validation
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Phone validation (if provided)
    if (phone && !/^\d{10,}/.test(phone.replace(/\D/g, ''))) {
        showFormMessage('Please enter a valid phone number.', 'error');
        return;
    }

    // Simulate form submission
    showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon!', 'success');
    
    // Reset form
    document.getElementById('contactForm').reset();

    // Hide message after 5 seconds
    setTimeout(() => {
        document.getElementById('formMessage').style.display = 'none';
    }, 5000);
}

// ===== SHOW FORM MESSAGE =====
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

// ===== NEWSLETTER SUBSCRIPTION =====
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! 🎉`);
            this.reset();
        });
    }
});

// ===== SMOOTH SCROLLING & ANIMATIONS =====
// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
});