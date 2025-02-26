import menuArray from "./data.js";

const menuLists = document.getElementById("menu-lists");
const orderListsEl = document.getElementById("order-lists");
const paymentForm = document.getElementById("payment-form");
const paymentModal = document.getElementById("payment-modal");
const orderContainer = document.getElementById("order-container");
const thankYouSession = document.getElementById("thank-you-session");
const ratingContainer = document.getElementById("rating-container");
let orderList = [];
let orderId = 0;

document.addEventListener("click", (e) => {
    if (e.target.dataset.add) {
        addToYourOrder(e.target.dataset.add);
    }
    else if (e.target.dataset.remove) {
        removeFromYourOder(e.target.dataset.remove);
    }
    else if (e.target.id == 'complete-order-btn') {
        if(orderList.length > 0){
            document.getElementById('payment-modal').classList.remove('hidden');
        }
    }
});

// add user selected to orderLists 
function addToYourOrder(menuId) {
    const orderMenu = menuArray.filter(menu => menu.id === parseInt(menuId))[0];
    orderList.push({
        id: orderId++,
        name: orderMenu.name,
        price: orderMenu.price
    })
    renderYourOrder(orderList);
}

//remove user selected from orderLists
function removeFromYourOder(orderId) {
    orderList = orderList.filter(order => order.id !== parseInt(orderId));
    renderYourOrder(orderList);
}

// render order list
function renderYourOrder(orderList) {
    orderListsEl.innerHTML = orderList.map((order) =>
        `
            <div class="order">
                <p class='order-name'>${order.name}</p>
                <button class="remove-btn" data-remove="${order.id}">Remove</button>
                <p class='order-price'>$${order.price}</p>
            </div>
        `
    ).join("");

    document.getElementById("total-price").textContent = `$${orderList.reduce((total, currentOrder) => total + currentOrder.price, 0)}`;
}

function getMenuListHTML(menus) {
    return menus.map((menu) =>
        `<div class="menu">
            <p class="menu-emoji">${menu.emoji}</p>
            <div class="menu-detial">
                <p class="menu-name">${menu.name}</p>
                <p class="menu-ingredients">${menu.ingredients}</p>
                <p class="menu-price">$${menu.price}</p>
            </div>
            <i class="fa-solid fa-circle-plus menu-add-btn" data-add="${menu.id}"></i>
        </div>`
    ).join("");
}

menuLists.innerHTML = getMenuListHTML(menuArray);

paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    paymentModal.classList.add('hidden');
    orderContainer.classList.add('hidden');
    thankYouSession.innerHTML = `<p>Thanks , ${name}! Your Order is on the way!</p>`;
    thankYouSession.classList.remove('hidden');
})

