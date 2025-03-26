import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private job_API = 'https://internships-api.p.rapidapi.com/active-jb-7d?limit=5';

  
  constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.job_API);
  }

  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.job_API}/${id}`);
  }
}
