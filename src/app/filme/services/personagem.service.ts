import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonagemService {

  url = environment.apiUrl;
  private readonly endpointPersonagens: string = 'character';

  constructor(private http: HttpClient) { }


  getListarFilmes(page: number, name?: string) {
    let params = new HttpParams().set('page', page);

    if (name) {
      params = params.set('name', name); // adiciona query string ?name=...
    }
    return this.http.get(`${this.url}${this.endpointPersonagens}`, { params });
  }


}