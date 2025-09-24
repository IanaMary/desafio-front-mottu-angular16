import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  private mudarPagina = new Subject<boolean>();
  mudarPagina$ = this.mudarPagina.asObservable();

  emitirMudarPagina(bool: boolean) {
    this.mudarPagina.next(bool);
  }

}