import { GiGraduateCap } from 'react-icons/gi';
import { RiCompasses2Line } from 'react-icons/ri';
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
  SiRust,
  SiSass,
  SiShopify,
  SiTelegram,
  SiTypescript,
  SiWebpack,
  SiYoutube
} from 'react-icons/si';
import { TfiEmail } from 'react-icons/tfi';
import CustomIcon from './CustomIcon';
import EpamLogo from './EpamLogo';
import LlamaLogo from './LlamaLogo';
import { NxjsLogo } from './NxjsLogo';
import { OpenAiLogo } from './OpenAiLogo';
import WebsterLogo from './WebsterLogo';
import { AmcBridgeLogo } from './AmcBridgeLogo';

type ElementsRecord = Record<string, React.ComponentType>;

export const linkIconsMap: ElementsRecord = {
  linkedin: SiLinkedin,
  telegram: SiTelegram,
  github: SiGithub,
  medium: SiMedium,
  youtube: SiYoutube,
};

export const skillIconsMap: ElementsRecord = {
  nest: SiNestjs,
  'react-next': SiReact,
  node: SiNodedotjs,
  express: SiExpress,
  rust: SiRust,
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

export const experienceIconsMap: ElementsRecord = {
  epam: EpamLogo,
  llama: LlamaLogo,
  freelance: RiCompasses2Line,
  webster: WebsterLogo,
  amcbridge: AmcBridgeLogo
};

export const miscUiIconsMap: ElementsRecord = {
  graduate: GiGraduateCap
}

export const contactInfoIconsMap: ElementsRecord = {
  email: TfiEmail
};