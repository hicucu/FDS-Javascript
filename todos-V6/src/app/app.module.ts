import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { TodoContainerComponent } from "./components/todo-container.component";
import { TodoFormComponent } from "./components/todo-form.component";
import { TodoNavComponent } from "./components/todo-nav.component";
import { TodoFooterComponent } from "./components/todo-footer.component";
import { TodoListComponent } from "./components/todo-list.component";
import { TodosFilterPipe } from "./pipes/todos-filter.pipe";

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
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
