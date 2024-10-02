const Cart = (function () {
    let instance;

    function createInstance() {
        const cart = [];
        return {
            addToCart: function (product) {
                cart.push(product);
                this.updateCartCount();
            },
            getCartItems: function () {
                return cart;
            },
            updateCartCount: function () {
                document.getElementById('cart-count').innerText = cart.length;
            }
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

function ProductFactory() {}

ProductFactory.prototype.createProduct = function (type, name, price, img) {
    let product;

    if (type === 'shirt') {
        product = new Shirt(name, price, img);
    } else if (type === 'shoes') {
        product = new Shoes(name, price, img);
    } else if (type === 'hoodie') {
        product = new Hoodie(name, price, img);
    } else if (type === 'shorts') {
        product = new Shorts(name, price, img);
    }

    return product;
};

class Product {
    constructor(name, price, img) {
        this.name = name;
        this.price = price;
        this.img = img;
    }

    render() {
        return `
            <div class="product-card">
                <img src="${this.img}" alt="${this.name}">
                <h3>${this.name}</h3>
                <p>$${this.price}</p>
            </div>
        `;
    }
}

class Shirt extends Product {}
class Shoes extends Product {}
class Hoodie extends Product {}
class Shorts extends Product {}

function initProducts() {
    const factory = new ProductFactory();
    const products = [];

    products.push(factory.createProduct('shirt', 'Playera Deportiva', 29.99, 'playera1.jpeg'));
    products.push(factory.createProduct('shoes', 'Zapatos Running', 79.99, 'zapatos.jpg'));
    products.push(factory.createProduct('hoodie', 'Sudadera Deportiva', 49.99, 'sudadera.jpg'));
    products.push(factory.createProduct('shorts', 'Shorts Deportivos', 19.99, 'shorts.jpg'));

    return products;
}

function renderProducts(products) {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        productList.innerHTML += product.render();
    });

    document.querySelectorAll('.add-to-cart').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const cart = Cart.getInstance();
            cart.addToCart(products[index]);
            alert(`Producto añadido: ${products[index].name}`);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const products = initProducts();
    renderProducts(products);
});
