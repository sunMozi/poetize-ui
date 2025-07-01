import React, { useState, useEffect } from 'react';

const HomePage: React.FC = () => {
  const webTitle = ['我的', '博客', '首页'];
  const showAside = true;
  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const phrases = React.useMemo(
    () => [
      '欢迎来到我的个人空间',
      '探索技术与生活的交汇点',
      '记录思考与成长的历程',
    ],
    []
  );

  // 打字机效果
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let charIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      if (charIndex <= currentPhrase.length) {
        setTypedText(currentPhrase.substring(0, charIndex));
        charIndex++;
        timeout = setTimeout(type, 100);
      } else {
        timeout = setTimeout(() => {
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 2000);
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [currentPhraseIndex, phrases]);

  const scrollToContent = () => {
    document.querySelector('.page-container-wrap')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* 首页背景图 */}
      <div className="relative w-full overflow-hidden h-[80vh] bg-base-200">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-[1]"></div>
        <img
          src="https://cdn.pixabay.com/photo/2020/03/11/15/16/couple-4922442_1280.jpg"
          alt="背景图"
          className="absolute inset-0 object-cover w-full h-full animate-fadeIn"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/1920x1080?text=备用背景图';
          }}
        />

        {/* 首页文字区 */}
        <section className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center myCenter">
          <h1 className="flex justify-center mb-8 space-x-1 text-4xl font-bold md:text-6xl playful">
            {webTitle.map((char, idx) => (
              <span
                key={idx}
                className="inline-block text-white animate-float"
                style={{
                  animationDelay: `${idx * 0.1}s`,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* 打字机效果区 */}
          <div className="w-full max-w-2xl px-4 mt-4 cursor-pointer">
            <div className="inline-block p-6 border shadow-xl rounded-2xl bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="font-mono text-xl md:text-2xl text-white min-h-[2.5rem]">
                {typedText}
                <span className="ml-1 animate-pulse">|</span>
              </h3>
            </div>
          </div>

          {/* 向下箭头 */}
          <button
            aria-label="向下导航"
            onClick={scrollToContent}
            className="mt-12 text-4xl text-white transition-all animate-bounce hover:scale-110"
          >
            ↓
          </button>
        </section>
      </div>

      {/* 主页内容容器 */}
      <div className="flex gap-6 px-4 mx-auto mt-10 page-container-wrap max-w-7xl">
        {/* 侧边栏 */}
        {showAside && (
          <aside className="hidden  lg:block w-[150px] sticky top-24 h-[calc(100vh-6rem)] overflow-auto">
            <div className="p-6 border shadow-lg text-base-content bg-gradient-to-b from-base-100 to-base-200 rounded-2xl border-base-300">
              {/* 分类标题 */}
              <h3 className="pb-3 mb-5 text-xl font-bold text-center border-b border-base-300">
                博客分类
              </h3>

              {/* 占位分类列表 */}
              <ul className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <li
                    key={index}
                    className="flex items-center p-3 rounded-xl bg-base-300 animate-pulse"
                  >
                    <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                    <div className="w-24 h-4 rounded bg-base-200"></div>
                  </li>
                ))}
              </ul>

              {/* 占位热门标签 */}
              <div className="mt-8">
                <h3 className="mb-3 text-lg font-semibold">热门标签</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-base-300 animate-pulse"
                    >
                      &nbsp;
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* 主要内容 */}
        <main className="flex-grow">
          {/* 公告条 */}
          <section className="p-5 mb-8 border shadow rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <div className="flex items-start">
              <div className="mt-1 mr-3 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <div className="text-base-content">
                <h3 className="mb-1 text-lg font-bold">网站公告</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 rounded-full bg-primary"></span>
                    <span>新功能：暗黑模式已上线，可在底部切换</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 rounded-full bg-primary"></span>
                    <span>博客评论系统升级，支持Markdown语法</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 文章展示 */}
          <section className="space-y-12">
            {[
              { id: 1, sortName: '技术文章', icon: '💻' },
              { id: 2, sortName: '设计思考', icon: '🎨' },
              { id: 3, sortName: '生活随笔', icon: '📝' },
            ].map((sort) => (
              <div key={sort.id} className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3 text-xl font-bold">
                    <span className="text-2xl">{sort.icon}</span>
                    <h2 className="text-2xl">{sort.sortName}</h2>
                  </div>
                  <button className="flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-full bg-base-200 hover:bg-primary hover:text-white group">
                    查看更多
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* 文章展示 */}
                <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="overflow-hidden transition-all duration-300 border shadow-lg group rounded-2xl bg-base-100 border-base-300 hover:shadow-xl hover:-translate-y-1"
                    >
                      <div className="relative h-48 overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500">
                        <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/70 to-transparent">
                          <h3 className="text-xl font-bold text-white">
                            文章标题 {idx + 1}
                          </h3>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="mb-4 text-base-content/80 line-clamp-2">
                          这是一篇关于前沿技术的深度解析文章，探讨了最新框架的应用场景和性能优化技巧...
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-primary">2023-06-15</span>
                          <span className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            256
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            ))}
          </section>
        </main>
      </div>
    </>
  );
};

export default HomePage;
