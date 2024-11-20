import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { PurchaseForm } from '../components/PurchaseForm';
import { usePurchaseStore } from '../store/purchaseStore';
import { useProductStore } from '../store/productStore';
import { Purchase } from '../types';

export default function Purchases() {
  const { purchases, addPurchase, updatePurchaseStatus, deletePurchase } = usePurchaseStore();
  const { products } = useProductStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const columns = [
    {
      header: 'Product',
      accessor: 'productId' as keyof Purchase,
      render: (value: string) => products.find((p) => p.id === value)?.name || 'Unknown',
    },
    {
      header: 'Supplier',
      accessor: 'supplierName' as keyof Purchase,
    },
    {
      header: 'Quantity',
      accessor: 'quantity' as keyof Purchase,
    },
    {
      header: 'Total Amount',
      accessor: 'totalAmount' as keyof Purchase,
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      header: 'Status',
      accessor: 'status' as keyof Purchase,
      render: (value: Purchase['status'], item: Purchase) => (
        <select
          value={value}
          onChange={(e) => updatePurchaseStatus(item.id, e.target.value as Purchase['status'])}
          className={`rounded-md text-sm font-medium px-2 py-1 ${
            value === 'completed'
              ? 'bg-green-100 text-green-800'
              : value === 'cancelled'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      ),
    },
    {
      header: 'Date',
      accessor: 'date' as keyof Purchase,
      render: (value: Date) => new Date(value).toLocaleDateString(),
    },
  ];

  const handleSubmit = (data: Omit<Purchase, 'id' | 'date'>) => {
    addPurchase(data);
    setIsFormOpen(false);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Purchase Orders</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Purchase Order
        </button>
      </div>

      {isFormOpen ? (
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Create Purchase Order</h2>
          <PurchaseForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <DataTable<Purchase>
            data={purchases}
            columns={columns}
            onDelete={deletePurchase}
          />
        </div>
      )}
    </div>
  );
}