
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">Privacy Policy</h1>
      
      <Card className="max-w-4xl mx-auto">
        <CardContent className="pt-6 prose prose-green max-w-none">
          <p className="text-sm text-muted-foreground mb-6">
            Last Updated: June 1, 2023
          </p>
          
          <p>
            At AgriBid, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website or services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, such as when you create an account, place bids, list products, or contact us. This may include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Personal identifiers (name, email address, phone number)</li>
            <li>Account credentials</li>
            <li>Transaction information</li>
            <li>Communication content</li>
            <li>Farm or business details</li>
          </ul>
          <p>
            We also automatically collect certain information when you use our Service, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Log data (IP address, browser type, pages visited)</li>
            <li>Device information</li>
            <li>Location data</li>
            <li>Cookie and tracking technology data</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, maintain, and improve our Service</li>
            <li>Process transactions and send related information</li>
            <li>Communicate with you about products, services, and events</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            <li>Personalize and improve your experience</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">3. Sharing of Information</h2>
          <p>
            We may share your information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>With other users to facilitate transactions (e.g., connecting buyers and sellers)</li>
            <li>With vendors, consultants, and service providers who need access to such information to carry out work on our behalf</li>
            <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process</li>
            <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of AgriBid or others</li>
            <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company</li>
            <li>With your consent or at your direction</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">4. Data Security</h2>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">5. Your Choices</h2>
          <p>
            Account Information: You may update, correct, or delete your account information at any time by logging into your account or contacting us.
          </p>
          <p>
            Cookies: Most web browsers are set to accept cookies by default. You can usually set your browser to remove or reject browser cookies.
          </p>
          <p>
            Promotional Communications: You may opt out of receiving promotional messages from us by following the instructions in those messages.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">6. Children's Privacy</h2>
          <p>
            Our Service is not directed to children under 16. We do not knowingly collect personal information from children under 16. If we learn we have collected personal information of a child under 16, we will delete that information.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">7. Changes to this Privacy Policy</h2>
          <p>
            We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@agribid.com.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
