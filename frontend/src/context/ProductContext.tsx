import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import { supabaseService } from '../services/supabaseService';
import toast from 'react-hot-toast';
import { api } from '../services/api';

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  addProduct: (productData: Omit<Product, 'id' | 'createdAt' | 'views' | 'wishlistCount' | 'status'>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('campora_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out legacy demo product IDs
          const filtered = parsed.filter(p => !p.id.startsWith('prod_demo_') && p.id !== 'prod_1' && p.id !== 'prod_2' && p.id !== 'prod_3');
          return filtered;
        }
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const fetched = await supabaseService.fetchProducts();
      if (fetched) {
        // Filter out legacy demo product IDs
        const realProducts = fetched.filter(p => !p.id.startsWith('prod_demo_') && p.id !== 'prod_1' && p.id !== 'prod_2' && p.id !== 'prod_3');
        setProducts(realProducts);
      } else {
        setProducts([]);
      }
    } catch (e) {
      console.error('Failed to load products from Supabase', e);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('campora_products', JSON.stringify(products));
  }, [products]);

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'views' | 'wishlistCount' | 'status'>) => {
    const newProduct: Product = {
      ...productData,
      id: 'prod_' + Date.now(),
      views: 1,
      wishlistCount: 0,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };
    setProducts(prev => [newProduct, ...prev]);
    await supabaseService.addProduct(newProduct);
    toast.success('Listing created successfully');
  };

  const deleteProduct = async (id: string) => {
    try {
      await api.delete(`/products/${id}`).catch(() => {});
    } catch (e) {
      // Ignore API errors if running in mock/demo mode
    }
    await supabaseService.deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success('Listing removed successfully');
  };

  return (
    <ProductContext.Provider value={{ products, isLoading, addProduct, deleteProduct, refreshProducts: loadProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

