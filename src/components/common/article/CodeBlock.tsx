import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || '');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return match ? (
    <div className="relative my-4 sm:my-6 group">
      {/* 语言标识和复制按钮 */}
      <div className="flex items-center justify-between px-4 py-3 border bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-t-xl border-slate-200 dark:border-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="ml-2 text-sm font-semibold tracking-wider uppercase text-slate-600 dark:text-slate-300">
            {match[1]}
          </span>
        </div>
        <button
          onClick={() => copyToClipboard(String(children).replace(/\n$/, ''))}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-all duration-200 rounded-lg bg-white/60 dark:bg-slate-600/60 hover:bg-white dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-500 hover:border-slate-300 dark:hover:border-slate-400 shadow-sm hover:shadow-md"
          title="复制代码"
        >
          {copied ? (
            <>
              <svg
                className="w-4 h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-green-600 dark:text-green-400">已复制</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>复制</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto border-b shadow-lg rounded-b-xl border-x border-slate-200 dark:border-slate-600">
        <SyntaxHighlighter
          style={tomorrow as any}
          language={match[1]}
          PreTag="pre" // 或者直接删除这个属性，使用默认
          className="!rounded-t-none !rounded-b-xl text-sm sm:text-base xl:text-lg !m-0"
          customStyle={{
            margin: 0,
            padding: '20px 24px',
            fontSize: 'inherit',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: '0.75rem',
            borderBottomRightRadius: '0.75rem',
            background: '#1a1a1a',
            lineHeight: '1.6',
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    </div>
  ) : (
    <code className="bg-muted px-1 sm:px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono text-primary break-words">
      {children}
    </code>
  );
};

export default CodeBlock;
