document.addEventListener('DOMContentLoaded', () => {


    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const toggleIcon = mobileToggle.querySelector('i');
    const overlay = document.getElementById('nav-overlay');

    function toggleMenu() {
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');

        if (navMenu.classList.contains('active')) {
            toggleIcon.classList.replace('fa-bars', 'fa-times');
        } else {
            toggleIcon.classList.replace('fa-times', 'fa-bars');
        }
    }

    mobileToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu); // ஓவர்லே கிளிக் செய்தால் மெனு மூடும்


    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {

            navLinks.forEach(item => item.classList.remove('active'));


            this.classList.add('active');


            if (window.innerWidth <= 991) {
                toggleMenu();
            }
        });
    });
});




document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50
    });
});







function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHtml = '';

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    return starsHtml;
}


async function fetchNewArrivals() {
    const grid = document.getElementById('new-arrivals-grid');
    const loader = document.getElementById('loading-state');
    const errorDiv = document.getElementById('error-state');

    try {


        const response = await fetch('https://dummyjson.com/products?limit=8&skip=20');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const products = data.products;


        loader.style.display = 'none';


        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';


            const formattedCategory = product.category.replace('-', ' ');

            card.innerHTML = `
                <div class="product-img-wrapper">
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <div class="product-actions">
                        <a href="404.html" class="action-btn" title="Add to Wishlist" onclick="console.log('Wishlist ID:', ${product.id})">
                            <i class="far fa-heart"></i>
                        </>
                        <a href="404.html" class="action-btn" title="Add to Cart" onclick="console.log('Cart ID:', ${product.id})">
                            <i class="fas fa-shopping-bag"></i>
                        </>
                        <a href="404.html" class="action-btn" title="Quick View">
                            <i class="far fa-eye"></i>
                        </a>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${formattedCategory}</span>
                    <h3 class="product-title" title="${product.title}">${product.title}</h3>
                    <div class="product-rating">
                        ${generateStars(product.rating)} <span>(${product.rating})</span>
                    </div>
                    <div class="product-price">$${product.price}</div>
                </div>
            `;

            grid.appendChild(card);
        });

    } catch (error) {

        loader.style.display = 'none';
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Failed to load products. Please check your internet connection.`;
        console.error('API Fetch Error:', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {



    fetchNewArrivals();
});





let trendingProductsData = []; // Store fetched data globally for filtering

async function fetchTrendingProducts() {
    const grid = document.getElementById('trending-grid');
    const loader = document.getElementById('trending-loading');
    const errorDiv = document.getElementById('trending-error');

    try {

        const response = await fetch('https://dummyjson.com/products/category/womens-dresses'); // DummyJSON specific categories
        const response2 = await fetch('https://dummyjson.com/products/category/mens-shirts');
        const response3 = await fetch('https://dummyjson.com/products/category/womens-shoes');
        const response4 = await fetch('https://dummyjson.com/products/category/tops');

        if (!response.ok || !response2.ok || !response3.ok || !response4.ok) throw new Error('API Error');

        const data1 = await response.json();
        const data2 = await response2.json();
        const data3 = await response3.json();
        const data4 = await response4.json();


        trendingProductsData = [...data1.products, ...data2.products, ...data3.products, ...data4.products];


        loader.style.display = 'none';


        renderTrendingProducts('all');

    } catch (error) {
        loader.style.display = 'none';
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Failed to load trending products.`;
        console.error('Trending Fetch Error:', error);
    }
}

