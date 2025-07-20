const SkeletonCard: React.FC = () => (
  <div
    className="overflow-hidden border shadow animate-pulse rounded-2xl bg-base-200 border-base-300"
    style={{ height: '440px' }}
  >
    {/* 封面图区域（大约 200~220px） */}
    <div className="w-full bg-base-300" style={{ height: '210px' }} />

    {/* 内容区域 */}
    <div className="p-5 space-y-3">
      {/* 标题 */}
      <div className="w-4/5 h-5 rounded bg-base-300" />
      {/* 摘要占位 2 行 */}
      <div className="w-full h-4 rounded bg-base-300" />
      <div className="w-5/6 h-4 rounded bg-base-300" />

      {/* Footer 信息区域 */}
      <div className="flex items-center justify-between pt-4">
        <div className="w-24 h-4 rounded bg-base-300" />
        <div className="w-12 h-4 rounded bg-base-300" />
      </div>
    </div>
  </div>
);

export default SkeletonCard;
