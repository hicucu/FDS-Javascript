import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { TodoContainerComponent } from "./todo-container/todo-container.component";
import { TodoFormComponent } from "./todo-form/todo-form.component";
import { TodoNavComponent } from "./todo-nav/todo-nav.component";
import { TodoFooterComponent } from "./todo-footer/todo-footer.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodosFilterPipe } from './todos-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoContainerComponent,
    TodoFormComponent,
    TodoNavComponent,
    TodoFooterComponent,
    TodoListComponent,
    TodosFilterPipe
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
