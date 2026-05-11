import type { RawLesson } from './types';

export const topic03: RawLesson[] = [

  // ── 03a ─────────────────────────────────────────────────────────
  {
    id: '03a', slug: '03a-importacion-sakila-world',
    title: 'Importación de Sakila y World',
    topic: 'Consultas y filtros básicos en SQL', topicNumber: '03', classNumber: '03a',
    type: 'setup', status: 'pending', contentStatus: 'completed', difficulty: 1, estimatedTime: '20 min',
    tags: ['Sakila', 'World', 'Importación', 'Scripts SQL'],

    summary: 'Instalación de las dos bases de datos de práctica que se usan a lo largo de todo el módulo: Sakila (actores y películas) y World (ciudades, países e idiomas). Se importan ejecutando scripts SQL nativos, no importando archivos directamente.',

    keyConcepts: [
      {
        term: 'Sakila',
        definition: 'Base de datos de ejemplo oficial de MySQL. Simula el sistema de gestión de un videoclub: actores, películas, alquileres, clientes e inventario. Diseñada para practicar consultas relacionales complejas.',
      },
      {
        term: 'World',
        definition: 'Base de datos de ejemplo oficial de MySQL con datos geográficos reales: ciudades, países e idiomas. Tiene tres tablas (City, Country, CountryLanguage) y miles de filas para practicar filtros y agregaciones.',
      },
      {
        term: 'Esquema (schema)',
        definition: 'Estructura vacía de una base de datos: las tablas, columnas, tipos, claves y relaciones, sin ningún dato aún. En Sakila el esquema se importa en un primer paso separado.',
      },
      {
        term: 'Script SQL',
        definition: 'Archivo de texto con extensión .sql que contiene instrucciones SQL listas para ejecutarse. Es la forma más fiable de importar bases de datos porque se ve exactamente qué comandos se corren.',
      },
      {
        term: 'Open SQL Script (Workbench)',
        definition: 'Opción de menú File → Open SQL Script en MySQL Workbench. Carga un archivo .sql en un editor para revisarlo y ejecutarlo completo con el botón del rayo.',
      },
    ],

    contenido: [
      {
        heading: 'Para qué sirven estas dos bases de datos',
        blocks: [
          {
            type: 'p',
            text: 'Crear tablas propias con cuatro o cinco filas funciona para entender la sintaxis, pero no para practicar filtros, agregaciones o JOINs de verdad. Sakila y World existen precisamente para eso: son bases de datos realistas con miles de filas y relaciones entre tablas, diseñadas por el equipo de MySQL para practicar.',
          },
          {
            type: 'table',
            headers: ['Base de datos', 'Temática', 'Tablas principales', 'Uso típico'],
            rows: [
              ['Sakila', 'Videoclub: actores, películas, alquileres', '16 tablas + vistas', 'JOINs complejos, subconsultas, funciones'],
              ['World', 'Geografía: ciudades, países, idiomas', '3 tablas (City, Country, CountryLanguage)', 'Filtros, ORDER BY, BETWEEN, LIKE, agregaciones'],
            ],
          },
          {
            type: 'p',
            text: 'Durante el módulo se usarán las dos, pero las primeras clases de consultas se hacen sobre World por su estructura más sencilla.',
          },
        ],
      },
      {
        heading: 'Importar Sakila: dos pasos',
        blocks: [
          {
            type: 'p',
            text: 'Sakila se distribuye en dos archivos separados: uno para el esquema y otro para los datos. Hay que correrlos en ese orden exacto. Si se intenta cargar los datos antes de que existan las tablas, los INSERT INTO fallarán.',
          },
          {
            type: 'ol',
            items: [
              'Descargar el zip de Sakila desde la página oficial de ejemplos de MySQL y descomprimirlo.',
              'En Workbench, ir a File → Open SQL Script y abrir sakila-schema.sql.',
              'Ejecutar el script completo con el botón del rayo (▶). Esto crea las tablas vacías.',
              'Ir de nuevo a File → Open SQL Script y abrir sakila-data.sql.',
              'Ejecutar el script. Esto rellena todas las tablas con datos reales.',
              'Refrescar el panel lateral: debería aparecer la base de datos sakila con todas sus tablas.',
            ],
          },
          {
            type: 'callout',
            variant: 'warn',
            title: 'Esquema primero, siempre',
            text: 'Si se corre sakila-data.sql antes que sakila-schema.sql, los INSERT INTO no encontrarán las tablas y el script fallará. El orden es inamovible: estructura primero, datos después.',
          },
        ],
      },
      {
        heading: 'Importar World: un solo script',
        blocks: [
          {
            type: 'p',
            text: 'World se distribuye en un único archivo que incluye tanto la creación de tablas como la inserción de datos. Internamente el script crea primero la estructura y luego ejecuta miles de INSERT INTO, pero todo ocurre de una sola pasada.',
          },
          {
            type: 'ol',
            items: [
              'Descargar el zip de World desde la misma página de ejemplos de MySQL y descomprimirlo.',
              'En Workbench, ir a File → Open SQL Script y abrir world.sql.',
              'Ejecutar el script completo. Se verán mensajes de insert, insert, insert… en la consola inferior.',
              'Refrescar el panel: aparecerá la base de datos world con las tablas City, Country y CountryLanguage.',
            ],
          },
        ],
      },
      {
        heading: 'Qué contiene cada base de datos',
        blocks: [
          {
            type: 'p',
            text: 'Antes de empezar a consultar, conviene saber qué columnas tienen las tablas principales de World, que es la que se usa en las siguientes clases.',
          },
          {
            type: 'table',
            headers: ['Tabla', 'Columnas destacadas', 'Clave primaria', 'Relación'],
            rows: [
              ['City', 'ID, Name, CountryCode, District, Population', 'ID', 'CountryCode → Country.Code'],
              ['Country', 'Code, Name, Continent, Region, Population, GNP, IndepYear, LifeExpectancy', 'Code', '—'],
              ['CountryLanguage', 'CountryCode, Language, IsOfficial, Percentage', 'CountryCode + Language', 'CountryCode → Country.Code'],
            ],
          },
          {
            type: 'callout',
            variant: 'note',
            title: 'CountryCode es la clave que lo une todo',
            text: 'City y CountryLanguage tienen una columna CountryCode que referencia a Country.Code. Sin conocer los JOINs todavía, el operador IN permite hacer consultas cruzadas entre estas tablas. Se verá en la siguiente clase.',
          },
        ],
      },
    ],

    codeExamples: [
      {
        label: 'Verificar que las bases de datos están disponibles',
        lang: 'sql',
        code: `-- Listar todas las bases de datos del servidor
SHOW DATABASES;

-- Activar World y ver sus tablas
USE world;
SHOW TABLES;

-- Activar Sakila y ver sus tablas
USE sakila;
SHOW TABLES;`,
        note: 'Si tanto sakila como world aparecen en SHOW DATABASES y sus tablas en SHOW TABLES, la importación fue correcta.',
      },
      {
        label: 'Primera consulta de verificación en World',
        lang: 'sql',
        code: `USE world;

-- Ver las primeras filas de cada tabla
SELECT * FROM Country  LIMIT 5;
SELECT * FROM City     LIMIT 5;
SELECT * FROM CountryLanguage LIMIT 5;`,
        note: 'LIMIT 5 evita devolver miles de filas de golpe. Si se ven datos en las tres tablas, la base de datos está correctamente importada y lista para usar.',
      },
    ],

    errores: [
      'Correr sakila-data.sql antes que sakila-schema.sql. Los datos no pueden insertarse en tablas que todavía no existen.',
      'No refrescar el panel lateral de Workbench después de importar. La base de datos existe en el servidor pero Workbench no la muestra hasta que se refresca (clic derecho → Refresh All).',
      'Ejecutar solo parte del script pulsando el rayo con texto seleccionado. El botón del rayo sin selección ejecuta todo; con selección, solo lo seleccionado. Para importar hay que ejecutar el script completo.',
      'Confundir los archivos de Sakila: sakila-schema.sql crea las tablas vacías; sakila-data.sql las llena. Son dos archivos distintos con propósitos distintos.',
    ],

    practicas: [
      'Importa siempre el esquema antes que los datos cuando el proceso esté dividido en dos archivos.',
      'Tras importar, verifica con SHOW TABLES y un SELECT * FROM … LIMIT 5 que las tablas existen y tienen datos.',
      'Guarda los archivos .sql de Sakila y World en un lugar accesible: si alguna vez necesitas reimportar, los tendrás a mano.',
      'Familiarízate con la estructura de World antes de consultar: saber qué columnas tiene cada tabla evita errores de nombres al escribir las consultas.',
    ],

    ejercicios: [
      'Importa Sakila y World siguiendo los pasos indicados. Verifica con SHOW DATABASES que aparecen ambas.',
      'Ejecuta SHOW TABLES en cada una y anota cuántas tablas tiene cada base de datos.',
      'Haz un SELECT * FROM City LIMIT 10 en World y observa qué columnas tiene la tabla.',
      'Busca en la tabla Country las columnas Continent e IndepYear. ¿Qué tipo de datos crees que son?',
    ],

    checklist: [
      { text: 'Tengo Sakila importada: schema primero, datos después.' },
      { text: 'Tengo World importada con su único script.' },
      { text: 'Ambas aparecen en SHOW DATABASES y sus tablas en SHOW TABLES.' },
      { text: 'Sé qué tablas tiene World (City, Country, CountryLanguage) y cómo se relacionan por CountryCode.' },
      { text: 'Entiendo que un script .sql es simplemente un archivo de texto con instrucciones SQL.' },
    ],
  },

  // ── 03b ─────────────────────────────────────────────────────────
  {
    id: '03b', slug: '03b-consultas-filtros-parte-1',
    title: 'Consultas y filtros básicos — Parte 1',
    topic: 'Consultas y filtros básicos en SQL', topicNumber: '03', classNumber: '03b',
    type: 'theory', status: 'pending', contentStatus: 'completed', difficulty: 2, estimatedTime: '35 min',
    tags: ['SELECT', 'WHERE', 'ORDER BY', 'LIMIT', 'AS'],

    summary: 'La regla de oro del orden de comandos en SQL: SELECT → FROM → WHERE → ORDER BY → LIMIT. Operadores de comparación, lógicos (AND, OR, NOT) y el alias AS para renombrar columnas y mostrar columnas calculadas.',

    keyConcepts: [
      {
        term: 'SELECT',
        definition: 'Comando para consultar datos. Se especifican las columnas que se quieren ver. SELECT * devuelve todas las columnas.',
      },
      {
        term: 'FROM',
        definition: 'Indica de qué tabla vienen los datos. Siempre va inmediatamente después de SELECT. Sin FROM no hay consulta.',
      },
      {
        term: 'WHERE',
        definition: 'Filtra las filas según una condición. Solo devuelve las filas que cumplen el criterio especificado.',
      },
      {
        term: 'Operadores de comparación',
        definition: 'Signos que se usan en la condición de WHERE: = (igual), > (mayor), < (menor), >= (mayor o igual), <= (menor o igual), <> o != (distinto).',
      },
      {
        term: 'AND',
        definition: 'Operador lógico que exige que TODAS las condiciones sean verdaderas. Si una sola es falsa, la fila no se incluye en el resultado.',
      },
      {
        term: 'OR',
        definition: 'Operador lógico que incluye la fila si AL MENOS UNA condición es verdadera. Solo descarta la fila si todas las condiciones son falsas.',
      },
      {
        term: 'NOT',
        definition: 'Operador lógico que invierte el resultado de una condición. NOT (condición verdadera) = falso.',
      },
      {
        term: 'ORDER BY',
        definition: 'Ordena el resultado por una o varias columnas. ASC (ascendente, valor por defecto) o DESC (descendente). Puede combinarse con varias columnas separadas por coma.',
      },
      {
        term: 'LIMIT',
        definition: 'Restringe el número de filas devueltas. LIMIT 10 devuelve solo las 10 primeras filas del resultado. Va siempre al final de la consulta.',
      },
      {
        term: 'AS (alias)',
        definition: 'Renombra una columna en el resultado de la consulta. No modifica la tabla, solo cambia la etiqueta que aparece en la cabecera del resultado. Útil para columnas calculadas o con nombres poco descriptivos.',
      },
    ],

    contenido: [
      {
        heading: 'La regla de oro: el orden de los comandos',
        blocks: [
          {
            type: 'p',
            text: 'SQL se parece al lenguaje natural en inglés —se puede leer casi como una frase— pero tiene un orden estricto que no puede alterarse. Mezclar los comandos en otro orden produce un error de sintaxis, aunque la lógica de lo que se quiere hacer sea correcta.',
          },
          {
            type: 'ol',
            items: [
              'SELECT — qué columnas quiero ver.',
              'FROM — de qué tabla saco los datos.',
              'WHERE — qué condición deben cumplir las filas (opcional).',
              'ORDER BY — en qué orden quiero los resultados (opcional).',
              'LIMIT — cuántas filas como máximo quiero ver (opcional).',
            ],
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'SELECT y FROM son inseparables',
            text: 'SELECT sin FROM no tiene sentido: estoy pidiendo columnas pero sin decir de dónde. Estos dos siempre van juntos. WHERE, ORDER BY y LIMIT son opcionales y se añaden encima de esa base.',
          },
          {
            type: 'p',
            text: 'Una forma de recordarlo: "Selecciona [qué] de [dónde], donde [condición], ordénalo por [columna] y dame solo [n] resultados." Ese es exactamente el orden que SQL espera.',
          },
        ],
      },
      {
        heading: 'SELECT: elegir qué columnas mostrar',
        blocks: [
          {
            type: 'p',
            text: 'SELECT puede recibir una lista de columnas separadas por coma, o el comodín * para todas. Usar * está bien cuando se explora una tabla nueva y no se saben los nombres exactos de las columnas, pero en consultas de producción conviene especificar solo las columnas necesarias.',
          },
          {
            type: 'ul',
            items: [
              'SELECT nombre, email — solo esas dos columnas.',
              'SELECT * — todas las columnas de la tabla.',
              'SELECT nombre, precio * 1.21 — columna calculada (precio con IVA).',
            ],
          },
          {
            type: 'p',
            text: 'Cuantas más columnas se piden, más datos tiene que mover el servidor. En tablas con muchas columnas o millones de filas, seleccionar solo lo necesario tiene un impacto real en el rendimiento.',
          },
        ],
      },
      {
        heading: 'WHERE y los operadores de comparación',
        blocks: [
          {
            type: 'p',
            text: 'WHERE filtra las filas antes de devolverlas. Detrás del WHERE va una condición que puede ser una comparación simple o una combinación de varias.',
          },
          {
            type: 'table',
            headers: ['Operador', 'Significado', 'Ejemplo'],
            rows: [
              ['=', 'Igual a', 'WHERE continent = \'Europe\''],
              ['<>', '/ !=', 'Distinto de', 'WHERE continent <> \'Asia\''],
              ['>', 'Mayor que', 'WHERE population > 1000000'],
              ['<', 'Menor que', 'WHERE population < 500'],
              ['>=', 'Mayor o igual que', 'WHERE indepyear >= 1900'],
              ['<=', 'Menor o igual que', 'WHERE gnp <= 100'],
            ],
          },
          {
            type: 'callout',
            variant: 'note',
            title: 'Texto entre comillas simples',
            text: 'Los valores de texto en WHERE van entre comillas simples: WHERE continent = \'Europe\'. Los valores numéricos no llevan comillas: WHERE population > 1000000.',
          },
        ],
      },
      {
        heading: 'Operadores lógicos: AND, OR, NOT',
        blocks: [
          {
            type: 'p',
            text: 'Los operadores lógicos permiten combinar varias condiciones en un mismo WHERE. La clave es entender cuándo una combinación es verdadera.',
          },
          {
            type: 'table',
            headers: ['Operador', 'Cuándo devuelve verdadero', 'Ejemplo'],
            rows: [
              ['AND', 'Todas las condiciones son verdaderas', 'continent = \'Asia\' AND population > 10000000'],
              ['OR', 'Al menos una condición es verdadera', 'continent = \'Asia\' OR continent = \'Africa\''],
              ['NOT', 'La condición es falsa (invierte el resultado)', 'NOT continent = \'Antarctica\''],
            ],
          },
          {
            type: 'p',
            text: 'AND es más restrictivo: reduce el número de resultados porque hay que cumplir todo. OR es más permisivo: amplía el resultado porque basta con cumplir algo. Pueden combinarse entre sí usando paréntesis para controlar la precedencia.',
          },
        ],
      },
      {
        heading: 'ORDER BY: ordenar los resultados',
        blocks: [
          {
            type: 'p',
            text: 'Sin ORDER BY, MySQL devuelve las filas en el orden en que las tiene almacenadas internamente, que puede variar entre ejecuciones. Si el orden importa, hay que especificarlo explícitamente.',
          },
          {
            type: 'ul',
            items: [
              'ORDER BY nombre ASC — alfabético de la A a la Z. ASC es el valor por defecto y puede omitirse.',
              'ORDER BY population DESC — del mayor al menor.',
              'ORDER BY continent ASC, population DESC — primero ordena por continente; dentro del mismo continente, por población de mayor a menor.',
            ],
          },
          {
            type: 'p',
            text: 'El ordenamiento múltiple por varias columnas es especialmente útil cuando la primera columna tiene muchos empates y se necesita un criterio de desempate.',
          },
        ],
      },
      {
        heading: 'LIMIT: recortar el número de resultados',
        blocks: [
          {
            type: 'p',
            text: 'LIMIT va al final de la consulta y actúa sobre el resultado ya filtrado y ordenado. Si la consulta devuelve 4.000 filas y se añade LIMIT 10, solo se verán las 10 primeras de esas 4.000.',
          },
          {
            type: 'p',
            text: 'Es imprescindible combinarlo con ORDER BY cuando se quiere un resultado significativo. LIMIT 10 sin ORDER BY devuelve 10 filas arbitrarias. LIMIT 10 con ORDER BY population DESC devuelve los 10 países más poblados.',
          },
        ],
      },
      {
        heading: 'AS: renombrar columnas con alias',
        blocks: [
          {
            type: 'p',
            text: 'AS asigna un nombre alternativo a una columna en el resultado. No modifica la tabla: solo cambia la etiqueta que aparece en la cabecera de la columna cuando se muestra el resultado.',
          },
          {
            type: 'ul',
            items: [
              'Útil cuando el nombre de la columna en la tabla es poco descriptivo (col_a, x1…).',
              'Imprescindible con columnas calculadas, que no tienen nombre propio.',
              'Permite mostrar los resultados en el idioma del usuario final sin tocar la estructura de la base de datos.',
            ],
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'El alias con espacios necesita comillas',
            text: 'Si el alias tiene espacios (por ejemplo "Nombre del país"), debe ir entre comillas simples o backticks: AS \'Nombre del país\' o AS `Nombre del país`. Sin comillas, MySQL interpreta cada palabra como un elemento distinto y da error.',
          },
        ],
      },
    ],

    codeExamples: [
      {
        label: 'SELECT básico: columnas concretas y todas las columnas',
        lang: 'sql',
        code: `USE world;

-- Seleccionar dos columnas específicas
SELECT Name, Continent
FROM Country;

-- Seleccionar todas las columnas (útil para explorar)
SELECT *
FROM Country;`,
      },
      {
        label: 'WHERE con operadores de comparación',
        lang: 'sql',
        code: `-- Países del continente europeo
SELECT Name, Population
FROM Country
WHERE Continent = 'Europe';

-- Países con más de 100 millones de habitantes
SELECT Name, Population
FROM Country
WHERE Population > 100000000;

-- Países europeos con más de 10 millones de habitantes
SELECT Name, Population
FROM Country
WHERE Continent = 'Europe' AND Population > 10000000;`,
      },
      {
        label: 'ORDER BY simple y múltiple',
        lang: 'sql',
        code: `-- Ciudades en orden alfabético (ASC es el valor por defecto)
SELECT Name
FROM City
ORDER BY Name;

-- Países por población de mayor a menor
SELECT Name, Population
FROM Country
ORDER BY Population DESC;

-- Por continente (A→Z) y dentro de cada continente por población (mayor→menor)
SELECT Name, Continent, Population
FROM Country
ORDER BY Continent ASC, Population DESC;`,
      },
      {
        label: 'LIMIT y AS con columnas calculadas',
        lang: 'sql',
        code: `-- Los 5 primeros países (sin orden especificado, resultado arbitrario)
SELECT Name
FROM Country
LIMIT 5;

-- Los 10 países más poblados
SELECT Name, Population
FROM Country
ORDER BY Population DESC
LIMIT 10;

-- Renombrar columnas y mostrar una calculada
SELECT
  Name       AS 'Nombre del pais',
  Population AS Poblacion,
  GNP / Population AS 'PIB per capita'
FROM Country
WHERE Population > 0;`,
        note: 'GNP / Population es una columna calculada: no existe en la tabla, la genera MySQL al vuelo para cada fila. Sin el AS sería difícil saber qué representa esa columna en el resultado.',
      },
    ],

    errores: [
      'Escribir los comandos en el orden incorrecto (por ejemplo FROM antes que SELECT, o WHERE antes que FROM). SQL exige el orden SELECT → FROM → WHERE → ORDER BY → LIMIT sin excepciones.',
      'Olvidar las comillas simples alrededor de los valores de texto en WHERE: WHERE Continent = Europe sin comillas devuelve error porque MySQL interpreta Europe como nombre de columna.',
      'Usar = en lugar de <> para "distinto de". WHERE Continent = \'Europe\' selecciona Europa; WHERE Continent <> \'Europe\' selecciona todo lo demás.',
      'Poner LIMIT antes que ORDER BY. El resultado será correcto numéricamente pero las filas devueltas serán aleatorias, no las del criterio deseado.',
      'Confundir AND con OR: con AND se necesitan cumplir todas las condiciones (más restrictivo); con OR basta una (más permisivo). Un intercambio puede dar resultados completamente distintos.',
    ],

    practicas: [
      'Memorizate el orden SELECT → FROM → WHERE → ORDER BY → LIMIT. Antes de escribir cualquier consulta, piensa en voz alta: "qué quiero ver, de dónde, con qué condición, en qué orden, cuántos resultados".',
      'Especifica solo las columnas que necesitas en SELECT en lugar de usar * siempre. Además de ser más eficiente, te obliga a conocer la estructura de la tabla.',
      'Cuando combines AND y OR, usa paréntesis para hacer explícita la precedencia: WHERE (continent = \'Asia\' OR continent = \'Africa\') AND population > 50000000.',
      'Combina ORDER BY con LIMIT cuando quieras los N mayores o menores de algo. Sin ORDER BY, LIMIT no tiene significado útil.',
      'Usa alias descriptivos en columnas calculadas para que el resultado sea legible sin contexto adicional.',
    ],

    ejercicios: [
      'Selecciona el nombre y el continente de todos los países de la tabla Country.',
      'Selecciona el nombre y la población de los países cuya población sea mayor a 50 millones, ordenados de mayor a menor.',
      'Lista los 10 países más grandes por superficie (columna SurfaceArea) en orden descendente.',
      'Muestra los países cuyo continente sea Asia Y cuya esperanza de vida (LifeExpectancy) sea mayor a 75.',
      'Selecciona el nombre de los países y renombra la columna Population como "Habitantes". Añade una columna calculada GNP / Population renombrada como "PIB per capita".',
      'Lista los 5 países europeos más poblados usando WHERE, ORDER BY y LIMIT en el orden correcto.',
    ],

    checklist: [
      { text: 'Sé el orden de los comandos: SELECT → FROM → WHERE → ORDER BY → LIMIT.' },
      { text: 'Puedo escribir un SELECT con columnas específicas y entender cuándo usar SELECT *.' },
      { text: 'Sé filtrar con WHERE usando =, >, <, >=, <= y <>.' },
      { text: 'Entiendo la diferencia entre AND (todas las condiciones) y OR (al menos una).' },
      { text: 'Puedo ordenar resultados con ORDER BY ASC y DESC, incluyendo ordenamiento por múltiples columnas.' },
      { text: 'Sé combinar ORDER BY con LIMIT para obtener los N primeros o últimos de un criterio.' },
      { text: 'Puedo renombrar columnas con AS y crear columnas calculadas con operaciones aritméticas.' },
    ],
  },

  // ── 03c ─────────────────────────────────────────────────────────
  {
    id: '03c', slug: '03c-consultas-filtros-parte-2',
    title: 'Consultas y filtros básicos — Parte 2',
    topic: 'Consultas y filtros básicos en SQL', topicNumber: '03', classNumber: '03c',
    type: 'exercise', status: 'pending', contentStatus: 'completed', difficulty: 2, estimatedTime: '45 min',
    tags: ['BETWEEN', 'LIKE', 'IS NULL', 'IN', 'Subconsultas'],

    summary: 'Consultas avanzadas sobre la base de datos World: filtros de rango con BETWEEN, búsqueda de patrones de texto con LIKE y el comodín %, comprobación de nulos con IS NULL / IS NOT NULL, y una primera subconsulta con IN para cruzar datos entre dos tablas sin usar JOIN.',

    keyConcepts: [
      {
        term: 'BETWEEN … AND',
        definition: 'Filtra filas cuyo valor esté dentro de un rango inclusivo. BETWEEN 1900 AND 2000 incluye exactamente 1900 y 2000. Equivale a columna >= 1900 AND columna <= 2000.',
      },
      {
        term: 'LIKE',
        definition: 'Operador de comparación para texto que permite patrones con comodines. Se usa en WHERE para buscar filas cuyo texto coincide con un patrón en lugar de un valor exacto.',
      },
      {
        term: '% (comodín LIKE)',
        definition: 'Representa cualquier secuencia de caracteres (incluida la vacía). NEW% encuentra todo lo que empieza por NEW. %TOWN encuentra todo lo que termina en TOWN. %NEW% encuentra todo lo que contiene NEW en cualquier posición.',
      },
      {
        term: 'IS NULL',
        definition: 'Comprueba si el valor de una columna es NULL (ausente). No puede usarse el operador = para comparar con NULL: WHERE columna = NULL siempre devuelve vacío.',
      },
      {
        term: 'IS NOT NULL',
        definition: 'Comprueba que el valor de una columna tiene un dato real (no es NULL). Útil para filtrar filas con datos incompletos o desconocidos.',
      },
      {
        term: 'IN',
        definition: 'Comprueba si el valor de una columna pertenece a una lista de valores. WHERE continent IN (\'Asia\', \'Africa\') equivale a dos condiciones OR. También acepta una subconsulta como lista.',
      },
      {
        term: 'Subconsulta (subquery)',
        definition: 'Consulta SELECT anidada dentro de otra consulta, entre paréntesis. Se evalúa primero y su resultado se usa como entrada de la consulta exterior. Permite cruzar datos entre tablas sin usar JOIN.',
      },
      {
        term: 'Columna calculada',
        definition: 'Columna que no existe en la tabla sino que se genera al vuelo aplicando una operación matemática a otras columnas. Por ejemplo GNP / Population devuelve el PIB per cápita fila a fila.',
      },
    ],

    contenido: [
      {
        heading: 'BETWEEN: filtrar por rango de valores',
        blocks: [
          {
            type: 'p',
            text: 'BETWEEN simplifica las consultas cuando se quiere filtrar por un intervalo. En lugar de escribir columna >= valor1 AND columna <= valor2, se escribe columna BETWEEN valor1 AND valor2. Ambas formas son equivalentes y producen el mismo resultado.',
          },
          {
            type: 'p',
            text: 'El rango es siempre inclusivo: los valores extremos se incluyen en el resultado. BETWEEN 1900 AND 2000 devuelve filas donde el valor sea exactamente 1900, exactamente 2000, o cualquier número entre medias.',
          },
          {
            type: 'callout',
            variant: 'note',
            title: 'BETWEEN funciona también con texto y fechas',
            text: 'Aunque el ejemplo más habitual es con números, BETWEEN puede usarse con texto (orden alfabético) y con fechas. BETWEEN \'2020-01-01\' AND \'2020-12-31\' devuelve todas las filas de ese año.',
          },
        ],
      },
      {
        heading: 'LIKE y el comodín %: buscar por patrón de texto',
        blocks: [
          {
            type: 'p',
            text: 'WHERE columna = \'valor\' solo encuentra coincidencias exactas. LIKE permite buscar por patrón: si el texto empieza por algo, termina por algo, o contiene algo en cualquier posición.',
          },
          {
            type: 'table',
            headers: ['Patrón', 'Encuentra…', 'No encuentra…'],
            rows: [
              ['LIKE \'New%\'', 'New York, Newcastle, Newport News', 'Old New Bridge (no empieza por New)'],
              ['LIKE \'%land\'', 'Finland, Iceland, Scotland', 'Swaziland no (termina en "land" pero mal escrito no)'],
              ['LIKE \'%island%\'', 'Rhode Island, Island City', 'Iceland (empieza por Ice, no contiene "island")'],
              ['LIKE \'_rance\'', 'France (un solo carácter antes de rance)', 'Alliance (dos caracteres antes)'],
            ],
          },
          {
            type: 'p',
            text: 'El comodín _ (guión bajo) representa exactamente un carácter. % representa cero o más caracteres. Se pueden combinar: LIKE \'N_w%\' encontraría New, Now, Newcastle…',
          },
          {
            type: 'callout',
            variant: 'warn',
            title: 'LIKE sin comodín es igual que =',
            text: 'WHERE Name LIKE \'France\' sin ningún comodín es exactamente igual a WHERE Name = \'France\'. Solo tiene sentido usar LIKE cuando se incluye al menos un % o _.',
          },
        ],
      },
      {
        heading: 'IS NULL e IS NOT NULL: trabajar con valores ausentes',
        blocks: [
          {
            type: 'p',
            text: 'NULL no es cero, no es texto vacío, no es falso. Es la ausencia de valor. MySQL tiene reglas especiales para NULL: no puede compararse con = ni con <>. La única forma correcta de verificar si algo es NULL es usando IS NULL o IS NOT NULL.',
          },
          {
            type: 'ul',
            items: [
              'WHERE IndepYear IS NULL — países sin año de independencia registrado (colonias, territorios, etc.).',
              'WHERE IndepYear IS NOT NULL — países que sí tienen año de independencia.',
              'WHERE LifeExpectancy IS NOT NULL AND LifeExpectancy > 75 — países con dato de esperanza de vida Y que supera 75.',
            ],
          },
          {
            type: 'callout',
            variant: 'err',
            title: 'WHERE columna = NULL nunca funciona',
            text: 'Esta es una de las confusiones más comunes. WHERE IndepYear = NULL siempre devuelve cero filas porque NULL = NULL no es verdadero en SQL: es NULL. La única forma de detectar nulos es IS NULL.',
          },
        ],
      },
      {
        heading: 'IN: comprobar pertenencia a un conjunto',
        blocks: [
          {
            type: 'p',
            text: 'IN comprueba si el valor de una columna aparece en una lista de valores. Es una forma compacta de escribir múltiples condiciones OR sobre la misma columna.',
          },
          {
            type: 'p',
            text: 'La lista puede ser literal (una serie de valores entre paréntesis separados por coma) o puede ser el resultado de otra consulta SELECT. En este segundo caso se llama subconsulta o subquery.',
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'IN con subconsulta: cruzar tablas sin JOIN',
            text: 'La tabla City no tiene columna Continent, por lo que no se puede filtrar directamente ciudades por continente. Pero City sí tiene CountryCode, y Country sí tiene Continent. Con IN y una subconsulta se pueden buscar las ciudades cuyo CountryCode aparezca en la lista de códigos de países europeos, obtenida en la subconsulta.',
          },
        ],
      },
      {
        heading: 'Columnas calculadas con expresiones matemáticas',
        blocks: [
          {
            type: 'p',
            text: 'SELECT puede incluir expresiones aritméticas (+, -, *, /) que se evalúan fila a fila. El resultado es una columna nueva que no existe en la tabla, generada al vuelo solo para esa consulta.',
          },
          {
            type: 'ul',
            items: [
              'GNP / Population — PIB per cápita de cada país.',
              'Population / 1000000 — población expresada en millones para simplificar la lectura.',
              'SurfaceArea * 0.386 — convertir km² a millas cuadradas.',
            ],
          },
          {
            type: 'p',
            text: 'Cuando una columna calculada involucra una columna que puede ser NULL o cero en el denominador, hay que protegerse con un WHERE que filtre esos casos antes del cálculo, de lo contrario la consulta puede devolver NULL o un error de división por cero.',
          },
        ],
      },
    ],

    codeExamples: [
      {
        label: 'BETWEEN: países que se independizaron entre 1900 y 2000',
        lang: 'sql',
        code: `SELECT Name, IndepYear
FROM Country
WHERE IndepYear BETWEEN 1900 AND 2000
ORDER BY IndepYear ASC;`,
        note: 'Equivale a WHERE IndepYear >= 1900 AND IndepYear <= 2000. Los valores extremos (1900 y 2000) se incluyen en el resultado.',
      },
      {
        label: 'LIKE: ciudades que empiezan por "New"',
        lang: 'sql',
        code: `-- El % después de New significa "cualquier cosa a continuación"
SELECT Name
FROM City
WHERE Name LIKE 'New%';

-- Ciudades que contienen "island" en cualquier posición
SELECT Name
FROM City
WHERE Name LIKE '%island%';`,
        note: 'LIKE distingue entre % (cero o más caracteres) y _ (exactamente un carácter). Sin el %, LIKE se comporta igual que =.',
      },
      {
        label: 'IS NULL e IS NOT NULL: datos ausentes',
        lang: 'sql',
        code: `-- Países sin año de independencia registrado
SELECT Name, IndepYear
FROM Country
WHERE IndepYear IS NULL;

-- Países con esperanza de vida registrada y mayor a 75 años
SELECT Name, LifeExpectancy
FROM Country
WHERE LifeExpectancy IS NOT NULL
  AND LifeExpectancy > 75
ORDER BY LifeExpectancy DESC;`,
      },
      {
        label: 'IN con subconsulta: ciudades europeas sin usar JOIN',
        lang: 'sql',
        code: `-- La subconsulta devuelve la lista de códigos de países europeos
-- IN comprueba si el CountryCode de cada ciudad está en esa lista
SELECT Name
FROM City
WHERE CountryCode IN (
  SELECT Code
  FROM Country
  WHERE Continent = 'Europe'
);`,
        note: 'MySQL evalúa primero la subconsulta (los códigos de países europeos) y luego filtra City con esa lista. Es una alternativa a JOIN que funciona bien para casos sencillos.',
      },
      {
        label: 'Columnas calculadas con alias: PIB per cápita',
        lang: 'sql',
        code: `SELECT
  Name                  AS 'Pais',
  Population            AS 'Habitantes',
  GNP / Population      AS 'PIB per capita'
FROM Country
WHERE Population > 0
ORDER BY GNP / Population DESC
LIMIT 15;`,
        note: 'WHERE Population > 0 evita la división por cero en los países con population = 0 en la base de datos. El alias no puede usarse en el ORDER BY de la misma consulta en MySQL; hay que repetir la expresión.',
      },
      {
        label: 'Consulta combinada: todos los operadores juntos',
        lang: 'sql',
        code: `-- Países asiáticos con más de 10 millones de habitantes
-- ordenados por población descendente
SELECT Name, Continent, Population
FROM Country
WHERE Continent = 'Asia'
  AND Population > 10000000
ORDER BY Population DESC
LIMIT 10;`,
        note: 'Esta consulta combina WHERE con AND, ORDER BY y LIMIT. Sigue exactamente el orden SELECT → FROM → WHERE → ORDER BY → LIMIT.',
      },
    ],

    errores: [
      'Usar WHERE columna = NULL para detectar nulos. NULL nunca es igual a nada, ni a sí mismo. La única forma válida es IS NULL.',
      'Olvidar el comodín % en LIKE: WHERE Name LIKE \'New\' solo encuentra exactamente "New", no "New York". El % es lo que convierte LIKE en una búsqueda de patrón.',
      'Confundir los extremos de BETWEEN: el rango es inclusivo, no exclusivo. BETWEEN 1900 AND 2000 incluye 1900 y 2000.',
      'Escribir IN con una subconsulta que devuelve más de una columna. La subconsulta dentro de IN solo puede devolver una columna: la que se quiere comparar.',
      'Dividir por una columna sin filtrar antes los ceros. GNP / Population falla o devuelve NULL si Population es 0. Siempre filtrar con WHERE Population > 0 antes de dividir.',
    ],

    practicas: [
      'Usa BETWEEN en lugar de dos condiciones >= y <= cuando filtres por rango. La consulta queda más clara y es equivalente.',
      'Cuando uses LIKE, piensa primero si necesitas buscar al inicio (New%), al final (%land), o en cualquier posición (%island%). Usar % a ambos lados (%texto%) es el más permisivo pero también el más lento en tablas grandes.',
      'Siempre comprueba nulos con IS NULL / IS NOT NULL, nunca con = NULL o <> NULL.',
      'Cuando quieras cruzar datos entre dos tablas y no sepas aún JOINs, IN con subconsulta es una solución válida para casos simples.',
      'Protege las divisiones con WHERE columna > 0 antes de dividir. La división por cero o por NULL produce resultados inesperados.',
    ],

    ejercicios: [
      'Busca todos los países cuyo año de independencia esté entre 1800 y 1900 y ordénalos cronológicamente.',
      'Encuentra todas las ciudades cuyo nombre contenga la palabra "San" en cualquier posición.',
      'Lista los países que no tienen esperanza de vida registrada (LifeExpectancy IS NULL). ¿Cuántos son?',
      'Muestra los países de los continentes Asia y Africa usando IN con una lista literal de valores.',
      'Escribe una subconsulta con IN para encontrar todas las ciudades de países asiáticos (sin usar JOIN).',
      'Calcula el PIB per cápita (GNP / Population) de los países europeos con más de un millón de habitantes, ordénalos de mayor a menor y muestra solo los 10 primeros. Usa alias descriptivos para todas las columnas.',
    ],

    checklist: [
      { text: 'Sé usar BETWEEN para rangos numéricos y entiendo que los extremos son inclusivos.' },
      { text: 'Puedo construir patrones con LIKE usando % (varios caracteres) y _ (un carácter exacto).' },
      { text: 'Entiendo por qué WHERE columna = NULL nunca funciona y uso IS NULL / IS NOT NULL.' },
      { text: 'Sé usar IN con una lista de valores literales como alternativa a múltiples OR.' },
      { text: 'He escrito al menos una subconsulta con IN para cruzar datos entre dos tablas.' },
      { text: 'Puedo crear columnas calculadas con operaciones matemáticas y renombrarlas con AS.' },
      { text: 'Combino varios operadores (WHERE, AND, BETWEEN, ORDER BY, LIMIT) en una sola consulta.' },
    ],
  },
];
