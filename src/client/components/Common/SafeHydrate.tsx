import { FC, useEffect, useState } from "react";

interface SafeHydrateProps {
  children: React.ReactNode;
  releaseContent?: boolean;
  onRender?: () => void;
}

const SafeHydrate: FC<SafeHydrateProps> = ({
  children,
  releaseContent,
  onRender
}) => {
  const [contentRendered, setContentRendered] = useState(false);

  useEffect(() => {
    setContentRendered(true);
    if (typeof onRender === 'function') {
      onRender();
    }
  }, [onRender]);

  if (!contentRendered) return null;

  return (
    <div
      suppressHydrationWarning
      style={releaseContent ? { display: 'contents' } : undefined}
    >
      {typeof window === 'undefined' ? null : children}
    </div>
  );
};

export const withSafeHydration = (Cmp: React.ElementType) => (
  () => (
    <SafeHydrate>
      <Cmp />
    </SafeHydrate>  
  )
);

export default SafeHydrate;