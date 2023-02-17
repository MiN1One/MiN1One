import React, {
  FC,
  memo,
  MouseEvent,
  TouchEvent,
  TransitionEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from './Section.module.scss';
import classNames from "classnames";
import { useGlobalContext } from "@client/contexts/GlobalContext";
import { SlInfo } from 'react-icons/sl';
import { useHomeContext } from "@client/contexts/HomeContext";
import { ISectionData } from "@shared/types/home.types";
import { debounce } from "@client/utils/throttle.utils";

const SLIDE_CLOSE_AT_PERCENT = +process.env.NEXT_PUBLIC_SLIDE_CLOSE_AT_PERCENT;
const SLIDE_FINISH_AT_PERCENT = +process.env.NEXT_PUBLIC_SLIDE_FINISH_AT_PERCENT;
const SLIDE_TRANSITION_DURATION = .85;
const SLIDE_TRANSITION_DURATION_MOBILE = .65;
const MAX_OUTSIDE_CONTENT_UNSCALE_SIZE = +process.env.NEXT_PUBLIC_MAX_OUTSIDE_CONTENT_UNSCALE_SIZE;

export interface SectionProps {
  active: boolean;
  section: ISectionData;
  rightTranslate?: boolean;
  type: string;
  small?: boolean;
  fixed?: boolean;
  showTitle?: boolean;
  centerContent?: boolean;
  fullWidth?: boolean;
}

const Section: FC<
  SectionProps & { children: React.ReactNode }
> = (props) => {
  const {
    active,
    rightTranslate,
    type,
    children,
    fixed = false,
    small = false,
    showTitle = false,
    centerContent = false,
    fullWidth,
    section,
  } = props;
  const { media } = useGlobalContext();
  const { closeSections, setUnscaleValue, activeSection } = useHomeContext();
  const [mouseDown, setMouseDown] = useState(false);
  const [translate, setTranslate] = useState({
    value: 0,
    transition: false
  });
  const mouseClickPosition = useRef(0);
  const dragBtnRef = useRef<HTMLButtonElement>();

  const setTranslateValue = useCallback(
    (value: number, transition: boolean = false) => {
      setTranslate({
        value,
        transition
      });
    }, []
  );

  const onSlide = useCallback((mousePos: number) => {
    if (!mouseDown) return;
    const currentMousePosition = mousePos;
    const translateSize = currentMousePosition - mouseClickPosition.current;
    setUnscaleValue(
      currentMousePosition / 
      mouseClickPosition.current * 
      MAX_OUTSIDE_CONTENT_UNSCALE_SIZE
    );
    if (translateSize <= 2) {
      setTranslateValue(translateSize);
    } else {
      setMouseDown(false);
      setTranslateValue(0, true);
      setUnscaleValue(MAX_OUTSIDE_CONTENT_UNSCALE_SIZE, true);
    }
  }, [mouseDown]);

  const onMouseMove = useCallback((e: MouseEventInit) => {
    onSlide(e.clientX);
  }, [onSlide]);

  const onTouchMove = useCallback((e: globalThis.TouchEvent) => {
    onSlide(e.changedTouches[0].clientX);
  }, [onSlide]);

  const fixedSlide = fixed && !media.tablet;

  const getMousePosition = useCallback((position?: number) => {
    if (dragBtnRef.current && !fixedSlide) {
      mouseClickPosition.current = position ?? dragBtnRef.current.offsetLeft;
    }
  }, [fixedSlide]);

  useEffect(() => {
    const getMousePos = debounce(() => getMousePosition(), 500);
    getMousePosition();
    window.addEventListener('resize', getMousePos);
    return () => {
      window.removeEventListener('resize', getMousePos);
    };
  }, [getMousePosition]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mousemove', onMouseMove);
    }
  }, [onSlide]);

  const slideTransition = media.tablet 
    ? SLIDE_TRANSITION_DURATION_MOBILE 
    : SLIDE_TRANSITION_DURATION;

  const onTransionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (
        e.propertyName === 'left' && 
        e.elapsedTime >= slideTransition
      ) {
        if (
          (media.tablet && !active && !activeSection) || 
          (!media.tablet && activeSection === 'home')
        ) {
          setTranslateValue(0);
          setUnscaleValue(0, true);
        }
      }
    }, [active, slideTransition, activeSection, media.tablet]
  );

  const onMouseDown = useCallback((event?: TouchEvent<HTMLElement>) => {
    if (event) {
      getMousePosition(event.changedTouches[0].clientX);
    }
    setMouseDown(true);
  }, [getMousePosition]);

  const onCloseSlide = useCallback((clickPos: number) => {
    if (!mouseDown) return;
    setMouseDown(false);
    const slideProgress = clickPos / mouseClickPosition.current;
    if (slideProgress <= SLIDE_CLOSE_AT_PERCENT) {
      closeSections();
    } else if (slideProgress >= SLIDE_FINISH_AT_PERCENT) {
      setTranslateValue(0, true);
      setUnscaleValue(0, true);
    }
  }, [mouseDown]);

  const onTouchEnd = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      onCloseSlide(e.changedTouches[0].clientX);
    }, [onCloseSlide]
  );

  const onMouseUp = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      onCloseSlide(e.clientX);
    }, [onCloseSlide]
  );

  const containerClasses = classNames(
    classes.section, 
    classes[type],
    {
      [classes.active]: active,
      [classes.rightTranslate]: rightTranslate,
      [classes.small]: small,
      [classes.fullWidth]: fullWidth,
    }
  );

  const contentClasses = classNames(
    classes.content,
    { [classes.centerContent]: centerContent, },
  );

  return (
    <section 
      className={containerClasses} 
      {...(fixedSlide ? {} : {
        onMouseUp,
        'data-dragging': mouseDown.toString(),
        onTransitionEnd: onTransionEnd,
        onTouchEnd: onTouchEnd,
        ...(media.tablet ? {
          onTouchStart: onMouseDown,
        }: {}),
        style: {
          transform: `translateX(${translate.value}px)`,
          transition: translate.transition 
            ? `all ${slideTransition}s ease ` 
            : undefined
        },
      })}
    >
      <div className={contentClasses}>
        {showTitle && section.title && (
          <div className={classes.head}>
            <h3 className={classNames(
              "heading heading--secondary", 
              classes.heading
            )}>
              {section.title}
            </h3>
            {section.subtitle && (
              <p className={classNames(
                classes.subtitle, 
                "text text--sub text--lg"
              )}>
                {section.subtitle}
              </p>
            )}
            <span className={classes.separator} />
          </div>
        )}
        <div className={classes.body}>
          {children}
        </div>
        {section.info && (
          <div className={classes.info}>
            <SlInfo />
            <p className="text text--sm">
              {section.info}
            </p>
          </div>
        )}
      </div>
      {!fixedSlide && (
        <button
          {...(media.tablet ? {} : {
            'data-drag': true,
            onMouseDown: () => onMouseDown()
          })}
          ref={dragBtnRef}
          className={classes.btnControl}
          aria-label="Drag control"
        >
          <span>Hold and slide to close</span>
        </button>
      )}
    </section>
  );
};

export default memo(Section);