import type { RawLesson } from './types';

export const topic01: RawLesson[] = [
  {
    id: '01a', slug: '01a-introduccion-mysql-workbench',
    title: 'Introducción a MySQL y MySQL Workbench',
    topic: 'Introducción a MySQL y MySQL Workbench', topicNumber: '01', classNumber: '01a',
    type: 'theory', status: 'pending', contentStatus: 'completed', difficulty: 1, estimatedTime: '20 min',
    tags: ['MySQL', 'Bases de datos', 'SQL', 'NoSQL'],

    summary: 'Repaso de los fundamentos: qué es una base de datos, para qué sirve y la diferencia entre bases de datos relacionales (SQL) y no relacionales (NoSQL). Introducción a MySQL como motor relacional y contexto de sus casos de uso más comunes.',

    keyConcepts: [
      {
        term: 'Base de datos',
        definition: 'Sistema organizado para almacenar, gestionar y recuperar información de manera eficiente. Garantiza estructura, integridad y acceso controlado a los datos.',
      },
      {
        term: 'Base de datos relacional',
        definition: 'Organiza los datos en tablas (filas y columnas) con un esquema fijo. Las relaciones entre tablas se establecen con claves primarias y foráneas. Usa SQL como lenguaje de consulta.',
      },
      {
        term: 'NoSQL',
        definition: 'Bases de datos no relacionales. Almacenan datos en formatos flexibles como JSON, documentos o grafos, sin esquema fijo. Escalan horizontalmente agregando más servidores.',
      },
      {
        term: 'SQL',
        definition: 'Structured Query Language. Lenguaje estándar para consultar y gestionar bases de datos relacionales. Permite crear tablas, insertar, modificar, borrar y consultar datos.',
      },
      {
        term: 'MySQL',
        definition: 'Sistema de gestión de bases de datos relacionales (SGBDR) de código abierto. Desarrollado por MySQL AB, actualmente propiedad de Oracle. Uno de los más usados en aplicaciones web.',
      },
      {
        term: 'Clave primaria (PRIMARY KEY)',
        definition: 'Identificador único de cada fila en una tabla. No puede repetirse ni ser nulo. Por convención, casi siempre es el campo id.',
      },
      {
        term: 'Clave foránea (FOREIGN KEY)',
        definition: 'Campo en una tabla que referencia la clave primaria de otra tabla. Permite relacionar datos entre tablas sin duplicarlos.',
      },
      {
        term: 'JOIN',
        definition: 'Operación SQL que combina filas de dos o más tablas usando la relación entre sus claves. Existen distintos tipos: INNER, LEFT, RIGHT y FULL.',
      },
    ],

    contenido: [
      {
        heading: '¿Qué es una base de datos?',
        blocks: [
          {
            type: 'p',
            text: 'Un sistema organizado para almacenar, gestionar y recuperar información de manera eficiente. La clave está en "organizado": no es simplemente guardar datos en cualquier sitio, sino hacerlo con estructura, relaciones claras y reglas que garantizan su coherencia.',
          },
          {
            type: 'ul',
            items: [
              'Almacenamiento estructurado: cada dato tiene su lugar y su tipo. Evita duplicidades y desorden.',
              'Acceso rápido: las consultas con filtros complejos devuelven resultados en milisegundos, incluso con millones de registros.',
              'Integridad: las reglas del esquema impiden guardar datos inválidos o inconsistentes.',
              'Seguridad: control de acceso por usuario y por nivel, desde solo lectura hasta administración completa.',
            ],
          },
          {
            type: 'p',
            text: 'Ejemplos del día a día: la agenda de contactos del móvil (nombre, teléfono, dirección organizados por campo) o el catálogo de Netflix (películas, usuarios, valoraciones, géneros, historial) son bases de datos con estructura bien definida.',
          },
        ],
      },
      {
        heading: 'Relacionales vs. no relacionales',
        blocks: [
          {
            type: 'table',
            headers: ['Aspecto', 'Relacional (SQL)', 'No relacional (NoSQL)'],
            rows: [
              ['Estructura', 'Tablas con esquema fijo (filas y columnas)', 'Documentos, grafos o JSON sin esquema rígido'],
              ['Escalabilidad', 'Vertical: mejor hardware', 'Horizontal: más servidores en paralelo'],
              ['Lenguaje', 'SQL estándar compartido', 'API propia de cada motor'],
              ['Uso típico', 'Bancos, inventarios, e-commerce', 'Redes sociales, IoT, apps en tiempo real'],
              ['Ejemplos', 'MySQL, PostgreSQL, SQLite, Oracle', 'MongoDB, Redis, Cassandra, DynamoDB'],
            ],
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'Analogía rápida',
            text: 'Las bases de datos relacionales son como Excel: ordenadas, rígidas, ideales para datos predecibles. Las no relacionales son como un bloc de notas: flexibles y rápidas de modificar.',
          },
          {
            type: 'p',
            text: 'No son excluyentes. Una app de delivery puede usar SQL para pedidos y clientes (datos estructurados) y NoSQL para las reseñas y fotos de los restaurantes (datos variables).',
          },
        ],
      },
      {
        heading: '¿Cuándo usar SQL y cuándo NoSQL?',
        blocks: [
          {
            type: 'ul',
            items: [
              'SQL si los datos son estructurados y predecibles: perfiles de usuario, inventarios, transacciones bancarias, facturas.',
              'SQL si necesitas transacciones complejas con garantías de integridad (ACID).',
              'NoSQL si los datos cambian de forma con frecuencia o no tienen un esquema fijo.',
              'NoSQL si necesitas escalar horizontalmente a gran volumen: millones de eventos, sensores IoT, feeds de redes sociales.',
            ],
          },
        ],
      },
      {
        heading: '¿Qué es MySQL?',
        blocks: [
          {
            type: 'p',
            text: 'MySQL es un sistema de gestión de bases de datos relacionales (SGBDR) de código abierto basado en SQL. Es uno de los motores más usados en el mundo, especialmente en aplicaciones web, por su equilibrio entre rendimiento, simplicidad y recursos.',
          },
          {
            type: 'ul',
            items: [
              'Código abierto: gratuito para uso comunitario (Community Edition).',
              'Alto rendimiento: optimizado para consultas rápidas incluso con grandes volúmenes de datos.',
              'Multiplataforma: Windows, Linux, macOS y entornos cloud (AWS, GCP, Azure).',
              'Seguridad avanzada: cifrado, autenticación de usuarios y gestión de permisos por niveles.',
              'Alta disponibilidad: replicación, clustering y copias de seguridad automáticas.',
            ],
          },
          {
            type: 'table',
            headers: ['Motor', 'Puntos fuertes', 'Uso ideal'],
            rows: [
              ['MySQL', 'Rápido, fácil de usar, bajo consumo de recursos', 'Aplicaciones web tradicionales'],
              ['PostgreSQL', 'Más avanzado, extensible, mejor para análisis', 'Sistemas de análisis y data science'],
              ['SQLite', 'Sin servidor, muy ligero, un solo archivo', 'Apps móviles, proyectos pequeños'],
              ['MongoDB', 'Flexible, escala horizontalmente, NoSQL', 'Datos variables, apps en tiempo real'],
            ],
          },
        ],
      },
      {
        heading: 'Casos de uso de MySQL',
        blocks: [
          {
            type: 'ul',
            items: [
              'Aplicaciones web: la mayoría de webs con backend tradicional (PHP, Node.js, Python, Java) usan MySQL.',
              'CMS: WordPress, Joomla y sistemas de foros almacenan contenido, usuarios y configuración en MySQL.',
              'E-commerce: Magento y plataformas similares guardan catálogos, pedidos y clientes en MySQL.',
              'Aplicaciones empresariales: inventarios, reservas de hotel, sistemas de facturación, gestión de RRHH.',
              'Análisis de datos: Python con Pandas, Tableau y Power BI se integran con MySQL para generar reportes.',
              'APIs y apps móviles: MySQL como backend de datos con lenguajes como Node.js, PHP o Python.',
            ],
          },
        ],
      },
    ],

    codeExamples: [
      {
        label: 'Estructura básica: dos tablas relacionadas',
        lang: 'sql',
        code: `-- Tabla principal: un registro por cliente
CREATE TABLE clientes (
  id      INT PRIMARY KEY AUTO_INCREMENT,
  nombre  VARCHAR(100) NOT NULL
);

-- Tabla secundaria: los pedidos apuntan al cliente por su id
CREATE TABLE pedidos (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  cliente_id  INT NOT NULL,
  producto    VARCHAR(200),
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);`,
        note: 'cliente_id es clave foránea en pedidos y clave primaria en clientes. Este vínculo es la base de los JOINs: permite saber qué pedido pertenece a qué cliente sin duplicar el nombre del cliente en cada fila.',
      },
      {
        label: 'Consulta con JOIN: ver pedidos con el nombre del cliente',
        lang: 'sql',
        code: `SELECT clientes.nombre, pedidos.producto
FROM pedidos
INNER JOIN clientes ON pedidos.cliente_id = clientes.id;`,
      },
    ],

    errores: [
      'Confundir MySQL con SQL: SQL es el lenguaje estándar; MySQL es una de sus implementaciones. PostgreSQL, SQLite u Oracle también usan SQL.',
      'Pensar que NoSQL significa "sin orden o sin estructura": las bases no relacionales tienen estructura, simplemente es más flexible y no está basada en tablas fijas.',
      'Asumir que hay que elegir entre SQL o NoSQL para toda la aplicación: muchos sistemas usan ambos según qué tipo de datos gestionan.',
      'Confundir PRIMARY KEY con FOREIGN KEY: la primaria identifica la fila dentro de su propia tabla; la foránea es una referencia hacia la primaria de otra tabla.',
    ],

    practicas: [
      'Usa SQL cuando los datos son estructurados y predecibles: perfiles, inventarios, transacciones.',
      'Usa NoSQL cuando los datos cambian de forma frecuentemente o necesitas escalabilidad horizontal masiva.',
      'El campo id como clave primaria es una convención ampliamente adoptada. Respétala aunque parezca redundante en tablas pequeñas: evita referencias ambiguas en el futuro.',
      'No dupliques datos entre tablas. Si un cliente tiene varios pedidos, su nombre va en la tabla clientes y los pedidos la referencian por id mediante una clave foránea.',
    ],

    ejercicios: [],

    checklist: [
      { text: 'Entiendo qué es una base de datos y cuáles son sus funciones clave' },
      { text: 'Sé distinguir una base de datos relacional de una no relacional y en qué casos usar cada una' },
      { text: 'Conozco las características principales de MySQL y su posicionamiento frente a otros motores' },
      { text: 'Entiendo qué son las claves primarias y foráneas y cómo se relacionan dos tablas' },
      { text: 'Sé qué hace un JOIN y para qué sirve' },
    ],
  },

  {
    id: '01b', slug: '01b-instalacion-mysql-workbench',
    title: 'MySQL Workbench — instalación',
    topic: 'Introducción a MySQL y MySQL Workbench', topicNumber: '01', classNumber: '01b',
    type: 'setup', status: 'pending', contentStatus: 'completed', difficulty: 1, estimatedTime: '25 min',
    tags: ['MySQL', 'Workbench', 'Instalación', 'Configuración'],

    summary: 'Instalación y configuración de MySQL Community Server y MySQL Workbench en Windows. Se establece el puerto de conexión, la contraseña de root y las bases de datos de ejemplo. Por último, primer recorrido por la interfaz de Workbench.',

    keyConcepts: [
      {
        term: 'MySQL Community Server',
        definition: 'El motor de base de datos. Es el proceso que corre en segundo plano y gestiona, almacena y responde las consultas. Sin él, Workbench no tiene nada a lo que conectarse.',
      },
      {
        term: 'MySQL Workbench',
        definition: 'Herramienta gráfica oficial de MySQL. Facilita escribir y ejecutar queries, explorar tablas y gestionar el servidor de forma visual. Requiere que el motor esté instalado y en ejecución.',
      },
      {
        term: 'Puerto TCP 3306',
        definition: 'Puerto por defecto que usa MySQL para escuchar conexiones locales. Si hay otra instancia instalada que ya lo usa, se puede cambiar durante la instalación (p.ej. 3307).',
      },
      {
        term: 'Usuario root',
        definition: 'Administrador del servidor MySQL. Se crea automáticamente durante la instalación con permisos totales. Su contraseña se establece en el asistente de configuración.',
      },
      {
        term: 'Sakila',
        definition: 'Base de datos de ejemplo que incluye MySQL por defecto. Simula la gestión de una videoteca: actores, películas, alquileres, clientes. Se usa para practicar en las primeras clases.',
      },
      {
        term: 'World',
        definition: 'Segunda base de datos de ejemplo de MySQL. Contiene datos de países, ciudades e idiomas del mundo. También se usa en las primeras prácticas del módulo.',
      },
      {
        term: 'Servicio de Windows (MySQL Service)',
        definition: 'Proceso del sistema operativo que ejecuta el motor MySQL en segundo plano. Si el servicio está detenido, Workbench no puede conectarse aunque la contraseña sea correcta.',
      },
    ],

    contenido: [
      {
        heading: 'Qué instalamos y para qué',
        blocks: [
          {
            type: 'p',
            text: 'La instalación tiene dos piezas separadas: el motor (Community Server) y la interfaz gráfica (Workbench). El motor es el que gestiona los datos; Workbench es la ventana más cómoda para trabajar con él.',
          },
          {
            type: 'table',
            headers: ['Componente', 'Qué hace', 'Sin él...'],
            rows: [
              ['MySQL Community Server', 'El motor. Gestiona tablas, datos y consultas.', 'No hay base de datos que consultar.'],
              ['MySQL Workbench', 'GUI para escribir y ejecutar queries visualmente.', 'Solo tienes la línea de comandos (que también funciona).'],
            ],
          },
          {
            type: 'callout',
            variant: 'note',
            title: 'Línea de comandos vs. Workbench',
            text: 'La línea de comandos es más fiable y es lo que se usa en producción. Workbench es más visual e intuitivo para aprender. Durante el módulo se usa principalmente Workbench.',
          },
        ],
      },
      {
        heading: 'Instalación de MySQL Community Server',
        blocks: [
          {
            type: 'ol',
            items: [
              'Ir al sitio oficial de MySQL → Downloads → Community → MySQL Community Server.',
              'Seleccionar el sistema operativo. Elegir la versión 8.x para máxima compatibilidad con Workbench.',
              'Ejecutar el instalador y elegir la opción "Typical" (instalación estándar).',
              'En la configuración del servidor: Development Computer, puerto 3306 (por defecto), TCP/IP.',
              'Establecer la contraseña de root. Anotarla en ese momento.',
              'En "Sample Databases": marcar Sakila y World para tenerlas disponibles desde el primer día.',
              'Finalizar y aplicar la configuración.',
            ],
          },
          {
            type: 'callout',
            variant: 'warn',
            title: 'La contraseña de root',
            text: 'Anótala en el momento. Recuperarla después implica parar el servicio, editar archivos de configuración del servidor y reiniciar todo. No merece la pena correr el riesgo.',
          },
        ],
      },
      {
        heading: 'Gestionar el servicio de Windows',
        blocks: [
          {
            type: 'p',
            text: 'MySQL corre como un servicio de Windows en segundo plano. Si Workbench no conecta aunque la contraseña es correcta, lo más probable es que el servicio esté detenido.',
          },
          {
            type: 'ol',
            items: [
              'Buscar "Servicios" en el menú Inicio (o ejecutar services.msc en el buscador).',
              'Localizar "MySQL80" o "MySQL92" según la versión instalada.',
              'Si está detenido: clic derecho → Iniciar.',
              'Si tenía problemas estando en ejecución: clic derecho → Reiniciar.',
            ],
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'Auto-inicio del servicio',
            text: 'El instalador pregunta si arrancar MySQL automáticamente con Windows. Puedes desactivarlo si no usas MySQL a diario: lo inicias manualmente desde Servicios cuando lo necesites.',
          },
        ],
      },
      {
        heading: 'Instalación de MySQL Workbench',
        blocks: [
          {
            type: 'ol',
            items: [
              'Volver a la web de MySQL → Downloads → MySQL Workbench.',
              'Descargar la versión para tu sistema operativo (Windows 64 o 32 bits según tu equipo).',
              'Ejecutar el instalador y elegir la opción "Complete".',
              'Al abrir Workbench por primera vez debería aparecer ya una conexión local preconfigurada (localhost:3306, root).',
            ],
          },
        ],
      },
      {
        heading: 'Conectar Workbench al servidor',
        blocks: [
          {
            type: 'p',
            text: 'Si la conexión no aparece o necesitas crear una nueva manualmente:',
          },
          {
            type: 'ol',
            items: [
              'Clic en "+" junto a "MySQL Connections".',
              'Connection Name: cualquier nombre identificativo (ej. "local-mysql").',
              'Hostname: 127.0.0.1 o localhost.',
              'Port: 3306 (o el que hayas configurado si lo cambiaste).',
              'Username: root.',
              'Password: el que estableciste durante la instalación.',
              'Clic en "Test Connection" para verificar antes de guardar.',
            ],
          },
          {
            type: 'callout',
            variant: 'warn',
            title: 'Incompatibilidad de versiones',
            text: 'Workbench 8 + MySQL Server 9.x muestra una advertencia de compatibilidad al hacer Test Connection. No es un error bloqueante: el módulo funciona igualmente. Para evitarla, instala MySQL Server 8.x.',
          },
        ],
      },
      {
        heading: 'Primer recorrido por Workbench',
        blocks: [
          {
            type: 'ul',
            items: [
              'Panel izquierdo (Navigator): lista de bases de datos y sus tablas. Desplegando una tabla, se ven sus columnas y sus tipos.',
              'Área central (Query Editor): donde se escriben y ejecutan las queries. El cursor determina qué línea se ejecuta.',
              'Barra de herramientas: botones para ejecutar toda la query, solo la línea del cursor, o una selección.',
              'Panel inferior (Output): resultado de cada consulta y los errores de sintaxis o conexión.',
            ],
          },
          {
            type: 'p',
            text: 'Para trabajar con una base de datos hay que seleccionarla primero con USE. Sin este contexto, MySQL no sabe a qué esquema dirigir las queries.',
          },
        ],
      },
    ],

    codeExamples: [
      {
        label: 'Conectar desde la línea de comandos de MySQL',
        lang: 'bash',
        code: `# El instalador incluye "MySQL Command Line Client" en el menú Inicio
mysql -u root -p
# Introduce la contraseña cuando se solicite`,
        note: 'La línea de comandos es una alternativa siempre disponible a Workbench. Útil para verificar que el motor responde.',
      },
      {
        label: 'Primeros comandos tras conectarse',
        lang: 'sql',
        code: `-- Ver todas las bases de datos disponibles en el servidor
SHOW DATABASES;

-- Seleccionar la base de datos con la que queremos trabajar
USE sakila;

-- Confirmar qué base de datos está activa en este momento
SELECT DATABASE();

-- Ver las tablas de la base de datos activa
SHOW TABLES;`,
        note: 'USE sakila; debe ejecutarse antes de cualquier query que haga referencia a tablas de Sakila. Sin ese contexto, MySQL no sabe en qué esquema buscar.',
      },
    ],

    errores: [
      'Olvidar la contraseña de root: recuperarla implica parar el servicio MySQL, editar archivos de configuración del servidor y reiniciarlo. Anótala en el momento de la instalación.',
      'Puerto 3306 ya en uso: ocurre si ya hay otra instancia de MySQL instalada. Cambiar el puerto durante la instalación (p.ej. 3307) resuelve el conflicto.',
      'Workbench no conecta aunque la contraseña es correcta: el servicio MySQL está detenido. Ir a Servicios de Windows y arrancarlo.',
      'Workbench muestra advertencia de versión incompatible: ocurre con Workbench 8 + MySQL Server 9.x. No es un error bloqueante para el módulo.',
      'Sakila o World no aparecen en el Navigator de Workbench: no se marcaron durante la instalación. Se pueden importar manualmente (se verá en la clase 03a).',
    ],

    practicas: [
      'Instala MySQL Server 8.x si quieres máxima compatibilidad con Workbench sin advertencias de versión.',
      'Anota la contraseña de root en el momento de la instalación, no des por hecho que la recordarás.',
      'Desactiva el auto-inicio del servicio si no usas MySQL a diario: consumes recursos innecesariamente.',
      'Antes de cada sesión, haz Test Connection en Workbench para confirmar que el servicio está en ejecución.',
    ],

    ejercicios: [
      'Verificar que MySQL Community Server está instalado y el servicio figura como "Running" en Windows Servicios.',
      'Abrir Workbench y establecer una conexión exitosa al servidor local (localhost:3306, root).',
      'Confirmar que las bases de datos Sakila y World aparecen en el Navigator de Workbench.',
      'Desde el Query Editor de Workbench, ejecutar SHOW DATABASES; y verificar el resultado en el panel Output.',
      'Escribir USE sakila; y ejecutar la query. Confirmar que no hay error en el panel Output.',
    ],

    checklist: [
      { text: 'MySQL Community Server instalado y el servicio en estado "Running" en Windows Servicios' },
      { text: 'Workbench conectado al servidor local sin errores de conexión' },
      { text: 'Bases de datos Sakila y World visibles en el Navigator de Workbench' },
      { text: 'Sé cómo iniciar o reiniciar el servicio MySQL desde Windows Servicios' },
      { text: 'He ejecutado USE sakila; y SHOW TABLES; sin errores en Workbench' },
      { text: 'Entiendo la diferencia entre el motor (Community Server) y la GUI (Workbench)' },
    ],
  },
];
