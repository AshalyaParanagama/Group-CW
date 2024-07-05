let basket = [];
let totalPrice = 0;

function addToBasket(itemName, itemPrice, quantityId) {
    const quantity = parseInt(document.getElementById(quantityId).value);

    const existingItem = basket.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        basket.push({ name: itemName, price: itemPrice, quantity: quantity });
    }

    totalPrice += itemPrice * quantity;
    updateBasket();
    
}


function updateBasket() {
    const basketItemsContainer = document.getElementById('basket-items');
    basketItemsContainer.innerHTML = '';

    basket.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'basket-item';
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
            <button onclick="removeItem('${item.name}')">Remove</button>
        `;
        basketItemsContainer.appendChild(itemElement);
    });

    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

function removeItem(itemName) {
    const itemIndex = basket.findIndex(item => item.name === itemName);
    if (itemIndex > -1) {
        const item = basket[itemIndex];
        totalPrice -= item.price; 
        item.quantity--; 

        if (item.quantity === 0) {
            basket.splice(itemIndex, 1); 
        }

        updateBasket();
    }
}


function clearBasket() {
    basket = [];
    totalPrice = 0;
    updateBasket();
}

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('checkout_button').addEventListener('click', function(event) {
        // Validate basket
        if (basket.length === 0) {
            alert('Your cart is empty. Please add at least one item to proceed with the checkout.');
            return;
        }

        // Validate name and email fields
        const name = document.querySelector('input[type="text"]').value.trim();
        const email = document.querySelector('input[type="email"]').value.trim();

        if (name === '' || email === '') {
            alert('Please fill in both your name and email to proceed with the checkout.');
            return;
        }

        // If validation passes, navigate to the payment method page
        window.location.href = 'http://127.0.0.1:5501/Shop/paymentMethod.html';
    });
});
