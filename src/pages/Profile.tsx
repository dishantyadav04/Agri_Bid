
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { User, MapPin, Phone, Mail, Save, Building } from 'lucide-react';

const Profile: React.FC = () => {
  const { currentUser, isAuthenticated, updateUserProfile } = useProducts();
  const navigate = useNavigate();
  
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!currentUser) {
    return null;
  }
  
  const handleSaveProfile = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      updateUserProfile({
        ...currentUser,
        name,
        email,
        phone,
        address
      });
      
      setIsEditing(false);
      setIsLoading(false);
      toast.success('Profile updated successfully');
    }, 800);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mb-4">
                  <User size={48} className="text-green-700" />
                </div>
                
                <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                <p className="text-green-600 capitalize">{currentUser.userType}</p>
                
                <div className="w-full mt-6 space-y-4">
                  <div className="flex items-center text-sm">
                    <Mail size={16} className="text-muted-foreground mr-3" />
                    <span>{currentUser.email}</span>
                  </div>
                  
                  {currentUser.phone && (
                    <div className="flex items-center text-sm">
                      <Phone size={16} className="text-muted-foreground mr-3" />
                      <span>{currentUser.phone}</span>
                    </div>
                  )}
                  
                  {currentUser.address && (
                    <div className="flex items-center text-sm">
                      <MapPin size={16} className="text-muted-foreground mr-3" />
                      <span>{currentUser.address}</span>
                    </div>
                  )}
                </div>
                
                {!isEditing && (
                  <Button 
                    className="mt-6 w-full bg-green-600 hover:bg-green-700"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-muted-foreground"
                  onClick={() => navigate(currentUser.userType === 'farmer' ? '/my-products' : '/my-bids')}
                >
                  {currentUser.userType === 'farmer' ? (
                    <>
                      <Building size={16} className="mr-2" />
                      My Products
                    </>
                  ) : (
                    <>
                      <Building size={16} className="mr-2" />
                      My Bids
                    </>
                  )}
                </Button>
                
                {currentUser.userType === 'farmer' && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-muted-foreground"
                    onClick={() => navigate('/add-product')}
                  >
                    <Building size={16} className="mr-2" />
                    Add New Product
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {isEditing ? 'Edit Profile' : 'Profile Details'}
                </CardTitle>
                <CardDescription>
                  {isEditing 
                    ? 'Update your personal information' 
                    : 'Your personal information and account details'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Add your phone number"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Add your address"
                      />
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Account Type</h3>
                      <p className="capitalize">{currentUser.userType}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                      <p>{currentUser.name}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Email Address</h3>
                      <p>{currentUser.email}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
                      <p>{currentUser.phone || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Address</h3>
                      <p>{currentUser.address || 'Not provided'}</p>
                    </div>
                  </div>
                )}
              </CardContent>
              {isEditing && (
                <CardFooter className="flex justify-end space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsEditing(false);
                      setName(currentUser.name || '');
                      setEmail(currentUser.email || '');
                      setPhone(currentUser.phone || '');
                      setAddress(currentUser.address || '');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSaveProfile}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      'Saving...'
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
