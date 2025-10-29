import BubbleMenu from "./ui/BubbleMenu";
import { Moon, Phone, Info, DollarSign, Wrench } from "lucide-react";

export default function MobileBubbleNav() {
  const bubbleItems = [
    {
      icon: <Wrench className="w-4 h-4" />,
      label: "Services",
      onClick: () => {
        document.getElementById("services")?.scrollIntoView({
          behavior: "smooth",
        });
      },
    },
    {
      icon: <DollarSign className="w-4 h-4" />,
      label: "Pricing",
      onClick: () => {
        document.getElementById("pricing")?.scrollIntoView({
          behavior: "smooth",
        });
      },
    },
    {
      icon: <Info className="w-4 h-4" />,
      label: "About",
      onClick: () => {
        document.getElementById("about")?.scrollIntoView({
          behavior: "smooth",
        });
      },
    },
    {
      icon: <Phone className="w-4 h-4" />,
      label: "Contact",
      onClick: () => {
        document.getElementById("contact")?.scrollIntoView({
          behavior: "smooth",
        });
      },
    },
    {
      icon: <Moon className="w-4 h-4" />,
      label: "Theme",
      onClick: () => {
        document.documentElement.classList.toggle("dark");
      },
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-9999 md:hidden">
      <div
        className={[
          "backdrop-blur-xl bg-white/20 dark:bg-[#001920]/40",
          "border border-white/10 shadow-xl shadow-black/20 rounded-2xl",
          "p-2 flex items-center justify-center",
        ].join(" ")}
      >
        <BubbleMenu
          items={bubbleItems}
          className={[
            "backdrop-blur-xl bg-white/20 dark:bg-[#001920]/40",
            "border border-white/10 shadow-xl shadow-black/20 rounded-2xl",
            "text-[#0F4452] dark:text-[#F6FAFA]",
            "transition-all duration-300",
          ].join(" ")}
        />
      </div>
    </div>
  );
}