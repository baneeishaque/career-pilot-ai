import React from "react";
import { Feature } from "@/data/mockData";

export interface FeatureCardProps {
  readonly feature: Feature;
  readonly className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  className = "",
}) => {
  return (
    <div className={`glass-card p-md rounded-lg space-y-md ${className}`}>
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        <span className="material-symbols-outlined">{feature.icon}</span>
      </div>
      <h3 className="font-headline-md text-white">{feature.title}</h3>
      <p className="font-body-md text-on-surface-variant">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;
