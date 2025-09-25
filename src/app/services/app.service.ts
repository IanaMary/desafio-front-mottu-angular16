import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  mudarPagina = new Subject<{ valor: boolean, origem: string }>();
  mudarPagina$ = this.mudarPagina.asObservable();

  emitirMudarPagina(valor: boolean, origem: string) {
    this.mudarPagina.next({ valor, origem });
  }


}