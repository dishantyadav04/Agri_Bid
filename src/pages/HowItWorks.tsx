
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, UserCheck, ShoppingCart, Award, Truck, DollarSign } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-4 text-center">How AgriBid Works</h1>
      <p className="text-muted-foreground max-w-3xl mx-auto text-center mb-16">
        Our platform connects farmers directly with buyers through a transparent 
        and fair auction system. Here's how the process works for both farmers and buyers.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-green-700 flex items-center">
            <UserCheck className="mr-2" /> For Farmers
          </h2>
          
          <div className="space-y-8">
            {[
              {
                title: "Register as a Farmer",
                description: "Create your account and verify your farm details to get started on our platform.",
                icon: UserCheck
              },
              {
                title: "List Your Products",
                description: "Upload details of your produce including photos, quantity, quality, certifications, and set a starting price.",
                icon: ShoppingCart
              },
              {
                title: "Set Auction Parameters",
                description: "Choose your auction duration and any specific requirements for buyers.",
                icon: Award
              },
              {
                title: "Monitor Bids",
                description: "Track all incoming bids in real-time and communicate with interested buyers.",
                icon: DollarSign
              },
              {
                title: "Complete the Sale",
                description: "Once the auction ends, coordinate delivery with the winning bidder and receive payment securely through our platform.",
                icon: Truck
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700">
                      <step.icon size={20} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < 4 && (
                  <div className="absolute left-6 top-12 h-12 w-0.5 bg-green-100" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-green-700 flex items-center">
            <ShoppingCart className="mr-2" /> For Buyers
          </h2>
          
          <div className="space-y-8">
            {[
              {
                title: "Register as a Buyer",
                description: "Create your account with your business details to start participating in auctions.",
                icon: UserCheck
              },
              {
                title: "Browse Available Products",
                description: "Explore our marketplace to find high-quality agricultural products from verified farmers.",
                icon: ShoppingCart
              },
              {
                title: "Place Bids",
                description: "Participate in auctions by placing competitive bids on products you're interested in.",
                icon: Award
              },
              {
                title: "Win Auctions",
                description: "If your bid wins, you'll be notified and can proceed with the purchase.",
                icon: DollarSign
              },
              {
                title: "Receive Your Products",
                description: "Coordinate with the farmer for delivery or pickup and provide feedback after receiving your products.",
                icon: Truck
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700">
                      <step.icon size={20} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < 4 && (
                  <div className="absolute left-6 top-12 h-12 w-0.5 bg-green-100" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-700 text-center">Benefits of AgriBid</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">For Farmers</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Direct access to a wide range of buyers</li>
                  <li>• Higher profits by eliminating middlemen</li>
                  <li>• Transparent price discovery through auctions</li>
                  <li>• Secure payment processing</li>
                  <li>• Build a reputation and loyal customer base</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">For Buyers</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Access to fresh, high-quality produce</li>
                  <li>• Direct relationship with farmers</li>
                  <li>• Transparent information about product origin</li>
                  <li>• Competitive pricing through bidding</li>
                  <li>• Support sustainable and fair agricultural practices</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HowItWorks;
