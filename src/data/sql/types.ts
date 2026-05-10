export type LessonType = 'theory' | 'exercise' | 'project' | 'setup';
export type LessonStatus = 'pending' | 'in-progress' | 'completed';
export type ContentStatus = 'empty' | 'draft' | 'completed';
export type Difficulty = 1 | 2 | 3 | 4;
export type CalloutVariant = 'note' | 'tip' | 'warn' | 'err';

// ----------------------------------------------------------------
//  Bloques de contenido estructurado
// ----------------------------------------------------------------

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; variant: CalloutVariant; title?: string; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] };

export interface ContentSection {
  heading?: string;
  blocks: ContentBlock[];
}

export interface KeyConcept {
  term: string;
  definition: string;
}

export interface CodeExample {
  label: string;
  lang?: string;
  code: string;
  note?: string;
}

export interface ChecklistItem {
  text: string;
}

// ----------------------------------------------------------------
//  Lección y Tema
// ----------------------------------------------------------------

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

  summary: string | null;
  keyConcepts: KeyConcept[];
  contenido: ContentSection[];
  codeExamples: CodeExample[];
  errores: string[];
  practicas: string[];
  ejercicios: string[];
  checklist: ChecklistItem[];

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

// Tipo para definir lecciones antes de calcular prev/next/order
export type RawLesson = Omit<Lesson, 'previousSlug' | 'nextSlug' | 'order'>;