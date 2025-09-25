import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, Subject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonagemService {

  urlRick = environment.apiUrlRick;
  urlJsonServer = environment.apiUrlJsonServe;

  endpointPersonagens: string = 'character';

  totalFavoritos = new Subject<void>();
  totalFavoritos$ = this.totalFavoritos.asObservable();

  constructor(private http: HttpClient) { }


  emitirTotalFavoritos() {
    this.totalFavoritos.next();
  }


  // busca personagens na API Rick
  getListarPersonagensRick(page: number, name?: string) {
    let params = new HttpParams()
      .set('_page', page)
      .set('_sort', 'name')
      .set('_order', 'asc');

    if (name) {
      params = params.set('name', name);
    }
    return this.http.get(`${this.urlRick}${this.endpointPersonagens}`, { params });
  }

  // busca personagens no db.json - json server
  getListarPersonagensJsonServer(page: number, name?: string, favorito = false) {
    let params = new HttpParams()
      .set('_limit', '20')
      .set('_page', page.toString())
      .set('_sort', 'name')
      .set('_order', 'asc');
    if (favorito) {
      params = params.set('favorito', favorito);
    }
    if (name) {
      params = params.set('name', name);
    }

    return this.http.get<any[]>(this.urlJsonServer, { params });
  }

  // buscar no json-server, se não tiver, ele busca no rick
  getPersonagens(page: number, name?: string): Observable<any> {
    return this.getListarPersonagensJsonServer(page, name, false).pipe(
      switchMap((personagensLocal: any) => {
        if (personagensLocal && personagensLocal.length === 20) {
          // já temos a página completa no json-server
          const count = localStorage.getItem('totalPersonagens');
          return of({ resultados: personagensLocal, totalPersonagens: count });
        } else {
          // busca na API Rick
          return this.getListarPersonagensRick(page, name).pipe(
            switchMap((rickData: any) => {
              localStorage.setItem('totalPersonagens', rickData.info.count)
              const saves = rickData.results.map((p: any) => {
                const personagemComPage = { ...p, page, id: String(p.id), favorito: false };
                return this.postAdicionarFavorito(personagemComPage);
              });
              return forkJoin(saves).pipe(
                map(() => ({ resultados: rickData.results, totalPersonagens: rickData.info.count }))
              );
            })
          );
        }
      })
    );
  }

  // adiciona um favorito db.json - json server
  postAdicionarFavorito(personagem: any) {
    return this.http.post(`${this.urlJsonServer}`, personagem);
  }

  // deleta um favorito db.json - json server
  deleteRemoverFavorito(personagem: any) {
    return this.http.delete(`${this.urlJsonServer}/${personagem.id}`);
  }

  // put um favorito db.json - json server
  putFavorito(personagem: any) {
    return this.http.put(`${this.urlJsonServer}/${personagem.id}`, personagem);
  }


  // Retorna total de favoritos, inicializando se não existir
  getTotalFavoritos(): Observable<any> {
    let params = new HttpParams()
      .set('favorito', 'true'); // só precisa do header
    return this.http.get<any[]>(this.urlJsonServer, { params });
  }

  // Incrementa total de favoritos
  incrementarTotalFavoritos() {
    const count = Number(sessionStorage.getItem('totalFavoritos') || '0');
    sessionStorage.setItem('totalFavoritos', String(count + 1));
  }

  // Decrementa total de favoritos
  decrementarTotalFavoritos() {
    const count = Number(sessionStorage.getItem('totalFavoritos') || '0');
    sessionStorage.setItem('totalFavoritos', String(Math.max(0, count - 1)));
  }


}