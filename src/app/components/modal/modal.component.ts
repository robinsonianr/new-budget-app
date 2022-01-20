import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  
  budgetForm!:HTMLElement; 
  budgetAmount!:HTMLElement; 
  budgetBut!:HTMLElement; 
  inputAmt!:HTMLElement;
  balanceAmount!:HTMLElement; 
  expNumber!:HTMLElement; 
  expName!:HTMLElement;
  expensesAmount!:HTMLElement;
  expenseForm!:HTMLElement;
  editForm!:HTMLElement; 
  modal!:HTMLElement;
  innerBudget!:HTMLElement;
  innerExpense!:HTMLElement;
  innerBalance!:HTMLElement;
  editExpName!:HTMLInputElement;
  editExpNumber!:HTMLInputElement;

  // Event emitters to update new expense
  @Output() update1 = new EventEmitter<string>();

  @Output() update2 = new EventEmitter<number>();





  constructor(private Expenses: DisplayExpensesComponent) {
   
  }

  
ngOnInit(): void {
    this.modal = document.getElementById("myModal")!
    this.budgetForm = document.getElementById("budgetform")!
    this.editForm = document.getElementById("editForm")!
    this.budgetAmount = document.getElementById("budgetAmount")!
    this.inputAmt  = document.getElementById("inputamt")!
    this.balanceAmount = document.getElementById("balanceAmount")!
    this.expNumber = document.getElementById("expNumber")!
    this.expName = document.getElementById("expName")!
    this.expensesAmount  = document.getElementById("expensesAmount")!
    this.expenseForm  = document.getElementById("expense-form")!
    this.editExpName = <HTMLInputElement>document.getElementById("editExpName")!
    this.editExpNumber = <HTMLInputElement>document.getElementById("editExpNumber")!
    this.innerBudget = document.getElementById("budget-Amount")!
    this.innerExpense = document.getElementById("exp-Amount")!
    this.innerBalance = document.getElementById("bala-Amount")!
    this.budgetBut = document.getElementById("budgetBut")!
  }

  //button click to remove all forms
  spanClick() {
    this.modal.style.display = "none";
};


  
  // Adds budget and sets initial balance
  submitBudget() { 

    if (!this.inputAmount) {
      
      this.inputAmt.style.border = "1px solid #b80c09";
      this.somePlaceholder = "Input can not be empty";
      this.inputAmt.style.color = "#b80c09";
      setTimeout(() => {
        this.inputAmt.style.color = "#495057";
        this.inputAmt.style.border = "1px solid gray";
      }, 3000);
    } else {
      this.budgetAmount.innerText = this.inputAmount;
      this.balanceAmount.innerText = (parseInt(this.inputAmount) - parseInt(this.expensesAmount.innerText)).toString();
      
      this.innerBudget.style.color = "green";
      this.innerBalance.style.color = "green";
      this.expenseForm.style.display = "block";
      this.budgetForm!.style.display = "none";
      this.budgetBut.style.display = "block";
      this.editForm.style.display = "none";
      this.inputAmount = "";
      
    }
  }


  // Adds the expense
  addExpense() {

    if (!this.expTitle || !this.expAmount) {
      this.expNumber.style.border = "1px solid #b80c09";
      this.expNamePlaceholder = "Input can not be empty";
      this.expNumber.style.color = "#b80c09";

      this.expName.style.border = "1px solid #b80c09";
      this.expPlaceholder = "Input can not be empty";
      this.expName.style.color = "#b80c09";
      setTimeout(() => {
        this.expName.style.color = "#495057";
        this.expName.style.border = "1px solid gray";

        this.expNumber.style.color = "#495057";
        this.expNumber.style.border = "1px solid gray";
      }, 3000);

    } else {
      // Emits the expense title and amount to listener to be added to array
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
    
    let totalExp = 0;
    let i = 0;

    for (i = 0; i < this.Expenses.expenses.length; i++) {
      totalExp = this.Expenses.expenses[i].value + totalExp;
    }
    this.expensesAmount.innerText = totalExp.toString();
    this.updateBalance();
  }
  // Updates the balance after the expenses have been calulated
  updateBalance() {
    
    this.balanceAmount.innerText = (parseInt(this.budgetAmount.innerText) - parseInt(this.expensesAmount.innerText)).toString();

    if (parseInt(this.balanceAmount.innerText) > 0) {
      this.innerBalance.style.color = "green";
      this.innerBudget.style.color = "green";
      this.innerExpense.style.color = "red";
     
    }else{
      this.innerBalance.style.color = "red";
      this.innerExpense.style.color = "red";
    }
  }

  
  // Button that calls budget form to submit a new budget
  callBudget(){
    this.budgetForm.style.display = "block";
    this.expenseForm.style.display = "none";
  }

  // Grabs the values of the edited expense from input area and updates them
  getExpenseValue(){
    let edited = this.Expenses.expenses.findIndex((obj) => obj.title == this.editExpName.value);
    this.Expenses.expenses[edited].title = this.editExpName.value
    this.Expenses.expenses[edited].value = parseInt(this.editExpNumber.value);
    this.calcExpense();
    this.editExpName.value ="";
    this.editExpNumber.value = "";
    

  }

}





