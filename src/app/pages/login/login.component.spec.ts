import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { UsersService } from "src/app/core/services/users.service";
import { SessionService } from "src/app/core/services/session.service";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from "@angular/forms";
import { of } from "rxjs";
import { environment } from "src/environments/environment.development";
import { ILogin } from "./interface/login.interface";
import { Router } from "@angular/router";

const loginMock = [
  {
    "email": "felipe.mattosj@gmail.com",
    "password": "123456"
  }
]

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let sessionService: SessionService;
  let userService: UsersService;
  let httpTestingController: HttpTestingController;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      providers: [
        UsersService,
        SessionService,
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    sessionService = TestBed.inject(SessionService);
    userService = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('Deve instanciar a página de login', () => {
    expect(component).toBeTruthy();
  });

  it('Deve criar o form', () => {
    spyOn(component, 'initialFormState').and.callThrough();
    component.ngOnInit();
    expect(component.initialFormState).toHaveBeenCalled();
  });

  it('Deve chamar o serviço de login e retornar lista de usuários', () => {

    userService.getUser().subscribe((res) => {
      expect(res).toEqual(loginMock);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: environment.apiUsers,
    });
    req.flush(loginMock);
  });

  it('Deve ir para a página de Cadastro', () => {
    component.goToSignupPage();
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs[0]).toBe('/signup');
  });

  it('Deve chamar serviço de login por meio do submit', () => {
    spyOn(component, 'login').and.callThrough();
    component.form.controls['email'].setValue('teste@gmail.com');
    component.form.controls['password'].setValue('123456');
    component.submit();

    userService.getUser().subscribe((res) => {
      const userFound = res.find((u: ILogin) => {
        return u.email === loginMock[0].email && u.password === loginMock[0].password;
      });

      expect(userFound).toEqual(loginMock[0]);

      if (userFound) {
        sessionService.save({
          accessToken: userFound.email
        });
      }

    });
    expect(component.login).toHaveBeenCalled();
  })
});
