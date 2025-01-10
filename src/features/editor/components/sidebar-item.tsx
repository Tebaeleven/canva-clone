import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <button
      className={cn(
        "w-full h-auto aspect-video p-3 py-4 flex flex-col justify-center items-center rounded-none",
        isActive && "bg-muted text-primary",
      )}
      onClick={onClick}
    >
      <Icon className="shrink-0 size-6" />
      <span className="mt-2 text-xs">{label}</span>
    </button>
  );
};
