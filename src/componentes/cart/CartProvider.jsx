import { useEffect, useMemo, useState } from 'react';
import { CartContext } from './cartContext';

function getStoredCart() {
    if (typeof window === 'undefined') return [];

    try {
        const storedCart = JSON.parse(localStorage.getItem('minibyte-cart') || '[]');
        return Array.isArray(storedCart) ? storedCart : [];
    } catch {
        return [];
    }
}

export function CartProvider({ children }) {
    const [items, setItems] = useState(getStoredCart);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('minibyte-cart', JSON.stringify(items));
    }, [items]);

    const value = useMemo(() => {
        const addItem = (item) => {
            setItems((currentItems) => {
                const existentItem = currentItems.find((currentItem) => currentItem.cartId === item.cartId);

                if (existentItem) {
                    return currentItems.map((currentItem) => (
                        currentItem.cartId === item.cartId
                            ? { ...currentItem, quantity: currentItem.quantity + 1 }
                            : currentItem
                    ));
                }

                return [...currentItems, { ...item, quantity: 1 }];
            });
        };

        const decrementItem = (cartId) => {
            setItems((currentItems) => currentItems.flatMap((item) => {
                if (item.cartId !== cartId) return [item];
                if (item.quantity <= 1) return [];
                return [{ ...item, quantity: item.quantity - 1 }];
            }));
        };

        const removeItem = (cartId) => {
            setItems((currentItems) => currentItems.filter((item) => item.cartId !== cartId));
        };

        const clearCart = () => setItems([]);
        const totalItems = items.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

        return {
            items,
            isCartOpen,
            totalItems,
            totalPrice,
            addItem,
            decrementItem,
            removeItem,
            clearCart,
            openCart: () => setIsCartOpen(true),
            closeCart: () => setIsCartOpen(false)
        };
    }, [isCartOpen, items]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
