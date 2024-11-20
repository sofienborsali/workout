import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useProductStore } from '../store/productStore';
import { useSalesStore } from '../store/salesStore';
import { usePurchaseStore } from '../store/purchaseStore';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

export default function Reports() {
  const { products } = useProductStore();
  const { sales } = useSalesStore();
  const { purchases } = usePurchaseStore();

  // Calculate total revenue
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);

  // Calculate total purchase cost
  const totalPurchaseCost = purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0);

  // Calculate gross profit
  const grossProfit = totalRevenue - totalPurchaseCost;

  // Prepare sales by category data
  const salesByCategory = products.reduce((acc, product) => {
    const productSales = sales.filter((sale) => sale.productId === product.id);
    const category = product.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += productSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(salesByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  // Prepare monthly sales data
  const monthlySales = sales.reduce((acc, sale) => {
    const month = new Date(sale.date).toLocaleString('default', { month: 'short' });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += sale.totalAmount;
    return acc;
  }, {} as Record<string, number>);

  const monthlyData = Object.entries(monthlySales).map(([month, amount]) => ({
    month,
    amount,
  }));

  // Prepare inventory status data
  const inventoryData = products.map((product) => ({
    name: product.name,
    stock: product.stock,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Total Revenue</h3>
            <p className="mt-1 text-3xl font-semibold text-indigo-600">
              ${totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Total Costs</h3>
            <p className="mt-1 text-3xl font-semibold text-red-600">
              ${totalPurchaseCost.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Gross Profit</h3>
            <p className="mt-1 text-3xl font-semibold text-green-600">
              ${grossProfit.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Monthly Sales Trend */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Sales Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#4F46E5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sales by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Current Inventory Levels</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Low Stock Alerts</h3>
          <div className="space-y-4">
            {products
              .filter((product) => product.stock < 10)
              .map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-red-50 rounded-lg"
                >
                  <div>
                    <h4 className="text-sm font-medium text-red-800">
                      {product.name}
                    </h4>
                    <p className="text-sm text-red-600">
                      Current stock: {product.stock} units
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Low Stock
                  </span>
                </div>
              ))}
            {products.filter((product) => product.stock < 10).length === 0 && (
              <p className="text-sm text-gray-500">No low stock alerts</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}