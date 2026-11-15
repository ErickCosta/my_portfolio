import type { SimpleIcon } from 'simple-icons';
import {
  siPython,
  siApachespark,
  siDatabricks,
  siPostgresql,
  siMongodb,
  siJavascript,
  siNodedotjs,
  siReact,
  siPandas,
  siNumpy,
  siScikitlearn,
  siGit,
  siDjango,
  siCelery,
  siRedis,
  siTensorflow,
  siKeras,
  siWordpress,
  siMysql,
  siSpring,
  siDotnet,
  siJsonwebtokens,
  siJira,
  siHibernate,
  siHtml5,
  siAndroid,
  siSwift,
} from 'simple-icons';
import type { Pillar } from '@/lib/types';

export type TechCategory =
  | 'language'
  | 'framework'
  | 'library'
  | 'data-platform'
  | 'cloud'
  | 'database'
  | 'ml'
  | 'tool'
  | 'practice';

export type TechTier = 'core' | 'applied' | 'earlier';

export interface Technology {
  id: string;
  name: string;
  pillars: Pillar[];
  category: TechCategory;
  tier: TechTier;
  /** Role ids (#role-<id>) where the spec lists this technology. */
  evidenceRoleIds: string[];
  /** Simple Icons export, or null -> neutral category icon. */
  icon: SimpleIcon | null;
  /**
   * Optional owner-set level for the bar (1-5). When absent the level is derived
   * from the tier: core = 5, applied (Project Experience) = 4, earlier = 3.
   * Derived levels are provisional (recency grouping of the LinkedIn profile),
   * not a measured score. Set `level` on a record to override it.
   */
  level?: 1 | 2 | 3 | 4 | 5;
}

const TIER_LEVEL: Record<TechTier, 1 | 2 | 3 | 4 | 5> = { core: 5, applied: 4, earlier: 3 };

/** Level shown on the bar: the explicit `level`, else derived from the tier. */
export function levelOf(tech: Pick<Technology, 'tier' | 'level'>): 1 | 2 | 3 | 4 | 5 {
  return tech.level ?? TIER_LEVEL[tech.tier];
}

