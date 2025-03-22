
import React, { useState, useEffect } from 'react';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';
import FeaturedCategories from '@/components/FeaturedCategories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Index: React.FC = () => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);
  
  return (
    <div>
      <div className="bg-green-50 py-16 mb-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
              Direct from Farm to Table
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              AgriBid connects farmers directly with buyers through a transparent auction platform.
              Get the freshest produce at fair prices.
            </p>
            
            <div className="flex max-w-md mx-auto">
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
          </div>
        </div>
      </div>
      
      <FeaturedCategories />
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-green-700 mb-8">Latest Products</h2>
        
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
    </div>
  );
};

export default Index;
