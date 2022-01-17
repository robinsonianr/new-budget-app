import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DisplayExpensesComponent } from './../expenses/expenses.component';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  inputAmount: string = "";
  expAmount: string = "";
  expTitle: string = "";

  expNamePlaceholder: string = "";
  somePlaceholder: string = "";
  expPlaceholder: string = "";
  message!: string;

  // Event emitters to update new expense
  @Output() update1 = new EventEmitter<string>();

  @Output() update2 = new EventEmitter<number>();





  constructor(private Expenses: DisplayExpensesComponent) {

  }

  ngOnInit(): void {

  }
  // Adds budget and sets initial balance
  submitBudget() {
    let budgetAmount = document.getElementById("budgetAmount")!
    let inputAmt = document.getElementById("inputamt")!
    let balanceAmount = document.getElementById("balanceAmount")!

    if (!this.inputAmount) {
      inputAmt.style.border = "1px solid #b80c09";
      this.somePlaceholder = "Input can not be empty";
      inputAmt.style.color = "#b80c09";
      setTimeout(() => {
        inputAmt.style.color = "#495057";
        inputAmt.style.border = "1px solid gray";
      }, 3000);
    } else {
      budgetAmount.innerText = this.inputAmount;
      balanceAmount.innerText = this.inputAmount;
      budgetAmount.style.color = "green";
      balanceAmount.style.color = "green";
      this.inputAmount = "";
      this.somePlaceholder = "";
    }
  }

  // Adds the expense
  addExpense() {

    let expNumber = document.getElementById("expNumber")!
    let expName = document.getElementById("expName")!

    if (!this.expTitle || !this.expAmount) {
      expNumber.style.border = "1px solid #b80c09";
      this.expNamePlaceholder = "Input can not be empty";
      expNumber.style.color = "#b80c09";

      expName.style.border = "1px solid #b80c09";
      this.expPlaceholder = "Input can not be empty";
      expName.style.color = "#b80c09";
      setTimeout(() => {
        expName.style.color = "#495057";
        expName.style.border = "1px solid gray";

        expNumber.style.color = "#495057";
        expNumber.style.border = "1px solid gray";
      }, 3000);

    } else {
      // emits the expense title and amount to listener to be added to array
      this.update1.emit(this.expTitle);
      this.update2.emit(parseInt(this.expAmount));
      this.expAmount = "";
      this.expTitle = "";
      this.expNamePlaceholder = "";
      this.expPlaceholder = "";
      this.calcExpense();
    }
  }



  // Calculates the the total expense from all the expenses
  calcExpense() {
    let expensesAmount = document.getElementById("expensesAmount")!
    let totalExp = 0;
    let i = 0;

    for (i = 0; i < this.Expenses.expenses.length; i++) {
      totalExp = this.Expenses.expenses[i].value + totalExp;
    }
    expensesAmount.innerText = totalExp.toString();
    this.updateBalance();
  }
  // Updates the balance after the expenses have been calulated
  updateBalance() {
    let balanceAmount = document.getElementById("balanceAmount");
    let expensesAmount = document.getElementById("expensesAmount")!
    let budgetAmount = document.getElementById("budgetAmount")!
    balanceAmount!.innerText = (parseInt(budgetAmount.innerText) - parseInt(expensesAmount.innerText)).toString();

    if (parseInt(balanceAmount!.innerText) > 0) {
      balanceAmount!.style.color = "green";
      budgetAmount!.style.color = "green";
      expensesAmount!.style.color = "red";
      balanceAmount!.style.color = "red";
    }



  }

}



