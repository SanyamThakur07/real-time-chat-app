export const MessageLoadingSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 overflow-y-auto px-4">
      {/* Received message skeleton */}
      <div className="chat chat-start">
        <div className="chat-bubble bg-slate-200">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-300"></div>
        </div>
      </div>

      {/* Sent message skeleton */}
      <div className="chat chat-end">
        <div className="chat-bubble bg-slate-200">
          <div className="h-4 w-48 animate-pulse rounded bg-slate-300"></div>
        </div>
      </div>

      {/* Received message skeleton */}
      <div className="chat chat-start">
        <div className="chat-bubble bg-slate-200">
          <div className="h-4 w-40 animate-pulse rounded bg-slate-300"></div>
        </div>
      </div>

      {/* Sent message skeleton */}
      <div className="chat chat-end">
        <div className="chat-bubble bg-slate-200">
          <div className="space-y-2">
            <div className="h-4 w-56 animate-pulse rounded bg-slate-300"></div>
            <div className="h-4 w-32 animate-pulse rounded bg-slate-300"></div>
          </div>
        </div>
      </div>

      {/* Received message skeleton */}
      <div className="chat chat-start">
        <div className="chat-bubble bg-slate-200">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-300"></div>
        </div>
      </div>
    </div>
  );
};
