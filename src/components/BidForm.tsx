
import React, { useState, useEffect } from 'react';
import { useProducts } from '@/context/ProductContext';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Shield, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BidFormProps {
  product: Product;
  onBidSubmit?: () => void;
}

const BidForm: React.FC<BidFormProps> = ({ product, onBidSubmit }) => {
  const { addBid, getHighestBidForProduct, currentUser, isAuthenticated, currency } = useProducts();
  const highestBid = getHighestBidForProduct(product.id);
  
  // Calculate minimum bid based on product settings
  const calculateMinimumBid = () => {
    // Start with the highest of current highest bid or starting price
    let minBid = Math.max(product.startingPrice, highestBid);
    
    // Apply minimum bid increment if it exists and there are previous bids
    if (product.minBidIncrement && highestBid > product.startingPrice) {
      minBid = minBid * (1 + product.minBidIncrement / 100);
    }
    
    // Ensure minimum bid amount is respected
    if (product.minBidAmount) {
      minBid = Math.max(minBid, product.minBidAmount);
    }
    
    // Round to 2 decimal places
    return Math.ceil(minBid);
  };
  
  const minimumBid = calculateMinimumBid();
  const [bidAmount, setBidAmount] = useState<number>(minimumBid);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update bid amount when minimum bid changes
  useEffect(() => {
    setBidAmount(minimumBid);
  }, [minimumBid]);

  // Check if auction has ended
  const isAuctionEnded = product.auctionEndTime && new Date() > new Date(product.auctionEndTime);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please login as a buyer to place a bid");
      return;
    }

    if (!currentUser || currentUser.userType !== 'buyer') {
      toast.error("Only buyers can place bids");
      return;
    }
    
    if (isAuctionEnded) {
      toast.error("This auction has ended");
      return;
    }
    
    if (bidAmount < minimumBid) {
      toast.error(`Bid must be at least ${currency}${minimumBid}`);
      return;
    }
    
    // Check max bid limit
    if (product.maxBidAmount && bidAmount > product.maxBidAmount) {
      toast.error(`Bid cannot exceed ${currency}${product.maxBidAmount}`);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      addBid(product.id, bidAmount);
      toast.success("Your bid has been placed successfully!");
      
      // Reset form
      const newMinBid = calculateMinimumBid();
      setBidAmount(newMinBid);
      setIsSubmitting(false);
      
      if (onBidSubmit) {
        onBidSubmit();
      }
    }, 800);
  };

  // Render auction status
  const renderAuctionStatus = () => {
    if (!product.auctionEndTime) return null;
    
    const endTime = new Date(product.auctionEndTime);
    
    if (isAuctionEnded) {
      return (
        <div className="flex items-center gap-2 p-2 mt-2 bg-red-100 text-red-700 rounded-md">
          <Clock size={16} />
          <span className="text-sm font-medium">Auction has ended</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-2 p-2 mt-2 bg-amber-100 text-amber-700 rounded-md">
        <Clock size={16} />
        <span className="text-sm font-medium">
          Ends {formatDistanceToNow(endTime, { addSuffix: true })}
        </span>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-green-50 p-6 rounded-lg backdrop-blur-sm animate-fade-in">
      {renderAuctionStatus()}
      
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary flex items-center gap-1">
          <Shield size={12} />
          <span>Blockchain Protected</span>
        </Badge>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <p className="text-muted-foreground">Current highest bid</p>
          <p className="font-medium">{currency}{highestBid.toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between text-sm">
          <p className="text-muted-foreground">Your minimum bid</p>
          <p className="font-medium">{currency}{minimumBid.toFixed(2)}</p>
        </div>
        
        {product.minBidIncrement && (
          <div className="flex justify-between text-sm">
            <p className="text-muted-foreground">Minimum increment</p>
            <p className="font-medium">{product.minBidIncrement}%</p>
          </div>
        )}
        
        {product.maxBidAmount && (
          <div className="flex justify-between text-sm">
            <p className="text-muted-foreground">Maximum bid allowed</p>
            <p className="font-medium">{currency}{product.maxBidAmount.toFixed(2)}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="bidAmount" className="text-sm font-medium">
          Your bid
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{currency}</span>
          <Input
            id="bidAmount"
            type="number"
            min={minimumBid}
            max={product.maxBidAmount}
            step="1"
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            className="pl-7"
            required
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full button-hover-effect bg-green-600 hover:bg-green-700 text-white"
        disabled={isSubmitting || !isAuthenticated || (currentUser?.userType !== 'buyer') || isAuctionEnded}
      >
        {!isAuthenticated ? 'Login to Bid' : 
         (currentUser?.userType !== 'buyer') ? 'Only Buyers Can Bid' :
         isAuctionEnded ? 'Auction Ended' :
         (isSubmitting ? "Placing Bid..." : "Place Bid")}
      </Button>
      
      <div className="p-2 bg-black/5 rounded text-xs">
        <p className="font-medium mb-1 flex items-center gap-1">
          <Shield size={12} className="text-primary" />
          Blockchain Secure Bidding
        </p>
        <p className="text-muted-foreground">
          All bids are recorded on our blockchain ledger, providing transparency and preventing fraud.
        </p>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        By placing a bid, you agree to our Terms and Conditions
      </p>
    </form>
  );
};

export default BidForm;
