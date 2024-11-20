import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { ProductForm } from '../components/ProductForm';
import { useProductStore } from '../store/productStore';
import { Product } from '../types';

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const columns = [
    { header: 'Name', accessor: 'name' as keyof Product },
    { header: 'SKU', accessor: 'sku' as keyof Product },
    {
      header: 'Price',
      accessor: 'price' as keyof Product,
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    { header: 'Stock', accessor: 'stock' as keyof Product },
    { header: 'Category', accessor: 'category' as keyof Product },
    {
      header: 'Last Updated',
      accessor: 'lastUpdated' as keyof Product,
      render: (value: Date) => new Date(value).toLocaleDateString(),
    },
  ];

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSubmit = (data: Omit<Product, 'id' | 'lastUpdated'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
    } else {
      addProduct(data);
    }
    setIsFormOpen(false);
    setEditingProduct(undefined);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingProduct(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </button>
      </div>

      {isFormOpen ? (
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <ProductForm
            product={editingProduct}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <DataTable<Product>
            data={products}
            columns={columns}
            onEdit={handleEdit}
            onDelete={deleteProduct}
          />
        </div>
      )}
    </div>
  );
}