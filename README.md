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
  usei o **json-server** com um arquivo `db.json` **para auxiliar na aplicação**, permitindo salvar, listar e remover favoritos localmente.

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
"reset-db": "echo '{\"personagens\":[]}' > db.json",
"start": "npm run reset-db && concurrently \"npx json-server --watch db.json --port 3000\" \"npx ng serve\"",
"build": "ng build",
"watch": "ng build --watch --configuration development"
```