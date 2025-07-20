import SkeletonCard from './SkeletonCard';

const SkeletonArticleGrid: React.FC = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonArticleGrid;
