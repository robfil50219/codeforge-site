import cn from "../../utils/cn";
import { Link } from "react-router-dom";

type BaseProps = {
  className?: string;
  variant?: "primary" | "outline" | "ghost";
  asChild?: boolean; // let you pass Link or a
};

const variants = {
  primary: "rounded-xl bg-sky-600 text-white font-medium px-6 py-3 shadow-sm hover:bg-sky-700",
  outline: "rounded-xl border border-slate-300 text-slate-700 font-medium px-6 py-3 hover:bg-slate-100",
  ghost: "rounded-xl text-slate-700 font-medium px-3 py-2 hover:bg-slate-100",
};

export function Button(
  { className, variant = "primary", asChild, ...props }:
  BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const classes = cn(variants[variant], "transition", className);
  if (asChild) {
    const { children, ...rest } = props;
    return <span className={classes} {...rest}>{children}</span>;
  }
  return <button className={classes} {...props} />;
}

// Handy Link button
export function ButtonLink(
  { className, variant = "primary", to, ...rest }:
  BaseProps & { to: string } & React.ComponentProps<typeof Link>
) {
  return (
    <Link to={to} className={cn(variants[variant], "transition", className)} {...rest} />
  );
} 