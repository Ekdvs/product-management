import { Product } from "@/types/product";
import { Edit, Trash2 } from "lucide-react";

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<Props> = ({ product, onEdit, onDelete }) => (
  <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-xl shadow hover:shadow-lg transition-colors duration-300">
    {product.imageUrl && (
      <img
        src={product.imageUrl}
        alt={product.name ? `${product.name} image` : "Product image"}
        title={product.name || "Product image"}
        className="h-40 w-full object-cover rounded mb-3"
      />
    )}

    <h2 className="font-bold text-lg">
      Name: <span className="font-normal">{product.name}</span>
    </h2>
    <p className="text-blue-500 dark:text-blue-400 font-semibold">
      Price: <span className="font-normal">RS {product.price.toFixed(2)}</span>
    </p>
    {product.description && (
      <p className="text-gray-500 dark:text-gray-300 mt-1">
        Description: <span className="font-normal">{product.description}</span>
      </p>
    )}

    <div className="flex justify-between mt-4">
      <button
        className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
        onClick={() => onEdit(product)}
      >
        <Edit className="w-4 h-4" />
        Edit
      </button>

      <button
        className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        onClick={() => onDelete(product.id)}
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>
    </div>
  </div>
);