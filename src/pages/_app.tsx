import { useState } from 'react';
import { Provider } from 'react-redux';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Switch } from '@mui/material';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

import { store } from '../redux/store';

import * as styles from './_app.styles';

import '../styles/globals.scss';
export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState('light');

  const handleClick = () => {
    if (mode == 'light') {
      setMode(() => {
        document.querySelector('body')?.setAttribute('data-theme', 'dark');
        return 'dark';
      });
    } else {
      setMode(() => {
        document.querySelector('body')?.setAttribute('data-theme', 'light');
        return 'light';
      });
    }
  };
  return (
    <Provider store={store}>
      <NextNProgress />
      <Component {...pageProps} />
      <Switch
        icon={<Brightness5Icon color="inherit" sx={styles.brightness5Icon} />}
        onClick={handleClick}
        sx={styles.switchWrapper}
        checkedIcon={<ModeNightIcon color="action" sx={styles.modeNightIcon} />}
      />
    </Provider>
  );
}
