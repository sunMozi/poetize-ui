import React from 'react';

interface WaveDividerProps {
  colorClass?: string; // 波浪颜色 class
  height?: string; // 高度（例如 "h-16"）
  duration?: string; // 动画时长（例如 "10s"）
}

const WaveDivider: React.FC<WaveDividerProps> = ({
  colorClass = 'text-base-100 dark:text-base-200',
  height = 'h-16',
  duration = '10s',
}) => {
  return (
    <div className={`relative w-full overflow-hidden -mt-1`}>
      <svg
        className={`w-full ${height}`}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          className={colorClass}
          fill="currentColor"
          d="M0,64L60,90.7C120,117,240,171,360,186.7C480,203,600,181,720,176C840,171,960,181,1080,197.3C1200,213,1320,235,1380,245.3L1440,256L1440,320L0,320Z"
        >
          <animate
            attributeName="d"
            dur={duration}
            repeatCount="indefinite"
            values="
              M0,64L60,90.7C120,117,240,171,360,186.7C480,203,600,181,720,176C840,171,960,181,1080,197.3C1200,213,1320,235,1380,245.3L1440,256L1440,320L0,320Z;
              M0,32L60,58.7C120,85,240,139,360,154.7C480,171,600,149,720,144C840,139,960,149,1080,165.3C1200,181,1320,203,1380,213.3L1440,224L1440,320L0,320Z;
              M0,64L60,90.7C120,117,240,171,360,186.7C480,203,600,181,720,176C840,171,960,181,1080,197.3C1200,213,1320,235,1380,245.3L1440,256L1440,320L0,320Z
            "
          />
        </path>
      </svg>
    </div>
  );
};

export default WaveDivider;
