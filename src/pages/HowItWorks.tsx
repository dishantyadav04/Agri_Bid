import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Gavel, Truck, CreditCard, Clock } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "Farmers List Products",
      description: "Farmers create listings for their agricultural products, specifying details like quantity, quality, and starting price.",
      icon: Package
    },
    {
      title: "Buyers Place Bids",
      description: "Buyers browse listings and place competitive bids on products they're interested in purchasing.",
      icon: Gavel
    },
    {
      title: "Auction Ends",
      description: "When the auction time frame ends, the highest bidder wins the right to purchase the products.",
      icon: Clock
    },
    {
      title: "Secure Payment",
      description: "The winning buyer completes payment through our secure payment system.",
      icon: CreditCard
    },
    {
      title: "Product Delivery",
      description: "After payment confirmation, arrangements are made for product delivery or pickup.",
      icon: Truck
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">How AgriBid Works</h1>
      
      <div className="max-w-3xl mx-auto mb-16">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-8 text-center text-lg">
              AgriBid connects farmers directly with buyers through a simple, transparent auction process that ensures fair prices and eliminates middlemen.
            </p>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="bg-green-100 rounded-full p-4 flex-shrink-0">
                    <step.icon size={24} className="text-green-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                      <span className="bg-green-100 text-green-700 w-7 h-7 rounded-full inline-flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="max-w-5xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center text-green-700">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "How do I register as a farmer?",
              answer: "Simply click on the 'Register' button, select 'Farmer' as your account type, and complete the registration form with your details."
            },
            {
              question: "How long do auctions typically last?",
              answer: "Auction durations are set by farmers when they list their products. Typically, auctions run from 3-7 days to allow sufficient time for buyer participation."
            },
            {
              question: "Is there a minimum bid amount?",
              answer: "Yes, bids must be at least equal to the starting price set by the farmer. Subsequent bids must exceed the current highest bid."
            },
            {
              question: "How is product quality assured?",
              answer: "Farmers provide detailed descriptions and certifications (where applicable). We also have a rating system that helps buyers make informed decisions."
            },
            {
              question: "What payment methods are accepted?",
              answer: "We currently support major credit/debit cards and bank transfers. All payments are processed securely through our platform."
            },
            {
              question: "How is delivery handled?",
              answer: "After successful payment, buyers and farmers can arrange delivery directly. We provide communication tools to facilitate this process."
            }
          ].map((faq, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2 text-green-700">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
