import React from "react";
import Link from "next/link";

export interface FooterProps {
  readonly className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  className = "",
}) => {
  return (
    <footer className={`w-full py-xl border-t border-outline-variant bg-surface-container-lowest ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin max-w-container-max mx-auto">
        <div className="space-y-md">
          <Link href="/" className="flex items-center gap-2">
            <img
              alt="CareerPilot AI Logo"
              className="h-6 w-6 rounded-md"
              src="https://lh3.googleusercontent.com/aida/AP1WRLsIE0TCnywE0IDs0XhrFTJQxd16GZQRmGzef_uA6BvGEzDbkByE8YxFQrHITlfCXD6UydIS18X_xFigSN45K2xjpxjYTq7rLobulpnrNlkzt3Ugu6IQvqEyjhI4D93WM7ebYGUEz9yyGCOV7gMKAHFbfU_8lZKgLXcIN_XPbIHbr2EB-4f_qrOJbVYs-DRlq_7OfiIu96DM2NvRZTuyZ2HLDQX2MWP0Woni64V444q8UBlW4QqsurtqO9c"
            />
            <span className="font-display text-headline-md text-white">CareerPilot AI</span>
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant">
            © 2026 CareerPilot AI. Precision-engineered career management.
          </p>
        </div>
        <div className="space-y-md">
          <h5 className="text-white font-bold text-body-md">Navigation</h5>
          <div className="flex flex-col gap-sm">
            <Link href="#features" className="font-body-md text-on-surface-variant hover:text-white transition-colors duration-150">
              Features
            </Link>
            <Link href="#roadmap" className="font-body-md text-on-surface-variant hover:text-white transition-colors duration-150">
              Roadmap
            </Link>
            <Link href="#pricing" className="font-body-md text-on-surface-variant hover:text-white transition-colors duration-150">
              Pricing
            </Link>
          </div>
        </div>
        <div className="space-y-md">
          <h5 className="text-white font-bold text-body-md">Legal</h5>
          <div className="flex flex-col gap-sm">
            <Link href="#" className="font-body-md text-on-surface-variant hover:text-white transition-colors duration-150">
              Terms of Service
            </Link>
            <Link href="#" className="font-body-md text-on-surface-variant hover:text-white transition-colors duration-150">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="space-y-md">
          <h5 className="text-white font-bold text-body-md">Support</h5>
          <div className="flex flex-col gap-sm">
            <Link href="#" className="font-body-md text-on-surface-variant hover:text-white transition-colors duration-150">
              Contact Support
            </Link>
            <Link href="#" className="font-body-md text-on-surface-variant hover:text-white transition-colors duration-150">
              Documentation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
