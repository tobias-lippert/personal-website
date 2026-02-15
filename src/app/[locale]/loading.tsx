export default function Loading() {
  return (
    <div className="container py-12">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-1/3 rounded bg-muted" />
        <div className="h-4 w-2/3 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
        <div className="space-y-2 pt-8">
          <div className="h-4 rounded bg-muted" />
          <div className="h-4 rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
