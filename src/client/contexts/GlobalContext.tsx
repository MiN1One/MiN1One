import useMedia from "@client/hooks/useMedia";
import React, {
  createContext, FC, useContext,
  useState
} from "react";
import { StateSetter } from '@shared/types/common.types';

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
      ['small', 'screen and (max-width: 31.25em)'],
      ['mobile', 'only screen and (max-width: 48em)'],
      ['tablet', 'only screen and (max-width: 64em)'],
    );

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