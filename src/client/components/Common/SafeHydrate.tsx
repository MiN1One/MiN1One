import { FC, useEffect, useState } from "react";

interface SafeHydrateProps {
  children: React.ReactNode;
  releaseContent?: boolean;
}

const SafeHydrate: FC<SafeHydrateProps> = ({ children, releaseContent }) => {
  const [contentRendered, setContentRendered] = useState(false);

  useEffect(() => {
    setContentRendered(true);
  }, []);

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