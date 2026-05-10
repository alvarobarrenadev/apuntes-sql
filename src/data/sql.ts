// ================================================================
//  SQL module — metadata only.
//  Lesson body (summary, key concepts, sections, code, exercises,
//  checklist…) is intentionally null/empty: it will be filled
//  later from the real class transcripts.
// ================================================================

export type LessonType = 'theory' | 'exercise' | 'project' | 'setup';
export type LessonStatus = 'pending' | 'in-progress' | 'completed';
export type ContentStatus = 'empty' | 'draft' | 'completed';
export type Difficulty = 1 | 2 | 3 | 4;

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  topic: string;
  topicNumber: string;
  classNumber: string;
  type: LessonType;
  status: LessonStatus;
  contentStatus: ContentStatus;
  difficulty: Difficulty;
  estimatedTime: string;
  tags: string[];
  order: number;

  // Content placeholders — kept null/empty until transcripts arrive.
  summary: string | null;
  keyConcepts: unknown[];
  sections: unknown[];
  codeExamples: unknown[];
  exercises: unknown[];
  checklist: unknown[];
  resources: unknown[];

  // Navigation
  previousSlug: string | null;
  nextSlug: string | null;
}

export interface Topic {
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  classCount: number;
  estimatedTime: string;
  lessons: Lesson[];
  hasFinalProject?: boolean;
}

