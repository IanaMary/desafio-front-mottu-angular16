import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'desafio-front-mottu-angular16';


  favorito = false;
  mudancaPagina() {
    this.favorito = !this.favorito;
  }
}
