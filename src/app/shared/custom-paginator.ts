import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();
    this.translateLabels();

    // Atualiza quando o idioma mudar
    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
      this.changes.next();
    });
  }

  translateLabels() {
    this.itemsPerPageLabel = this.translate.instant('ITENS_PAGINA');
    // Atualiza a label de intervalo (ex: 1 – 20 of 100)
    this.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) { return `0 of ${length}`; }
      const startIndex = page * pageSize;
      // evita passar do total
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return `${startIndex + 1} – ${endIndex} of ${length}`;
    };
  }
}
