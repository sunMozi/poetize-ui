import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

import CodeBlock from './CodeBlock';

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
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          h1: ({ children }) => (
            <h1 className="pb-2 mt-6 mb-4 text-xl font-bold border-b sm:text-2xl md:text-3xl xl:text-4xl text-foreground sm:mb-6 sm:mt-8 border-border">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-5 mb-3 text-lg font-semibold sm:text-xl md:text-2xl xl:text-3xl text-foreground sm:mb-4 sm:mt-6">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-4 mb-2 text-base font-medium sm:text-lg md:text-xl xl:text-2xl text-foreground sm:mb-3 sm:mt-5">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-3 mb-2 text-sm font-medium sm:text-base md:text-lg xl:text-xl text-foreground sm:mt-4">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-3 text-sm leading-relaxed text-secondary sm:mb-4 sm:text-base xl:text-lg">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="pl-2 mb-3 space-y-1 list-disc list-inside sm:mb-4 sm:space-y-2 text-secondary sm:pl-0">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="pl-2 mb-3 space-y-1 list-decimal list-inside sm:mb-4 sm:space-y-2 text-secondary sm:pl-0">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-sm leading-relaxed sm:text-base xl:text-lg">
              {children}
            </li>
          ),
          img: ({ src, alt }) => (
            <div className="my-6 sm:my-8 group">
              <img
                src={src}
                alt={alt}
                className="w-full rounded-xl shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02] dark:border-slate-700 bg-white dark:bg-slate-800"
                loading="lazy"
              />
              {alt && (
                <div className="mt-3 text-sm italic text-center text-muted-foreground">
                  {alt}
                </div>
              )}
            </div>
          ),
          blockquote: ({ children }) => (
            <blockquote className="py-2 pl-3 my-3 text-sm italic border-l-4 rounded-r-lg border-primary sm:pl-4 sm:my-4 bg-muted/50 text-secondary sm:text-base">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="underline break-words transition-colors text-primary hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-secondary">{children}</em>
          ),
          hr: () => <hr className="my-6 sm:my-8 border-border" />,
          table: ({ children }) => (
            <div className="my-4 -mx-4 overflow-x-auto sm:my-6 sm:mx-0">
              <div className="min-w-full px-4 sm:px-0">
                <table className="min-w-full text-sm border rounded-lg border-border sm:text-base">
                  {children}
                </table>
              </div>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-border">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="transition-colors hover:bg-muted/50">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-2 py-2 text-xs font-semibold text-left border-b sm:px-4 sm:py-3 text-foreground border-border sm:text-sm">
              {children}
            </th>
          ),
          td: ({ children, ...props }) => {
            const { ...rest } = props; // 过滤非法 DOM 属性
            return (
              <td
                {...rest}
                className="px-2 py-2 text-xs border-b sm:px-4 sm:py-3 text-secondary border-border sm:text-sm"
              >
                {children}
              </td>
            );
          },
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    </section>
  );
};

export default MarkdownRenderer;
