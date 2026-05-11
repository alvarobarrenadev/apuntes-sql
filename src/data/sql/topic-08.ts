import type { RawLesson } from './types';

export const topic08: RawLesson[] = [
  {
    id: '08', slug: 'proyecto-final',
    title: 'Proyecto final: Sistema de gestión de biblioteca',
    topic: 'Proyecto Final', topicNumber: '08', classNumber: '08',
    type: 'project', status: 'pending', contentStatus: 'completed', difficulty: 3, estimatedTime: '90 min',
    tags: ['CREATE TABLE', 'FOREIGN KEY', 'INSERT INTO', 'SELECT', 'JOIN', 'UPDATE', 'INDEX', 'CHECK', 'UNIQUE', 'BOOLEAN'],

    summary: 'Proyecto integrador que construye desde cero un sistema de gestión de biblioteca con tres tablas relacionadas. Se aplican en conjunto todos los conceptos del módulo: diseño normalizado, restricciones, inserciones, consultas con filtros, JOINs para cruzar tablas e índices de optimización.',

    keyConcepts: [
      {
        term: 'CHECK',
        definition: 'Restricción que valida que el valor de una columna cumpla una condición lógica antes de insertarse. Si la condición es falsa, MySQL rechaza la fila. Ejemplo: CHECK (anio > 1800) garantiza que no se inserten años inválidos.',
      },
      {
        term: 'UNIQUE',
        definition: 'Restricción que prohíbe valores duplicados en una columna. A diferencia de PRIMARY KEY, permite un único valor NULL. Se usa habitualmente en campos como email o número de documento que deben ser irrepetibles pero no son la clave principal.',
      },
      {
        term: 'BOOLEAN',
        definition: 'Tipo de dato que almacena verdadero (1 / true) o falso (0 / false). En MySQL es un alias de TINYINT(1). Se usa para estados binarios como disponible, activo o publicado.',
      },
      {
        term: 'DEFAULT',
        definition: 'Valor que MySQL asigna automáticamente a una columna cuando el INSERT no lo especifica. Puede ser un literal (DEFAULT TRUE, DEFAULT 0) o una función (DEFAULT CURRENT_DATE). Evita tener que repetir el valor en cada inserción.',
      },
      {
        term: 'CURRENT_DATE',
        definition: 'Función de MySQL que devuelve la fecha actual del servidor (sin hora). Al usarla como DEFAULT, la columna fecha_prestamo se rellena automáticamente con el día en que se ejecuta el INSERT.',
      },
      {
        term: 'FOREIGN KEY … REFERENCES',
        definition: 'Restricción de integridad referencial que vincula una columna de una tabla con la clave primaria de otra. MySQL impide insertar un valor que no exista en la tabla referenciada y, según la política ON DELETE / ON UPDATE, gestiona los cambios en cascada.',
      },
      {
        term: 'DATEDIFF',
        definition: 'Función que calcula la diferencia en días entre dos fechas: DATEDIFF(fecha_fin, fecha_inicio). Útil para saber cuántos días lleva activo un préstamo: DATEDIFF(CURRENT_DATE, fecha_prestamo).',
      },
      {
        term: 'UPDATE … SET … WHERE',
        definition: 'Comando DML para modificar valores existentes en una o varias filas. El WHERE limita qué filas se actualizan; sin él, se modifican todas. Puede combinarse con IN para afectar a un subconjunto de IDs de forma compacta.',
      },
      {
        term: 'IS NULL',
        definition: 'Condición que filtra filas donde una columna no tiene valor. En el sistema de préstamos, WHERE fecha_devolucion IS NULL aísla los préstamos todavía activos (el libro no se ha devuelto).',
      },
      {
        term: 'CREATE INDEX',
        definition: 'Crea una estructura auxiliar B-Tree sobre una o varias columnas para acelerar las búsquedas. No es visible en los datos pero MySQL lo consulta internamente al ejecutar SELECT con WHERE o JOIN sobre esas columnas.',
      },
    ],

    contenido: [
      {
        heading: 'Objetivo y alcance del proyecto',
        blocks: [
          {
            type: 'p',
            text: 'El proyecto final integra todos los conceptos vistos en el módulo en un escenario real y autocontenido: un sistema de gestión de biblioteca. No se usarán Sakila ni World; las tablas se diseñan desde cero aplicando normalización, restricciones y relaciones.',
          },
          {
            type: 'p',
            text: 'El sistema tiene tres entidades: los libros del catálogo, los usuarios registrados y los préstamos que relacionan a ambos. Esta es exactamente la misma estructura que Sakila (películas, clientes, alquileres), pero construida a mano, lo que permite ver cómo se toman las decisiones de diseño en lugar de heredarlas.',
          },
          {
            type: 'ol',
            items: [
              'Crear la base de datos y las tres tablas con sus restricciones.',
              'Poblar las tablas con datos de prueba.',
              'Actualizar la disponibilidad de los libros prestados.',
              'Consultar el catálogo disponible con filtros y orden.',
              'Obtener el listado de préstamos activos cruzando las tres tablas con JOINs.',
              'Añadir índices sobre las columnas de búsqueda más frecuente.',
            ],
          },
        ],
      },
      {
        heading: 'Diseño de tablas: decisiones clave',
        blocks: [
          {
            type: 'p',
            text: 'Antes de escribir CREATE TABLE conviene razonar qué datos necesita cada entidad y cómo se relacionan entre sí. Un error de diseño en esta fase cuesta caro: obliga a migrar datos o a añadir columnas que rompen la normalización.',
          },
          {
            type: 'ul',
            items: [
              'libros almacena el catálogo. Es la entidad central: sin libros no hay préstamos.',
              'usuarios almacena a las personas que pueden pedir libros. El email se declara UNIQUE porque dos usuarios no pueden compartir la misma dirección de correo.',
              'prestamos es la tabla de unión N:M entre libros y usuarios. Guarda el libro prestado, quién lo tiene, cuándo se prestó y cuándo se devolvió. La fecha de devolución es NULL mientras el libro sigue fuera.',
            ],
          },
          {
            type: 'callout',
            variant: 'note',
            title: 'La tercera forma normal en la práctica',
            text: 'El autor del libro podría extraerse a su propia tabla autores y vincularse mediante un autor_id. Eso sería 3FN. En este proyecto se mantiene como VARCHAR en libros para no complicar el código, pero la actividad final propone dar ese paso.',
          },
        ],
      },
      {
        heading: 'La restricción CHECK: validar datos en el origen',
        blocks: [
          {
            type: 'p',
            text: 'MySQL permite añadir una condición lógica a una columna con CHECK. Si al insertar o actualizar el valor no cumple la condición, la operación falla con un error claro en lugar de dejar un dato incorrecto en la base de datos.',
          },
          {
            type: 'p',
            text: 'En la tabla libros, el año de publicación se define con CHECK (anio > 1800). Esto descarta errores tipográficos como insertar el año 19 en lugar de 1919, sin necesidad de validación en la capa de aplicación.',
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'CHECK vs. validación en la aplicación',
            text: 'Validar en la base de datos con CHECK es preferible a hacerlo solo en el código: si otro sistema o un script inserta datos directamente en la base de datos, la restricción sigue activa. La validación en la aplicación puede saltarse; CHECK no.',
          },
        ],
      },
      {
        heading: 'Poblar las tablas con datos de prueba',
        blocks: [
          {
            type: 'p',
            text: 'El orden de inserción importa cuando hay claves foráneas. Los libros y los usuarios deben existir antes de poder crear préstamos que los referencien. Intentar insertar un préstamo con un libro_id que todavía no existe en libros provoca un error de integridad referencial.',
          },
          {
            type: 'ul',
            items: [
              'Cinco libros clásicos: cuatro del siglo XX y uno del XXI, con años entre 1943 y 2001.',
              'Tres usuarios con emails únicos: MySQL rechazará automáticamente un cuarto usuario con un email ya registrado.',
              'Dos préstamos activos: Ana tiene 100 años de soledad y Marcelo tiene El Principito. La fecha de devolución se deja NULL porque los libros siguen prestados.',
            ],
          },
          {
            type: 'callout',
            variant: 'warn',
            title: 'El orden de ejecución en el script',
            text: 'Si se ejecuta el script completo de una vez, la sección de INSERT de préstamos debe ir siempre después de los INSERT de libros y usuarios. En un script nuevo y vacío esto es fácil de controlar; al reejecutar, hay que tener en cuenta que los IDs AUTO_INCREMENT continúan desde el último valor, no desde 1.',
          },
        ],
      },
      {
        heading: 'Actualizar disponibilidad con UPDATE e IN',
        blocks: [
          {
            type: 'p',
            text: 'Los libros se crean con disponible = true por defecto. Una vez insertados los préstamos, hay que marcar como no disponibles los libros que están fuera. UPDATE combina SET para indicar el nuevo valor y WHERE para limitar qué filas se modifican.',
          },
          {
            type: 'p',
            text: 'Usar IN (1, 3) en lugar de dos UPDATE separados es más limpio y ejecuta una sola operación. En producción, esta actualización se haría automáticamente desde la lógica de la aplicación al registrar un préstamo; aquí se hace manual para ver el mecanismo.',
          },
          {
            type: 'callout',
            variant: 'warn',
            title: 'UPDATE sin WHERE modifica todas las filas',
            text: 'Si se olvida el WHERE en un UPDATE, MySQL aplica el cambio a todas las filas de la tabla. No hay "deshacer" automático. Antes de ejecutar un UPDATE, es buena práctica convertirlo en un SELECT con la misma condición para verificar cuántas filas afectará.',
          },
        ],
      },
      {
        heading: 'Consultas sobre el catálogo',
        blocks: [
          {
            type: 'p',
            text: 'Con los datos insertados y la disponibilidad actualizada, se pueden hacer consultas útiles. La primera es listar los libros que aún están disponibles, ordenados del más reciente al más antiguo, mostrando solo las columnas relevantes (sin la columna disponible, porque el filtro ya la hace implícita).',
          },
          {
            type: 'p',
            text: 'La segunda consulta es más compleja: cruza las tres tablas para saber quién tiene cada libro prestado, cuándo lo tomó y cuántos días lleva sin devolverlo. Esto requiere dos JOINs encadenados y un filtro IS NULL sobre la fecha de devolución.',
          },
          {
            type: 'ul',
            items: [
              'FROM prestamos p: la tabla de unión es el punto de partida porque contiene las dos claves foráneas.',
              'JOIN libros l ON p.libro_id = l.id: añade los datos del libro (título).',
              'JOIN usuarios u ON p.usuario_id = u.id: añade los datos del usuario (nombre).',
              'WHERE p.fecha_devolucion IS NULL: filtra solo préstamos activos.',
              'DATEDIFF(CURRENT_DATE, p.fecha_prestamo) AS dias_prestado: calcula los días transcurridos.',
            ],
          },
        ],
      },
      {
        heading: 'Índices: optimizar las búsquedas más frecuentes',
        blocks: [
          {
            type: 'p',
            text: 'Con solo cinco libros y tres usuarios, cualquier consulta es instantánea. Pero el diseño del índice debe pensarse para cuando la base de datos tenga miles o millones de filas.',
          },
          {
            type: 'p',
            text: 'Dos búsquedas serán habituales en este sistema: buscar libros por título (búsqueda de catálogo) y buscar todos los préstamos de un usuario concreto (historial). Añadir un índice sobre titulo en libros y sobre usuario_id en prestamos hace que MySQL resuelva esas consultas sin escanear la tabla entera.',
          },
          {
            type: 'callout',
            variant: 'note',
            title: 'Los FOREIGN KEY no crean índice automáticamente en MySQL',
            text: 'A diferencia del PRIMARY KEY, declarar un FOREIGN KEY no crea un índice en la columna referenciante. Es una razón habitual de lentitud en JOINs: la columna libro_id de préstamos participa en muchos JOINs pero no está indexada a menos que se cree explícitamente.',
          },
        ],
      },
      {
        heading: 'Actividad de extensión: tabla autores',
        blocks: [
          {
            type: 'p',
            text: 'El proyecto base guarda el autor como texto dentro de libros. Eso viola la tercera forma normal: el nombre del autor depende de sí mismo, no de la clave de libros. Si el mismo autor tiene varios libros y cambia su nombre (pseudónimo, corrección tipográfica), hay que actualizar todas las filas.',
          },
          {
            type: 'p',
            text: 'La extensión propuesta separa autores en su propia tabla y añade una columna autor_id en libros como FOREIGN KEY. Esto centraliza la información del autor y permite añadirle campos adicionales (biografía, nacionalidad, fecha de nacimiento) sin tocar la tabla libros.',
          },
          {
            type: 'ol',
            items: [
              'Crear la tabla autores con id, nombre y nacionalidad.',
              'Insertar los autores de los cinco libros existentes.',
              'Añadir la columna autor_id a libros con ALTER TABLE.',
              'Actualizar libros con el autor_id correcto para cada fila.',
              'Añadir la FOREIGN KEY entre libros.autor_id y autores.id.',
              'Crear un índice sobre libros.autor_id para acelerar JOINs por autor.',
            ],
          },
        ],
      },
    ],

    codeExamples: [
      {
        label: 'Crear la base de datos y las tres tablas',
        lang: 'sql',
        code: `CREATE DATABASE IF NOT EXISTS libros_base_datos;
USE libros_base_datos;

CREATE TABLE libros (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  titulo     VARCHAR(100) NOT NULL,
  autor      VARCHAR(100) NOT NULL,
  anio       INT          NOT NULL CHECK (anio > 1800),
  disponible BOOLEAN      NOT NULL DEFAULT TRUE
);

CREATE TABLE usuarios (
  id     INT          AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email  VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE prestamos (
  id               INT  AUTO_INCREMENT PRIMARY KEY,
  libro_id         INT  NOT NULL,
  usuario_id       INT  NOT NULL,
  fecha_prestamo   DATE NOT NULL DEFAULT (CURRENT_DATE),
  fecha_devolucion DATE NULL,
  FOREIGN KEY (libro_id)   REFERENCES libros(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);`,
        note: 'CHECK (anio > 1800) valida el dato en la base de datos, no solo en la aplicación. UNIQUE en email evita duplicados. fecha_devolucion es NULL mientras el libro sigue prestado: cuando se devuelve, se rellena con la fecha de entrega.',
      },
      {
        label: 'Poblar las tablas e insertar préstamos',
        lang: 'sql',
        code: `-- Catálogo de libros
INSERT INTO libros (titulo, autor, anio) VALUES
  ('100 años de soledad',                'Gabriel García Márquez',    1967),
  ('1984',                               'George Orwell',             1949),
  ('El Principito',                      'Antoine de Saint-Exupéry', 1943),
  ('Harry Potter y la Piedra Filosofal', 'J.K. Rowling',             1997),
  ('La Sombra del Viento',               'Carlos Ruiz Zafón',        2001);

-- Usuarios registrados
INSERT INTO usuarios (nombre, email) VALUES
  ('Ana Rodríguez', 'ana@gmail.com'),
  ('Marcelo Borriti', 'marcelo@gmail.com'),
  ('Juan Caballero',  'juan@gmail.com');

-- Préstamos activos (sin fecha de devolución)
INSERT INTO prestamos (libro_id, usuario_id) VALUES
  (1, 1),  -- Ana tiene '100 años de soledad'
  (3, 2);  -- Marcelo tiene 'El Principito'

-- Marcar como no disponibles los libros prestados
UPDATE libros
SET disponible = FALSE
WHERE id IN (1, 3);`,
        note: 'Los préstamos se insertan después de libros y usuarios porque las FOREIGN KEY lo exigen. La columna disponible se actualiza en un paso separado para ilustrar UPDATE + IN; en producción esto lo haría la lógica de negocio al registrar el préstamo.',
      },
      {
        label: 'Consultar libros disponibles y préstamos activos',
        lang: 'sql',
        code: `-- Libros disponibles, del más reciente al más antiguo
SELECT titulo, autor, anio
FROM libros
WHERE disponible = TRUE
ORDER BY anio DESC;

-- Préstamos activos: quién tiene qué libro y cuántos días lleva
SELECT
  u.nombre        AS usuario,
  l.titulo        AS libro,
  p.fecha_prestamo,
  DATEDIFF(CURRENT_DATE, p.fecha_prestamo) AS dias_prestado
FROM prestamos p
  JOIN libros   l ON p.libro_id   = l.id
  JOIN usuarios u ON p.usuario_id = u.id
WHERE p.fecha_devolucion IS NULL;`,
        note: 'La consulta de préstamos activos arranca desde prestamos porque es la tabla que contiene las dos FK. Los dos JOINs traen el título del libro y el nombre del usuario. DATEDIFF calcula los días transcurridos desde el préstamo hasta hoy; si el libro acaba de prestarse devuelve 0.',
      },
      {
        label: 'Añadir índices de optimización',
        lang: 'sql',
        code: `-- Índice para búsqueda de catálogo por título
CREATE INDEX idx_libros_titulo
  ON libros (titulo);

-- Índice para historial de préstamos por usuario
CREATE INDEX idx_prestamos_usuario
  ON prestamos (usuario_id);

-- Verificar con EXPLAIN que MySQL usa el índice
EXPLAIN SELECT titulo, autor, anio
FROM libros
WHERE titulo LIKE 'Harry%';`,
        note: 'Los FOREIGN KEY no crean índice automáticamente en MySQL. Sin idx_prestamos_usuario, cada consulta de historial de un usuario escanea toda la tabla prestamos. EXPLAIN muestra en la columna "key" el nombre del índice que MySQL ha elegido usar.',
      },
      {
        label: 'Actividad: extender el modelo con la tabla autores',
        lang: 'sql',
        code: `-- 1. Crear la tabla autores
CREATE TABLE autores (
  id          INT          AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL,
  nacionalidad VARCHAR(50) NULL
);

-- 2. Insertar los autores existentes
INSERT INTO autores (nombre, nacionalidad) VALUES
  ('Gabriel García Márquez',   'Colombiana'),
  ('George Orwell',            'Británica'),
  ('Antoine de Saint-Exupéry', 'Francesa'),
  ('J.K. Rowling',             'Británica'),
  ('Carlos Ruiz Zafón',        'Española');

-- 3. Añadir columna FK en libros
ALTER TABLE libros
  ADD COLUMN autor_id INT NULL,
  ADD CONSTRAINT fk_libros_autor
    FOREIGN KEY (autor_id) REFERENCES autores(id);

-- 4. Vincular cada libro con su autor
UPDATE libros SET autor_id = 1 WHERE id = 1;
UPDATE libros SET autor_id = 2 WHERE id = 2;
UPDATE libros SET autor_id = 3 WHERE id = 3;
UPDATE libros SET autor_id = 4 WHERE id = 4;
UPDATE libros SET autor_id = 5 WHERE id = 5;

-- 5. Consulta con el nuevo JOIN
SELECT l.titulo, a.nombre AS autor, a.nacionalidad, l.anio
FROM libros l
  JOIN autores a ON l.autor_id = a.id
ORDER BY l.anio;`,
        note: 'ALTER TABLE añade la columna sin perder los datos existentes. La columna autor_id se define NULL temporalmente porque las filas ya existen y no tienen valor; después del UPDATE se podría cambiar a NOT NULL si se quiere garantizar que todos los libros tengan autor asignado.',
      },
    ],

    errores: [
      'Insertar en prestamos antes de que existan las filas en libros o usuarios. MySQL devolverá un error de clave foránea (Cannot add or update a child row: a foreign key constraint fails). El orden de inserción debe respetar las dependencias: primero las tablas padre, luego la tabla hijo.',
      'Olvidar el WHERE en un UPDATE. Sin WHERE, MySQL actualiza todas las filas de la tabla. Si se ejecuta UPDATE libros SET disponible = FALSE sin WHERE, todos los libros quedan marcados como no disponibles.',
      'Usar un valor de año fuera del rango del CHECK. INSERT INTO libros con anio = 1750 fallará porque no cumple CHECK (anio > 1800). El error es claro pero solo aparece si se ha declarado la restricción correctamente.',
      'Insertar dos usuarios con el mismo email. La restricción UNIQUE sobre email devolverá Duplicate entry para la segunda inserción. La solución no es eliminar UNIQUE sino garantizar datos únicos antes de insertar.',
      'Ejecutar el script en orden incorrecto después de un DROP TABLE. Si se eliminan y recrean las tablas, los AUTO_INCREMENT vuelven a 1. Si los UPDATE de disponible siguen referenciando IDs fijos (1, 3), pueden apuntar a libros distintos si el orden de inserción ha cambiado.',
      'Buscar por título sin índice y no entender por qué es lento en tablas grandes. En desarrollo con cinco filas no se nota, pero en producción con miles de registros una búsqueda LIKE \'%titulo%\' sin índice Full-Text escanea toda la tabla.',
    ],

    practicas: [
      'Escribe el CREATE TABLE antes de insertar ningún dato. Revisa los tipos de dato, las restricciones y las FK en papel o comentario antes de ejecutar: cambiar una columna después de tener datos obliga a usar ALTER TABLE.',
      'Usa DEFAULT CURRENT_DATE en fecha_prestamo para no tener que especificarlo en cada INSERT. Los valores por defecto reducen el riesgo de errores y hacen el código más limpio.',
      'Antes de cualquier UPDATE, convierte el WHERE en un SELECT para contar cuántas filas van a cambiar. SELECT * FROM libros WHERE id IN (1, 3) confirma que son exactamente las que quieres modificar.',
      'Crea índices sobre las columnas que aparecen en WHERE y JOIN con frecuencia, no sobre todas las columnas. Los índices aceleran lecturas pero ralentizan escrituras; índices innecesarios tienen coste real.',
      'Mantén fecha_devolucion como NULL mientras el préstamo está activo y rellénala al devolver el libro. IS NULL es más semántico y eficiente que usar una fecha centinela como \'9999-12-31\'.',
      'Documenta con comentarios SQL las relaciones entre tablas al inicio del script. Un comentario explicando que prestamos.libro_id → libros.id y prestamos.usuario_id → usuarios.id ayuda a cualquier persona que lea el código meses después.',
    ],

    ejercicios: [
      'Ejecuta el script completo desde cero: crea la base de datos, las tres tablas, inserta todos los datos y actualiza la disponibilidad. Verifica con SELECT * FROM cada tabla que todo está correcto.',
      'Añade dos libros más al catálogo y un nuevo usuario. Crea un préstamo donde el nuevo usuario pida uno de los nuevos libros. Comprueba que la disponibilidad se actualiza correctamente.',
      'Escribe una consulta que muestre el número total de préstamos activos y el número de préstamos devueltos usando COUNT y GROUP BY sobre la columna fecha_devolucion (NULL vs. no NULL).',
      'Registra la devolución de uno de los préstamos activos: actualiza su fecha_devolucion con la fecha de hoy y marca el libro como disponible de nuevo. Ejecuta la consulta de préstamos activos para confirmar que ya no aparece.',
      'Implementa la actividad de extensión: crea la tabla autores, inserta los autores, añade la columna autor_id en libros con ALTER TABLE y vincula cada libro a su autor con UPDATE. Escribe una consulta con JOIN que muestre título, nombre del autor y nacionalidad.',
      'Usa EXPLAIN sobre la consulta de préstamos activos con los dos JOINs. Observa cuántas filas examina MySQL. Luego crea el índice idx_prestamos_usuario y vuelve a ejecutar EXPLAIN para comparar el resultado.',
    ],

    checklist: [
      { text: 'He creado las tres tablas con sus tipos de dato, restricciones y claves foráneas correctas.' },
      { text: 'Entiendo para qué sirve CHECK y cómo difiere de NOT NULL.' },
      { text: 'Sé por qué UNIQUE en email es necesario y qué error produce duplicar un valor único.' },
      { text: 'He insertado datos en el orden correcto respetando las dependencias de FK.' },
      { text: 'He usado UPDATE con WHERE e IN para actualizar solo las filas correctas.' },
      { text: 'Puedo escribir una consulta con dos JOINs encadenados arrancando desde la tabla de unión.' },
      { text: 'Entiendo qué significa IS NULL en el contexto de préstamos activos.' },
      { text: 'He creado los dos índices y sé verificar con EXPLAIN si MySQL los usa.' },
      { text: 'Comprendo por qué separar autores en su propia tabla mejora la normalización del diseño.' },
    ],
  },
];
