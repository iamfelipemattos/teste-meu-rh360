import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';
import { UsersService } from 'src/app/core/services/users.service';
import { ILogin } from 'src/app/pages/login/interface/login.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  destroyed$: Subject<boolean> = new Subject();
  form!: FormGroup;

  constructor(
    private router: Router,
    private userService: UsersService,
    private sessionService: SessionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initialFormState();
  }

  initialFormState() {
    this.form = this.formBuilder.group({
      'fullName': [
        null,
        [
          Validators.required,
        ]
      ],
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
        ],
      ],
      'confirmPassword': [
        null,
        [
          Validators.required,
          Validators.minLength(6),
        ],
      ],
      'acceptTerms': [
        false, Validators.requiredTrue
      ]
    })
  }

  checkPasswordsMatch(): void {
    const password = this.form.get('password')!;
    const confirmPassword = this.form.get('confirmPassword')!;

    if (password.value !== confirmPassword.value) {
      this.form.get('confirmPassword')!.setErrors({ notSame: true });
    }
  }

  goToLoginPage(): void {
    this.router.navigate(['/login']);
  }

  submit() {
    if (this.form.valid) {
      this.create(this.form.value);
      this.form.reset();
    }
  }

  create(user: ILogin): void {
    this.userService.createUser(user)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          // usuário criado com sucesso.
        },
        error: () => {
          // Houve um erro ao criar o usuário, tente novamente!;
        }
      })
  }

  ngOnDestroy() {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
