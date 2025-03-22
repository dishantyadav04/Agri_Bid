
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">Terms of Service</h1>
      
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
                  Welcome to AgriBid ("we", "our", or "us"). By accessing or using our website and services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">2. Eligibility</h2>
                <p className="text-muted-foreground mb-2">
                  To use our services, you must be at least 18 years old and capable of forming a binding contract. If you are accessing our services on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">3. Account Registration</h2>
                <p className="text-muted-foreground mb-2">
                  To access certain features of our platform, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                <p className="text-muted-foreground mb-2">
                  You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">4. User Conduct</h2>
                <p className="text-muted-foreground mb-2">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-2 space-y-1">
                  <li>Use our services for any illegal purpose or in violation of any local, state, national, or international law</li>
                  <li>Violate or infringe other people's intellectual property, privacy, publicity, or other legal rights</li>
                  <li>Use our services to transmit any material that is defamatory, offensive, or otherwise objectionable</li>
                  <li>Interfere with or disrupt the integrity or performance of our services</li>
                  <li>Attempt to gain unauthorized access to our services, other accounts, or computer systems</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">5. Listing and Bidding</h2>
                <p className="text-muted-foreground mb-2">
                  Sellers are responsible for the accuracy and completeness of their listings. All products must comply with applicable laws and regulations.
                </p>
                <p className="text-muted-foreground mb-2">
                  Buyers are bound by their bids. Once a bid is placed, it constitutes a legally binding offer to purchase the item at the bid price.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">6. Fees and Payments</h2>
                <p className="text-muted-foreground mb-2">
                  We charge a commission on successful transactions. Payment processing is handled securely through our platform. Funds are released to sellers after successful delivery confirmation.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">7. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground mb-2">
                  Our services are provided "as is" and "as available" without any warranties of any kind, either express or implied.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">8. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-2">
                  In no event shall AgriBid be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our services.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">9. Changes to Terms</h2>
                <p className="text-muted-foreground mb-2">
                  We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms on our website. Your continued use of our services after such notice constitutes your acceptance of the new Terms.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">10. Contact Us</h2>
                <p className="text-muted-foreground mb-2">
                  If you have any questions about these Terms, please contact us at legal@agribid.com.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
