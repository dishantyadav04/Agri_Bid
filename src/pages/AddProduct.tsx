
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar, Clock, BadgePercent, ArrowUp, ArrowDown } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, addHours, addDays, setHours, setMinutes, isSameDay } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AddProduct: React.FC = () => {
  const { addProduct, currentUser, isAuthenticated, currency } = useProducts();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [startingPrice, setStartingPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [auctionEndDate, setAuctionEndDate] = useState<Date | undefined>(addDays(new Date(), 7));
  const [auctionEndHour, setAuctionEndHour] = useState<string>("12");
  const [auctionEndMinute, setAuctionEndMinute] = useState<string>("00");
  const [auctionEndAmPm, setAuctionEndAmPm] = useState<string>("PM");
  const [isLoading, setIsLoading] = useState(false);
  
  // New state variables for bid settings
  const [minBidIncrement, setMinBidIncrement] = useState<number>(5);
  const [minBidAmount, setMinBidAmount] = useState<number | undefined>(undefined);
  const [maxBidAmount, setMaxBidAmount] = useState<number | undefined>(undefined);
  
  // Generate hours for select
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  // Generate minutes for select
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  
  // Redirect if not logged in as a farmer
  React.useEffect(() => {
    if (!isAuthenticated || currentUser?.userType !== 'farmer') {
      toast.error('Only farmers can add products');
      navigate('/');
    }
  }, [isAuthenticated, currentUser, navigate]);

  const getFinalAuctionEndTime = (): Date | undefined => {
    if (!auctionEndDate) return undefined;
    
    const endDate = new Date(auctionEndDate);
    let hour = parseInt(auctionEndHour, 10);
    
    // Convert to 24-hour format
    if (auctionEndAmPm === "PM" && hour < 12) {
      hour += 12;
    } else if (auctionEndAmPm === "AM" && hour === 12) {
      hour = 0;
    }
    
    const minute = parseInt(auctionEndMinute, 10);
    
    return setMinutes(setHours(endDate, hour), minute);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !imageUrl || !startingPrice || !quantity || !category || !location || !auctionEndDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const finalEndTime = getFinalAuctionEndTime();
    
    // Validate auction end date is in the future
    if (finalEndTime && finalEndTime <= new Date()) {
      toast.error('Auction end time must be in the future');
      return;
    }
    
    // Validate bid settings
    if (minBidAmount !== undefined && minBidAmount < startingPrice) {
      toast.error('Minimum bid amount cannot be less than starting price');
      return;
    }
    
    if (maxBidAmount !== undefined && maxBidAmount <= startingPrice) {
      toast.error('Maximum bid amount must be greater than starting price');
      return;
    }
    
    if (minBidAmount !== undefined && maxBidAmount !== undefined && minBidAmount >= maxBidAmount) {
      toast.error('Minimum bid amount must be less than maximum bid amount');
      return;
    }
    
    setIsLoading(true);
    
    try {
      addProduct({
        name,
        description,
        imageUrl,
        startingPrice,
        currentPrice: startingPrice,
        quantity,
        category,
        location,
        seller: currentUser?.name || 'Unknown Seller',
        auctionEndTime: finalEndTime,
        minBidIncrement, // Add bid increment
        minBidAmount, // Add minimum bid amount
        maxBidAmount, // Add maximum bid amount
      });
      
      toast.success('Product added successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Error adding product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Current time for validation
  const now = new Date();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700">Add New Product</CardTitle>
          <CardDescription>
            List your agricultural products for buyers to bid on
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name*</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="imageUrl">Image URL*</Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Provide a direct link to an image of your product
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startingPrice">Starting Price ({currency})*</Label>
                  <Input
                    id="startingPrice"
                    type="number"
                    min={1}
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(Number(e.target.value))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="quantity">Quantity*</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category*</Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Fruits, Vegetables, Dairy"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location*</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Mumbai, Delhi"
                    required
                  />
                </div>
              </div>
              
              {/* New Bid Settings Section */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                  <BadgePercent size={18} className="text-green-600" />
                  Bid Settings
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="minBidIncrement" className="flex items-center gap-2">
                      <ArrowUp size={16} className="text-green-600" />
                      Minimum Bid Increment (%)*
                    </Label>
                    <Input
                      id="minBidIncrement"
                      type="number"
                      min={1}
                      max={100}
                      value={minBidIncrement}
                      onChange={(e) => setMinBidIncrement(Number(e.target.value))}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      New bids must be at least this percentage higher than the current highest bid
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minBidAmount" className="flex items-center gap-2">
                        <ArrowDown size={16} className="text-amber-600" />
                        Minimum Bid Amount ({currency})
                      </Label>
                      <Input
                        id="minBidAmount"
                        type="number"
                        min={startingPrice}
                        value={minBidAmount === undefined ? '' : minBidAmount}
                        onChange={(e) => setMinBidAmount(e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="Optional"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Minimum allowed bid (defaults to starting price)
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="maxBidAmount" className="flex items-center gap-2">
                        <ArrowUp size={16} className="text-red-600" />
                        Maximum Bid Amount ({currency})
                      </Label>
                      <Input
                        id="maxBidAmount"
                        type="number"
                        min={startingPrice > 0 ? startingPrice * 1.1 : 1}
                        value={maxBidAmount === undefined ? '' : maxBidAmount}
                        onChange={(e) => setMaxBidAmount(e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="Optional"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Maximum allowed bid (leave empty for no limit)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="auctionEndDate">Auction End Date & Time*</Label>
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {auctionEndDate ? format(auctionEndDate, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={auctionEndDate}
                          onSelect={setAuctionEndDate}
                          initialFocus
                          disabled={(date) => {
                            // Allow today's date, but disable past dates
                            return date < new Date(now.setHours(0, 0, 0, 0));
                          }}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="flex flex-1 space-x-2 items-center">
                    <Select value={auctionEndHour} onValueChange={setAuctionEndHour}>
                      <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                      <SelectContent>
                        {hours.map((hour) => (
                          <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <span>:</span>
                    
                    <Select value={auctionEndMinute} onValueChange={setAuctionEndMinute}>
                      <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="Min" />
                      </SelectTrigger>
                      <SelectContent>
                        {minutes.map((minute) => (
                          <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={auctionEndAmPm} onValueChange={setAuctionEndAmPm}>
                      <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="AM/PM" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {isSameDay(new Date(), auctionEndDate || new Date()) ? 
                    "For same-day auctions, ensure the end time is in the future." : 
                    "This is when the auction will end. The highest bidder at this time will win."}
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Adding Product...' : 'Add Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
