
import React, { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { Product, Bid } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Clock, Shield, ExternalLink } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BidHistoryProps {
  product: Product;
}

const BidHistory: React.FC<BidHistoryProps> = ({ product }) => {
  const { currentUser, currency, getBlockchainTransactionDetails } = useProducts();
  const [expandedBidId, setExpandedBidId] = useState<string | null>(null);
  
  const sortedBids = [...(product.bids || [])].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Check if auction has ended
  const isAuctionEnded = product.auctionEndTime && new Date() > new Date(product.auctionEndTime);

  if (!sortedBids.length) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <p className="text-muted-foreground">No bids yet</p>
        <p className="text-sm">
          {isAuctionEnded ? "This auction has ended with no bids." : "Be the first to place a bid!"}
        </p>
      </div>
    );
  }

  // Show winner badge at the top if auction has ended
  const showWinner = isAuctionEnded && sortedBids.length > 0;
  const winningBid = showWinner ? sortedBids.reduce((highest, bid) => 
    bid.amount > highest.amount ? bid : highest, sortedBids[0]) : null;

  const toggleBidExpansion = (bidId: string) => {
    setExpandedBidId(expandedBidId === bidId ? null : bidId);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {showWinner && (
        <div className="bg-green-100 p-3 rounded-lg border border-green-300 mb-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-600">Winner</Badge>
            <p className="font-medium">
              {winningBid?.userId === currentUser?.id ? 'You' : winningBid?.userName}
            </p>
          </div>
          <p className="text-sm mt-1">
            Winning bid: {currency}{winningBid?.amount.toFixed(2)}
          </p>
        </div>
      )}
      
      <ScrollArea className="h-[250px] w-full">
        <div className="space-y-4">
          {sortedBids.map((bid, index) => (
            <BidItem 
              key={bid.id} 
              bid={bid} 
              isCurrentUser={bid.userId === currentUser?.id}
              isHighest={index === 0}
              isWinner={isAuctionEnded && bid.amount === winningBid?.amount && bid.userId === winningBid?.userId}
              currency={currency}
              expanded={expandedBidId === bid.id}
              onToggleExpand={() => toggleBidExpansion(bid.id)}
              getBlockchainTransactionDetails={getBlockchainTransactionDetails}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

interface BidItemProps {
  bid: Bid;
  isCurrentUser: boolean;
  isHighest: boolean;
  isWinner: boolean;
  currency: string;
  expanded: boolean;
  onToggleExpand: () => void;
  getBlockchainTransactionDetails: (hash: string) => any;
}

const BidItem: React.FC<BidItemProps> = ({ 
  bid, 
  isCurrentUser, 
  isHighest, 
  isWinner, 
  currency,
  expanded,
  onToggleExpand,
  getBlockchainTransactionDetails
}) => {
  const timeAgo = formatDistanceToNow(new Date(bid.timestamp), { addSuffix: true });
  const transactionDetails = bid.transactionHash ? getBlockchainTransactionDetails(bid.transactionHash) : null;
  
  return (
    <div 
      className={`
        p-3 rounded-lg transition-all duration-300 cursor-pointer
        ${isWinner ? 'bg-green-50 border border-green-200' : 
          isHighest ? 'bg-accent/80 border border-primary/10' : 'bg-card/60'}
        ${isCurrentUser ? 'border-l-4 border-l-primary' : ''}
      `}
      onClick={onToggleExpand}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-sm flex items-center gap-2">
            {isCurrentUser ? 'You' : bid.userName}
            {isWinner && (
              <Badge className="bg-green-600">Winner</Badge>
            )}
            {isHighest && !isWinner && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                Highest
              </span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">{timeAgo}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-bold">{currency}{bid.amount.toFixed(2)}</p>
          {bid.transactionHash && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <Shield size={10} />
                    <span>Verified</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Verified on blockchain</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      
      {expanded && bid.transactionHash && (
        <div className="mt-2 p-2 bg-black/5 rounded text-xs text-muted-foreground">
          <p className="flex items-center gap-1 font-medium">
            <Shield size={12} className="text-primary" />
            Blockchain Transaction
          </p>
          <p className="mt-1 break-all">Hash: {bid.transactionHash}</p>
          {transactionDetails && (
            <>
              <p>Status: {transactionDetails.status}</p>
              <p>Time: {formatDistanceToNow(new Date(transactionDetails.timestamp), { addSuffix: true })}</p>
            </>
          )}
          <div className="mt-1 flex justify-end">
            <a href="#" className="text-primary flex items-center gap-1 text-xs" onClick={(e) => e.stopPropagation()}>
              View on Explorer <ExternalLink size={10} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidHistory;
