// Drinks
const drinks = [
    { name: "Voda čaša", price: 10 },
    { name: "Kafa šolja", price: 20 },
    { name: "Kafa dupla šolja", price: 50 },
    { name: "Čaj (šolja)", price: 40 },
    { name: "Ceđeni Sok čaša", price: 30 },
    { name: "Jogurt (šolja)", price: 40 },
    { name: "Bitter Lemon limenka", price: 50 },
    { name: "Pivo limenka", price: 80 }
];

// Food
const food = [
    { name: "Bajadere (2)", price: 20 },
    { name: "Kokice čaša", price: 20 },
    { name: "Kilice (3)", price: 50 },
    { name: "Bananice (2)", price: 30 },
    { name: "Tortica (1)", price: 20 },
    { name: "Keks (5)", price: 20 },
    { name: "Minjoni (2)", price: 20 },
    { name: "Grickalice Mix čaša", price: 10 },
    { name: "Sendvič", price: 80 },
    { name: "Kuvano Jaje (1)", price: 50 },
    { name: "Jaje na oko (1)", price: 50 },
    { name: "Kajgana (1)", price: 50 },
    { name: "Kačamak (Porcija)", price: 100 }
];

let currentTable = null;
const orders = {};

// Table names mapping
const tableNames = {
    1: "Nada",
    2: "Jelena",
    3: "Milan",
    4: "Vedran",
    5: "Janko"
};

// DOM references
const tableGrid = document.querySelector(".table-grid");
const tablesPage = document.getElementById("tables-page");
const menuPage = document.getElementById("menu-page");
const drinksGrid = document.getElementById("menu-drinks");
const foodGrid = document.getElementById("menu-food");
const orderList = document.getElementById("order-list");
const totalDisplay = document.getElementById("total");
const tableTitle = document.getElementById("table-title");

// Generate tables
for (let i = 1; i <= 10; i++) {
    const btn = document.createElement("button");
    btn.id = `table-${i}`;
    btn.style.whiteSpace = "pre-line";
    const name = tableNames[i] || `Sto ${i}`;
    btn.textContent = `${name}\nUkupno: 0€`;
    btn.addEventListener("click", () => selectTable(i));
    tableGrid.appendChild(btn);
}

// Generate menu sections
function generateMenu(items, container) {
    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "menu-item";
        div.innerHTML = `<strong>${item.name}</strong><span>${item.price}€</span>`;
        const btn = document.createElement("button");
        btn.textContent = "Dodaj";
        btn.addEventListener("click", () => addItem(item));
        div.appendChild(btn);
        container.appendChild(div);
    });
}

generateMenu(drinks, drinksGrid);
generateMenu(food, foodGrid);

// Select table
function selectTable(num) {
    currentTable = num;
    if (!orders[num]) orders[num] = [];
    const name = tableNames[num] || `Sto ${num}`;
    tableTitle.textContent = name;
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
        const name = tableNames[tableNum] || `Sto ${tableNum}`;
        btn.textContent = `${name}\nUkupno: ${total}€`;
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
