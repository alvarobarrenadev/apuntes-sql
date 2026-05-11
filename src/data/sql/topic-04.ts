import type { RawLesson } from './types';

export const topic04: RawLesson[] = [
  {
    id: '04a', slug: '04a-funciones-agregadas-conceptos',
    title: 'Funciones agregadas y agrupación — Conceptos',
    topic: 'Funciones Agregadas y Agrupación', topicNumber: '04', classNumber: '04a',
    type: 'theory', status: 'pending', contentStatus: 'completed', difficulty: 2, estimatedTime: '25 min',
    tags: ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'GROUP BY', 'HAVING', 'GROUP_CONCAT', 'WITH ROLLUP', 'CASE WHEN'],

    summary: 'Las funciones agregadas calculan un único valor a partir de múltiples filas: cuántas hay, cuánto suman, cuál es la media, el mínimo y el máximo. Combinadas con GROUP BY se convierten en la herramienta principal para analizar datos por segmentos, y con HAVING se pueden filtrar esos segmentos con precisión quirúrgica.',

    keyConcepts: [
      {
        term: 'Función agregada',
        definition: 'Función que recibe un conjunto de filas y devuelve un único valor de resumen: COUNT, SUM, AVG, MIN o MAX. Su resultado depende de todas las filas procesadas, no de una sola.',
      },
      {
        term: 'COUNT',
        definition: 'Cuenta filas. COUNT(*) cuenta todas las filas, COUNT(columna) cuenta solo las no nulas, COUNT(DISTINCT columna) cuenta los valores únicos eliminando duplicados.',
      },
      {
        term: 'SUM',
        definition: 'Suma todos los valores numéricos de una columna. No funciona con texto ni con booleanos. Ignora los valores nulos.',
      },
      {
        term: 'AVG',
        definition: 'Calcula el promedio aritmético de una columna numérica. Los valores nulos se ignoran: no arrastran el promedio hacia cero ni cuentan como divisor.',
      },
      {
        term: 'MIN / MAX',
        definition: 'Devuelven el valor mínimo o máximo de una columna. Funcionan con números, fechas y texto (ordenamiento alfabético). No funcionan con booleanos.',
      },
      {
        term: 'GROUP BY',
        definition: 'Agrupa las filas que comparten el mismo valor en una o varias columnas. Todas las columnas del SELECT que no sean funciones agregadas deben aparecer también en el GROUP BY.',
      },
      {
        term: 'HAVING',
        definition: 'Filtra grupos después de que GROUP BY los ha formado. Solo puede usarse con funciones agregadas. A diferencia de WHERE, actúa sobre grupos completos, no sobre filas individuales.',
      },
      {
        term: 'GROUP_CONCAT',
        definition: 'Concatena los valores de una columna dentro de cada grupo en una cadena de texto. Acepta un separador personalizado (SEPARATOR) y puede combinarse con DISTINCT para eliminar duplicados.',
      },
      {
        term: 'WITH ROLLUP',
        definition: 'Modificador de GROUP BY que añade automáticamente filas de subtotales por nivel de agrupación y una fila de total general al final. Los subtotales se identifican porque sus columnas de agrupación aparecen como NULL.',
      },
      {
        term: 'CASE WHEN',
        definition: 'Expresión condicional que evalúa casos en orden y devuelve el valor del primer caso que se cumple. Se cierra con END y puede asignarse a una columna nueva con AS. Equivale a un bloque if/elif/else en programación.',
      },
      {
        term: 'Subconsulta con agregado',
        definition: 'Consulta anidada dentro de un WHERE o SELECT que primero calcula un valor de resumen (como el promedio global) y luego lo usa como referencia en la consulta exterior.',
      },
      {
        term: 'Orden lógico de ejecución',
        definition: 'SQL procesa las cláusulas en este orden interno: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. No es el orden en que se escriben, sino el orden en que el motor los evalúa.',
      },
    ],

    contenido: [
      {
        heading: 'De filas a resúmenes: qué hace una función agregada',
        blocks: [
          {
            type: 'p',
            text: 'Una consulta ordinaria devuelve una fila por cada fila de la tabla. Una función agregada hace lo contrario: toma todas las filas (o un subconjunto) y colapsa el resultado en un único valor. Eso lo convierte en la herramienta fundamental para responder preguntas como "¿cuántas películas hay?", "¿cuánto suma el coste total?" o "¿cuál es la duración media?".',
          },
          {
            type: 'p',
            text: 'Las cinco funciones agregadas básicas cubren la mayoría de los análisis numéricos. Todas se escriben después de SELECT, igual que cualquier otra columna, y pueden renombrarse con AS para que el resultado tenga un nombre legible.',
          },
        ],
      },
      {
        heading: 'COUNT: contar con precisión',
        blocks: [
          {
            type: 'p',
            text: 'COUNT tiene tres variantes y cada una cuenta cosas distintas. Elegir mal entre ellas es el error más frecuente cuando se trabaja con columnas que pueden tener nulos.',
          },
          {
            type: 'table',
            headers: ['Variante', 'Qué cuenta', 'Cuándo usarla'],
            rows: [
              ['COUNT(*)', 'Todas las filas, incluidas las que tengan nulos', 'Contar registros totales de una tabla'],
              ['COUNT(columna)', 'Solo las filas donde esa columna no es NULL', 'Verificar cuántos registros tienen ese dato'],
              ['COUNT(DISTINCT columna)', 'Los valores únicos, eliminando duplicados', 'Saber cuántos valores distintos existen'],
            ],
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'COUNT(*) no es lo mismo que COUNT(id)',
            text: 'COUNT(*) cuenta filas aunque alguna columna sea nula. COUNT(id) cuenta solo las filas donde id no es nulo. En tablas bien diseñadas el resultado suele ser idéntico, pero en presencia de columnas opcionales pueden diferir.',
          },
        ],
      },
      {
        heading: 'SUM, AVG, MIN y MAX',
        blocks: [
          {
            type: 'p',
            text: 'SUM acumula todos los valores numéricos de una columna. AVG calcula la media aritmética ignorando los nulos, lo que significa que los campos vacíos no arrastran el promedio hacia cero. MIN y MAX devuelven los extremos de una columna: funcionan con números, fechas y texto (orden alfabético), pero no con booleanos.',
          },
          {
            type: 'ul',
            items: [
              'SUM y AVG solo tienen sentido en columnas numéricas. Aplicarlas sobre texto provoca un error o un resultado incoherente.',
              'AVG ignora los nulos: si 100 filas tienen valor y 20 son NULL, el promedio se calcula sobre 100, no sobre 120.',
              'MIN y MAX en columnas de texto devuelven el valor más temprano y más tardío en el alfabeto, lo que puede ser útil para encontrar el primer y último nombre de una lista ordenada.',
            ],
          },
        ],
      },
      {
        heading: 'GROUP BY: analizar por segmentos',
        blocks: [
          {
            type: 'p',
            text: 'GROUP BY convierte el análisis de "toda la tabla" en "un análisis por cada grupo". En lugar de devolver el total de películas de toda la base de datos, puede devolver el total por clasificación, por año, por idioma o por cualquier otra columna.',
          },
          {
            type: 'p',
            text: 'Hay dos reglas que no tienen excepción. Si se ignoran, MySQL devolverá un error o un resultado incorrecto.',
          },
          {
            type: 'ol',
            items: [
              'Todas las columnas del SELECT que no sean funciones agregadas deben aparecer también en el GROUP BY. Si seleccionas "rating" y "COUNT(*)", tienes que agrupar por "rating".',
              'El orden de los grupos no está garantizado. Si necesitas los resultados en un orden concreto, añade siempre ORDER BY después del GROUP BY.',
            ],
          },
          {
            type: 'callout',
            variant: 'note',
            title: 'Primero se agrupa, luego se ordena',
            text: 'GROUP BY forma los grupos. ORDER BY los ordena. No son intercambiables: agrupar no ordena y ordenar no agrupa. En casi todas las consultas con GROUP BY querrás añadir también ORDER BY para que el resultado sea predecible.',
          },
        ],
      },
      {
        heading: 'HAVING: filtrar grupos, no filas',
        blocks: [
          {
            type: 'p',
            text: 'WHERE filtra filas antes de que se formen los grupos. HAVING filtra grupos una vez ya están formados. La diferencia es importante: WHERE no puede referenciar funciones agregadas porque se ejecuta antes de que existan; HAVING sí puede, porque actúa después de GROUP BY.',
          },
          {
            type: 'table',
            headers: ['', 'WHERE', 'HAVING'],
            rows: [
              ['Cuándo actúa', 'Antes de GROUP BY', 'Después de GROUP BY'],
              ['Filtra', 'Filas individuales', 'Grupos completos'],
              ['Puede usar funciones agregadas', 'No', 'Sí'],
              ['Caso de uso típico', 'rating = \'PG\'', 'COUNT(*) > 200'],
            ],
          },
          {
            type: 'p',
            text: 'Un patrón habitual es combinar WHERE y HAVING en la misma consulta: WHERE reduce las filas antes de agrupar (más eficiente), y HAVING elimina los grupos que no interesan después de agregarse.',
          },
        ],
      },
      {
        heading: 'Funciones avanzadas: GROUP_CONCAT, WITH ROLLUP y CASE WHEN',
        blocks: [
          {
            type: 'p',
            text: 'Más allá de los cinco agregados básicos, SQL ofrece herramientas para construir reportes más expresivos. Las tres más útiles para análisis y presentación de datos son GROUP_CONCAT, WITH ROLLUP y CASE WHEN.',
          },
          {
            type: 'ul',
            items: [
              'GROUP_CONCAT: concatena todos los valores de una columna dentro de cada grupo en una sola cadena de texto, separados por el carácter que se indique. Con DISTINCT elimina los duplicados antes de concatenar. Es ideal para generar listas compactas en reportes.',
              'WITH ROLLUP: se añade al final del GROUP BY y genera automáticamente filas de subtotales por cada nivel de agrupación, más una fila de total general. Las columnas de agrupación aparecen como NULL en las filas de subtotal; IFNULL permite reemplazar esos NULL por una etiqueta legible.',
              'CASE WHEN: crea una nueva columna calculada en función de condiciones. La estructura es CASE WHEN condición THEN valor ... ELSE valor_por_defecto END. Se usa habitualmente para segmentar datos en categorías (alto/medio/bajo) o para reetiquetado.',
            ],
          },
        ],
      },
      {
        heading: 'El orden lógico de ejecución',
        blocks: [
          {
            type: 'p',
            text: 'SQL no ejecuta las cláusulas en el orden en que se escriben. El motor sigue un orden interno independiente de cómo esté redactada la consulta. Entender este orden explica por qué WHERE no puede filtrar por alias definidos en SELECT, y por qué HAVING debe ir después de GROUP BY.',
          },
          {
            type: 'ol',
            items: [
              'FROM: identifica la tabla o las tablas de origen.',
              'WHERE: filtra las filas que no cumplen la condición.',
              'GROUP BY: forma los grupos a partir de las filas que quedaron.',
              'HAVING: elimina los grupos que no cumplen la condición agregada.',
              'SELECT: calcula las columnas y los agregados del resultado final.',
              'ORDER BY: ordena las filas del resultado.',
              'LIMIT: recorta el número de filas devueltas.',
            ],
          },
          {
            type: 'callout',
            variant: 'warn',
            title: 'Los alias del SELECT no están disponibles en WHERE ni en HAVING',
            text: 'El SELECT se ejecuta después de WHERE y de HAVING. Por eso no puedes usar un alias definido en SELECT dentro de una cláusula WHERE o HAVING: todavía no existe en ese punto. MySQL sí permite usar alias del SELECT en ORDER BY porque ORDER BY se evalúa al final.',
          },
        ],
      },
    ],

    codeExamples: [
      {
        label: 'Las cinco funciones agregadas',
        lang: 'sql',
        code: `-- COUNT: contar filas, valores no nulos y valores únicos
SELECT COUNT(*)                AS total_filas,
       COUNT(replacement_cost) AS con_coste,
       COUNT(DISTINCT rating)  AS ratings_unicos
FROM film;

-- SUM y AVG: suma y media de una columna numérica
SELECT SUM(replacement_cost) AS coste_total,
       AVG(length)           AS duracion_media
FROM film;

-- MIN y MAX: extremos de una columna
SELECT MIN(length) AS pelicula_mas_corta,
       MAX(length) AS pelicula_mas_larga
FROM film;`,
        note: 'Todas las funciones agregadas se pueden combinar en un único SELECT. El resultado siempre es una sola fila cuando no hay GROUP BY.',
      },
      {
        label: 'GROUP BY con COUNT y AVG',
        lang: 'sql',
        code: `-- Cuántas películas hay en cada clasificación
SELECT rating,
       COUNT(*) AS total
FROM film
GROUP BY rating
ORDER BY total DESC;

-- Tarifa media de alquiler por clasificación
SELECT rating,
       AVG(rental_rate) AS tarifa_media
FROM film
GROUP BY rating
ORDER BY tarifa_media DESC;`,
        note: 'La columna que no es un agregado (rating) debe aparecer en GROUP BY. ORDER BY permite ordenar por el agregado calculado.',
      },
      {
        label: 'HAVING: filtrar grupos por condición agregada',
        lang: 'sql',
        code: `-- Solo las clasificaciones con más de 200 películas
SELECT rating,
       COUNT(*) AS total
FROM film
GROUP BY rating
HAVING COUNT(*) > 200
ORDER BY total DESC;

-- Características especiales asociadas a películas más largas que la media
SELECT special_features,
       AVG(length) AS duracion_media
FROM film
GROUP BY special_features
HAVING AVG(length) > 115
ORDER BY duracion_media DESC;`,
        note: 'HAVING se escribe después de GROUP BY y antes de ORDER BY. Solo puede contener condiciones que impliquen funciones agregadas.',
      },
      {
        label: 'CASE WHEN: segmentar datos en categorías',
        lang: 'sql',
        code: `-- Segmentar películas en tres grupos por coste de reemplazo
SELECT CASE
         WHEN replacement_cost < 15           THEN 'Bajo'
         WHEN replacement_cost BETWEEN 15 AND 20 THEN 'Medio'
         ELSE                                      'Alto'
       END                      AS segmento_coste,
       COUNT(*)                 AS cantidad,
       AVG(rental_rate)         AS tarifa_media,
       AVG(length)              AS duracion_media
FROM film
GROUP BY segmento_coste
ORDER BY cantidad DESC;`,
        note: 'CASE WHEN genera una nueva columna calculada que puede usarse directamente en GROUP BY. El alias asignado con END AS es el que se referencia después.',
      },
    ],

    errores: [
      'Incluir en SELECT una columna que no es un agregado y no está en GROUP BY. MySQL puede permitirlo en algunos modos, pero devuelve un valor arbitrario, no el correcto.',
      'Usar WHERE para filtrar por una función agregada en lugar de HAVING. WHERE se ejecuta antes de GROUP BY y no tiene acceso a los valores calculados por COUNT, SUM, etc.',
      'Olvidar ORDER BY después de GROUP BY y asumir que los grupos vendrán ordenados. El orden de los grupos no está garantizado sin ORDER BY explícito.',
      'Confundir COUNT(*) con COUNT(columna) en tablas con nulos. Si la columna tiene nulos, COUNT(columna) devolverá un número menor que COUNT(*), lo que puede llevar a conclusiones erróneas.',
      'Aplicar SUM o AVG sobre columnas de texto. El resultado es 0 o NULL sin aviso de error claro, por lo que el error puede pasar desapercibido.',
    ],

    practicas: [
      'Nombra siempre el resultado de un agregado con AS para que la columna tenga un nombre descriptivo y no aparezca como "COUNT(*)" o "AVG(length)" en el resultado.',
      'Usa WHERE para reducir las filas antes de GROUP BY siempre que puedas: es más eficiente que HAVING, porque descarta filas antes de calcular los agregados.',
      'Reserva HAVING exclusivamente para condiciones que involucren funciones agregadas. Si la condición puede ir en WHERE, ponla en WHERE.',
      'Añade siempre ORDER BY cuando uses GROUP BY para que el resultado sea reproducible y predecible, independientemente de cómo MySQL decida ordenar internamente los grupos.',
      'Antes de escribir una consulta con GROUP BY, pregúntate cuál es la unidad de análisis (por rating, por año, por categoría) y asegúrate de que esa columna está tanto en SELECT como en GROUP BY.',
    ],

    ejercicios: [
      'Usando la tabla film de Sakila, cuenta cuántas películas hay en total con COUNT(*) y cuántos tipos de clasificación distintos hay con COUNT(DISTINCT rating).',
      'Calcula la suma total del replacement_cost de todas las películas y la media de la duración (length). Renombra las columnas con AS.',
      'Obtén la película con menor y mayor duración usando MIN y MAX sobre la columna length.',
      'Agrupa las películas por rating y muestra cuántas hay en cada grupo (COUNT) y la tarifa media de alquiler (AVG de rental_rate). Ordena el resultado de mayor a menor por la tarifa media.',
      'Usa HAVING para mostrar solo las clasificaciones que tienen más de 190 películas.',
      'Usa CASE WHEN para segmentar las películas en "Corta" (length < 90), "Media" (90–120) y "Larga" (> 120). Muestra cuántas hay en cada segmento.',
    ],

    checklist: [
      { text: 'Conozco las cinco funciones agregadas básicas: COUNT, SUM, AVG, MIN y MAX.' },
      { text: 'Entiendo la diferencia entre COUNT(*), COUNT(columna) y COUNT(DISTINCT columna).' },
      { text: 'Sé que AVG ignora los nulos al calcular el promedio.' },
      { text: 'Puedo escribir una consulta con GROUP BY y sé que todas las columnas no agregadas del SELECT deben estar en GROUP BY.' },
      { text: 'Entiendo la diferencia entre WHERE (filtra filas) y HAVING (filtra grupos).' },
      { text: 'Conozco el orden lógico de ejecución: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.' },
      { text: 'Sé crear columnas condicionales con CASE WHEN...THEN...ELSE...END.' },
    ],
  },

  {
    id: '04b', slug: '04b-funciones-agregadas-ejercicios-fundamentales',
    title: 'Funciones agregadas y agrupación — Ejercicios fundamentales',
    topic: 'Funciones Agregadas y Agrupación', topicNumber: '04', classNumber: '04b',
    type: 'exercise', status: 'pending', contentStatus: 'completed', difficulty: 2, estimatedTime: '35 min',
    tags: ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'GROUP BY', 'HAVING', 'Sakila'],

    summary: 'Primera toma de contacto con las funciones agregadas aplicadas a datos reales. Usando la tabla film de la base de datos Sakila se practican los conteos con COUNT, las sumatorias con SUM, los promedios con AVG, los extremos con MIN/MAX y las combinaciones clásicas GROUP BY + COUNT y GROUP BY + AVG, hasta llegar al filtrado de grupos con HAVING.',

    keyConcepts: [
      {
        term: 'Sakila',
        definition: 'Base de datos de ejemplo distribuida con MySQL que simula un videoclub: películas, actores, clientes, alquileres y pagos. Es la base de práctica estándar para ejercicios de agregación porque sus tablas tienen volumen suficiente para que los resultados sean significativos.',
      },
      {
        term: 'film (tabla)',
        definition: 'Tabla principal de Sakila. Contiene 1000 películas con columnas como title, rating, length (minutos), rental_rate (precio de alquiler), replacement_cost (coste de reposición), special_features y release_year.',
      },
      {
        term: 'rating',
        definition: 'Clasificación por edades de cada película en Sakila. Toma cinco valores posibles: G (todos los públicos), PG (guía parental), PG-13 (mayores de 13), R (restringido) y NC-17 (solo adultos).',
      },
      {
        term: 'replacement_cost',
        definition: 'Coste de reposición de una película en el videoclub: lo que pagaría el cliente si pierde o daña el DVD. Es una columna numérica (DECIMAL) ideal para practicar SUM, AVG, MIN y MAX.',
      },
      {
        term: 'special_features',
        definition: 'Características especiales de cada película: trailers, deleted scenes, behind the scenes, commentaries, o combinaciones de varias. Es una columna de texto que permite practicar GROUP BY con valores no numéricos.',
      },
      {
        term: 'Combinación clásica GROUP BY + COUNT',
        definition: 'El patrón más habitual en análisis de datos: agrupar registros por una categoría y contar cuántos hay en cada grupo. Responde a preguntas del tipo "¿cuántas películas hay por clasificación?".',
      },
      {
        term: 'Combinación clásica GROUP BY + AVG',
        definition: 'Patrón que permite comparar el valor medio de una magnitud entre diferentes grupos. Responde a preguntas del tipo "¿qué clasificación de película tiene mayor tarifa media de alquiler?".',
      },
    ],

    contenido: [
      {
        heading: 'Preparar el entorno: activar Sakila',
        blocks: [
          {
            type: 'p',
            text: 'Estos ejercicios se realizan sobre la base de datos Sakila. Si todavía no la tienes importada, descarga el archivo desde la documentación oficial de MySQL (sakila-db.zip), descomprímelo e importa ambos archivos (esquema y datos) desde MySQL Workbench → Administration → Data Import/Restore.',
          },
          {
            type: 'p',
            text: 'Una vez importada, actívala con USE y comprueba que la tabla film está disponible con un SELECT rápido.',
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'La tabla film tiene 1000 filas',
            text: 'Todos los ejercicios de esta clase usan la tabla film. Al escribir SELECT COUNT(*) FROM film deberías ver exactamente 1000. Si el resultado es diferente, puede que la importación de datos no se haya completado correctamente.',
          },
        ],
      },
      {
        heading: 'COUNT: tres formas de contar',
        blocks: [
          {
            type: 'p',
            text: 'En la tabla film, COUNT(*) devuelve las 1000 películas. COUNT(replacement_cost) devuelve las filas donde ese campo no es nulo —en este caso también 1000 porque la columna no admite nulos—. COUNT(DISTINCT rating) devuelve 5, porque solo existen cinco clasificaciones posibles (G, PG, PG-13, R, NC-17).',
          },
          {
            type: 'p',
            text: 'Este último uso, COUNT(DISTINCT), es muy práctico cuando se quiere saber cuántos valores únicos existen en una columna sin necesidad de listarlos todos.',
          },
        ],
      },
      {
        heading: 'SUM y AVG: resúmenes numéricos',
        blocks: [
          {
            type: 'p',
            text: 'SUM(replacement_cost) devuelve el coste total de reposición de todo el catálogo: lo que costaría reponer todas las películas si se perdieran simultáneamente. SUM(rental_duration) filtrando por rating = \'PG\' devuelve la suma de días de alquiler estándar para esa clasificación concreta.',
          },
          {
            type: 'p',
            text: 'AVG(length) filtrando por rating = \'NC-17\' devuelve la duración media de las películas para adultos. AVG(rental_rate) agrupado por rating permite comparar qué clasificación tiene la tarifa media más alta.',
          },
        ],
      },
      {
        heading: 'MIN y MAX: los extremos de un conjunto',
        blocks: [
          {
            type: 'p',
            text: 'MIN(length) y MAX(length) aplicados sobre toda la tabla film devuelven la película más corta (46 minutos) y la más larga (185 minutos) del catálogo. Combinados con GROUP BY rating se puede saber, para cada clasificación, cuánto dura la película más corta y la más larga de ese grupo.',
          },
          {
            type: 'callout',
            variant: 'note',
            title: 'Mismos extremos en replacement_cost para todos los ratings',
            text: 'Al calcular MIN y MAX de replacement_cost agrupado por rating, el resultado puede mostrar los mismos valores extremos (9.99 y 29.99) para todos los grupos. Eso no es un error: significa que el rango de precios de reposición es el mismo en todas las clasificaciones.',
          },
        ],
      },
      {
        heading: 'GROUP BY + COUNT y GROUP BY + AVG: combinaciones esenciales',
        blocks: [
          {
            type: 'p',
            text: 'La combinación GROUP BY + COUNT es la más habitual en análisis de datos. Permite responder "¿cuántos hay de cada tipo?" para cualquier dimensión: por clasificación, por año, por característica especial.',
          },
          {
            type: 'p',
            text: 'En la tabla film, GROUP BY release_year muestra un caso extremo: todas las 1000 películas pertenecen al mismo año (2006). Esto revela algo sobre la base de datos, no un error en la consulta.',
          },
          {
            type: 'p',
            text: 'GROUP BY + AVG sobre special_features permite comparar qué tipo de extras (trailers, deleted scenes, behind the scenes, commentaries) se asocia a películas más largas. Las películas con comentarios y trailers tienden a tener una duración media superior.',
          },
        ],
      },
      {
        heading: 'HAVING: quedarse solo con los grupos relevantes',
        blocks: [
          {
            type: 'p',
            text: 'HAVING filtra los grupos después de formarse. En la tabla film, HAVING COUNT(*) > 200 sobre un GROUP BY rating muestra solo las clasificaciones con representación abundante en el catálogo: PG-13 y NC-17. El resto de clasificaciones, con menos películas, se descarta del resultado.',
          },
          {
            type: 'p',
            text: 'Combinando GROUP BY special_features con HAVING AVG(length) > 115 se identifican qué tipos de características especiales están vinculadas a películas significativamente más largas que la media.',
          },
        ],
      },
    ],

    codeExamples: [
      {
        label: 'COUNT en sus tres variantes',
        lang: 'sql',
        code: `USE sakila;

-- Total de películas en el catálogo
SELECT COUNT(*) AS total_peliculas
FROM film;

-- Películas cuyo coste de reposición supera los 20 €
SELECT COUNT(*) AS peliculas_costosas
FROM film
WHERE replacement_cost > 20;

-- Cuántos tipos de clasificación distintos existen
SELECT COUNT(DISTINCT rating) AS tipos_rating
FROM film;`,
        note: 'Las tres variantes de COUNT en una sola sesión. La primera devuelve 1000, la segunda 486, la tercera 5.',
      },
      {
        label: 'SUM y AVG con filtrado y agrupación',
        lang: 'sql',
        code: `-- Coste total de reposición de todo el catálogo
SELECT SUM(replacement_cost) AS coste_total_catalogo
FROM film;

-- Suma de días de alquiler estándar para películas PG
SELECT SUM(rental_duration) AS dias_renta_pg
FROM film
WHERE rating = 'PG';

-- Duración media de películas NC-17
SELECT AVG(length) AS duracion_media_nc17
FROM film
WHERE rating = 'NC-17';

-- Tarifa media de alquiler por clasificación
SELECT rating,
       AVG(rental_rate) AS tarifa_media
FROM film
GROUP BY rating
ORDER BY tarifa_media DESC;`,
        note: 'AVG filtrando con WHERE trabaja sobre las filas que quedan después del filtro. GROUP BY + AVG lo calcula por separado para cada grupo.',
      },
      {
        label: 'MIN y MAX solos y agrupados',
        lang: 'sql',
        code: `-- Película más corta y más larga del catálogo
SELECT MIN(length) AS duracion_minima,
       MAX(length) AS duracion_maxima
FROM film;

-- Coste de reposición mínimo y máximo por clasificación
SELECT rating,
       MIN(replacement_cost) AS coste_minimo,
       MAX(replacement_cost) AS coste_maximo
FROM film
GROUP BY rating
ORDER BY rating;`,
        note: 'Sin GROUP BY, MIN y MAX actúan sobre toda la tabla y devuelven una sola fila. Con GROUP BY, calculan los extremos dentro de cada grupo.',
      },
      {
        label: 'HAVING: filtrar grupos',
        lang: 'sql',
        code: `-- Clasificaciones con representación abundante (más de 200 películas)
SELECT rating,
       COUNT(*) AS total
FROM film
GROUP BY rating
HAVING COUNT(*) > 200
ORDER BY total DESC;

-- Tipos de special_features asociados a películas largas (media > 115 min)
SELECT special_features,
       AVG(length) AS duracion_media
FROM film
GROUP BY special_features
HAVING AVG(length) > 115
ORDER BY duracion_media DESC;`,
        note: 'HAVING va después de GROUP BY. La condición puede referenciar la misma función agregada que aparece en SELECT o una diferente.',
      },
    ],

    errores: [
      'Usar WHERE en lugar de HAVING para filtrar por un resultado de COUNT o AVG. WHERE no tiene acceso a los valores calculados por las funciones agregadas porque se ejecuta antes de GROUP BY.',
      'Olvidar incluir en GROUP BY todas las columnas del SELECT que no son agregados. Si seleccionas rating y COUNT(*) pero solo agrupas por otra columna, el valor de rating en cada fila será arbitrario.',
      'Asumir que GROUP BY devuelve los grupos en un orden concreto. Sin ORDER BY el orden es indeterminado y puede cambiar entre ejecuciones.',
      'Confundir la columna length (duración de la película en minutos) con rental_duration (días de alquiler). Aplicar AVG sobre la columna equivocada da un resultado numérico sin que MySQL avise del error.',
    ],

    practicas: [
      'Antes de escribir la consulta, identifica qué quieres medir (el agregado) y por qué dimensión quieres segmentarlo (el GROUP BY). Esas dos decisiones definen el 90% de la consulta.',
      'Siempre añade ORDER BY al usar GROUP BY. El orden natural de MySQL no es predecible y puede cambiar con el volumen de datos.',
      'Usa WHERE para filtrar antes de GROUP BY siempre que la condición no dependa de un agregado. Reduce las filas que se procesan y mejora el rendimiento.',
      'Renombra con AS los resultados de funciones agregadas. Un resultado llamado "total", "media" o "coste_total" es mucho más útil que uno llamado "COUNT(*)" o "AVG(length)".',
    ],

    ejercicios: [
      'Cuenta cuántas películas tienen replacement_cost mayor a 25.',
      'Calcula la media de length para las películas con rating \'G\'. ¿Cuántos minutos duran de media?',
      'Obtén la suma total de rental_rate de todas las películas de la tabla film.',
      'Agrupa las películas por rating y muestra el total de películas y la duración mínima y máxima de cada grupo. Ordena de mayor a menor por total de películas.',
      'Usa HAVING para mostrar solo los grupos de special_features que tienen más de 180 películas.',
      'Encuentra las clasificaciones (rating) cuya media de replacement_cost supera los 20 dólares.',
    ],

    checklist: [
      { text: 'Sé importar Sakila y activarla con USE sakila.' },
      { text: 'Puedo usar COUNT(*), COUNT(columna) y COUNT(DISTINCT columna) en contextos diferentes.' },
      { text: 'Sé calcular SUM y AVG sobre columnas numéricas, con y sin filtrado WHERE.' },
      { text: 'Puedo obtener los extremos de una columna con MIN y MAX, solos y agrupados.' },
      { text: 'Entiendo y puedo escribir GROUP BY + COUNT y GROUP BY + AVG.' },
      { text: 'Sé usar HAVING para filtrar grupos por condiciones que implican funciones agregadas.' },
      { text: 'Distingo cuándo usar WHERE (antes de GROUP BY) y cuándo HAVING (después de GROUP BY).' },
    ],
  },

  {
    id: '04c', slug: '04c-funciones-agregadas-ejercicios-avanzados',
    title: 'Funciones agregadas y agrupación — Ejercicios avanzados',
    topic: 'Funciones Agregadas y Agrupación', topicNumber: '04', classNumber: '04c',
    type: 'exercise', status: 'pending', contentStatus: 'completed', difficulty: 3, estimatedTime: '30 min',
    tags: ['GROUP BY', 'HAVING', 'CASE WHEN', 'Subconsultas', 'GROUP_CONCAT', 'WITH ROLLUP', 'Análisis multidimensional'],

    summary: 'Análisis multidimensional agrupando por dos columnas simultáneamente, segmentación con CASE WHEN, subconsultas que calculan un agregado para usarlo como referencia en el filtrado exterior, y las funciones de reporte GROUP_CONCAT y WITH ROLLUP. Todo aplicado sobre la tabla film de Sakila.',

    keyConcepts: [
      {
        term: 'Análisis multidimensional',
        definition: 'Consulta que agrupa por dos o más columnas simultáneamente, generando una tabla cruzada. Permite comparar cómo se distribuye una magnitud en la intersección de dos categorías (por ejemplo: rating × special_features).',
      },
      {
        term: 'Tabla cruzada (cross-tab)',
        definition: 'Resultado de agrupar por múltiples columnas. Cada fila representa una combinación única de los valores de esas columnas, con sus métricas calculadas. Es el equivalente SQL de una tabla dinámica de Excel.',
      },
      {
        term: 'CASE WHEN (en GROUP BY)',
        definition: 'Expresión condicional que crea una columna calculada on-the-fly que puede usarse directamente como criterio de agrupación. Permite segmentar datos en categorías personalizadas (bajo/medio/alto) sin alterar la tabla.',
      },
      {
        term: 'Subconsulta escalar',
        definition: 'Subconsulta que devuelve exactamente un valor (una fila, una columna). Se puede usar en WHERE, en SELECT o como parte de una expresión matemática. El caso más habitual es calcular un promedio global para compararlo con cada fila.',
      },
      {
        term: 'Desviación respecto al promedio',
        definition: 'Diferencia entre el valor de un grupo y el promedio global. Se calcula restando el resultado de una subconsulta (que devuelve el promedio) del valor del grupo. Permite ver qué grupos están por encima y cuáles por debajo de la media.',
      },
      {
        term: 'GROUP_CONCAT',
        definition: 'Función agregada que concatena todos los valores de una columna dentro de cada grupo en una cadena de texto. Acepta SEPARATOR para definir el carácter separador y DISTINCT para eliminar duplicados antes de concatenar.',
      },
      {
        term: 'SUBSTRING_INDEX',
        definition: 'Función de texto que extrae los primeros N segmentos de una cadena separados por un delimitador. Se combina con GROUP_CONCAT para limitar el número de elementos en la lista concatenada.',
      },
      {
        term: 'WITH ROLLUP',
        definition: 'Modificador de GROUP BY que añade automáticamente filas con subtotales por cada nivel de agrupación y una fila de total general. Las columnas agrupadas aparecen como NULL en las filas de subtotal; se usa IFNULL para reemplazarlos con etiquetas.',
      },
    ],

    contenido: [
      {
        heading: 'Análisis multidimensional: agrupar por dos columnas',
        blocks: [
          {
            type: 'p',
            text: 'Hasta ahora los ejercicios agrupaban por una sola columna. Agrupar por dos columnas simultáneamente genera una tabla cruzada: cada fila representa una combinación única de los dos criterios. En la tabla film, agrupar por rating y special_features a la vez permite ver cómo se distribuyen las películas en la intersección de clasificación y tipo de extras.',
          },
          {
            type: 'p',
            text: 'El resultado muestra métricas (total de películas, duración media, coste de reposición) para cada combinación concreta: películas G con trailers, películas G con deleted scenes, películas PG con trailers, etc. Es el equivalente SQL de una tabla dinámica de Excel.',
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'El orden de las columnas en GROUP BY importa',
            text: 'GROUP BY rating, special_features agrupa primero por rating y dentro de cada rating por special_features. El resultado visual cambia según el orden, aunque los datos sean los mismos. Acompáñalo siempre con ORDER BY para controlar la presentación.',
          },
        ],
      },
      {
        heading: 'CASE WHEN: segmentar datos en categorías propias',
        blocks: [
          {
            type: 'p',
            text: 'CASE WHEN crea una nueva columna calculada en tiempo de consulta, sin modificar la tabla. Evalúa las condiciones en orden y devuelve el primer valor cuya condición se cumpla. Si ninguna condición se cumple, devuelve el valor del ELSE. La expresión siempre se cierra con END.',
          },
          {
            type: 'p',
            text: 'Un caso práctico es segmentar las películas por coste de reposición en tres grupos: Bajo (menos de 15), Medio (entre 15 y 20) y Alto (más de 20). Una vez creado el segmento con CASE WHEN, se puede usar directamente en GROUP BY para agregar métricas por segmento.',
          },
          {
            type: 'ul',
            items: [
              'CASE y END son obligatorios: sin ellos la expresión queda abierta y MySQL devuelve un error de sintaxis.',
              'El alias asignado con END AS es el nombre con el que se referencia la columna en GROUP BY y ORDER BY.',
              'Se pueden encadenar tantos WHEN como casos se necesiten. El ELSE captura todo lo que no encaja en ningún caso anterior.',
            ],
          },
        ],
      },
      {
        heading: 'Subconsultas con agregados: comparar contra la media global',
        blocks: [
          {
            type: 'p',
            text: 'Una subconsulta escalar es una consulta completa encerrada entre paréntesis que devuelve un único valor. Ese valor se puede usar como umbral en un WHERE o como referencia en un cálculo.',
          },
          {
            type: 'p',
            text: 'El ejemplo clásico es identificar las películas con duración superior a la media: el WHERE no puede contener "length > AVG(length)" directamente, porque AVG(length) necesita procesar todas las filas primero. La solución es calcular ese promedio en una subconsulta y comparar cada fila contra el número que devuelve.',
          },
          {
            type: 'p',
            text: 'Una variante más avanzada usa una subconsulta dentro del SELECT para calcular la tarifa promedio global y restarla de la tarifa media de cada grupo. El resultado es la desviación de cada clasificación respecto al promedio general, lo que permite ver qué ratings cobran más y cuáles menos de la media.',
          },
          {
            type: 'callout',
            variant: 'note',
            title: 'La subconsulta se ejecuta una vez',
            text: 'MySQL calcula la subconsulta escalar una sola vez y reutiliza ese valor para todas las filas de la consulta exterior. No se recalcula para cada fila. Esto hace que sea eficiente cuando el valor de referencia no cambia (como el promedio global de toda la tabla).',
          },
        ],
      },
      {
        heading: 'GROUP_CONCAT: listas compactas en un campo de texto',
        blocks: [
          {
            type: 'p',
            text: 'GROUP_CONCAT concatena todos los valores de una columna dentro de cada grupo en una única cadena de texto. Es útil para generar reportes donde se quiere ver, por ejemplo, qué títulos de película corresponden a cada clasificación, sin necesidad de múltiples filas.',
          },
          {
            type: 'p',
            text: 'SEPARATOR define el carácter que separa los valores (por defecto es una coma). DISTINCT antes del nombre de la columna elimina los duplicados antes de concatenar. Para limitar el número de elementos en la cadena, se combina con SUBSTRING_INDEX, que recorta la cadena hasta el enésimo separador.',
          },
          {
            type: 'callout',
            variant: 'warn',
            title: 'GROUP_CONCAT no garantiza el orden ni los elementos elegidos',
            text: 'Sin ORDER BY dentro del GROUP_CONCAT, el orden de los valores concatenados es arbitrario. SUBSTRING_INDEX corta los primeros N elementos de la cadena resultante, pero no elige los N elementos más relevantes. Si necesitas control sobre qué elementos aparecen, filtra con WHERE antes de concatenar.',
          },
        ],
      },
      {
        heading: 'WITH ROLLUP: subtotales automáticos',
        blocks: [
          {
            type: 'p',
            text: 'WITH ROLLUP se añade al final de GROUP BY y genera automáticamente filas de subtotales para cada nivel de agrupación, más una fila de total general al final. No requiere ningún cálculo adicional: MySQL lo hace solo.',
          },
          {
            type: 'p',
            text: 'Las filas de subtotal se identifican porque sus columnas de agrupación tienen valor NULL. IFNULL(columna, \'Subtotal\') permite reemplazar esos NULL por una etiqueta legible. En un GROUP BY por rating y release_year, WITH ROLLUP añade una fila con el subtotal por rating (release_year = NULL) y una fila con el total general (rating = NULL, release_year = NULL).',
          },
        ],
      },
    ],

    codeExamples: [
      {
        label: 'Análisis multidimensional: rating × special_features',
        lang: 'sql',
        code: `-- Tabla cruzada: métricas por combinación de rating y special_features
SELECT rating,
       special_features,
       COUNT(*)              AS total_peliculas,
       AVG(length)           AS duracion_media,
       SUM(replacement_cost) AS coste_total_reposicion
FROM film
GROUP BY rating, special_features
ORDER BY rating, total_peliculas DESC;`,
        note: 'Cada fila del resultado representa la intersección de un rating y un tipo de special_features. GROUP BY con dos columnas genera tantas filas como combinaciones únicas existen.',
      },
      {
        label: 'CASE WHEN: segmentar por coste de reposición',
        lang: 'sql',
        code: `-- Clasificar películas en tres segmentos de coste y comparar sus métricas
SELECT CASE
         WHEN replacement_cost < 15              THEN 'Bajo'
         WHEN replacement_cost BETWEEN 15 AND 20 THEN 'Medio'
         ELSE                                         'Alto'
       END              AS segmento_coste,
       COUNT(*)         AS cantidad,
       AVG(rental_rate) AS tarifa_media,
       AVG(length)      AS duracion_media
FROM film
GROUP BY segmento_coste
ORDER BY cantidad DESC;`,
        note: 'El alias "segmento_coste" asignado en END AS se usa directamente en GROUP BY y ORDER BY. Los tres segmentos muestran que el rango de tarifas medias entre ellos es pequeño.',
      },
      {
        label: 'Subconsultas con agregados',
        lang: 'sql',
        code: `-- Películas con duración superior a la media del catálogo
SELECT title,
       length
FROM film
WHERE length > (SELECT AVG(length) FROM film)
ORDER BY length DESC;

-- Desviación de la tarifa media de cada rating respecto al promedio global
SELECT rating,
       AVG(rental_rate)                             AS tarifa_media,
       (SELECT AVG(rental_rate) FROM film)          AS tarifa_global,
       AVG(rental_rate) - (SELECT AVG(rental_rate) FROM film) AS diferencia
FROM film
GROUP BY rating
ORDER BY diferencia DESC;`,
        note: 'La subconsulta (SELECT AVG(rental_rate) FROM film) devuelve un único número y se evalúa una sola vez. Ese número se usa como referencia en el WHERE o en el cálculo de la diferencia.',
      },
      {
        label: 'GROUP_CONCAT y WITH ROLLUP',
        lang: 'sql',
        code: `-- Listado compacto: primeros 5 títulos por clasificación
SELECT rating,
       SUBSTRING_INDEX(
         GROUP_CONCAT(title SEPARATOR ' / '),
         '/',
         5
       )        AS muestra_titulos,
       COUNT(*) AS total_peliculas
FROM film
GROUP BY rating
ORDER BY total_peliculas DESC;

-- Ratings únicos disponibles por tipo de special_features
SELECT special_features,
       GROUP_CONCAT(DISTINCT rating SEPARATOR ', ') AS ratings_disponibles,
       AVG(replacement_cost)                        AS coste_medio
FROM film
GROUP BY special_features
ORDER BY COUNT(*) DESC;

-- Subtotales por rating con WITH ROLLUP
SELECT IFNULL(rating, 'TOTAL')        AS clasificacion,
       IFNULL(release_year, 'Subtotal') AS anio,
       COUNT(*)                        AS total,
       AVG(length)                     AS duracion_media
FROM film
GROUP BY rating, release_year WITH ROLLUP;`,
        note: 'GROUP_CONCAT genera toda la cadena; SUBSTRING_INDEX la recorta. WITH ROLLUP añade filas NULL automáticamente; IFNULL las convierte en etiquetas legibles.',
      },
    ],

    errores: [
      'Olvidar cerrar el CASE con END. MySQL espera más condiciones y devuelve un error de sintaxis que puede ser difícil de localizar si la consulta es larga.',
      'Referenciar el alias de un CASE WHEN en una cláusula HAVING. HAVING se ejecuta antes que SELECT, por lo que el alias todavía no existe. Hay que repetir la expresión CASE completa en el HAVING o usar una subconsulta.',
      'Esperar que SUBSTRING_INDEX con GROUP_CONCAT seleccione los N elementos más relevantes. La función solo corta la cadena: el orden en que los elementos aparecen en la cadena depende de cómo MySQL procesa las filas, no de ningún criterio de relevancia.',
      'Confundir los NULL de WITH ROLLUP con nulos reales de la tabla. Los NULL que genera WITH ROLLUP en las filas de subtotal son etiquetas de agrupación, no datos faltantes.',
      'Comparar una columna con AVG(columna) directamente en WHERE sin subconsulta. WHERE no puede contener funciones agregadas porque se ejecuta antes de GROUP BY.',
    ],

    practicas: [
      'Antes de escribir un análisis multidimensional, decide cuáles son las dos (o más) dimensiones de análisis y qué métricas quieres ver en cada celda de la tabla cruzada.',
      'Usa CASE WHEN cuando necesites agrupar por rangos de valores numéricos. Es más flexible que tener esos rangos codificados en la tabla y permite ajustar los límites sin modificar el esquema.',
      'En subconsultas escalares, verifica primero que la subconsulta devuelve exactamente un valor ejecutándola por separado. Si devuelve más de una fila, la consulta exterior fallará.',
      'Usa GROUP_CONCAT con DISTINCT cuando la columna a concatenar puede tener duplicados dentro del grupo y solo te interesan los valores únicos.',
      'Con WITH ROLLUP, combina siempre IFNULL para reemplazar los NULL de los subtotales por etiquetas legibles antes de presentar el resultado.',
    ],

    ejercicios: [
      'Crea una tabla cruzada que muestre, para cada combinación de rating y release_year, el total de películas y la duración media.',
      'Usa CASE WHEN para segmentar las películas por duración en "Corta" (< 90 min), "Media" (90–120 min) y "Larga" (> 120 min). Muestra cuántas hay en cada segmento y la tarifa media de alquiler.',
      'Escribe una consulta que devuelva el título y la duración de todas las películas cuya duración supera el doble de la duración mínima del catálogo (usa una subconsulta para obtener MIN(length)).',
      'Calcula la desviación del coste de reposición medio de cada rating respecto al promedio global. ¿Qué clasificación tiene el mayor sobrecoste?',
      'Usa GROUP_CONCAT con DISTINCT para mostrar, por cada tipo de special_features, qué ratings están disponibles en una sola cadena separada por barras.',
      'Añade WITH ROLLUP a un GROUP BY rating para obtener el total de películas por clasificación más el total general. Usa IFNULL para etiquetar las filas de subtotal.',
    ],

    checklist: [
      { text: 'Puedo agrupar por dos columnas simultáneamente con GROUP BY col1, col2 y entiendo el resultado.' },
      { text: 'Sé escribir una expresión CASE WHEN...THEN...ELSE...END y usarla en GROUP BY.' },
      { text: 'Entiendo qué es una subconsulta escalar y puedo usarla en WHERE y en SELECT.' },
      { text: 'Puedo comparar el valor de un grupo contra el promedio global usando una subconsulta.' },
      { text: 'Sé usar GROUP_CONCAT con SEPARATOR y DISTINCT para generar listas compactas.' },
      { text: 'Puedo añadir WITH ROLLUP a un GROUP BY y usar IFNULL para etiquetar los subtotales.' },
    ],
  },
];
