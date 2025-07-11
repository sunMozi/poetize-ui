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

export interface User {
  /** 访问令牌 */
  accessToken?: string;

  /** 用户头像 URL */
  avatar?: string;

  /** 用户编码 */
  code?: string;

  /** 创建时间 */
  createTime?: string;

  /** 电子邮箱 */
  email?: string;

  /** 性别（0：女，1：男） */
  gender?: number;

  /** 用户 ID */
  id?: number;

  /** 个人简介 */
  introduction?: string;

  /** 是否为老板 */
  isBoss?: boolean;

  /** 手机号码 */
  phoneNumber?: string;

  /** 订阅状态 */
  subscribe?: string;

  /** 更新人 */
  updateBy?: string;

  /** 更新时间 */
  updateTime?: string;

  /** 用户名 */
  username?: string;
}

export interface UserLoginRequest {
  account: string; // 邮箱
  password: string;
}
export interface RegisterRequest {
  account: string; // 用户账号，必填
  password: string; // 用户密码，必填
  code: string; // 验证码，必填
  phoneNumber?: string; // 手机号，选填，与 email 至少选一个
  email?: string; // 邮箱，选填，与 phoneNumber 至少选一个
}
