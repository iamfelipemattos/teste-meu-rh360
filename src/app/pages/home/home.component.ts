import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';
import { ITask } from 'src/app/shared/components/tasks/interface/task.interface';
import { TasksService } from 'src/app/shared/components/tasks/services/tasks.service';
import { ISession } from 'src/app/shared/interfaces/session.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  destroyed$: Subject<boolean> = new Subject();
  public session$: Observable<ISession | null>;
  public tasks: Array<ITask> = [];

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private tasksService: TasksService
  ) {
    this.session$ = this.sessionService.getSession();
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.tasksService.get()
      .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (res: ITask[]) => {
            this.tasks = res;
          }
        })
  }

  actionType(obj: any): void {
    if (obj.status === 'edit') {
      this.update(obj.task);
    }

    if (obj.status === 'update') {
      this.update(obj.task);
    }

    if (obj.status === 'delete') {
      this.remove(obj.task.id);
    }
  }

  add(task: ITask): void {
    this.tasksService.create(task)
      .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => {
            this.getTasks();
          },
          error: () => {
          }
        })
  }

  update(task: ITask): void {
    this.tasksService.update(task)
      .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => {
            this.getTasks();
          },
          error: () => {
          }
        })
  }

  remove(id: string): void {
    this.tasksService.delete(id)
      .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => {
            this.getTasks();
          },
          error: () => {
          }
        })
  }

  logout() {
    this.sessionService.clear();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
