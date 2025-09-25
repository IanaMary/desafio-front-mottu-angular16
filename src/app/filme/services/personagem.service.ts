import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonagemService {

  urlRick = environment.apiUrlRick;

  endpointPersonagens: string = 'character';

  totalFavoritos = new Subject<void>();
  totalFavoritos$ = this.totalFavoritos.asObservable();

  favoritos$ = new BehaviorSubject<any[]>([]);
  favoritosObs$ = this.favoritos$.asObservable();

  constructor(private http: HttpClient) { }


  emitirTotalFavoritos() {
    this.totalFavoritos.next();
  }


  // busca personagens na API Rick
  getListarPersonagensRick(page: number, name?: string) {
    let params = new HttpParams()
      .set('page', page)

    if (name) {
      params = params.set('name', name);
    }
    return this.http.get(`${this.urlRick}${this.endpointPersonagens}`, { params });
  }

  getListarPersonagensFavoritos(page: number) {
    const favoritos = this.favoritos$.value; // array completo de favoritos
    const inicio = (page - 1) * 20;
    const fim = inicio + 20;
    return favoritos.slice(inicio, fim);
  }

  adicionar(personagem: any) {
    const novosFavoritos = [...this.favoritos$.value, personagem];
    this.favoritos$.next(novosFavoritos);
    this.countTotalFavoritos();
  }

  remover(personagem: any) {
    const novosFavoritos = this.favoritos$.value.filter(f => f.id !== personagem.id);
    this.favoritos$.next(novosFavoritos);
    this.countTotalFavoritos();
  }


  countTotalFavoritos() {
    const total = String(this.favoritos$.value.length);
    sessionStorage.setItem('totalFavoritos', total);
    this.emitirTotalFavoritos();
  }

  estaFavorito(id: number) {
    return this.favoritos$.value.some(f => f.id === id);
  }

}