import { useEffect, useState } from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Switch } from '@mui/material';
import type { AppProps } from 'next/app';

import useTheme from '../hooks/useTheme';
import { store } from '../redux/store';

import * as styles from './_app.styles';

import '../styles/global.scss';
export default function App({ Component, pageProps }: AppProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Switch
        icon={<Brightness5Icon color="inherit" sx={styles.brightness5Icon} />}
        onClick={toggleTheme}
        sx={styles.switchWrapper}
        checked={theme === 'dark'}
        checkedIcon={<ModeNightIcon color="action" sx={styles.modeNightIcon} />}
      />
    </Provider>
  );
}
