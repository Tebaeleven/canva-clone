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
    <Button
      variant={"ghost"}
      size={"icon"}
      className={cn(
        "w-full h-auto aspect-video p-3 py-4 flex flex-col rounded-none",
        isActive && "bg-muted text-primary",
      )}
      onClick={onClick}
    >
      <Icon className="size-12 stroke-4 shrink-0" />
      <span className="mt-2 text-xs">{label}</span>
    </Button>
  );
};
