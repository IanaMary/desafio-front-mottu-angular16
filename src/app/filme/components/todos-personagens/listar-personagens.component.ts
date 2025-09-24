import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FilmeService } from '../../services/filme.service';

@Component({
  selector: 'app-listar-personagens',
  templateUrl: './listar-personagens.component.html',
  styleUrls: ['./listar-personagens.component.scss']
})
export class ListarPersonagensComponent implements OnChanges {
  @Input() atualizar: boolean = false;


  constructor(private readonly filmeService: FilmeService) { }

  personagens: any[] = [];

  ngOnChanges(): void {
    if (this.atualizar) {
      this.carregarPersonagens();
    }
  }

  carregarPersonagens() {
    this.filmeService.listarFilmes(1).subscribe({
      next: (res: any) => {
        this.personagens = res.results;
      },
      error: (err: any) => {
        console.error('Erro ao listar filmes:', err);
      }
    });

  }
}
