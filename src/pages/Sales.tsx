import { useState } from "react";
import { Plus } from "lucide-react";
import { DataTable } from "../components/DataTable";
import { SaleForm } from "../components/SaleForm";
import { useSalesStore } from "../store/salesStore";
import { useProductStore } from "../store/productStore";
import { Sale } from "../types";

export default function Sales() {
  const { sales, addSale, deleteSale } = useSalesStore();
  const { products } = useProductStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const columns = [
    {
      header: "Product",
      accessor: "productId" as keyof Sale,
      render: (value: string) =>
        products.find((p) => p.id === value)?.name || "Unknown",
    },
    {
      header: "Customer",
      accessor: "customerName" as keyof Sale,
    },
    {
      header: "Quantity",
      accessor: "quantity" as keyof Sale,
    },
    {
      header: "Total Amount",
      accessor: "totalAmount" as keyof Sale,
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      header: "Date",
      accessor: "date" as keyof Sale,
      render: (value: Date) => new Date(value).toLocaleDateString(),
    },
  ];

  const handleSubmit = (data: Omit<Sale, "id" | "date">) => {
    addSale(data);
    setIsFormOpen(false);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Sales</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Sale
        </button>
      </div>

      {isFormOpen ? (
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Create New Sale
          </h2>
          <SaleForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <DataTable<Sale>
            data={sales}
            columns={columns}
            onDelete={deleteSale}
          />
        </div>
      )}
    </div>
  );
}
