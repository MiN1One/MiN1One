import classNames from "classnames";
import React, { FC, createElement, memo } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import classes from './ListItem.module.scss';

interface ListItemProps {
  elementType?: React.ElementType;
  title: string;
  subtitle?: string;
  link?: string;
  linkTitle?: string;
  location?: string | string[];
  headlineItems?: string[];
  bulletPoints?: string[];
  icon?: React.ComponentType;
  iconBg?: string;
  children?: React.ReactNode;
  secondaryIcon?: React.ComponentType;
  [key: string]: any;
}

const ListItem: FC<ListItemProps> = (props) => {
  const {
    elementType = 'li',
    title,
    subtitle,
    link,
    linkTitle,
    location,
    headlineItems = [],
    bulletPoints = [],
    icon,
    iconBg,
    children = null,
    secondaryIcon,
    ...restProps
  } = props;

  const locationEls = (
    Array.isArray(location)
      ? location.map((location, index) => (
        <span key={index}>{location}</span>
      ))
      : location
  );

  const headlineEls = headlineItems.map((item, index) => (
    <span key={index}>{item}{index !== headlineItems.length - 1 && ' - '}</span>
  ));

  const pointEls = bulletPoints.map((item, index) => (
    <li
      key={index}
      aria-label={item}
      className={classes.innerItem}
    >
      <span className="text--sub"> * </span>{item}
    </li>
  ));

  const Icon = icon;
  const SecondaryIcon = secondaryIcon;

  return createElement<{
    children: React.ReactNode,
    className: string;
    [key: string]: any;
  }>(
    elementType,
    {
      ...restProps,
      className: classNames(
        classes.item,
        { [classes.fill]: !!iconBg }
      ),
      children: (
        <>
          {Icon && (
            <div
              className={classes.iconWrapper}
              style={iconBg ? { background: iconBg } : undefined}
            >
              <Icon />
            </div>
          )}
          <div className={classes.itemContent}>
            <div className={classes.titleGroup}>
              <div className={classes.title}>
                <div className={classes.indicatorWrapper}>
                  {SecondaryIcon && <SecondaryIcon />}
                  <span className={classNames(classes.status, 'indicator overlay')} />
                </div>
                <h6 className="heading heading--6">
                  {title}
                </h6>
              </div>
              {link && (
                <a
                  title={linkTitle || `${title} ${link}`}
                  aria-label={`Link to ${linkTitle || link}`}
                  href={'https://' + link}
                  className="link link--withIcon link--pale"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link}
                  <HiOutlineExternalLink />
                </a>
              )}
              {subtitle && (
                <span className="text text--sub">
                  {subtitle}
                </span>
              )}
              {location.length > 0 && (
                <div className={classes.location}>
                  <IoLocationOutline />
                  <div className="headline text--sub text">
                    {locationEls}
                  </div>
                </div>
              )}
              {headlineItems.length > 0 && (
                <div className="text--sub text">
                  {headlineEls}
                </div>
              )}
            </div>
            {bulletPoints.length > 0 && (
              <ul className={classes.itemList}>
                {pointEls}
              </ul>
            )}
            {children}
          </div>
        </>
      )
    }
  );
};

export default memo(ListItem);