import { create } from 'zustand';
import { Purchase } from '../types';

interface PurchaseState {
  purchases: Purchase[];
  addPurchase: (purchase: Omit<Purchase, 'id' | 'date'>) => void;
  updatePurchaseStatus: (id: string, status: Purchase['status']) => void;
  deletePurchase: (id: string) => void;
}

const initialPurchases: Purchase[] = [
  {
    id: '1',
    productId: '1',
    quantity: 10,
    totalAmount: 11999.90,
    date: new Date('2024-03-01'),
    supplierName: 'Tech Suppliers Inc.',
    status: 'completed',
  },
  {
    id: '2',
    productId: '2',
    quantity: 50,
    totalAmount: 1299.50,
    date: new Date('2024-03-02'),
    supplierName: 'Global Electronics Ltd.',
    status: 'pending',
  },
];

export const usePurchaseStore = create<PurchaseState>((set) => ({
  purchases: initialPurchases,
  addPurchase: (purchaseData) =>
    set((state) => ({
      purchases: [
        ...state.purchases,
        {
          ...purchaseData,
          id: Math.random().toString(36).substr(2, 9),
          date: new Date(),
        },
      ],
    })),
  updatePurchaseStatus: (id, status) =>
    set((state) => ({
      purchases: state.purchases.map((purchase) =>
        purchase.id === id ? { ...purchase, status } : purchase
      ),
    })),
  deletePurchase: (id) =>
    set((state) => ({
      purchases: state.purchases.filter((purchase) => purchase.id !== id),
    })),
}));