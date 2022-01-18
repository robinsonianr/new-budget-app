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
  editExpName!:string;
  editExpNumber!:number;

  expNamePlaceholder: string = "";
  somePlaceholder: string = "";
  expPlaceholder: string = "";
  message!: string;

  
  budgetForm!:HTMLElement; 
  budgetAmount!:HTMLElement; 
  inputAmt!:HTMLElement;
  balanceAmount!:HTMLElement; 
  expNumber!:HTMLElement; 
  expName!:HTMLElement;
  expensesAmount!:HTMLElement;
  expenseForm!:HTMLElement;
  editForm!:HTMLElement; 
  modal!:HTMLElement;

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
    this.editExpName = (<HTMLInputElement>document.getElementById("editExpName")).value!
    this.editExpNumber = parseInt((<HTMLInputElement>document.getElementById("editExpNumber")).value!)
   
  }

  
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
      this.balanceAmount.innerText = this.inputAmount;
      this.budgetAmount.style.color = "green";
      this.balanceAmount.style.color = "green";
      this.expenseForm.style.display = "block";
      this.budgetForm!.style.display = "none";
      this.editForm.style.display = "none";
      this.inputAmount = "";
      // this.somePlaceholder = "";
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
    
    this.balanceAmount!.innerText = (parseInt(this.budgetAmount.innerText) - parseInt(this.expensesAmount.innerText)).toString();

    if (parseInt(this.balanceAmount!.innerText) > 0) {
      this.balanceAmount!.style.color = "green";
      this.budgetAmount!.style.color = "green";
      this.expensesAmount!.style.color = "red";
     
    }else{
      this.balanceAmount!.style.color = "red";
      this.expensesAmount!.style.color = "red";
    }
  }

  

  callBudget(){
    this.budgetForm.style.display = "block";
    this.expenseForm.style.display = "none";
  }

  getExpenseValue(){
    let title = (<HTMLInputElement>document.getElementById('editExpName')).value!
    let editedNumber = parseInt((<HTMLInputElement>document.getElementById('editExpNumber')).value!)
    let edited = this.Expenses.expenses.findIndex((obj) => obj.title == title);
    this.Expenses.expenses[edited].title = title;
    this.Expenses.expenses[edited].value = editedNumber
    this.calcExpense();
  }

}





