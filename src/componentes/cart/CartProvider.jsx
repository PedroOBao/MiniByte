import { useMemo, useState, useSyncExternalStore } from 'react';
import { CartContext } from './cartContext';
import { useUser } from '../users/UserContext';
import { CART_EVENT, readCart, updateCart } from './localCart';

function subscribe(callback) {
    window.addEventListener(CART_EVENT, callback);
    window.addEventListener('storage', callback);
    return () => {
        window.removeEventListener(CART_EVENT, callback);
        window.removeEventListener('storage', callback);
    };
}

function AccountCartProvider({ children, userId }) {
    const snapshot = useSyncExternalStore(subscribe, () => JSON.stringify(readCart(userId)), () => '[]');
    const items = useMemo(() => JSON.parse(snapshot), [snapshot]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = useMemo(() => {
        const addItem = (item) => updateCart(userId, (current) => {
            const exists = current.some((entry) => entry.cartId === item.cartId);
            return exists ? current.map((entry) => entry.cartId === item.cartId ? { ...entry, quantity: entry.quantity + 1 } : entry)
                : [...current, { ...item, quantity: 1 }];
        });
        const decrementItem = (cartId) => updateCart(userId, (current) => current.flatMap((item) => {
            if (item.cartId !== cartId) return [item];
            return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [];
        }));
        const removeItem = (cartId) => updateCart(userId, (current) => current.filter((item) => item.cartId !== cartId));
        return {
            items, isCartOpen,
            totalItems: items.reduce((total, item) => total + item.quantity, 0),
            totalPrice: items.reduce((total, item) => total + item.price * item.quantity, 0),
            addItem, decrementItem, removeItem,
            clearCart: () => updateCart(userId, () => []),
            openCart: () => setIsCartOpen(true),
            closeCart: () => setIsCartOpen(false),
        };
    }, [items, isCartOpen, userId]);
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function CartProvider({ children }) {
    const { user } = useUser();
    return <AccountCartProvider key={user?.id || 'guest'} userId={user?.id}>{children}</AccountCartProvider>;
}