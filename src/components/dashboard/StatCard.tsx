import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border bg-white p-6 shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className="rounded-full bg-gray-100 p-2 text-gray-600">
          {icon}
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-gray-900">{value}</h3>
        {trend && (
          <p className={cn(
            'mt-1 text-sm',
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          )}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </p>
        )}
      </div>
    </div>
  );
};