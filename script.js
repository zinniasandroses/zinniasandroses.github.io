function changeText() {
    document.getElementById("test").textContent = "how dare you click that button you evil person";
}
let arim = 5;
let cinat = 1;

let money = 0;

function updateDisplay() {
  document.getElementById("moneyDisplay").textContent = money;
}

document.getElementById("addMoneyButton").addEventListener("click", function() {
  money += 10;
  updateDisplay();
});

// Show the starting value when the page loads
updateDisplay();