import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/common/ProfileCard';
import ArticleGrid from '../components/common/article/ArticleGrid';
import NoticeBar from '../components/common/NoticeBar';
import SectionHeader from '../components/common/SectionHeader';
import TypingText from '../components/common/TypingText';
import type { UserProfile } from '../types/user';
import type { Notice } from '../types/notice';
import type { Article } from '../types/article';
import LoadingSpinner from '../components/common/LoadingSpinner';
import WaveDivider from '../components/common/WaveDivider';
import type { Category } from '../types/category';
import { fetchUserProfile } from '../api/profileApi';
import { fetchValidNotices } from '../api/noticeApi';
import {
  fetchArticlesByCategory,
  fetchPopularCategories,
} from '../api/categoryApi';

const HomePage: React.FC = () => {
  const webTitle = "Zyan' s  Space".split('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [articlesMap, setArticlesMap] = useState<Record<number, Article[]>>({});
  const showAside = true;

  // 加载用户信息
  useEffect(() => {
    fetchUserProfile()
      .then(setProfile)
      .catch((err) => console.error('加载用户信息失败', err));
  }, []);

  // 加载站点通知
  useEffect(() => {
    fetchValidNotices()
      .then(setNotices)
      .catch((err) => console.error('加载最新通知失败', err));
  }, []);

  // 加载热门分类
  useEffect(() => {
    fetchPopularCategories()
      .then(setCategories)
      .catch((err) => console.error('加载热门分类失败', err));
  }, []);

  useEffect(() => {
    if (categories.length === 0) return;

    let mounted = true;

    async function fetchAllArticles() {
      try {
        await Promise.all(
          categories.map(async (cat) => {
            const data = await fetchArticlesByCategory(cat.id, 1, 3);
            if (mounted) {
              setArticlesMap((prev) => ({
                ...prev,
                [cat.id]: data.rows ?? [],
              }));
            }
          })
        );
      } catch (error) {
        console.error('请求文章列表失败', error);
      }
    }

    fetchAllArticles();

    return () => {
      mounted = false;
    };
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
      <div className="relative w-full h-[45vh] md:h-[45vh] bg-base-200 overflow-hidden">
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

      {/* 波浪动画分隔线 */}
      <WaveDivider />
      {/* 主体内容区域 */}
      <div className="flex flex-col gap-10 px-4 mx-auto mt-12 lg:flex-row max-w-[88%] page-container-wrap">
        {/* 侧边栏 */}
        {showAside && (
          <aside className="hidden lg:block w-120 sticky  max-h-[calc(100vh-6rem)] overflow-auto rounded-2xl p-6">
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
                <ArticleGrid
                  loading={!articlesMap[cat.id]}
                  articles={articlesMap[cat.id] ?? []}
                />
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
