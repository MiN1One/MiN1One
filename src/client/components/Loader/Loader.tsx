import { useGlobalContext } from "@client/contexts/GlobalContext";
import { useHomeContext } from "@client/contexts/HomeContext";
import { getRandomElement, randomUniqueIntBetween } from "@client/utils/random.utils";
import classNames from "classnames";
import { FC, memo, useEffect, useState } from "react";
import SafeHydrate from "../Common/SafeHydrate";
import classes from './Loader.module.scss';

const LOADING_PROGRESS_RANGE = 35;
const LOADING_PROGRESS_UPDATE_DELAY = 300;
const LOADING_TEXT_UPDATE_DELAY = 1500;

const getUniqueRandomNum = randomUniqueIntBetween();

const Loader: FC = () => {
  const { data } = useHomeContext();
  const { setLoading, loading } = useGlobalContext();
  const { ui: uiConfig } = data;
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(
    getRandomElement(uiConfig.loader)
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (loadingProgress < 100) {
      getUniqueRandomNum(
        loadingProgress,
        loadingProgress + LOADING_PROGRESS_RANGE
      ).then(newProgress => {
        timeoutId = setTimeout(() => {
          setLoadingProgress(Math.min(newProgress + 1, 100));
        }, LOADING_PROGRESS_UPDATE_DELAY);
      });
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadingProgress]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText(getRandomElement(uiConfig.loader));
    }, LOADING_TEXT_UPDATE_DELAY);

    return () => {
      clearInterval(intervalId);
    };
  }, [uiConfig.loader]);

  const hasLoaded = loadingProgress >= 100;

  return (
    <div className={classNames(
      classes.loader,
      'overlay',
      { [classes.active]: loading }
    )}>
      <div className={classes.textContent}>
        <SafeHydrate>
          <div className={classNames(
            classes.label,
            "text text--xl text--center"
          )}>
            {hasLoaded ? 'Ready to roll!🔥' : loadingText}
          </div>
        </SafeHydrate>
        <div className={classNames(
          classes.progress, 'progress',
          { loaded: hasLoaded }
        )}>
          <span className="progress__indicator" style={{ width: `${loadingProgress}%` }} />
        </div>
      </div>
      <div className={classes.text}>
        <p className="text text--sub text--xl text--center">
          Designed and baked by <span className="text--xl text">MiN1One</span> with ❤️
        </p>
      </div>
    </div>
  );
};

export default memo(Loader);