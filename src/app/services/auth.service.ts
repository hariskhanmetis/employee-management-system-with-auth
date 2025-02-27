import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private APIURL = 'http://localhost:3000/users';
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.APIURL).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user)); 
          this.isLoggedIn.next(true); 
          return true;
        }
        return false;
      })
    );
  }

  logout(): Observable<void> {
    console.log('Logout method called');
    localStorage.removeItem('user'); 
    this.isLoggedIn.next(false); 
    console.log('User removed from local storage, updating isLoggedIn state');
    return of(void 0);
  }
  
  getAuthState(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
}
