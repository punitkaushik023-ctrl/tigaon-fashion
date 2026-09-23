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


let cart = [];
let wishlist = [];

let currentCategory = "All";


const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");


// SHOP NOW

function goToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// WHATSAPP NUMBER

function openWhatsApp() {

    window.open(
        "https://wa.me/919354047607",
        "_blank"
    );

}


// GOOGLE MAPS

function openMaps() {

    window.open(
        "https://www.google.com/maps/search/?api=1&query=Tigaon+Faridabad+Haryana",
        "_blank"
    );

}


// ADD TO CART

function addToCart(productId) {

    const product = products.find(
        p => p.id === productId
    );

    const sizeElement =
        document.getElementById(
            `size-${productId}`
        );

    const size = sizeElement.value;

    const existing = cart.find(
        item =>
            item.id === productId &&
            item.size === size
    );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            size: size,
            quantity: 1

        });

    }

    updateCart();

    alert("Product added to cart 🛒");

}


// CART QUANTITY

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();

}


// DISPLAY PRODUCTS

function displayProducts(list) {

    productList.innerHTML = "";

    if (list.length === 0) {

        productList.innerHTML =
            "<p>No products found.</p>";

        return;

    }


    list.forEach(product => {

        const liked =
            wishlist.includes(product.id);


        const card = document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="images/${product.image}"
                    alt="${product.name}"
                    onclick="zoomImage(this.src)"
                >

            </div>


            <button
                class="wishlist-btn"
                onclick="toggleWishlist(${product.id})"
            >
                ${liked ? "❤️" : "♡"}
            </button>


            <h3>${product.name}</h3>

            <p>⭐ ${product.rating}</p>

            <p>${product.description}</p>


            <label>Size:</label>

            <select id="size-${product.id}">

                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>

            </select>


            <h3>₹${product.price}</h3>


            <button
                onclick="addToCart(${product.id})"
            >
                Add to Cart
            </button>

        `;


        productList.appendChild(card);

    });

}


// WISHLIST

function toggleWishlist(productId) {

    if (wishlist.includes(productId)) {

        wishlist =
            wishlist.filter(
                id => id !== productId
            );

    } else {

        wishlist.push(productId);

    }

    updateWishlist();

    displayProducts(
        getCurrentlyDisplayedProducts()
    );

}


function getCurrentlyDisplayedProducts() {

    let list = products;


    if (currentCategory !== "All") {

        list =
            list.filter(
                product =>
                    product.category ===
                    currentCategory
            );

    }


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    if (searchText) {

        list =
            list.filter(
                product =>
                    product.name
                        .toLowerCase()
                        .includes(searchText)
            );

    }


    return list;

}


function updateWishlist() {

    const wishlistList =
        document.getElementById(
            "wishlist-list"
        );


    const wishlistProducts =
        products.filter(
            product =>
                wishlist.includes(product.id)
        );


    wishlistList.innerHTML = "";


    if (wishlistProducts.length === 0) {

        wishlistList.innerHTML =
            "<p>Your wishlist is empty ❤️</p>";

    }


    wishlistProducts.forEach(product => {

        const item =
            document.createElement("div");

        item.className =
            "product-card";


        item.innerHTML = `

            <img
                src="images/${product.image}"
                alt="${product.name}"
            >

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <button
                onclick="addToCart(${product.id})"
            >
                Add to Cart
            </button>

        `;


        wishlistList.appendChild(item);

    });


    document.getElementById(
        "wishlist-count"
    ).textContent = wishlist.length;

}


// UPDATE CART

function updateCart() {

    const cartItems =
        document.getElementById(
            "cart-items"
        );


    cartItems.innerHTML = "";


    let subtotal = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price *
            item.quantity;


        subtotal += itemTotal;


        const div =
            document.createElement("div");


        div.className = "cart-item";


        div.innerHTML = `

            <h3>${item.name}</h3>

            <p>
                Size: ${item.size}
            </p>

            <p>
                ₹${item.price}
            </p>

            <button
                onclick="decreaseQuantity(${index})"
            >
                −
            </button>

            <span>
                ${item.quantity}
            </span>

            <button
                onclick="increaseQuantity(${index})"
            >
                +
            </button>

        `;


        cartItems.appendChild(div);

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


    document.getElementById(
        "subtotal"
    ).textContent = subtotal;


    document.getElementById(
        "discount"
    ).textContent = discount;


    document.getElementById(
        "total"
    ).textContent = total;


    document.getElementById(
        "cart-count"
    ).textContent =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

}


// CLEAR CART

function clearCart() {

    cart = [];

    updateCart();

}


// CATEGORY FILTER

function filterCategory(category) {

    currentCategory = category;

    displayProducts(
        getCurrentlyDisplayedProducts()
    );

}


// SEARCH

searchInput.addEventListener(
    "input",
    function () {

        displayProducts(
            getCurrentlyDisplayedProducts()
        );

    }
);


// OPEN ORDER FORM

function openOrderForm() {

    if (cart.length === 0) {

        alert(
            "Please add a product to cart first."
        );

        return;

    }


    document.getElementById(
        "order-form"
    ).style.display = "block";


    document.getElementById(
        "order-form"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


// CLOSE ORDER FORM

function closeOrderForm() {

    document.getElementById(
        "order-form"
    ).style.display = "none";

}


// SEND ORDER

function sendOrder(event) {

    event.preventDefault();


    const customerName =
        document.getElementById(
            "customer-name"
        ).value.trim();


    const customerPhone =
        document.getElementById(
            "customer-phone"
        ).value.trim();


    const customerAddress =
        document.getElementById(
            "customer-address"
        ).value.trim();


    const paymentMethod =
        document.getElementById(
            "payment-method"
        ).value;


    if (!customerName ||
        !customerPhone ||
        !customerAddress ||
        !paymentMethod) {

        alert(
            "Please fill all details."
        );

        return;

    }


    let message =
        "🛍️ *NEW ORDER - TIGAOON FASHION*%0A%0A";


    message +=
        "👤 *Customer:* " +
        encodeURIComponent(
            customerName
        ) +
        "%0A";


    message +=
        "📞 *Phone:* " +
        encodeURIComponent(
            customerPhone
        ) +
        "%0A";


    message +=
        "📍 *Address:* " +
        encodeURIComponent(
            customerAddress
        ) +
        "%0A";


    message +=
        "💳 *Payment:* " +
        encodeURIComponent(
            paymentMethod
        ) +
        "%0A%0A";


    message +=
        "🛒 *ORDER DETAILS*%0A";


    let subtotal = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price *
            item.quantity;


        subtotal += itemTotal;


        message +=
            "• " +
            encodeURIComponent(
                item.name
            ) +
            " | Size: " +
            encodeURIComponent(
                item.size
            ) +
            " | Qty: " +
            item.quantity +
            " | ₹" +
            itemTotal +
            "%0A";

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
        "%0A💰 Subtotal: ₹" +
        subtotal;


    message +=
        "%0A🎁 Discount: ₹" +
        discount;


    message +=
        "%0A💵 *Total: ₹" +
        total +
        "*";


    const whatsappURL =
        "https://wa.me/919354047607?text=" +
        message;


    window.open(
        whatsappURL,
        "_blank"
    );

}


// IMAGE ZOOM

function zoomImage(src) {

    const modal =
        document.getElementById(
            "image-modal"
        );


    const image =
        document.getElementById(
            "zoomed-image"
        );


    image.src = src;

    modal.style.display = "flex";

}


function closeImage() {

    document.getElementById(
        "image-modal"
    ).style.display = "none";

}


// INITIAL LOAD

displayProducts(products);

updateCart();

updateWishlist();