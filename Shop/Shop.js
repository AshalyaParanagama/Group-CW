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


    document.getElementById("checkout_button").addEventListener("click", function() {
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        
        if (basket.length === 0) {
            alert('Your cart is empty. Please add at least one item to proceed with the checkout.');
        } else if (fullName === '' || email === '') {
            alert('Please fill out your name and email to proceed with the checkout.');
        } else {
            // Proceed to payment method page
            window.location.href = 'paymentmethod.html';
        }
    });

