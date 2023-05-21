import { useEffect, useState } from 'react';

const useTheme = (initialTheme = 'light') => {
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.querySelector('body')?.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.querySelector('body')?.setAttribute('data-theme', storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;
