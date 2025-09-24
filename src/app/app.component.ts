import { Component } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'desafio-front-mottu-angular16';

  constructor(private readonly appService: AppService) { }

  telaFavoritos = false;
  mudancaPagina() {
    this.telaFavoritos = !this.telaFavoritos;
    this.appService.emitirMudarPagina(this.telaFavoritos);
  }
}
