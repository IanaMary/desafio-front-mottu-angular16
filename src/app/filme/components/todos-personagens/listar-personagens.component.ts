import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PersonagemService } from '../../services/personagem.service';

@Component({
  selector: 'app-listar-personagens',
  templateUrl: './listar-personagens.component.html',
  styleUrls: ['./listar-personagens.component.scss']
})
export class ListarPersonagensComponent implements OnChanges {
  @Input() atualizar: boolean = false;


  constructor(private readonly personagemService: PersonagemService) { }

  personagens: any[] = [];
  totalPersonagens = 0;
  paginaAtual = 1;
  nomePersonagem: string = '';

  ngOnChanges(): void {
    if (this.atualizar) {
      this.carregarPersonagens();
    }
  }

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
