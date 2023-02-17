import Head from "next/head";
import React, { FC } from "react";

interface PageHeadProps {
  children: React.ReactNode;
  title: string;
  description: string;
  robots?: string
}

const PageHead: FC<PageHeadProps> = (props) => {
  const { description, title, children, robots, } = props;
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {robots && <meta name="robots" content={robots} />  }
      </Head>
      {children}
    </React.Fragment>
  );
};

export default PageHead;