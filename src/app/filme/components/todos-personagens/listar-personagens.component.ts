import { Component, OnInit } from '@angular/core';
import { PersonagemService } from '../../services/personagem.service';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-listar-personagens',
  templateUrl: './listar-personagens.component.html',
  styleUrls: ['./listar-personagens.component.scss']
})
export class ListarPersonagensComponent implements OnInit {

  ehFavorito$!: Observable<boolean>;
  personagens: any[] = [];
  totalPersonagens = 0;
  paginaAtual = 1;
  nomePersonagem: string = '';


  constructor(private readonly personagemService: PersonagemService) { }


  ngOnInit(): void {
    this.carregarPersonagens();
  }

  carregarPersonagens() {
    this.personagemService
      .getListarPersonagensRick(this.paginaAtual, this.nomePersonagem)
      .subscribe({
        next: (res: any) => {
          this.personagens = res.results.map((p: any) => ({
            ...p,
            favorito: this.personagemService.estaFavorito(p.id) // marca true se estiver nos favoritos
          }));

          this.totalPersonagens = res.info.count;
        },
        error: () => {
          this.personagens = [];
          this.totalPersonagens = 0;
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
    if (personagem.favorito) {
      this.personagemService.adicionar(personagem);
    } else {
      this.personagemService.remover(personagem);
    }
  }

}
