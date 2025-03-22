
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Filter } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { products } = useProducts();
  const navigate = useNavigate();
  
  const categoryProducts = products.filter(
    product => product.category.toLowerCase() === categoryName?.toLowerCase()
  );
  
  // Convert the category name for display (e.g., "grains" to "Grains")
  const displayCategoryName = categoryName 
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) 
    : '';
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          className="mb-2 text-green-700 hover:text-green-800 hover:bg-green-50 -ml-3"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Home
        </Button>
        <h1 className="text-3xl font-bold text-green-700">
          {displayCategoryName} Products
        </h1>
        <p className="text-muted-foreground mt-2">
          Explore our selection of high-quality {displayCategoryName.toLowerCase()} from verified farmers across India
        </p>
      </div>
      
      {categoryProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground mb-4">No products found in this category.</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-green-600 hover:bg-green-700"
          >
            Browse All Products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
