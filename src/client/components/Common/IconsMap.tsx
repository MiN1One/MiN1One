import {
  SiExpress,
  SiGithub,
  SiJavascript,
  SiLinkedin,
  SiMedium,
  SiMongodb,
  SiNestjs,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiSass,
  SiShopify,
  SiTelegram,
  SiTypescript,
  SiWebpack,
  SiYoutube
} from 'react-icons/si';
import CustomIcon from './CustomIcon';
import EpamLogo from './EpamLogo';
import LlamaLogo from './LlamaLogo';
import { RiCompasses2Line } from 'react-icons/ri';
import WebsterLogo from './WebsterLogo';
import { GiGraduateCap } from 'react-icons/gi';
import { TfiEmail } from 'react-icons/tfi';
import { NxjsLogo } from './NxjsLogo';
import { OpenAiLogo } from './OpenAiLogo';

export const linkIconsMap = {
  linkedin: SiLinkedin,
  telegram: SiTelegram,
  github: SiGithub,
  medium: SiMedium,
  youtube: SiYoutube,
};

export const skillIconsMap = {
  nest: SiNestjs,
  'react-next': SiReact,
  node: SiNodedotjs,
  express: SiExpress,
  'redux-zustand': SiRedux,
  webpack: SiWebpack,
  'mongo-goose': SiMongodb,
  shopify: SiShopify,
  ts: SiTypescript,
  js: SiJavascript,
  openai: OpenAiLogo,
  sass: SiSass,
  nxjs: NxjsLogo,
  en: () => <CustomIcon name="us" />,
  ru: () => <CustomIcon name="ru" />,
  uz: () => <CustomIcon name="uz" />,
};

export const experienceIconsMap = {
  epam: EpamLogo,
  llama: LlamaLogo,
  freelance: RiCompasses2Line,
  webster: WebsterLogo,
};

export const miscUiIconsMap = {
  graduate: GiGraduateCap
}

export const contactInfoIconsMap = {
  email: TfiEmail
};