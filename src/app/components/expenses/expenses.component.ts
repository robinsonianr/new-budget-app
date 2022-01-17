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

  constructor() { }



  ngOnInit(): void {
    this.expenses = [];
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

}
