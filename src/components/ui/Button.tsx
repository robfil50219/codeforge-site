/**
 * -------------------------------------------------------
 *  CodeForge Studio — Proprietary Source Code
 *  © 2025 CodeForge Studio Filep. All rights reserved.
 *
 *  This file is part of the CodeForge Studio website.
 *  Unauthorized copying, modification, or distribution
 *  of this file, via any medium, is strictly prohibited.
 *
 *  For licensing or collaboration inquiries:
 *  robert@codeforgestudio.no | https://codeforgestudio.no
 * -------------------------------------------------------
 */
import { cn } from "../../utils/cn";

type BaseProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "sky" | "outline";
};

export default function Button({ className, variant = "primary", ...props }: BaseProps) {
  const variants = {
    primary:
      "rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800",
    sky:
      "rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700",
    outline:
      "rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100",
  } as const;

  return <a className={cn(variants[variant], className)} {...props} />;
}