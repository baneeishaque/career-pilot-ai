import React from "react";
import { StatItem } from "@/data/mockData";

export interface StatCardProps {
  readonly stat: StatItem;
  readonly className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  stat,
  className = "",
}) => {
  return (
    <div className={`glass-card p-lg rounded-xl text-center space-y-xs ${className}`}>
      <div className="font-display text-primary font-bold">{stat.value}</div>
      <div className="font-label-sm text-on-surface-variant uppercase tracking-widest">{stat.label}</div>
    </div>
  );
};

export default StatCard;
