/**
 * @jest-environment jsdom
 */

// In most Jest setups, you do *not* need to import { expect } from "@jest/globals";
// Jest provides a global `expect` automatically.


// ...existing code...
describe("Transaction functionality", () => {
  beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = `
      <input id="desc" />
      <input id="amount" />
      <button id="incomeBtn"></button>
      <button id="expenseBtn"></button>
      <ul id="incomeList"></ul>
      <ul id="expenseList"></ul>
      <ul id="transactionList"></ul>
      <div id="balance"></div>
    `;
    require("./src/script.js");
  });

  it("adds an income and updates balance", () => {
    const descInput = document.getElementById("desc");
    const amountInput = document.getElementById("amount");
    const incomeBtn = document.getElementById("incomeBtn");

    const description = "Salary";
    const amount = "1000";

    descInput.value = description;
    amountInput.value = amount;
    incomeBtn.click();

    expect(document.getElementById("incomeList").textContent)
      .toContain(`${description} + ${amount} kr (Inkomst)`);
    expect(document.getElementById("balance").textContent).toBe(amount);
  });

  it("adds an expense and updates balance", () => {
    const descInput = document.getElementById("desc");
    const amountInput = document.getElementById("amount");
    const expenseBtn = document.getElementById("expenseBtn");

    const description = "Groceries";
    const amount = "200";

    descInput.value = description;
    amountInput.value = amount;
    expenseBtn.click();

    expect(document.getElementById("expenseList").textContent)
      .toContain(`${description} - ${amount} kr (Utgift)`);
    expect(document.getElementById("balance").textContent).toBe(`-${amount}`);
  });
});

