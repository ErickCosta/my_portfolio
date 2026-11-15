import type { L10n, Pillar } from '@/lib/types';

export interface PillarRecord {
  id: Pillar;
  /** Short exact label: Software / Data / AI (used in filters and tags). */
  shortLabel: L10n;
  /** Full pillar title (spec section 14). */
  title: L10n;
  /** One-sentence capability statement (expertise card). */
  statement: L10n;
  /** Short line for the hero card. */
  heroLine: L10n;
  /** "What I do" section: service name and description (a capability, not a promise). */
  serviceTitle: L10n;
  serviceDescription: L10n;
  /** Short "what I do" lines. */
  does: L10n[];
  /** Representative career evidence: role ids, linked as #role-<id>. */
  evidenceRoleIds: string[];
}

/** The three equal areas of expertise, always in this order. */
export const pillars: PillarRecord[] = [
  {
    id: 'software',
    shortLabel: { en: 'Software', 'pt-BR': 'Software' },
    title: { en: 'Software Engineering', 'pt-BR': 'Engenharia de Software' },
    statement: {
      en: 'Backends, APIs and interfaces designed for delivery, from research prototypes to production products.',
      'pt-BR': 'Back-ends, APIs e interfaces pensados para a entrega, de protótipos de pesquisa a produtos em produção.',
    },
    heroLine: {
      en: 'Backends, APIs and interfaces, from design to delivery.',
      'pt-BR': 'Back-ends, APIs e interfaces, do desenho à entrega.',
    },
    serviceTitle: {
      en: 'Software Engineering & Product Development',
      'pt-BR': 'Engenharia de Software e Desenvolvimento de Produtos',
    },
    serviceDescription: {
      en: 'I design and build backends, frontends and APIs, and look after the delivery of the product around them.',
      'pt-BR': 'Projeto e construo back-ends, front-ends e APIs, e cuido da entrega do produto em torno deles.',
    },
    does: [
      { en: 'Backend and frontend development', 'pt-BR': 'Desenvolvimento back-end e front-end' },
      { en: 'System design and APIs', 'pt-BR': 'Desenho de sistemas e APIs' },
      { en: 'Product engineering and delivery', 'pt-BR': 'Engenharia de produto e entrega' },
    ],
    evidenceRoleIds: ['gria-coordinator', 'virtus-analyst', 'embedded-analyst'],
  },
  {
    id: 'data',
    shortLabel: { en: 'Data', 'pt-BR': 'Dados' },
    title: { en: 'Data Engineering & Architecture', 'pt-BR': 'Engenharia e Arquitetura de Dados' },
    statement: {
      en: 'Pipelines, platforms and governance that analytics and AI can stand on.',
      'pt-BR': 'Pipelines, plataformas e governança sobre os quais analytics e IA podem se apoiar.',
    },
    heroLine: {
      en: 'Data platforms, pipelines and governance.',
      'pt-BR': 'Plataformas, pipelines e governança de dados.',
    },
    serviceTitle: {
      en: 'Data Engineering, Architecture & Governance',
      'pt-BR': 'Engenharia, Arquitetura e Governança de Dados',
    },
    serviceDescription: {
      en: 'I build the collection, processing and storage layers on cloud platforms, with security and governance in the design.',
      'pt-BR':
        'Construo as camadas de coleta, processamento e armazenamento em plataformas de nuvem, com segurança e governança desde o desenho.',
    },
    does: [
      { en: 'Data engineering and ETL/ELT', 'pt-BR': 'Engenharia de dados e ETL/ELT' },
      { en: 'Cloud architecture and storage', 'pt-BR': 'Arquitetura em nuvem e armazenamento' },
      { en: 'Security and governance', 'pt-BR': 'Segurança e governança' },
    ],
    evidenceRoleIds: ['techlead-leader', 'gria-data-tech-leader', 'borborema-founder'],
  },
  {
    id: 'ai',
    shortLabel: { en: 'AI', 'pt-BR': 'IA' },
    title: { en: 'Artificial Intelligence', 'pt-BR': 'Inteligência Artificial' },
    statement: {
      en: 'Applied machine learning, NLP and LLM-based systems, rooted in research and product work.',
      'pt-BR': 'Machine learning aplicado, PLN e sistemas baseados em LLMs, com raízes na pesquisa e no trabalho de produto.',
    },
    heroLine: {
      en: 'Machine learning, NLP and LLM-based systems.',
      'pt-BR': 'Machine learning, PLN e sistemas com LLMs.',
    },
    serviceTitle: {
      en: 'Artificial Intelligence (ML, NLP, LLMs & GenAI)',
      'pt-BR': 'Inteligência Artificial (ML, PLN, LLMs e IA Generativa)',
    },
    serviceDescription: {
      en: 'I apply machine learning, NLP and language models to concrete problems, from the research question to a running system.',
      'pt-BR':
        'Aplico machine learning, PLN e modelos de linguagem a problemas concretos, da pergunta de pesquisa ao sistema em funcionamento.',
    },
    does: [
      { en: 'Machine learning and NLP', 'pt-BR': 'Machine learning e PLN' },
      { en: 'Deep learning', 'pt-BR': 'Deep learning' },
      { en: 'LLM-based systems and GenAI', 'pt-BR': 'Sistemas com LLMs e IA generativa' },
    ],
    evidenceRoleIds: ['lacina-data-scientist', 'gria-data-tech-leader', 'techlead-manager'],
  },
];

/** Transversal capability: a supporting strength, never a fourth pillar. */
export const leadership: { title: L10n; description: L10n } = {
  title: { en: 'Technical Leadership & Product Delivery', 'pt-BR': 'Liderança Técnica e Entrega de Produto' },
  description: {
    en: 'Leading engineering and data teams, technical backlog and scope, and agile delivery across all three areas.',
    'pt-BR': 'Liderança de times de engenharia e dados, backlog técnico, escopo e entrega ágil nas três áreas.',
  },
};
