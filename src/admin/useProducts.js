import { useMemo, useSyncExternalStore } from 'react';
import { PRODUCT_EVENT, readProducts } from './productStore';

function subscribe(callback) {
    window.addEventListener(PRODUCT_EVENT, callback);
    window.addEventListener('storage', callback);
    return () => {
        window.removeEventListener(PRODUCT_EVENT, callback);
        window.removeEventListener('storage', callback);
    };
}
function snapshot() {
    try { return JSON.stringify({ products: readProducts(), error: '' }); }
    catch { return JSON.stringify({ products: [], error: 'Não foi possível ler o catálogo local. Preserve os dados antes de restaurá-los.' }); }
}
export function useProductState() {
    const value = useSyncExternalStore(subscribe, snapshot, snapshot);
    return useMemo(() => JSON.parse(value), [value]);
}
