import React from "react";
import { RoadmapMilestone } from "@/data/mockData";

export interface RoadmapCardProps {
  readonly milestone: RoadmapMilestone;
  readonly className?: string;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({
  milestone,
  className = "",
}) => {
  const isLive = milestone.status === "live";

  return (
    <div className={`space-y-md ${className}`}>
      <div className={`w-20 h-20 rounded-full glass-card flex items-center justify-center bg-black ${
        isLive ? "text-primary border-primary" : "text-on-surface-variant"
      }`}>
        <span className="material-symbols-outlined text-3xl">{milestone.icon}</span>
      </div>
      <div className="space-y-xs">
        <div className="flex items-center gap-2">
          {isLive ? (
            <span className="px-xs py-[2px] bg-primary-container/20 text-primary border border-primary/20 text-[10px] uppercase font-bold rounded">
              Live
            </span>
          ) : (
            <span className="px-xs py-[2px] bg-surface-container-high text-on-surface-variant border border-outline-variant text-[10px] uppercase font-bold rounded">
              {milestone.date}
            </span>
          )}
        </div>
        <h4 className="font-headline-md text-white">{milestone.level}</h4>
        <p className="font-body-md text-on-surface-variant">{milestone.description}</p>
      </div>
    </div>
  );
};

export default RoadmapCard;
