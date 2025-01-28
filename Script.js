document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Adaugă produse în coș
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const product = {
                name: this.dataset.name,
                price: this.dataset.price,
                image: this.dataset.image
            };
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert('Produs adăugat în coș!');
        });
    });

    // Actualizează numărul de produse din coș
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    // Filtrare produse
    const categoryFilter = document.getElementById('category');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function () {
            const selectedCategory = this.value;
            const products = document.querySelectorAll('.product');
            products.forEach(product => {
                const productCategory = product.dataset.category;
                if (selectedCategory === 'toate' || productCategory === selectedCategory) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }

    // Afișează produsele din coș
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="50">
                <h3>${item.name}</h3>
                <p>${item.price} RON</p>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    // Finalizează comanda
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            localStorage.removeItem('cart');
            alert('Comanda a fost finalizată!');
            window.location.href = 'index.html';
        });
    }
});
