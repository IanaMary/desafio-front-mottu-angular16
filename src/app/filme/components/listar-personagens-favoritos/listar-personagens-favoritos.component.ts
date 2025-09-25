import { Component, OnInit } from '@angular/core';
import { PersonagemService } from '../../services/personagem.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-listar-personagens-favoritos',
  templateUrl: './listar-personagens-favoritos.component.html',
  styleUrls: ['./listar-personagens-favoritos.component.scss']
})
export class ListarPersonagensFavoritosComponent implements OnInit {

  personagens: any[] = [];
  totalFavoritos: number = Number(sessionStorage.getItem('totalFavoritos') || '0');
  paginaAtual = 1;
  limite = 20;
  nomePersonagem: string = '';

  constructor(
    private readonly personagemService: PersonagemService,
    private readonly appService: AppService,
  ) { }

  ngOnInit(): void {
    this.carregarPersonagens();
  }

  carregarPersonagens() {
    this.personagens = this.personagemService.getListarPersonagensFavoritos(this.paginaAtual);
    this.totalFavoritos = this.personagemService.favoritos$.value.length;
  }


  trackById(index: number, item: any): number {
    return item.id;
  }

  paginacao(e: any) {
    this.paginaAtual = e.pageIndex + 1;
    this.carregarPersonagens();
  }

  toggleFavorito(personagem: any) {
    personagem.favorito = !personagem.favorito;
    if (personagem.favorito) {
      this.personagemService.adicionar(personagem);
    } else {
      this.personagemService.remover(personagem);
    }
  }

  voltarInicio() {
    this.appService.emitirMudarPagina(false, 'listar');
  }

}
