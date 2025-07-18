import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: 50000, suffix: "K+", label: "Active Workers", color: "text-primary" },
  { value: 2500, suffix: "K+", label: "Employers", color: "text-green-500" },
  { value: 150000, suffix: "K+", label: "Certificates", color: "text-yellow-500" },
  { value: 98, suffix: "%", label: "Satisfaction", color: "text-primary" },
];

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  color: string;
}

function AnimatedCounter({ value, suffix, color }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounter();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounter = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
  };

  const formatValue = (num: number) => {
    if (suffix === "K+" && num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1);
    }
    return num.toString();
  };

  return (
    <div ref={elementRef} className={`text-4xl font-black ${color} mb-2`}>
      {formatValue(count)}{suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="bg-white/10 backdrop-blur-xl border border-white/20 hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <CardContent className="p-8 text-center">
                <AnimatedCounter 
                  value={stat.value} 
                  suffix={stat.suffix} 
                  color={stat.color}
                />
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
