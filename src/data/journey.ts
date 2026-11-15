import type { L10n } from '@/lib/types';

export type JourneyIcon = 'research' | 'software' | 'teaching' | 'data' | 'leadership' | 'ai';

/**
 * Key milestones on the horizontal journey line, oldest first. Each milestone
 * points at real role ids in `experience.ts`; its period is computed from those
 * roles, so dates always match the career record. Text is written from spec §4 only.
 */
export interface Milestone {
  id: string;
  icon: JourneyIcon;
  title: L10n;
  org: L10n;
  text: L10n;
  roleIds: string[];
  highlight?: boolean;
}

export const milestones: Milestone[] = [
  {
    id: 'early',
    icon: 'research',
    title: { en: 'Early research & software development', 'pt-BR': 'Pesquisa e desenvolvimento de software' },
    org: {
      en: 'UFPB, LAVID, LDMI, UFCG, Software Practices Lab',
      'pt-BR': 'UFPB, LAVID, LDMI, UFCG, Software Practices Lab',
    },
    text: {
      en: 'Research and developer roles: digital TV middleware validation, a web portal, computing education materials and an R&D project for DL Eletroeletrônicos.',
      'pt-BR':
        'Funções de pesquisa e desenvolvimento: validação de middleware de TV digital, um portal web, materiais de educação em computação e um projeto de P&D para a DL Eletroeletrônicos.',
    },
    roleIds: ['ufpb-researcher', 'lavid-intern', 'ldmi-intern', 'ufcg-researcher', 'splab-developer'],
  },
  {
    id: 'rd-analyst',
    icon: 'software',
    title: { en: 'Software Engineering Analyst', 'pt-BR': 'Analista de Engenharia de Software' },
    org: { en: 'Embedded Lab / Virtus, UFCG', 'pt-BR': 'Embedded Lab / Virtus, UFCG' },
    text: {
      en: 'R&D cooperation with Ingenico Brasil, Nice Brasil and Compal Brasil, in Java and C#/.NET.',
      'pt-BR': 'Cooperação de P&D com Ingenico Brasil, Nice Brasil e Compal Brasil, em Java e C#/.NET.',
    },
    roleIds: ['embedded-analyst', 'virtus-analyst'],
  },
  {
    id: 'teaching',
    icon: 'teaching',
    title: { en: 'Computer Science Teacher', 'pt-BR': 'Professor de Ciência da Computação' },
    org: { en: 'IFPB, Maurício de Nassau, Unipê', 'pt-BR': 'IFPB, Maurício de Nassau, Unipê' },
    text: {
      en: 'Taught programming, web, mobile and information systems, and coordinated extension projects at IFPB.',
      'pt-BR': 'Lecionei programação, web, mobile e sistemas de informação, e coordenei projetos de extensão no IFPB.',
    },
    roleIds: ['unipe-teacher', 'nassau-teacher', 'ifpb-teacher'],
  },
  {
    id: 'lacina',
    icon: 'data',
    title: { en: 'Data Scientist', 'pt-BR': 'Cientista de Dados' },
    org: { en: 'LACINA', 'pt-BR': 'LACINA' },
    text: {
      en: 'R&D cooperation with Dell EMC: NLP and ML to predict conflicts in customer service interactions.',
      'pt-BR': 'Cooperação de P&D com a Dell EMC: PLN e ML para prever conflitos em interações de atendimento.',
    },
    roleIds: ['lacina-data-scientist'],
  },
  {
    id: 'gria',
    icon: 'leadership',
    title: {
      en: 'Software Engineering Coordinator, Technical Product Owner, Data Tech Leader',
      'pt-BR': 'Coordenador de Engenharia, Product Owner Técnico, Líder Técnico de Dados',
    },
    org: { en: 'Gria', 'pt-BR': 'Gria' },
    text: {
      en: 'From coordinating engineering to owning the technical backlog and directing data work.',
      'pt-BR': 'De coordenar a engenharia a cuidar do backlog técnico e direcionar o trabalho de dados.',
    },
    roleIds: ['gria-coordinator', 'gria-tpo', 'gria-data-tech-leader'],
  },
  {
    id: 'techlead-leader',
    icon: 'data',
    title: { en: 'Data Team Leader', 'pt-BR': 'Líder do Time de Dados' },
    org: { en: 'Techlead IT Solutions', 'pt-BR': 'Techlead IT Solutions' },
    text: {
      en: 'Led the data team: security and governance, data collection and processing.',
      'pt-BR': 'Liderei o time de dados: segurança, governança, coleta e processamento de dados.',
    },
    roleIds: ['techlead-leader'],
  },
  {
    id: 'techlead-manager',
    icon: 'ai',
    title: { en: 'Data & AI Manager', 'pt-BR': 'Gerente de Dados e IA' },
    org: { en: 'Techlead IT Solutions', 'pt-BR': 'Techlead IT Solutions' },
    text: {
      en: 'Ran the unit across commercial, delivery and innovation, with data, AI, ML and agent initiatives.',
      'pt-BR':
        'Gerenciei a unidade nas frentes comercial, de entrega e de inovação, com iniciativas de dados, IA, ML e agentes.',
    },
    roleIds: ['techlead-manager'],
  },
  {
    id: 'borborema',
    icon: 'ai',
    title: { en: 'Founder & Data & AI Strategist', 'pt-BR': 'Fundador e Estrategista de Dados e IA' },
    org: { en: 'Borborema Tech', 'pt-BR': 'Borborema Tech' },
    text: {
      en: 'Data & AI projects and platforms, with governance, data engineering and ML/LLM product development.',
      'pt-BR':
        'Projetos e plataformas de Dados e IA, com governança, engenharia de dados e desenvolvimento de produtos de ML e LLMs.',
    },
    roleIds: ['borborema-founder'],
    highlight: true,
  },
];
