import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private baseUrl = 'http://localhost:8090/api/competitions';
  private participationUrl = 'http://localhost:8090/api/participations';


  constructor(private http: HttpClient) {}

  getCompetitions(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}?page=0&size=3`, { headers });
  }

  getAllCompetitions(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.baseUrl, { headers }); // Utilise seulement baseUrl
  }

  registerParticipation(userId: string, competitionId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { userId, competitionId };
    return this.http.post<any>(`${this.participationUrl}/register`, body, { headers });
  }

}
