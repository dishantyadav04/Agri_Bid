import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Bid, User, Currency, BlockchainTransaction } from '@/types';
import { addDays } from 'date-fns';
import { blockchainService, generateWalletAddress } from '@/utils/blockchainService';
import { toast } from 'sonner';

// Sample data with Indian context and auction end times
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Organic Basmati Rice",
    description: "Aromatic, long-grain basmati rice from the foothills of the Himalayas. Grown with traditional farming methods that preserve its authentic flavor and aroma.",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    currentPrice: 150,
    startingPrice: 120,
    seller: "Himalayan Harvest Co.",
    location: "Dehradun, Uttarakhand",
    quantity: 100,
    category: "Grains",
    harvestDate: "2023-10-01",
    expiryDate: "2024-10-01",
    certifications: ["Organic", "Non-GMO"],
    bids: [],
    auctionEndTime: addDays(new Date(), 7),
    minBidIncrement: 5, // 5% minimum increase
    minBidAmount: 120,
    maxBidAmount: 500
  },
  {
    id: "2",
    name: "Fresh Alphonso Mangoes",
    description: "Known as the 'King of Mangoes', these Alphonso mangoes from Ratnagiri are sweet, fragrant, and have a rich, creamy texture. Perfect for eating fresh or making desserts.",
    imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    currentPrice: 450,
    startingPrice: 400,
    seller: "Konkan Fruit Farms",
    location: "Ratnagiri, Maharashtra",
    quantity: 50,
    category: "Fruits",
    harvestDate: "2023-05-15",
    bids: [],
    auctionEndTime: addDays(new Date(), 5)
  },
  {
    id: "3",
    name: "Premium Darjeeling Tea",
    description: "First flush Darjeeling tea, known as the 'Champagne of Teas'. This premium loose-leaf tea offers a muscatel flavor with floral undertones, harvested from the misty hills of Darjeeling.",
    imageUrl: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    currentPrice: 800,
    startingPrice: 750,
    seller: "Himalayan Tea Estates",
    location: "Darjeeling, West Bengal",
    quantity: 25,
    category: "Tea",
    harvestDate: "2023-03-10",
    certifications: ["Organic", "Fair Trade"],
    bids: [],
    auctionEndTime: addDays(new Date(), 3)
  },
  {
    id: "4",
    name: "Organic Turmeric Powder",
    description: "High-curcumin organic turmeric from Kerala, grown using traditional farming methods. Perfect for cooking, Ayurvedic remedies, and natural food coloring.",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    currentPrice: 220,
    startingPrice: 180,
    seller: "Kerala Spice Gardens",
    location: "Wayanad, Kerala",
    quantity: 40,
    category: "Spices",
    certifications: ["Organic", "Chemical-Free"],
    bids: []
  },
  {
    id: "5",
    name: "Pure Kashmir Saffron",
    description: "Premium Kashmiri saffron known for its distinct aroma, flavor and color. Handpicked from the valleys of Kashmir, this 'red gold' adds exquisite flavor to both sweet and savory dishes.",
    imageUrl: "https://images.unsplash.com/photo-1599789197514-47270cd526b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    currentPrice: 1500,
    startingPrice: 1200,
    seller: "Kashmir Valley Farms",
    location: "Pampore, Jammu & Kashmir",
    quantity: 10,
    category: "Spices",
    certifications: ["GI Tagged", "Premium Grade"],
    bids: []
  },
  {
    id: "6",
    name: "Cold-Pressed Coconut Oil",
    description: "Traditional cold-pressed virgin coconut oil made from organically grown coconuts. Free from chemicals and preservatives, perfect for cooking, hair and skin care.",
    imageUrl: "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    currentPrice: 350,
    startingPrice: 300,
    seller: "Tamil Nadu Coconut Cooperative",
    location: "Pollachi, Tamil Nadu",
    quantity: 30,
    category: "Oils",
    certifications: ["Organic", "Cold-Pressed"],
    bids: []
  }
];

