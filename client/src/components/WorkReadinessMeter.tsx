import { useEffect, useState } from "react";

interface WorkReadinessMeterProps {
  score: number;
  size?: number;
}

export default function WorkReadinessMeter({ score, size = 200 }: WorkReadinessMeterProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [score]);

  const circumference = 2 * Math.PI * 80; // radius = 80
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return "#10b981"; // green-500
    if (score >= 75) return "#3b82f6"; // blue-500
    if (score >= 60) return "#f59e0b"; // yellow-500
    return "#ef4444"; // red-500
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Fair";
    return "Needs Work";
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox="0 0 200 200"
      >
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="#e2e8f0"
          strokeWidth="16"
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke={getScoreColor(animatedScore)}
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-[2000ms] ease-out"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={getScoreColor(animatedScore)} />
            <stop offset="100%" stopColor={getScoreColor(animatedScore)} stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-black text-slate-900 mb-1">
            {Math.round(animatedScore)}%
          </div>
          <div className="text-sm font-medium text-slate-500">
            {getScoreLabel(animatedScore)}
          </div>
        </div>
      </div>
      
      {/* Score indicators */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0">
          {/* 25% marker */}
          <div 
            className="absolute w-3 h-3 bg-slate-300 rounded-full"
            style={{
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          />
          
          {/* 50% marker */}
          <div 
            className="absolute w-3 h-3 bg-slate-300 rounded-full"
            style={{
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)'
            }}
          />
          
          {/* 75% marker */}
          <div 
            className="absolute w-3 h-3 bg-slate-300 rounded-full"
            style={{
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
