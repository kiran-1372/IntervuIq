import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  signup: (name: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('intervuiq_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, remember: boolean = false) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userData = {
      name: email.split('@')[0],
      email,
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    
    if (remember) {
      localStorage.setItem('intervuiq_user', JSON.stringify(userData));
    }
  };

  const signup = async (name: string, email: string, password: string, role?: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userData = {
      name,
      email,
      role,
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('intervuiq_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('intervuiq_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
