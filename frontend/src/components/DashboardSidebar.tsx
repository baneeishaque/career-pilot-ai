import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface DashboardSidebarProps {
  readonly className?: string;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  className = "",
}) => {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <aside className={`h-screen w-64 fixed left-0 top-0 flex flex-col py-md bg-surface-container-lowest border-r border-outline-variant z-50 ${className}`}>
      <div className="px-gutter mb-lg">
        <Link href="/" className="flex flex-col">
          <h1 className="font-headline-md text-headline-md font-bold text-primary">CareerPilot AI</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">Elite Career Management</p>
        </Link>
      </div>
      
      <nav className="flex-1 px-sm space-y-1">
        <Link 
          href="/dashboard" 
          className={`flex items-center gap-3 px-md py-3 rounded transition-colors duration-150 ${
            isDashboard 
              ? "text-on-surface border-l-2 border-primary bg-surface-container-low" 
              : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-primary">dashboard</span>
          <span className="font-body-md text-body-md">Dashboard</span>
        </Link>
        <Link 
          href="#" 
          className="flex items-center gap-3 px-md py-3 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors duration-150 group"
        >
          <span className="material-symbols-outlined group-hover:text-on-surface">history</span>
          <span className="font-body-md text-body-md">History</span>
        </Link>
        <Link 
          href="#" 
          className="flex items-center gap-3 px-md py-3 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors duration-150 group"
        >
          <span className="material-symbols-outlined group-hover:text-on-surface">help</span>
          <span className="font-body-md text-body-md">Help</span>
        </Link>
      </nav>
      
      <div className="px-sm mt-auto">
        <button className="w-full flex items-center justify-center gap-2 bg-primary py-3 rounded text-black font-bold text-body-md active:scale-95 transition-transform cursor-pointer hover:opacity-90">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>upgrade</span>
          Upgrade to Pro
        </button>
      </div>
      
      <div className="px-sm mt-md pt-md border-t border-outline-variant">
        <Link 
          href="#" 
          className="flex items-center gap-3 px-md py-3 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors duration-150 group"
        >
          <span className="material-symbols-outlined group-hover:text-on-surface">settings</span>
          <span className="font-body-md text-body-md">Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
