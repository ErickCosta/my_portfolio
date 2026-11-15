import type { L10n, Pillar } from '@/lib/types';

/** An approved, publicly describable case study. Add entries only after owner and disclosure approval. */
export interface CaseStudy {
  id: string;
  title: L10n;
  context: L10n;
  role: L10n;
  architecture: L10n;
  stack: string[];
  constraints: L10n;
  outcomes: L10n;
  confidentiality: L10n;
  pillars: Pillar[];
}

/** Intentionally empty: no case study has been approved yet. */
export const approvedCaseStudies: CaseStudy[] = [];

export interface Capability {
  id: string;
  title: L10n;
  description: L10n;
  /** Always in Software, Data, AI order. */
  pillars: Pillar[];
}

/** Illustrative solution categories. These are capabilities, NOT projects. */
export const capabilities: Capability[] = [
  {
    id: 'product-engineering',
    title: { en: 'Product engineering', 'pt-BR': 'Engenharia de produto' },
    description: {
      en: 'Web applications and APIs, from system design to delivery.',
      'pt-BR': 'Aplicações web e APIs, do desenho do sistema à entrega.',
    },
    pillars: ['software'],
  },
  {
    id: 'data-pipelines',
    title: { en: 'Data pipelines', 'pt-BR': 'Pipelines de dados' },
    description: {
      en: 'Collection and processing of data with ETL/ELT.',
      'pt-BR': 'Coleta e processamento de dados com ETL/ELT.',
    },
    pillars: ['data'],
  },
  {
    id: 'data-platforms',
    title: { en: 'Data platforms and governance', 'pt-BR': 'Plataformas de dados e governança' },
    description: {
      en: 'Cloud architecture with lakehouses and warehouses, plus security and governance.',
      'pt-BR': 'Arquitetura em nuvem com lakehouses e data warehouses, além de segurança e governança.',
    },
    pillars: ['software', 'data'],
  },
  {
    id: 'applied-ml',
    title: { en: 'Applied machine learning and NLP', 'pt-BR': 'Machine learning aplicado e PLN' },
    description: {
      en: 'Models for language and prediction problems, taken from research to production.',
      'pt-BR': 'Modelos para problemas de linguagem e predição, da pesquisa à produção.',
    },
    pillars: ['data', 'ai'],
  },
  {
    id: 'llm-genai',
    title: { en: 'LLM and GenAI products', 'pt-BR': 'Produtos com LLMs e IA generativa' },
    description: {
      en: 'Products built on top of large language models.',
      'pt-BR': 'Produtos construídos sobre grandes modelos de linguagem.',
    },
    pillars: ['software', 'ai'],
  },
  {
    id: 'technical-delivery',
    title: { en: 'Technical leadership and delivery', 'pt-BR': 'Liderança técnica e entrega' },
    description: {
      en: 'Backlog, scope and agile delivery for software, data and AI teams.',
      'pt-BR': 'Backlog, escopo e entrega ágil para times de software, dados e IA.',
    },
    pillars: ['software', 'data', 'ai'],
  },
];
