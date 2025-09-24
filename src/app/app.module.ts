import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';


import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PersonagemComponent } from './filme/containers/personagem.component';
import { ListarPersonagensComponent } from './filme/components/todos-personagens/listar-personagens.component';
import { ListarPersonagensFavoritosComponent } from './filme/components/listar-personagens-favoritos/listar-personagens-favoritos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PersonagemComponent,
    ListarPersonagensComponent,
    ListarPersonagensFavoritosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
