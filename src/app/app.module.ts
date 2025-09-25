import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';

// ngx-translate
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader, TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomPaginator } from './shared/custom-paginator';


// App routing e componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonagemComponent } from './filme/containers/personagem.component';
import { ListarPersonagensComponent } from './filme/components/todos-personagens/listar-personagens.component';
import { ListarPersonagensFavoritosComponent } from './filme/components/listar-personagens-favoritos/listar-personagens-favoritos.component';


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
    FormsModule,
    CommonModule,

    // Angular Material
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,

    // ngx-translate
    TranslateModule.forRoot({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
      })
    })
  ],
  providers: [TranslateService, { provide: MatPaginatorIntl, useClass: CustomPaginator }],
  bootstrap: [AppComponent]
})
export class AppModule { }
