function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function closeAdminLogin() {
  document.getElementById("adminLogin").style.display = "none";
}

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

  // Use a font that supports Serbian characters
  doc.setFont("Helvetica", "normal");

  // Header
  const today = new Date();
  const dateStr = today.toLocaleDateString("sr-RS");
  const dayStr = today.toLocaleDateString("sr-RS", { weekday: "long" });

  doc.setFontSize(16);
  doc.text("Kafić Janko – Račun", 10, 15);

  doc.setFontSize(12);
  doc.text(`Datum: ${dateStr}`, 10, 25);
  doc.text(`Dan: ${dayStr}`, 10, 32);
  doc.text(`Konobar: ____________________`, 10, 39);

  // Items
  let y = 50;
  const items = document.querySelectorAll(".receipt-item");

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

  // Footer
  y += 10;
  doc.setFontSize(12);
  doc.text("Hvala na poseti! Vidimo se uskoro. ☕", 10, y);

  doc.save("racun.pdf");
}
