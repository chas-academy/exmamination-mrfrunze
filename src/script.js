// 1. Hämtar referenser till HTML-elementen
const descInput = document.getElementById("desc");         
const amountInput = document.getElementById("amount");     
const incomeBtn = document.getElementById("incomeBtn");    
const expenseBtn = document.getElementById("expenseBtn");  

const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");
const transactionList = document.getElementById("transactionList");
const balanceDisplay = document.getElementById("balance");

const incomes = [];   
const expenses = []; 

function addTransaction(type) {
  const description = descInput.value.trim();
  const amount = Number(amountInput.value);

  if (!description || isNaN(amount) || amount <= 0) {
    console.log("Fyll i giltiga värden.");
    return;
  }

  const transaction = {
    description,
    amount,
    type
  };

  if (type === "income") {
    incomes.push(transaction);
  } else {
    expenses.push(transaction);
  }

  // clear input
  descInput.value = "";
  amountInput.value = "";


  renderTransactions();
  updateBalance();
}

function renderTransactions() {
  incomeList.innerHTML = "";
  for (const t of incomes) {
    const li = document.createElement("li");
    li.textContent = `${t.description} + ${t.amount} kr (Inkomst)`;
    incomeList.appendChild(li);
  }

  expenseList.innerHTML = "";
  for (const t of expenses) {
    const li = document.createElement("li");
    li.textContent = `${t.description} - ${t.amount} kr (Utgift)`;
    expenseList.appendChild(li);
  }

  transactionList.innerHTML = "";
  [...incomes, ...expenses].forEach(t => {
    const li = document.createElement("li");
    const sign = t.type === "income" ? "+" : "-";
    li.textContent = `${t.description} ${sign}${t.amount} kr`;
    transactionList.appendChild(li);
  });
}

function updateBalance() {
  const incomeTotal = incomes.reduce((sum, t) => sum + t.amount, 0);
  const expenseTotal = expenses.reduce((sum, t) => sum + t.amount, 0);
  const balance = incomeTotal - expenseTotal;

  balanceDisplay.textContent = balance;
  balanceDisplay.style.color = balance >= 0 ? "green" : "red";
}




incomeBtn.addEventListener("click", () => addTransaction("income"));
expenseBtn.addEventListener("click", () => addTransaction("expense"));