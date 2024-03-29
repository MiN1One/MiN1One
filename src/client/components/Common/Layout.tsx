import { useGlobalContext } from "@client/contexts/GlobalContext";
import React, { FC, memo } from "react";
import Loader from "../Loader/Loader";
import HomeNavigation from "@client/components/HomeNavigation/HomeNavigation";
import { useRouter } from "next/router";
import { useHideScrollbar } from "@client/hooks/useHideScrollbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { loading, } = useGlobalContext();
  const { pathname } = useRouter();

  useHideScrollbar(loading);

  return (
    <React.Fragment>
      <Loader />
      {pathname === '/' && <HomeNavigation />}
      {children}
    </React.Fragment>
  );
};

export default memo(Layout);