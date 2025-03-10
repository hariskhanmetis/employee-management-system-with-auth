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
  private loggedInUser = new BehaviorSubject<Admin | null>(null);
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<Admin[]>(this.APIURL).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this.isLoggedIn.next(true);
          this.loggedInUser.next(user); 
          return true;
        }
        return false;
      })
    );
  }

  register(email: string, password: string): Observable<Admin> {
    const newUser: Admin = { id: this.generateId(), email, password };
    return this.http.post<Admin>(this.APIURL, newUser);
  }

  private generateId(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  logout(): Observable<boolean> {
    this.isLoggedIn.next(false);
    return of(false);
  }

  getAuthState(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  getLoggedInUser(): Observable<Admin | null> {
    return this.loggedInUser.asObservable();
  }
}
