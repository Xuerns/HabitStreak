import { NavLink } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { SiActivitypub } from "react-icons/si";
import { IoMdAnalytics } from "react-icons/io";
import type { ComponentType, SVGProps } from "react";

interface CustomNavLinkProps {
  to: string;
  label: string;
  isOpen: boolean;
  variant: "dashboard" | "habits" | "analytics";
}

export default function CustomNavLink({
  to,
  label,
  isOpen,
  variant,
}: CustomNavLinkProps) {
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
      className={`w-full flex items-center ${isOpen ? "justify-start" : "justify-center"}`}
    >
      {({ isActive }) => (
        <div
          className={`w-full flex items-center px-3 py-2.5 rounded font-bold gap-2 group ${isActive ? "bg-amber-400" : "bg-gray-200/30 hover:bg-[#fcd18b]"} ${isOpen ? "justify-start" : "justify-center"}`}
        >
          <Icon
            className={`shrink-0 h-6 w-6 group-hover:fill-white ${isActive ? "fill-white" : "fill-black"}`}
          />
          <span
            className={`group-hover:text-white ${isActive ? "text-white" : "text-black"} ${isOpen ? "" : "hidden"}`}
          >
            {label}
          </span>
        </div>
      )}
    </NavLink>
  );
}
