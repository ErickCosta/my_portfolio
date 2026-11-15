import type { L10n } from '@/lib/types';

export interface Degree {
  id: string;
  degree: L10n;
  field: L10n;
  institution: string;
  start: string;
  end: string;
}

/** Source: SDDD v1.1 section 4, Education. */
export const degrees: Degree[] = [
  {
    id: 'phd',
    degree: { en: 'PhD', 'pt-BR': 'Doutorado' },
    field: { en: 'Computer Science', 'pt-BR': 'Ciência da Computação' },
    institution: 'Universidade Federal de Campina Grande',
    start: '2018',
    end: '2022',
  },
  {
    id: 'msc',
    degree: { en: 'MSc', 'pt-BR': 'Mestrado' },
    field: { en: 'Computer Science', 'pt-BR': 'Ciência da Computação' },
    institution: 'Universidade Federal de Campina Grande',
    start: '2014',
    end: '2017',
  },
  {
    id: 'licenciatura',
    degree: { en: 'Teaching degree (Licenciatura)', 'pt-BR': 'Licenciatura' },
    field: { en: 'Computer Science', 'pt-BR': 'Ciência da Computação' },
    institution: 'Universidade Federal da Paraíba',
    start: '2009',
    end: '2013',
  },
];

export interface TeachingItem {
  id: string;
  institution: string;
  title: L10n;
  period: string;
  topics: L10n;
}

export const teaching: TeachingItem[] = [
  {
    id: 'ifpb',
    institution: 'IFPB',
    title: { en: 'Computer Science Teacher', 'pt-BR': 'Professor de Ciência da Computação' },
    period: '2018–2020',
    topics: {
      en: 'Programming, OOP, web, testing, operating systems, hardware/software; extension coordination.',
      'pt-BR': 'Programação, POO, web, testes, sistemas operacionais, hardware/software; coordenação de extensão.',
    },
  },
  {
    id: 'nassau',
    institution: 'Faculdade Maurício de Nassau',
    title: { en: 'Information System Teacher', 'pt-BR': 'Professor de Sistemas de Informação' },
    period: '2017–2018',
    topics: {
      en: 'Operational environments, mobile development, configuration management, methodologies.',
      'pt-BR': 'Ambientes operacionais, desenvolvimento mobile, gerência de configuração, metodologias.',
    },
  },
  {
    id: 'unipe',
    institution: 'Unipê',
    title: { en: 'Mobile Development Teacher', 'pt-BR': 'Professor de Desenvolvimento Mobile' },
    period: '2017–2018',
    topics: { en: 'Android, Swift and iOS subjects.', 'pt-BR': 'Disciplinas de Android, Swift e iOS.' },
  },
];

export interface RdCooperation {
  id: string;
  partner: string;
  lab: string;
  period: string;
  topic: L10n;
}

export const rdCooperations: RdCooperation[] = [
  {
    id: 'dell',
    partner: 'Dell EMC',
    lab: 'LACINA',
    period: '2019–2021',
    topic: {
      en: 'NLP/ML to predict conflicts in customer service interactions.',
      'pt-BR': 'NLP/ML para prever conflitos em interações de atendimento ao cliente.',
    },
  },
  {
    id: 'nice-compal',
    partner: 'Nice Brasil, Compal Brasil',
    lab: 'Virtus/UFCG',
    period: '2017–2018',
    topic: {
      en: 'Geolocation-based warehousing and support.',
      'pt-BR': 'Armazenagem e suporte baseados em geolocalização.',
    },
  },
  {
    id: 'ingenico',
    partner: 'Ingenico Brasil',
    lab: 'Embedded Lab/UFCG',
    period: '2016–2017',
    topic: { en: 'Java-based R&D cooperation.', 'pt-BR': 'Cooperação de P&D em Java.' },
  },
  {
    id: 'dl',
    partner: 'DL Eletroeletrônicos',
    lab: 'Software Practices Laboratory',
    period: '2015–2016',
    topic: { en: 'Software development R&D cooperation.', 'pt-BR': 'Cooperação de P&D em desenvolvimento de software.' },
  },
  {
    id: 'brazil4d',
    partner: 'Brazil 4D',
    lab: 'LAVID',
    period: '2012–2013',
    topic: {
      en: 'PPB-Ginga digital TV middleware validation.',
      'pt-BR': 'Validação de middleware de TV digital PPB-Ginga.',
    },
  },
];
