import useMedia from "@client/hooks/useMedia";
import { debounce } from "@client/utils/throttle.utils";
import { StateSetter } from '@shared/types/common.types';
import React, {
  createContext, FC, useCallback, useContext,
  useEffect,
  useState
} from "react";

interface IGlobalContext {
  media: Record<string, boolean>;
  setCssVariables: StateSetter<Record<string, string>>;
  cssVariables: Record<string, string>;
  loading: boolean;
  setLoading: StateSetter<boolean>;
};

const Context = createContext({} as IGlobalContext);

export const GlobalContextProvider: FC<{ children: React.ReactNode }> =
  ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [cssVariables, setCssVariables] = useState<Record<string, string>>({});
    const media = useMedia(
      ['small', 'screen and (max-width: 31.25em)', false],
      ['mobile', 'only screen and (max-width: 48em)', false],
      ['tablet', 'only screen and (max-width: 64em)', false],
    );

    const getWindowHeight = useCallback(
      debounce(() => {
        document.documentElement.style.setProperty(
          '--header-height',
          `${window.innerHeight}px`
        );
      }, 500),
      []
    );

    useEffect(() => {
      getWindowHeight();
      window.addEventListener('resize', getWindowHeight);
      return () => {
        window.removeEventListener('resize', getWindowHeight);
      };
    }, [getWindowHeight]);

    const state: IGlobalContext = {
      media,
      setCssVariables,
      cssVariables,
      setLoading,
      loading,
    };

    return (
      <Context.Provider value={state}>
        {children}
      </Context.Provider>
    );
  };

export const useGlobalContext = () => useContext(Context);