export default function SearchLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* TODO: Task 005에서 Skeleton 컴포넌트 도입 후 교체 */}
      <div className="mx-auto max-w-3xl w-full px-6 py-12 space-y-4 animate-pulse">
        <div className="h-8 w-1/4 rounded bg-muted" />
        <div className="h-10 rounded-lg bg-muted" />
        <div className="space-y-3 pt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}
