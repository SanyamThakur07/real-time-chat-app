const UserSkeleton = () => {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 p-4">
      <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200"></div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-24 animate-pulse rounded bg-slate-200"></div>
        <div className="h-3 w-16 animate-pulse rounded bg-slate-200"></div>
      </div>
    </div>
  );
};

export default UserSkeleton;
