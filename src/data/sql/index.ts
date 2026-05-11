export type {
  LessonType, LessonStatus, ContentStatus, Difficulty, CalloutVariant,
  ContentBlock, ContentSection, KeyConcept, CodeExample, ChecklistItem,
  Lesson, Topic, RawLesson,
} from './types';

import type { Lesson, Topic, LessonStatus } from './types';
import { topic01 } from './topic-01';
import { topic02 } from './topic-02';
import { topic03 } from './topic-03';
import { topic04 } from './topic-04';
import { topic05 } from './topic-05';
import { topic06 } from './topic-06';
import { topic07 } from './topic-07';
import { topic08 } from './topic-08';

// ----------------------------------------------------------------
//  Ensamblar lecciones con prev/next/order
// ----------------------------------------------------------------

const RAW = [
  ...topic01,
  ...topic02,
  ...topic03,
  ...topic04,
  ...topic05,
  ...topic06,
  ...topic07,
  ...topic08,
];

export const lessons: Lesson[] = RAW.map((raw, i) => ({
  ...raw,
  order: i,
  previousSlug: i > 0 ? RAW[i - 1].slug : null,
  nextSlug: i < RAW.length - 1 ? RAW[i + 1].slug : null,
}));

// ----------------------------------------------------------------
//  Metadata de temas
// ----------------------------------------------------------------

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
    description: 'Índices, EXPLAIN, normalización y convenciones de diseño para bases de datos de producción.',
  },
  '08': {
    shortTitle: 'Proyecto final',
    description: 'Sistema de gestión de biblioteca construido desde cero integrando todos los conceptos del módulo.',
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

// ----------------------------------------------------------------
//  Funciones de consulta
// ----------------------------------------------------------------

export function topicStatus(topic: Topic): LessonStatus {
  if (topic.lessons.every((l) => l.status === 'completed')) return 'completed';
  if (topic.lessons.some((l) => l.status !== 'pending')) return 'in-progress';
  return 'pending';
}

export function findLesson(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function findTopic(num: string): Topic | undefined {
  return topics.find((t) => t.number === num);
}

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

// ----------------------------------------------------------------
//  Resumen del módulo
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
