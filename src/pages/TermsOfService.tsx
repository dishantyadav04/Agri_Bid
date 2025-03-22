
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">Terms of Service</h1>
      
      <Card className="max-w-4xl mx-auto">
        <CardContent className="pt-6 prose prose-green max-w-none">
          <p className="text-sm text-muted-foreground mb-6">
            Last Updated: June 1, 2023
          </p>
          
          <p>
            Please read these Terms of Service ("Terms") carefully before using the AgriBid website and service operated by AgriBid.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">2. Description of Service</h2>
          <p>
            AgriBid provides an online marketplace that connects farmers with buyers through an auction-based system for agricultural products.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          <p>
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">4. Auctions and Bidding</h2>
          <p>
            By placing a bid, you are making a binding offer to purchase the item at the bid price. If you are the winning bidder at the end of an auction, you are obligated to complete the purchase.
          </p>
          <p>
            Sellers must accurately describe their products and fulfill orders for successful auctions in a timely manner.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">5. Fees and Payment</h2>
          <p>
            AgriBid may charge fees for certain services. All fees are non-refundable. You agree to provide current, complete, and accurate purchase and account information for all purchases made on our platform.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">6. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of AgriBid and its licensors.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">7. Limitation of Liability</h2>
          <p>
            In no event shall AgriBid, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">8. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">9. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at info@agribid.com.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;
