import { create } from 'zustand';
import { Product } from '../types';

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'lastUpdated'>) => void;
  updateProduct: (id: string, product: Omit<Product, 'id' | 'lastUpdated'>) => void;
  deleteProduct: (id: string) => void;
}

// Mock data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro X1',
    sku: 'LAP-001',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    stock: 50,
    category: 'electronics',
    lastUpdated: new Date(),
  },
  {
    id: '2',
    name: 'Wireless Mouse',
    sku: 'MOU-002',
    description: 'Ergonomic wireless mouse',
    price: 29.99,
    stock: 100,
    category: 'electronics',
    lastUpdated: new Date(),
  },
];

export const useProductStore = create<ProductState>((set) => ({
  products: initialProducts,
  addProduct: (productData) =>
    set((state) => ({
      products: [
        ...state.products,
        {
          ...productData,
          id: Math.random().toString(36).substr(2, 9),
          lastUpdated: new Date(),
        },
      ],
    })),
  updateProduct: (id, productData) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id
          ? {
              ...product,
              ...productData,
              lastUpdated: new Date(),
            }
          : product
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));