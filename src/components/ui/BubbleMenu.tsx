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
      {/* Main toggle (glass button) */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={[
          "glass rounded-full h-12 w-12 flex items-center justify-center",
          "hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition",
        ].join(" ")}
        aria-label={open ? "Close menu" : "Open menu"}
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