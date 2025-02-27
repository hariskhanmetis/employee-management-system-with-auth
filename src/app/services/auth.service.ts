import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Admin } from '../models/admin.model';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private APIURL = 'http://localhost:3000/admins';
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<Admin[]>(this.APIURL).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) { 
          this.isLoggedIn.next(true); 
          return true;
        }
        return false;
      })
    );
  }

  logout(): Observable<void> {
    console.log('Logout method called');
    this.isLoggedIn.next(false); 
    return of(void 0);
  }
  
  getAuthState(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
}
