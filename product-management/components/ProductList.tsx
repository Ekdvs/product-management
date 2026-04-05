import { ProductCard } from "./ProductCard";

export const ProductList = ({ products, onEdit, onDelete }: any) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {products.map((p: any) => (
      <ProductCard key={p.id} product={p} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </div>
);