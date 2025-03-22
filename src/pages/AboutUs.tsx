
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">About AgriBid</h1>
      
      <div className="max-w-3xl mx-auto mb-16">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              AgriBid was founded with a simple yet powerful mission: to create a fair and transparent marketplace that connects farmers directly with buyers, eliminating middlemen and ensuring farmers receive fair prices for their produce.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              The idea for AgriBid was born out of our founder's experience growing up in a farming community in rural India. He witnessed firsthand the challenges farmers faced in getting fair prices for their crops due to limited market access and the influence of intermediaries.
            </p>
            <p className="text-muted-foreground mb-6">
              Launched in 2023, AgriBid has quickly grown to become a trusted platform for agricultural commerce, empowering thousands of farmers across India and connecting them with buyers who value quality, sustainability, and fair trade practices.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  We believe in complete transparency in all our operations, from auction processes to pricing.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Fairness</h3>
                <p className="text-sm text-muted-foreground">
                  We are committed to ensuring farmers receive fair prices for their produce through our auction system.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
                <p className="text-sm text-muted-foreground">
                  We promote sustainable agricultural practices and prioritize environmentally responsible farming.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Community</h3>
                <p className="text-sm text-muted-foreground">
                  We foster a supportive community of farmers and buyers committed to building a better food system.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-green-700">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Rajesh Patel",
              position: "Founder & CEO",
              bio: "With over 15 years of experience in AgriTech, Rajesh is passionate about improving farmers' livelihoods."
            },
            {
              name: "Priya Sharma",
              position: "Head of Operations",
              bio: "Priya brings extensive experience in supply chain management and is dedicated to creating efficient systems."
            },
            {
              name: "Vivek Gupta",
              position: "Chief Technology Officer",
              bio: "A tech veteran with a background in building scalable marketplaces and auction platforms."
            }
          ].map((member, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="bg-green-100 w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-700">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold text-center mb-1">{member.name}</h3>
                <p className="text-green-600 text-sm text-center mb-3">{member.position}</p>
                <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
