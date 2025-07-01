import React, { useEffect, useState } from 'react';

// 内置 daisyUI 主题，可以扩展自己的主题
const themes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'luxury',
  'dracula',
  'night',
  'coffee',
  'winter',
] as const;

type Theme = (typeof themes)[number];

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved && themes.includes(saved)) {
      applyTheme(saved);
    } else {
      applyTheme('light');
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">主题:</span>
      <select
        className="select select-sm select-bordered"
        value={theme}
        onChange={(e) => applyTheme(e.target.value as Theme)}
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSwitcher;
