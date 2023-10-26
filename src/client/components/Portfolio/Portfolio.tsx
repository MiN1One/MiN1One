import { FC, memo, useCallback, useMemo, useRef, useState } from 'react';
import classes from './Portfolio.module.scss';
import Modal from '../Modal/Modal';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import classNames from 'classnames';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';
import { useHomeContext } from '@client/contexts/HomeContext';
import { IPortfolioData } from '@shared/types/home.types';
import { EStackTypes } from '@shared/types/skill.types';

const Portfolio: FC = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const { data } = useHomeContext();
  const modalContentRef = useRef<HTMLDivElement>();
  const projectKeys = Object.keys(data.portfolio);

  const onCloseModal = useCallback(() => {
    setActiveProject(null);
  }, []);

  const project = data.portfolio[activeProject];

  const imageEls = useMemo(() => {
    return (project?.images as string[])?.map((image, index) => {
      return (
        <figure
          key={index}
          className={classNames(classes.figure, 'fade')}
        >
          <img
            className={classNames(classes.image, {
              [classes.mobile]: image.includes('-mobile'),
            })}
            src={image}
            alt={`${project.title} Image ${index}`}
            draggable={false}
          />
        </figure>
      );
    });
  }, [data, activeProject]);

  const projectEls = useMemo(() => {
    return projectKeys.map((key, index) => {
      const project = data.portfolio[key] as IPortfolioData;

      return (
        <li
          tabIndex={0}
          key={key}
          aria-label={project.title}
          className={classNames(
            classes.item,
            classes[key],
            { [classes.active]: activeProject === key },
            'overlay overlay--color overlay--lg overlay--hover'
          )}
        >
          {(project.link || (project.github.link && project.github.repo)) && (
            <a
              href={project.link || project.github.link}
              title={`${project.title} ${project.link || project.github.repo}`}
              target="_blank"
              rel="noreferrer noopener"
              className={classNames(classes.link, 'link link--withIcon')}
            >
              {project.github.link && !project.link && <SiGithub />}
              {project.github.link ? 'GitHub' : project.title}
              <HiOutlineExternalLink />
            </a>
          )}
          <div
            className={classes.itemContent}
            onClick={() => setActiveProject(key)}
            tabIndex={0}
          >
            <span className={classes.label}>
              {EStackTypes[project.type]}
            </span>
            <div className={classes.title}>
              <span>{project.title}</span>
            </div>
            <figure className={classes.figure}>
              <img
                className={classes.image}
                src={project.images[0]}
                alt={`${project.title} Image ${index}`}
                draggable={false}
              />
            </figure>
          </div>
        </li>
      );
    });
  }, [data]);

  const onControlsClick = useCallback((control: 'next' | 'prev') => {
    const activeProjectIndex = projectKeys.findIndex(key => (
      key === activeProject
    ));
    const upProjectkey = projectKeys[
      control === 'next' ? activeProjectIndex + 1 : activeProjectIndex - 1
    ];
    if (upProjectkey in data.portfolio) {
      modalContentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setActiveProject(upProjectkey);
    }
  }, [activeProject]);

  return (
    <div className={classes.portfolio}>
      <Modal onClose={onCloseModal} open={!!activeProject}>
        <div className={classes.modalContent} ref={modalContentRef}>
          <div className={classes.imagesList}>
            {imageEls}
          </div>
        </div>
        <div className="btn-control-group">
          <button
            title="Previous project"
            aria-label="Control Button"
            className="btn-control"
            onClick={() => onControlsClick('prev')}
          >
            <BsChevronLeft />
          </button>
          <button
            title="Next project"
            aria-label="Control Button"
            className="btn-control"
            onClick={() => onControlsClick('next')}
          >
            <BsChevronRight />
          </button>
        </div>
      </Modal>
      <ul className={classes.list}>
        {projectEls}
      </ul>
    </div>
  );
};

export default memo(Portfolio);