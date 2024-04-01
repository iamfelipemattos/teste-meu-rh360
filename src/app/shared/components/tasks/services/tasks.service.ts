import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITask } from "../interface/task.interface";
import { environment } from "src/environments/environment.development";

@Injectable({providedIn:'root'})
export class TasksService {

  constructor(private http: HttpClient) {}

  get(): Observable<ITask[]> {
    return this.http.get<ITask[]>(environment.apiTasks)
  }

  create(task: ITask): Observable<ITask> {
    const body = JSON.stringify(task);
    return this.http.post<ITask>(environment.apiTasks, body)
  }

  update(task: ITask): Observable<ITask> {
    const body = JSON.stringify(task);
    return this.http.put<ITask>(`${environment.apiTasks}/${task.id}`, body)
  }

  delete(id: string): Observable<ITask> {
    return this.http.delete<ITask>(`${environment.apiTasks}/${id}`)
  }
}
