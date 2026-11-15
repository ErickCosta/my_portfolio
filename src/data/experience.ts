import type { L10n, Locale } from '@/lib/types';

export type RoleKind = 'industry' | 'teaching' | 'research';
/** Roles sharing a group id overlapped in time and are shown as parallel work. */
export type ConcurrentGroup = 'g2017' | 'g2018' | 'g2009';

/** Dates: 'YYYY-MM' (month precision) or 'YYYY' (year precision, as given by the source). */
export interface Role {
  id: string;
  title: L10n;
  start: string;
  end: string | 'present';
  summary: L10n;
  technologies: string[];
  kind: RoleKind;
  concurrent?: ConcurrentGroup;
}

export interface Organization {
  id: string;
  name: string;
  roles: Role[];
}

/** Reverse chronological. Source: SDDD v1.1 section 4 (LinkedIn export). */
export const organizations: Organization[] = [
  {
    id: 'borborema',
    name: 'Borborema Tech',
    roles: [
      {
        id: 'borborema-founder',
        title: { en: 'Founder & Data & AI Strategist', 'pt-BR': 'Fundador e Estrategista de Dados e IA' },
        start: '2026-01',
        end: 'present',
        summary: {
          en: 'Data & AI projects and platforms, with governance, data engineering and ML/LLM product development.',
          'pt-BR': 'Projetos e plataformas de Dados e IA, com governança, engenharia de dados e desenvolvimento de produtos de ML e LLMs.',
        },
        technologies: [],
        kind: 'industry',
      },
    ],
  },
  {
    id: 'techlead',
    name: 'Techlead IT Solutions',
    roles: [
      {
        id: 'techlead-manager',
        title: { en: 'Data & AI Manager', 'pt-BR': 'Gerente de Dados e IA' },
        start: '2024-06',
        end: '2025-12',
        summary: {
          en: 'Ran the unit across commercial, delivery and innovation, with data, AI, ML and agent initiatives.',
          'pt-BR': 'Gestão da unidade nas frentes comercial, de entrega e de inovação; iniciativas de dados, IA, ML e agentes.',
        },
        technologies: [],
        kind: 'industry',
      },
      {
        id: 'techlead-leader',
        title: { en: 'Data Team Leader', 'pt-BR': 'Líder do Time de Dados' },
        start: '2023-04',
        end: '2024-06',
        summary: {
          en: 'Led the data team: security and governance, data collection and processing.',
          'pt-BR': 'Liderança do time de dados: segurança, governança, coleta e processamento de dados.',
        },
        technologies: ['Jira', 'Git', 'AWS', 'Databricks', 'Spark', 'SQL'],
        kind: 'industry',
      },
    ],
  },
  {
    id: 'gria',
    name: 'Gria',
    roles: [
      {
        id: 'gria-data-tech-leader',
        title: { en: 'Data Tech Leader', 'pt-BR': 'Líder Técnico de Dados' },
        start: '2023-01',
        end: '2023-03',
        summary: {
          en: 'Refined and steered the engineering, data science and analytics work.',
          'pt-BR': 'Refinamento e direção do trabalho de engenharia, ciência de dados e analytics.',
        },
        technologies: ['Python', 'scikit-learn', 'pandas', 'NumPy', 'TensorFlow', 'ETL', 'NLP', 'LLM-based systems', 'AWS', 'MongoDB', 'PostgreSQL', 'Git'],
        kind: 'industry',
      },
      {
        id: 'gria-tpo',
        title: { en: 'Technical Product Owner', 'pt-BR': 'Product Owner Técnico' },
        start: '2022-01',
        end: '2022-12',
        summary: {
          en: 'Owned the technical backlog, engineering priorities, scope and agile delivery.',
          'pt-BR': 'Backlog técnico, prioridades de engenharia de produto, escopo e entrega ágil.',
        },
        technologies: [],
        kind: 'industry',
      },
      {
        id: 'gria-coordinator',
        title: { en: 'Software Engineering Coordinator', 'pt-BR': 'Coordenador de Engenharia de Software' },
        start: '2021-01',
        end: '2021-12',
        summary: {
          en: 'Supported the engineering and quality teams and the delivery of features.',
          'pt-BR': 'Apoio às equipes de engenharia e qualidade e à entrega de funcionalidades.',
        },
        technologies: ['JavaScript', 'Node.js', 'React', 'JWT', 'MongoDB', 'PostgreSQL', 'Git'],
        kind: 'industry',
      },
    ],
  },
  {
    id: 'lacina',
    name: 'LACINA',
    roles: [
      {
        id: 'lacina-data-scientist',
        title: { en: 'Data Scientist', 'pt-BR': 'Cientista de Dados' },
        start: '2019',
        end: '2021',
        summary: {
          en: 'R&D cooperation with Dell EMC: NLP and ML to predict conflicts in customer service interactions.',
          'pt-BR': 'Cooperação de P&D com a Dell EMC: PLN e ML para prever conflitos em interações de atendimento ao cliente.',
        },
        technologies: ['Python', 'JavaScript', 'Django', 'Celery', 'Redis', 'Node.js', 'React', 'pandas', 'NumPy', 'scikit-learn', 'Keras'],
        kind: 'research',
        concurrent: 'g2018',
      },
    ],
  },
  {
    id: 'ifpb',
    name: 'IFPB',
    roles: [
      {
        id: 'ifpb-teacher',
        title: { en: 'Computer Science Teacher', 'pt-BR': 'Professor de Ciência da Computação' },
        start: '2018',
        end: '2020',
        summary: {
          en: 'Programming, OOP, web, testing, operating systems, hardware/software; extension coordination.',
          'pt-BR': 'Programação, POO, web, testes, sistemas operacionais, hardware/software; coordenação de extensão.',
        },
        technologies: [],
        kind: 'teaching',
        concurrent: 'g2018',
      },
    ],
  },
  {
    id: 'virtus',
    name: 'Virtus/UFCG',
    roles: [
      {
        id: 'virtus-analyst',
        title: { en: 'Software Engineering Analyst', 'pt-BR': 'Analista de Engenharia de Software' },
        start: '2017',
        end: '2018',
        summary: {
          en: 'R&D cooperation with Nice Brasil and Compal Brasil: geolocation-based warehousing and support.',
          'pt-BR': 'Cooperação de P&D com Nice Brasil e Compal Brasil: armazenagem e suporte baseados em geolocalização.',
        },
        technologies: ['C#', '.NET', 'Node.js', 'AngularJS', 'MongoDB', 'PostgreSQL'],
        kind: 'research',
        concurrent: 'g2017',
      },
    ],
  },
  {
    id: 'nassau',
    name: 'Faculdade Maurício de Nassau',
    roles: [
      {
        id: 'nassau-teacher',
        title: { en: 'Information System Teacher', 'pt-BR': 'Professor de Sistemas de Informação' },
        start: '2017',
        end: '2018',
        summary: {
          en: 'Operational environments, mobile development, configuration management and methodologies.',
          'pt-BR': 'Ambientes operacionais, desenvolvimento mobile, gerência de configuração e metodologias.',
        },
        technologies: [],
        kind: 'teaching',
        concurrent: 'g2017',
      },
    ],
  },
  {
    id: 'unipe',
    name: 'Unipê',
    roles: [
      {
        id: 'unipe-teacher',
        title: { en: 'Mobile Development Teacher', 'pt-BR': 'Professor de Desenvolvimento Mobile' },
        start: '2017',
        end: '2018',
        summary: {
          en: 'Android, Swift and iOS subjects.',
          'pt-BR': 'Disciplinas de Android, Swift e iOS.',
        },
        technologies: ['Android', 'Swift', 'iOS'],
        kind: 'teaching',
        concurrent: 'g2017',
      },
    ],
  },
  {
    id: 'embedded',
    name: 'Embedded Lab/UFCG',
    roles: [
      {
        id: 'embedded-analyst',
        title: { en: 'Software Engineering Analyst', 'pt-BR': 'Analista de Engenharia de Software' },
        start: '2016',
        end: '2017',
        summary: {
          en: 'R&D cooperation with Ingenico Brasil.',
          'pt-BR': 'Cooperação de P&D com a Ingenico Brasil.',
        },
        technologies: ['Java', 'Spring', 'Hibernate', 'MySQL', 'JavaFX'],
        kind: 'research',
      },
    ],
  },
  {
    id: 'splab',
    name: 'Software Practices Laboratory',
    roles: [
      {
        id: 'splab-developer',
        title: { en: 'Junior Software Developer', 'pt-BR': 'Desenvolvedor de Software Júnior' },
        start: '2015',
        end: '2016',
        summary: {
          en: 'R&D cooperation with DL Eletroeletrônicos.',
          'pt-BR': 'Cooperação de P&D com a DL Eletroeletrônicos.',
        },
        technologies: ['Spring', 'Hibernate', 'MySQL', 'JSF'],
        kind: 'research',
      },
    ],
  },
  {
    id: 'ufcg',
    name: 'UFCG',
    roles: [
      {
        id: 'ufcg-researcher',
        title: { en: 'Tech Researcher', 'pt-BR': 'Pesquisador Tecnológico' },
        start: '2014',
        end: '2015',
        summary: {
          en: 'Fapesq-PB scholarship; computing education materials.',
          'pt-BR': 'Bolsa Fapesq-PB; materiais de educação em computação.',
        },
        technologies: [],
        kind: 'research',
      },
    ],
  },
  {
    id: 'ldmi',
    name: 'LDMI',
    roles: [
      {
        id: 'ldmi-intern',
        title: { en: 'Software Developer Intern', 'pt-BR': 'Estagiário Desenvolvedor de Software' },
        start: '2013',
        end: '2014',
        summary: {
          en: 'PHP/WordPress web portal.',
          'pt-BR': 'Portal web em PHP/WordPress.',
        },
        technologies: ['PHP', 'WordPress'],
        kind: 'industry',
        concurrent: 'g2009',
      },
    ],
  },
  {
    id: 'ufpb',
    name: 'UFPB',
    roles: [
      {
        id: 'ufpb-researcher',
        title: { en: 'Tech Researcher Intern', 'pt-BR': 'Estagiário Pesquisador Tecnológico' },
        start: '2009',
        end: '2014',
        summary: {
          en: 'PIBID, PROLICEN, teaching assistance (monitoria), ProInfo and PROUCA.',
          'pt-BR': 'PIBID, PROLICEN, monitoria, ProInfo e PROUCA.',
        },
        technologies: [],
        kind: 'research',
        concurrent: 'g2009',
      },
    ],
  },
  {
    id: 'lavid',
    name: 'LAVID',
    roles: [
      {
        id: 'lavid-intern',
        title: { en: 'Software Engineer Intern', 'pt-BR': 'Estagiário Engenheiro de Software' },
        start: '2012',
        end: '2013',
        summary: {
          en: 'Validation of the Brazil 4D/PPB-Ginga digital TV middleware.',
          'pt-BR': 'Validação do middleware de TV digital Brazil 4D/PPB-Ginga.',
        },
        technologies: ['Java', 'GingaJ'],
        kind: 'research',
        concurrent: 'g2009',
      },
    ],
  },
];

