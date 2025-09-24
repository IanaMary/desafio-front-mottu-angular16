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

  ngOnInit(): void { }

  carregarPersonagens() {
    this.personagemService.getListarFilmes(this.paginaAtual, this.nomePersonagem).subscribe({
      next: (res: any) => {
        this.personagens = res.results;
        this.totalPersonagens = res.info.count;
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

}
