import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications:  string[] = [];
  private notificationSubject = new BehaviorSubject<string[]>([]);

  constructor() { }

  getNotifications(): Observable<string[]> {
    return this.notificationSubject.asObservable();
  }

  addNotification(message: string) {
    this.notifications.push(message);
    this.notificationSubject.next([...this.notifications]);
  }

  clearNotifications() {
    this.notifications = [];
    this.notificationSubject.next([]);
  }
}
