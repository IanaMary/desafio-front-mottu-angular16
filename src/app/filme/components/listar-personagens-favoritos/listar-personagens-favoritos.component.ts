import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listar-personagens-favoritos',
  templateUrl: './listar-personagens-favoritos.component.html',
  styleUrls: ['./listar-personagens-favoritos.component.scss']
})
export class ListarPersonagensFavoritosComponent {
  @Input() atualizar: boolean = false;
}
