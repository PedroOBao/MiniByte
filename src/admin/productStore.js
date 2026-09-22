import { initialHardware } from '../componentes/data/hardwareData.js';
import { requireAdmin } from '../componentes/users/localAccounts.js';

export const PRODUCT_KEY = 'minibyte-products';
export const PRODUCT_EVENT = 'minibyte:products';
export function readProducts() {
    const raw = localStorage.getItem(PRODUCT_KEY);
    if (!raw) return initialHardware.map((item) => ({ ...item, active: true, stock: 10, image: '' }));
    const products = JSON.parse(raw);
    if (!Array.isArray(products) || products.some((item) => !item?.slug || !item.name ||
        !Array.isArray(item.types) || !item.types.length ||
        !Array.isArray(item.brands) || !Array.isArray(item.categories))) {
        throw new Error('O catálogo local está inválido. Preserve uma cópia antes de restaurá-lo.');
    }
    return products;
}
function writeProducts(products) {
    try {
        localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
    } catch {
        throw new Error('Não foi possível salvar o catálogo. Reduza a imagem ou libere espaço no navegador.');
    }
    window.dispatchEvent(new Event(PRODUCT_EVENT));
}
export function saveProduct(form, slug = null) {
    requireAdmin();
    const products = readProducts();
    const previous = slug ? products.find((item) => item.slug === slug) : null;
    if (slug && !previous) throw new Error('Produto não encontrado.');
    const price = Number(form.price);
    const stock = Number(form.stock);
    if (!form.name.trim() || !form.category.trim() || !form.description.trim() || !form.brand.trim()) throw new Error('Preencha nome, marca, categoria e descrição.');
    if (!form.price || !Number.isFinite(price) || price <= 0) throw new Error('Informe um preço maior que zero.');
    if (String(form.stock).trim() === '' || !Number.isSafeInteger(stock) || stock < 0) throw new Error('Informe um estoque inteiro a partir de zero.');
    if (form.image && !/^data:image\/(png|jpeg|webp);base64,/.test(form.image)) throw new Error('Escolha uma imagem JPG, PNG ou WebP.');
    // Preserva as variantes existentes; o formulário edita o preço da primeira.
    const types = previous?.types.map((type, index) => index === 0 ? { ...type, price, oldPrice: null, brand: form.brand.trim() } : type)
        || [{ id: 'novo', label: 'Novo', price, brand: form.brand.trim(), oldPrice: null }];
    const product = { ...previous, slug: slug || crypto.randomUUID(), name: form.name.trim(),
        shortDescription: form.description.trim(), brands: [...new Set([form.brand.trim(), ...types.map((type) => type.brand)])],
        categories: [form.category.trim()], types, stock, image: form.image || '', active: true };
    writeProducts(previous ? products.map((item) => item.slug === slug ? product : item) : [...products, product]);
    return product;
}
export function setProductActive(slug, active) {
    requireAdmin();
    const products = readProducts();
    if (!products.some((item) => item.slug === slug)) throw new Error('Produto não encontrado.');
    writeProducts(products.map((item) => item.slug === slug ? { ...item, active } : item));
}