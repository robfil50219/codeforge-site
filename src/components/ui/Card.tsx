import cn from "../../utils/cn";

type CardProps = React.PropsWithChildren<{
  className?: string;
  hover?: boolean;
  padded?: boolean;
}>;

export function Card({ className, hover = true, padded = true, children }: CardProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm",
        hover && "transition hover:shadow-lg",
        padded && "p-6",
        className
      )}
    >
      {children}
    </article>
  );
}