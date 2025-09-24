import { Component, OnInit } from '@angular/core';
import { PersonagemService } from '../../services/personagem.service';

@Component({
  selector: 'app-listar-personagens-favoritos',
  templateUrl: './listar-personagens-favoritos.component.html',
  styleUrls: ['./listar-personagens-favoritos.component.scss']
})
export class ListarPersonagensFavoritosComponent implements OnInit {

  constructor(private readonly personagemService: PersonagemService) { }

  personagens: any[] = [];
  totalPersonagens = 0;
  paginaAtual = 1;
  nomePersonagem: string = '';

  ngOnInit(): void {
    this.carregarPersonagens();
  }

  carregarPersonagens() {
    this.personagens = this.personagemService.getListarFilmesFavoritos();
  }

  trackById(index: number, item: any): number {
    return item.id; // retorna o identificador único
  }

  paginacao(e: any) {
    this.paginaAtual = e.pageIndex + 1;
    this.carregarPersonagens();
  }

  toggleFavorito(personagem: any) {
    if (this.personagemService.estaFavorito(personagem)) {
      this.personagemService.remover(personagem);
      personagem.favorito = false;
    } else {
      this.personagemService.adicionar(personagem);
      personagem.favorito = true;
    }
  }

}
