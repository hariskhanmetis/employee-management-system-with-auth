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
  public isLoggedIn = new BehaviorSubject<boolean>(false);
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

  register(email: string, password: string, confirmPassword: string): Observable<boolean> {
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return of(false);
    }
  
    return this.http.get<Admin[]>(this.APIURL).pipe(
      map(users => {
        const userExists = users.some(user => user.email === email);
        if (userExists) {
          console.error("Email already registered");
          return false;
        } else {
          const maxId = users.reduce((max, user) => Math.max(max, parseInt(user.id, 10)), 0);
          const newUser: Admin = { id: (maxId + 1).toString(), email, password };
          this.http.post<Admin>(this.APIURL, newUser).subscribe();
          return true;
        }
      })
    );
  }

  logout(): Observable<void> {
    this.isLoggedIn.next(false); 
    return of(void 0);
  }
  
  getAuthState(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
}
