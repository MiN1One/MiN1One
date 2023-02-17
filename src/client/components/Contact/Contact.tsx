import { FC, memo, useMemo } from "react";
import classes from './Contact.module.scss';
import {
  contactInfoIconsMap,
  linkIconsMap,
} from '@client/components/Common/IconsMap';
import classNames from "classnames";
import { useHomeContext } from "@client/contexts/HomeContext";
import { IContactData, ILinkData, } from '@shared/types/home.types';
import { HiOutlineExternalLink } from "react-icons/hi";

const infoLinkPrefixesMap = {
  email: 'mailto:',
};

const Contact: FC = () => {
  const { data } = useHomeContext();

  const linkKeys = Object.keys(data.links);
  const contactInfoKeys = Object.keys(data.contact);

  const contactInfoEls = useMemo(() => {
    return contactInfoKeys.map(key => {
      const contact = data.contact[key] as IContactData;
      const linkPrefix = infoLinkPrefixesMap[key];
      const valueEls = contact.items.map((item, index) => (
        <a
          href={linkPrefix ? `${linkPrefix}${item}` : item}
          key={index}
          className="text link"
        >
          {item}
        </a>
      ));
      const Icon = contactInfoIconsMap[key];
      return (
        <li
          className={classes.item}
          key={key}
          aria-label={contact.title}
        >
          {Icon && <Icon />}
          <div className={classes.itemContent}>
            {valueEls}
          </div>
        </li>
      );
    });
  }, [data]); 

  const linkEls = useMemo(() => {
    return linkKeys.map(key => {
      const link = data.links[key] as ILinkData;
      const Icon = linkIconsMap[key];
  
      return (
        <li
          key={key}
          aria-label={link.title}
          className={classNames(classes[key], classes.linkItem)}
        >
          {Icon && <Icon />}
          <a
            href={link.url}
            title={link.title}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {link.title}
          </a>
        </li>
      );
    });
  }, []); 

  return (
    <div className={classes.contact}>
      <div>
        <ul className={classes.list}>
          {contactInfoEls}
        </ul>
        <ul className={classes.list}>
          {linkEls}
        </ul>
      </div>
      <div className={classes.footer}>
        <span className="text--sm text">
          Powered by NestJS & NextJS 
        </span>
        <a 
          rel="noreferrer noopener"
          target="_blank"
          href={data.urls.sourceCodeUrl} 
          className="text text--mid" 
          title="Portfolio Source Code"
        >
          <i style={{ color: 'var(--color-secondary)' }}>this.sourceCodeLink</i>
        </a>
        <p className="text text--sub text--lg">
          Designed and baked by <span className="text">MiN1One</span> with ❤️
        </p>
      </div>
    </div>
  );
};

export default memo(Contact);