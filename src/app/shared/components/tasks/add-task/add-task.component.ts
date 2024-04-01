import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../interface/task.interface';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  @Output() addTask = new EventEmitter<ITask>();
  form!: FormGroup;

  constructor(
    private tasksService: TasksService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      task: ['', Validators.required],
    });
  }

  add() {
    this.addTask.emit({
      id: uuidv4(),
      description: this.form.controls['task'].value,
      completed: false,
    });
    this.form.reset();
  }
}
