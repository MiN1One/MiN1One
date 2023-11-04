import { useGlobalContext } from "@client/contexts/GlobalContext";
import { useHomeContext } from "@client/contexts/HomeContext";
import { debounce } from "@client/utils/throttle.utils";
import { FC, memo, useCallback, useEffect, useMemo, useRef } from "react";
import { withSafeHydration } from "../Common/SafeHydrate";

let letters: string | string[] = 'AKLMNOLMNOPQRSTUVXYZABCDQRSTUVXYZABCDEFGHIJKMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKEFGHIJKLPLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQBCDEFGHIJRSTUVXYZ1234567890';
letters = letters.split('');

const FONT_SIZE = 23;
const BROWSER_FONT_SIZE = 16;

const BgAnimation: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalIdRef = useRef<NodeJS.Timeout>(null);
  const { activeSection } = useHomeContext();
  const { media } = useGlobalContext();
  const dropsRef = useRef<number[]>([]);
  const canvasContextRef = useRef<CanvasRenderingContext2D>(null);

  const setCanvasContext = useCallback(() => {
    canvasContextRef.current = canvasRef.current.getContext('2d');
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    const htmlStyles = window.getComputedStyle(document.documentElement, null);
    const staticFontSize = parseFloat(
      htmlStyles.getPropertyValue('font-size')
    );
    const fontSizeInPercents = staticFontSize / BROWSER_FONT_SIZE;
    const newFontSizeInPx = FONT_SIZE * fontSizeInPercents;
    canvasContextRef.current.font = `${newFontSizeInPx}px Hack`;
  }, []);

  const renderDropLets = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    const canvas = canvasRef.current;
    const drops = dropsRef.current;
    const ctx = canvasContextRef.current;
    const columns = canvas.width / FONT_SIZE;

    if (!drops.length) {
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        let text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = '#0f0';
        ctx.fillText(text, i * FONT_SIZE, drops[i] * FONT_SIZE);
        drops[i]++;
        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > .95) {
          drops[i] = 0;
        }
      }
    }

    intervalIdRef.current = setInterval(draw, 45);
  }, []);

  const rerenderOnResize = useCallback(
    debounce(setCanvasContext, 1000),
    [setCanvasContext]
  );

  useEffect(() => {
    if (
      !activeSection ||
      (
        (activeSection === 'home' || activeSection === 'contact') &&
        !media.tablet
      )
    ) {
      if (!canvasContextRef.current) {
        setCanvasContext();
      }
      renderDropLets();
    } else {
      clearTimeout(intervalIdRef.current);
    }
    return () => {
      clearTimeout(intervalIdRef.current);
    };
  }, [activeSection, media]);

  useEffect(() => {
    window.addEventListener('resize', rerenderOnResize);
    return () => {
      window.removeEventListener('resize', rerenderOnResize);
    };
  }, []);

  const canvasEl = useMemo(() => <canvas ref={canvasRef} />, []);

  return canvasEl;
};

export default memo(withSafeHydration(BgAnimation));