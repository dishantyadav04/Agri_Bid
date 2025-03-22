
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Package, Users, Briefcase, ArrowUpRight, Ban, Check, X } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { products, currentUser, isAdmin } = useProducts();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Redirect if not logged in as admin
  useEffect(() => {
    if (!currentUser || !isAdmin()) {
      navigate('/login');
    }
  }, [currentUser, isAdmin, navigate]);
  
  if (!currentUser || !isAdmin()) {
    return null;
  }
  
  // Sample data for dashboard
  const categoryData = Object.entries(
    products.reduce((acc: Record<string, number>, product) => {
      const category = product.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));
  
  const bidData = products
    .filter(product => product.bids && product.bids.length > 0)
    .slice(0, 5)
    .map(product => ({
      name: product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name,
      bids: product.bids ? product.bids.length : 0
    }));
    
  const COLORS = ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0'];
  
  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      change: '+12%',
      positive: true
    },
    {
      title: 'Active Auctions',
      value: products.filter(p => p.auctionEndTime && new Date(p.auctionEndTime) > new Date()).length,
      icon: Briefcase,
      change: '+5%',
      positive: true
    },
    {
      title: 'Total Bids',
      value: products.reduce((acc, product) => acc + (product.bids ? product.bids.length : 0), 0),
      icon: Users,
      change: '+18%',
      positive: true
    }
  ];
  
  // Sample data for products and user tabs
  const sampleFlaggedProducts = products.slice(0, 3).map(product => ({
    ...product,
    reason: 'Price manipulation'
  }));
  
  const sampleUsers = [
    { id: 'user1', name: 'John Doe', email: 'john@example.com', userType: 'buyer', status: 'active' },
    { id: 'user2', name: 'Jane Smith', email: 'jane@example.com', userType: 'farmer', status: 'active' },
    { id: 'user3', name: 'Bob Johnson', email: 'bob@example.com', userType: 'buyer', status: 'suspended' }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700">Admin Panel</CardTitle>
          <CardDescription>
            Manage products, users, and view auction statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.title}</p>
                          <p className="text-3xl font-bold mt-1">{stat.value}</p>
                          <div className="flex items-center mt-2">
                            <span 
                              className={`text-xs flex items-center ${stat.positive ? 'text-green-600' : 'text-red-600'}`}
                            >
                              {stat.positive ? 
                                <ArrowUpRight size={14} className="mr-1" /> : 
                                <ArrowUpRight size={14} className="mr-1 transform rotate-90" />
                              }
                              {stat.change}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">vs last month</span>
                          </div>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                          <stat.icon size={20} className="text-green-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Products by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Products with Most Bids</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={bidData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 50,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" angle={-45} textAnchor="end" height={50} />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="bids" fill="#16a34a" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="products" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Flagged Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 bg-muted p-4 font-medium">
                      <div className="col-span-5">Product</div>
                      <div className="col-span-2">Category</div>
                      <div className="col-span-3">Reason</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                    {sampleFlaggedProducts.map((product) => (
                      <div 
                        key={product.id} 
                        className="grid grid-cols-12 p-4 border-t items-center text-sm"
                      >
                        <div className="col-span-5 flex items-center">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-10 h-10 object-cover rounded mr-3" 
                          />
                          <span className="font-medium">{product.name}</span>
                        </div>
                        <div className="col-span-2">{product.category}</div>
                        <div className="col-span-3 text-red-600">{product.reason}</div>
                        <div className="col-span-2 flex space-x-2">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Check size={16} className="text-green-600" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Ban size={16} className="text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">All Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 bg-muted p-4 font-medium">
                      <div className="col-span-6">Product</div>
                      <div className="col-span-2">Category</div>
                      <div className="col-span-2">Price</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                    {products.slice(0, 5).map((product) => (
                      <div 
                        key={product.id} 
                        className="grid grid-cols-12 p-4 border-t items-center text-sm"
                      >
                        <div className="col-span-6 flex items-center">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-10 h-10 object-cover rounded mr-3" 
                          />
                          <span className="font-medium">{product.name}</span>
                        </div>
                        <div className="col-span-2">{product.category}</div>
                        <div className="col-span-2">₹{product.currentPrice}</div>
                        <div className="col-span-2 flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0"
                            onClick={() => navigate(`/product/${product.id}`)}
                          >
                            <ArrowUpRight size={16} className="text-green-600" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <X size={16} className="text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">All Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 bg-muted p-4 font-medium">
                      <div className="col-span-4">Name</div>
                      <div className="col-span-4">Email</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                    {sampleUsers.map((user) => (
                      <div 
                        key={user.id} 
                        className="grid grid-cols-12 p-4 border-t items-center text-sm"
                      >
                        <div className="col-span-4 flex items-center">
                          <div className="bg-green-100 rounded-full p-2 mr-3">
                            <Users size={16} className="text-green-700" />
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                        <div className="col-span-4">{user.email}</div>
                        <div className="col-span-2 capitalize">{user.userType}</div>
                        <div className="col-span-2 flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0"
                          >
                            <ArrowUpRight size={16} className="text-green-600" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0"
                            disabled={user.status === 'suspended'}
                          >
                            <Ban size={16} className="text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
