import { FC, memo, useCallback } from "react";
import { TypeAnimation } from "react-type-animation";
import classes from './HomeContent.module.scss';
import { stringToBinaryString } from '@shared/utils/string.utils';
import { SiTypescript, SiJavascript, } from 'react-icons/si';
import Footer from "../Footer/Footer";
import { useHomeContext } from "@client/contexts/HomeContext";
import { useGlobalContext } from "@client/contexts/GlobalContext";
import classNames from "classnames";
import BgAnimation from "../BgAnimation/BgAnimation";
import SafeHydrate from "../Common/SafeHydrate";

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
    1000,
    stringToBinaryString('Hello') + '!',
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
    ? 'transform .4s ease' 
    : 'transform .7s ease';

  return (
    <section 
      className={classNames(classes.home, 'overlay')}
      onClick={onClickContent}
      style={
        unscale 
          ? {
            transform: `scale(${1 - unscale.value})`,
            transition: 
              unscale.transition 
                ? unscaleTransition
                : undefined
          } 
          : undefined
      }
    >
      <div className={classes.animation}>
        <BgAnimation />
      </div>
      <div className={classes.mainContainer}>
        <SafeHydrate>
          {!loading && (
            <TypeAnimation
              sequence={typingSequence}
              speed={45}
              deletionSpeed={40}
              wrapper="h5"
              className="heading type-cursor"
              cursor={false}
            />
          )}
          {finishedTyping && (
            <>
              <span className="text text--sub text--mid">
                Matrix Screen greeting
              </span>
              <div className={classes.smile}>
                <span>:</span>
                <span>)</span>
              </div>
            </>
          )}
        </SafeHydrate>
      </div>
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