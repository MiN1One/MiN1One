import classNames from "classnames";
import { DetailedHTMLProps, FC, ImgHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";

interface ImageWithLoaderProps extends DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> {
  src: string;
  imageKey?: string;
  onImageLoaded?: (imageKey?: string) => void;
  root?: HTMLElement;
  loadingClass?: string;
};

declare global {
  interface HTMLImageElement {
    load: (src: string) => void;
  }
}

export const IMAGES_CACHE = new Map<string, string>();

export const ImageWithLoader: FC<ImageWithLoaderProps> = (props) => {
  const { onImageLoaded, root, imageKey, loadingClass, ...restProps } = props;
  const [imageLoadProgress, setImageLoadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const imageRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const xmlHTTPRef = useRef<XMLHttpRequest>(
    typeof window !== 'undefined' ? new XMLHttpRequest() : null
  );

  const hasLoaded = imageLoadProgress >= 100;
  const image = restProps.src;

  const loadImage = useCallback(() => {
    if (IMAGES_CACHE.has(image)) {
      setImageUrl(IMAGES_CACHE.get(image));
      setImageLoadProgress(100);
      if (typeof onImageLoaded === 'function') {
        onImageLoaded(imageKey);
      }
      return;
    }
    const xmlHTTP = xmlHTTPRef.current;
    if (
      xmlHTTP.readyState === xmlHTTP.LOADING ||
      xmlHTTP.readyState === xmlHTTP.OPENED
    ) {
      xmlHTTP.abort();
    }
    xmlHTTP.open('GET', image, true);
    xmlHTTP.responseType = 'arraybuffer';

    xmlHTTP.onload = function () {
      const headers = xmlHTTP.getAllResponseHeaders();
      const headersMatch = headers.match(/^Content-Type\:\s*(.*?)$/mi);
      const mimeType = headersMatch[1] || 'image/jpeg';
      const blob = new Blob([this.response], { type: mimeType });
      const blobUrl = URL.createObjectURL(blob);

      setImageUrl(blobUrl);
      IMAGES_CACHE.set(image, blobUrl);

      if (typeof onImageLoaded === 'function') {
        onImageLoaded(imageKey);
      }
    };

    xmlHTTP.onprogress = (e) => {
      if (e.lengthComputable) {
        setImageLoadProgress((e.loaded / e.total) * 100);
      }
    };

    xmlHTTP.onloadend = () => setImageLoadProgress(100);
    xmlHTTP.send();
  }, [image, onImageLoaded, imageKey]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            loadImage();
          }
        });
      },
      { root, }
    );

    observer.observe(wrapperRef.current);

    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
      observer.disconnect();
    };
  }, [root, loadImage]);

  const showLoader = !hasLoaded || !imageUrl;

  return (
    <span ref={wrapperRef}>
      {showLoader
        ? (
          <div className={classNames(
            "progress",
            {
              loaded: hasLoaded,
              [loadingClass]: !hasLoaded
            },
            restProps.className
          )}>
            <span className="progress__indicator" style={{ width: `${imageLoadProgress}%` }} />
          </div>
        )
        : <img ref={imageRef} src={imageUrl} {...restProps} />
      }
    </span>
  );
};