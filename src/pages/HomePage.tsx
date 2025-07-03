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
  icon: string;
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

  // 加载站点通知
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

  // 加载分类文章
  const fetchArticlesByCategory = async (categoryId: number) => {
    try {
      const res = await http.get<{
        rows: Article[];
      }>('/article/list', {
        params: { categoryId, pageNum: 1, pageSize: 3 },
      });
      setArticlesMap((prev) => ({
        ...prev,
        [categoryId]: res.rows ?? [],
      }));
    } catch (error) {
      console.error('请求文章列表失败', error);
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      categories.forEach((cat) => fetchArticlesByCategory(cat.id));
    }
  }, [categories]);

  // 平滑滚动到内容区
  const scrollToContent = () => {
    document
      .querySelector('.page-container-wrap')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      {/* 顶部背景区 */}
      <div className="relative w-full h-[55vh] md:h-[60vh] bg-base-200 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1435075/pexels-photo-1435075.jpeg"
          alt="背景图"
          className="absolute inset-0 object-cover w-full h-full brightness-75 saturate-90"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg';
          }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
        <section className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="flex flex-wrap justify-center mb-8 text-5xl font-extrabold text-white select-none md:text-7xl playful">
            {webTitle.map((char, idx) => (
              <span
                key={idx}
                className="inline-block font-mono animate-float"
                style={{
                  animationDelay: `${idx * 0.1}s`,
                  textShadow: '0 2px 10px rgba(0,0,0,0.4)',
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
            className="text-5xl text-white transition-transform mt-14 animate-bounce hover:scale-110 focus:outline-none"
          >
            ↓
          </button>
        </section>
      </div>

      {/* 主体内容区域 */}
      <div className="flex flex-col gap-10 px-4 mx-auto mt-12 lg:flex-row max-w-7xl page-container-wrap">
        {/* 侧边栏 */}
        {showAside && (
          <aside
            className="
  hidden lg:block w-80 sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto
  rounded-3xl bg-gradient-to-b from-base-100 to-base-200 border border-base-300
  shadow-xl p-6
  scrollbar-thin scrollbar-thumb-base-400 scrollbar-track-base-200
"
          >
            {profile ? (
              <ProfileCard {...profileProps} />
            ) : (
              <LoadingSpinner message="加载用户信息中..." />
            )}
          </aside>
        )}

        {/* 主要文章区 */}
        <main className="flex-grow min-w-0">
          {/* 站点通知 */}
          <NoticeBar notices={notices} />

          {/* 分类与文章 */}
          <section className="space-y-16">
            {categories.map((cat) => (
              <div key={cat.id}>
                <SectionHeader
                  icon={
                    cat.icon?.startsWith('http') ? (
                      <img
                        src={cat.icon}
                        alt={cat.sortName}
                        className="inline-block w-5 h-5 mr-2 rounded-sm"
                      />
                    ) : (
                      <span className="mr-2 text-lg">{cat.icon}</span>
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
