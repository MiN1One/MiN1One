import { StateSetter } from '@shared/types/common.types';
import { IHomeData } from '@shared/types/home.types';
import { NextPage } from 'next';
import {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useGlobalContext, } from './GlobalContext';

interface IHomeContext {
  finishedTyping: boolean;
  setFinishedTyping: StateSetter<boolean>;
  setData: StateSetter<IHomeData>;
  data: IHomeData;
  activeSection: string | null;
  setActiveSection: StateSetter<string | null>;
  closeSections: () => void;
  unscale: {
    value: number;
    transition: boolean;
  };
  sectionKeys: (keyof IHomeData)[];
  linkKeys: string[];
  setUnscaleValue: (val: number, transition?: boolean) => void;
}

interface IndexPageProps {
  data: IHomeData;
}

interface HomeContextProps {
  children: React.ReactNode;
  initialData: IHomeData;
}

export const HomeContext = createContext({} as IHomeContext);

export const useHomeContext = () => useContext(HomeContext);

const MAX_OUTSIDE_CONTENT_UNSCALE_SIZE = +process.env.NEXT_PUBLIC_MAX_OUTSIDE_CONTENT_UNSCALE_SIZE;

export const HomeContextProvider: FC<HomeContextProps> = (props) => {
  const { children, initialData } = props;
  const [finishedTyping, setFinishedTyping] = useState();
  const [data, setData] = useState(initialData);
  const { media, } = useGlobalContext();

  const sectionKeys = useMemo(
    () => Object.keys(initialData?.sections || {}) as (keyof IHomeData)[],
    [initialData.sections]
  );
  const linkKeys = useMemo(
    () => Object.keys(initialData?.links || {}),
    [initialData.links]
  );

  const firstSection = sectionKeys[0];

  const [activeSection, setActiveSection] = useState<null | string>(firstSection);

  const [unscale, setUnscale] = useState({
    value: 0,
    transition: false,
  });

  const setUnscaleValue = useCallback(
    (value: number, transition: boolean = false) => {
      setUnscale({
        value,
        transition
      })
    }, []
  );

  const closeSections = useCallback(() => {
    setActiveSection(media.tablet ? null : firstSection);
  }, [media]);

  useEffect(() => {
    closeSections();
  }, [closeSections]);

  useEffect(() => {
    if (activeSection && activeSection !== 'home') {
      setUnscaleValue(
        MAX_OUTSIDE_CONTENT_UNSCALE_SIZE,
        true
      );
    }
  }, [activeSection]);

  const state: IHomeContext = {
    finishedTyping,
    setFinishedTyping,
    data,
    setData,
    activeSection,
    setActiveSection,
    closeSections,
    setUnscaleValue,
    sectionKeys,
    unscale,
    linkKeys,
  };

  return (
    <HomeContext.Provider value={state}>
      {children}
    </HomeContext.Provider>
  );
};

export const withHomeContext = (Cmp: NextPage) => (
  ({ data }: IndexPageProps) => {
    return (
      <HomeContextProvider initialData={data}>
        <Cmp />
      </HomeContextProvider>
    )
  }
);