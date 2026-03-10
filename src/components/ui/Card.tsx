import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'red';
  className?: string;
}

export function Card({ children, variant = 'default', className = "" }: CardProps) {
  const variants = {
    default: "bg-brand-card text-brand-black",
    red: "bg-brand-red text-brand-black",
  };

  return (
    <div 
      className={`
        rounded-[10px] 
        border border-brand-black/14 
        p-8 
        ${variants[variant]} 
        ${className}
      `}
    >
      {children}
    </div>
  );
}