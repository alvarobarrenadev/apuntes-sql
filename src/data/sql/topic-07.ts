import type { RawLesson } from './types';

export const topic07: RawLesson[] = [
  {
    id: '07a', slug: '07a-optimizacion-conceptos',
    title: 'Optimización y buenas prácticas — Conceptos',
    topic: 'Optimización y Buenas Prácticas', topicNumber: '07', classNumber: '07a',
    type: 'theory', status: 'pending', contentStatus: 'completed', difficulty: 3, estimatedTime: '30 min',
    tags: ['Índices', 'B-Tree', 'Hash', 'Full Text', 'Normalización', '1FN', '2FN', '3FN'],

    summary: 'Una base de datos puede contener los datos correctos y aun así ser lenta o inconsistente si no está bien estructurada. Los índices aceleran las búsquedas evitando que MySQL recorra toda la tabla fila a fila. La normalización organiza el esquema para eliminar redundancias y garantizar que cada dato esté en un único lugar. Juntas, estas dos técnicas definen la diferencia entre una base de datos de juguete y una base de datos lista para producción.',

    keyConcepts: [
      {
        term: 'Índice',
        definition: 'Estructura de datos auxiliar que MySQL mantiene separada de la tabla y que permite localizar registros sin escanearla entera. Funciona como el índice de un libro: en lugar de leer todas las páginas, se consulta el índice y se salta directamente a la posición correcta.',
      },
      {
        term: 'Índice B-Tree',
        definition: 'Tipo de índice predeterminado en MySQL. Organiza los datos en un árbol balanceado y ordenado, lo que lo hace eficiente tanto para búsquedas exactas como para rangos (BETWEEN, >, <) y ordenaciones (ORDER BY). Es el índice de uso general.',
      },
      {
        term: 'Índice HASH',
        definition: 'Índice que convierte cada valor en una posición fija mediante una función hash. Extremadamente rápido para igualdades exactas (=), pero no sirve para rangos ni ordenaciones. MySQL 8 no soporta HASH en tablas InnoDB; está disponible en PostgreSQL y motores alternativos.',
      },
      {
        term: 'Índice Full Text',
        definition: 'Índice especializado para búsquedas en texto libre. Indexa palabras clave ignorando artículos y preposiciones comunes. Permite usar MATCH...AGAINST en lugar de LIKE, con una velocidad radicalmente superior en tablas grandes.',
      },
      {
        term: 'Índice compuesto',
        definition: 'Índice creado sobre dos o más columnas simultáneamente. MySQL lo usa cuando la consulta filtra u ordena por esas columnas en el mismo orden en que fueron declaradas en el índice. Útil cuando se combinan condiciones habituales en los WHERE.',
      },
      {
        term: 'EXPLAIN ANALYZE',
        definition: 'Comando que ejecuta la consulta y devuelve un análisis detallado de cómo MySQL la resolvió: qué índices usó, cuántas filas escaneó, el coste estimado y el tiempo real. Es el principal instrumento de diagnóstico para medir el impacto de un índice.',
      },
      {
        term: 'MATCH...AGAINST',
        definition: 'Sintaxis para búsquedas Full Text en MySQL. MATCH especifica la columna indexada y AGAINST la cadena de búsqueda. Con IN BOOLEAN MODE permite usar operadores: + (debe contener), - (no debe contener), * (comodín de sufijo).',
      },
      {
        term: 'Normalización',
        definition: 'Proceso de organizar el esquema de una base de datos relacional para eliminar redundancias y garantizar que cada dato dependa lógicamente del lugar donde está almacenado. Se aplica progresivamente mediante formas normales (1FN, 2FN, 3FN).',
      },
      {
        term: 'Primera Forma Normal (1FN)',
        definition: 'Regla de normalización que exige que cada columna contenga valores atómicos (indivisibles) y que no existan grupos repetidos dentro de una fila. Una columna con "Matemáticas, Física, Química" en un mismo campo viola la 1FN.',
      },
      {
        term: 'Segunda Forma Normal (2FN)',
        definition: 'Regla que exige estar en 1FN y que todos los atributos no clave dependan completamente de la clave primaria, no de una parte de ella. Relevante cuando la clave primaria es compuesta (formada por más de una columna).',
      },
      {
        term: 'Tercera Forma Normal (3FN)',
        definition: 'Regla que exige estar en 2FN y que no existan dependencias transitivas: ningún atributo no clave puede depender de otro atributo no clave. Todo atributo no clave debe depender directamente de la clave primaria.',
      },
      {
        term: 'Dependencia transitiva',
        definition: 'Situación en la que un atributo no clave depende de otro atributo no clave en lugar de depender directamente de la clave primaria. Ejemplo: en una tabla de empleados, si "ciudad_sede" depende de "departamento" (no clave) y no de "empleado_id" (clave), hay una dependencia transitiva.',
      },
    ],

    contenido: [
      {
        heading: 'Por qué la velocidad importa en producción',
        blocks: [
          {
            type: 'p',
            text: 'En un entorno de práctica con cientos o miles de filas, cualquier consulta responde en milisegundos independientemente de cómo esté escrita. En producción, las tablas pueden tener millones de registros, y una consulta mal optimizada que tarda 5 segundos en encontrar un registro puede hacer inutilizable una aplicación que recibe cientos de peticiones simultáneas.',
          },
          {
            type: 'p',
            text: 'Los índices y la normalización son las dos herramientas principales para abordar este problema. Los índices mejoran la velocidad de las consultas. La normalización mejora la estructura del esquema, eliminando duplicados y garantizando consistencia. Las dos son complementarias: una base de datos puede tener índices perfectos pero un esquema caótico, o un esquema limpio pero sin ningún índice.',
          },
        ],
      },
      {
        heading: 'Índices: cómo MySQL encuentra datos sin leer todo',
        blocks: [
          {
            type: 'p',
            text: 'Sin índices, cada consulta con WHERE obliga a MySQL a leer todas las filas de la tabla de arriba a abajo buscando las que cumplen la condición. Es el equivalente a buscar una palabra en un diccionario leyendo todas las páginas en orden.',
          },
          {
            type: 'p',
            text: 'Un índice es una estructura aparte, mantenida automáticamente por MySQL, que almacena los valores de una o varias columnas en un orden que permite localizar registros de forma directa. La consulta consulta el índice primero, obtiene la posición exacta del registro y salta directamente a él.',
          },
          {
            type: 'callout',
            variant: 'note',
            title: 'Los índices tienen coste de escritura',
            text: 'Cada vez que se inserta, actualiza o elimina un registro, MySQL debe actualizar también todos los índices de esa tabla. Crear demasiados índices en tablas con muchas escrituras puede empeorar el rendimiento global. Los índices son especialmente valiosos en tablas con muchas lecturas y pocas escrituras.',
          },
        ],
      },
      {
        heading: 'Los tres tipos de índice',
        blocks: [
          {
            type: 'table',
            headers: ['Tipo', 'Cómo funciona', 'Cuándo usarlo', 'Limitación'],
            rows: [
              ['B-Tree', 'Árbol ordenado y balanceado. Permite recorrer rangos de forma eficiente.', 'Rangos (BETWEEN, >, <), igualdades, ORDER BY', 'Menos eficiente que HASH para igualdades puras en tablas muy grandes'],
              ['HASH', 'Función matemática que convierte el valor en una posición fija.', 'Igualdades exactas (=), como búsquedas por email o DNI', 'No soporta rangos ni ORDER BY. No disponible en MySQL 8 con InnoDB'],
              ['Full Text', 'Índice de palabras clave que ignora términos comunes.', 'Búsquedas en texto libre con MATCH...AGAINST', 'Solo para columnas de texto (VARCHAR, TEXT). No para números o fechas'],
            ],
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'Full Text vs LIKE: una diferencia enorme',
            text: 'LIKE \'%receta%\' no puede usar ningún índice porque el comodín inicial (%) impide saber por dónde empezar. En tablas grandes puede tardar segundos. MATCH(descripcion) AGAINST(\'receta\') usa el índice Full Text y lo resuelve en milisegundos. Si necesitas búsquedas en texto, Full Text no es una opción: es la única opción eficiente.',
          },
        ],
      },
      {
        heading: 'Índices compuestos: combinar columnas',
        blocks: [
          {
            type: 'p',
            text: 'Un índice compuesto cubre dos o más columnas y es útil cuando las consultas filtran habitualmente por esa combinación. MySQL lo usa cuando la condición WHERE incluye las columnas en el mismo orden en que fueron declaradas en el índice.',
          },
          {
            type: 'p',
            text: 'Por ejemplo, si las consultas frecuentes filtran por customer_id y luego ordenan por rental_date, un índice compuesto sobre (customer_id, rental_date) permite ir directamente al cliente y encontrar sus alquileres ya ordenados por fecha.',
          },
          {
            type: 'callout',
            variant: 'warn',
            title: 'El orden de las columnas en el índice compuesto importa',
            text: 'Un índice sobre (customer_id, rental_date) es útil para consultas que filtran por customer_id o por la combinación customer_id + rental_date. No es útil para consultas que filtran solo por rental_date. Declara primero la columna más selectiva (la que filtra más registros).',
          },
        ],
      },
      {
        heading: 'Normalización: construir esquemas que no mienten',
        blocks: [
          {
            type: 'p',
            text: 'La normalización resuelve tres problemas que aparecen en bases de datos mal diseñadas: anomalías de inserción (hay que duplicar datos para insertar un registro nuevo), anomalías de actualización (cambiar un dato requiere actualizarlo en múltiples filas), y anomalías de eliminación (borrar un registro destruye información que no debería perderse).',
          },
          {
            type: 'p',
            text: 'El proceso se aplica progresivamente mediante formas normales. Cada forma normal elimina un tipo concreto de redundancia o inconsistencia. No es necesario llegar siempre a la 3FN: en algunos casos, una desnormalización controlada puede mejorar el rendimiento a costa de algo de redundancia.',
          },
        ],
      },
      {
        heading: 'Primera Forma Normal (1FN): valores atómicos',
        blocks: [
          {
            type: 'p',
            text: 'Un valor es atómico cuando no puede dividirse más. Una columna que contiene "Matemáticas, Física, Química" en un mismo campo almacena tres valores en uno, lo que viola la 1FN. Cuando se necesita extraer uno de esos valores, hay que procesar texto, lo que es lento e impreciso.',
          },
          {
            type: 'ul',
            items: [
              'Cada columna debe contener un único valor por fila.',
              'No puede haber grupos repetidos: si un estudiante puede cursar N asignaturas, no van en una sola columna separadas por comas. Cada asignatura ocupa su propia fila.',
              'La solución habitual es crear filas adicionales para cada valor, usando la misma clave primaria si el registro pertenece al mismo sujeto.',
            ],
          },
        ],
      },
      {
        heading: 'Segunda Forma Normal (2FN): dependencia completa de la clave',
        blocks: [
          {
            type: 'p',
            text: 'La 2FN entra en juego cuando la clave primaria es compuesta (formada por dos o más columnas). La regla: todos los atributos no clave deben depender de la clave completa, no solo de una parte de ella.',
          },
          {
            type: 'p',
            text: 'En una tabla de detalles de pedido con clave compuesta (pedido_id, producto_id), el campo "nombre_producto" viola la 2FN porque depende solo de producto_id, no de la combinación pedido_id + producto_id. La solución es extraer los datos del producto a su propia tabla.',
          },
          {
            type: 'callout',
            variant: 'note',
            title: 'Si la clave primaria es simple, la 2FN se cumple automáticamente',
            text: 'Las dependencias parciales solo pueden existir con claves compuestas. Si cada tabla tiene un único campo como clave primaria (como un id auto-incremental), la 2FN está garantizada por construcción.',
          },
        ],
      },
      {
        heading: 'Tercera Forma Normal (3FN): sin dependencias entre no-claves',
        blocks: [
          {
            type: 'p',
            text: 'La 3FN añade una regla sobre los atributos no clave: ninguno puede depender de otro atributo no clave. Todo atributo no clave debe depender directamente de la clave primaria.',
          },
          {
            type: 'p',
            text: 'El ejemplo clásico: en una tabla de empleados con columnas empleado_id (clave), nombre, departamento y ciudad_sede, el campo ciudad_sede depende de departamento (no clave), no directamente de empleado_id. Eso es una dependencia transitiva. La solución es separar los departamentos a su propia tabla con departamento_id como clave.',
          },
          {
            type: 'table',
            headers: ['Forma Normal', 'Regla que añade', 'Problema que elimina'],
            rows: [
              ['1FN', 'Valores atómicos, sin grupos repetidos', 'Datos múltiples en un campo, columnas que no pueden indexarse'],
              ['2FN', 'Atributos no clave dependen de toda la clave primaria', 'Duplicación de datos en claves compuestas'],
              ['3FN', 'Atributos no clave no dependen de otros no clave', 'Dependencias transitivas, datos que cambian en cascada incorrectamente'],
            ],
          },
        ],
      },
    ],

    codeExamples: [
      {
        label: 'Crear los tres tipos de índice',
        lang: 'sql',
        code: `-- B-Tree por defecto: ideal para rangos y ordenaciones
CREATE INDEX idx_film_year_length ON film (release_year, length);

-- B-Tree para igualdad exacta (MySQL 8 no soporta HASH en InnoDB)
CREATE INDEX idx_customer_email ON customer (email);

-- Full Text: para búsquedas en texto libre
CREATE FULLTEXT INDEX idx_film_description ON film (description);

-- Ver todos los índices de una tabla
SHOW INDEX FROM film;

-- Eliminar un índice
DROP INDEX idx_film_year_length ON film;`,
        note: 'CREATE INDEX sin especificar tipo crea un B-Tree. El índice Full Text requiere que la columna sea de tipo CHAR, VARCHAR o TEXT. SHOW INDEX muestra los índices existentes, incluyendo el PRIMARY KEY generado automáticamente.',
      },
      {
        label: 'EXPLAIN ANALYZE: medir el impacto del índice',
        lang: 'sql',
        code: `-- Antes del índice: MySQL escanea todas las filas (tabla completa)
EXPLAIN ANALYZE
SELECT title, release_year, length
FROM film
WHERE release_year = 2006
  AND length BETWEEN 120 AND 180;

-- Crear el índice compuesto
CREATE INDEX idx_film_year_length ON film (release_year, length);

-- Después del índice: MySQL salta directamente al rango indexado
EXPLAIN ANALYZE
SELECT title, release_year, length
FROM film
WHERE release_year = 2006
  AND length BETWEEN 120 AND 180;`,
        note: 'EXPLAIN ANALYZE ejecuta la consulta y devuelve el plan real de ejecución con tiempos medidos. Busca en la salida "rows" (filas escaneadas) y "actual time": un buen índice reduce ambos drásticamente.',
      },
      {
        label: 'Full Text: MATCH...AGAINST con operadores booleanos',
        lang: 'sql',
        code: `-- Sin Full Text index la búsqueda usa LIKE (lenta, no usa índice)
SELECT title FROM film
WHERE description LIKE '%drama%' AND description LIKE '%feminist%';

-- Crear el índice Full Text
CREATE FULLTEXT INDEX idx_film_desc ON film (description);

-- Con Full Text: + = debe contener, - = no debe contener
SELECT title, description
FROM film
WHERE MATCH(description) AGAINST('+drama +feminist' IN BOOLEAN MODE);

-- Búsqueda con exclusión: drama pero no acción
SELECT title
FROM film
WHERE MATCH(description) AGAINST('+drama -action' IN BOOLEAN MODE);`,
        note: 'IN BOOLEAN MODE permite usar operadores: + (obligatorio), - (excluido), * (prefijo). Sin el modo booleano, MySQL usa relevancia natural y puede ignorar palabras que no superen cierto umbral de frecuencia.',
      },
      {
        label: 'Normalización: de violación a 3FN',
        lang: 'sql',
        code: `-- VIOLACIÓN de 1FN: cursos en una sola columna (no atómico)
-- ❌ Mal diseño
CREATE TABLE inscripciones_mal (
  alumno_id INT,
  nombre    VARCHAR(100),
  cursos    VARCHAR(200)   -- "Matemáticas, Física, Química" ← no atómico
);

-- ✅ En 1FN: un valor por columna y por fila
CREATE TABLE inscripciones (
  alumno_id INT,
  nombre    VARCHAR(100),
  curso     VARCHAR(100)   -- cada fila = un curso
);

-- VIOLACIÓN de 3FN: ciudad_sede depende de departamento, no de empleado_id
-- ❌ Mal diseño
CREATE TABLE empleados_mal (
  empleado_id INT PRIMARY KEY,
  nombre      VARCHAR(100),
  departamento VARCHAR(50),
  ciudad_sede  VARCHAR(50)   -- depende de departamento, no de empleado_id
);

-- ✅ En 3FN: separar departamentos a su propia tabla
CREATE TABLE departamentos (
  departamento_id INT PRIMARY KEY,
  nombre          VARCHAR(50),
  ciudad_sede     VARCHAR(50)
);
CREATE TABLE empleados (
  empleado_id     INT PRIMARY KEY,
  nombre          VARCHAR(100),
  departamento_id INT,
  FOREIGN KEY (departamento_id) REFERENCES departamentos(departamento_id)
);`,
        note: 'Normalizar no siempre significa añadir más tablas: a veces basta con cambiar el tipo de dato o descomponer una columna. El criterio clave es que cada dato viva en un único lugar y que su lugar sea lógicamente coherente con la clave primaria de su tabla.',
      },
    ],

    errores: [
      'Crear índices en todas las columnas pensando que siempre mejoran el rendimiento. Cada índice consume espacio y ralentiza las escrituras (INSERT, UPDATE, DELETE). Solo indexa las columnas que aparecen frecuentemente en WHERE, ORDER BY o JOIN.',
      'Usar LIKE con comodín inicial (\'%palabra\') esperando que use el índice B-Tree. Los índices B-Tree solo pueden usarse cuando el patrón empieza por un prefijo fijo. LIKE \'%texto\' fuerza un escaneo completo de la tabla.',
      'Aplicar normalización sin entender las consultas habituales. Una 3FN estricta puede obligar a JOINs costosos en consultas muy frecuentes. En algunos sistemas de alto rendimiento se acepta una desnormalización controlada a cambio de menos JOINs.',
      'Confundir la 2FN con la 3FN. La 2FN trata sobre dependencias parciales en claves compuestas. La 3FN trata sobre dependencias entre atributos no clave. Son problemas distintos que pueden coexistir en la misma tabla.',
      'Olvidar que EXPLAIN ANALYZE ejecuta realmente la consulta. En tablas de producción con operaciones de escritura (INSERT, UPDATE), usar EXPLAIN sin ANALYZE para no modificar datos.',
    ],

    practicas: [
      'Antes de crear un índice, analiza con EXPLAIN ANALYZE cuántas filas escanea la consulta sin él. Si escanea pocas filas (tabla pequeña o filtro muy selectivo), el índice probablemente no aportará mejora perceptible.',
      'Nombra los índices de forma descriptiva: idx_tabla_columna o idx_tabla_columna1_columna2. Un nombre como "idx1" no te dice nada cuando tienes veinte índices en producción.',
      'Aplica las formas normales en el orden correcto: primero 1FN, luego 2FN, luego 3FN. No puedes estar en 2FN sin cumplir 1FN.',
      'Revisa tus tablas buscando columnas que contengan datos separados por comas o barras: son casi siempre una violación de 1FN y la señal más clara de que el esquema necesita revisión.',
      'Cuando detectes una dependencia transitiva, pregúntate si el atributo dependiente necesita su propia tabla o simplemente hay que reubicar la columna. No siempre la solución requiere crear una tabla nueva.',
    ],

    ejercicios: [
      'Identifica en la tabla de Sakila film las columnas que se usan más habitualmente en WHERE. ¿Cuáles tienen ya un índice? Usa SHOW INDEX FROM film para comprobarlo.',
      'Diseña en papel una tabla de pedidos con columnas pedido_id, cliente_nombre, cliente_email, producto_nombre, producto_precio, cantidad. Identifica qué forma normal viola y cómo la corregirías.',
      'Explica por qué la tabla film_actor de Sakila está en 3FN. ¿Qué columnas tiene? ¿De qué dependen?',
      'Describe la diferencia entre un índice B-Tree y un índice HASH en términos de casos de uso. ¿Para qué tipo de consulta elegirías cada uno?',
      'Diseña el esquema normalizado (hasta 3FN) para una tabla que almacene: empleado, departamento, ciudad de la sede del departamento y salario del empleado.',
    ],

    checklist: [
      { text: 'Entiendo qué es un índice y por qué evita que MySQL escanee toda la tabla.' },
      { text: 'Conozco los tres tipos de índice (B-Tree, HASH, Full Text) y sé cuándo aplicar cada uno.' },
      { text: 'Sé crear un índice simple y un índice compuesto con CREATE INDEX.' },
      { text: 'Sé usar EXPLAIN ANALYZE para medir el impacto de un índice en el tiempo de consulta.' },
      { text: 'Entiendo qué es la normalización y cuáles son los tres problemas que resuelve (inserción, actualización, eliminación).' },
      { text: 'Puedo identificar si una tabla viola la 1FN (valores no atómicos o grupos repetidos).' },
      { text: 'Puedo identificar si una tabla viola la 2FN (dependencia parcial de clave compuesta).' },
      { text: 'Puedo identificar si una tabla viola la 3FN (dependencia transitiva entre no-claves).' },
    ],
  },

  {
    id: '07b', slug: '07b-optimizacion-ejercicios',
    title: 'Optimización y buenas prácticas — Ejercicios',
    topic: 'Optimización y Buenas Prácticas', topicNumber: '07', classNumber: '07b',
    type: 'exercise', status: 'pending', contentStatus: 'completed', difficulty: 3, estimatedTime: '40 min',
    tags: ['EXPLAIN ANALYZE', 'B-Tree', 'Full Text', 'Índice compuesto', 'Sakila', 'Performance'],

    summary: 'Cuatro ejercicios prácticos que muestran el impacto real de los índices usando EXPLAIN ANALYZE en Sakila. Cada ejercicio parte de una consulta sin optimizar, mide su coste, crea el índice adecuado y vuelve a medir para ver la mejora. Los tiempos reales ilustran por qué los índices son imprescindibles en bases de datos con volumen.',

    keyConcepts: [
      {
        term: 'EXPLAIN ANALYZE',
        definition: 'Herramienta de diagnóstico que ejecuta la consulta y devuelve el plan real de ejecución con tiempos medidos. Permite ver cuántas filas escanea MySQL, qué índices usa y cuánto tarda cada paso. Es el equivalente a un profiler o debugger para consultas SQL.',
      },
      {
        term: 'Full table scan',
        definition: 'Lectura secuencial de todas las filas de una tabla para encontrar las que cumplen la condición WHERE. Es el comportamiento por defecto cuando no existe ningún índice útil. En tablas con millones de filas, un full scan puede tardar segundos o minutos.',
      },
      {
        term: 'Index scan',
        definition: 'Lectura del índice para localizar directamente las filas que cumplen la condición, sin recorrer la tabla entera. Es el resultado de tener un índice adecuado para la consulta. Típicamente entre 10× y 100× más rápido que un full scan en tablas grandes.',
      },
      {
        term: 'Índice compuesto',
        definition: 'Índice que cubre más de una columna. MySQL lo aprovecha cuando la consulta filtra por las primeras columnas del índice, en el mismo orden en que fueron declaradas. Es más eficiente que varios índices separados cuando las columnas siempre se usan juntas en las consultas.',
      },
      {
        term: 'MATCH...AGAINST con IN BOOLEAN MODE',
        definition: 'Sintaxis para consultas Full Text que permite operadores de inclusión (+), exclusión (-) y prefijo (*). Usa el índice Full Text para resolver la búsqueda en milisegundos, a diferencia de LIKE que fuerza un full scan.',
      },
      {
        term: 'Coste de la consulta (query cost)',
        definition: 'Estimación interna de MySQL de cuánto trabajo requiere resolver una consulta, medida en unidades arbitrarias. EXPLAIN ANALYZE lo muestra junto al tiempo real. Un coste alto con LIKE puede convertirse en un coste mínimo tras crear el índice correcto.',
      },
    ],

    contenido: [
      {
        heading: 'El entorno de práctica: Sakila y EXPLAIN ANALYZE',
        blocks: [
          {
            type: 'p',
            text: 'Estos ejercicios usan la base de datos Sakila porque tiene más datos que World y permite apreciar mejor las diferencias de rendimiento entre consultas con y sin índice. En bases de datos pequeñas (cientos de filas), la diferencia puede ser imperceptible aunque el índice sea correcto.',
          },
          {
            type: 'p',
            text: 'El comando EXPLAIN ANALYZE es el hilo conductor de todos los ejercicios. Anteponiéndolo a cualquier consulta, MySQL ejecuta la consulta y devuelve un informe detallado: qué operaciones hizo, cuántas filas procesó y cuánto tardó cada paso. Es la herramienta que convierte la optimización de arte en ciencia.',
          },
          {
            type: 'callout',
            variant: 'warn',
            title: 'EXPLAIN ANALYZE ejecuta la consulta realmente',
            text: 'A diferencia de EXPLAIN (sin ANALYZE), que solo muestra el plan estimado, EXPLAIN ANALYZE ejecuta la consulta. En tablas de producción con datos sensibles o en consultas con modificaciones (INSERT, UPDATE), usa EXPLAIN solo para no alterar datos.',
          },
        ],
      },
      {
        heading: 'Ejercicio 1 — B-Tree compuesto: películas por año y duración',
        blocks: [
          {
            type: 'p',
            text: 'La consulta filtra películas del año 2006 con duración entre 120 y 180 minutos. Sin índice, MySQL lee las 1000 filas de la tabla film para encontrar las que cumplen ambas condiciones. El EXPLAIN ANALYZE muestra un full scan con un coste proporcional al número de filas.',
          },
          {
            type: 'p',
            text: 'Creando un índice B-Tree compuesto sobre (release_year, length), MySQL puede saltar directamente al año 2006 dentro del árbol y luego recorrer solo el rango de duraciones entre 120 y 180. El EXPLAIN ANALYZE posterior muestra el salto al índice y un tiempo notablemente menor.',
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'El índice compuesto sigue el orden del WHERE',
            text: 'El índice (release_year, length) funciona para consultas que filtran por release_year solo, o por release_year y length juntos. No funciona para consultas que filtran solo por length. Declara primero la columna que aparece en el filtro de igualdad (=) y después la de rango (BETWEEN).',
          },
        ],
      },
      {
        heading: 'Ejercicio 2 — B-Tree para búsqueda exacta por email',
        blocks: [
          {
            type: 'p',
            text: 'La búsqueda de un cliente por su email es la operación más frecuente en sistemas de login. Sin índice, MySQL recorre toda la tabla customer buscando la fila cuyo email coincide exactamente. Con EXPLAIN ANALYZE se puede medir el tiempo antes de la optimización (en el entorno de práctica, alrededor de 0.12 segundos).',
          },
          {
            type: 'p',
            text: 'Aunque el índice ideal para igualdades exactas sería HASH, MySQL 8 con el motor InnoDB no soporta índices HASH en tablas de disco. El índice B-Tree sobre la columna email resuelve el mismo problema con una mejora significativa: el tiempo baja a 0.02 segundos, porque el árbol binario localiza el email exacto en O(log n) pasos en lugar de O(n).',
          },
          {
            type: 'callout',
            variant: 'note',
            title: 'HASH en MySQL: disponible en MEMORY, no en InnoDB',
            text: 'Los índices HASH están disponibles en MySQL para tablas del motor MEMORY (datos en RAM, volátiles). En InnoDB (el motor estándar para datos persistentes) solo existe B-Tree. PostgreSQL sí soporta índices HASH en tablas de disco, por lo que el tipo de índice correcto depende siempre del motor de base de datos.',
          },
        ],
      },
      {
        heading: 'Ejercicio 3 — Full Text: búsqueda semántica en descripciones',
        blocks: [
          {
            type: 'p',
            text: 'Buscar películas cuya descripción mencione ciertas palabras con LIKE fuerza un full scan y no puede aprovecharse de ningún índice estándar. Intentar usar MATCH...AGAINST sin el índice Full Text produce directamente un error de MySQL: "Can\'t find FULLTEXT index matching the column list".',
          },
          {
            type: 'p',
            text: 'Creando el índice Full Text sobre la columna description, la misma búsqueda se resuelve en 0.03 segundos. El modo IN BOOLEAN MODE permite combinar palabras con operadores: +drama obliga a que la descripción contenga "drama"; +feminist obliga a "feminist"; -action excluiría las que contengan "action".',
          },
          {
            type: 'p',
            text: 'El índice Full Text también es más inteligente que LIKE en otro aspecto: ignora automáticamente las palabras muy frecuentes (el, la, un, the, a, of) que no aportan valor discriminativo, y puede manejar variantes morfológicas dependiendo de la configuración.',
          },
        ],
      },
      {
        heading: 'Ejercicio 4 — Índice compuesto: alquileres activos por cliente',
        blocks: [
          {
            type: 'p',
            text: 'La consulta busca los alquileres activos (return_date IS NULL) de un cliente específico, ordenados por fecha. Sin índice, MySQL recorre toda la tabla rental (que puede tener miles de filas), filtra los del cliente, filtra los no devueltos y luego ordena el resultado. El EXPLAIN ANALYZE muestra un coste de aproximadamente 5 segundos en este entorno.',
          },
          {
            type: 'p',
            text: 'El índice compuesto (customer_id, rental_date) permite a MySQL saltar directamente a los alquileres de ese cliente y encontrarlos ya ordenados por fecha, sin necesidad de ordenarlos en una segunda pasada. El tiempo baja a 0.04 segundos: una mejora de más de 100 veces.',
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'El índice compuesto elimina el ORDER BY costoso',
            text: 'Cuando el ORDER BY usa las mismas columnas que el final del índice compuesto, MySQL puede devolver los resultados directamente en el orden del índice sin necesidad de un paso de ordenación adicional. Eso explica por qué el (customer_id, rental_date) es especialmente eficiente para esta consulta.',
          },
        ],
      },
      {
        heading: 'Normalización en Sakila: un esquema ya optimizado',
        blocks: [
          {
            type: 'p',
            text: 'Sakila ya está normalizada hasta 3FN, lo que la hace un buen ejemplo de referencia. En la tabla actor, first_name y last_name dependen directamente de actor_id (clave primaria). En la tabla category, last_update depende de category_id, no de name. No hay dependencias transitivas ni grupos repetidos.',
          },
          {
            type: 'p',
            text: 'La normalización en la práctica no es algo que se aplica sobre una base de datos existente: se diseña desde el principio al modelar el esquema. Por eso, la parte más importante de la 3FN no es corregirla en Sakila, sino identificar estas violaciones antes de crear las tablas en proyectos propios.',
          },
        ],
      },
    ],

    codeExamples: [
      {
        label: 'Ejercicio 1: B-Tree compuesto por año y duración',
        lang: 'sql',
        code: `USE sakila;

-- Paso 1: medir el rendimiento SIN índice
EXPLAIN ANALYZE
SELECT title, release_year, length
FROM film
WHERE release_year = 2006
  AND length BETWEEN 120 AND 180;
-- Resultado: full scan de las 1000 filas de film

-- Paso 2: crear el índice B-Tree compuesto
CREATE INDEX idx_film_year_length ON film (release_year, length);

-- Paso 3: medir el rendimiento CON índice
EXPLAIN ANALYZE
SELECT title, release_year, length
FROM film
WHERE release_year = 2006
  AND length BETWEEN 120 AND 180;
-- Resultado: index scan directo al rango, mucho menos filas procesadas`,
        note: 'Compara el campo "rows" en ambas salidas de EXPLAIN ANALYZE: la diferencia muestra cuántas filas dejó de procesar MySQL gracias al índice. En Sakila con 1000 películas la mejora es perceptible; en una tabla de millones de registros sería espectacular.',
      },
      {
        label: 'Ejercicio 2: índice para búsqueda exacta de email',
        lang: 'sql',
        code: `-- Paso 1: consulta de login SIN índice
EXPLAIN ANALYZE
SELECT *
FROM customer
WHERE email = 'KATHLEEN.ADAMS@sakilacustomer.org';
-- Tiempo aproximado: ~0.12 segundos (full scan de customer)

-- Paso 2: crear el índice (MySQL 8 InnoDB usa B-Tree aunque especifiques HASH)
CREATE INDEX idx_customer_email ON customer (email);

-- Paso 3: misma consulta CON índice
EXPLAIN ANALYZE
SELECT *
FROM customer
WHERE email = 'KATHLEEN.ADAMS@sakilacustomer.org';
-- Tiempo aproximado: ~0.02 segundos (salto directo por índice)

-- Ver todos los índices de customer
SHOW INDEX FROM customer;`,
        note: 'La reducción de 0.12 a 0.02 segundos puede parecer pequeña, pero en una aplicación con 1000 logins simultáneos la diferencia entre 0.12s y 0.02s por petición es la diferencia entre un servidor saturado y uno con margen.',
      },
      {
        label: 'Ejercicio 3: Full Text para búsqueda semántica',
        lang: 'sql',
        code: `-- Sin índice Full Text, MATCH...AGAINST falla con error
-- ERROR: Can't find FULLTEXT index matching the column list
SELECT title FROM film
WHERE MATCH(description) AGAINST('+drama +feminist' IN BOOLEAN MODE);

-- Crear el índice Full Text
CREATE FULLTEXT INDEX idx_film_description ON film (description);

-- Ahora funciona: películas de drama con temática feminista
EXPLAIN ANALYZE
SELECT title, description
FROM film
WHERE MATCH(description) AGAINST('+drama +feminist' IN BOOLEAN MODE);
-- Tiempo: ~0.03 segundos usando el índice Full Text

-- Drama pero sin acción
SELECT title
FROM film
WHERE MATCH(description) AGAINST('+drama -action' IN BOOLEAN MODE);`,
        note: 'El operador + hace que la palabra sea obligatoria. El operador - la excluye. Sin operadores, MySQL usa relevancia natural y puede ignorar palabras que aparecen en demasiados documentos. IN BOOLEAN MODE da control explícito sobre cada término.',
      },
      {
        label: 'Ejercicio 4: índice compuesto para alquileres activos',
        lang: 'sql',
        code: `-- Paso 1: consulta SIN índice (~5 segundos, full scan de rental)
EXPLAIN ANALYZE
SELECT rental_id, rental_date, inventory_id
FROM rental
WHERE customer_id = 459
  AND return_date IS NULL
ORDER BY rental_date DESC;

-- Paso 2: crear el índice compuesto
-- customer_id primero (filtro de igualdad), rental_date segundo (para el ORDER BY)
CREATE INDEX idx_rental_customer_date ON rental (customer_id, rental_date);

-- Paso 3: misma consulta CON índice (~0.04 segundos)
EXPLAIN ANALYZE
SELECT rental_id, rental_date, inventory_id
FROM rental
WHERE customer_id = 459
  AND return_date IS NULL
ORDER BY rental_date DESC;

-- Eliminar índices de práctica para no interferir con la tabla
DROP INDEX idx_film_year_length    ON film;
DROP INDEX idx_film_description    ON film;
DROP INDEX idx_rental_customer_date ON rental;`,
        note: 'El índice (customer_id, rental_date) elimina dos costes: el filtrado fila a fila por customer_id y la ordenación posterior por fecha. MySQL aprovecha el orden ya implícito en el índice para el ORDER BY, sin necesidad de un paso de sorting adicional.',
      },
    ],

    errores: [
      'Crear el índice compuesto con las columnas en el orden equivocado. Un índice (rental_date, customer_id) no ayuda a consultas que filtran por customer_id sin rental_date, porque MySQL no puede usar la segunda columna del índice sin usar la primera.',
      'Olvidar recrear los índices después de truncar o restaurar una tabla. Los índices se asocian a la tabla: si la tabla se vacía y se repuebla desde cero (por ejemplo, en migraciones), los índices siguen existiendo pero hay que verificar que siguen siendo relevantes.',
      'Interpretar el tiempo de EXPLAIN ANALYZE como el tiempo de producción. El tiempo medido en un entorno local con pocos datos es diferente al tiempo en producción. EXPLAIN ANALYZE sirve para comparar antes y después del índice, no para predecir tiempos absolutos.',
      'Usar MATCH...AGAINST sin el índice Full Text y no entender el error. "Can\'t find FULLTEXT index matching the column list" significa que falta el índice, no que la sintaxis esté mal.',
      'Asumir que añadir más índices siempre mejora el rendimiento de SELECT. Cada índice adicional aumenta el tiempo de INSERT, UPDATE y DELETE porque MySQL debe mantener todos los índices actualizados.',
    ],

    practicas: [
      'Siempre mide el rendimiento antes de crear el índice con EXPLAIN ANALYZE. Sin una línea de base, no puedes saber si el índice mejoró algo.',
      'Usa SHOW INDEX FROM tabla para revisar qué índices ya existen antes de crear nuevos. MySQL crea automáticamente un índice para PRIMARY KEY y UNIQUE; puede que el índice que necesitas ya esté ahí.',
      'Al terminar los ejercicios de práctica, elimina los índices creados con DROP INDEX si no forman parte del esquema definitivo. Los índices de prueba acumulados pueden ralentizar las escrituras sin ningún beneficio real.',
      'Lee el output de EXPLAIN ANALYZE de dentro hacia fuera: los pasos más internos (con más indentación) se ejecutan primero. Identifica cuál es el paso más costoso (mayor "actual time") y enfoca la optimización ahí.',
      'Cuando una consulta usa JOINs, los índices más valiosos son los de las columnas que aparecen en las condiciones ON del JOIN. Sin ellos, MySQL puede hacer full scans de las tablas unidas.',
    ],

    ejercicios: [
      'Usa EXPLAIN ANALYZE sobre SELECT * FROM film WHERE rating = \'PG\'. Anota el número de filas procesadas. Crea un índice sobre rating y repite. ¿Cuántas filas procesa ahora?',
      'Crea un índice Full Text sobre el campo title de la tabla film. Escribe una consulta MATCH...AGAINST que encuentre películas con "love" en el título pero sin "war".',
      'Usa EXPLAIN ANALYZE sobre una consulta con JOIN entre film y film_category usando film_id. ¿MySQL usa el índice de film_id? ¿Por qué?',
      'Diseña y crea un índice compuesto para optimizar esta consulta: SELECT * FROM payment WHERE customer_id = 5 ORDER BY payment_date DESC LIMIT 10. Mide el tiempo antes y después con EXPLAIN ANALYZE.',
      'Usa SHOW INDEX FROM rental para ver todos los índices existentes. Identifica cuáles fueron creados automáticamente por MySQL y cuáles por los ejercicios. Elimina los de práctica con DROP INDEX.',
    ],

    checklist: [
      { text: 'Sé usar EXPLAIN ANALYZE para medir el rendimiento de una consulta antes y después de crear un índice.' },
      { text: 'Puedo crear índices B-Tree simples y compuestos con CREATE INDEX.' },
      { text: 'Entiendo por qué MySQL 8 con InnoDB no soporta índices HASH y cómo suplirlo con B-Tree.' },
      { text: 'Sé crear un índice Full Text y usar MATCH...AGAINST con IN BOOLEAN MODE.' },
      { text: 'Conozco los operadores de búsqueda booleana: + (incluir), - (excluir).' },
      { text: 'Entiendo que los índices mejoran las lecturas pero añaden coste a las escrituras.' },
      { text: 'Sé ver los índices de una tabla con SHOW INDEX y eliminarlos con DROP INDEX.' },
      { text: 'Puedo identificar si una tabla de Sakila cumple las tres formas normales y explicar por qué.' },
    ],
  },

];
