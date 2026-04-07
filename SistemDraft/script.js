// Menu items from PDF
const menu = [
    { name: "Voda čaša", price: 10 },
    { name: "Bajadere (2)", price: 20 },
    { name: "Kafa šolja", price: 20 },
    { name: "Bitter Lemon limenka", price: 50 },
    { name: "Ceđeni Sok čaša", price: 30 },
    { name: "Kafa dupla šolja", price: 50 },
    { name: "Kokice čaša", price: 20 },
    { name: "Kilice (3)", price: 50 },
    { name: "Bananice (2)", price: 30 },
    { name: "Tortica (1)", price: 20 },
    { name: "Pivo limenka", price: 80 },
    { name: "Keks (5)", price: 20 },
    { name: "Minjoni (2)", price: 20 },
    { name: "Grickalice Mix čaša", price: 10 }
];

let currentTable = null;
const orders = {};

// DOM references
const tableGrid = document.querySelector(".table-grid");
const tablesPage = document.getElementById("tables-page");
const menuPage = document.getElementById("menu-page");
const menuGrid = document.getElementById("menu-items");
const orderList = document.getElementById("order-list");
const totalDisplay = document.getElementById("total");
const tableTitle = document.getElementById("table-title");

// Generate tables
for (let i = 1; i <= 10; i++) {
    const btn = document.createElement("button");
    btn.id = `table-${i}`;
    btn.textContent = `Sto ${i}\nUkupno: 0€`;
    btn.style.whiteSpace = "pre-line"; // allow line break
    btn.addEventListener("click", () => selectTable(i));
    tableGrid.appendChild(btn);
}

// Generate menu
menu.forEach(item => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `<strong>${item.name}</strong><span>${item.price}€</span>`;
    const btn = document.createElement("button");
    btn.textContent = "Dodaj";
    btn.addEventListener("click", () => addItem(item));
    div.appendChild(btn);
    menuGrid.appendChild(div);
});

// Select table
function selectTable(num) {
    currentTable = num;
    if (!orders[num]) orders[num] = [];
    tableTitle.textContent = `Sto ${num}`;
    tablesPage.classList.add("hidden");
    menuPage.classList.remove("hidden");
    renderOrder();
}

// Add item
function addItem(item) {
    if (!currentTable) {
        alert("Prvo izaberi sto!");
        return;
    }
    const order = orders[currentTable];
    const existing = order.find(o => o.name === item.name);
    if (existing) {
        existing.qty++;
    } else {
        order.push({ ...item, qty: 1 });
    }
    renderOrder();
}

// Render order
function renderOrder() {
    orderList.innerHTML = "";
    let total = 0;
    if (currentTable) {
        orders[currentTable].forEach((o, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
          <span>${o.name} x${o.qty} = ${o.qty * o.price}€</span>
          <div class="order-controls">
            <button onclick="increaseQty(${index})">+</button>
            <button onclick="decreaseQty(${index})">-</button>
            <button class="remove-btn" onclick="removeItem(${index})">❌</button>
          </div>
        `;
            orderList.appendChild(li);
            total += o.qty * o.price;
        });
    }
    totalDisplay.textContent = `Ukupno: ${total}€`;
    updateTableButton(currentTable, total);
}

// Update table button total
function updateTableButton(tableNum, total) {
    const btn = document.getElementById(`table-${tableNum}`);
    if (btn) {
        btn.textContent = `Sto ${tableNum}\nUkupno: ${total}€`;
    }
}

// Quantity controls
function increaseQty(index) {
    orders[currentTable][index].qty++;
    renderOrder();
}

function decreaseQty(index) {
    if (orders[currentTable][index].qty > 1) {
        orders[currentTable][index].qty--;
    } else {
        orders[currentTable].splice(index, 1);
    }
    renderOrder();
}

function removeItem(index) {
    orders[currentTable].splice(index, 1);
    renderOrder();
}

// Reset order
document.getElementById("reset-order").addEventListener("click", () => {
    if (currentTable) {
        orders[currentTable] = [];
        renderOrder();
    }
});

// Back button
document.getElementById("back-button").addEventListener("click", () => {
    menuPage.classList.add("hidden");
    tablesPage.classList.remove("hidden");
    currentTable = null;
});
