export const CART_EVENT = 'minibyte:cart';
export const cartKey = (userId) => userId ? 'minibyte-cart-user-' + userId : 'minibyte-cart';

export function readCart(userId) {
    try {
        const items = JSON.parse(localStorage.getItem(cartKey(userId)) || '[]');
        return Array.isArray(items) ? items.filter((item) => item?.cartId && Number.isFinite(item.price) && Number.isSafeInteger(item.quantity) && item.quantity > 0) : [];
    } catch { return []; }
}
export function updateCart(userId, update) {
    const items = update(readCart(userId));
    localStorage.setItem(cartKey(userId), JSON.stringify(items));
    window.dispatchEvent(new Event(CART_EVENT));
}