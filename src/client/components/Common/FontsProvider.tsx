import { FC } from "react";
import localFont from '@next/font/local';
import { Ubuntu } from '@next/font/google';

const hackFonts = localFont({
  src: [
    {
      path: '../../../../static/fonts/fonts/Hack-Bold.ttf',
      style: 'bold',
      weight: '600'
    },
    {
      path: '../../../../static/fonts/fonts/Hack-Italic.ttf',
      style: 'italic',
      weight: '400',
    },
    {
      path: '../../../../static/fonts/fonts/Hack-Regular.ttf',
      style: 'normal',
      weight: '400'
    }
  ],
});

const ubuntuFonts = Ubuntu({
  weight: ['300', '400', '500', '700'],
  style: ['italic', 'normal'],
  subsets: ['latin'],
  display: 'swap'
});

const FontsProvider: FC = () => {
  return (
    <style jsx global>{`
      :root {
        --font-primary: ${hackFonts.style.fontFamily};
        --font-secondary: ${ubuntuFonts.style.fontFamily};
      }
    `}</style>
  );
};

export default FontsProvider;