# Projeto Angular + Json Server + API Rick and Morty

## Pré-requisitos
- Node.js instalado
- Angular CLI (pode usar via `npx ng`) 
- Projeto está na versão **Angular 16**

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