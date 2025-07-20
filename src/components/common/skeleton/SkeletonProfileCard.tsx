const SkeletonProfileCard: React.FC = () => (
  <div className="p-6 space-y-4 border shadow animate-pulse bg-base-200 rounded-2xl border-base-300">
    <div className="w-24 h-24 mx-auto rounded-full bg-base-300" />
    <div className="w-2/3 h-4 mx-auto rounded bg-base-300" />
    <div className="w-1/2 h-3 mx-auto rounded bg-base-300" />
    <div className="flex justify-around mt-4">
      {[1, 2, 3].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="w-12 h-3 rounded bg-base-300" />
          <div className="w-16 h-3 rounded bg-base-300" />
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonProfileCard;
