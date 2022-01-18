import { Component, OnInit } from '@angular/core';
import { ExpValues } from 'src/app/Models/ExpValues';




@Component({
  selector: 'app-display-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class DisplayExpensesComponent implements OnInit {

  expenses!: ExpValues[];
  message1: string = "hello";
  message2!: number;
  checked: boolean = true;

  modal!:HTMLElement;
  btn!:HTMLElement;
  span!:Element;
  expNumber!:HTMLElement; 
  expName!:HTMLElement;
  expenseForm!:HTMLElement;
  editForm!:HTMLElement; 

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

  btnClick(){
    this.expName.innerText = "";
    this.expNumber.innerText = "";
    this.expenseForm.style.display = "block";
    this.editForm.style.display = "none";
    this.modal.style.display = "block";
  }

}