// ----------------------------------------------------------------
//  Raw lesson definitions (no class content invented).
// ----------------------------------------------------------------
const RAW: Array<Omit<Lesson, 'previousSlug' | 'nextSlug' | 'order'>> = [
  // Tema 1
  {
    id: '01a', slug: '01a-introduccion-mysql-workbench',
    title: 'Introducción a MySQL y MySQL Workbench',
    topic: 'Introducción a MySQL y MySQL Workbench', topicNumber: '01', classNumber: '01a',
    type: 'theory', status: 'pending', contentStatus: 'empty', difficulty: 1, estimatedTime: '20 min',
    tags: ['MySQL', 'Workbench', 'Introducción'],
    summary: null, keyConcepts: [], sections: [], codeExamples: [], exercises: [], checklist: [], resources: [],
  },
  {
    id: '01b', slug: '01b-instalacion-mysql-workbench',
    title: 'MySQL Workbench — instalación',
    topic: 'Introducción a MySQL y MySQL Workbench', topicNumber: '01', classNumber: '01b',
    type: 'setup', status: 'pending', contentStatus: 'empty', difficulty: 1, estimatedTime: '25 min',
    tags: ['MySQL', 'Workbench', 'Instalación'],
    summary: null, keyConcepts: [], sections: [], codeExamples: [], exercises: [], checklist: [], resources: [],
  },

  // Tema 2
  {
    id: '02', slug: '02-creacion-manipulacion-tablas',
    title: 'Creación y manipulación de tablas en SQL',
    topic: 'Creación y manipulación de tablas', topicNumber: '02', classNumber: '02',
    type: 'exercise', status: 'pending', contentStatus: 'empty', difficulty: 2, estimatedTime: '55 min',
    tags: ['DDL', 'CREATE', 'ALTER', 'DROP'],
    summary: null, keyConcepts: [], sections: [], codeExamples: [], exercises: [], checklist: [], resources: [],
  },

  // Tema 3
  {
    id: '03a', slug: '03a-importacion-sakila-world',
    title: 'Importación de Sakila y World',
    topic: 'Consultas y filtros básicos en SQL', topicNumber: '03', classNumber: '03a',
    type: 'setup', status: 'pending', contentStatus: 'empty', difficulty: 1, estimatedTime: '20 min',
    tags: ['Sakila', 'World', 'Importación'],
    summary: null, keyConcepts: [], sections: [], codeExamples: [], exercises: [], checklist: [], resources: [],
  },
  {
    id: '03b', slug: '03b-consultas-filtros-parte-1',
    title: 'Consultas y filtros básicos — Parte 1',
    topic: 'Consultas y filtros básicos en SQL', topicNumber: '03', classNumber: '03b',
    type: 'exercise', status: 'pending', contentStatus: 'empty', difficulty: 2, estimatedTime: '35 min',
    tags: ['SELECT', 'WHERE', 'ORDER BY'],
    summary: null, keyConcepts: [], sections: [], codeExamples: [], exercises: [], checklist: [], resources: [],
  },
  {
    id: '03c', slug: '03c-consultas-filtros-parte-2',
    title: 'Consultas y filtros básicos — Parte 2',
    topic: 'Consultas y filtros básicos en SQL', topicNumber: '03', classNumber: '03c',
    type: 'exercise', status: 'pending', contentStatus: 'empty', difficulty: 2, estimatedTime: '45 min',
    tags: ['SELECT', 'LIMIT', 'DISTINCT'],
    summary: null, keyConcepts: [], sections: [], codeExamples: [], exercises: [], checklist: [], resources: [],
  },

  // Tema 4
  {
    id: '04a', slug: '04a-funciones-agregadas-conceptos',
    title: 'Funciones agregadas y agrupación — Conceptos',
    topic: 'Funciones agregadas y agrupación', topicNumber: '04', classNumber: '04a',
    type: 'theory', status: 'pending', contentStatus: 'empty', difficulty: 2, estimatedTime: '25 min',
    tags: ['COUNT', 'SUM', 'AVG', 'GROUP BY'],
    summary: null, keyConcepts: [], sections: [], codeExamples: [], exercises: [], checklist: [], resources: [],
  },
  {
    id: '04b', slug: '04b-funciones-agregadas-ejercicios-fundamentales',
    title: 'Funciones agregadas y agrupación — Ejercicios fundamentales',
    topic: 'Funciones agregadas y agrupación', topicNumber: '04', classNumber: '04b',
    type: 'exercise', status: 'pending', contentStatus: 'empty', difficulty: 2, estimatedTime: '35 min',
    tags: ['GROUP BY', 'HAVING', 'COUNT'],
    summary: null, keyConcepts: [], sections: [], codeExamples: [], exercises: [], checklist: [], resources: [],
  },
  {
    id: '04c', slug: '04c-funciones-agregadas-ejercicios-avanzados',
    title: 'Funciones agregadas y agrupación — Ejercicios avanzados',
    topic: 'Funciones agregadas y agrupación', topicNumber: '04', classNumber: '04c',
    type: 'exercise', status: 'pending', contentStatus: 'empty', difficulty: 3, estimatedTime: '30 min',
    tags: ['GROUP BY', 'HAVING', 'Subqueries'],
    summary: null, keyConcepts: [], sections: [], codeExamples: [], exercises: [], checklist: [], resources: [],
  },

  // Tema 5
  {
    id: '05', slug: '05-relaciones-entre-tablas-joins',
    title: 'Relaciones entre tablas — JOINs',
    topic: 'Relaciones entre tablas', topicNumber: '05', classNumber: '05',
    type: 'exercise', status: 'pending', contentStatus: 'empty', difficulty: 3, estimatedTime: '60 min',
    tags: ['JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL'],
    summary: null, keyConcepts: [], sections: [], codeExamples: [], exercises: [], checklist: [], resources: [],
  },

  // Tema 6
  {
    id: '06', slug: '06-subconsultas-consultas-avanzadas',
    title: 'Subconsultas y consultas avanzadas',
    topic: 'Subconsultas y consultas avanzadas', topicNumber: '06', classNumber: '06',
    type: 'exercise', status: 'pending', contentStatus: 'empty', difficulty: 3, estimatedTime: '70 min',
    tags: ['Subquery', 'EXISTS', 'IN', 'CTE'],
    summary: null, keyConcepts: [], sections: [], codeExamples: [], exercises: [], checklist: [], resources: [],
  },

  // Tema 7
  {
    id: '07a', slug: '07a-optimizacion-conceptos',
    title: 'Optimización y buenas prácticas — Conceptos',
    topic: 'Optimización y buenas prácticas', topicNumber: '07', classNumber: '07a',
    type: 'theory', status: 'pending', contentStatus: 'empty', difficulty: 3, estimatedTime: '30 min',
    tags: ['EXPLAIN', 'Índices', 'Normalización'],
    summary: null, keyConcepts: [], sections: [], codeExamples: [], exercises: [], checklist: [], resources: [],
  },
  {
    id: '07b', slug: '07b-optimizacion-ejercicios',
    title: 'Optimización y buenas prácticas — Ejercicios',
    topic: 'Optimización y buenas prácticas', topicNumber: '07', classNumber: '07b',
    type: 'exercise', status: 'pending', contentStatus: 'empty', difficulty: 3, estimatedTime: '40 min',
    tags: ['EXPLAIN', 'Índices', 'Performance'],
    summary: null, keyConcepts: [], sections: [], codeExamples: [], exercises: [], checklist: [], resources: [],
  },
  {
    id: '08', slug: 'proyecto-final',
    title: 'Proyecto Final — Sistema de Gestión de Biblioteca',
    topic: 'Optimización y buenas prácticas', topicNumber: '07', classNumber: '08',
    type: 'project', status: 'pending', contentStatus: 'empty', difficulty: 4, estimatedTime: '3 h',
    tags: ['Proyecto final', 'Modelado', 'JOINs', 'Índices'],
    summary: null, keyConcepts: [], sections: [], codeExamples: [], exercises: [], checklist: [], resources: [],
  },
];

