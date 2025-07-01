import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/common/ProfileCard';
import ArticleGrid from '../components/common/article/ArticleGrid';
import NoticeBar from '../components/common/NoticeBar';
import SectionHeader from '../components/common/SectionHeader';
import TypingText from '../components/common/TypingText';
import http from '../utils/http';

// Profile 数据类型
interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

interface UserProfile {
  avatarUrl: string;
  name: string;
  bio: string;
  articlesCount: number;
  categoriesCount: number;
  views: number;
  socialLinks: SocialLink[];
}

const HomePage: React.FC = () => {
  const webTitle = "Zyan's  Space".split('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const showAside = true;

  useEffect(() => {
    http
      .get<UserProfile>('/webInfo/profile')
      .then((data) =>
        setProfile({
          ...data,
          articlesCount: data.articlesCount || 0,
          categoriesCount: data.categoriesCount || 0,
          views: data.views || 0,
        })
      )
      .catch((err) => {
        console.error('加载用户信息失败', err);
      });
  }, []);

  const generateArticles = (categoryId: number) => {
    return Array.from({ length: 3 }).map((_, idx) => ({
      id: categoryId * 100 + idx + 1,
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
    <div className="flex flex-col min-h-screen bg-base-100">
      {/* 首页背景图 */}
      <div className="relative w-full overflow-hidden h-[50vh] bg-base-200">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-[1]" />
        <img
          src="https://images.pexels.com/photos/1435075/pexels-photo-1435075.jpeg"
          alt="背景图"
          className="absolute inset-0 object-cover w-full h-full animate-fadeIn"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg';
          }}
        />

        <section className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center myCenter">
          <h1 className="flex justify-center mb-8 space-x-1 text-4xl font-bold md:text-6xl playful">
            {webTitle.map((char, idx) => (
              <span
                key={idx}
                className="inline-block font-mono text-white animate-float"
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

      <div className="flex gap-6 px-4 mx-auto mt-10 page-container-wrap max-w-7xl">
        {showAside && (
          <aside className="hidden lg:block w-200 sticky top-24 h-[calc(100vh-6rem)] overflow-auto">
            <div className="p-6 border shadow-lg text-base-content bg-gradient-to-b from-base-100 to-base-200 rounded-2xl border-base-300">
              {profile ? (
                <ProfileCard
                  avatarUrl={profile.avatarUrl}
                  name={profile.name}
                  bio={profile.bio}
                  socialLinks={profile.socialLinks}
                  articlesCount={profile.articlesCount}
                  categoriesCount={profile.categoriesCount}
                  views={profile.views}
                />
              ) : (
                <div className="text-center text-gray-400">加载中...</div>
              )}
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
    </div>
  );
};

export default HomePage;
