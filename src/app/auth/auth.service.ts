import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isLogged = false;
  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(500),
      tap(val => this.isLogged = val)
    );
  }

  logout(): Observable<boolean> {
    return of(false).pipe(
      delay(500),
      tap(val => this.isLogged = false)
    );
  }

}
