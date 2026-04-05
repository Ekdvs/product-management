"use client";

import { addProduct } from "@/lib/strorage";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onSave: (product: Product) => void;
  editing: Product | null;
}

export const ProductForm: React.FC<Props> = ({ onSave, editing }) => {
  const [form, setForm] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    description: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    price: "",
  });

  // Load editing data
  useEffect(() => {
    if (editing) {
      setForm(editing);
    }
  }, [editing]);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "price"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  // Validation
  const validate = (): boolean => {
    let valid = true;
    const newErrors = { name: "", price: "" };

    if (!form.name.trim()) {
      newErrors.name = "Product name is required";
      valid = false;
    }

    if (!form.price || form.price <= 0) {
      newErrors.price = "Valid price is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix form errors");
      console.error("Validation failed", errors);
      return;
    }

    const product: Product = {
      ...form,
      id: form.id || uuidv4(),
    };

    addProduct(product);

    toast.success(
      editing ? "Product updated successfully" : "Product added successfully"
    );
    console.log(editing ? "Updated product:" : "Added product:", product);
    

    // Reset form
    setForm({
      id: "",
      name: "",
      price: 0,
      description: "",
      imageUrl: "",
    });

    setErrors({ name: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full border p-2"
      />
      {errors.name && <p className="text-red-500">{errors.name}</p>}

      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full border p-2"
      />
      {errors.price && <p className="text-red-500">{errors.price}</p>}

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2"
      />

      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full border p-2"
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        {editing ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};