// MarkdownRenderer.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';

interface MarkdownRendererProps {
  content: string;
  fontFamily?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
}) => {
  return (
    <section
      className="p-6 prose prose-lg max-w-none dark:prose-invert md:p-8 lg:p-12 prose-pre:text-left"
      style={{ fontFamily }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code: ({
            inline,
            className,
            children,
            ...props
          }: {
            inline?: boolean;
            className?: string;
            children?: React.ReactNode;
          }) => {
            const codeString = String(children).replace(/\n$/, '');
            const match = /language-(\w+)/.exec(className || '');

            if (inline) {
              return (
                <code
                  {...props}
                  className="px-1 py-[0.15rem] rounded bg-base-200 text-base-content font-mono text-sm shadow-sm"
                >
                  {children}
                </code>
              );
            } else if (match) {
              const language = match[1];
              const grammar =
                Prism.languages[language] || Prism.languages.markup;
              const html = Prism.highlight(codeString, grammar, language);

              return (
                <div className="relative w-full my-6 overflow-auto font-mono text-sm text-left rounded-lg shadow bg-base-300 text-base-content theme-code">
                  <pre className="p-4 m-0">
                    <code
                      className={`language-${language}`}
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  </pre>
                </div>
              );
            } else {
              return (
                <pre className="w-full p-4 my-6 overflow-auto font-mono text-sm text-left rounded-lg shadow bg-base-300 text-base-content">
                  <code {...props}>{children}</code>
                </pre>
              );
            }
          },
          img: (props) => (
            <img
              {...props}
              loading="lazy"
              className="max-w-full mx-auto transition-transform duration-300 rounded-lg shadow-md hover:scale-105 theme-img"
              alt={props.alt ?? ''}
            />
          ),
          a: (props) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary theme-link"
            />
          ),
          blockquote: (props) => (
            <blockquote
              {...props}
              className="p-4 my-6 text-lg italic border-l-4 rounded-lg border-primary bg-base-200 theme-blockquote"
            />
          ),
          table: (props) => (
            <table
              {...props}
              className="table w-full my-4 border border-base-300 theme-table"
            />
          ),
          thead: (props) => (
            <thead
              {...props}
              className="font-bold bg-base-300 text-base-content theme-thead"
            />
          ),
          th: (props) => (
            <th
              {...props}
              className="px-4 py-2 font-semibold border border-base-300 theme-th"
            />
          ),
          tbody: (props) => (
            <tbody {...props} className="bg-base-100 theme-tbody" />
          ),
          tr: (props) => (
            <tr
              {...props}
              className="hover:bg-base-200 even:bg-base-100 theme-tr"
            />
          ),
          td: (props) => (
            <td
              {...props}
              className="px-4 py-2 border border-base-300 theme-td"
            />
          ),
          li: (props) => (
            <li
              {...props}
              className="mb-2 list-disc marker:text-primary theme-li"
            />
          ),
          h1: (props) => (
            <h1
              {...props}
              className="my-6 text-4xl font-bold text-primary theme-h1"
              id={String(props.children)
                .toLowerCase()
                .replace(/[^\w]+/g, '-')
                .replace(/(^-|-$)/g, '')}
            />
          ),
          h2: (props) => (
            <h2
              {...props}
              className="my-5 text-3xl font-semibold text-secondary theme-h2"
              id={String(props.children)
                .toLowerCase()
                .replace(/[^\w]+/g, '-')
                .replace(/(^-|-$)/g, '')}
            />
          ),
          h3: (props) => (
            <h3
              {...props}
              className="my-4 text-2xl font-medium text-accent theme-h3"
              id={String(props.children)
                .toLowerCase()
                .replace(/[^\w]+/g, '-')
                .replace(/(^-|-$)/g, '')}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </section>
  );
};

export default MarkdownRenderer;
