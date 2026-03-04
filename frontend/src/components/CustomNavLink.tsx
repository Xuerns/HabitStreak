import { NavLink } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { SiActivitypub } from "react-icons/si";
import { IoMdAnalytics } from "react-icons/io";
import type { ComponentType, SVGProps } from "react";
import { useStreakTheme } from "../hooks/useStreakTheme";

interface CustomNavLinkProps {
  to: string;
  label: string;
  isOpen: boolean;
  variant: "dashboard" | "habits" | "analytics";
  onMobileClick?: () => void;
}

export default function CustomNavLink({
  to,
  label,
  isOpen,
  variant,
  onMobileClick,
}: CustomNavLinkProps) {
  const theme = useStreakTheme();
  const iconVariant: Record<
    "dashboard" | "habits" | "analytics",
    ComponentType<SVGProps<SVGSVGElement>>
  > = {
    dashboard: MdOutlineSpaceDashboard,
    habits: SiActivitypub,
    analytics: IoMdAnalytics,
  };

  const Icon = iconVariant[variant];

  return (
    <NavLink
      to={to}
      onClick={onMobileClick}
      className={`w-full flex items-center ${isOpen ? "justify-start" : "md:justify-center"}`}
    >
      {({ isActive }) => (
        <div
          className={`
            w-full flex items-center px-3 py-2.5 rounded-xl font-semibold gap-3 group
            transition-all duration-200
            ${
              isActive
                ? theme.activeBg
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }
            ${isOpen ? "justify-start" : "md:justify-center"}
          `}
        >
          <Icon
            className={`shrink-0 h-5 w-5 transition-colors duration-200 ${
              isActive ? theme.fill : "fill-gray-400 group-hover:fill-white"
            }`}
          />
          <span
            className={`text-sm transition-colors duration-200 ${isOpen ? "" : "md:hidden"}`}
          >
            {label}
          </span>
        </div>
      )}
    </NavLink>
  );
}
