import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateEbook } from '../_interfaces/create-ebook';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { EditEbook } from '../_interfaces/edit-ebook';

@Injectable({
  providedIn: 'root',
})
export class EbookService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createEbook(ebook: CreateEbook): Observable<Object> {
    return this.http.post(`${this.baseUrl}/api/ebook/`, ebook);
  }

  updateEbook(ebook: EditEbook, id: number): Observable<Object>{
    return this.http.put(`${this.baseUrl}/api/ebook/${id}`,ebook);
  }
}
