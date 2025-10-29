import { useState } from "react";
import { X, MoreVertical } from "lucide-react";

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
  const [open, setOpen] = useState(false);

  return (
    <div className={className ?? ""}>
      {/* Main toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={[
          "flex h-12 w-12 items-center justify-center rounded-full",
          // ✨ glass effect
          "bg-white/25 dark:bg-[#0F4452]/60 backdrop-blur-2xl",
          // border + glow
          "border border-white/30 dark:border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.15)]",
          // 💡 added hover glow
          "hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]",
          // smooth scaling
          "hover:scale-105 active:scale-95 transition",
        ].join(" ")}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? (
          <X className="w-5 h-5 text-[#0F4452] dark:text-[#F6FAFA]" />
        ) : (
          <MoreVertical className="w-5 h-5 text-[#0F4452] dark:text-[#F6FAFA]" />
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
                "flex h-12 w-12 items-center justify-center rounded-full",
                // ✨ translucent glass style
                "bg-white/20 dark:bg-[#0F4452]/60 backdrop-blur-xl",
                // soft border + drop
                "border border-white/20 dark:border-white/10 shadow-[0_0_12px_rgba(0,0,0,0.25)]",
                // text + hover
                "text-[#0F4452] dark:text-[#F6FAFA] hover:scale-110 active:scale-95 transition",
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