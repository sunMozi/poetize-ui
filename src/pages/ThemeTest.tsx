import React, { useState } from 'react';

const themes = ['light', 'dark', 'cupcake', 'retro', 'dracula'] as const;
type Theme = (typeof themes)[number];

export default function ThemeTest() {
  const [theme, setTheme] = useState<Theme>('light');

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen p-8 bg-base-100 text-base-content">
      <select
        className="mb-4 select select-bordered"
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <h1 className="mb-2 text-4xl font-bold text-primary">主题切换测试</h1>
      <p>当前主题: {theme}</p>
      <button className="mt-4 btn btn-primary">按钮示例</button>
    </div>
  );
}
