import { cn } from "../../utils/cn";

export function Card({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg",
        className
      )}
    >
      {children}
    </article>
  );
}

export function CardHeader({ children }: React.PropsWithChildren) {
  return <div className="relative">{children}</div>;
}

export function CardIcon({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1",
        className
      )}
    >
      {children}
    </span>
  );
}

export function CardTitle({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <h3 className={cn("text-base font-semibold text-slate-900", className)}>{children}</h3>;
}

export function CardDescription({
  children,
}: React.PropsWithChildren) {
  return <p className="mt-3 text-sm text-slate-600">{children}</p>;
}

export function CardList({
  items,
}: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-slate-700">
      {items.map((p) => (
        <li key={p} className="flex items-start gap-2">
          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-500 flex-shrink-0" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}