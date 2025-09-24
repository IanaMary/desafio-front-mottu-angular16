import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {

  url = environment.apiUrl;
  private readonly endpointPersonagens: string = 'character';

  constructor(private http: HttpClient) { }


  listarFilmes(page: number) {
    return this.http.get(`${this.url}${this.endpointPersonagens}?page=${page}`);
  }


}