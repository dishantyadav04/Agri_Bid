
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you soon!",
      variant: "default",
    });
    // Clear form
    (e.target as HTMLFormElement).reset();
  };
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">Contact Us</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto text-center mb-16">
        Have questions or feedback? We're here to help. Reach out to our team using the contact form below or through any of our contact channels.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center">
              <MapPin className="text-green-700" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Our Location</h3>
            <p className="text-muted-foreground mb-2">123 Agri Lane</p>
            <p className="text-muted-foreground">Farmville, India 400001</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Clock className="text-green-700" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
            <p className="text-muted-foreground mb-2">Monday - Friday: 9AM - 6PM</p>
            <p className="text-muted-foreground">Saturday: 10AM - 4PM</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Phone className="text-green-700" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Contact</h3>
            <p className="text-muted-foreground mb-2">Phone: +91 1234567890</p>
            <p className="text-muted-foreground">Email: info@agribid.com</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-6 text-green-700">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <Input id="name" placeholder="Your full name" required />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input id="subject" placeholder="What is this regarding?" required />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Your message here..." 
                  className="h-32" 
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4 text-green-700">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">How do I register as a farmer?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can register by clicking on the "Register" button and selecting "Farmer" as your account type.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">How does the bidding process work?</h3>
                  <p className="text-sm text-muted-foreground">
                    Buyers can place bids on products listed by farmers. The highest bid at the end of the auction period wins.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Is there a fee for using AgriBid?</h3>
                  <p className="text-sm text-muted-foreground">
                    There is a small commission fee on successful transactions. Registration and listing products is free.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">How is payment processed?</h3>
                  <p className="text-sm text-muted-foreground">
                    We offer secure online payments through our platform, with funds released to farmers after successful delivery.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 text-green-700">Join Our Newsletter</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Stay updated with the latest news, product listings, and agricultural insights.
              </p>
              <div className="flex space-x-2">
                <Input placeholder="your@email.com" />
                <Button className="bg-green-600 hover:bg-green-700">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
