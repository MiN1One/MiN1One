import { FC, memo, } from "react";
import classes from './HomeNavigation.module.scss';
import classNames from 'classnames';
import Link from "next/link";
import { useRouter } from "next/router";
import { useHomeContext } from "@client/contexts/HomeContext";

const HomeNavigation: FC = () => {
  const { data } = useHomeContext();
  const { setActiveSection, activeSection } = useHomeContext();
  const { pathname } = useRouter();
  const sectionArr = Object.keys(data.sections);

  const navItemEls = sectionArr.map((itemKey, index) => {
    const item = data.sections[itemKey];

    const itemClasses = classNames(classes.item, {
      [classes.active]: 
        item.url
          ? item.url === pathname
          : item.value === activeSection,
    });
    
    return (
      <li 
        aria-label={`Navigation item ${item.title}`}
        tabIndex={0}
        className={itemClasses}
        key={index}
        onClick={
          !item.url 
            ? () => setActiveSection(item.value)
            : undefined
        }
      >
        {item.url
          ? (
            <Link href={item.url} title={item.title}>
              {item.title}
            </Link>
          )
          : item.title
        }
      </li>
    );
  });

  return (
    <header className={classes.navigation}>
      <nav role="navigation" className={classes.content}>
        <ul className={classes.list}>
          {navItemEls}
        </ul>
      </nav>
    </header>
  );
};

export default memo(HomeNavigation);