"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { FiFrown } from "react-icons/fi";
import { Sun, Moon } from "lucide-react";
import toast from "react-hot-toast";
import { addProduct, deleteProduct, getProducts, updateProduct } from "@/lib/strorage";
import { ProductForm } from "@/components/ProductForm";
import { SearchBar } from "@/components/SearchBar";
import { ProductList } from "@/components/ProductList";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(true);

  // Load products and dark mode preference
  useEffect(() => {
    const res = getProducts();
    if (res.success && res.data) setProducts(res.data);

    const saved = localStorage.getItem("dark");
    if (saved === "true") setDark(true);
    if (saved === "false") setDark(false);
  }, []);

  // Apply dark mode to wrapper div
  useEffect(() => {
    const appRoot = document.getElementById("app-root");
    if (!appRoot) return;

    if (dark) appRoot.classList.add("dark");
    else appRoot.classList.remove("dark");

    localStorage.setItem("dark", dark.toString());
  }, [dark]);

  const handleSave = (product: Product) => {
    const res = editing ? updateProduct(product) : addProduct(product);
    if (res.success && res.data) {
      setProducts(res.data);
      toast.success(res.message);
      setEditing(null);
    } else {
      toast.error(res.message);
    }
  };

  const handleDelete = (id: string) => {
    const res = deleteProduct(id);
    if (res.success && res.data) {
      setProducts(res.data);
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">🛍 Product Manager</h1>
        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 rounded bg-gray-800 text-white dark:bg-yellow-400 dark:text-black flex items-center gap-2"
        >
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {dark ? "Light" : "Dark"}
        </button>
      </div>

      {/* Form */}
      <ProductForm onSave={handleSave} editing={editing} />

      {/* Search */}
      <SearchBar search={search} onSearch={setSearch} />

      {/* Product List */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 flex items-center justify-center gap-2">
          <FiFrown className="w-6 h-6" />
          <span>No products found</span>
        </div>
      ) : (
        <ProductList products={filtered} onEdit={setEditing} onDelete={handleDelete} />
      )}
    </div>
  );
}