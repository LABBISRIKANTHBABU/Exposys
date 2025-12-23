import { MOCK_USERS, MOCK_PRODUCTS, MOCK_POSTS } from '../constants/mockData';

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const mockResponse = (data) => ({ data });

export const authAPI = {
  register: async (userData) => {
    await delay(800);
    // Mimic successful registration
    const newUser = { ...userData, _id: `user_${Date.now()}`, role: 'user' };
    return mockResponse({ token: 'mock-jwt-token-123', ...newUser });
  },
  login: async ({ email, password }) => {
    await delay(800);
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!user) {
      throw { response: { status: 401, data: { message: 'Invalid email or password' } } };
    }
    return mockResponse({ token: 'mock-jwt-token-123', ...user });
  },
  getUsers: async () => {
    await delay();
    return mockResponse(MOCK_USERS);
  },
};

export const productsAPI = {
  getAll: async () => {
    await delay();
    return mockResponse(MOCK_PRODUCTS);
  },
  getById: async (id) => {
    await delay();
    const product = MOCK_PRODUCTS.find(p => p._id === id);
    if (!product) throw { response: { status: 404 } };
    return mockResponse(product);
  },
  create: async (productData) => {
    await delay();
    const newProduct = { ...productData, _id: `prod_${Date.now()}` };
    MOCK_PRODUCTS.push(newProduct);
    return mockResponse(newProduct);
  },
  update: async (id, productData) => {
    await delay();
    const index = MOCK_PRODUCTS.findIndex(p => p._id === id);
    if (index !== -1) {
      MOCK_PRODUCTS[index] = { ...MOCK_PRODUCTS[index], ...productData };
      return mockResponse(MOCK_PRODUCTS[index]);
    }
    return mockResponse(null);
  },
  delete: async (id) => {
    await delay();
    const index = MOCK_PRODUCTS.findIndex(p => p._id === id);
    if (index !== -1) MOCK_PRODUCTS.splice(index, 1);
    return mockResponse({ message: 'Deleted' });
  },
};

export const ordersAPI = {
  create: async (orderData) => {
    await delay(1000);
    const newOrder = {
      _id: `ord_${Date.now()}`,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };
    // Save to local storage for persistence in demo
    const orders = JSON.parse(localStorage.getItem('mock_orders') || '[]');
    orders.push(newOrder);
    localStorage.setItem('mock_orders', JSON.stringify(orders));

    return mockResponse(newOrder);
  },
  getMyOrders: async () => {
    await delay();
    const orders = JSON.parse(localStorage.getItem('mock_orders') || '[]');
    return mockResponse(orders);
  },
  getAllOrders: async () => {
    await delay();
    const orders = JSON.parse(localStorage.getItem('mock_orders') || '[]');
    return mockResponse(orders);
  },
  exportOrders: async () => {
    await delay();
    return mockResponse({}); // Mock export
  },
};

export const postsAPI = {
  getAll: async () => {
    await delay();
    return mockResponse(MOCK_POSTS);
  },
  getById: async (id) => {
    await delay();
    const post = MOCK_POSTS.find(p => p._id === id);
    return mockResponse(post);
  },
  create: async (postData) => {
    await delay();
    const newPost = { ...postData, _id: `post_${Date.now()}` };
    MOCK_POSTS.push(newPost);
    return mockResponse(newPost);
  },
  update: async (id, postData) => {
    await delay();
    return mockResponse(postData);
  },
  delete: async (id) => {
    await delay();
    return mockResponse({ message: 'Deleted' });
  }
};

export default { authAPI, productsAPI, ordersAPI, postsAPI };