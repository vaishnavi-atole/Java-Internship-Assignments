import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageResult } from '../models/page.model';
import { Student, StudentRequest } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private readonly http = inject(HttpClient);

  getStudents(params: {
    keyword?: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: string;
  }): Observable<PageResult<Student>> {
    let httpParams = new HttpParams();
    if (params.keyword) {
      httpParams = httpParams.set('keyword', params.keyword);
    }
    httpParams = httpParams
      .set('page', params.page ?? 0)
      .set('size', params.size ?? 10)
      .set('sortBy', params.sortBy ?? 'createdAt')
      .set('sortDir', params.sortDir ?? 'desc');

    return this.http.get<PageResult<Student>>(`${environment.apiUrl}/students`, { params: httpParams });
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${environment.apiUrl}/students/${id}`);
  }

  getMe(): Observable<Student> {
    return this.http.get<Student>(`${environment.apiUrl}/students/me`);
  }

  createStudent(payload: StudentRequest): Observable<Student> {
    return this.http.post<Student>(`${environment.apiUrl}/students`, payload);
  }

  updateStudent(id: number, payload: StudentRequest): Observable<Student> {
    return this.http.put<Student>(`${environment.apiUrl}/students/${id}`, payload);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/students/${id}`);
  }
}
