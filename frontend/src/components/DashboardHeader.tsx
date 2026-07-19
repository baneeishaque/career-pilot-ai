import React from "react";

export interface DashboardHeaderProps {
  readonly className?: string;
  readonly username?: string;
  readonly planType?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  className = "",
  username = "Alex Johnson",
  planType = "Premium Member",
}) => {
  return (
    <header className={`fixed top-0 right-0 w-[calc(100%-16rem)] z-40 flex justify-between items-center h-16 px-gutter ml-64 bg-surface/70 backdrop-blur-md border-b border-outline-variant ${className}`}>
      <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
        <span>Dashboard</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-bold">Resume Optimizer</span>
      </div>
      <div className="flex items-center gap-gutter">
        <button className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
          <span className="material-symbols-outlined">light_mode</span>
        </button>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-on-surface font-bold text-label-sm">{username}</p>
            <p className="text-on-surface-variant text-[10px]">{planType}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              alt="Alex Johnson Profile" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfBEECrsrDf1JCZIg8LnxZQSwMnlqKg1Q4N9UxjFGzHHXqc8OUGeNZ4XfUY1NJB8QVBHnJMWxYxiAq4cAVABRiY-AlUavKk_LWjzRi_KJgiP8gBvtCjTstJ25YHmNJ4EWFw1R5iiahAMDdsSNEBYPt992ul7UzM-tSlZcru1TYQToIA-FycWXrLaoLC1wQ8EW6HdYSnuwYi3zgyywMOe19Wk6FwRz97bbYZT4qIfUEPd-2ZwGrsNmR-HKWf1DrPZlM0gy_E-CxDRs"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
