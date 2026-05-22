const products = [
    { id: 1, name: "Седан Business Class", price: 2500000 },
    { id: 2, name: "Внедорожник Explorer", price: 3800000 },
    { id: 3, name: "Спорткар GT", price: 5200000 }
];

let cart = [];

const calcTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
};

const renderCart = () => {
    const cartDiv = document.getElementById("cart");
    if (!cartDiv) return;

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Корзина пуста</p>";
        return;
    }

    let html = "<ul>";
    cart.forEach(item => {
        html += `<li>${item.name} - ${item.price.toLocaleString()} ₽</li>`;
    });
    html += "</ul>";
    html += `<p><strong>Итого: ${calcTotal().toLocaleString()} ₽</strong></p>`;
    html += `<button onclick="clearCart()">Очистить корзину</button>`;
    html += `<button onclick="checkout()">Оплатить</button>`;

    cartDiv.innerHTML = html;
};

const clearCart = () => {
    cart = [];
    renderCart();
    alert("Корзина очищена");
};

const checkout = () => {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        alert("Покупка прошла успешно");
        cart = [];
        renderCart();
    }
};

const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        renderCart();
        alert(`${product.name} добавлен в корзину`);
    }
};

const filterProducts = () => {
    const maxPrice = parseInt(document.getElementById("priceFilter").value);
    const items = document.querySelectorAll(".product-item");

    items.forEach((item, index) => {
        if (products[index].price <= maxPrice) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    renderCart();

    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(btn => {
        btn.onclick = () => addToCart(parseInt(btn.dataset.id));
    });
});

const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCart();
    }
};