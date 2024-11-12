import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:3000/src/app/api/createNote.php'; // URL do backend

  constructor(private http: HttpClient) {}

  createNote(title: string, content: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { title, content };
    return this.http.post<any>(`${this.apiUrl}/createNote.php`, body, { headers });
    tap(response => {
      console.log('Resposta da API:', response); // Verifica a resposta da API
    })
  }
  getNotes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getNotes.php`);
  }
}