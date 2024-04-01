import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import(`./pages/login/login.module`).then(
      module => module.LoginModule
    ),
  },
  {
    path: 'signup',
    loadChildren: () => import(`./pages/signup/signup.module`).then(
      module => module.SignupModule
    ),
  },
  {
    path: 'home',
    loadChildren: () => import(`./pages/home/home.module`).then(
      module => module.HomeModule
    ),
    canActivate: [AuthGuard],
  },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
