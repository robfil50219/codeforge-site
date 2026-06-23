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
import { useState } from "react";
import { X, MoreVertical } from "lucide-react";
import { useTranslation } from "../../lib/t";

export type BubbleMenuItem = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

type Props = {
  items: BubbleMenuItem[];
  className?: string;
};

export default function BubbleMenu({ items, className }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className={className ?? ""}>
      {/* Main toggle (glass button) */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={[
          "glass rounded-full h-12 w-12 flex items-center justify-center",
          "hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition",
        ].join(" ")}
        aria-label={open ? (t("controls.closeMenu") as string) : (t("controls.openMenu") as string)}
      >
        {open ? (
          <X className="w-5 h-5 text-(--text-page)" />
        ) : (
          <MoreVertical className="w-5 h-5 text-(--text-page)" />
        )}
      </button>

      {/* Expanded items */}
      {open && (
        <div className="mt-2 flex flex-col items-end gap-2">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={[
                "glass rounded-full h-12 w-12 flex items-center justify-center",
                "hover:scale-110 active:scale-95 transition",
                "text-(--text-page) text-[11px] font-semibold",
              ].join(" ")}
              aria-label={item.label}
              title={item.label}
            >
              {item.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
