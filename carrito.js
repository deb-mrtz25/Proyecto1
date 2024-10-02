let cart = [];

function addToCart(product) {
    const found = cart.find(item => item.name === product.name);

    if (found) {
        found.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();
    renderCart();
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.reduce((acc, product) => acc + product.quantity, 0);
}

function renderCart() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    const cartTotal = document.getElementById('cart-total');
    cartTableBody.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="btn" onclick="removeFromCart(${index})">Eliminar</button></td>
        `;

        cartTableBody.appendChild(row);
        total += item.price * item.quantity;
    });

    cartTotal.innerText = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
}

document.getElementById('clear-cart').addEventListener('click', function () {
    cart = [];
    updateCartCount();
    renderCart();
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        addToCart({ name, price });
        alert(`${name} ha sido añadido al carrito.`);
    });
});
