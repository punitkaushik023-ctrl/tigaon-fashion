/* =========================================
   PRODUCTS
========================================= */
const products = [
    {
        id: 1,
        name: "Formal Cloth",
        price: 699,
        category: "Shirts",
        image: "formal cloth.jpg",
        description: "Smart formal wear for a clean and classic look.",
        rating: 4.5
    },
    {
        id: 2,
        name: "Shirt for Men",
        price: 599,
        category: "Shirts",
        image: "shirt for men.jpg",
        description: "Comfortable men's shirt for everyday wear.",
        rating: 4.3
    },
    {
        id: 3,
        name: "White Shirt",
        price: 649,
        category: "Shirts",
        image: "white shirt.jpg",
        description: "Classic white shirt for formal and casual occasions.",
        rating: 4.7
    },
    {
        id: 4,
        name: "Decent Shirt for Men",
        price: 699,
        category: "Shirts",
        image: "decent shirt for men.jpg",
        description: "Simple and stylish shirt for men.",
        rating: 4.4
    },
    {
        id: 5,
        name: "Printed Shirt",
        price: 749,
        category: "Shirts",
        image: "printed shirt.jpg",
        description: "Trendy printed shirt for a stylish casual look.",
        rating: 4.6
    },
    {
        id: 6,
        name: "Blue Shirt",
        price: 649,
        category: "Shirts",
        image: "blue shirt.jpg",
        description: "Stylish blue shirt for everyday fashion.",
        rating: 4.5
    },
    {
        id: 7,
        name: "Sky Blue Pant",
        price: 899,
        category: "Pants",
        image: "sky blue pant.jpg",
        description: "Comfortable sky blue pants with a modern look.",
        rating: 4.4
    },
    {
        id: 8,
        name: "Formal Pant",
        price: 999,
        category: "Pants",
        image: "formal pant.jpg",
        description: "Classic formal pants for office and occasions.",
        rating: 4.6
    },
    {
        id: 9,
        name: "Green Bellbottom",
        price: 1099,
        category: "Pants",
        image: "green bellbottom.jpg",
        description: "Trendy green bellbottom pants with a stylish look.",
        rating: 4.5
    }
];
/* =========================================
   CART + WISHLIST
========================================= */
let cart = [];
let wishlist = [];
/* =========================================
   ELEMENTS
========================================= */
const productContainer =
    document.getElementById("product-list");
const searchBox =
    document.getElementById("search");
/* =========================================
   SHOP NOW
========================================= */
function goToProducts() {
    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}
/* =========================================
   WHATSAPP
========================================= */
function openWhatsApp() {
    const phoneNumber =
        "919354047607";
    const message =
        "Hello, I want information about your clothing products.";
    const url =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}
