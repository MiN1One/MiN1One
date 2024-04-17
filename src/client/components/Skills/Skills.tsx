import { skillIconsMap } from '@client/components/Common/IconsMap';
import { useGlobalContext } from "@client/contexts/GlobalContext";
import { useHomeContext } from "@client/contexts/HomeContext";
import { ELingualProficiency, ESkillProficiency, ESkillType, ISkillItem } from '@shared/types/skill.types';
import { matchSkillLevelToProficiency } from "@shared/utils/me.utils";
import classNames from "classnames";
import { CSSProperties, FC, memo, useMemo } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import SafeHydrate from "../Common/SafeHydrate";
import { SectionProps } from '../Section/Section';
import classes from './Skills.module.scss';

const Skills: FC<SectionProps> = ({ active }) => {
  const { data: { skills } } = useHomeContext();
  const { media } = useGlobalContext();

  const technicalSkillKeys = useMemo(
    () => Object.keys(skills.technical.list),
    [skills.technical.list]
  );
  const lingualSkillKeys = useMemo(
    () => Object.keys(skills.lingual.list),
    [skills.lingual.list]
  );

  const lingualSkillEls = useMemo(() => {
    return lingualSkillKeys.map(key => {
      const skill = skills.lingual.list[key] as ISkillItem;
      return (
        <li
          key={key}
          aria-label={skill.title}
          className={classes.item}
        >
          <div className={classes.itemBody}>
            <div>
              <div className={classes.titleGroup}>
                <span className={classes.label}>
                  {skill.title}
                </span>
              </div>
              <div className="headline">
                {skill.level && (
                  <span className="text--sub">
                    {skill.level}
                  </span>
                )}
                <span className="text--sub">
                  {ELingualProficiency[skill.proficiency]}
                </span>
              </div>
            </div>
          </div>
        </li>
      );
    });
  }, [lingualSkillKeys]);

  const technicalSkillEls = useMemo(() => {
    return technicalSkillKeys.map((key) => {
      const skill = skills.technical.list[key] as ISkillItem;
      let Icon = skillIconsMap[key];
      const learning = skill.level === 0;
      return (
        <li
          className={classNames(
            classes.item,
            classes[key],
            { [classes.learning]: learning }
          )}
          key={key}
          aria-label={skill.title}
        >
          <div className={classes.itemHead}>
            <SafeHydrate>
              {media.small && Icon && <Icon />}
            </SafeHydrate>
            <div className={classes.titleGroup}>
              <span className={classes.label}>
                {skill.title}
              </span>
              {skill.url && (
                <a
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={skill.title}
                  className="link--withIcon"
                >
                  <HiOutlineExternalLink className={classes.linkIcon} />
                </a>
              )}
            </div>
            <div className="headline text--sub">
              <span>
                {ESkillProficiency[matchSkillLevelToProficiency(skill.level)]}
              </span>
              <span>
                {ESkillType[skill.type]}
              </span>
            </div>
          </div>
          <div className={classes.itemBody}>
            {Icon && <Icon />}
            <div className={classes.bodyGroup}>
              <div className={classes.progress}>
                <span
                  style={{
                    '--level': `${skill.level / 10 * 100}%`,
                  } as CSSProperties}
                />
              </div>
              <span className={classNames("text", classes.level)}>
                {!learning ? `${skill.level} / 10` : 'Soon...'}
              </span>
            </div>
          </div>
        </li>
      );
    });
  }, [media.small, technicalSkillKeys]);

  return (
    <div className={classNames(
      classes.skills,
      { [classes.active]: active }
    )}>
      <div className={classes.body}>
        <div className="group">
          <h4 className="heading heading--5 text--italic">
            {skills.technical.title}
          </h4>
          <ul className={classes.list}>
            {technicalSkillEls}
          </ul>
        </div>
        <div className="group">
          <h4 className="heading heading--5 text--italic">
            {skills.lingual.title}
          </h4>
          <ul className={classNames(classes.list, classes.lingual)}>
            {lingualSkillEls}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(Skills);