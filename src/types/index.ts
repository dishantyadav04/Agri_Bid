export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  currentPrice: number;
  startingPrice: number;
  seller: string;
  location: string;
  quantity: number;
  category: string;
  harvestDate?: string;
  expiryDate?: string;
  certifications?: string[];
  bids?: Bid[];
  auctionEndTime?: Date; // Added auction end time
  blockchainId?: string; // Reference to blockchain transaction
  minBidIncrement?: number; // Minimum percentage increase for new bids
  minBidAmount?: number; // Minimum allowed bid amount
  maxBidAmount?: number; // Maximum allowed bid amount
}

export interface Bid {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: Date;
  status: 'active' | 'won' | 'lost';
  transactionHash?: string; // Blockchain transaction hash
}

export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'farmer' | 'buyer' | 'admin';
  address?: string;
  phone?: string;
  walletAddress?: string; // Blockchain wallet address
}

export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  isLoading: boolean;
}

export type Currency = '₹';

export interface BlockchainTransaction {
  hash: string;
  timestamp: Date;
  from: string;
  to: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'failed';
  blockNumber?: number;
  type: 'bid' | 'payment' | 'product' | 'other';
  details?: string;
}

export interface Block {
  blockNumber: number;
  hash: string;
  previousHash: string;
  timestamp: Date;
  transactions: BlockchainTransaction[];
  nonce: number;
}
