
import React, { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AllProducts: React.FC = () => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Filter products based on search term
  const filteredProducts = searchTerm
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          className="mb-2 text-green-700 hover:text-green-800 hover:bg-green-50 -ml-3"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
        <h1 className="text-3xl font-bold text-green-700">All Products</h1>
        <p className="text-muted-foreground mt-2">
          Browse all available agricultural products from verified farmers across India
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex w-full md:w-1/2">
          <Input
            placeholder="Search products, categories, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-r-none focus-visible:ring-green-200"
          />
          <Button className="rounded-l-none bg-green-600 hover:bg-green-700">
            <Search size={18} />
          </Button>
        </div>
        
        <div className="flex justify-end w-full md:w-1/2">
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filter
          </Button>
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">No products found matching "{searchTerm}"</p>
          <Button 
            onClick={() => setSearchTerm('')}
            className="bg-green-600 hover:bg-green-700"
          >
            Clear Search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
