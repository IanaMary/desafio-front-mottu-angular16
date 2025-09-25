import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-personagem',
  templateUrl: './personagem.component.html',
  styleUrls: ['./personagem.component.scss']
})
export class PersonagemComponent implements OnInit {

  telaFavoritos = false;
  private subscription!: Subscription;

  constructor(private readonly appService: AppService) { }

  ngOnInit() {
    this.subscription = this.appService.mudarPagina$.subscribe((res) => {
      this.mudarPagina(res.valor)
    });
  }


  mudarPagina(bool: boolean) {
    this.telaFavoritos = bool;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
