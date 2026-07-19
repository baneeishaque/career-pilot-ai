import React from "react";
import Link from "next/link";

export interface TopNavBarProps {
  readonly className?: string;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  className = "",
}) => {
  return (
    <nav className={`fixed top-0 w-full bg-black/70 backdrop-blur-md border-b border-outline-variant z-50 ${className}`}>
      <div className="flex justify-between items-center h-20 px-margin max-w-container-max mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 active:scale-95 transition-transform">
          <img
            alt="CareerPilot AI Logo"
            className="h-8 w-8 rounded-md"
            src="https://lh3.googleusercontent.com/aida/AP1WRLsIE0TCnywE0IDs0XhrFTJQxd16GZQRmGzef_uA6BvGEzDbkByE8YxFQrHITlfCXD6UydIS18X_xFigSN45K2xjpxjYTq7rLobulpnrNlkzt3Ugu6IQvqEyjhI4D93WM7ebYGUEz9yyGCOV7gMKAHFbfU_8lZKgLXcIN_XPbIHbr2EB-4f_qrOJbVYs-DRlq_7OfiIu96DM2NvRZTuyZ2HLDQX2MWP0Woni64V444q8UBlW4QqsurtqO9c"
          />
          <span className="font-display text-headline-md text-on-surface tracking-tight">CareerPilot AI</span>
        </Link>
        <div className="hidden md:flex items-center gap-lg">
          <Link href="#features" className="font-body-md text-body-md text-on-surface-variant font-medium hover:text-primary transition-colors duration-150">
            Features
          </Link>
          <Link href="#roadmap" className="font-body-md text-body-md text-on-surface-variant font-medium hover:text-primary transition-colors duration-150">
            Roadmap
          </Link>
          <Link href="#pricing" className="font-body-md text-body-md text-on-surface-variant font-medium hover:text-primary transition-colors duration-150">
            Pricing
          </Link>
        </div>
        <div className="flex items-center gap-md">
          <Link href="/dashboard" className="hidden md:block font-body-md text-body-md text-on-surface-variant hover:text-white transition-colors active:scale-95">
            Sign In
          </Link>
          <Link href="/dashboard" className="bg-primary-container text-on-primary font-bold px-md py-xs rounded-lg active:scale-95 transition-transform hover:opacity-90">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
