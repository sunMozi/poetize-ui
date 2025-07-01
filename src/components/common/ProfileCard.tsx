import React from 'react';

interface SocialLink {
  label: string;
  url: string;
  colorClass: string;
}

interface ProfileCardProps {
  avatarUrl: string;
  name: string;
  bio: string;
  socialLinks: SocialLink[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl,
  name,
  bio,
  socialLinks,
}) => {
  return (
    <div className="p-6 text-center border shadow-lg rounded-2xl bg-gradient-to-b from-base-100 to-base-200 border-base-300">
      <img
        src={avatarUrl}
        alt="个人头像"
        className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg"
      />
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-sm text-base-content/70">{bio}</p>

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 flex items-center justify-center text-white rounded-full transition-colors ${link.colorClass} hover:brightness-110`}
            aria-label={link.label}
          >
            <span className="text-xs font-semibold">
              {link.label.charAt(0)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
