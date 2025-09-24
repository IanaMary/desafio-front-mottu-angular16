import { Component, OnInit } from '@angular/core';
import { PersonagemService } from '../../services/personagem.service';
import { HttpParams } from '@angular/common/http';

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
    this.personagemService.getListarPersonagensJsonServer(this.paginaAtual, '', true).subscribe({
      next: (res: any) => {
        this.personagens = res;
      },
      error: (err: any) => {
        this.personagens = [];
      }
    });
  }

  trackById(index: number, item: any): number {
    return item.id; // retorna o identificador único
  }

  paginacao(e: any) {
    this.paginaAtual = e.pageIndex + 1;
    this.carregarPersonagens();
  }

  toggleFavorito(personagem: any) {
    personagem.favorito = !personagem.favorito;
    this.putFavorito(personagem);
  }

  putFavorito(personagem: any) {
    this.personagemService.putFavorito(personagem)
      .subscribe(() => { });
  }
}
