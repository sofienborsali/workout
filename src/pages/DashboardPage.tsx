import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { formatCurrency } from '@/lib/utils';

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <div className="flex items-center gap-4">
          <select className="rounded-lg border bg-white px-4 py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(124500)}
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Total Orders"
          value="1,245"
          icon={<ShoppingCart className="h-5 w-5" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Products in Stock"
          value="856"
          icon={<Package className="h-5 w-5" />}
          trend={{ value: 2.1, isPositive: false }}
        />
        <StatCard
          title="Active Customers"
          value="3,521"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 5.7, isPositive: true }}
        />
      </div>

      {/* Add more dashboard sections here */}
    </div>
  );
};