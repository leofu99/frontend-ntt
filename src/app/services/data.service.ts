import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserData(document: string, documentType: string): Observable<any> {
    // Construir los parámetros de la consulta
    let params = new HttpParams();
    params = params.append('document', document);
    params = params.append('documentType', documentType);

    // Realizar la solicitud GET con los parámetros de consulta
    return this.http.get<any>(this.apiUrl, { params: params });
  }
}
