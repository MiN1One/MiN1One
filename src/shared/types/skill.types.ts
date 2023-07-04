export enum ESkillType {
  lang = 'Programming Language',
  env = 'Environment',
  framework = 'Framework / Library',
  platform = 'Platform',
  tool = 'Tool / Tool set',
  lib = 'Library',
  preprocessor = 'Prepocessor',
  bundler = 'Bundler',
  db = 'Database',
}

export type SkillTypes = keyof typeof ESkillType;

export enum ESkillProficiency {
  'very-good' = 'Very Good',
  good = 'Good',
  average = 'Average',
  poor = 'Poor',
  master = 'Master',
  learning = 'Learning',
}

export const skillLevelToProficiencyMap: Record<string, ProficiencyTypes> = {
  10: 'master',
  9: 'very-good',
  7: 'good',
  5: 'average',
  3: 'poor',
  0: 'learning'
};

export type ProficiencyTypes = keyof typeof ESkillProficiency;

export interface ISkillItem {
  type: SkillTypes;
  value: string;
  title: string;
  level: number;
  proficiency: ProficiencyTypes;
  url?: string | null;
}

export enum ELingualProficiency {
  advanced = 'Advanced',
  'upper-intermediate' = 'Upper-Intermediate',
  native = 'Native',
}