export const technologies: Technology[] = [
  // Core recent
  { id: 'python', name: 'Python', pillars: ['data', 'ai'], category: 'language', tier: 'core', evidenceRoleIds: ['gria-data-tech-leader', 'lacina-data-scientist'], icon: siPython },
  { id: 'sql', name: 'SQL', pillars: ['data'], category: 'language', tier: 'core', evidenceRoleIds: ['techlead-leader'], icon: null },
  { id: 'spark', name: 'Apache Spark', pillars: ['data'], category: 'data-platform', tier: 'core', evidenceRoleIds: ['techlead-leader'], icon: siApachespark },
  { id: 'databricks', name: 'Databricks', pillars: ['data'], category: 'data-platform', tier: 'core', evidenceRoleIds: ['techlead-leader'], icon: siDatabricks },
  { id: 'data-engineering', name: 'Data Engineering', pillars: ['data'], category: 'practice', tier: 'core', evidenceRoleIds: ['borborema-founder', 'techlead-leader', 'gria-data-tech-leader'], icon: null },
  { id: 'aws', name: 'AWS', pillars: ['data'], category: 'cloud', tier: 'core', evidenceRoleIds: ['techlead-leader', 'gria-data-tech-leader'], icon: null },
  // Applied
  { id: 'postgresql', name: 'PostgreSQL', pillars: ['software', 'data'], category: 'database', tier: 'applied', evidenceRoleIds: ['gria-data-tech-leader', 'gria-coordinator', 'virtus-analyst'], icon: siPostgresql },
  { id: 'mongodb', name: 'MongoDB', pillars: ['software', 'data'], category: 'database', tier: 'applied', evidenceRoleIds: ['gria-data-tech-leader', 'gria-coordinator', 'virtus-analyst'], icon: siMongodb },
  { id: 'javascript', name: 'JavaScript', pillars: ['software'], category: 'language', tier: 'applied', evidenceRoleIds: ['gria-coordinator', 'lacina-data-scientist'], icon: siJavascript },
  { id: 'nodejs', name: 'Node.js', pillars: ['software'], category: 'framework', tier: 'applied', evidenceRoleIds: ['gria-coordinator', 'lacina-data-scientist', 'virtus-analyst'], icon: siNodedotjs },
  { id: 'react', name: 'React', pillars: ['software'], category: 'framework', tier: 'applied', evidenceRoleIds: ['gria-coordinator', 'lacina-data-scientist'], icon: siReact },
  { id: 'pandas', name: 'pandas', pillars: ['ai', 'data'], category: 'library', tier: 'applied', evidenceRoleIds: ['gria-data-tech-leader', 'lacina-data-scientist'], icon: siPandas },
  { id: 'numpy', name: 'NumPy', pillars: ['ai', 'data'], category: 'library', tier: 'applied', evidenceRoleIds: ['gria-data-tech-leader', 'lacina-data-scientist'], icon: siNumpy },
  { id: 'scikit-learn', name: 'scikit-learn', pillars: ['ai'], category: 'ml', tier: 'applied', evidenceRoleIds: ['gria-data-tech-leader', 'lacina-data-scientist'], icon: siScikitlearn },
  { id: 'machine-learning', name: 'Machine Learning', pillars: ['ai'], category: 'ml', tier: 'applied', evidenceRoleIds: ['borborema-founder', 'techlead-manager', 'lacina-data-scientist'], icon: null },
  { id: 'nlp', name: 'NLP', pillars: ['ai'], category: 'ml', tier: 'applied', evidenceRoleIds: ['gria-data-tech-leader', 'lacina-data-scientist'], icon: null },
  { id: 'llm', name: 'LLM-based systems', pillars: ['ai'], category: 'ml', tier: 'applied', evidenceRoleIds: ['borborema-founder', 'gria-data-tech-leader'], icon: null },
  { id: 'genai', name: 'GenAI', pillars: ['ai'], category: 'ml', tier: 'applied', evidenceRoleIds: [], icon: null },
  { id: 'git', name: 'Git', pillars: ['software'], category: 'tool', tier: 'applied', evidenceRoleIds: ['techlead-leader', 'gria-data-tech-leader', 'gria-coordinator'], icon: siGit },
  { id: 'etl', name: 'ETL / ELT', pillars: ['data'], category: 'practice', tier: 'applied', evidenceRoleIds: ['gria-data-tech-leader'], icon: null },
  { id: 'data-lakes', name: 'Data lakes', pillars: ['data'], category: 'data-platform', tier: 'applied', evidenceRoleIds: [], icon: null },
  { id: 'lakehouses', name: 'Lakehouses', pillars: ['data'], category: 'data-platform', tier: 'applied', evidenceRoleIds: [], icon: null },
  { id: 'data-warehouses', name: 'Data warehouses', pillars: ['data'], category: 'data-platform', tier: 'applied', evidenceRoleIds: [], icon: null },
  { id: 'jira', name: 'Jira', pillars: ['software'], category: 'tool', tier: 'applied', evidenceRoleIds: ['techlead-leader'], icon: siJira },
  { id: 'jwt', name: 'JWT', pillars: ['software'], category: 'tool', tier: 'applied', evidenceRoleIds: ['gria-coordinator'], icon: siJsonwebtokens },
  // Earlier / specialized
  { id: 'java', name: 'Java', pillars: ['software'], category: 'language', tier: 'earlier', evidenceRoleIds: ['embedded-analyst', 'lavid-intern'], icon: null },
  { id: 'spring', name: 'Spring', pillars: ['software'], category: 'framework', tier: 'earlier', evidenceRoleIds: ['embedded-analyst', 'splab-developer'], icon: siSpring },
  { id: 'hibernate', name: 'Hibernate', pillars: ['software'], category: 'framework', tier: 'earlier', evidenceRoleIds: ['embedded-analyst', 'splab-developer'], icon: siHibernate },
  { id: 'javafx', name: 'JavaFX', pillars: ['software'], category: 'framework', tier: 'earlier', evidenceRoleIds: ['embedded-analyst'], icon: null },
  { id: 'jsf', name: 'JSF', pillars: ['software'], category: 'framework', tier: 'earlier', evidenceRoleIds: ['splab-developer'], icon: null },
  { id: 'mysql', name: 'MySQL', pillars: ['data', 'software'], category: 'database', tier: 'earlier', evidenceRoleIds: ['embedded-analyst', 'splab-developer'], icon: siMysql },
  { id: 'csharp-dotnet', name: 'C# / .NET', pillars: ['software'], category: 'framework', tier: 'earlier', evidenceRoleIds: ['virtus-analyst'], icon: siDotnet },
  { id: 'django', name: 'Django', pillars: ['software'], category: 'framework', tier: 'earlier', evidenceRoleIds: ['lacina-data-scientist'], icon: siDjango },
  { id: 'celery', name: 'Celery', pillars: ['software'], category: 'tool', tier: 'earlier', evidenceRoleIds: ['lacina-data-scientist'], icon: siCelery },
  { id: 'redis', name: 'Redis', pillars: ['software'], category: 'database', tier: 'earlier', evidenceRoleIds: ['lacina-data-scientist'], icon: siRedis },
  { id: 'tensorflow', name: 'TensorFlow', pillars: ['ai'], category: 'ml', tier: 'earlier', evidenceRoleIds: ['gria-data-tech-leader'], icon: siTensorflow },
  { id: 'keras', name: 'Keras', pillars: ['ai'], category: 'ml', tier: 'earlier', evidenceRoleIds: ['lacina-data-scientist'], icon: siKeras },
  { id: 'angularjs', name: 'AngularJS', pillars: ['software'], category: 'framework', tier: 'earlier', evidenceRoleIds: ['virtus-analyst'], icon: null },
  { id: 'php-wordpress', name: 'PHP / WordPress', pillars: ['software'], category: 'framework', tier: 'earlier', evidenceRoleIds: ['ldmi-intern'], icon: siWordpress },
  { id: 'html-css', name: 'HTML / CSS', pillars: ['software'], category: 'language', tier: 'earlier', evidenceRoleIds: [], icon: siHtml5 },
  { id: 'android', name: 'Android', pillars: ['software'], category: 'framework', tier: 'earlier', evidenceRoleIds: ['unipe-teacher'], icon: siAndroid },
  { id: 'swift', name: 'Swift / iOS', pillars: ['software'], category: 'language', tier: 'earlier', evidenceRoleIds: ['unipe-teacher'], icon: siSwift },
];

/** Rows shown per pillar in the default "Highlights" view (ids from `technologies`). */
export const highlights: Record<Pillar, string[]> = {
  software: ['javascript', 'nodejs', 'react', 'postgresql', 'mongodb', 'git'],
  data: ['python', 'sql', 'spark', 'databricks', 'aws', 'postgresql'],
  ai: ['python', 'machine-learning', 'nlp', 'llm', 'scikit-learn', 'pandas'],
};
