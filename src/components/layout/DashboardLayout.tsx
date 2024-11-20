import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  to: string;
}

const SidebarItem = ({ icon, label, to }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900',
        isActive && 'bg-gray-100 text-gray-900'
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r bg-white px-4 py-6">
        <div className="flex items-center gap-2 px-3">
          <Package className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">EMS Admin</span>
        </div>
        
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" to="/" />
          <SidebarItem icon={<Package size={20} />} label="Products" to="/products" />
          <SidebarItem icon={<ShoppingCart size={20} />} label="Orders" to="/orders" />
          <SidebarItem icon={<Users size={20} />} label="Customers" to="/customers" />
          <SidebarItem icon={<BarChart3 size={20} />} label="Analytics" to="/analytics" />
          <SidebarItem icon={<Settings size={20} />} label="Settings" to="/settings" />
        </nav>

        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 px-8 py-6">
        {children}
      </main>
    </div>
  );
};