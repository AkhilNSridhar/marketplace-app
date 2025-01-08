// Select elements
const itemName = document.getElementById('itemName');
const itemPrice = document.getElementById('itemPrice');
const addItemButton = document.getElementById('addItem');
const itemsContainer = document.getElementById('itemsContainer');

// Load items from localStorage
function loadItems() {
    const items = JSON.parse(localStorage.getItem('marketplaceItems')) || [];
    items.forEach(item => addItemToDOM(item.name, item.price));
}

// Save items to localStorage
function saveItems() {
    const items = Array.from(document.querySelectorAll('.item')).map(item => ({
        name: item.querySelector('.item-name').textContent,
        price: item.querySelector('.item-price').textContent,
    }));
    localStorage.setItem('marketplaceItems', JSON.stringify(items));
}

// Add item to DOM
function addItemToDOM(name, price) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';

    const itemDetails = document.createElement('div');
    itemDetails.innerHTML = `<span class="item-name">${name}</span> - $<span class="item-price">${price}</span>`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        itemsContainer.removeChild(itemDiv);
        saveItems();
    });

    itemDiv.appendChild(itemDetails);
    itemDiv.appendChild(deleteButton);
    itemsContainer.appendChild(itemDiv);
}

// Add item event
addItemButton.addEventListener('click', () => {
    const name = itemName.value.trim();
    const price = itemPrice.value.trim();

    if (name && price) {
        addItemToDOM(name, price);
        saveItems();
        itemName.value = '';
        itemPrice.value = '';
    }
});

// Initialize app
loadItems();