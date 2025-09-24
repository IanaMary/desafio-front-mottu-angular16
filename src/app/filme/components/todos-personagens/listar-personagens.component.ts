import { Component, OnInit } from '@angular/core';
import { PersonagemService } from '../../services/personagem.service';

@Component({
  selector: 'app-listar-personagens',
  templateUrl: './listar-personagens.component.html',
  styleUrls: ['./listar-personagens.component.scss']
})
export class ListarPersonagensComponent implements OnInit {

  constructor(private readonly personagemService: PersonagemService) { }

  personagens: any[] = [];
  totalPersonagens = 0;
  paginaAtual = 1;
  nomePersonagem: string = '';

  ngOnInit(): void {
    this.carregarPersonagens();
  }

  carregarPersonagens() {
    this.personagemService.getPersonagens(this.paginaAtual, this.nomePersonagem).subscribe({
      next: (res: any) => {
        this.personagens = res.resultados;
        this.totalPersonagens = res.totalPersonagens;
      },
      error: (err: any) => {
        this.personagens = [];
      }
    });

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
    this.putFavorito(personagem);
  }

  putFavorito(personagem: any) {
    this.personagemService.putFavorito(personagem)
      .subscribe(() => { });
  }

}
