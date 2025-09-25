import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { PersonagemService } from './filme/services/personagem.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  telaFavoritos = false;
  totalFavoritos = '0';

  private subscription!: Subscription;
  constructor(private readonly appService: AppService,
    private readonly personagemService: PersonagemService
  ) { }


  ngOnInit(): void {
    this.subscription = this.personagemService.totalFavoritos$.subscribe(() => {
      this.totalFavoritos = sessionStorage.getItem('totalFavoritos') || '0';
    });
    this.carregarTotalFavoritos();
  }

  carregarTotalFavoritos() {
    this.personagemService.getTotalFavoritos().subscribe({
      next: (res: any) => {
        this.totalFavoritos = String(res.length);
        sessionStorage.setItem('totalFavoritos', this.totalFavoritos);
      },
      error: (err: any) => {
        this.totalFavoritos = '0';
        sessionStorage.setItem('totalFavoritos', '0');
      }
    });
  }

  mudancaPagina() {
    this.telaFavoritos = !this.telaFavoritos;
    this.appService.emitirMudarPagina(this.telaFavoritos);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
