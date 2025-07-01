import React from 'react';
import ProfileCard from '../components/common/ProfileCard';
import ArticleGrid from '../components/common/article/ArticleGrid';
import NoticeBar from '../components/common/NoticeBar';
import SectionHeader from '../components/common/SectionHeader';
import TypingText from '../components/common/TypingText';

const HomePage: React.FC = () => {
  const webTitle = ['我的', '博客', '首页'];
  const showAside = true;

  const generateArticles = (categoryId: number) => {
    return Array.from({ length: 3 }).map((_, idx) => ({
      id: categoryId * 100 + idx + 1, // 为不同分类生成不同 ID，避免重复
      title: `文章标题 ${categoryId}-${idx + 1}`,
      description:
        '这是一篇关于前沿技术的深度解析文章，探讨了最新框架的应用场景和性能优化技巧...',
      date: '2023-06-15',
      views: 256 + idx * 10,
      coverGradient:
        idx % 2 === 0
          ? 'from-blue-400 to-purple-500'
          : 'from-green-400 to-yellow-500',
    }));
  };

  const scrollToContent = () => {
    document.querySelector('.page-container-wrap')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* 首页背景图 */}
      <div className="relative w-full overflow-hidden h-[80vh] bg-base-200">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-[1]" />
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

          <TypingText
            phrases={[
              '欢迎来到我的个人空间',
              '探索技术与生活的交汇点',
              '记录思考与成长的历程',
            ]}
          />

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
        {showAside && (
          <aside className="hidden lg:block w-150 sticky top-24 h-[calc(100vh-6rem)] overflow-auto">
            <div className="p-6 border shadow-lg text-base-content bg-gradient-to-b from-base-100 to-base-200 rounded-2xl border-base-300">
              <ProfileCard
                avatarUrl="https://via.placeholder.com/150"
                name="张三"
                bio="前端开发工程师，热爱技术与设计"
                socialLinks={[
                  {
                    label: 'GitHub',
                    url: '#',
                    colorClass: 'bg-primary hover:bg-primary-focus',
                  },
                  {
                    label: 'Twitter',
                    url: '#',
                    colorClass: 'bg-secondary hover:bg-secondary-focus',
                  },
                  {
                    label: 'LinkedIn',
                    url: '#',
                    colorClass: 'bg-accent hover:bg-accent-focus',
                  },
                  {
                    label: 'Bilibili',
                    url: '#',
                    colorClass: 'bg-info hover:bg-info-focus',
                  },
                ]}
              />
            </div>
          </aside>
        )}

        <main className="flex-grow">
          <NoticeBar
            notices={[
              '新功能：暗黑模式已上线，可在底部切换',
              '博客评论系统升级，支持Markdown语法',
            ]}
          />

          <section className="space-y-12">
            {[
              { id: 1, sortName: '技术文章', icon: '💻' },
              { id: 2, sortName: '设计思考', icon: '🎨' },
              { id: 3, sortName: '生活随笔', icon: '📝' },
            ].map((sort) => (
              <div key={sort.id} className="mb-10">
                <SectionHeader
                  icon={sort.icon}
                  title={sort.sortName}
                  onMoreClick={() => console.log(`查看更多: ${sort.sortName}`)}
                />
                <ArticleGrid articles={generateArticles(sort.id)} />
              </div>
            ))}
          </section>
        </main>
      </div>
    </>
  );
};

export default HomePage;
