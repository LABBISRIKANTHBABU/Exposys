import React, { useState, useEffect } from 'react';
import { productsAPI, postsAPI, authAPI, ordersAPI } from '../services/api';
import { INDIAN_BURGERS } from '../constants/burgerData';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState('products');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes] = await Promise.all([
          postsAPI.getAll()
        ]);

        // Fetch Admin Only data
        try {
          const usersRes = await authAPI.getUsers();
          setUsers(usersRes.data);
        } catch (e) { console.warn("Failed to fetch users", e); }

        try {
          const ordersRes = await ordersAPI.getAllOrders();
          console.log("Orders Fetched:", ordersRes.data);
          setOrders(ordersRes.data);
        } catch (e) {
          console.error("Failed to fetch orders", e);
          setError("Failed to fetch orders. Ensure you are an Admin.");
        }

        setProducts(INDIAN_BURGERS);
        setPosts(postsRes.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-20"><div className="animate-spin h-8 w-8 border-4 border-orange-500 rounded-full border-t-transparent mx-auto mb-4"></div>Loading Dashboard...</div>;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Error</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Admin Portal</h1>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8 bg-white shadow rounded-lg p-2 max-w-2xl mx-auto">
        {['products', 'blog', 'users', 'orders'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md capitalize font-bold transition ${activeTab === tab ? 'bg-blue-600 text-white shadow' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm">Total Products</h3>
          <p className="text-3xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm">Blog Posts</h3>
          <p className="text-3xl font-bold">{posts.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm">Registered Users</h3>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-orange-500">
          <h3 className="text-gray-500 text-sm">Total Orders</h3>
          <p className="text-3xl font-bold">{orders.length}</p>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-lg p-6 min-h-[400px]">
        {activeTab === 'users' && (
          <div className="text-center py-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">User Management</h2>
              <a
                href="http://localhost:4000/api/auth/users/export"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 shadow flex items-center"
              >
                <span>📊</span> Download Excel
              </a>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3"><span className={`px-2 py-1 rounded text-xs ${u.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>{u.role}</span></td>
                    <td className="p-3 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Order Management</h2>
              <a
                href="http://localhost:4000/api/orders/export"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 shadow flex items-center"
              >
                <span>📑</span> Download Excel
              </a>
            </div>

            <div className="space-y-4">
              {orders.map(o => (
                <div key={o._id} className="bg-white border text-left border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex flex-col md:flex-row justify-between mb-4 border-b pb-4">
                    <div>
                      <span className="text-sm text-gray-400 font-bold uppercase tracking-wider">Order #{o._id.slice(-6).toUpperCase()}</span>
                      <h3 className="text-xl font-bold mt-1 text-gray-800">{o.user?.name || 'Guest User'}</h3>
                      <p className="text-sm text-gray-500">{o.user?.email}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <div className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-orange-100 text-orange-800 mb-2 capitalize">
                        {o.status || 'placed'}
                      </div>
                      <p className="text-2xl font-bold text-green-600">₹{o.totalAmount}</p>
                      <p className="text-xs text-gray-400 uppercase font-bold">{o.paymentMethod || 'COD'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2 border-b pb-1">Items</h4>
                      <ul className="space-y-2">
                        {o.items?.map((item, i) => (
                          <li key={i} className="flex justify-between text-sm">
                            <span className="text-gray-800">
                              <span className="font-bold">{item.quantity}x</span> {item.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-700 mb-2 border-b pb-1">Delivery Details</h4>
                      {o.deliveryAddress ? (
                        <div className="text-sm text-gray-600">
                          <p>{o.deliveryAddress.street}</p>
                          <p>{o.deliveryAddress.city}, {o.deliveryAddress.state} {o.deliveryAddress.zip}</p>
                          <p className="font-bold text-gray-400 mt-1">Country: {o.deliveryAddress.country || 'India'}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 italic">No address provided</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="overflow-x-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Product Catalog</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add New</button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id} className="border-b">
                    <td className="p-3 border-b">{p.name}</td>
                    <td className="p-3 border-b">₹{p.price}</td>
                    <td className="p-3 border-b text-blue-600 cursor-pointer">Edit</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="overflow-x-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Blog Posts</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Write Post</button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(p => (
                  <tr key={p._id} className="border-b">
                    <td className="p-3 border-b">{p.title}</td>
                    <td className="p-3 border-b">{p.category || 'General'}</td>
                    <td className="p-3 border-b text-blue-600 cursor-pointer">Edit</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;