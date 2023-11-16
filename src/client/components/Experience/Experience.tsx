import { experienceIconsMap } from '@client/components/Common/IconsMap';
import { useHomeContext } from "@client/contexts/HomeContext";
import { EWorkMode, IEducationData, IExperienceData, } from '@shared/types/home.types';
import moment from 'moment';
import { FC, useMemo } from "react";
import ListItem from "../ListItem/ListItem";
import classes from './Experience.module.scss';


const Experience: FC = () => {
  const { data } = useHomeContext();

  const experienceKeys = useMemo(
    () => Object.keys(data.experience),
    [data.experience]
  );
  const educationKeys = useMemo(
    () => Object.keys(data.education),
    [data.education]
  );

  const expereinceEls = useMemo(() => {
    return experienceKeys.map(key => {
      const experienceItem = data.experience[key] as IExperienceData;
      const responsibilitiesArr = experienceItem.responsibilities.split('. ') as string[];
      const from = moment(experienceItem.from);
      const to = moment(experienceItem.to || undefined);
      let months = to.diff(from, 'months') + 1, years: number;

      if (months >= 12) {
        years = Math.floor(months / 12);
        months = months % 12;
      }

      const subtitle = `
        from ${from.format('MMMM YYYY')}
        ${experienceItem.to ? ' to ' + to.format('MMMM YYYY') : ' till now'} (${years > 0 ? `${years} year${years > 1 ? 's ' : ' '} ` : ''}${months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''})
      `;

      return (
        <ListItem
          key={key}
          title={`${experienceItem.role} - ${experienceItem.company}`}
          link={experienceItem.website}
          linkTitle={`Website ${experienceItem.company}`}
          data-active={!experienceItem.to}
          subtitle={subtitle}
          location={[experienceItem.location, EWorkMode[experienceItem.mode]]}
          bulletPoints={responsibilitiesArr}
          icon={experienceIconsMap[key]}
          aria-label={`Experience at ${experienceItem.company || 'no-org'}`}
        />
      );
    });
  }, [experienceKeys]);

  const educationEls = useMemo(() => {
    return educationKeys.map(key => {
      const education = data.education[key] as IEducationData;
      const startDate = moment(education.startDate);
      const endDate = moment(education.endDate);

      return (
        <ListItem
          key={key}
          title={education.title + (education.gpa ? ` (GPA ${education.gpa})` : '')}
          location={`${education.city}, ${education.country}`}
          link={education.website}
          data-active
          icon={experienceIconsMap[key]}
          iconBg="var(--color-light)"
          headlineItems={[education.degree, education.major]}
          subtitle={`${startDate.format('MM.YYYY')} - ${endDate.format('MM.YYYY')}`}
        />
      );
    });
  }, [educationKeys]);

  return (
    <div className={classes.experience}>
      <div className="group">
        <h4 className="heading heading--5 text--italic">
          Professional Expertise:
        </h4>
        <ul className={classes.list}>
          {expereinceEls}
        </ul>
      </div>
      <div className="group">
        <h4 className="heading heading--5 text--italic">
          Education:
        </h4>
        <ul className={classes.list}>
          {educationEls}
        </ul>
      </div>
    </div>
  );
};

export default Experience;