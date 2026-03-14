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
fcdcdcd

##Decisiones técnicas
Modulo 1 Angular

¿Qué decisiones de diseño tomaste y por qué?
Se decidió eliminar las capas de seguridad existente, para delegar la responsabilidad de seguridad a una capa superior como Gateway.
Se centralizo la configuración de las rutas del nuevo Gateway, construyendo urls dinámicas, permitiendo la adaptación de diferentes entornos.
Se implemento un sistema de linting con eslint, para mantener el código limpio de imports no utilizados.

¿Qué compromisos (trade-offs) hiciste por limitaciones de tiempo?
Debido a fallos de compilación se realizaron cambios de versiones de dependencias. @types/node' a la versión 18.11.0 para resolver los conflictos de 'Symbol.dispose'.
Por tiempo, no se crearon los test de todos los métodos, y servicios dejando el resto para una fase posterior

¿Qué harías diferente con más tiempo?
Durante la compilación se detecto la ausencia de modulos. Con mas tiempo se habría reconstruido la estructura de carpetas.
Con mas tiempo se crearía un interceptor de errores para dar control al Gateway.

¿Qué parte del código te genera más incertidumbre y por qué?
El app routing, ya que las rutas que están en el están inconsistentes, y hay errores de compilación.

Modulo 2 Node

¿Qué decisiones de diseño tomaste y por qué?
Se decide refactorizar onInventorySync para eliminar la firma HTTP, y adoptar el estándar de cloudEvent, transformando el servicio a una arquitectura reactiva.
Se decide dividir el archivo index a inventoryService y reportService, desacoplando y siguiendo el principio de responsabilidad única.
Se implemento el uso de variables de entorno, para eliminar variables harcod-eadas.

¿Qué compromisos (trade-offs) hiciste por limitaciones de tiempo?
Por agilidad, se implemento la validación de campos obligatorios mediante throe new error. Con mas tiempo se prefiere crear un sistema de colas de errores.
Debido al tiempo se mockea el funcionts framework para capturar los handlers. Esto valida lógica interna pero no todo el ciclo de vida del evento.

¿Qué harías diferente con más tiempo?
Conectaria los servicios a una base de datos real para validar impactos de sincronización.

¿Qué parte del código te genera más incertidumbre y por qué?
Las validaciones de los estados de las peticiones, ya que debería tener un control de estados centralizado donde se validen cada proceso.

##Mapeo al proyecto Nexora
Lo desarrollado transmite la base técnica para desacoplar el sistema, en angular, se elimino la autenticación y se centralizo la configuración para un multi-Gateway. 
En node, se implementa un patron de eventos y responsabilidad única para dar un mejor escalado en el código.
En una migración el mayor reto es que ambos sistemas deben convivir entre ellos sin interrumpir la operación.

##Bloqueos y comunicación
Incompatibilidad de Dependencias Al intentar compilar el proyecto Angular, se presentaron errores resolución de dependencias y versiones de node_modules que impedían el arranque del entorno de desarrollo.
Realice una revisión de las versiones actuales versus las requeridas por el framework, fijando versiones en el package.json.
Propongo al equipo una revisión de las dependencias en conjunto para evitar que pase en los diferentes entornos de desarrollo.

Tras el refactor el compilador reporto varios modulos inexistentes, lo que indica una desconexión en la estructura del proyecto.
Se realizo un mapeo de rutas para identificar si los módulos fueron eliminados accidentalmente o estaban huérfanos. y para lograr la compilación del proyecto se procede a crear cada uno en su ruta especifica.
Se ha detectado una inconsistencias en las rutas de los módulos, no se encuentran, tras el proceso de limpieza. Se solicita un code-review para validar la estructura de módulos.


 