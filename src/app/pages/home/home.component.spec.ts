import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { SessionService } from "src/app/core/services/session.service";
import { UsersService } from "src/app/core/services/users.service";
import { environment } from "src/environments/environment.development";
import { HomeComponent } from "./home.component";
import { TasksService } from "src/app/shared/components/tasks/services/tasks.service";
import { of } from "rxjs";
import { ITask } from "src/app/shared/components/tasks/interface/task.interface";
import { AddTaskComponent } from "src/app/shared/components/tasks/add-task/add-task.component";
import { ListTaskComponent } from "src/app/shared/components/tasks/list-task/list-task.component";

const taskMock = [
  {
    "id": "b9ff67c9-0696-4a2f-a46c-90312f482d49",
    "description": "teste",
    "completed": true
  },
  {
    "id": "9fc79841-e334-4186-ab39-3e290af8be61",
    "description": "teste 123",
    "completed": false
  }
]

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let sessionService: SessionService;
  let taskService: TasksService;
  let httpTestingController: HttpTestingController;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        AddTaskComponent,
        ListTaskComponent
      ],
      providers: [
        SessionService,
        TasksService,
        {
          provide: Router,
          useValue: routerSpy
        }
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    sessionService = TestBed.inject(SessionService);
    taskService = TestBed.inject(TasksService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('Deve instanciar a página Home', () => {
    expect(component).toBeTruthy();
  });

  it('Deve iniciar pagina home e chamar serviço de listagem de tasks', () => {
    spyOn(component, 'getTasks').and.callThrough();
    component.ngOnInit();
    expect(component.getTasks).toHaveBeenCalled();
  });

  it('Deve chamar serviço de listagem de tasks.', () => {
    spyOn(taskService, 'get').and.returnValue(of(taskMock));

    taskService.get().subscribe({ next: (res: ITask[]) => {
      expect(res).toEqual(taskMock);
    }});

    const req = httpTestingController.expectOne(environment.apiTasks);
    expect(req.request.method).toEqual('GET');
    req.flush(taskMock);
  });

  it('Deve chamar o metodo para remover uma task.', () => {
    spyOn(taskService, 'delete').and.returnValue(of());
    const obj = {
      task: taskMock[0],
      status: 'delete'
    }
    component.actionType(obj);

    component.remove(taskMock[0].id);
    expect(taskService.delete).toHaveBeenCalled();
  });

  it('Deve chamar o metodo para marcar uma task como concluida.', () => {
    spyOn(taskService, 'update').and.returnValue(of());
    const obj = {
      task: taskMock[0],
      status: 'update'
    }
    component.actionType(obj);

    component.update(taskMock[0]);
    expect(taskService.update).toHaveBeenCalled();
  });

  it('Deve chamar o metodo para remover uma task.', () => {
    spyOn(taskService, 'delete').and.returnValue(of());
    component.remove(taskMock[0].id);
    expect(taskService.delete).toHaveBeenCalled();
  });

  it('Deve chamar o metodo de criação de task.', () => {
    spyOn(taskService, 'create').and.returnValue(of(taskMock[0]));

    taskService.create(taskMock[0]).subscribe({ next: (res) => {
      expect(res).toEqual(taskMock[0]);
    }});

    const req = httpTestingController.expectOne(environment.apiTasks);
    expect(req.request.method).toEqual('GET');
    req.flush(taskMock);
  });

  it('Deve chamar o metodo logout.', () => {
    spyOn(sessionService, 'clear').and.callThrough();
    component.logout();

    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs[0]).toEqual('/login');
    expect(sessionService.clear).toHaveBeenCalled();
  });

});
