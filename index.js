import menuArray from "./data.js";

const menuLists = document.getElementById("menu-lists");

function getMenuListHTML(menus) {
    return menus.map((menu) =>
        `<div class="menu">
            <p class="menu-emoji">${menu.emoji}</p>
            <div class="menu-detial">
                <p class="menu-name">${menu.name}</p>
                <p class="menu-ingredients">${menu.ingredients}</p>
                <p class="menu-price">$${menu.price}</p>
            </div>
            <button class="menu-add-btn" id="menu-add-btn"><i class="fa-solid fa-circle-plus"></i></button>
        </div>`
    ).join("");
}

menuLists.innerHTML = getMenuListHTML(menuArray);