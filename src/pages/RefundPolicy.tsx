
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const RefundPolicy: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">Refund Policy</h1>
      
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-6">
              Last updated: June 1, 2023
            </p>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">1. Introduction</h2>
                <p className="text-muted-foreground mb-2">
                  At AgriBid, we strive to ensure fair and transparent transactions between farmers and buyers. This Refund Policy outlines the circumstances under which refunds may be processed on our platform.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">2. Quality Disputes</h2>
                <p className="text-muted-foreground mb-2">
                  If the received products significantly differ from the description provided in the listing, buyers may request a refund within 24 hours of delivery. The request must include clear photographic evidence of the quality discrepancy.
                </p>
                <p className="text-muted-foreground mb-2">
                  Our team will review the evidence and may consult with both parties before making a decision. If the quality dispute is valid, we may issue a full or partial refund depending on the severity of the discrepancy.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">3. Damaged Products</h2>
                <p className="text-muted-foreground mb-2">
                  If products are damaged during transit, buyers should:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-2 space-y-1">
                  <li>Document the damage with photos upon receipt</li>
                  <li>Report the damage within 24 hours of delivery</li>
                  <li>Provide any relevant information about the condition of the packaging</li>
                </ul>
                <p className="text-muted-foreground mb-2">
                  In cases of significant damage affecting the usability of the products, we may issue a full refund. For partial damage, a partial refund may be processed.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">4. Non-Delivery</h2>
                <p className="text-muted-foreground mb-2">
                  If a buyer does not receive the purchased products within the agreed-upon timeframe, they may request a refund. We will investigate the delivery status and may issue a full refund if the products were not delivered.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">5. Cancellation by Seller</h2>
                <p className="text-muted-foreground mb-2">
                  If a seller is unable to fulfill an order after the auction has ended, the buyer will receive a full refund including any transaction fees.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">6. Refund Process</h2>
                <p className="text-muted-foreground mb-2">
                  Refunds will be processed through the original payment method used for the transaction. The time required for the refund to appear in your account depends on your payment provider and may take 5-10 business days.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">7. Platform Fees</h2>
                <p className="text-muted-foreground mb-2">
                  In cases where a full refund is issued, platform fees will also be refunded. For partial refunds, platform fees may be adjusted proportionally.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">8. Dispute Resolution</h2>
                <p className="text-muted-foreground mb-2">
                  If buyers and sellers cannot agree on a resolution, our Dispute Resolution team will review the case and make a final decision. Both parties will be given the opportunity to present their evidence before a decision is made.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">9. Exceptions</h2>
                <p className="text-muted-foreground mb-2">
                  Refunds may not be issued in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-2 space-y-1">
                  <li>Buyer's remorse or change of mind</li>
                  <li>Damage caused by the buyer's improper handling</li>
                  <li>Normal quality variation that is typical for agricultural products</li>
                  <li>Requests made after the 24-hour reporting window</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">10. Contact Us</h2>
                <p className="text-muted-foreground mb-2">
                  If you have any questions about our Refund Policy, please contact our Support team at support@agribid.com.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RefundPolicy;
