import { createContext, useContext, useState, type ReactNode, useCallback } from 'react';

interface UserContextType {
    role: 'admin' | 'user';
    LoginIn: boolean;
    setRole: (newRole: 'admin' | 'user') => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be within UseProvider');
    }
    return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<'admin' | 'user'>('admin');

    const updateRole = useCallback((newRole: 'admin' | 'user') => {
        setRole(newRole);
    }, []);
    return (
        <UserContext.Provider value={{ role, setRole: updateRole, LoginIn: true }}>
            {children}
        </UserContext.Provider>
    );
};
