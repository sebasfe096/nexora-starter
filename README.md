# Nexora Starter Kit — Prueba Técnica Full Stack

Bienvenido al repositorio base de la prueba técnica.
Revisa el documento **Prueba_Tecnica_FullStack_Nexora.pdf** que recibiste
para conocer el contexto, las tareas y los criterios de evaluación.

## Proyectos incluidos

| Proyecto | Stack | Puerto |
|----------|-------|--------|
| `nexora-admin-ui` | Angular 14 + TypeScript | 4200 |
| `nexora-api` | Spring Boot 3 + Java 17 | 8080 |
| `nexora-inventory-ui` | React 18 + Vite + TypeScript | 5173 |
| `nexora-functions` | Node.js 18 | — |

## Cómo ejecutar cada proyecto

### nexora-admin-ui (Angular)
```bash
cd nexora-admin-ui
npm install
ng serve
```

### nexora-api (Spring Boot)
```bash
cd nexora-api
./mvnw spring-boot:run
# Consola H2: http://localhost:8080/h2-console
```

### nexora-inventory-ui (React)
```bash
cd nexora-inventory-ui
npm install
npm run dev
```

### nexora-functions (Node.js)
```bash
cd nexora-functions
npm install
npm test
```
