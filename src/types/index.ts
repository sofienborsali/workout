export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  lastUpdated: Date;
}

export interface Sale {
  id: string;
  productId: string;
  quantity: number;
  totalAmount: number;
  date: Date;
  customerName: string;
}

export interface Purchase {
  id: string;
  productId: string;
  quantity: number;
  totalAmount: number;
  date: Date;
  supplierName: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}