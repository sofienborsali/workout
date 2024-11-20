import React from 'react';
import { Sale, Product } from '../types';
import { useProductStore } from '../store/productStore';

interface SaleFormProps {
  onSubmit: (data: Omit<Sale, 'id' | 'date'>) => void;
  onCancel: () => void;
}

export function SaleForm({ onSubmit, onCancel }: SaleFormProps) {
  const { products } = useProductStore();
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [quantity, setQuantity] = React.useState(1);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const product = products.find((p) => p.id === e.target.value);
    setSelectedProduct(product || null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const formData = new FormData(e.currentTarget);
    onSubmit({
      productId: selectedProduct.id,
      quantity: Number(quantity),
      totalAmount: selectedProduct.price * quantity,
      customerName: formData.get('customerName') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="product" className="block text-sm font-medium text-gray-700">
          Product
        </label>
        <select
          id="product"
          name="product"
          required
          onChange={handleProductChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - ${product.price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
          Customer Name
        </label>
        <input
          type="text"
          name="customerName"
          id="customerName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {selectedProduct && (
        <div className="rounded-md bg-gray-50 p-4">
          <h4 className="text-sm font-medium text-gray-900">Order Summary</h4>
          <dl className="mt-2 divide-y divide-gray-200">
            <div className="flex justify-between py-2">
              <dt className="text-sm text-gray-500">Unit Price</dt>
              <dd className="text-sm font-medium text-gray-900">
                ${selectedProduct.price.toFixed(2)}
              </dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-sm text-gray-500">Quantity</dt>
              <dd className="text-sm font-medium text-gray-900">{quantity}</dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-sm font-medium text-gray-900">Total Amount</dt>
              <dd className="text-sm font-medium text-indigo-600">
                ${(selectedProduct.price * quantity).toFixed(2)}
              </dd>
            </div>
          </dl>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Sale
        </button>
      </div>
    </form>
  );
}