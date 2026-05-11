import type { RawLesson } from './types';

export const topic05: RawLesson[] = [
  {
    id: '05', slug: '05-relaciones-entre-tablas-joins',
    title: 'Relaciones entre tablas — JOINs',
    topic: 'Relaciones entre tablas', topicNumber: '05', classNumber: '05',
    type: 'exercise', status: 'pending', contentStatus: 'completed', difficulty: 3, estimatedTime: '60 min',
    tags: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN', 'Foreign Key', 'Sakila'],

    summary: 'Las bases de datos relacionales distribuyen la información en tablas separadas conectadas por claves foráneas. Los JOINs son el mecanismo que permite volver a unir esas piezas para responder preguntas que ninguna tabla puede responder sola. Esta clase cubre los tipos de relación, el concepto de clave foránea y los cuatro JOINs esenciales: INNER, LEFT, RIGHT y CROSS.',

    keyConcepts: [
      {
        term: 'Relación entre tablas',
        definition: 'Vínculo lógico entre dos tablas a través de un campo común. Permite distribuir la información en tablas especializadas sin perder la capacidad de combinarlas cuando se necesita una visión completa.',
      },
      {
        term: 'Relación 1:1',
        definition: 'Cada registro de la tabla A se corresponde exactamente con un registro de la tabla B, y viceversa. Ejemplo: cada usuario tiene un único perfil extendido con su foto, biografía y configuración personal.',
      },
      {
        term: 'Relación 1:N',
        definition: 'Un registro de la tabla A puede relacionarse con muchos registros de la tabla B, pero cada registro de B pertenece a un único A. Ejemplo: un cliente puede tener múltiples pedidos, pero cada pedido pertenece a un solo cliente.',
      },
      {
        term: 'Relación N:M',
        definition: 'Muchos registros de la tabla A pueden relacionarse con muchos registros de la tabla B. Requiere una tabla intermedia (tabla de unión) que almacena los pares de claves foráneas. Ejemplo: una película puede tener varios actores y un actor puede aparecer en varias películas.',
      },
      {
        term: 'Clave foránea (Foreign Key)',
        definition: 'Campo de una tabla que contiene el valor de la clave primaria de otra tabla. Garantiza que las relaciones entre tablas sean válidas: no puede existir un valor en la clave foránea que no tenga su correspondiente registro en la tabla referenciada.',
      },
      {
        term: 'Comportamiento en cascada',
        definition: 'Regla que se aplica automáticamente cuando se modifica o elimina un registro referenciado. ON DELETE CASCADE elimina también todos los registros dependientes. ON DELETE RESTRICT bloquea la eliminación si existen dependientes.',
      },
      {
        term: 'Tabla intermedia (join table)',
        definition: 'Tabla auxiliar necesaria en las relaciones N:M. Solo contiene las claves foráneas de las dos tablas que relaciona. En Sakila, film_actor (film_id + actor_id) y film_category (film_id + category_id) son ejemplos.',
      },
      {
        term: 'INNER JOIN',
        definition: 'Devuelve solo las filas que tienen coincidencia en ambas tablas. Si una fila de la tabla izquierda no tiene correspondencia en la derecha (o viceversa), se excluye del resultado.',
      },
      {
        term: 'LEFT JOIN',
        definition: 'Devuelve todas las filas de la tabla izquierda (la primera mencionada) y las coincidentes de la derecha. Donde no hay coincidencia en la derecha, las columnas de esa tabla aparecen como NULL.',
      },
      {
        term: 'RIGHT JOIN',
        definition: 'Devuelve todas las filas de la tabla derecha (la segunda mencionada) y las coincidentes de la izquierda. Donde no hay coincidencia en la izquierda, las columnas aparecen como NULL. Es el simétrico del LEFT JOIN.',
      },
      {
        term: 'CROSS JOIN',
        definition: 'Genera el producto cartesiano: combina cada fila de la tabla izquierda con todas las filas de la derecha. Si la tabla A tiene 100 filas y B tiene 100, el resultado tiene 10.000 filas. Se usa para generar combinaciones exhaustivas.',
      },
      {
        term: 'Alias de tabla',
        definition: 'Nombre abreviado asignado a una tabla con AS (o simplemente con un espacio) para evitar repetir el nombre completo en la consulta. "FROM film AS f" o "FROM film f" permiten usar "f" en lugar de "film" en toda la consulta.',
      },
    ],

    contenido: [
      {
        heading: 'Por qué las tablas no existen de forma aislada',
        blocks: [
          {
            type: 'p',
            text: 'En una base de datos relacional, la información se distribuye entre tablas especializadas para evitar la redundancia. Una tabla de pedidos no repite todos los datos del cliente en cada fila: solo guarda el identificador del cliente y referencia la tabla de clientes cuando se necesita el nombre o el email.',
          },
          {
            type: 'p',
            text: 'Esta distribución es eficiente, pero crea un problema: ninguna tabla sola contiene toda la información. Para saber cuánto ha generado cada categoría de película en Sakila, hay que combinar al menos cinco tablas. Los JOINs son el mecanismo que permite hacer esa combinación.',
          },
          {
            type: 'callout',
            variant: 'note',
            title: 'Bases de datos relacionales vs. NoSQL',
            text: 'Las bases de datos relacionales (MySQL, PostgreSQL) estructuran los datos en tablas con relaciones definidas. Las bases NoSQL (MongoDB, Redis) almacenan datos más libres, sin esquema fijo. Los JOINs son una característica específica del modelo relacional.',
          },
        ],
      },
      {
        heading: 'Los tres tipos de relación entre tablas',
        blocks: [
          {
            type: 'p',
            text: 'Antes de escribir un JOIN hay que entender qué tipo de relación conecta las tablas. El tipo de relación determina cómo se diseña la base de datos y qué tablas intermedias son necesarias.',
          },
          {
            type: 'table',
            headers: ['Tipo', 'Descripción', 'Ejemplo en Sakila'],
            rows: [
              ['1:1', 'Un registro de A ↔ exactamente un registro de B', 'address ↔ store (cada tienda tiene una dirección única)'],
              ['1:N', 'Un registro de A ↔ muchos registros de B', 'customer ↔ rental (un cliente puede tener muchos alquileres)'],
              ['N:M', 'Muchos de A ↔ muchos de B (requiere tabla intermedia)', 'film ↔ actor, unidos por film_actor'],
            ],
          },
          {
            type: 'p',
            text: 'Las relaciones N:M son las más complejas porque no se pueden representar directamente con dos tablas. La tabla intermedia almacena los pares de claves foráneas y puede incluir atributos propios de la relación (por ejemplo, el rol de un actor en una película).',
          },
        ],
      },
      {
        heading: 'Claves foráneas: el corazón de las relaciones',
        blocks: [
          {
            type: 'p',
            text: 'Una clave foránea es un campo que contiene el valor de la clave primaria de otra tabla. Su función es garantizar que ningún registro quede huérfano: no puede existir un alquiler sin un cliente válido, ni un producto en un pedido sin ese producto en el catálogo.',
          },
          {
            type: 'ul',
            items: [
              'En film_category, el campo category_id es clave foránea que referencia a category.category_id (clave primaria de category).',
              'En rental, el campo inventory_id es clave foránea que referencia a inventory.inventory_id.',
              'En payment, el campo rental_id es clave foránea que referencia a rental.rental_id.',
            ],
          },
          {
            type: 'callout',
            variant: 'warn',
            title: 'Registros huérfanos y cascada',
            text: 'Si se intenta eliminar un cliente que tiene alquileres asociados, MySQL puede bloquearlo (RESTRICT) o eliminar también los alquileres automáticamente (CASCADE). Sin claves foráneas, se podrían borrar clientes y dejar alquileres sin dueño: datos inconsistentes que corrompen los análisis.',
          },
        ],
      },
      {
        heading: 'INNER JOIN: solo lo que existe en ambas tablas',
        blocks: [
          {
            type: 'p',
            text: 'INNER JOIN devuelve exclusivamente las filas que tienen correspondencia en ambas tablas. Si una película no tiene categoría asignada en film_category, no aparece en el resultado. Si una categoría no tiene ninguna película asignada, tampoco aparece.',
          },
          {
            type: 'p',
            text: 'Es el JOIN más usado porque en bases de datos bien diseñadas la mayoría de los registros tienen sus correspondencias completas. Se usa cuando se necesita combinar datos y solo interesan los registros que están en ambas partes.',
          },
          {
            type: 'p',
            text: 'La sintaxis: SELECT columnas FROM tabla_A INNER JOIN tabla_B ON tabla_A.clave = tabla_B.clave_foranea. La condición ON especifica qué campo de una tabla coincide con qué campo de la otra.',
          },
        ],
      },
      {
        heading: 'LEFT JOIN: priorizar la tabla izquierda',
        blocks: [
          {
            type: 'p',
            text: 'LEFT JOIN devuelve todas las filas de la tabla izquierda (la que aparece antes del JOIN) más las coincidentes de la derecha. Si una fila de la izquierda no tiene correspondencia en la derecha, las columnas de la tabla derecha aparecen como NULL en esa fila.',
          },
          {
            type: 'p',
            text: 'El caso de uso más habitual es detectar registros sin correspondencia: películas sin alquileres, clientes sin pedidos, productos sin ventas. Si el resultado tiene NULL en las columnas de la tabla derecha, ese registro de la izquierda no tiene match.',
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'LEFT JOIN para encontrar registros inexistentes',
            text: 'Añadiendo WHERE tabla_derecha.campo IS NULL después de un LEFT JOIN se obtienen exactamente los registros de la izquierda que no tienen ninguna correspondencia en la derecha. Es la forma más eficiente de responder "¿qué películas nunca se han alquilado?".',
          },
        ],
      },
      {
        heading: 'RIGHT JOIN y FULL JOIN: el simétrico y la unión total',
        blocks: [
          {
            type: 'p',
            text: 'RIGHT JOIN hace lo mismo que LEFT JOIN pero priorizando la tabla derecha: devuelve todas sus filas y rellena con NULL las columnas de la izquierda donde no hay coincidencia. En la práctica, cualquier RIGHT JOIN puede reescribirse como un LEFT JOIN cambiando el orden de las tablas.',
          },
          {
            type: 'p',
            text: 'FULL JOIN devolvería todos los registros de ambas tablas, con NULL donde no hay coincidencia en ninguna de las dos. MySQL no soporta FULL JOIN directamente. Para emularlo, se usa UNION entre un LEFT JOIN y un RIGHT JOIN sobre las mismas tablas.',
          },
        ],
      },
      {
        heading: 'CROSS JOIN: el producto cartesiano',
        blocks: [
          {
            type: 'p',
            text: 'CROSS JOIN genera todas las combinaciones posibles entre las filas de ambas tablas, sin ninguna condición de coincidencia. Si la tabla A tiene 100 filas y la tabla B tiene 50, el resultado tiene 5.000 filas.',
          },
          {
            type: 'p',
            text: 'Su uso más común es generar combinaciones exhaustivas para pruebas o para poblar datos de muestra. En producción hay que usarlo con precaución: tablas grandes producen resultados masivos que pueden saturar la memoria.',
          },
        ],
      },
      {
        heading: 'Encadenar múltiples JOINs',
        blocks: [
          {
            type: 'p',
            text: 'Una consulta puede encadenar tantos JOINs como tablas necesite combinar. Cada JOIN añade una tabla al conjunto de datos disponible. El orden importa: cada JOIN se une al resultado acumulado de los anteriores, no a la tabla original.',
          },
          {
            type: 'p',
            text: 'En Sakila, para calcular los ingresos totales por categoría hay que encadenar cinco tablas: category → film_category → film → inventory → rental → payment. Cada eslabón de esta cadena es un JOIN que añade la información del siguiente nivel.',
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'Usa alias de tabla para mantener la consulta legible',
            text: 'Con múltiples JOINs, escribir el nombre completo de la tabla en cada referencia hace el código ilegible. Los alias (FROM category AS c, o simplemente FROM category c) acortan el código sin perder claridad. Una letra por tabla (c, fc, f, i, r, p) es el convenio habitual.',
          },
        ],
      },
    ],

    codeExamples: [
      {
        label: 'Rentabilidad por categoría (5 INNER JOINs)',
        lang: 'sql',
        code: `USE sakila;

-- Ingresos totales y media por alquiler para cada categoría de película
SELECT c.name                     AS categoria,
       COUNT(r.rental_id)         AS rentas_totales,
       SUM(p.amount)              AS total_generado,
       AVG(p.amount)              AS promedio_por_renta
FROM category c
  INNER JOIN film_category fc ON c.category_id = fc.category_id  -- categoría → película
  INNER JOIN film f           ON fc.film_id     = f.film_id       -- película → detalles
  INNER JOIN inventory i      ON f.film_id      = i.film_id       -- película → copia física
  INNER JOIN rental r         ON i.inventory_id = r.inventory_id  -- copia → alquiler
  INNER JOIN payment p        ON r.rental_id    = p.rental_id     -- alquiler → pago
GROUP BY c.name
ORDER BY total_generado DESC;`,
        note: 'Cada INNER JOIN añade un nivel de información. Sin esta cadena de cinco JOINs sería imposible saber cuánto ha generado cada categoría, porque ninguna tabla contiene esa combinación por sí sola.',
      },
      {
        label: 'Actores más rentables (INNER JOIN + LIMIT)',
        lang: 'sql',
        code: `-- Top 10 actores por ingresos generados a través de sus películas
SELECT a.actor_id,
       CONCAT(a.first_name, ' ', a.last_name) AS nombre_actor,
       COUNT(DISTINCT f.film_id)              AS peliculas,
       SUM(p.amount)                          AS total_generado
FROM actor a
  INNER JOIN film_actor fa ON a.actor_id    = fa.actor_id     -- actor → participación
  INNER JOIN film f        ON fa.film_id    = f.film_id        -- participación → película
  INNER JOIN inventory i   ON f.film_id     = i.film_id        -- película → copia
  INNER JOIN rental r      ON i.inventory_id = r.inventory_id  -- copia → alquiler
  INNER JOIN payment p     ON r.rental_id   = p.rental_id      -- alquiler → pago
GROUP BY a.actor_id, nombre_actor
ORDER BY total_generado DESC
LIMIT 10;`,
        note: 'CONCAT une el nombre y el apellido del actor en una sola columna. COUNT(DISTINCT f.film_id) cuenta películas únicas para no doblar el recuento si una película tiene varias copias alquiladas.',
      },
      {
        label: 'Disponibilidad vs. rentabilidad (LEFT JOINs)',
        lang: 'sql',
        code: `-- Eficiencia del inventario: copias disponibles vs. veces alquilada cada película
SELECT f.film_id,
       f.title                                    AS titulo,
       COUNT(i.inventory_id)                      AS copias_inventario,
       COUNT(r.rental_id)                         AS veces_alquilada,
       COUNT(r.rental_id) / NULLIF(COUNT(i.inventory_id), 0) AS rentabilidad_por_copia,
       IFNULL(SUM(p.amount), 0)                   AS ingresos_totales
FROM film f
  LEFT JOIN inventory i ON f.film_id      = i.film_id       -- mantiene películas sin stock
  LEFT JOIN rental r    ON i.inventory_id = r.inventory_id  -- mantiene copias no alquiladas
  LEFT JOIN payment p   ON r.rental_id    = p.rental_id     -- mantiene alquileres sin pago
GROUP BY f.film_id, f.title
HAVING copias_inventario > 0
ORDER BY rentabilidad_por_copia DESC
LIMIT 20;`,
        note: 'LEFT JOIN conserva las películas aunque no tengan alquileres o pagos. IFNULL convierte los NULL en 0 para que la suma no quede vacía. NULLIF evita la división por cero en la rentabilidad por copia.',
      },
      {
        label: 'INNER vs LEFT JOIN: la diferencia en práctica',
        lang: 'sql',
        code: `-- INNER JOIN: solo actores que tienen al menos una película registrada
SELECT a.first_name, a.last_name, COUNT(fa.film_id) AS peliculas
FROM actor a
  INNER JOIN film_actor fa ON a.actor_id = fa.actor_id
GROUP BY a.actor_id, a.first_name, a.last_name
ORDER BY peliculas DESC;

-- LEFT JOIN: todos los actores, incluso los sin películas (aparecen con 0)
SELECT a.first_name, a.last_name, COUNT(fa.film_id) AS peliculas
FROM actor a
  LEFT JOIN film_actor fa ON a.actor_id = fa.actor_id
GROUP BY a.actor_id, a.first_name, a.last_name
ORDER BY peliculas DESC;

-- Emular FULL JOIN en MySQL con UNION
SELECT f.title, c.name AS categoria
FROM film f
  LEFT JOIN film_category fc ON f.film_id = fc.film_id
  LEFT JOIN category c       ON fc.category_id = c.category_id
UNION
SELECT f.title, c.name AS categoria
FROM film f
  RIGHT JOIN film_category fc ON f.film_id = fc.film_id
  RIGHT JOIN category c       ON fc.category_id = c.category_id;`,
        note: 'La diferencia entre INNER y LEFT JOIN se ve claramente cuando hay registros sin correspondencia. El UNION de LEFT + RIGHT emula el FULL JOIN que MySQL no soporta nativamente.',
      },
    ],

    errores: [
      'Confundir qué tabla es la "izquierda" y cuál la "derecha". La tabla izquierda es la que aparece antes del JOIN (en el FROM o en el JOIN anterior encadenado). La derecha es la que aparece después del JOIN.',
      'Usar INNER JOIN cuando se necesita LEFT JOIN. Si hay películas sin alquileres y se usa INNER JOIN, esas películas desaparecen del resultado sin ningún aviso. El error solo se detecta comparando el número de resultados con el total de registros de la tabla.',
      'Olvidar la condición ON en un JOIN. Sin ON, MySQL ejecuta un producto cartesiano implícito entre las dos tablas, generando un número de filas igual al producto de ambas. El resultado es silencioso pero incorrecto.',
      'No usar alias cuando hay columnas con el mismo nombre en varias tablas. Si film y inventory tienen ambas film_id y se escribe solo film_id en el SELECT, MySQL puede dar un error de ambigüedad o elegir una tabla arbitrariamente.',
      'Añadir más JOINs de los necesarios. Cada JOIN adicional multiplica el tiempo de procesamiento. Si solo se necesitan datos de dos tablas, no hay que incluir tablas intermedias que no aportan columnas al resultado.',
      'Mezclar LEFT y INNER JOINs sin entender el efecto. Si después de un LEFT JOIN se añade un INNER JOIN sobre la tabla unida con LEFT, el INNER JOIN descarta las filas con NULL, anulando el efecto del LEFT JOIN anterior.',
    ],

    practicas: [
      'Antes de escribir el JOIN, dibuja o anota la cadena de relaciones: qué tabla se conecta con cuál, a través de qué campos. Una cadena clara evita errores en las condiciones ON.',
      'Asigna un alias de una sola letra a cada tabla cuando la consulta tenga más de dos tablas. El convenio habitual en Sakila: c (category), fc (film_category), f (film), i (inventory), r (rental), p (payment).',
      'Usa INNER JOIN cuando solo te interesan los registros con correspondencia en ambas tablas. Usa LEFT JOIN cuando quieres conservar todos los registros de la tabla principal, aunque no tengan correspondencia.',
      'Verifica el número de filas del resultado antes de añadir agregados. Un JOIN mal planteado puede multiplicar filas por duplicación, haciendo que SUM o COUNT den valores incorrectamente altos.',
      'En análisis de disponibilidad o detección de huecos (películas sin alquileres, clientes inactivos), usa siempre LEFT JOIN más WHERE tabla_derecha.campo IS NULL.',
    ],

    ejercicios: [
      'Escribe una consulta con INNER JOIN que liste el título de cada película y el nombre de su categoría. ¿Cuántas filas devuelve? ¿Coincide con el total de películas?',
      'Usa INNER JOIN para obtener el listado de todos los actores con el número de películas en las que han participado. Ordena de mayor a menor.',
      'Replica el ejercicio anterior con LEFT JOIN. ¿Hay diferencia en el resultado? ¿Por qué?',
      'Encadena film → inventory → rental para saber cuántas veces se ha alquilado cada película. Usa GROUP BY film_id y ORDER BY el número de alquileres descendente.',
      'Añade payment al ejercicio anterior para calcular también los ingresos totales por película. ¿Qué película ha generado más dinero?',
      'Escribe una consulta con LEFT JOIN que identifique qué películas nunca han sido alquiladas (rental.rental_id IS NULL después del LEFT JOIN con rental).',
    ],

    checklist: [
      { text: 'Entiendo los tres tipos de relación entre tablas (1:1, 1:N, N:M) y sé cuándo se necesita una tabla intermedia.' },
      { text: 'Sé qué es una clave foránea y por qué impide registros huérfanos.' },
      { text: 'Puedo escribir un INNER JOIN con su condición ON y entiendo que excluye filas sin correspondencia en ambas tablas.' },
      { text: 'Puedo escribir un LEFT JOIN y sé que conserva todas las filas de la tabla izquierda rellenando con NULL las de la derecha.' },
      { text: 'Entiendo la diferencia práctica entre INNER JOIN y LEFT JOIN y sé cuándo usar cada uno.' },
      { text: 'Sé encadenar múltiples JOINs sobre la misma consulta y uso alias de tabla para mantener el código legible.' },
      { text: 'Conozco la limitación de MySQL con FULL JOIN y sé que se puede emular con UNION de LEFT + RIGHT JOIN.' },
      { text: 'Puedo combinar JOINs con GROUP BY, HAVING y ORDER BY para construir análisis multitabla completos.' },
    ],
  },
];
