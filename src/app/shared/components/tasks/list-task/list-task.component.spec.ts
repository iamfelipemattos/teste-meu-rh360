import { ComponentFixture, TestBed } from "@angular/core/testing";
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

describe('ListTaskComponent', () => {
  let component: ListTaskComponent;
  let fixture: ComponentFixture<ListTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListTaskComponent,
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(ListTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve instanciar o component de llistagem de tasks', () => {
    expect(component).toBeTruthy();
  });

  it('Deve emitir evento de uma tarefa concluida', () => {
    spyOn(component.action, 'emit').and.callThrough();
    const event = {
      checked: true
    };
    component.complete(event, taskMock[0]);
    expect(component.action.emit).toHaveBeenCalled();
  });

  it('Deve emitir evento de exclusão de uma tarefa', () => {
    spyOn(component.action, 'emit').and.callThrough();
    component.delete(taskMock[0]);
    expect(component.action.emit).toHaveBeenCalled();
  });
});
