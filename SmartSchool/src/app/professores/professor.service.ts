import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Professor } from '../models/Professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  baseUrl = `${environment.UrlPrincipal}/api/professor`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.baseUrl}/${id}`);
  }

  post(professor: Professor) {
    return this.http.post(`${this.baseUrl}`, professor);
  }

  put(id: number, professor: Professor) {
    return this.http.put(`${this.baseUrl}/${id}`, professor);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
