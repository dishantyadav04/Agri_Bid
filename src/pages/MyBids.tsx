
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const MyBids: React.FC = () => {
  const { currentUser, getUserBids, products, currency, isHighestBidder } = useProducts();
  const navigate = useNavigate();
  
  // Redirect if not logged in as a buyer
  React.useEffect(() => {
    if (!currentUser || currentUser.userType !== 'buyer') {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  const userBids = getUserBids(currentUser.id);
  
  // Group bids by product
  const bidsByProduct = userBids.reduce((acc, bid) => {
    const product = products.find(p => p.bids?.some(b => b.id === bid.id));
    if (product) {
      if (!acc[product.id]) {
        acc[product.id] = {
          product,
          bids: []
        };
      }
      acc[product.id].bids.push(bid);
    }
    return acc;
  }, {} as Record<string, { product: typeof products[0], bids: typeof userBids }>);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-8">My Bids</h1>
      
      {Object.keys(bidsByProduct).length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground mb-4">You haven't placed any bids yet.</p>
            <Button onClick={() => navigate('/')} className="bg-green-600 hover:bg-green-700">
              Browse Products
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {Object.values(bidsByProduct).map(({ product, bids }) => {
            const highestBid = Math.max(...bids.map(bid => bid.amount));
            const isWinning = isHighestBidder(product.id, currentUser.id);
            const isAuctionEnded = product.auctionEndTime && new Date() > new Date(product.auctionEndTime);
            
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
                            Seller: {product.seller} | Location: {product.location}
                          </CardDescription>
                        </div>
                        {isAuctionEnded && (
                          <Badge className={isWinning ? "bg-green-500" : "bg-gray-500"}>
                            {isWinning ? "Won" : "Lost"}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Price</p>
                          <p className="text-lg font-semibold">{currency}{product.currentPrice}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Your Highest Bid</p>
                          <p className="text-lg font-semibold">{currency}{highestBid}</p>
                        </div>
                        
                        {product.auctionEndTime && (
                          <div>
                            <p className="text-sm text-muted-foreground">Auction Ends</p>
                            <p className="text-sm">
                              {format(new Date(product.auctionEndTime), 'PPp')}
                            </p>
                          </div>
                        )}
                        
                        <Button 
                          onClick={() => navigate(`/product/${product.id}`)}
                          variant="outline"
                          className="w-full md:w-auto mt-4 text-green-700 border-green-600 hover:bg-green-100"
                        >
                          View Product <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </div>
                    </CardContent>
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

export default MyBids;
