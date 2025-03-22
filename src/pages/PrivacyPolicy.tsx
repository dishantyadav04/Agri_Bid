
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">Privacy Policy</h1>
      
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
                  AgriBid ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">2. Information We Collect</h2>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <p className="text-muted-foreground mb-4">
                  We may collect personal information that you provide to us, such as:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
                  <li>Name, email address, phone number, and address</li>
                  <li>Payment information</li>
                  <li>Farm details (for farmers) or business details (for buyers)</li>
                  <li>Profile information, including profile pictures</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Usage Information</h3>
                <p className="text-muted-foreground mb-4">
                  We automatically collect certain information about your device and how you interact with our services, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-2 space-y-1">
                  <li>IP address and browser information</li>
                  <li>Pages visited and activities on our platform</li>
                  <li>Device information and operating system</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">3. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-2">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, prevent, and address fraud and other illegal activities</li>
                  <li>Personalize your experience on our platform</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">4. Information Sharing</h2>
                <p className="text-muted-foreground mb-2">
                  We may share your information with:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
                  <li>Other users as necessary for transactions (e.g., sharing contact information between buyers and sellers)</li>
                  <li>Service providers who perform services on our behalf</li>
                  <li>Legal authorities when required by law or to protect our rights</li>
                </ul>
                <p className="text-muted-foreground mb-2">
                  We will not sell your personal information to third parties.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">5. Data Security</h2>
                <p className="text-muted-foreground mb-2">
                  We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">6. Your Rights</h2>
                <p className="text-muted-foreground mb-2">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-2 space-y-1">
                  <li>The right to access and receive a copy of your personal information</li>
                  <li>The right to rectify or update your personal information</li>
                  <li>The right to delete your personal information</li>
                  <li>The right to restrict or object to our processing of your personal information</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">7. Cookies and Similar Technologies</h2>
                <p className="text-muted-foreground mb-2">
                  We use cookies and similar technologies to collect information and improve your experience. You can manage your cookie preferences through your browser settings.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">8. Children's Privacy</h2>
                <p className="text-muted-foreground mb-2">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">9. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground mb-2">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-green-700">10. Contact Us</h2>
                <p className="text-muted-foreground mb-2">
                  If you have any questions about this Privacy Policy, please contact us at privacy@agribid.com.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
