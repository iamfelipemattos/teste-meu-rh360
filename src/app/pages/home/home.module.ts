import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users.service';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AddTaskComponent } from 'src/app/shared/components/tasks/add-task/add-task.component';
import { ListTaskComponent } from 'src/app/shared/components/tasks/list-task/list-task.component';
import { TasksService } from 'src/app/shared/components/tasks/services/tasks.service';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    HomeComponent,
    AddTaskComponent,
    ListTaskComponent
  ],
  providers: [
    UsersService,
    TasksService
  ]
})
export class HomeModule { }
