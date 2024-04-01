import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ILogin } from "src/app/pages/login/interface/login.interface";
import { ISignup } from "src/app/pages/signup/interface/signup.interface";
import { environment } from "src/environments/environment.development";

@Injectable({providedIn:'root'})
export class UsersService {

  constructor(private http: HttpClient) {}

  getUser(): Observable<ILogin[]> {
    return this.http.get<ILogin[]>(environment.apiUsers)
  }

  createUser(user: ILogin): Observable<ILogin> {
    const body = JSON.stringify(user);
    return this.http.post<ILogin>(environment.apiUsers, body)
  }

}
