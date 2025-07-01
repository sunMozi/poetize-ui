export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface UserProfile {
  avatarUrl: string;
  name: string;
  bio: string;
  articlesCount: number;
  categoriesCount: number;
  views: number;
  socialLinks: SocialLink[];
}
