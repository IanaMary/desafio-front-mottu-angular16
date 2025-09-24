import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonagemService {

  url = environment.apiUrl;
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


  adicionar(personagem: any) {
    if (!this.estaFavorito(personagem)) {
      this.favoritos.push(personagem);
      this.salvarNoLocalStorage();
    }
  }

  remover(personagem: any) {
    this.favoritos = this.favoritos.filter(f => f.id !== personagem.id);
    this.salvarNoLocalStorage();
  }

  listar(): any[] {
    return this.favoritos;
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