// 🌙 Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// 🔐 Admin Login
document.getElementById("adminToggle").addEventListener("click", () => {
  document.getElementById("adminLogin").style.display = "block";
});

document.getElementById("adminLoginBtn").addEventListener("click", () => {
  const password = document.getElementById("adminPassword").value;
  if (password === "admin123") {
    document.getElementById("addItemForm").style.display = "block";
    document.getElementById("adminLogin").style.display = "none";
  } else {
    alert("Pogrešna lozinka.");
  }
});

// ➕ Add New Menu Item
document.getElementById("addItemBtn").addEventListener("click", () => {
  const name = document.getElementById("itemName").value.trim();
  const category = document.getElementById("itemCategory").value;
  const iconCheckboxes = document.querySelectorAll("#addItemForm input[type='checkbox']");

  if (!name) {
    alert("Unesite naziv artikla.");
    return;
  }

  const icons = Array.from(iconCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => {
      if (cb.value === "green-star") return `<span class="icon green-star" data-tooltip="Pitajte konobara">★</span>`;
      if (cb.value === "blue-plus") return `<span class="icon blue-plus" data-tooltip="Druge opcije moguće">+</span>`;
      if (cb.value === "red-clock") return `<span class="icon red-clock" data-tooltip="Čekanje više od 15 minuta">⏰</span>`;
    }).join(" ");

  const li = document.createElement("li");
  li.innerHTML = `${name} ${icons}`;

  const list = document.getElementById(category);
  list.appendChild(li);

  // Reset form
  document.getElementById("itemName").value = "";
  iconCheckboxes.forEach(cb => cb.checked = false);
});
