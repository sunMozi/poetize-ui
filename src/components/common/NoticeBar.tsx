import React, { useState } from 'react';
import type { Notice } from '../../types/notice';
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';

interface NoticeBarProps {
  notices: Notice[];
}

const typeStyles: Record<
  Notice['type'],
  { bg: string; border: string; icon: React.ReactNode }
> = {
  info: {
    bg: 'bg-info/10',
    border: 'border-info',
    icon: <Info className="w-5 h-5 text-info" />,
  },
  warning: {
    bg: 'bg-warning/10',
    border: 'border-warning',
    icon: <AlertTriangle className="w-5 h-5 text-warning" />,
  },
  error: {
    bg: 'bg-error/10',
    border: 'border-error',
    icon: <AlertCircle className="w-5 h-5 text-error" />,
  },
  success: {
    bg: 'bg-success/10',
    border: 'border-success',
    icon: <CheckCircle2 className="w-5 h-5 text-success" />,
  },
};

const NoticeBar: React.FC<NoticeBarProps> = ({ notices }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!notices.length) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % notices.length);
  };

  const notice = notices[currentIndex];
  const style = typeStyles[notice.type];

  return (
    <section className="mb-8 space-y-4">
      <h3 className="text-lg font-bold text-base-content">公告</h3>
      <div
        className={`p-4 border-l-4 rounded-xl shadow-sm ${style.bg} ${style.border}`}
      >
        <div className="flex items-start space-x-3">
          <div className="mt-1">{style.icon}</div>
          <div className="flex-1">
            <h4 className="font-semibold text-base-content">{notice.title}</h4>
            <div
              className="mt-1 prose-sm prose max-w-none text-base-content"
              dangerouslySetInnerHTML={{ __html: notice.content }}
            />
            <div className="mt-2 text-xs text-gray-500">
              有效期: {new Date(notice.startTime).toLocaleString()} —{' '}
              {notice.endTime
                ? new Date(notice.endTime).toLocaleString()
                : '永久'}
            </div>
          </div>
          <button
            aria-label="查看下一条公告"
            onClick={handleNext}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
          >
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NoticeBar;
