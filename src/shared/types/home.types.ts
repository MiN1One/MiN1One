import { SkillTypes, ProficiencyTypes, } from './skill.types';

export interface IHomeData {
  contact: Record<string, IContactData>;
  links: Record<string, ILinkData>;
  experience: Record<string, IExperienceData>;
  sections: Record<string, ISectionData>;
  ui: Record<string, string[]>;
  skills: Record<string, ISkillsData>;
  portfolio: Record<string, IPortfolioData>;
  education: Record<string, IEducationData>;
  urls: Record<string, string>;
  general: IGenerelInfo;
}

export interface IGenerelInfo {
  name: string;
  summary: string;
  birthDate: string;
  pageTitle: string;
  pageDescription: string;
}

export interface IContactData {
  value: string;
  items: string[];
  title: string;
}

export interface ILinkData {
  title: string;
  url: string;
  value: string;
}

export enum EWorkMode {
  hybrid = 'Hybrid',
  remote = 'Remote',
  office = 'Office'
}

export interface IExperienceData {
  company: string;
  value: string;
  from: string;
  to: string | null;
  responsibilities: string;
  role: string;
  location: string;
  mode: keyof typeof EWorkMode;
  website: string;
}

export interface ISectionData {
  title: string;
  value: string;
  expandedTitle: string;
  url: string | null;
  subtitle: string;
  info: string;
  slide: boolean;
}

export interface ISkill {
  title: string;
  value: string;
  type: SkillTypes;
  url: string | null;
  level: number;
}

export interface ISkillsData {
  title: string;
  list: {
    [key: string]: ISkill | ISkill & { proficiency: ProficiencyTypes },
  }
}

export interface IPortfolioData {
  title: string;
  link: null;
  github: {
    link: string;
    repo: string;
  } | null;
  year: number;
  technologies: [];
  type: string;
  value: string;
  description: string;
  images: string[];
  forSale: boolean;
}

export interface IEducationData {
  classification: string;
  grade: number;
  gpa: null | number;
  startDate: string;
  endDate: string;
  title: string;
  country: string;
  city: string;
  major: string;
  degree: string;
  website: string | null;
}