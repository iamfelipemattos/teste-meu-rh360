import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionService } from 'src/app/core/services/session.service';
import { UsersService } from 'src/app/core/services/users.service';
import { single } from 'rxjs';

const signupMock = {
  "fullName": "Felipe Mattos",
  "email": "felipe.mattosj@gmail.com",
  "password": "123456",
  "confirmPassword": "123456",
  "acceptTerms": true
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let sessionService: SessionService;
  let userService: UsersService;
  let httpTestingController: HttpTestingController;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        UsersService,
        SessionService,
        {
          provide: Router,
          useValue: routerSpy
        }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    sessionService = TestBed.inject(SessionService);
    userService = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('Deve criar página de cadastro de usuários', () => {
    expect(component).toBeTruthy();
  });

  it('Deve criar estanciar form', () => {
    spyOn(component, 'initialFormState').and.callThrough();
    component.ngOnInit();
    expect(component.initialFormState).toHaveBeenCalled();
  });

  it('Deve ir para a página de login', () => {
    component.goToLoginPage();
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs[0]).toBe('/login');
  });

  it('Deve chamar serviço de cadastro de usuario por meio do submit', () => {
    spyOn(component, 'create').and.callThrough();
    component.form.controls['fullName'].setValue('Felipe Mattos');
    component.form.controls['email'].setValue('teste@gmail.com');
    component.form.controls['password'].setValue('123456');
    component.form.controls['confirmPassword'].setValue('123456');
    component.form.controls['acceptTerms'].setValue(true);
    component.submit();

    userService.createUser(signupMock).subscribe((res) => {
      expect(res).toEqual(signupMock);
    });
    expect(component.create).toHaveBeenCalled();
  })
});
