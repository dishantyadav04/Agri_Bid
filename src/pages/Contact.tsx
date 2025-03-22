
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Your message has been sent. We will get back to you soon!');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-2 text-center">Contact Us</h1>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        Have questions or feedback? We'd love to hear from you! Fill out the form below or use our contact information to get in touch.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-700">Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and our team will get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message here..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-700">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-3">
                <Mail className="text-green-600 mt-0.5" size={20} />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:info@agribid.com" className="text-green-600 hover:underline">
                    info@agribid.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="text-green-600 mt-0.5" size={20} />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+911234567890" className="text-green-600 hover:underline">
                    +91 1234567890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="text-green-600 mt-0.5" size={20} />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">
                    123 Agri Lane, Farmville<br />
                    New Delhi, India 110001
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="font-medium mb-3">Office Hours</p>
                <div className="text-sm text-muted-foreground">
                  <p className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-700">Follow Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Stay updated with our latest news and announcements by following us on social media.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((platform) => (
                  <Button key={platform} variant="outline" className="text-green-700 border-green-600 hover:bg-green-100">
                    {platform}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
