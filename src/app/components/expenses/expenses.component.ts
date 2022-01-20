
import { Component, OnInit } from '@angular/core';
import { ExpValues } from 'src/app/Models/ExpValues';




@Component({
  selector: 'app-display-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class DisplayExpensesComponent implements OnInit {
  expenses!: ExpValues[];
  message1!:string;
  message2!: number;
  checked: boolean = true;

  modal!:HTMLElement;
  btn!:HTMLElement;
  span!:Element;
  budgetForm!:HTMLElement; 
  budgetAmount!:HTMLElement; 
  inputAmt!:HTMLElement;
  balanceAmount!:HTMLElement; 
  expNumber!:HTMLElement; 
  expName!:HTMLElement;
  expensesAmount!:HTMLElement;
  expenseForm!:HTMLElement;
  editForm!:HTMLElement; 
  editExpName!:HTMLInputElement;
  editExpNumber!:HTMLInputElement;


  constructor() { }



  ngOnInit(): void {
    this.expenses = [];
    this.modal = document.getElementById("myModal")!
    this.btn = document.getElementById("myBtn")!
    this.span = document.getElementsByClassName("close")[0]!
    this.expNumber = document.getElementById("expNumber")!
    this.expName = document.getElementById("expName")!
    this.expenseForm  = document.getElementById("expense-form")!
    this.editForm = document.getElementById("editForm")!
    this.expensesAmount = document.getElementById("expensesAmount")!
    this.balanceAmount = document.getElementById("balanceAmount")!
    this.budgetAmount = document.getElementById("budgetAmount")!
    this.budgetForm = document.getElementById("budgetform")!
    this.editExpName = <HTMLInputElement>document.getElementById("editExpName")!
    this.editExpNumber = <HTMLInputElement>document.getElementById("editExpNumber")!
    
  }
  // Reciver 1 that recives the title of the expense from child component
  updateEvent($event: any) {
    this.message1 = $event;
  }
  // Reciver 2 that recives the value of the expense from child component
  EventTwo($event: any) {
    this.message2 = $event;
    this.addNewExpense(this.message1, this.message2)
  }

  // pushes new expense details to expense array 
  addNewExpense(titles: string, values: number) {
    this.expenses.push({
      title: titles,
      value: values
    })
  }
// Deletes the respective expense
  delExpenseDetails($event: any){
    let index = this.expenses.findIndex((item) => item.title === $event);
    this.expenses.splice(index, 1);
    this.calcExpense();
  }

  // Displays edit form and sets input area to the respective expense's details to be edited 
  editExpenseDetails(title: any){
    this.expenseForm.style.display = "none";
    this.budgetForm.style.display = "none";
    this.editForm.style.display = "block";
    this.expenses.findIndex((item) => {
      if (item.title === title) {
          this.editExpName.value = item.title;
          this.editExpNumber.value = item.value.toString();
          this.modal.style.display = "block";
      }
    });
  }

  
  // Calculates the expense from all expenses entered in the expense array
  calcExpense() {
    
    let totalExp = 0;
    let i = 0;
    for (i = 0; i < this.expenses.length; i++) {
      totalExp = this.expenses[i].value + totalExp;
      
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

  // Dislpays both the budget and expense form
  btnClick(){
    this.expName.innerText = "";
    this.expNumber.innerText = "";
    this.expenseForm.style.display = "block";
    this.editForm.style.display = "none";
    this.modal.style.display = "block";
  }

}
