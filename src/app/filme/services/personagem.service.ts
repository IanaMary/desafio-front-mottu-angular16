import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonagemService {

  url = environment.apiUrl;
  urlJsonServer = 'http://localhost:3000/personagens';
  private readonly endpointPersonagens: string = 'character';

  favoritos: any[] = [];

  constructor(private http: HttpClient) { }


  getListarFilmes(page: number, name?: string) {
    let params = new HttpParams().set('page', page);

    if (name) {
      params = params.set('name', name); // adiciona query string ?name=...
    }
    return this.http.get(`${this.url}${this.endpointPersonagens}`, { params });
  }


  postAdicionarFavorito(personagem: any) {
    return this.http.post(`${this.urlJsonServer}`, personagem);
  }

  deleteRemoverFavorito(personagem: any) {
    return this.http.delete(`${this.urlJsonServer}/${personagem.id}`);
  }


  getListarFilmesFavoritos(params: HttpParams) {
    return this.http.get<any[]>(this.urlJsonServer);
  }

  estaFavorito(personagem: any): boolean {
    return this.favoritos.some(f => f.id === personagem.id);
  }

  salvarNoLocalStorage() {
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  carregarDoLocalStorage() {
    const data = localStorage.getItem('favoritos');
    if (data) {
      this.favoritos = JSON.parse(data);
    }
  }
}