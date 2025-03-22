
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wheat, Leaf, Apple, Coffee, Beef, Flame } from 'lucide-react';

const FeaturedCategories: React.FC = () => {
  const { products } = useProducts();
  const navigate = useNavigate();
  
  // Get unique categories from products
  const allCategories = products.map(product => product.category);
  const uniqueCategories = [...new Set(allCategories)];
  
  // Predefined category icons
  const categoryIcons = {
    'Grains': Wheat,
    'Fruits': Apple,
    'Vegetables': Leaf,
    'Spices': Flame,
    'Tea': Coffee,
    'Dairy': Beef,
    'Oils': Coffee,
  };
  
  // Predefined category images if available
  const categoryImages = {
    'Grains': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'Fruits': 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    'Tea': 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    'Spices': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'Oils': 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  };
  
  // Get product count for each category
  const categoryCount = uniqueCategories.reduce((acc, category) => {
    acc[category] = products.filter(product => product.category === category).length;
    return acc;
  }, {} as Record<string, number>);
  
  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category.toLowerCase()}`);
  };
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-green-700 mb-2">Featured Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of agricultural products across different categories from verified farmers across India
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueCategories.map((category) => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Leaf;
            const hasImage = categoryImages[category as keyof typeof categoryImages];
            
            return (
              <Card 
                key={category}
                className="group hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                {hasImage ? (
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={hasImage} 
                      alt={category} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-40 bg-green-50 flex items-center justify-center">
                    <IconComponent size={64} className="text-green-600" />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-green-700">{category}</h3>
                      <p className="text-muted-foreground mt-1">{categoryCount[category]} products</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="rounded-full bg-green-50 text-green-700 hover:bg-green-100"
                    >
                      <ArrowRight size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-10">
          <Button 
            onClick={() => navigate('/')}
            className="bg-green-600 hover:bg-green-700"
          >
            View All Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