/* =========================================
   GOOGLE MAPS
========================================= */
function openMaps() {
    const address =
        "Tigaon, Faridabad, Haryana";
    const url =
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, "_blank");
}
/* =========================================
   ADD TO CART
========================================= */
function addToCart(productId) {
    const product =
        products.find(
            item => item.id === productId
        );
    if (!product) {
        return;
    }
    const size =
        document.getElementById(
            `size-${productId}`
        ).value;
    const existing =
        cart.find(
            item =>
                item.id === productId &&
                item.size === size
        );
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            size: size,
            quantity: 1
        });
    }
    updateCart();
    alert(
        `${product.name} (${size}) added to cart!`
    );
}
/* =========================================
   INCREASE
========================================= */
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}
/* =========================================
   DECREASE
========================================= */
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}
/* =========================================
   DISPLAY PRODUCTS
========================================= */
function displayProducts(items) {
    productContainer.innerHTML = "";
    if (items.length === 0) {
        productContainer.innerHTML = `
            <div class="no-products">
                <h3>
                    😕 Product not found
                </h3>
                <p>
                    Try another product name.
                </p>
            </div>
        `;
        return;
    }
    items.forEach(product => {
        const card =
            document.createElement("div");
        card.className =
            "product-card";
        const isLiked =
            wishlist.includes(product.id);
        const stars =
            "⭐".repeat(
                Math.round(product.rating)
            );
        card.innerHTML = `
            <div class="product-image-box">
                <img
                    src="images/${product.image}"
                    alt="${product.name}"
                    onclick="zoomImage('images/${product.image}')"
                    onerror="this.style.display='none'"
                >
                <span class="category-tag">
                    ${product.category}
                </span>
                <button
                    class="wishlist-button"
                    onclick="toggleWishlist(${product.id})"
                >
                    ${isLiked ? "❤️" : "🤍"}
                </button>
            </div>
            <div class="product-info">
                <h3>
                    ${product.name}
                </h3>
                <div class="rating">
                    ${stars}
                    <span>
                        ${product.rating}
                    </span>
                </div>
                <p class="description">
                    ${product.description}
                </p>
                <label class="size-label">
                    Select Size:
                </label>
                <select
                    id="size-${product.id}"
                    class="size-select"
                >
                    <option value="S">
                        S
                    </option>
                    <option value="M" selected>
                        M
                    </option>
                    <option value="L">
                        L
                    </option>
                    <option value="XL">
                        XL
                    </option>
                    <option value="XXL">
                        XXL
                    </option>
                </select>
                <div class="product-bottom">
                    <span class="price">
                        ₹${product.price}
                    </span>
                    <button
                        onclick="addToCart(${product.id})"
                    >
                        🛒 Add
                    </button>
                </div>
            </div>
        `;
        productContainer.appendChild(card);
    });
}
/* =========================================
   WISHLIST
========================================= */
function toggleWishlist(productId) {
    const index =
        wishlist.indexOf(productId);
    if (index === -1) {
        wishlist.push(productId);
    } else {
        wishlist.splice(index, 1);
    }
    updateWishlist();
    displayProducts(
        getCurrentlyDisplayedProducts()
    );
}
/* =========================================
   CURRENT PRODUCTS
========================================= */
function getCurrentlyDisplayedProducts() {
    const searchText =
        searchBox.value.toLowerCase();
    if (!searchText) {
        return products;
    }
    return products.filter(product =>
        product.name
            .toLowerCase()
            .includes(searchText)
    );
}
/* =========================================
   UPDATE WISHLIST
========================================= */
function updateWishlist() {
    const wishlistItems =
        document.getElementById("wishlist-items");
    const wishlistCount =
        document.getElementById("wishlist-count");
    wishlistCount.textContent =
        wishlist.length;
    wishlistItems.innerHTML = "";
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <p>
                Your wishlist is empty.
            </p>
        `;
        return;
    }
    wishlist.forEach(id => {
        const product =
            products.find(
                item => item.id === id
            );
        if (!product) {
            return;
        }
        const item =
            document.createElement("div");
        item.className =
            "wishlist-item";
        item.innerHTML = `
            <img
                src="images/${product.image}"
                alt="${product.name}"
            >
            <div>
                <strong>
                    ${product.name}
                </strong>
                <p>
                    ₹${product.price}
                </p>
            </div>
            <button
                onclick="toggleWishlist(${product.id})"
            >
                Remove
            </button>
        `;
        wishlistItems.appendChild(item);
    });
}
/* =========================================
   UPDATE CART
========================================= */
function updateCart() {
    const cartItems =
        document.getElementById("cart-items");
    const subtotalElement =
        document.getElementById("cart-subtotal");
    const discountElement =
        document.getElementById("cart-discount");
    const totalElement =
        document.getElementById("cart-total");
    const cartCount =
        document.getElementById("cart-count");
    const cartCount2 =
        document.getElementById("cart-count-2");
    cartItems.innerHTML = "";
    let totalQuantity = 0;
    cart.forEach(item => {
        totalQuantity +=
            item.quantity;
    });
    cartCount.textContent =
        totalQuantity;
    cartCount2.textContent =
        totalQuantity;
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    🛒
                </div>
                <p>
                    Your cart is empty.
                </p>
                <p>
                    Add some clothes to your cart!
                </p>
            </div>
        `;
        subtotalElement.textContent = "0";
        discountElement.textContent = "0";
        totalElement.textContent = "0";
        return;
    }
    let subtotal = 0;
    cart.forEach((product, index) => {
        const itemTotal =
            product.price *
            product.quantity;
        subtotal += itemTotal;
        const item =
            document.createElement("div");
        item.className =
            "cart-item";
        item.innerHTML = `
            <div class="cart-product-info">
                <strong>
                    ${product.name}
                </strong>
                <small>
                    Size: ${product.size}
                </small>
                <small>
                    ₹${product.price} ×
                    ${product.quantity}
                </small>
                <strong>
                    Item Total:
                    ₹${itemTotal}
                </strong>
            </div>
            <div class="quantity-buttons">
                <button
                    onclick="decreaseQuantity(${index})"
                >
                    −
                </button>
                <span>
                    ${product.quantity}
                </span>
                <button
                    onclick="increaseQuantity(${index})"
                >
                    +
                </button>
            </div>
        `;
        cartItems.appendChild(item);
    });
    /* 10% DISCOUNT ABOVE ₹500 */
    let discount = 0;
    if (subtotal >= 500) {
        discount =
            Math.round(
                subtotal * 0.10
            );
    }
    const total =
        subtotal - discount;
    subtotalElement.textContent =
        subtotal;
    discountElement.textContent =
        discount;
    totalElement.textContent =
        total;
}
/* =========================================
   CLEAR CART
========================================= */
function clearCart() {
    cart = [];
    updateCart();
}
/* =========================================
   WHATSAPP ORDER
========================================= */
function sendOrder() {
    if (cart.length === 0) {
        alert(
            "Please add a product to your cart first."
        );
        return;
    }
    const phoneNumber =
        "919354047607";
    let message =
        "Hello, I want to order:\n\n";
    let subtotal = 0;
    cart.forEach((product, index) => {
        const itemTotal =
            product.price *
            product.quantity;
        subtotal += itemTotal;
        message +=
            `${index + 1}. ${product.name}\n`;
        message +=
            `Size: ${product.size}\n`;
        message +=
            `Quantity: ${product.quantity}\n`;
        message +=
            `Price: ₹${itemTotal}\n\n`;
    });
    let discount = 0;
    if (subtotal >= 500) {
        discount =
            Math.round(
                subtotal * 0.10
            );
    }
    const total =
        subtotal - discount;
    message +=
        `Subtotal: ₹${subtotal}\n`;
    message +=
        `Discount: ₹${discount}\n`;
    message +=
        `Total: ₹${total}\n\n`;
    message +=
        "Please confirm my order.";
    const url =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}
/* =========================================
   SEARCH
========================================= */
searchBox.addEventListener(
    "input",
    function () {
        const searchText =
            searchBox.value.toLowerCase();
        const filteredProducts =
            products.filter(product =>
                product.name
                    .toLowerCase()
                    .includes(searchText)
            );
        displayProducts(
            filteredProducts
        );
    }
);
/* =========================================
   CATEGORY FILTER
========================================= */
function filterCategory(category) {
    if (category === "All") {
        displayProducts(products);
        return;
    }
    const filteredProducts =
        products.filter(product =>
            product.category === category
        );
    displayProducts(
        filteredProducts
    );
}
/* =========================================
   IMAGE ZOOM
========================================= */
function zoomImage(imageSource) {
    const modal =
        document.getElementById(
            "image-modal"
        );
    const zoomedImage =
        document.getElementById(
            "zoomed-image"
        );
    zoomedImage.src =
        imageSource;
    modal.style.display =
        "flex";
}
function closeImage() {
    document.getElementById(
        "image-modal"
    ).style.display = "none";
}
/* =========================================
   START
========================================= */
displayProducts(products);
updateCart();
updateWishlist();