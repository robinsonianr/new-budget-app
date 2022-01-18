
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
  editExpName!:string;
  editExpNumber!:number;


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
    this.editExpName = (<HTMLInputElement>document.getElementById("editExpName")).value!
    this.editExpNumber = parseInt((<HTMLInputElement>document.getElementById("editExpNumber")).value!)
    
  }

  updateEvent($event: any) {
    this.message1 = $event;
  }

  EventTwo($event: any) {
    this.message2 = $event;
    this.addNewExpense(this.message1, this.message2)
  }

  addNewExpense(titles: string, values: number) {
    this.expenses.push({
      title: titles,
      value: values
    })
  }

  delExpenseDetails($event: any){
    let index = this.expenses.findIndex((item) => item.title === $event);
    this.expenses.splice(index, 1);
    this.calcExpense();
  }

  editExpenseDetails(title: any){
    this.expenseForm.style.display = "none";
    this.budgetForm.style.display = "none";
    this.editForm.style.display = "block";
    this.expenses.findIndex((item) => {
      if (item.title === title) {
          this.editExpName = item.title;
          this.editExpNumber = item.value;
          this.modal.style.display = "block";
      }
    });
  }

  

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

  btnClick(){
    this.expName.innerText = "";
    this.expNumber.innerText = "";
    this.expenseForm.style.display = "block";
    this.editForm.style.display = "none";
    this.modal.style.display = "block";
  }

}
