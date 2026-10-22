import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialOrders } from '../data/mockOrders.js';
import { useToast } from './ToastContext.jsx';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { addToast } = useToast();

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('mujer_user');
      return saved
        ? JSON.parse(saved)
        : {
            id: 'usr-1049',
            name: 'Ayesha Malik',
            email: 'ayesha.malik@example.com',
            phone: '+92 300 8472910',
            tier: 'MUJER Privilège Member',
            joinedDate: 'January 2025'
          };
    } catch {
      return null;
    }
  });

  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('mujer_addresses');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'addr-1',
              title: 'Primary Residence',
              fullName: 'Ayesha Malik',
              phone: '+92 300 8472910',
              street: 'House 42-B, Street 14, Phase 5, DHA',
              city: 'Lahore',
              country: 'Pakistan',
              postalCode: '54792',
              isDefault: true
            },
            {
              id: 'addr-2',
              title: 'Dubai Vacation Villa',
              fullName: 'Ayesha Malik',
              phone: '+971 50 123 4567',
              street: 'Villa 12, Al Wasl Road, Jumeirah 2',
              city: 'Dubai',
              country: 'United Arab Emirates',
              postalCode: '00000',
              isDefault: false
            }
          ];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('mujer_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('mujer_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('mujer_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('mujer_addresses', JSON.stringify(addresses));
    } catch (e) {
      console.error(e);
    }
  }, [addresses]);

  useEffect(() => {
    try {
      localStorage.setItem('mujer_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const login = (email, password) => {
    // Simulated validation
    if (!email || !password) {
      return { success: false, message: 'Please provide both email and password.' };
    }
    const loggedUser = {
      id: 'usr-1049',
      name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()) || 'Ayesha Malik',
      email: email.trim(),
      phone: '+92 300 8472910',
      tier: 'MUJER Privilège Member',
      joinedDate: 'October 2026'
    };
    setUser(loggedUser);
    addToast(`Welcome back, ${loggedUser.name}!`);
    return { success: true };
  };

  const register = (name, email, password) => {
    if (!name || !email || !password) {
      return { success: false, message: 'All fields are required.' };
    }
    const newUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      email: email.trim(),
      phone: '',
      tier: 'MUJER Privilège Member',
      joinedDate: 'October 2026'
    };
    setUser(newUser);
    addToast(`Account created. Welcome to MUJER Privilège, ${name}!`);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    addToast('You have been signed out.', 'info');
  };

  const updateProfile = (profileData) => {
    setUser((prev) => ({ ...prev, ...profileData }));
    addToast('Profile updated successfully.');
  };

  const addAddress = (newAddr) => {
    const created = {
      ...newAddr,
      id: `addr-${Date.now()}`,
      isDefault: addresses.length === 0 ? true : Boolean(newAddr.isDefault)
    };

    setAddresses((prev) => {
      if (created.isDefault) {
        return prev.map((a) => ({ ...a, isDefault: false })).concat(created);
      }
      return [...prev, created];
    });

    addToast('New address saved.');
  };

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    addToast('Address deleted.', 'info');
  };

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        addresses,
        orders,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        deleteAddress,
        addOrder
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
