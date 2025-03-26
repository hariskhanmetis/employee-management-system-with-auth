import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Job } from '../models/job.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private job_API = 'https://internships-api.p.rapidapi.com/active-jb';
  private jobsKey = 'SavedJobsKey';

  constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]> {
    const savedJobs = localStorage.getItem(this.jobsKey);
    if(savedJobs) {
      return of(JSON.parse(savedJobs));
    }

    return this.http.get<Job[]>(this.job_API).pipe(
      tap((jobs) => {
        localStorage.setItem(this.jobsKey, JSON.stringify(jobs));
      })
    )
  }
}
