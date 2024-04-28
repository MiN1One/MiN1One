import { useHomeContext } from "@client/contexts/HomeContext";
import classNames from "classnames";
import { FC, memo, useMemo } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImageWithLoader } from "../Common/ImageWithLoader";
import Modal from "../Modal/Modal";
import classes from './Portfolio.module.scss';

interface ProjectsModalProps {
  activeProject: string | null;
  onCloseModal: () => unknown;
}

const ProjectsModal: FC<ProjectsModalProps> = ({ activeProject, onCloseModal }) => {
  const { data } = useHomeContext();

  const project = data.portfolio[activeProject];

  const imageEls = useMemo(() => {
    return (project?.images as string[])?.map((image, index) => {
      return (
        <SwiperSlide key={`${activeProject}-${index}`}>
          <figure className={classNames(classes.figure, 'fade')}>
            <ImageWithLoader
              loadingClass={classes.loader}
              className={classNames(
                classes.image,
                { [classes.mobile]: image.includes('-mobile') },
              )}
              src={image}
              alt={`${project.title} Image ${index}`}
              draggable={false}
            />
          </figure>
        </SwiperSlide>
      );
    });
  }, [data, activeProject]);

  return (
    <Modal open onClose={onCloseModal}>
      <Swiper>
        {imageEls}
      </Swiper>
    </Modal>
  );
};

export default memo(ProjectsModal);