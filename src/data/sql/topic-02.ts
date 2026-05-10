import type { RawLesson } from './types';

export const topic02: RawLesson[] = [
  {
    id: '02', slug: '02-creacion-manipulacion-tablas',
    title: 'Creación y manipulación de tablas en SQL',
    topic: 'Creación y manipulación de Tablas', topicNumber: '02', classNumber: '02',
    type: 'exercise', status: 'pending', contentStatus: 'completed', difficulty: 2, estimatedTime: '55 min',
    tags: ['CREATE DATABASE', 'CREATE TABLE', 'INSERT INTO', 'SELECT', 'Tipos de datos'],

    summary: 'Primera toma de contacto real con código SQL: crear una base de datos, definir tablas con columnas tipadas y restricciones, e insertar y consultar los primeros registros. Todo construido sobre un sistema de películas que sirve de hilo conductor.',

    keyConcepts: [
      {
        term: 'CREATE DATABASE',
        definition: 'Comando DDL para crear una nueva base de datos. Se combina con IF NOT EXISTS para evitar errores si ya existe.',
      },
      {
        term: 'USE',
        definition: 'Selecciona la base de datos activa. Todos los comandos siguientes (CREATE TABLE, INSERT…) se ejecutan sobre esa base de datos hasta que se cambie con otro USE.',
      },
      {
        term: 'CREATE TABLE',
        definition: 'Define una nueva tabla especificando el nombre de cada columna, su tipo de dato y las restricciones que debe cumplir.',
      },
      {
        term: 'INT / INTEGER',
        definition: 'Tipo de dato para números enteros. Se usa habitualmente para identificadores (id), cantidades y contadores.',
      },
      {
        term: 'VARCHAR(n)',
        definition: 'Tipo de dato para texto de longitud variable, con un máximo de n caracteres. Si el texto supera ese límite, MySQL devuelve un error.',
      },
      {
        term: 'YEAR',
        definition: 'Tipo de dato específico para años en formato de 4 dígitos (YYYY). No necesita comillas al insertarse a diferencia de VARCHAR.',
      },
      {
        term: 'PRIMARY KEY',
        definition: 'Restricción que identifica de forma única cada fila de la tabla. No puede repetirse ni ser nulo. Habitualmente se asigna al campo id.',
      },
      {
        term: 'NOT NULL',
        definition: 'Restricción que obliga a que el campo siempre tenga un valor. Si se intenta insertar una fila sin ese dato, MySQL lanza un error.',
      },
      {
        term: 'AUTO_INCREMENT',
        definition: 'Genera automáticamente un valor incremental cada vez que se inserta una fila. Se usa casi siempre en el campo id para no tener que gestionarlo manualmente.',
      },
      {
        term: 'INSERT INTO',
        definition: 'Comando DML para insertar una o varias filas en una tabla. Se especifican las columnas destino y los valores correspondientes.',
      },
      {
        term: 'SELECT',
        definition: 'Comando DQL para consultar y visualizar datos de una tabla. SELECT * FROM tabla devuelve todas las filas y todas las columnas.',
      },
      {
        term: 'Índice (INDEX)',
        definition: 'Estructura interna que MySQL usa para localizar filas rápidamente. El PRIMARY KEY crea automáticamente un índice primario. Pueden añadirse índices secundarios sobre otros campos únicos.',
      },
    ],

    contenido: [
      {
        heading: 'El orden de trabajo: base de datos → tablas → registros',
        blocks: [
          {
            type: 'p',
            text: 'Antes de poder consultar nada, los datos tienen que existir. Y para que existan, hay que seguir un orden concreto: primero se crea el contenedor (la base de datos), luego la estructura donde van los datos (las tablas), y por último se insertan los registros.',
          },
          {
            type: 'ol',
            items: [
              'Crear la base de datos con CREATE DATABASE.',
              'Seleccionarla con USE para que los comandos siguientes apunten a ella.',
              'Definir las tablas con CREATE TABLE, columna a columna.',
              'Insertar filas con INSERT INTO.',
              'Verificar el resultado con SELECT.',
            ],
          },
          {
            type: 'p',
            text: 'Saltarse el orden o mezclar pasos es el error más frecuente al empezar. MySQL ejecuta los comandos en secuencia y cada paso depende del anterior.',
          },
        ],
      },
      {
        heading: 'Crear y activar una base de datos',
        blocks: [
          {
            type: 'p',
            text: 'CREATE DATABASE crea la base de datos. La variante con IF NOT EXISTS añade una comprobación previa: si ya existe una base de datos con ese nombre, el comando no hace nada en lugar de devolver un error.',
          },
          {
            type: 'p',
            text: 'Crear la base de datos no significa estar trabajando en ella. MySQL puede tener muchas bases de datos abiertas y necesita saber en cuál ejecutar cada operación. El comando USE lo resuelve: a partir de ese punto, todo lo que se escriba afecta a esa base de datos.',
          },
          {
            type: 'callout',
            variant: 'warn',
            title: 'El punto y coma no es opcional',
            text: 'SQL no entiende de saltos de línea. El fin de un comando se marca con punto y coma (;). Sin él, MySQL sigue leyendo y acumula todo como si fuera un único comando, lo que produce errores difíciles de diagnosticar.',
          },
        ],
      },
      {
        heading: 'Definir una tabla: columnas, tipos y restricciones',
        blocks: [
          {
            type: 'p',
            text: 'CREATE TABLE requiere que cada columna se defina con tres elementos: el nombre, el tipo de dato que puede almacenar y las restricciones que debe cumplir. Si alguno de estos elementos no encaja con el dato que se intenta insertar, MySQL lo rechaza.',
          },
          {
            type: 'ul',
            items: [
              'Nombre: identifica la columna dentro de la tabla.',
              'Tipo de dato: define qué clase de valores acepta (número, texto, fecha…).',
              'Restricciones: reglas adicionales como que el valor sea obligatorio, único o autogenerado.',
            ],
          },
          {
            type: 'p',
            text: 'La combinación de tipo + restricciones es lo que garantiza la integridad de los datos. Una columna mal tipada o sin las restricciones adecuadas permitirá guardar datos incorrectos sin avisar.',
          },
        ],
      },
      {
        heading: 'Tipos de datos más comunes',
        blocks: [
          {
            type: 'table',
            headers: ['Tipo', 'Para qué sirve', 'Ejemplo de uso'],
            rows: [
              ['INT', 'Números enteros', 'id, stock, edad'],
              ['VARCHAR(n)', 'Texto de longitud variable, máximo n caracteres', 'nombre, email, dirección'],
              ['YEAR', 'Año en formato YYYY (4 dígitos)', 'año de lanzamiento, año de nacimiento'],
              ['DATE', 'Fecha completa en formato YYYY-MM-DD', 'fecha de registro, fecha de entrega'],
              ['DECIMAL(p,s)', 'Número con decimales precisos (p dígitos, s decimales)', 'precio, salario, puntuación'],
              ['BOOLEAN', 'Verdadero o falso (almacenado como 1 o 0)', 'activo, verificado, publicado'],
            ],
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'YEAR no necesita comillas',
            text: 'A diferencia de VARCHAR, el tipo YEAR no es texto. Al insertar un año (por ejemplo 1998), se escribe sin comillas. Si se pone entre comillas MySQL lo acepta pero convierte el valor internamente, lo que puede llevar a confusión.',
          },
        ],
      },
      {
        heading: 'Restricciones fundamentales',
        blocks: [
          {
            type: 'p',
            text: 'Las restricciones son reglas que MySQL aplica automáticamente al insertar o modificar datos. No son opcionales en tablas bien diseñadas: sin ellas, cualquier dato —correcto o incorrecto— entra sin filtro.',
          },
          {
            type: 'ul',
            items: [
              'PRIMARY KEY: identifica de forma única cada fila. Funciona como el DNI de cada registro: no puede repetirse ni estar vacío. Casi siempre se asigna al campo id.',
              'NOT NULL: obliga a que el campo tenga siempre un valor. Si el dato es imprescindible para que el registro tenga sentido (nombre, email), debe ser NOT NULL.',
              'AUTO_INCREMENT: delega en MySQL la generación del valor. Cada vez que se inserta una fila, el motor asigna el siguiente número disponible. El primer registro obtiene 1, el segundo 2, y así sucesivamente. No hace falta —ni se debe— rellenar ese campo manualmente.',
            ],
          },
          {
            type: 'callout',
            variant: 'note',
            title: 'La combinación id INT AUTO_INCREMENT PRIMARY KEY',
            text: 'Esta combinación es el estándar de facto para identificadores en MySQL. INT garantiza un rango amplio de valores, AUTO_INCREMENT evita gestión manual, y PRIMARY KEY asegura unicidad e indexado automático.',
          },
        ],
      },
      {
        heading: 'Insertar registros con INSERT INTO',
        blocks: [
          {
            type: 'p',
            text: 'INSERT INTO especifica en qué tabla se inserta y qué columnas se van a rellenar. A continuación, VALUES proporciona los datos en el mismo orden en que se declararon las columnas.',
          },
          {
            type: 'ul',
            items: [
              'Los campos AUTO_INCREMENT (como id) no se incluyen: MySQL los genera solo.',
              'Los valores de tipo texto (VARCHAR) van entre comillas simples o dobles.',
              'Los valores numéricos y de tipo YEAR no llevan comillas.',
              'El orden de los valores en VALUES debe coincidir exactamente con el orden de las columnas declaradas.',
            ],
          },
        ],
      },
      {
        heading: 'Consultar datos con SELECT',
        blocks: [
          {
            type: 'p',
            text: 'SELECT * FROM nombre_tabla devuelve todas las filas y todas las columnas de la tabla. Es la forma más rápida de verificar que los datos se han insertado correctamente.',
          },
          {
            type: 'p',
            text: 'El asterisco (*) es un comodín que significa "todas las columnas". En clases posteriores se verá cómo seleccionar columnas concretas, filtrar por condiciones y ordenar los resultados.',
          },
        ],
      },
      {
        heading: 'Índices: cómo MySQL localiza los datos',
        blocks: [
          {
            type: 'p',
            text: 'Un índice es una estructura interna que MySQL crea para encontrar filas rápidamente sin tener que recorrer la tabla entera. Al declarar PRIMARY KEY, se crea automáticamente un índice primario sobre ese campo.',
          },
          {
            type: 'p',
            text: 'También se pueden crear índices secundarios sobre otros campos que se usen frecuentemente para buscar. Por ejemplo, si además del id se va a buscar usuarios por su número de seguro social (que también es único), tiene sentido indexar ese campo. Así MySQL puede resolver la consulta en milisegundos en lugar de revisar fila a fila.',
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'Busca siempre por el campo indexado',
            text: 'El id es único y está indexado: ideal para búsquedas. El nombre o el email pueden repetirse y no están indexados por defecto. Usar campos no indexados para buscar en tablas grandes es lento.',
          },
        ],
      },
    ],

    codeExamples: [
      {
        label: 'Crear la base de datos y activarla',
        lang: 'sql',
        code: `-- IF NOT EXISTS evita el error si ya existe
CREATE DATABASE IF NOT EXISTS sistema_peliculas;

-- Activar la base de datos para los comandos siguientes
USE sistema_peliculas;`,
        note: 'Después de USE, el nombre de la base de datos aparece en negrita en Workbench. Eso confirma que es la activa. Sin este paso, los CREATE TABLE irían a la base de datos que estuviera seleccionada antes.',
      },
      {
        label: 'Crear las tablas: usuarios y peliculas',
        lang: 'sql',
        code: `CREATE TABLE usuarios (
  id     INT          AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email  VARCHAR(150) NOT NULL
);

CREATE TABLE peliculas (
  id     INT          AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  anio   YEAR         NOT NULL
);`,
        note: 'El campo id no se rellena al insertar: AUTO_INCREMENT se encarga. NOT NULL en nombre, email y titulo obliga a que esos campos existan siempre. YEAR acepta valores de 4 dígitos sin comillas.',
      },
      {
        label: 'Insertar registros en ambas tablas',
        lang: 'sql',
        code: `-- Usuarios: no se incluye el campo id
INSERT INTO usuarios (nombre, email) VALUES
  ('Carlos',  'carlos@gmail.com'),
  ('Maria',   'maria@gmail.com'),
  ('Juan',    'juan@gmail.com'),
  ('Gerardo', 'gerardo@gmail.com');

-- Películas: el año es YEAR, sin comillas
INSERT INTO peliculas (titulo, anio) VALUES
  ('Titanic',      1998),
  ('Interstellar', 2014),
  ('Mario Bros',   2024);`,
        note: 'Se pueden insertar varias filas en un mismo INSERT INTO separando cada conjunto de valores con coma. MySQL asigna los ids 1, 2, 3… automáticamente.',
      },
      {
        label: 'Consultar el resultado con SELECT',
        lang: 'sql',
        code: `-- Ver toda la tabla de usuarios
SELECT * FROM usuarios;

-- Ver toda la tabla de películas
SELECT * FROM peliculas;`,
        note: 'SELECT * FROM devuelve todas las filas y columnas. En la columna id se comprueba que los valores se han generado solos: 1, 2, 3, 4 en usuarios y 1, 2, 3 en películas.',
      },
    ],

    errores: [
      'Olvidar el punto y coma al final de cada comando. SQL no interpreta los saltos de línea como fin de instrucción, así que sin punto y coma encadena todo hasta encontrar uno, produciendo un error incomprensible.',
      'No ejecutar USE antes de crear tablas. Si no se selecciona la base de datos correcta, las tablas se crean en otra o MySQL devuelve "No database selected".',
      'Incluir el campo id en el INSERT INTO cuando es AUTO_INCREMENT. MySQL lo gestiona solo; forzarlo manualmente puede romper la secuencia o provocar duplicados.',
      'Poner comillas en valores YEAR (por ejemplo, \'1998\'). Aunque MySQL a veces lo acepta, lo convierte internamente de forma ambigua. Los valores numéricos y de año van sin comillas.',
      'Declarar VARCHAR sin tamaño (VARCHAR sin paréntesis). La sintaxis correcta es siempre VARCHAR(n) con el número máximo de caracteres.',
    ],

    practicas: [
      'Usa siempre IF NOT EXISTS en CREATE DATABASE para que el script sea repetible sin errores aunque ya exista la base de datos.',
      'Ejecuta USE justo después de CREATE DATABASE, en el mismo script, para garantizar que todo lo que sigue apunta a la base correcta.',
      'Define id como INT AUTO_INCREMENT PRIMARY KEY en todas las tablas. Es la convención estándar y te ahorra problemas de unicidad y gestión manual de identificadores.',
      'Asigna NOT NULL a todos los campos que el registro no puede tener vacíos. Si un campo es opcional, puedes omitirlo (NULL por defecto) o marcarlo explícitamente como NULL.',
      'Ajusta el tamaño de VARCHAR al contenido real: nombres a 100, emails a 150, descripciones largas a 500 o más. Un tamaño demasiado pequeño rechazará datos válidos; uno demasiado grande desperdicia espacio.',
      'Verifica siempre con SELECT * FROM después de cada INSERT INTO. Es la forma más rápida de confirmar que los datos están bien antes de seguir.',
    ],

    ejercicios: [
      'Crea una base de datos llamada tienda con IF NOT EXISTS y selecciónala con USE.',
      'Dentro de tienda, crea una tabla productos con las columnas: id (INT, AUTO_INCREMENT, PRIMARY KEY), nombre (VARCHAR(100), NOT NULL), precio (DECIMAL(8,2), NOT NULL) y stock (INT, NOT NULL).',
      'Inserta al menos 5 productos con diferentes precios y cantidades de stock.',
      'Ejecuta SELECT * FROM productos para verificar que los datos se han insertado correctamente y que el id se ha generado automáticamente.',
      'Crea una segunda tabla clientes con id, nombre y email (ambos NOT NULL). Inserta 3 clientes y vuelve a verificar con SELECT.',
      'Investiga qué ocurre si intentas insertar un usuario sin rellenar un campo marcado como NOT NULL. Observa el mensaje de error que devuelve MySQL.',
    ],

    checklist: [
      { text: 'Entiendo el orden correcto: crear la base de datos, luego las tablas, luego insertar datos.' },
      { text: 'Sé escribir CREATE DATABASE IF NOT EXISTS y USE para activar la base de datos.' },
      { text: 'Puedo definir columnas con nombre, tipo de dato y restricciones (PRIMARY KEY, NOT NULL, AUTO_INCREMENT).' },
      { text: 'Conozco cuándo usar INT, VARCHAR(n) y YEAR, y sé que YEAR no necesita comillas.' },
      { text: 'Entiendo que el campo AUTO_INCREMENT no se incluye en el INSERT INTO.' },
      { text: 'Puedo insertar varias filas en un solo INSERT INTO separando los valores con coma.' },
      { text: 'Sé usar SELECT * FROM para visualizar todos los datos de una tabla.' },
      { text: 'Entiendo qué es un índice y por qué el PRIMARY KEY crea uno automáticamente.' },
    ],
  },
];
