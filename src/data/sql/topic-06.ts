import type { RawLesson } from './types';

export const topic06: RawLesson[] = [
  {
    id: '06', slug: '06-subconsultas-consultas-avanzadas',
    title: 'Subconsultas y consultas avanzadas',
    topic: 'Subconsultas y Consultas Avanzadas', topicNumber: '06', classNumber: '06',
    type: 'exercise', status: 'pending', contentStatus: 'completed', difficulty: 3, estimatedTime: '70 min',
    tags: ['Subquery', 'IN', 'EXISTS', 'NOT EXISTS', 'Subconsulta escalar', 'Subconsulta correlacionada', 'World'],

    summary: 'Una subconsulta es una consulta completa encerrada dentro de otra consulta. Permite filtrar datos en función de resultados calculados dinámicamente, crear columnas con valores derivados y construir tablas temporales sobre la marcha. Los operadores IN y EXISTS son los mecanismos principales para trabajar con subconsultas, y su elección afecta directamente al rendimiento.',

    keyConcepts: [
      {
        term: 'Subconsulta',
        definition: 'Consulta SQL escrita entre paréntesis dentro de otra consulta. Se ejecuta primero y su resultado se usa por la consulta exterior para filtrar, calcular o construir datos. Permite responder preguntas compuestas del tipo "dame los países cuyas ciudades tienen más de X habitantes".',
      },
      {
        term: 'Subconsulta escalar',
        definition: 'Subconsulta que devuelve exactamente un valor: una fila y una columna. Se puede usar en SELECT para crear columnas calculadas dinámicamente o en WHERE para comparar con un umbral calculado (como el precio máximo o el promedio global).',
      },
      {
        term: 'Subconsulta de lista',
        definition: 'Subconsulta que devuelve múltiples filas de una sola columna. Se usa con IN, ANY o ALL para verificar si un valor pertenece o supera alguno de los valores de esa lista. Ejemplo: los códigos de país de las ciudades con más de 5 millones de habitantes.',
      },
      {
        term: 'Subconsulta correlacionada',
        definition: 'Subconsulta que referencia una columna de la consulta exterior. Se ejecuta una vez por cada fila que procesa la consulta exterior, lo que la hace más flexible pero también más costosa si la tabla tiene muchos registros. Se usa típicamente con EXISTS.',
      },
      {
        term: 'IN',
        definition: 'Operador que verifica si un valor coincide con alguno de los resultados devueltos por la subconsulta. Recorre toda la lista antes de devolver el resultado. Más eficiente cuando la subconsulta devuelve pocos valores y los datos son relativamente estáticos.',
      },
      {
        term: 'EXISTS',
        definition: 'Operador que verifica si la subconsulta devuelve al menos una fila. Se detiene en el primer resultado encontrado sin procesar el resto. Más eficiente que IN en tablas grandes y en subconsultas correlacionadas, porque no necesita recorrer toda la lista.',
      },
      {
        term: 'NOT EXISTS',
        definition: 'Negación de EXISTS: devuelve verdadero si la subconsulta no encuentra ninguna fila que cumpla la condición. Se usa para identificar registros que no tienen correspondencia en otra tabla, como idiomas que solo se hablan en un único país.',
      },
      {
        term: 'Subconsulta en SELECT',
        definition: 'Subconsulta colocada dentro de la lista de columnas del SELECT. Genera una columna calculada dinámicamente para cada fila del resultado. Debe ser escalar (devolver exactamente un valor por fila). Útil para porcentajes, referencias cruzadas o comparaciones fila a fila.',
      },
      {
        term: 'Subconsulta en FROM',
        definition: 'Subconsulta que actúa como tabla temporal: el resultado de la subconsulta se trata como si fuera una tabla real a la que se puede añadir un alias y consultarla desde el exterior. Permite pre-filtrar o pre-agregar datos antes de la consulta principal.',
      },
      {
        term: 'ROUND',
        definition: 'Función que redondea un número a un número especificado de decimales. ROUND(valor, 2) redondea a dos decimales. Se usa habitualmente para formatear porcentajes o resultados de divisiones.',
      },
    ],

    contenido: [
      {
        heading: 'Qué es una subconsulta y cuándo es necesaria',
        blocks: [
          {
            type: 'p',
            text: 'Una subconsulta es una pregunta dentro de otra pregunta. Cuando la respuesta que necesitas depende de un dato que primero hay que calcular, una subconsulta permite resolver ambas partes en una sola consulta.',
          },
          {
            type: 'p',
            text: 'El caso más simple: obtener el producto con el precio más alto. No se puede filtrar directamente por "el precio máximo" porque ese valor no se conoce de antemano. La subconsulta lo calcula primero, y la consulta exterior filtra usando ese resultado.',
          },
          {
            type: 'callout',
            variant: 'note',
            title: 'Las subconsultas siempre van entre paréntesis',
            text: 'Toda subconsulta se escribe entre paréntesis. MySQL la evalúa de dentro hacia fuera: primero resuelve la subconsulta más interna, luego usa su resultado en la consulta exterior. Si hay subconsultas anidadas, el orden de evaluación sigue la misma lógica.',
          },
        ],
      },
      {
        heading: 'Los tres tipos de resultado que puede devolver una subconsulta',
        blocks: [
          {
            type: 'p',
            text: 'No todas las subconsultas devuelven el mismo tipo de dato. El tipo de resultado determina dónde se puede colocar la subconsulta y qué operador hay que usar para trabajar con ella.',
          },
          {
            type: 'table',
            headers: ['Tipo', 'Qué devuelve', 'Operador habitual', 'Ejemplo de uso'],
            rows: [
              ['Escalar', 'Un único valor (1 fila, 1 columna)', '=, >, <', 'precio > (SELECT MAX(precio) FROM ...)'],
              ['Lista', 'Múltiples filas, una columna', 'IN, ANY, ALL', 'code IN (SELECT countrycode FROM city WHERE ...)'],
              ['Correlacionada', 'Depende de la fila exterior, puede devolver tabla completa', 'EXISTS, NOT EXISTS', 'WHERE NOT EXISTS (SELECT 1 FROM ... WHERE ...)'],
            ],
          },
          {
            type: 'p',
            text: 'La distinción más importante es entre las subconsultas independientes (escalar y lista) y las correlacionadas. Las independientes se ejecutan una sola vez. Las correlacionadas se ejecutan una vez por cada fila que procesa la consulta exterior.',
          },
        ],
      },
      {
        heading: 'IN: comprobar pertenencia a una lista',
        blocks: [
          {
            type: 'p',
            text: 'IN verifica si el valor de una columna aparece en alguno de los resultados devueltos por la subconsulta. La subconsulta se ejecuta primero y genera la lista; después, la consulta exterior compara cada fila contra esa lista.',
          },
          {
            type: 'p',
            text: 'Es la opción natural cuando la subconsulta devuelve múltiples valores y se quiere comprobar pertenencia: "dame los países cuyo código está en la lista de países que tienen ciudades con más de 5 millones de habitantes".',
          },
          {
            type: 'ul',
            items: [
              'IN recorre toda la lista antes de devolver el resultado. Si la lista es muy larga, puede ser lento.',
              'NOT IN hace lo contrario: devuelve las filas cuyo valor no aparece en la lista. Cuidado: si la lista contiene algún NULL, NOT IN devuelve vacío, porque NULL = NULL no es verdadero en SQL.',
              'DISTINCT dentro de la subconsulta elimina duplicados de la lista antes de comparar, lo que puede mejorar el rendimiento.',
            ],
          },
        ],
      },
      {
        heading: 'EXISTS y NOT EXISTS: verificar existencia',
        blocks: [
          {
            type: 'p',
            text: 'EXISTS no comprueba qué devuelve la subconsulta, sino si devuelve algo. En cuanto encuentra una fila que cumple la condición, se detiene. No necesita recorrer el resto. Por eso es más eficiente que IN cuando la tabla es grande.',
          },
          {
            type: 'p',
            text: 'NOT EXISTS es la herramienta perfecta para encontrar exclusividad: registros que no tienen correspondencia en otra tabla. Identificar idiomas hablados en un único país, clientes sin ningún pedido, o películas que nunca han sido alquiladas son casos típicos de NOT EXISTS.',
          },
          {
            type: 'table',
            headers: ['', 'IN', 'EXISTS'],
            rows: [
              ['Qué verifica', 'Si el valor está en la lista', 'Si la subconsulta devuelve al menos una fila'],
              ['Se detiene al primer resultado', 'No (recorre toda la lista)', 'Sí'],
              ['Mejor cuando', 'La subconsulta devuelve pocos valores', 'La tabla es grande o la subconsulta es correlacionada'],
              ['Manejo de NULL', 'NOT IN falla con NULL en la lista', 'NOT EXISTS no tiene este problema'],
            ],
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'La convención SELECT 1 en EXISTS',
            text: 'Dentro de un EXISTS, la subconsulta suele escribirse como SELECT 1 FROM ... o SELECT * FROM ... porque el valor devuelto no importa: solo importa si existe o no existe alguna fila. SELECT 1 es el convenio más habitual por claridad.',
          },
        ],
      },
      {
        heading: 'Subconsultas en SELECT: columnas calculadas dinámicamente',
        blocks: [
          {
            type: 'p',
            text: 'Una subconsulta en la lista de columnas del SELECT genera un valor calculado para cada fila del resultado. Debe ser escalar: si devuelve más de una fila, MySQL produce un error.',
          },
          {
            type: 'p',
            text: 'El caso de uso más habitual es calcular un porcentaje o una proporción que requiere un valor de referencia de otra tabla. En lugar de hacer un JOIN completo, la subconsulta recupera ese valor de referencia específico para cada fila.',
          },
          {
            type: 'callout',
            variant: 'warn',
            title: 'La subconsulta en SELECT se ejecuta una vez por fila',
            text: 'Si el SELECT devuelve 1000 filas y hay una subconsulta en las columnas, esa subconsulta se ejecuta 1000 veces. En tablas grandes esto puede ser muy lento. Si el valor de referencia es el mismo para todas las filas (como el promedio global), es más eficiente calcularlo una sola vez en el FROM.',
          },
        ],
      },
      {
        heading: 'Subconsultas en FROM: tablas temporales',
        blocks: [
          {
            type: 'p',
            text: 'Una subconsulta en la cláusula FROM genera una tabla temporal que solo existe durante la ejecución de la consulta. Esa tabla temporal recibe un alias y puede consultarse desde el exterior igual que cualquier tabla real.',
          },
          {
            type: 'p',
            text: 'Es útil cuando se necesita pre-filtrar o pre-agregar datos antes de la consulta principal. En lugar de trabajar con toda la tabla original, la consulta exterior trabaja con un subconjunto ya procesado.',
          },
          {
            type: 'p',
            text: 'Por ejemplo, si solo interesan países de cierto continente con población superior a un umbral, se puede crear una tabla temporal con esos países filtrados y luego consultar sobre esa tabla temporal en lugar de la tabla original completa.',
          },
        ],
      },
      {
        heading: 'Cuándo usar JOIN en lugar de subconsulta',
        blocks: [
          {
            type: 'p',
            text: 'Las subconsultas y los JOINs pueden resolver los mismos problemas en muchos casos, pero no siempre con el mismo rendimiento ni la misma legibilidad.',
          },
          {
            type: 'ul',
            items: [
              'Usa JOIN cuando necesitas columnas de ambas tablas en el resultado. Una subconsulta en WHERE no puede devolver columnas de la tabla que está consultando.',
              'Usa JOIN cuando la subconsulta es correlacionada y la tabla tiene muchos registros. Un JOIN suele ser más rápido porque procesa las tablas una sola vez, no una vez por fila.',
              'Usa subconsulta cuando la lógica es más clara expresada como pregunta dentro de pregunta, o cuando el resultado intermedio no necesita aparecer en el SELECT final.',
              'En subconsultas correlacionadas con tablas grandes (miles de filas), considera siempre si un JOIN equivalente sería más eficiente. La subconsulta se ejecuta N veces; el JOIN se ejecuta una.',
            ],
          },
        ],
      },
    ],

    codeExamples: [
      {
        label: 'IN: países con ciudades de más de 5 millones',
        lang: 'sql',
        code: `USE world;

-- Países que tienen al menos una ciudad con más de 5 millones de habitantes
-- La subconsulta genera la lista de códigos de país; IN verifica la pertenencia
SELECT name       AS pais,
       continent  AS continente
FROM country
WHERE code IN (
  SELECT DISTINCT countrycode     -- elimina duplicados: un país puede tener varias ciudades grandes
  FROM city
  WHERE population > 5000000      -- ciudades con más de 5 millones
);`,
        note: 'DISTINCT dentro de la subconsulta evita que el mismo código de país aparezca varias veces en la lista (si un país tiene dos ciudades con más de 5M). Sin DISTINCT el resultado de IN es idéntico, pero la lista es mayor y la comparación más lenta.',
      },
      {
        label: 'NOT EXISTS: idiomas hablados en un único país',
        lang: 'sql',
        code: `-- Idiomas que no aparecen en ningún otro país distinto al propio
-- NOT EXISTS se detiene en el primer duplicado encontrado: más eficiente que COUNT + HAVING
SELECT cl1.language   AS idioma,
       cl1.countrycode AS unico_pais
FROM countrylanguage cl1
WHERE NOT EXISTS (
  SELECT 1
  FROM countrylanguage cl2
  WHERE cl2.language     = cl1.language      -- mismo idioma
    AND cl2.countrycode != cl1.countrycode   -- pero en un país distinto
);`,
        note: 'cl1 y cl2 son dos alias de la misma tabla: la consulta exterior recorre un registro, y la subconsulta busca en el resto si ese idioma aparece en otro país. Si no lo encuentra (NOT EXISTS = true), el idioma es exclusivo.',
      },
      {
        label: 'Subconsulta escalar en SELECT: porcentaje de población',
        lang: 'sql',
        code: `-- Qué porcentaje de la población total de su país representa cada ciudad
SELECT ci.name                               AS ciudad,
       ci.population                         AS poblacion_ciudad,
       co.name                               AS pais,
       co.population                         AS poblacion_pais,
       ROUND(
         ci.population * 100.0 /
         (SELECT population
          FROM country
          WHERE code = ci.countrycode),      -- subconsulta escalar: población del país de esta ciudad
         2
       )                                     AS porcentaje_del_pais
FROM city ci
  JOIN country co ON ci.countrycode = co.code
WHERE ci.population > 1000000               -- solo ciudades con más de 1 millón
ORDER BY porcentaje_del_pais DESC
LIMIT 20;`,
        note: 'La subconsulta escalar dentro de ROUND devuelve un único número (la población del país de esa ciudad específica) y se ejecuta una vez por cada fila. El JOIN aporta el nombre del país; la subconsulta aporta el valor de referencia para el porcentaje.',
      },
      {
        label: 'Subconsulta en FROM: tabla temporal',
        lang: 'sql',
        code: `-- Crear una tabla temporal con países de Asia y consultar sobre ella
SELECT continente,
       AVG(poblacion) AS poblacion_media
FROM (
  SELECT continent    AS continente,
         population   AS poblacion
  FROM country
  WHERE continent = 'Asia'
    AND population > 0
) AS paises_asia                            -- alias obligatorio para la subconsulta en FROM
GROUP BY continente;

-- Comparar IN vs EXISTS para el mismo resultado
-- Con IN (subconsulta devuelve lista):
SELECT name FROM country
WHERE code IN (SELECT countrycode FROM city WHERE population > 5000000);

-- Con EXISTS (subconsulta correlacionada):
SELECT name FROM country AS co
WHERE EXISTS (
  SELECT 1 FROM city
  WHERE countrycode = co.code AND population > 5000000
);`,
        note: 'La subconsulta en FROM debe tener siempre un alias (AS paises_asia). Los dos últimos ejemplos devuelven el mismo resultado: IN genera una lista completa primero; EXISTS se detiene en el primer match por país, siendo más eficiente con tablas grandes.',
      },
    ],

    errores: [
      'Usar NOT IN cuando la subconsulta puede devolver NULL. Si cualquier valor de la lista es NULL, NOT IN devuelve vacío para todas las filas porque la comparación con NULL es indeterminada. NOT EXISTS no tiene este problema.',
      'Olvidar el alias en subconsultas del FROM. MySQL exige que toda subconsulta usada como tabla tenga un alias. Sin él, la consulta falla con un error de sintaxis.',
      'Escribir una subconsulta escalar en SELECT que devuelve más de una fila. Si la subconsulta puede devolver múltiples filas, MySQL lanza el error "Subquery returns more than 1 row". Hay que asegurarse de que la condición WHERE dentro sea lo suficientemente restrictiva.',
      'Usar subconsultas correlacionadas en tablas con miles de filas sin considerar el rendimiento. Si la tabla exterior tiene 10.000 filas y la subconsulta correlacionada accede a otra tabla grande, la consulta puede tardar minutos. En esos casos un JOIN suele ser mucho más rápido.',
      'Anidar subconsultas innecesariamente cuando un JOIN resuelve el mismo problema de forma más legible y eficiente. Más niveles de anidamiento no implican más potencia: solo más dificultad de lectura y depuración.',
    ],

    practicas: [
      'Escribe y ejecuta la subconsulta por separado antes de integrarla. Verificar que devuelve el resultado esperado de forma aislada ahorra tiempo de depuración.',
      'Elige IN cuando la subconsulta es independiente y devuelve pocos valores. Elige EXISTS cuando la subconsulta es correlacionada o cuando la tabla es grande y quieres que se detenga al primer resultado.',
      'Evita NOT IN si no puedes garantizar que la subconsulta no devolverá NULL. Usa NOT EXISTS como alternativa segura: no tiene el problema del NULL.',
      'Cuando uses una subconsulta en FROM, ponle siempre un alias descriptivo. Es obligatorio sintácticamente pero además hace el código más legible.',
      'Si la misma subconsulta se repetiría varias veces en la misma consulta, considera si un JOIN o una tabla temporal explícita simplificaría el código.',
    ],

    ejercicios: [
      'Usa IN para obtener los nombres de los países que tienen al menos una ciudad con más de 1 millón de habitantes. ¿Cuántos países aparecen?',
      'Usa EXISTS para obtener los mismos resultados que el ejercicio anterior. Compara la legibilidad y prueba cuál es más intuitivo para ti.',
      'Usa NOT EXISTS para encontrar países que no tienen ninguna ciudad registrada en la tabla city.',
      'Escribe una subconsulta escalar en SELECT que muestre, para cada país de Europa, cuántas ciudades tiene (de la tabla city). Ordena de más a menos ciudades.',
      'Crea una subconsulta en FROM que genere una tabla temporal con solo los países de América del Sur y su población. Luego calcula la población media de esa tabla temporal.',
      'Combina JOIN y subconsulta: obtén el nombre y continente de los países cuya población total supera el promedio de todos los países (usa una subconsulta escalar para el promedio).',
    ],

    checklist: [
      { text: 'Entiendo qué es una subconsulta y sé que siempre va entre paréntesis.' },
      { text: 'Conozco los tres tipos de subconsulta: escalar (un valor), de lista (múltiples filas) y correlacionada (depende de la consulta exterior).' },
      { text: 'Sé usar IN para verificar si un valor pertenece a una lista devuelta por una subconsulta.' },
      { text: 'Sé usar EXISTS y NOT EXISTS para verificar presencia o ausencia de correspondencia.' },
      { text: 'Entiendo por qué NOT IN falla cuando la subconsulta puede devolver NULL y cómo evitarlo con NOT EXISTS.' },
      { text: 'Puedo colocar una subconsulta en SELECT para generar columnas calculadas dinámicamente.' },
      { text: 'Puedo colocar una subconsulta en FROM para crear una tabla temporal con alias.' },
      { text: 'Sé cuándo es mejor usar JOIN en lugar de subconsulta (tablas grandes, subconsultas correlacionadas).' },
    ],
  },
];
