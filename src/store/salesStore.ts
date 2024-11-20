import { create } from 'zustand';
import { Sale } from '../types';

interface SalesState {
  sales: Sale[];
  addSale: (sale: Omit<Sale, 'id' | 'date'>) => void;
  deleteSale: (id: string) => void;
}

const initialSales: Sale[] = [
  {
    id: '1',
    productId: '1',
    quantity: 2,
    totalAmount: 2599.98,
    date: new Date('2024-03-01'),
    customerName: 'John Smith',
  },
  {
    id: '2',
    productId: '2',
    quantity: 5,
    totalAmount: 149.95,
    date: new Date('2024-03-02'),
    customerName: 'Jane Doe',
  },
];

export const useSalesStore = create<SalesState>((set) => ({
  sales: initialSales,
  addSale: (saleData) =>
    set((state) => ({
      sales: [
        ...state.sales,
        {
          ...saleData,
          id: Math.random().toString(36).substr(2, 9),
          date: new Date(),
        },
      ],
    })),
  deleteSale: (id) =>
    set((state) => ({
      sales: state.sales.filter((sale) => sale.id !== id),
    })),
}));