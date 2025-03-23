
import { BlockchainTransaction, Block } from '@/types';

// Simple hash function for demonstration
const generateHash = (data: string): string => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(64, '0');
};

// Generate random wallet address
export const generateWalletAddress = (): string => {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
};

// Simplified blockchain implementation
class Blockchain {
  chain: Block[];
  pendingTransactions: BlockchainTransaction[];
  difficulty: number;
  miningReward: number;
  
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
    this.difficulty = 2;
    this.miningReward = 100;
  }
  
  createGenesisBlock(): Block {
    return {
      blockNumber: 0,
      hash: '0'.repeat(64),
      previousHash: '0'.repeat(64),
      timestamp: new Date(),
      transactions: [],
      nonce: 0
    };
  }
  
  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }
  
  minePendingTransactions(miningRewardAddress: string): void {
    // Add mining reward
    this.pendingTransactions.push({
      hash: generateHash(Date.now().toString() + miningRewardAddress),
      from: '0x0000000000000000000000000000000000000000',
      to: miningRewardAddress,
      amount: this.miningReward,
      timestamp: new Date(),
      status: 'confirmed',
      type: 'other',
      details: 'Mining reward'
    });
    
    const block = {
      blockNumber: this.chain.length,
      previousHash: this.getLatestBlock().hash,
      timestamp: new Date(),
      transactions: [...this.pendingTransactions],
      nonce: 0,
      hash: ''
    };
    
    // Simplified proof of work
    let hash = '';
    while (!hash.startsWith('0'.repeat(this.difficulty))) {
      block.nonce++;
      const blockData = JSON.stringify(block);
      hash = generateHash(blockData);
    }
    
    block.hash = hash;
    
    this.chain.push(block);
    this.pendingTransactions = [];
    
    console.log('Block mined:', block);
    return;
  }
  
  addTransaction(transaction: Omit<BlockchainTransaction, 'hash'>): string {
    const newTransaction: BlockchainTransaction = {
      ...transaction,
      hash: generateHash(JSON.stringify(transaction) + Date.now())
    };
    
    this.pendingTransactions.push(newTransaction);
    
    // Simplified approach: automatically mine block after 2 transactions
    if (this.pendingTransactions.length >= 2) {
      setTimeout(() => {
        this.minePendingTransactions(generateWalletAddress());
      }, 1000);
    }
    
    return newTransaction.hash;
  }
  
  getTransaction(hash: string): BlockchainTransaction | undefined {
    // Check pending transactions
    const pendingTx = this.pendingTransactions.find(tx => tx.hash === hash);
    if (pendingTx) return pendingTx;
    
    // Check transactions in blocks
    for (const block of this.chain) {
      const tx = block.transactions.find(tx => tx.hash === hash);
      if (tx) return tx;
    }
    
    return undefined;
  }
  
  getBalanceOfAddress(address: string): number {
    let balance = 0;
    
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.from === address) {
          balance -= trans.amount;
        }
        
        if (trans.to === address) {
          balance += trans.amount;
        }
      }
    }
    
    return balance;
  }
  
  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      
      // Validate hash
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
      
      // Validate block hash
      const blockData = { ...currentBlock, hash: '' };
      if (generateHash(JSON.stringify(blockData)) !== currentBlock.hash) {
        return false;
      }
    }
    
    return true;
  }
}

// Create singleton instance
const blockchain = new Blockchain();

// Public API for the blockchain
export const blockchainService = {
  // Create a transaction for a new bid
  createBidTransaction: (fromAddress: string, toAddress: string, amount: number, productId: string): string => {
    return blockchain.addTransaction({
      from: fromAddress,
      to: toAddress,
      amount,
      timestamp: new Date(),
      status: 'pending',
      type: 'bid',
      details: `Bid on product ${productId}`
    });
  },
  
  // Create a transaction for a new product listing
  createProductTransaction: (sellerAddress: string, productId: string): string => {
    return blockchain.addTransaction({
      from: sellerAddress,
      to: '0x0000000000000000000000000000000000000000', // Platform address
      amount: 0,
      timestamp: new Date(),
      status: 'pending',
      type: 'product',
      details: `Listed product ${productId}`
    });
  },
  
  // Create a payment transaction
  createPaymentTransaction: (buyerAddress: string, sellerAddress: string, amount: number, productId: string): string => {
    return blockchain.addTransaction({
      from: buyerAddress,
      to: sellerAddress,
      amount,
      timestamp: new Date(),
      status: 'pending',
      type: 'payment',
      details: `Payment for product ${productId}`
    });
  },
  
  // Get transaction details
  getTransaction: (hash: string): BlockchainTransaction | undefined => {
    return blockchain.getTransaction(hash);
  },
  
  // Get wallet balance
  getWalletBalance: (address: string): number => {
    return blockchain.getBalanceOfAddress(address);
  },
  
  // Get blockchain stats
  getBlockchainStats: () => {
    return {
      blocks: blockchain.chain.length,
      pendingTransactions: blockchain.pendingTransactions.length,
      isValid: blockchain.isChainValid(),
      latestBlock: blockchain.getLatestBlock()
    };
  },
  
  // For demo/testing purposes
  _getFullChain: () => blockchain.chain
};

