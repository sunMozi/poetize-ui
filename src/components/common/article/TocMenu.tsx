// TocMenu.tsx
import React from 'react';
import type { TocItem } from '../../../utils/extractToc';

interface TocMenuProps {
  toc: TocItem[];
}

const TocMenu: React.FC<TocMenuProps> = ({ toc }) => {
  return (
    <nav className="sticky top-20 max-h-[80vh] overflow-auto px-2">
      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
        {toc.map((item, index) => (
          <TocMenuItem key={item.id} item={item} indexPath={[index + 1]} />
        ))}
      </ul>
    </nav>
  );
};

interface TocMenuItemProps {
  item: TocItem;
  indexPath: number[];
}

const TocMenuItem: React.FC<TocMenuItemProps> = ({ item, indexPath }) => {
  const indexStr = indexPath.join('.');

  return (
    <li className={`ml-${(item.level - 1) * 4}`}>
      <a
        href={`#${item.id}`}
        className="block px-2 py-1 transition-colors rounded hover:bg-primary hover:text-white"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById(item.id);
          if (el) {
            window.history.pushState(null, '', `#${item.id}`);
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        <span className="mr-2 font-mono text-xs text-gray-400">{indexStr}</span>
        {item.text}
      </a>
      {item.children && item.children.length > 0 && (
        <ul>
          {item.children.map((child, idx) => (
            <TocMenuItem
              key={child.id}
              item={child}
              indexPath={[...indexPath, idx + 1]}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TocMenu;
