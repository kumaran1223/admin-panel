import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/context/ThemeContext';
import { UIProvider } from '@/context/UIContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <UIProvider>
        <Component {...pageProps} />
      </UIProvider>
    </ThemeProvider>
  );
}