export const allRoles: Role[] = organizations.flatMap((o) => o.roles);

const MONTHS: Record<Locale, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  'pt-BR': ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
};

export function formatDate(value: string, locale: Locale, presentLabel: string): string {
  if (value === 'present') return presentLabel;
  const [year, month] = value.split('-');
  return month ? `${MONTHS[locale][Number(month) - 1]} ${year}` : year;
}

export function formatPeriod(start: string, end: string, locale: Locale, presentLabel: string): string {
  const s = formatDate(start, locale, presentLabel);
  const e = formatDate(end, locale, presentLabel);
  return s === e ? s : `${s} – ${e}`;
}

/** Numeric sort key: 'present' is newest. */
export function dateValue(value: string): number {
  if (value === 'present') return Number.POSITIVE_INFINITY;
  const [y, m] = value.split('-');
  return Number(y) + (m ? (Number(m) - 1) / 12 : 0);
}

export function orgSpan(org: Organization): { start: string; end: string } {
  const start = org.roles.reduce((a, r) => (dateValue(r.start) < dateValue(a) ? r.start : a), org.roles[0].start);
  const end = org.roles.reduce((a, r) => (dateValue(r.end) > dateValue(a) ? r.end : a), org.roles[0].end);
  return { start, end };
}

/** Look up a role (and its organization) by role id. */
export function findRole(id: string): { org: Organization; role: Role } | undefined {
  for (const org of organizations) {
    const role = org.roles.find((r) => r.id === id);
    if (role) return { org, role };
  }
  return undefined;
}

/** Organizations that held a role in the same concurrent group, excluding `orgId`. */
export function parallelOrgs(group: ConcurrentGroup | undefined, orgId: string): Organization[] {
  if (!group) return [];
  return organizations.filter((o) => o.id !== orgId && o.roles.some((r) => r.concurrent === group));
}
