import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { uploadToCloudinary, uploadMultipleToCloudinary } from '../../utils/cloudinaryUploader';
import { 
  FiLogOut, FiPlus, FiEdit, FiTrash2, FiCheck, FiPackage, FiGrid, FiMessageSquare, 
  FiDollarSign, FiActivity, FiEye, FiSearch, FiHome, FiMenu, FiX, FiTrendingUp, 
  FiTrendingDown, FiDownload, FiShoppingCart, FiUsers, FiClock, FiStar, FiZap,
  FiBarChart2, FiPieChart, FiRefreshCw
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [contactRequests, setContactRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filterCondition, setFilterCondition] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();

  // Stats state
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalMessages: 0,
    totalRevenue: 0,
    newProducts: 0,
    usedProducts: 0,
    discountProducts: 0
  });

  // Product form state
  const [productForm, setProductForm] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    original_price: '', // NEW: Original price before discount
    category_id: '',
    condition: 'new'
  });
  const [productImages, setProductImages] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);

  // Category form state
  const [categoryForm, setCategoryForm] = useState({ id: null, name: '', icon: '', image_url: '' });
  const [categoryImage, setCategoryImage] = useState(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  useEffect(() => {
    fetchData();
    fetchCategories(); // Always fetch categories for the product form dropdown
  }, [activeTab]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchData = () => {
    if (activeTab === 'products') fetchProducts();
    if (activeTab === 'categories') fetchCategories();
    if (activeTab === 'messages') fetchContactRequests();
  };

  const fetchStats = async () => {
    const { data: productsData } = await supabase.from('products').select('*');
    const { data: categoriesData } = await supabase.from('categories').select('*');
    const { data: messagesData } = await supabase.from('contact_requests').select('*');

    const newCount = productsData?.filter(p => p.condition === 'new').length || 0;
    const usedCount = productsData?.filter(p => p.condition === 'used').length || 0;
    const discountCount = productsData?.filter(p => p.condition === 'discount').length || 0;
    const totalRevenue = productsData?.reduce((sum, p) => sum + (p.price || 0), 0) || 0;

    setStats({
      totalProducts: productsData?.length || 0,
      totalCategories: categoriesData?.length || 0,
      totalMessages: messagesData?.length || 0,
      totalRevenue: totalRevenue,
      newProducts: newCount,
      usedProducts: usedCount,
      discountProducts: discountCount
    });
  };

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select(`*, categories(name), product_images(*)`)
      .order('created_at', { ascending: false });
    setProducts(data || []);
  };

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    setCategories(data || []);
  };

  const fetchContactRequests = async () => {
    const { data } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false });
    setContactRequests(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  // Product handlers
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrls = [];
      if (productImages.length > 0) {
        imageUrls = await uploadMultipleToCloudinary(productImages);
      }

      const productData = {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        original_price: productForm.original_price ? parseFloat(productForm.original_price) : null, // NEW
        category_id: productForm.category_id,
        condition: productForm.condition
      };

      let productId = productForm.id;

      if (productId) {
        await supabase.from('products').update(productData).eq('id', productId);
      } else {
        const { data, error } = await supabase.from('products').insert([productData]).select().single();
        if (error) throw error;
        if (!data) throw new Error('Failed to create product');
        productId = data.id;
      }

      if (imageUrls.length > 0) {
        const imageRecords = imageUrls.map((url, index) => ({
          product_id: productId,
          image_url: url,
          is_primary: index === 0
        }));
        await supabase.from('product_images').insert(imageRecords);
      }

      resetProductForm();
      fetchProducts();
      fetchStats();
    } catch (error) {
      alert('Error saving product: ' + error.message);
    }

    setLoading(false);
  };

  const handleEditProduct = (product) => {
    setProductForm({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      original_price: product.original_price || '', // NEW
      category_id: product.category_id,
      condition: product.condition
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (confirm('Delete this product?')) {
      await supabase.from('product_images').delete().eq('product_id', id);
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
      fetchStats();
    }
  };

  const resetProductForm = () => {
    setProductForm({ id: null, name: '', description: '', price: '', original_price: '', category_id: '', condition: 'new' });
    setProductImages([]);
    setShowProductForm(false);
  };

  // Category handlers
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Build category data - start with required fields only
      const categoryData = { 
        name: categoryForm.name, 
        icon: categoryForm.icon
      };

      // Handle image upload if new image selected
      if (categoryImage) {
        try {
          const imageUrl = await uploadToCloudinary(categoryImage);
          categoryData.image_url = imageUrl;
        } catch (uploadError) {
          console.warn('Image upload failed, saving without image:', uploadError);
          // Continue without image if upload fails
        }
      } else if (categoryForm.image_url) {
        // Keep existing image URL when editing
        categoryData.image_url = categoryForm.image_url;
      }

      if (categoryForm.id) {
        // Update existing category
        const { error } = await supabase.from('categories').update(categoryData).eq('id', categoryForm.id);
        if (error) throw error;
      } else {
        // Insert new category
        const { error } = await supabase.from('categories').insert([categoryData]);
        if (error) throw error;
      }

      resetCategoryForm();
      fetchCategories();
      fetchStats();
      alert('Category saved successfully!');
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Error saving category: ' + error.message);
    }

    setLoading(false);
  };

  const handleEditCategory = (category) => {
    setCategoryForm({ 
      id: category.id, 
      name: category.name, 
      icon: category.icon || '',
      image_url: category.image_url || ''
    });
    setShowCategoryForm(true);
  };

  const handleDeleteCategory = async (id) => {
    if (confirm('Delete this category?')) {
      await supabase.from('categories').delete().eq('id', id);
      fetchCategories();
      fetchStats();
    }
  };

  const resetCategoryForm = () => {
    setCategoryForm({ id: null, name: '', icon: '', image_url: '' });
    setCategoryImage(null);
    setShowCategoryForm(false);
  };

  const handleMarkAsHandled = async (id, currentStatus) => {
    await supabase.from('contact_requests').update({ is_handled: !currentStatus }).eq('id', id);
    fetchContactRequests();
  };

  const filteredProducts = products
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCondition = filterCondition === 'all' || p.condition === filterCondition;
      return matchesSearch && matchesCondition;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === 'oldest') return new Date(a.created_at) - new Date(b.created_at);
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Add custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.3); }
          50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.6); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float top-20 left-10"></div>
        <div className="absolute w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float bottom-20 right-20" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float top-40 right-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float bottom-40 left-40" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-b border-purple-500/30 z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
              <FiActivity className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-black">Admin Panel</h1>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-r border-purple-500/30 z-50 transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 pt-20 lg:pt-6">
          <div className="hidden lg:flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
              <FiActivity className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black">Admin</h1>
              <p className="text-xs text-gray-400">Control Panel</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', icon: FiHome, label: 'Dashboard' },
              { id: 'products', icon: FiPackage, label: 'Products' },
              { id: 'categories', icon: FiGrid, label: 'Categories' },
              { id: 'messages', icon: FiMessageSquare, label: 'Messages' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/50'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={20} />
                <span className="font-semibold">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all border border-red-500/30"
          >
            <FiLogOut />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 p-4 md:p-8 relative z-10">
        {/* Header */}
        <header className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-black mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            {activeTab === 'dashboard' ? 'Dashboard Overview' :
             activeTab === 'products' ? 'Product Management' :
             activeTab === 'categories' ? 'Category Management' :
             'Contact Messages'}
          </h2>
          <p className="text-gray-400 text-sm md:text-base">Manage your medical marketplace</p>
        </header>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid - Compact */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { label: 'Products', value: stats.totalProducts, icon: FiPackage, color: 'from-pink-500 to-rose-500', trend: 'up', change: '+12%' },
                { label: 'Categories', value: stats.totalCategories, icon: FiGrid, color: 'from-purple-500 to-indigo-500', trend: 'up', change: '+5%' },
                { label: 'Messages', value: stats.totalMessages, icon: FiMessageSquare, color: 'from-cyan-500 to-blue-500', trend: 'up', change: '+8%' },
                { label: 'Revenue', value: `${(stats.totalRevenue / 1000).toFixed(1)}K`, icon: FiDollarSign, color: 'from-green-500 to-emerald-500', trend: 'up', change: '+15%' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center shadow-lg`}>
                      <stat.icon className="text-white" size={18} />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.trend === 'up' ? <FiTrendingUp size={12} /> : <FiTrendingDown size={12} />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-xs md:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Product Distribution - Compact */}
              <div className="lg:col-span-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-xl p-4 md:p-5 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Product Distribution</h3>
                  <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                    <FiDownload size={14} />
                    Export
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'New', value: stats.newProducts, color: 'bg-green-500', percentage: (stats.newProducts / stats.totalProducts * 100) || 0, icon: '🆕' },
                    { label: 'Used', value: stats.usedProducts, color: 'bg-blue-500', percentage: (stats.usedProducts / stats.totalProducts * 100) || 0, icon: '♻️' },
                    { label: 'Discount', value: stats.discountProducts, color: 'bg-pink-500', percentage: (stats.discountProducts / stats.totalProducts * 100) || 0, icon: '🏷️' },
                  ].map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-sm text-gray-300">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{item.value}</span>
                          <span className="text-xs text-gray-500">({item.percentage.toFixed(0)}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className={`${item.color} h-full rounded-full transition-all duration-1000 group-hover:opacity-80`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Mini Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10">
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Avg Price</p>
                    <p className="text-lg font-bold text-green-400">{(stats.totalRevenue / stats.totalProducts || 0).toFixed(0)} ETB</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Total Value</p>
                    <p className="text-lg font-bold text-purple-400">{(stats.totalRevenue / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Items/Cat</p>
                    <p className="text-lg font-bold text-cyan-400">{(stats.totalProducts / stats.totalCategories || 0).toFixed(1)}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions - Compact */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-xl p-4 md:p-5 border border-white/10">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => { setActiveTab('products'); setShowProductForm(true); }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg hover:scale-105 transition-transform text-sm font-semibold"
                  >
                    <FiPlus size={16} />
                    <span>New Product</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('categories'); setShowCategoryForm(true); }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg hover:scale-105 transition-transform text-sm font-semibold"
                  >
                    <FiPlus size={16} />
                    <span>New Category</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="w-full flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:scale-105 transition-transform text-sm font-semibold"
                  >
                    <FiEye size={16} />
                    <span>View Messages</span>
                  </button>
                </div>

                {/* Recent Activity Timeline */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <h4 className="text-sm font-bold mb-3 text-gray-300">Recent Activity</h4>
                  <div className="space-y-3">
                    {[
                      { action: 'Product added', time: '2m ago', color: 'bg-green-500' },
                      { action: 'Category updated', time: '15m ago', color: 'bg-blue-500' },
                      { action: 'Message received', time: '1h ago', color: 'bg-purple-500' },
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className={`w-2 h-2 ${activity.color} rounded-full mt-1.5 flex-shrink-0`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-300 truncate">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Products Preview */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-xl p-4 md:p-5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Recent Products</h3>
                <button 
                  onClick={() => setActiveTab('products')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {products.slice(0, 4).map((product) => (
                  <div key={product.id} className="group bg-white/5 rounded-lg p-3 border border-white/10 hover:border-pink-500/50 transition-all">
                    <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-2 overflow-hidden">
                      <img
                        src={product.product_images?.[0]?.image_url || '/placeholder.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <h4 className="text-sm font-bold truncate mb-1">{product.name}</h4>
                    <p className="text-xs text-pink-400 font-bold">{product.price} ETB</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-xl p-3 md:p-4 border border-white/10">
              <div className="flex flex-col lg:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                {/* Filters */}
                <div className="flex gap-2">
                  <select
                    value={filterCondition}
                    onChange={(e) => setFilterCondition(e.target.value)}
                    className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="all" className="bg-slate-800">All Conditions</option>
                    <option value="new" className="bg-slate-800">New</option>
                    <option value="used" className="bg-slate-800">Used</option>
                    <option value="discount" className="bg-slate-800">Discount</option>
                  </select>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="newest" className="bg-slate-800">Newest First</option>
                    <option value="oldest" className="bg-slate-800">Oldest First</option>
                    <option value="price-high" className="bg-slate-800">Price: High-Low</option>
                    <option value="price-low" className="bg-slate-800">Price: Low-High</option>
                    <option value="name" className="bg-slate-800">Name A-Z</option>
                  </select>
                  
                  <button
                    onClick={() => setShowProductForm(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg font-semibold hover:scale-105 transition-transform text-sm whitespace-nowrap"
                  >
                    <FiPlus size={18} />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>
              
              {/* Results count */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span>{filteredProducts.length} products found</span>
                <span>Total value: {filteredProducts.reduce((sum, p) => sum + p.price, 0).toLocaleString()} ETB</span>
              </div>
            </div>

            {showProductForm && (
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{productForm.id ? 'Edit' : 'Add'} Product</h3>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={productForm.name}
                      onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                      required
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Current Price (ETB)"
                      value={productForm.price}
                      onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                      required
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Original Price (Optional)"
                      value={productForm.original_price}
                      onChange={(e) => setProductForm({...productForm, original_price: e.target.value})}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                    />
                    <select
                      value={productForm.category_id}
                      onChange={(e) => setProductForm({...productForm, category_id: e.target.value})}
                      required
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                      style={{
                        colorScheme: 'dark'
                      }}
                    >
                      <option value="" className="bg-slate-800 text-white">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id} className="bg-slate-800 text-white">{cat.name}</option>
                      ))}
                    </select>
                    <select
                      value={productForm.condition}
                      onChange={(e) => setProductForm({...productForm, condition: e.target.value})}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                      style={{
                        colorScheme: 'dark'
                      }}
                    >
                      <option value="new" className="bg-slate-800 text-white">New</option>
                      <option value="used" className="bg-slate-800 text-white">Used</option>
                      <option value="discount" className="bg-slate-800 text-white">Discount</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Description"
                    value={productForm.description}
                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                  />
                  <div>
                    <label className="block font-semibold mb-2 text-sm md:text-base">Product Images</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => setProductImages(e.target.files)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50 text-sm md:text-base"
                    >
                      {loading ? 'Saving...' : 'Save Product'}
                    </button>
                    <button
                      type="button"
                      onClick={resetProductForm}
                      className="w-full sm:w-auto px-6 py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-all text-sm md:text-base"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Compact Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all hover:scale-105"
                >
                  {/* Image */}
                  <div className="relative h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden">
                    <img
                      src={product.product_images?.[0]?.image_url || '/placeholder.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm ${
                      product.condition === 'new' ? 'bg-green-500/90' :
                      product.condition === 'discount' ? 'bg-pink-500/90' : 'bg-blue-500/90'
                    }`}>
                      {product.condition}
                    </div>
                    {product.product_images?.length > 1 && (
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-xs">
                        +{product.product_images.length - 1} more
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-3">
                    <h3 className="text-sm font-bold mb-1 truncate group-hover:text-pink-400 transition-colors">{product.name}</h3>
                    <p className="text-xs text-gray-400 mb-2 truncate">{product.categories?.name}</p>
                    
                    {/* Price */}
                    <div className="mb-3">
                      {product.original_price && product.original_price > product.price ? (
                        <div className="flex items-center gap-2">
                          <p className="text-lg font-black text-pink-400">{product.price}</p>
                          <p className="text-xs text-gray-500 line-through">{product.original_price}</p>
                          <span className="text-xs bg-pink-500/20 text-pink-400 px-1.5 py-0.5 rounded font-bold">
                            -{Math.round((1 - product.price / product.original_price) * 100)}%
                          </span>
                        </div>
                      ) : (
                        <p className="text-lg font-black text-pink-400">{product.price} ETB</p>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-xs font-semibold"
                      >
                        <FiEdit size={14} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-xs font-semibold"
                      >
                        <FiTrash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-xl border border-white/10">
                <FiPackage className="mx-auto text-gray-500 mb-3" size={48} />
                <p className="text-gray-400 text-lg mb-2">No products found</p>
                <p className="text-gray-500 text-sm mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSearchQuery(''); setFilterCondition('all'); }}
                  className="px-4 py-2 bg-pink-500/20 text-pink-400 rounded-lg hover:bg-pink-500/30 transition-all text-sm font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="text-xl md:text-2xl font-bold">Manage Categories</h3>
              <button
                onClick={() => setShowCategoryForm(true)}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-purple-500/50"
              >
                <FiPlus />
                <span>Add Category</span>
              </button>
            </div>

            {showCategoryForm && (
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/10 mb-6">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{categoryForm.id ? 'Edit' : 'Add'} Category</h3>
                <form onSubmit={handleCategorySubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                  />
                  <input
                    type="text"
                    placeholder="Icon (emoji)"
                    value={categoryForm.icon}
                    onChange={(e) => setCategoryForm({...categoryForm, icon: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                  />
                  <div>
                    <label className="block font-semibold mb-2 text-sm md:text-base">Category Image</label>
                    {categoryForm.image_url && !categoryImage && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-400 mb-2">Current Image:</p>
                        <img 
                          src={categoryForm.image_url} 
                          alt="Current category" 
                          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl border border-white/10"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCategoryImage(e.target.files[0])}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                    <p className="text-xs md:text-sm text-gray-400 mt-2">
                      {categoryForm.id ? 'Leave empty to keep current image' : 'Optional - upload an image for this category'}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50 text-sm md:text-base"
                    >
                      {loading ? 'Saving...' : 'Save Category'}
                    </button>
                    <button
                      type="button"
                      onClick={resetCategoryForm}
                      className="w-full sm:w-auto px-6 py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-all text-sm md:text-base"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, idx) => (
                <div
                  key={category.id}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:scale-105 transition-transform"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {category.image_url && (
                    <div className="h-32 bg-gradient-to-br from-purple-500/20 to-indigo-500/20">
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {category.icon && <div className="text-4xl mb-3">{category.icon}</div>}
                    <h3 className="text-xl font-bold mb-4">{category.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="flex-1 flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all text-sm"
                      >
                        <FiEdit size={16} />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="flex-1 flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all text-sm"
                      >
                        <FiTrash2 size={16} />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-bold">Contact Messages</h3>
            <div className="space-y-4">
              {contactRequests.map((request, idx) => (
                <div
                  key={request.id}
                  className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/10 ${
                    request.is_handled ? 'opacity-60' : ''
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                    <div className="flex-1">
                      <h4 className="text-base md:text-lg font-bold">{request.name}</h4>
                      <p className="text-gray-400 text-sm break-all">{request.email}</p>
                      {request.phone && <p className="text-gray-400 text-sm">{request.phone}</p>}
                    </div>
                    <button
                      onClick={() => handleMarkAsHandled(request.id, request.is_handled)}
                      className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all text-sm whitespace-nowrap ${
                        request.is_handled
                          ? 'bg-gray-500/20 text-gray-400'
                          : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      }`}
                    >
                      <FiCheck />
                      <span>{request.is_handled ? 'Handled' : 'Mark as Handled'}</span>
                    </button>
                  </div>
                  <p className="text-gray-300 whitespace-pre-line mb-4 text-sm md:text-base">{request.message}</p>
                  <p className="text-xs md:text-sm text-gray-500">
                    {new Date(request.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
