import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/common/ProfileCard';
import ArticleGrid from '../components/common/article/ArticleGrid';
import NoticeBar from '../components/common/NoticeBar';
import SectionHeader from '../components/common/SectionHeader';
import TypingText from '../components/common/TypingText';
import http from '../utils/http';
import type { UserProfile } from '../types/user';
import type { Notice } from '../types/notice';
import type { Article } from '../types/article';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface Category {
  id: number;
  sortName: string;
  icon: string; // 字符串，可能是emoji或者URL
}

const HomePage: React.FC = () => {
  const webTitle = "Zyan's  Space".split('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [articlesMap, setArticlesMap] = useState<Record<number, Article[]>>({});
  const showAside = true;

  // 加载用户信息
  useEffect(() => {
    http
      .get<UserProfile>('/webInfo/profile')
      .then((data) =>
        setProfile({
          ...data,
          articlesCount: data.articlesCount ?? 0,
          categoriesCount: data.categoriesCount ?? 0,
          views: data.views ?? 0,
        })
      )
      .catch((err) => console.error('加载用户信息失败', err));
  }, []);

  // 加载站点通知，自动过滤生效时间内的通知
  useEffect(() => {
    http
      .get<Notice[]>('/siteNotice/latest')
      .then((notices) => {
        const now = new Date();
        const validNotices = notices.filter(
          (notice) =>
            notice.isActive &&
            new Date(notice.startTime) <= now &&
            (!notice.endTime || new Date(notice.endTime) >= now)
        );
        setNotices(validNotices);
      })
      .catch((err) => console.error('加载最新通知失败', err));
  }, []);

  // 加载热门分类
  useEffect(() => {
    http
      .get<Category[]>('/category/popular')
      .then(setCategories)
      .catch((err) => console.error('加载热门分类失败', err));
  }, []);

  const fetchArticlesByCategory = async (categoryId: number) => {
    try {
      const res = await http.get<{
        rows: Article[];
      }>('/article/list', {
        params: {
          categoryId,
          pageNum: 1,
          pageSize: 3,
        },
      });

      console.log(`获取分类 ${categoryId} 文章成功`, res);
      setArticlesMap((prev) => ({
        ...prev,
        [categoryId]: res.rows ?? [],
      }));
    } catch (error) {
      console.error('请求文章列表失败', error);
    }
  };

  // 分类变更后触发文章加载
  useEffect(() => {
    if (categories.length > 0) {
      categories.forEach((cat) => fetchArticlesByCategory(cat.id));
    }
  }, [categories]);

  // 平滑滚动到内容区
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
          <aside className="hidden lg:block w-80 sticky top-24 h-[calc(100vh-6rem)] overflow-auto">
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
                <LoadingSpinner message="加载用户信息中..." />
              )}
            </div>
          </aside>
        )}

        <main className="flex-grow">
          <NoticeBar notices={notices} />

          <section className="space-y-12">
            {categories.map((cat) => (
              <div key={cat.id} className="mb-10">
                <SectionHeader
                  icon={
                    cat.icon?.startsWith('http') ? (
                      <img
                        src={cat.icon}
                        alt={cat.sortName}
                        className="inline-block w-4 h-4 mr-1"
                      />
                    ) : (
                      <span className="text-lg">{cat.icon}</span>
                    )
                  }
                  title={cat.sortName}
                  onMoreClick={() => console.log(`查看更多: ${cat.sortName}`)}
                />
                <ArticleGrid articles={articlesMap[cat.id] ?? []} />
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
