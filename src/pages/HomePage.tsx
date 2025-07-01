import React from 'react';

// 你可以根据需要拆分更多小组件，这里做整体示范

const HomePage: React.FC = () => {
  // 模拟数据示例，可删除
  const webTitle = ['我的', '博客', '首页'];
  const showAside = true;

  return (
    <>
      {/* 首页背景图 */}
      <div className="relative w-full overflow-hidden h-96 bg-base-200">
        <img
          src="https://haowallpaper.com/link/common/file/previewFileImg/17123560858045824"
          alt="背景图"
          className="absolute inset-0 object-cover w-full h-full animate-fadeIn"
          loading="lazy"
        />
        {/* 备选背景加载失败占位 */}
        <div className="absolute inset-0 bg-base-300" />

        {/* 动态波浪装饰 - 优化版 */}
        <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden wave-container">
          {/* 波浪1 - 深色层 */}
          <div
            className="absolute bottom-0 left-0 w-[300%] h-full animate-wave1"
            style={{
              background:
                'linear-gradient(90deg, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.5) 50%, rgba(236, 72, 153, 0.4) 100%)',
              borderRadius: '50% 50%',
            }}
          />

          {/* 波浪2 - 浅色层 */}
          <div
            className="absolute bottom-0 left-0 w-[300%] h-full animate-wave2"
            style={{
              background:
                'linear-gradient(90deg, rgba(236, 72, 153, 0.2) 0%, rgba(239, 68, 68, 0.25) 50%, rgba(234, 179, 8, 0.2) 100%)',
              borderRadius: '45% 45%',
              bottom: '1rem',
            }}
          />

          {/* 波浪3 - 新增层 */}
          <div
            className="absolute bottom-0 left-0 w-[300%] h-full animate-wave3"
            style={{
              background:
                'linear-gradient(90deg, rgba(59, 130, 246, 0.3) 0%, rgba(34, 197, 94, 0.3) 50%, rgba(16, 185, 129, 0.3) 100%)',
              borderRadius: '40% 40%',
              bottom: '2rem',
            }}
          />
        </div>

        {/* 首页文字区 */}
        <section className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center myCenter my-animation-hideToShow">
          <h1 className="flex justify-center space-x-1 text-4xl font-bold playful">
            {webTitle.map((char, idx) => (
              <span key={idx}>{char}</span>
            ))}
          </h1>

          {/* 打字机效果区，占位 */}
          <div
            className="mt-4 cursor-pointer"
            onClick={() => {
              /* TODO: getGuShi */
            }}
          >
            <div className="inline-block p-4 border rounded shadow border-base-300 printer bg-base-100">
              <h3 className="font-mono text-xl text-base-content">
                {/* 模拟打印内容 */}
                这里是打印内容<span className="animate-pulse">|</span>
              </h3>
            </div>
          </div>

          {/* 向下箭头 */}
          <button
            aria-label="向下导航"
            onClick={() => {
              /* TODO: navigation('.page-container-wrap') */
            }}
            className="mt-6 text-3xl text-gray-600 transition hover:text-gray-900"
          >
            ↓
          </button>
        </section>
      </div>

      {/* 主页内容容器 */}
      <div className="flex gap-4 px-4 mx-auto mt-20 page-container-wrap max-w-7xl bg-base-100">
        {/* 侧边栏 */}
        {showAside && (
          <aside className="aside-content w-64 hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-auto shadow-lg rounded p-4 bg-base-200">
            <div className="text-base-content">
              <h3 className="mb-4 text-lg font-bold">侧边栏测试内容</h3>
              <ul className="space-y-2">
                <li className="p-2 rounded shadow bg-base-300">测试项 1</li>
                <li className="p-2 rounded shadow bg-base-300">测试项 2</li>
                <li className="p-2 rounded shadow bg-base-300">测试项 3</li>
                <li className="p-2 rounded shadow bg-base-300">测试项 4</li>
                <li className="p-2 rounded shadow bg-base-300">测试项 5</li>
              </ul>
              <div className="p-2 mt-4 rounded shadow bg-base-300">
                <p>这是一些额外的测试内容。</p>
              </div>
            </div>
          </aside>
        )}

        {/* 主要内容 */}
        <main className="flex-grow">
          {/* 公告条 */}
          <section className="flex items-center gap-2 p-3 mb-4 rounded shadow announcement bg-base-200">
            <i
              className="fa fa-volume-up text-base-content"
              aria-hidden="true"
            />
            <div className="flex flex-col text-sm text-base-content">
              {/* 这里放通知消息 */}
              <div>通知 1</div>
              <div>通知 2</div>
            </div>
          </section>

          {/* 文章展示 */}
          <section>
            {/* 示例分类列表 */}
            {[
              { id: 1, sortName: '分类1' },
              { id: 2, sortName: '分类2' },
            ].map((sort) => (
              <div key={sort.id} className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                    <svg
                      viewBox="0 0 1024 1024"
                      width={20}
                      height={20}
                      className="inline-block align-text-bottom"
                      fill="#FF623E"
                    >
                      <path d="M367.36 482.304H195.9936c-63.3344 0-114.6368-51.3536-114.6368-114.6368V196.2496c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368V367.616c0 63.3344-51.3536 114.688-114.688 114.688zM367.36 938.752H195.9936c-63.3344 0-114.6368-51.3536-114.6368-114.6368v-171.4176c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368v171.4176c0 63.3344-51.3536 114.6368-114.688 114.6368zM828.672 938.752h-171.4176c-63.3344 0-114.6368-51.3536-114.6368-114.6368v-171.4176c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368v171.4176c0 63.3344-51.3024 114.6368-114.6368 114.6368zM828.672 482.304h-171.4176c-63.3344 0-114.6368-51.3536-114.6368-114.6368V196.2496c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368V367.616c0 63.3344-51.3024 114.688-114.6368 114.688z" />
                    </svg>
                    {sort.sortName}
                  </div>
                  <button
                    className="article-more btn btn-xs btn-outline btn-primary"
                    onClick={() => {
                      /* TODO: 跳转 sort 页 */
                    }}
                  >
                    MORE
                    <svg
                      viewBox="0 0 1024 1024"
                      width={20}
                      height={20}
                      className="inline-block ml-1 align-text-bottom"
                      fill="#009F72"
                    >
                      <path d="M347.3 897.3H142.2c-30.8 0-51.4-31.7-38.9-59.9l136.1-306.1c4.9-11 4.9-23.6 0-34.6L103.3 190.6c-12.5-28.2 8.1-59.9 38.9-59.9h205.1c16.8 0 32.1 9.9 38.9 25.3l151.4 340.7c4.9 11 4.9 23.6 0 34.6L386.3 872.1c-6.9 15.3-22.1 25.2-39 25.2z" />
                      <path d="M730.4 897.3H525.3c-30.8 0-51.4-31.7-38.9-59.9l136.1-306.1c4.9-11 4.9-23.6 0-34.6L486.4 190.6c-12.5-28.2 8.1-59.9 38.9-59.9h205.1c16.8 0 32.1 9.9 38.9 25.3l151.4 340.7c4.9 11 4.9 23.6 0 34.6L769.3 872.1c-6.8 15.3-22.1 25.2-38.9 25.2z" />
                    </svg>
                  </button>
                </div>

                {/* 文章展示 */}
                <section className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="p-4 border rounded shadow text-base-content bg-base-100 border-base-300"
                    >
                      <h3 className="text-lg font-semibold">
                        文章标题 {idx + 1}
                      </h3>
                      <p className="mt-2 text-sm">这是文章的简要描述内容。</p>
                    </div>
                  ))}
                </section>
              </div>
            ))}
          </section>
        </main>
      </div>
      {/* 添加波浪动画的CSS样式 */}
      <style>{`
        @keyframes waveMove {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-wave1 {
          animation: waveMove 10s linear infinite;
          animation-delay: -2s;
        }

        .animate-wave2 {
          animation: waveMove 12s linear infinite;
          animation-delay: -4s;
        }

        .animate-wave3 {
          animation: waveMove 14s linear infinite;
          animation-delay: -6s;
        }

        .wave-container {
          transform: translateY(1rem);
          z-index: 1;
        }

        .wave-container div {
          transform-origin: bottom center;
        }
      `}</style>
    </>
  );
};

export default HomePage;
