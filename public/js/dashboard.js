// Load meters from localStorage
let meters = JSON.parse(localStorage.getItem("meters")) || [];

// DOM elements
const meterList = document.getElementById("meter-list");
const addMeterBtn = document.getElementById("add-meter-btn");
const addMeterFormSection = document.getElementById("addMeterFormSection");
const addMeterForm = document.getElementById("addMeterForm");
const cancelAddMeterBtn = document.getElementById("cancelAddMeterBtn");

const showTopUpBtn = document.getElementById("topup-btn");
const topUpFormSection = document.getElementById("topUpFormSection");
const meterSelect = document.getElementById("meterSelect");
const topUpAmount = document.getElementById("topUpAmount");
const confirmTopUpBtn = document.getElementById("confirmTopUpBtn");
const cancelTopUpBtn = document.getElementById("cancelTopUpBtn");

// Function to render meters into dashboard + dropdown
function renderMeters() {
  meterList.innerHTML = "";
  meterSelect.innerHTML = "";

  meters.forEach((meter, index) => {
    // Create card div
    const card = document.createElement("div");
    card.className = "meter-card";
    card.innerHTML = `
      <strong>${meter.name}</strong>
      <p>Meter No: ${meter.number}</p>
      <p>Balance: R ${meter.balance.toFixed(2)}</p>
      <div class="meter-actions">
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </div>
    `;
    meterList.appendChild(card);

    // Add option to dropdown
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${meter.name} (${meter.number})`;
    meterSelect.appendChild(option);
  });

  // Attach event listeners for edit/delete buttons
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", handleEditMeter);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", handleDeleteMeter);
  });
}

// ================== Add Meter ==================

// Show/Hide form
addMeterBtn.addEventListener("click", () => {
  addMeterFormSection.style.display =
    addMeterFormSection.style.display === "none" ? "block" : "none";
});

// Handle form submit
addMeterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const meterName = document.getElementById("meterName").value.trim();
  const meterNumber = document.getElementById("meterNumber").value.trim();

  if (meterName && meterNumber) {
    const newMeter = {
      name: meterName,
      number: meterNumber,
      balance: 0
    };

    meters.push(newMeter);
    localStorage.setItem("meters", JSON.stringify(meters));
    renderMeters();

    // Reset + hide form
    addMeterForm.reset();
    addMeterFormSection.style.display = "none";
  } else {
    alert("Please enter both meter name and number.");
  }
});

// Cancel add meter
cancelAddMeterBtn.addEventListener("click", () => {
  addMeterForm.reset();
  addMeterFormSection.style.display = "none";
});

// ================== Edit/Delete Meter ==================

function handleEditMeter(e) {
  const index = e.target.dataset.index;
  const meter = meters[index];

  const newName = prompt("Enter new meter name:", meter.name);
  const newNumber = prompt("Enter new meter number:", meter.number);

  if (newName && newNumber) {
    meters[index].name = newName.trim();
    meters[index].number = newNumber.trim();
    localStorage.setItem("meters", JSON.stringify(meters));
    renderMeters();
  }
}

function handleDeleteMeter(e) {
  const index = e.target.dataset.index;
  if (confirm("Are you sure you want to delete this meter?")) {
    meters.splice(index, 1);
    localStorage.setItem("meters", JSON.stringify(meters));
    renderMeters();
  }
}

// ================== Top-Up ==================

// Toggle top-up form
showTopUpBtn.addEventListener("click", () => {
  topUpFormSection.style.display =
    topUpFormSection.style.display === "none" ? "block" : "none";
});

// Confirm top-up
confirmTopUpBtn.addEventListener("click", () => {
  const index = meterSelect.value;
  const amount = parseFloat(topUpAmount.value);

  if (index === "" || isNaN(amount) || amount <= 0) {
    alert("Please select a meter and enter a valid amount.");
    return;
  }

  meters[index].balance += amount;
  localStorage.setItem("meters", JSON.stringify(meters));
  renderMeters();

  // Reset + hide form
  topUpAmount.value = "";
  topUpFormSection.style.display = "none";
});

// Cancel top-up
cancelTopUpBtn.addEventListener("click", () => {
  topUpAmount.value = "";
  topUpFormSection.style.display = "none";
});

// ================== Initial Load ==================
renderMeters();
