"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import * as z from "zod";
import { Check } from "lucide-react";

interface Props {
    onSave: (product: Product) => void;
    editing: Product | null;
}

const schema = z.object({
    name: z.string().min(1, "Product name is required"),
    price: z.number().positive("Price must be > 0"),
    description: z.string().optional(),
    imageUrl: z.string().url("Invalid URL").optional(),
});

export const ProductForm: React.FC<Props> = ({ onSave, editing }) => {
    const [form, setForm] = useState<Product>({
        id: "",
        name: "",
        price: 0,
        description: "",
        imageUrl: "",
    });

    useEffect(() => {
        if (editing) setForm(editing);
    }, [editing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.name === "price" ? Number(e.target.value) : e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parsed = schema.safeParse(form);
        if (!parsed.success) {
            parsed.error.issues.forEach(err => toast.error(err.message));
            return;
        }

        onSave({ ...form, id: form.id || uuidv4() });
        toast.success(editing ? "Product updated!" : "Product added!");
        setForm({ id: "", name: "", price: 0, description: "", imageUrl: "" });
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-6 transition"
        >
            <input
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-3 dark:bg-gray-700"
            />
            <input
                name="price"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-3 dark:bg-gray-700"
            />
            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-3 dark:bg-gray-700"
            />
            <input
                name="imageUrl"
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-3 dark:bg-gray-700"
            />
            {form.imageUrl && (
                <img src={form.imageUrl} alt="Preview" className="mb-3 h-40 w-full object-cover rounded-lg border" />
            )}
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-3">
                <Check className="w-4 h-4" />
                {editing ? "Update Product" : "Add Product"}
            </button>
        </motion.form>
    );
};