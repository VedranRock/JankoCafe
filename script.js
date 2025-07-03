function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Close buttons
function closeAdminLogin() {
  document.getElementById("adminLogin").style.display = "none";
}

// Admin login
document.getElementById("adminToggle").addEventListener("click", () => {
  document.getElementById("adminLogin").style.display = "block";
});

document.getElementById("adminLoginBtn").addEventListener("click", () => {
  const password = document.getElementById("adminPassword").value;
  if (password === "admin123") {
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("receiptBuilderBtn").style.display = "inline-block";
  } else {
    alert("Pogrešna lozinka.");
  }
});

// Receipt builder
document.getElementById("receiptBuilderBtn").addEventListener("click", () => {
  document.getElementById("receiptBuilder").style.display = "block";
  generateReceiptForm();
});

function generateReceiptForm() {
  const allItems = [...document.querySelectorAll("#hranaList li, #picaList li")];
  const container = document.getElementById("receiptItems");
  container.innerHTML = "";

  allItems.forEach((li, index) => {
    const itemName = li.childNodes[0].textContent.trim();
    const div = document.createElement("div");
    div.className = "receipt-item";

    div.innerHTML = `
      <label><input type="checkbox" data-name="${itemName}" id="item-${index}"> ${itemName}</label>
      <textarea placeholder="Napomena (opciono)" id="note-${index}"></textarea>
    `;

    container.appendChild(div);
  });
}

async function downloadReceipt() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Račun", 10, 15);
  doc.setFontSize(12);

  const items = document.querySelectorAll(".receipt-item");
  let y = 25;

  items.forEach((item, i) => {
    const checkbox = item.querySelector("input[type='checkbox']");
    const note = item.querySelector("textarea").value.trim();

    if (checkbox.checked) {
      doc.text(`• ${checkbox.dataset.name}`, 10, y);
      y += 7;
      if (note) {
        doc.setFontSize(11);
        doc.text(`  Napomena: ${note}`, 12, y);
        doc.setFontSize(12);
        y += 7;
      }
    }
  });

  doc.save("racun.pdf");
}