function renderTrendingProducts(categoryFilter) {
    const grid = document.getElementById('trending-grid');
    grid.innerHTML = ''; // Clear existing items


    let filteredProducts = trendingProductsData;
    if (categoryFilter !== 'all') {
        filteredProducts = trendingProductsData.filter(product => product.category === categoryFilter);
    }


    const productsToDisplay = filteredProducts.slice(0, 8);

    if (productsToDisplay.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color: var(--text-gray); font-size: 16px;">No products found in this category.</p>`;
        return;
    }


    productsToDisplay.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        const formattedCategory = product.category.replace('-', ' ');

        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${product.thumbnail}" alt="${product.title}">
                <div class="product-actions">
                    <a href="404.html" class="action-btn" title="Add to Wishlist"><i class="far fa-heart"></i></a>
                    <a href="404.html" class="action-btn" title="Add to Cart"><i class="fas fa-shopping-bag"></i></a>
                    <a href="404.html" class="action-btn" title="Quick View"><i class="far fa-eye"></i></a>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${formattedCategory}</span>
                <h3 class="product-title" title="${product.title}">${product.title}</h3>
                <div class="product-rating">
                    ${generateStars(product.rating)} <span>(${product.rating})</span>
                </div>
                <div class="product-price">$${product.price}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}


document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {

        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));


        e.target.classList.add('active');


        const filterCategory = e.target.getAttribute('data-filter');
        renderTrendingProducts(filterCategory);
    });
});


document.addEventListener('DOMContentLoaded', () => {



    fetchNewArrivals();
    fetchTrendingProducts(); // <--- இத புதுசா ஆட் பண்ணிக்கோங்க
});






async function fetchBestSellers() {
    const grid = document.getElementById('bestsellers-grid');
    const loader = document.getElementById('bestsellers-loading');
    const errorDiv = document.getElementById('bestsellers-error');

    try {

        const response = await fetch('https://dummyjson.com/products?limit=20&skip=60');
        if (!response.ok) throw new Error('API Error');

        const data = await response.json();


        const sortedProducts = data.products.sort((a, b) => b.rating - a.rating);


        const topBestSellers = sortedProducts.slice(0, 4);


        loader.style.display = 'none';


        topBestSellers.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            const formattedCategory = product.category.replace('-', ' ');

            card.innerHTML = `
                <div class="product-img-wrapper">
                    <span class="bestseller-badge">Hot</span>  
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <div class="product-actions">
                        <a href="404.html" class="action-btn" title="Add to Wishlist"><i class="far fa-heart"></i></a>
                        <a href="404.html" class="action-btn" title="Add to Cart"><i class="fas fa-shopping-bag"></i></a>
                        <a href="404.html" class="action-btn" title="Quick View"><i class="far fa-eye"></i></a>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${formattedCategory}</span>
                    <h3 class="product-title" title="${product.title}">${product.title}</h3>
                    <div class="product-rating">
                        ${generateStars(product.rating)} <span>(${product.rating})</span>
                    </div>
                    <div class="product-price">$${product.price}</div>
                </div>
            `;
            grid.appendChild(card);
        });

    } catch (error) {
        loader.style.display = 'none';
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Failed to load best sellers.`;
        console.error('Best Sellers Fetch Error:', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {

    fetchNewArrivals();
    fetchTrendingProducts();


    fetchBestSellers();
});





document.addEventListener('DOMContentLoaded', () => {


    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            const email = document.getElementById('newsletter-email').value;


            alert(`Awesome! Thank you for subscribing with ${email}. Check your inbox for the discount code!`);


            newsletterForm.reset();
        });
    }
});





document.addEventListener('DOMContentLoaded', () => {


    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const messageDiv = document.getElementById('newsletter-message');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload

            const emailValue = emailInput.value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            messageDiv.className = 'form-message';

            if (emailValue === '') {

                messageDiv.textContent = 'Oops! Email address cannot be empty.';
                messageDiv.classList.add('error');
            }
            else if (!emailRegex.test(emailValue)) {

                messageDiv.textContent = 'Please enter a valid email address (e.g., name@example.com).';
                messageDiv.classList.add('error');
            }
            else {

                messageDiv.textContent = 'Awesome! You have successfully subscribed.';
                messageDiv.classList.add('success');


                newsletterForm.reset();


                setTimeout(() => {
                    messageDiv.classList.remove('success');
                    window.location.href = '404.html';
                    messageDiv.textContent = '';
                }, 4000);
            }
        });
    }
});