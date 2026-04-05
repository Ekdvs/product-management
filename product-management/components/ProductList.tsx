import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductList: React.FC<Props> = ({ products, onEdit, onDelete }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {products.map((p) => (
      <ProductCard key={p.id} product={p} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </div>
);