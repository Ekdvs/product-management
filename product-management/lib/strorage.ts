import { Product } from "@/types/product";

const KEY = "products";


//sandard response
type Response<T> = {
  success: boolean;
  
  message: string;
  data?: T;
}

//get all products from local storage
export const getProducts = (): Response<Product[]> => {
  try {
    if (typeof window === "undefined") {
      return { success: false, message: "Window not available" };
    }

    const data = localStorage.getItem(KEY);
    const products: Product[] = data ? JSON.parse(data) : [];

    return { success: true, message: "Products fetched", data: products };
  } catch (error) {
    return { success: false, message: "Failed to fetch products" };
  }
};

//save all products to local storage
export const saveProducts = (products: Product[]): Response<null> => {
  try {
    localStorage.setItem(KEY, JSON.stringify(products));
    return { success: true, message: "Products saved" };
  } catch (error) {
    return { success: false, message: "Failed to save products" };
  }
};

//get a single product by id
export const getProductById = (id: string): Response<Product> => {
  try {
    const res = getProducts();
    if (!res.success || !res.data) {
      return { success: false, message: res.message };
    }

    const product = res.data.find((p) => String(p.id) === String(id));

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    return { success: true, message: "Product found", data: product };
  } catch {
    return { success: false, message: "Error fetching product" };
  }
};

//validate product data
const validateProduct = (product: Product): string | null => {
  if (!product.name.trim()) return "Product name is required";
  if (!product.price || product.price <= 0) return "Valid price required";
  return null;
};

//add a new product
export const addProduct = (product: Product): Response<Product[]> => {
  try {
    const error = validateProduct(product);
    if (error) return { success: false, message: error };

    const res = getProducts();
    if (!res.success || !res.data) return res;

    const updated = [...res.data, product];
    saveProducts(updated);

    return {
      success: true,
      message: "Product added successfully",
      data: updated,
    };
  } catch {
    return { success: false, message: "Failed to add product" };
  }
};

//update an existing product
export const updateProduct = (product: Product): Response<Product[]> => {
  try {
    const error = validateProduct(product);
    if (error) return { success: false, message: error };

    const res = getProducts();
    if (!res.success || !res.data) return res;

    const exists = res.data.some((p) => String(p.id) === String(product.id));
    if (!exists) {
      return { success: false, message: "Product not found" };
    }

    const updated = res.data.map((p) =>
      String(p.id) === String(product.id) ? product : p
    );

    saveProducts(updated);

    return {
      success: true,
      message: "Product updated successfully",
      data: updated,
    };
  } catch {
    return { success: false, message: "Failed to update product" };
  }
};

//delete a product by id
export const deleteProduct = (id: string): Response<Product[]> => {
  try {
    const res = getProducts();
    if (!res.success || !res.data) return res;

    const exists = res.data.some((p) => String(p.id) === String(id));
    if (!exists) {
      return { success: false, message: "Product not found" };
    }

    const updated = res.data.filter((p) => String(p.id) !== String(id));
    saveProducts(updated);

    return {
      success: true,
      message: "Product deleted successfully",
      data: updated,
    };
  } catch {
    return { success: false, message: "Failed to delete product" };
  }
};

//search products
export const searchProducts = (query: string) => {
  const res = getProducts();

  if (!res.success || !res.data) return res;

  const filtered = res.data.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return {
    success: true,
    message: "Search completed",
    data: filtered,
  };
};