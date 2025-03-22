
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const RefundPolicy: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">Refund Policy</h1>
      
      <Card className="max-w-4xl mx-auto">
        <CardContent className="pt-6 prose prose-green max-w-none">
          <p className="text-sm text-muted-foreground mb-6">
            Last Updated: June 1, 2023
          </p>
          
          <p>
            This Refund Policy outlines our guidelines for refunds on the AgriBid platform. We aim to ensure fair treatment for both buyers and sellers in all transactions.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">1. Auction Bids</h2>
          <p>
            By placing a bid on our platform, you are entering into a binding commitment to purchase the item if you are the winning bidder. Bids cannot be retracted once placed except under the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Clear error in product description by the seller</li>
            <li>Technical malfunction of the AgriBid platform</li>
            <li>Fraudulent activity identified</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">2. Buyer Refund Eligibility</h2>
          <p>
            As a buyer, you may be eligible for a refund in the following situations:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Product received significantly differs from the description</li>
            <li>Product is damaged upon receipt</li>
            <li>Product is not delivered within the agreed timeframe</li>
            <li>Product quantity is less than purchased</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">3. Refund Process</h2>
          <p>
            To request a refund, please follow these steps:
          </p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Contact the seller directly through our messaging system within 48 hours of receiving the product</li>
            <li>If no resolution is reached with the seller within 72 hours, submit a formal refund request through your account dashboard</li>
            <li>Provide clear evidence supporting your refund request (photos, videos, etc.)</li>
            <li>Our team will review your request within 5 business days</li>
          </ol>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">4. Platform Fees</h2>
          <p>
            Platform fees charged by AgriBid are generally non-refundable, except in cases where:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>A transaction was not completed due to platform technical issues</li>
            <li>The fee was charged in error</li>
            <li>A transaction is canceled due to seller non-compliance with our terms</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">5. Payment Processing</h2>
          <p>
            Refunds will be processed through the original payment method used for the transaction. Please allow 5-10 business days for the refund to be credited to your account after approval.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">6. Seller Obligations</h2>
          <p>
            Sellers are required to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Accurately describe all products listed on the platform</li>
            <li>Ship products in appropriate packaging to prevent damage</li>
            <li>Process approved refunds promptly</li>
            <li>Maintain clear communication with buyers regarding any issues</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">7. Disputes</h2>
          <p>
            In case of disputes between buyers and sellers regarding refunds, AgriBid will:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Review all evidence provided by both parties</li>
            <li>Make a determination based on our policies and the specific circumstances</li>
            <li>Issue a final decision that both parties must abide by</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">8. Changes to this Policy</h2>
          <p>
            We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to our website.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">9. Contact Us</h2>
          <p>
            If you have any questions about our Refund Policy, please contact our customer support team at support@agribid.com.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RefundPolicy;
