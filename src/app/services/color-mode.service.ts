import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);

  getDarkMode(): Observable<boolean> {
    return this.darkModeSubject.asObservable();
  }

  setDarkMode(isDark: boolean) {
    this.darkModeSubject.next(isDark);
  }
}
