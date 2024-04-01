import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../interface/task.interface';

@Component({
  selector: 'app-list-task',
  templateUrl: `./list-task.component.html`,
  styleUrls: ['./list-task.component.scss'],
})
export class ListTaskComponent {
  @Input() tasks!: Array<ITask>;
  @Output() action = new EventEmitter<{task: ITask, status: string}>();

  isEdit: boolean = false;

  complete(event: any, t: ITask) {
    t.completed = event.checked;
    this.action.emit({ task: t, status: 'update' });
  }

  edit(task: ITask): void {
    this.isEdit = true;
    // this.action.emit({ task, status: 'edit' })
  }

  delete(task: ITask): void {
    this.action.emit({ task, status: 'delete' });
  }
}
