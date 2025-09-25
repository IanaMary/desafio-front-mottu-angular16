# Projeto Angular + Json Server + API Rick and Morty

## Pré-requisitos
- Node.js instalado
- Angular CLI (pode usar via `npx ng`) 
- Projeto está na versão **Angular 16**

---

## Sobre o projeto

- O consumo dos personagens é feito diretamente da **API Rick and Morty**:  
  [https://rickandmortyapi.com/api/character](https://rickandmortyapi.com/api/character)

- Como a API original não permite salvar favoritos (não há suporte a `PUT` ou `POST`),  
   os favoritos são gerenciados diretamente no front-end usando **RxJS** (`BehaviorSubject`). Isso permite **adicionar, listar e remover favoritos** de forma reativa, mantendo o estado mesmo ao navegar entre páginas.

---

## Comandos

### Ver versão do Angular
```bash
npx ng version
```

### Rodar projeto
```bash
npm start
```

---

## Scripts (`package.json`)

```json
"start": "npx ng serve",
```