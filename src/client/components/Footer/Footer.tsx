import { FC, memo, useMemo } from "react";
import classes from "./Footer.module.scss";
import classNames from "classnames";
import { TypeAnimation } from "react-type-animation";
import { useHomeContext } from "@client/contexts/HomeContext";
import { createTypingSequence, getRandomElement } from "@client/utils/random.utils";
import { linkIconsMap } from "../Common/IconsMap";

const currentYear = (new Date()).getFullYear();

const Footer: FC = () => {
  const { data } = useHomeContext();
  const { finishedTyping } = useHomeContext();

  const linksArr = Object.values(data.links);

  const typingSequence = useMemo(() => {
    return createTypingSequence(
      getRandomElement<string>(data.ui.quote)
    );
  }, []);

  const linkEls = linksArr.map(link => {
    const Icon = linkIconsMap[link.value];

    return (
      <li
        aria-label={link.title}
        key={link.value}
        className={classNames(classes.item, link.value)}
      >
        <a
          href={link.url}
          title={link.title}
          target="_blank"
          rel="noopener noreferrer"
        >
          {Icon && <Icon />}
          <span>{link.title}</span>
        </a>
      </li>
    );
  });

  return (
    <div className={classes.footer}>
      <div className={classes.quoteWrapper}>
        {finishedTyping && (
          <TypeAnimation
            sequence={typingSequence}
            className={classNames(
              "text text--italic type-cursor", 
              classes.quote
            )}
            wrapper="p"
            speed={40}
            cursor={false}
          />
        )}
      </div>
      <div className={classes.content}>
        <ul className={classes.list}>
          {linkEls}
        </ul>
        <p>
          <span>MiN1One</span>&nbsp;
          <span>Dev. {currentYear}</span>
        </p>
      </div>
    </div>
  );
};

export default memo(Footer);