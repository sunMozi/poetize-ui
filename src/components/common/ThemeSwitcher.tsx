import React, { useEffect, useState } from 'react';

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

  const getThemeGradient = (theme: Theme) => {
    switch (theme) {
      case 'light':
        return 'bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200';
      case 'dark':
        return 'bg-gradient-to-br from-gray-800 via-gray-900 to-black';
      case 'cupcake':
        return 'bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300';
      case 'bumblebee':
        return 'bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-400';
      case 'emerald':
        return 'bg-gradient-to-br from-green-400 via-green-300 to-green-500';
      case 'corporate':
        return 'bg-gradient-to-br from-blue-400 via-blue-300 to-blue-500';
      case 'synthwave':
        return 'bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700';
      case 'retro':
        return 'bg-gradient-to-br from-orange-300 via-orange-200 to-orange-400';
      case 'cyberpunk':
        return 'bg-gradient-to-br from-yellow-400 via-pink-500 to-cyan-400';
      case 'valentine':
        return 'bg-gradient-to-br from-pink-300 via-rose-200 to-pink-400';
      case 'halloween':
        return 'bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800';
      case 'garden':
        return 'bg-gradient-to-br from-green-300 via-emerald-200 to-green-400';
      case 'forest':
        return 'bg-gradient-to-br from-green-700 via-green-800 to-green-900';
      case 'aqua':
        return 'bg-gradient-to-br from-blue-300 via-cyan-200 to-blue-400';
      case 'luxury':
        return 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900';
      case 'dracula':
        return 'bg-gradient-to-br from-purple-800 via-violet-900 to-purple-900';
      case 'night':
        return 'bg-gradient-to-br from-gray-800 via-gray-900 to-black';
      case 'coffee':
        return 'bg-gradient-to-br from-amber-800 via-amber-900 to-amber-950';
      case 'winter':
        return 'bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200';
      default:
        return 'bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200';
    }
  };

  return (
    <div className="w-full p-4 mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
          选择主题风格
        </h2>
        <p className="mt-1 text-sm text-gray-500">点击下方卡片切换主题</p>
      </div>
      <div className="mt-6 text-center">
        <div className="inline-block px-4 py-2 rounded-lg bg-base-200">
          <span className="text-sm">当前主题: </span>
          <span className="font-bold text-primary">{theme}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {themes.map((t) => (
          <button
            key={t}
            className={`h-15 w-full rounded-lg overflow-hidden shadow-md transform transition-all duration-300
              hover:scale-105 hover:shadow-lg active:scale-95
              ${getThemeGradient(t)}
              ${
                theme === t
                  ? 'ring-4 ring-offset-2 ring-primary'
                  : 'ring-1 ring-black ring-opacity-10'
              }
            `}
            onClick={() => applyTheme(t)}
          >
            <div className="flex flex-col items-center justify-center h-full p-2">
              <div
                className={`text-xs font-semibold px-2 py-1 rounded-full
                  ${
                    t.includes('dark') ||
                    [
                      'dracula',
                      'night',
                      'coffee',
                      'halloween',
                      'forest',
                    ].includes(t)
                      ? 'text-white bg-black bg-opacity-30'
                      : 'text-gray-800 bg-white bg-opacity-60'
                  }
                `}
              >
                {t}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
