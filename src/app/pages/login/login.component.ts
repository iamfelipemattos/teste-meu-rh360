import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';
import { UsersService } from 'src/app/core/services/users.service';
import { ILogin } from 'src/app/pages/login/interface/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  destroyed$: Subject<boolean> = new Subject();
  form!: FormGroup;

  constructor(
    private router: Router,
    private userService: UsersService,
    private sessionService: SessionService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.initialFormState();
  }

  initialFormState() {
    this.form = this.formBuilder.group({
      'email': [
        null,
        [
          Validators.required,
          Validators.email,
        ]
      ],
      'password': [
        null,
        [
          Validators.required,
          Validators.minLength(6),
        ]
      ],
    })
  }

  goToSignupPage(): void {
    this.router.navigate(['/signup']);
  }

  submit() {
    if (this.form.valid) {
      this.login(this.form.value);
      this.form.reset();
    }
  }

  login(user: ILogin): void {
    this.userService.getUser()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          const userFound = res.find((u: ILogin) => {
            return u.email === user.email && u.password === user.password;
          });

          if (userFound) {
            this.sessionService.save({
              accessToken: userFound.email,
            });
            this.router.navigate(['/', 'home']);
          } else {
            alert('Usuário ou senha incorretos, tente novamente!');
          }
        },
        error: () => {
          alert('Usuário ou senha incorretos, tente novamente!');
        }
      })
  }

  ngOnDestroy() {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
