// extractToc.ts
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';

export interface TocItem {
  id: string;
  text: string;
  level: number;
  children?: TocItem[];
}

export function extractToc(content: string): TocItem[] {
  const tree = unified().use(remarkParse).parse(content);
  const toc: TocItem[] = [];
  const stack: TocItem[] = [];

  visit(tree, 'heading', (node: any) => {
    const level: number = node.depth;
    const text = node.children
      .filter(
        (child: any) => child.type === 'text' || child.type === 'inlineCode'
      )
      .map((child: any) => child.value)
      .join('');

    const id = text
      .toLowerCase()
      .replace(/[^\w]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const tocItem: TocItem = { id, text, level, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      toc.push(tocItem);
      stack.push(tocItem);
    } else {
      const parent = stack[stack.length - 1];
      parent.children = parent.children || [];
      parent.children.push(tocItem);
      stack.push(tocItem);
    }
  });

  return toc;
}
