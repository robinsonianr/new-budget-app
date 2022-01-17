import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BudgetComponent } from './components/budget/budget.component';
import { DisplayExpensesComponent } from './components/expenses/expenses.component';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    DisplayExpensesComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [DisplayExpensesComponent, ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