// ----------------------------------------------------------------
//  Wire prev/next + order, then group by topic.
// ----------------------------------------------------------------
export const lessons: Lesson[] = RAW.map((raw, i) => ({
  ...raw,
  order: i,
  previousSlug: i > 0 ? RAW[i - 1].slug : null,
  nextSlug: i < RAW.length - 1 ? RAW[i + 1].slug : null,
}));

const TOPIC_META: Record<string, { shortTitle: string; description: string }> = {
  '01': {
    shortTitle: 'Introducción y Workbench',
    description: 'Qué es MySQL, instalación y primer contacto con MySQL Workbench como entorno de trabajo.',
  },
  '02': {
    shortTitle: 'Creación y manipulación',
    description: 'DDL: CREATE, ALTER y DROP. Tipos de datos, claves primarias y restricciones básicas.',
  },
  '03': {
    shortTitle: 'Consultas y filtros',
    description: 'SELECT, WHERE, ORDER BY y LIMIT trabajando con las bases de datos Sakila y World.',
  },
  '04': {
    shortTitle: 'Agregadas y agrupación',
    description: 'COUNT, SUM, AVG, MIN y MAX combinados con GROUP BY y HAVING para producir resúmenes.',
  },
  '05': {
    shortTitle: 'Relaciones entre tablas',
    description: 'INNER, LEFT, RIGHT y FULL JOIN. Cuándo usar cada uno y cómo razonarlos visualmente.',
  },
  '06': {
    shortTitle: 'Subconsultas y avanzado',
    description: 'Subconsultas escalares, correlacionadas, EXISTS, IN y CTEs con WITH.',
  },
  '07': {
    shortTitle: 'Optimización',
    description: 'Índices, EXPLAIN, normalización y convenciones. Cierre del módulo con el proyecto final.',
  },
};

const fullTitleByNumber: Record<string, string> = {};
for (const l of lessons) fullTitleByNumber[l.topicNumber] = l.topic;

export const topics: Topic[] = Object.keys(TOPIC_META).map((num) => {
  const topicLessons = lessons.filter((l) => l.topicNumber === num);
  const meta = TOPIC_META[num];
  return {
    number: num,
    title: fullTitleByNumber[num] ?? meta.shortTitle,
    shortTitle: meta.shortTitle,
    description: meta.description,
    classCount: topicLessons.length,
    estimatedTime: estimateTotal(topicLessons),
    lessons: topicLessons,
    hasFinalProject: topicLessons.some((l) => l.type === 'project'),
  };
});

// Topic-level status derived from its lessons.
export function topicStatus(topic: Topic): LessonStatus {
  if (topic.lessons.every((l) => l.status === 'completed')) return 'completed';
  if (topic.lessons.some((l) => l.status !== 'pending')) return 'in-progress';
  return 'pending';
}

// ----------------------------------------------------------------
//  Helpers
// ----------------------------------------------------------------
function estimateTotal(ls: Lesson[]): string {
  let total = 0;
  for (const l of ls) {
    const m = l.estimatedTime.match(/(\d+(?:\.\d+)?)\s*(min|h)/i);
    if (!m) continue;
    const n = parseFloat(m[1]);
    total += m[2].toLowerCase() === 'h' ? n * 60 : n;
  }
  if (total < 60) return `${Math.round(total)} min`;
  const hours = Math.floor(total / 60);
  const mins = Math.round(total % 60);
  return mins ? `${hours} h ${mins.toString().padStart(2, '0')}` : `${hours} h`;
}

export function findLesson(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function findTopic(num: string): Topic | undefined {
  return topics.find((t) => t.number === num);
}

// ----------------------------------------------------------------
//  Module-level summary (used by Home + module hero).
// ----------------------------------------------------------------
export const sqlModule = {
  slug: 'sql',
  name: 'SQL',
  longName: 'SQL · Bases de datos relacionales',
  short: 'Modelado, consultas, JOINs, agregaciones, subconsultas y optimización con MySQL.',
  totalTopics: topics.length,
  totalLessons: lessons.length,
  totalTime: estimateTotal(lessons),
  difficulty: 'Intermedio',
  hasFinalProject: true,
  finalProjectSlug: 'proyecto-final',
};
