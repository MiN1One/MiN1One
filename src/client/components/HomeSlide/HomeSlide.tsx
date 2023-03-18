import classNames from "classnames";
import { FC, memo, useMemo } from "react";
import classes from './HomeSlide.module.scss';
import { calculateMyAge } from '@shared/utils/me.utils';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { TfiDownload } from 'react-icons/tfi';
import { useHomeContext } from "@client/contexts/HomeContext";

const HomeSlide: FC = () => {
  const { setActiveSection, data } = useHomeContext();

  const sectionKeys = Object.keys(data.sections);

  const myAge = useMemo(() => calculateMyAge(data.general.birthDate), []);

  return (
    <div className={classes.home}>
      <h1 className="heading heading--tertiary heading--f-2">
        {data.general.name}
      </h1>
      <div className={classes.textWrapper}>
        <p 
          className={classNames('text', classes.text)} 
          dangerouslySetInnerHTML={{
            __html: data.general.summary.replace(
              '{{myAge}}', 
              myAge.toString()
            ) 
          }}
        />
      </div>
      <div className={classes.btnGroup}>
        <a
          href={data.urls.resumeUrl}
          title="My resume link"
          rel="noopener noreferrer"
          target="_blank"
          // download="Nodirbek_Ulashev.pdf"
          className={classNames(classes.ctaBtn, "btn btn--primary")}
        >
          <TfiDownload />
          My Resume
        </a>
        <button 
          className={classNames(
            "btn btn--plain btn--arrow", 
            classes.btn
          )}
          onClick={() => setActiveSection(sectionKeys[1])}
        >
          Learn More
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

export default memo(HomeSlide);