"use client";

interface DashedBorderProps {
  position: "top" | "bottom" | "left" | "right";
  className?: string;
  color?: string;
}

export default function DashedBorder({
  position,
  className = "",
  color = "rgba(156,163,175,0.4)",
}: DashedBorderProps) {
  const isHorizontal = position === "top" || position === "bottom";

  const positionStyles: Record<string, string> = {
    top: "absolute left-0 w-full top-0",
    bottom: "absolute left-0 w-full bottom-0",
    left: "absolute top-0 h-full left-0",
    right: "absolute top-0 h-full right-0",
  };

  if (isHorizontal) {
    return (
      <div className={`${positionStyles[position]} ${className}`}>
        <div className="relative h-px w-full">
          <svg width="100%" height="100%">
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke={color}
              strokeWidth="2"
              strokeDasharray="8,9"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={`${positionStyles[position]} ${className}`}>
      <div className="relative h-full w-px">
        <svg width="100%" height="100%">
          <line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8,9"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

export function DashedBox({
  children,
  className = "",
  color,
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <DashedBorder position="top" color={color} />
      <DashedBorder position="bottom" color={color} />
      <DashedBorder position="left" color={color} />
      <DashedBorder position="right" color={color} />
      {children}
    </div>
  );
}
