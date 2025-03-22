
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ArrowRight, Package, User } from 'lucide-react';

const MyProducts: React.FC = () => {
  const { products, currentUser, currency } = useProducts();
  const navigate = useNavigate();
  
  // Redirect if not logged in as a farmer
  React.useEffect(() => {
    if (!currentUser || currentUser.userType !== 'farmer') {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  // Filter products based on seller name
  const myProducts = products.filter(product => product.seller === currentUser.name);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-700">My Products</h1>
        <Button 
          onClick={() => navigate('/add-product')} 
          className="bg-green-600 hover:bg-green-700"
        >
          Add New Product
        </Button>
      </div>
      
      {myProducts.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <Package size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">You haven't listed any products yet.</p>
            <Button 
              onClick={() => navigate('/add-product')} 
              className="bg-green-600 hover:bg-green-700"
            >
              Add Your First Product
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {myProducts.map(product => {
            const isAuctionActive = product.auctionEndTime && new Date() < new Date(product.auctionEndTime);
            const highestBid = Math.max(...(product.bids || []).map(bid => bid.amount), 0);
            const bidCount = (product.bids || []).length;
            
            return (
              <Card key={product.id} className="overflow-hidden">
                <div className="md:flex">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="h-48 w-full md:w-48 object-cover"
                  />
                  <div className="flex-grow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl font-bold text-green-700">
                            {product.name}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            Location: {product.location} | Category: {product.category}
                          </CardDescription>
                        </div>
                        <Badge className={isAuctionActive ? "bg-green-500" : "bg-gray-500"}>
                          {isAuctionActive ? "Active" : "Ended"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Starting Price</p>
                          <p className="text-lg font-semibold">{currency}{product.startingPrice}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Current Bid</p>
                          <p className="text-lg font-semibold">
                            {highestBid > 0 ? `${currency}${highestBid}` : 'No bids'}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Bids</p>
                          <p className="text-lg font-semibold">{bidCount}</p>
                        </div>
                      </div>
                      
                      {product.auctionEndTime && (
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground">Auction {isAuctionActive ? 'Ends' : 'Ended'}</p>
                          <p className="text-sm">
                            {format(new Date(product.auctionEndTime), 'PPp')}
                          </p>
                        </div>
                      )}
                      
                      {bidCount > 0 && (
                        <div className="border-t pt-4 mt-4">
                          <p className="text-sm text-muted-foreground mb-2">Top Bidder</p>
                          <div className="flex items-center">
                            <div className="bg-green-100 rounded-full p-2 mr-3">
                              <User size={16} className="text-green-700" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {product.bids && product.bids.length > 0 ? 
                                  product.bids.reduce((prev, current) => 
                                    prev.amount > current.amount ? prev : current
                                  ).userName : 'N/A'}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {highestBid > 0 ? `${currency}${highestBid}` : 'No bids'}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={() => navigate(`/product/${product.id}`)}
                        variant="outline"
                        className="w-full text-green-700 border-green-600 hover:bg-green-100"
                      >
                        View Product <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
