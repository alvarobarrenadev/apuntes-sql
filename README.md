# Apuntes SQL

Sitio estatico con los apuntes propios del modulo SQL de [Conquer Blocks](https://www.conquerblocks.com/). El proyecto esta construido con Astro y organiza el temario como documentacion navegable: indice general, buscador, paginas de clase, ejemplos SQL, errores comunes, buenas practicas, ejercicios, checklist y proyecto final.

## Contenido

El modulo cubre SQL y bases de datos relacionales con MySQL:

- Introduccion a MySQL y MySQL Workbench.
- Creacion y manipulacion de tablas.
- Consultas, filtros, ordenacion y limites.
- Importacion y uso de las bases de datos Sakila y World.
- Funciones agregadas, `GROUP BY` y `HAVING`.
- Relaciones entre tablas y `JOIN`.
- Subconsultas, `EXISTS`, `IN` y CTEs.
- Indices, `EXPLAIN`, normalizacion y buenas practicas.
- Proyecto final: sistema de gestion de biblioteca.

Los datos del temario viven en `src/data/sql`. Cada leccion define su contenido estructurado, metadatos, ejemplos de codigo, ejercicios y checklist.

## Stack

- Astro 6.
- TypeScript.
- Sass.
- GitHub Pages para despliegue.

Requiere Node.js `>=22.12.0`.

## Estructura del proyecto

```text
.
|-- public/
|   |-- .nojekyll
|   `-- favicon/
|-- src/
|   |-- components/       Componentes Astro reutilizables
|   |-- data/sql/         Temario y tipos de datos del modulo SQL
|   |-- layouts/          Layout base y layout de documentacion
|   |-- pages/            Rutas del sitio
|   |-- sass/             Estilos Sass por capas
|   `-- utils/            Utilidades compartidas
|-- astro.config.mjs
|-- package.json
`-- tsconfig.json
```

Rutas principales:

- `/`: indice del modulo, buscador y listado de temas.
- `/sql/[slug]`: pagina estatica de cada clase.
- `/sql/proyecto-final`: pagina del proyecto final.
- `/sql`: redirige a `/`.

## Scripts

Instalar dependencias:

```sh
npm install
```

Arrancar desarrollo local:

```sh
npm run dev
```

Generar build de produccion:

```sh
npm run build
```

Previsualizar el build:

```sh
npm run preview
```

Desplegar en GitHub Pages:

```sh
npm run deploy
```

El script `deploy` ejecuta `gh-pages -d dist --nojekyll`. El script `predeploy` genera el build automaticamente antes de desplegar.

## Configuracion

La configuracion principal esta en `astro.config.mjs`.

Detalles relevantes:

- `site` apunta a `https://alvarobarrenadev.github.io`.
- En produccion se usa `base: /apuntes-sql` para GitHub Pages.
- En desarrollo se usa `base: /`.
- Vite define alias para componentes, layouts, datos y utilidades.
- Sass incluye un importer propio para usar alias como `@abstracts/abstracts`.

La utilidad `withBase` en `src/utils/paths.ts` centraliza la generacion de rutas compatibles con el `base` configurado.

## Modelo de contenido

Los tipos principales estan en `src/data/sql/types.ts`.

Cada leccion incluye:

- Identificacion: `id`, `slug`, `title`, `topicNumber`, `classNumber`.
- Estado: `status` y `contentStatus`.
- Metadatos: `type`, `difficulty`, `estimatedTime`, `tags`.
- Contenido: resumen, conceptos clave, bloques estructurados, ejemplos SQL, errores, practicas, ejercicios y checklist.

El archivo `src/data/sql/index.ts` ensambla todas las lecciones, calcula el orden, enlaza leccion anterior y siguiente, agrupa por temas y expone el resumen del modulo.

## Anadir una leccion

1. Edita el archivo de tema correspondiente en `src/data/sql/topic-XX.ts`.
2. Anade un objeto compatible con `RawLesson`.
3. Usa un `slug` unico.
4. Completa los campos de contenido que renderiza la plantilla de clase.
5. Si el tema es nuevo, actualiza `TOPIC_META` en `src/data/sql/index.ts`.

Las rutas estaticas se generan desde `src/pages/sql/[slug].astro`. Las lecciones de tipo `project` no se incluyen ahi porque el proyecto final tiene su propia pagina en `src/pages/sql/proyecto-final.astro`.

## Estilos

El entrypoint Sass es `src/sass/main.scss`.

La organizacion actual separa:

- `abstracts`: variables, funciones, mixins y placeholders.
- `base`: reset, tipografia, animaciones y estilos base.
- `components`: estilos de componentes reutilizables.
- `layout`: estructura general, sidebar, navbar, footer y grid.
- `pages`: estilos especificos de vistas.
- `themes`: variables de tema.
- `vendors`: integraciones externas.

## Notas

- El boton de completar clase cambia el estado visual en cliente, pero no persiste todavia.
- La home incluye busqueda en cliente sobre temas y clases.
- El sidebar se puede plegar por tema y se adapta a movil.
- El proyecto esta preparado para publicarse como sitio estatico en GitHub Pages.
