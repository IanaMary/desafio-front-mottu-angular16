import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { PersonagemService } from './filme/services/personagem.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  telaFavoritos = false;
  totalFavoritos = '0';
  idioma = 'pt'

  private subscription!: Subscription;
  constructor(private readonly appService: AppService,
    private readonly personagemService: PersonagemService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('pt'); // fallback se a tradução não existir
    translate.use('pt'); // força o idioma atual
  }


  ngOnInit(): void {
    this.subscription = this.personagemService.totalFavoritos$.subscribe(() => {
      this.totalFavoritos = sessionStorage.getItem('totalFavoritos') || '0';
    });
    this.subscription = this.appService.mudarPagina$.subscribe((res) => {
      if (res.origem !== 'app') {
        this.telaFavoritos = false;
      }
    });
  }



  mudancaPagina() {
    this.telaFavoritos = !this.telaFavoritos;
    this.appService.emitirMudarPagina(this.telaFavoritos, 'app');
  }

  mudarIdioma(idioma: string) {
    this.idioma = idioma;
    this.translate.use(idioma);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
