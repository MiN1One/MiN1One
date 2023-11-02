import { useGlobalContext } from "@client/contexts/GlobalContext";
import { useHomeContext } from "@client/contexts/HomeContext";
import classNames from "classnames";
import { FC, memo, useCallback } from "react";
import { SiJavascript, SiTypescript, } from 'react-icons/si';
import { TypeAnimation } from "react-type-animation";
import BgAnimation from "../BgAnimation/BgAnimation";
import SafeHydrate from "../Common/SafeHydrate";
import Footer from "../Footer/Footer";
import classes from './HomeContent.module.scss';

const HomeContent: FC = () => {
  const {
    setFinishedTyping,
    finishedTyping,
    closeSections,
    unscale,
    setUnscaleValue,
  } = useHomeContext();
  const { media, loading } = useGlobalContext();

  const typingSequence = [
    1500,
    'Hello There!',
    () => setFinishedTyping(true),
  ];

  const onClickContent = useCallback(() => {
    if (unscale.value > 0) {
      setUnscaleValue(0, true);
      closeSections();
    }
  }, [unscale.value, closeSections]);

  const unscaleTransition = media.tablet
    ? 'all .4s ease'
    : 'all .7s ease';

  return (
    <section
      className={classNames(classes.home, 'overlay')}
      onClick={onClickContent}
      style={
        unscale
          ? {
            transform: `scale(${1 - unscale.value})`,
            borderRadius: unscale.value > 0 && media.tablet ? '2.5rem' : 0,
            transition:
              unscale.transition
                ? unscaleTransition
                : undefined
          }
          : undefined
      }
    >
      <SafeHydrate>
        {!loading && (
          <>
            <div className={classes.animation}>
              <BgAnimation />
            </div>
            <div className={classes.mainContainer}>
              <TypeAnimation
                sequence={typingSequence}
                speed={45}
                deletionSpeed={40}
                wrapper="h5"
                className="heading type-cursor"
                cursor={false}
              />
              {finishedTyping && (
                <>
                  <span className="bg-dark text text--sub text--mid">
                    Matrix Screen greeting
                  </span>
                  <div className={classes.smile}>
                    <span>:</span>
                    <span>)</span>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </SafeHydrate>
      <Footer />
      <div className={classes.icons}>
        <div className={classes.iconWrapper}>
          <SiJavascript />
        </div>
        <div className={classes.iconWrapper}>
          <SiTypescript />
        </div>
      </div>
    </section>
  );
};

export default memo(HomeContent);