// Sample users with admin user added and wallet addresses
const sampleUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    userType: "buyer",
    address: "123 Main St, Delhi, India",
    phone: "555-123-4567",
    walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    userType: "farmer",
    address: "456 Farm Rd, Mumbai, India",
    phone: "555-987-6543",
    walletAddress: "0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5"
  },
  {
    id: "admin",
    name: "Admin User",
    email: "admin@example.com",
    userType: "admin",
    address: "789 Admin Blvd, Bangalore, India",
    phone: "555-321-7890",
    walletAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
  }
];

interface ProductContextType {
  products: Product[];
  currentUser: User | null;
  isAuthenticated: boolean;
  currency: Currency;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  addBid: (productId: string, amount: number) => void;
  getHighestBidForProduct: (productId: string) => number;
  getUserBids: (userId: string) => Bid[];
  isHighestBidder: (productId: string, userId: string) => boolean;
  login: (email: string, password: string, userType: 'farmer' | 'buyer' | 'admin') => Promise<boolean>;
  register: (name: string, email: string, password: string, userType: 'farmer' | 'buyer') => Promise<boolean>;
  logout: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  isAdmin: () => boolean;
  updateUserProfile: (user: User) => void;
  getWalletBalance: (userId: string) => number;
  getBlockchainTransactionDetails: (hash: string) => BlockchainTransaction | undefined;
  getBlockchainStats: () => any;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [users] = useState<User[]>(sampleUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currency] = useState<Currency>('₹');

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const addBid = (productId: string, amount: number) => {
    if (!currentUser) return;

    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if auction has ended
    if (product.auctionEndTime && new Date() > new Date(product.auctionEndTime)) {
      toast.error("This auction has ended");
      return;
    }

    // Check minimum bid amount
    if (product.minBidAmount && amount < product.minBidAmount) {
      toast.error(`Bid must be at least ${currency}${product.minBidAmount}`);
      return;
    }

    // Check maximum bid amount
    if (product.maxBidAmount && amount > product.maxBidAmount) {
      toast.error(`Bid cannot exceed ${currency}${product.maxBidAmount}`);
      return;
    }

    // Get current highest bid
    const highestBid = getHighestBidForProduct(productId);
    
    // Check minimum increment if there are existing bids
    if (highestBid > product.startingPrice && product.minBidIncrement) {
      const minRequiredBid = highestBid * (1 + product.minBidIncrement / 100);
      if (amount < minRequiredBid) {
        toast.error(`New bid must be at least ${product.minBidIncrement}% higher than current bid (${currency}${minRequiredBid.toFixed(2)})`);
        return;
      }
    }

    // Create blockchain transaction for the bid
    let transactionHash: string | undefined;
    try {
      if (currentUser.walletAddress && product) {
        const sellerUser = users.find(u => u.name === product.seller);
        const sellerWallet = sellerUser?.walletAddress || "0x0000000000000000000000000000000000000000";
        
        transactionHash = blockchainService.createBidTransaction(
          currentUser.walletAddress,
          sellerWallet,
          amount,
          productId
        );
        
        toast.success(`Bid recorded on blockchain with hash: ${transactionHash.substring(0, 10)}...`);
      }
    } catch (error) {
      console.error("Blockchain transaction failed:", error);
      toast.error("Blockchain verification failed. Please try again.");
      return;
    }

    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      amount,
      timestamp: new Date(),
      status: 'active',
      transactionHash: transactionHash
    };

    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? {
              ...product,
              bids: [...(product.bids || []), newBid],
              currentPrice: Math.max(product.currentPrice, amount)
            }
          : product
      )
    );
  };

  const getHighestBidForProduct = (productId: string): number => {
    const product = products.find(p => p.id === productId);
    if (!product || !product.bids || product.bids.length === 0) {
      return product?.startingPrice || 0;
    }
    return Math.max(...product.bids.map(bid => bid.amount));
  };

  const getUserBids = (userId: string): Bid[] => {
    return products.flatMap(product => 
      (product.bids || []).filter(bid => bid.userId === userId)
    );
  };

  const isHighestBidder = (productId: string, userId: string): boolean => {
    if (!userId) return false;
    
    const product = products.find(p => p.id === productId);
    if (!product || !product.bids || product.bids.length === 0) return false;
    
    const isAuctionEnded = product.auctionEndTime && new Date() > new Date(product.auctionEndTime);
    
    if (isAuctionEnded) {
      // Find the highest bid amount
      const highestBidAmount = Math.max(...product.bids.map(bid => bid.amount));
      
      // Find all bids with the highest amount
      const highestBids = product.bids.filter(bid => bid.amount === highestBidAmount);
      
      // Check if any of the user's bids are among the highest bids
      return highestBids.some(bid => bid.userId === userId);
    }
    
    return false;
  };

  const login = async (email: string, password: string, userType: 'farmer' | 'buyer' | 'admin'): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'admin@example.com' && userType === 'admin') {
          const adminUser = users.find(u => u.id === 'admin');
          if (adminUser) {
            setCurrentUser(adminUser);
            setIsAuthenticated(true);
            localStorage.setItem('currentUser', JSON.stringify(adminUser));
            
            // Show blockchain wallet notification
            if (adminUser.walletAddress) {
              toast.success(`Connected to blockchain wallet: ${adminUser.walletAddress.substring(0, 8)}...`);
            }
            
            resolve(true);
            return;
          }
        }
        
        const user = users.find(u => u.email === email && u.userType === userType);
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
          localStorage.setItem('currentUser', JSON.stringify(user));
          
          // Show blockchain wallet notification
          if (user.walletAddress) {
            toast.success(`Connected to blockchain wallet: ${user.walletAddress.substring(0, 8)}...`);
          }
          
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };

  const register = async (name: string, email: string, password: string, userType: 'farmer' | 'buyer'): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
          resolve(false);
        } else {
          // Generate a new wallet address for the user
          const walletAddress = generateWalletAddress();
          
          const newUser: User = {
            id: `user-${Date.now()}`,
            name,
            email,
            userType,
            walletAddress
          };
          
          users.push(newUser);
          setCurrentUser(newUser);
          setIsAuthenticated(true);
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          
          // Show blockchain wallet notification
          toast.success(`Created new blockchain wallet: ${walletAddress.substring(0, 8)}...`);
          
          resolve(true);
        }
      }, 800);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const productId = `product-${Date.now()}`;
    
    // Create blockchain transaction for the product listing
    let blockchainId: string | undefined;
    try {
      if (currentUser?.walletAddress) {
        blockchainId = blockchainService.createProductTransaction(
          currentUser.walletAddress,
          productId
        );
        
        toast.success(`Product recorded on blockchain with hash: ${blockchainId.substring(0, 10)}...`);
      }
    } catch (error) {
      console.error("Blockchain transaction failed:", error);
      toast.error("Blockchain verification failed. Please try again.");
    }
    
    const newProduct: Product = {
      ...product,
      id: productId,
      bids: [],
      blockchainId,
      minBidIncrement: product.minBidIncrement || 5, // Default 5% if not specified
      minBidAmount: product.minBidAmount || product.startingPrice,
      maxBidAmount: product.maxBidAmount
    };
    
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const isAdmin = (): boolean => {
    return currentUser?.userType === 'admin';
  };
  
  const updateUserProfile = (user: User): void => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    const updatedUsers = users.map(u => 
      u.id === user.id ? user : u
    );
  };
  
  // Blockchain specific functions
  const getWalletBalance = (userId: string): number => {
    const user = users.find(u => u.id === userId);
    if (!user || !user.walletAddress) return 0;
    
    return blockchainService.getWalletBalance(user.walletAddress);
  };
  
  const getBlockchainTransactionDetails = (hash: string): BlockchainTransaction | undefined => {
    return blockchainService.getTransaction(hash);
  };
  
  const getBlockchainStats = () => {
    return blockchainService.getBlockchainStats();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        currentUser,
        isAuthenticated,
        currency,
        selectedProduct,
        setSelectedProduct,
        addBid,
        getHighestBidForProduct,
        getUserBids,
        isHighestBidder,
        login,
        register,
        logout,
        addProduct,
        isAdmin,
        updateUserProfile,
        getWalletBalance,
        getBlockchainTransactionDetails,
        getBlockchainStats
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
