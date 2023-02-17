import { useGlobalContext } from "@client/contexts/GlobalContext";
import classNames from "classnames";
import { FC, memo, useMemo } from "react";
import { TypeAnimation } from "react-type-animation";
import classes from './Loader.module.scss';
import { getRandomElement, getRandomInt } from "@client/utils/random.utils";
import SafeHydrate from "../Common/SafeHydrate";
import { useHomeContext } from "@client/contexts/HomeContext";

const Loader: FC = () => {
  const { data } = useHomeContext();
  const { setLoading, } = useGlobalContext();

  const { ui: uiConfig } = data;

  const animationSequence = useMemo(() => ([
    100,
    '*****************',
    getRandomInt(2) * 100,
    '*********************',
    getRandomInt(2) * 100,
    '******************************',
    100,
    '***********************************',
    150,
    '*******************************************',
    () => setLoading(false)
  ]), []);

  return (
    <div className={classNames(classes.loader, 'overlay fade')}>
      <SafeHydrate>
        <div className={classNames(classes.label, "text text--xl")}>
          {getRandomElement(uiConfig.loader)}
        </div>
      </SafeHydrate>
      <div className={classes.progress}>
        [
          <span className={classes.indicator}>
            <TypeAnimation
              sequence={animationSequence}
              cursor={false}
              speed={57}
            />
          </span>
        ]
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