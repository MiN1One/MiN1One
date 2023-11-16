import { useHomeContext } from "@client/contexts/HomeContext";
import { createTypingSequence, getRandomElement } from "@client/utils/random.utils";
import classNames from "classnames";
import { FC, memo, useMemo } from "react";
import { TypeAnimation } from "react-type-animation";
import { linkIconsMap } from "../Common/IconsMap";
import classes from "./Footer.module.scss";

const currentYear = (new Date()).getFullYear();

const Footer: FC = () => {
  const { finishedTyping, linkKeys, data } = useHomeContext();

  const typingSequence = useMemo(() => {
    return createTypingSequence(
      getRandomElement<string>(data.ui.quote)
    );
  }, []);

  const linkEls = useMemo(() => {
    return linkKeys.map(key => {
      const link = data.links[key];
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
  }, [linkKeys, data.links]);

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
        <p>
          <span>MiN1One</span>&nbsp;
          <span>Dev. {currentYear}</span>
        </p>
        <ul className={classes.list}>
          {linkEls}
        </ul>
      </div>
    </div>
  );
};

export default memo(Footer);