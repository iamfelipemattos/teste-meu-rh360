import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ISession } from "src/app/shared/interfaces/session.interface";

const ACCESS_KEY_TOKEN = "auth";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  private session = new BehaviorSubject<ISession | null>(null);

  constructor() {
    this.restoreSession();
  }

  restoreSession() {
    const tokenSession = sessionStorage.getItem(
      ACCESS_KEY_TOKEN
    );

    if (!tokenSession) {
      return;
    }

    const session: ISession =
      JSON.parse(tokenSession);
    this.session.next(session);
  }

  save(session: ISession) {
    sessionStorage.setItem(
      ACCESS_KEY_TOKEN,
      JSON.stringify(session)
    );

    this.session.next(session);
  }

  clear() {
    sessionStorage.clear();
    this.session.next(null);
  }

  getSession() {
    return this.session.asObservable();
  }

  isLogged() {
    return this.session.value !== null;
  }
}
