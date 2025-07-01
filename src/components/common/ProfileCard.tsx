import React, { type JSX } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { BiBold } from 'react-icons/bi';

// 数据接口：后端返回的 icon 是字符串
interface SocialLink {
  label: string;
  url: string;
  icon: string; // icon 名称
}

interface ProfileCardProps {
  avatarUrl: string;
  name: string;
  bio: string;
  socialLinks: SocialLink[];
  articlesCount: number;
  categoriesCount: number;
  views: number;
}

// icon 名称映射表
const iconMap: Record<string, JSX.Element> = {
  FaGithub: <FaGithub />,
  FaLinkedin: <FaLinkedin />,
  BiBold: <BiBold />,
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl,
  name,
  bio,
  socialLinks,
  articlesCount,
  categoriesCount,
  views,
}) => {
  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden border rounded-lg shadow-md bg-base-100 border-base-300">
      <div className="p-6 card-body">
        {/* 头像区域 */}
        <div className="flex justify-center">
          <div className="relative avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={avatarUrl} alt={name} className="object-cover" />
            </div>
            <div className="absolute inset-0 border-4 border-transparent rounded-full animate-ping-slow opacity-10"></div>
          </div>
        </div>

        {/* 个人信息 */}
        <div className="flex flex-col items-center mt-4 text-center">
          <h2 className="text-xl font-bold card-title text-base-content">
            {name}
          </h2>
          <p className="mt-2 text-sm text-center text-base-content/80">{bio}</p>
        </div>

        {/* 统计数据 */}
        <div className="flex justify-around my-6">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {articlesCount?.toLocaleString?.() || 0}
            </div>
            <div className="text-xs text-base-content/60">文章</div>
          </div>

          <div className="text-center">
            <div className="text-lg font-semibold text-secondary">
              {categoriesCount?.toLocaleString?.() || 0}
            </div>
            <div className="text-xs text-base-content/60">分类</div>
          </div>

          <div className="text-center">
            <div className="text-lg font-semibold text-accent">
              {views?.toLocaleString?.() || 0}
            </div>
            <div className="text-xs text-base-content/60">浏览</div>
          </div>
        </div>

        {/* 社交链接 */}
        <div className="mt-4">
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks?.length > 0 ? (
              socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-200 btn btn-circle btn-sm btn-outline hover:scale-110"
                  aria-label={link.label}
                >
                  {iconMap[link.icon] || <span className="text-xs">❓</span>}
                </a>
              ))
            ) : (
              <div className="text-xs text-base-content/50">暂无社交链接</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
