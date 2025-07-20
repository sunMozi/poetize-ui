const SkeletonSectionHeader: React.FC = () => (
  <div className="flex items-center justify-between mb-4 animate-pulse">
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded bg-base-300" />
      <div className="w-24 h-5 rounded bg-base-300" />
    </div>
    <div className="w-12 h-4 rounded bg-base-300" />
  </div>
);
export default SkeletonSectionHeader;
