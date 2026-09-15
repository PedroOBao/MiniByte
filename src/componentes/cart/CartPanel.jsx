import { useEffect } from 'react';
import { formatCurrency } from '../data/gamesData';
import { useCart } from './useCart';

function CartPanel() {
    const {
        items,
        isCartOpen,
        totalPrice,
        addItem,
        decrementItem,
        removeItem,
        clearCart,
        closeCart
    } = useCart();

    useEffect(() => {
        if (!isCartOpen) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') closeCart();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [closeCart, isCartOpen]);

    if (!isCartOpen) return null;

    return (
        <div className="cart-overlay" onMouseDown={closeCart}>
            <aside
                className="cart-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-title"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="cart-panel-header">
                    <div>
                        <span className="tag">Compra demonstrativa</span>
                        <h2 id="cart-title" className="sem-linha">Seu carrinho</h2>
                    </div>
                    <button type="button" className="cart-close" onClick={closeCart} aria-label="Fechar carrinho">×</button>
                </div>

                {items.length === 0 ? (
                    <div className="cart-empty">
                        <span aria-hidden="true">▣</span>
                        <h3>Seu carrinho está vazio</h3>
                        <p>Adicione um jogo ou um hardware recomendado para montar sua compra.</p>
                    </div>
                ) : (
                    <>
                        <ul className="cart-items">
                            {items.map((item) => (
                                <li key={item.cartId} className="cart-item">
                                    <div className={`cart-item-mark cart-item-mark--${item.type}`} aria-hidden="true">
                                        {item.type === 'hardware' ? 'PC' : 'GAME'}
                                    </div>
                                    <div className="cart-item-info">
                                        <span className="cart-item-kind">{item.kind}</span>
                                        <h3>{item.title}</h3>
                                        <p>{item.subtitle}</p>
                                        <strong>{formatCurrency(item.price)}</strong>
                                    </div>
                                    <div className="cart-item-actions">
                                        <div className="cart-quantity" aria-label={`Quantidade de ${item.title}`}>
                                            <button type="button" onClick={() => decrementItem(item.cartId)} aria-label={`Remover uma unidade de ${item.title}`}>−</button>
                                            <span>{item.quantity}</span>
                                            <button type="button" onClick={() => addItem(item)} aria-label={`Adicionar uma unidade de ${item.title}`}>+</button>
                                        </div>
                                        <button type="button" className="cart-remove" onClick={() => removeItem(item.cartId)}>Remover</button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="cart-summary">
                            <span>Total estimado</span>
                            <strong>{formatCurrency(totalPrice)}</strong>
                        </div>
                        <p className="cart-prototype-note">
                            Este carrinho é demonstrativo: nenhum pagamento ou pedido real será realizado.
                        </p>
                        <button
                            type="button"
                            className="btn w-100"
                            onClick={() => window.alert('Compra demonstrativa: este protótipo não processa pagamentos nem cria pedidos reais.')}
                        >
                            Finalizar compra demonstrativa
                        </button>
                        <button type="button" className="cart-clear" onClick={clearCart}>Limpar carrinho</button>
                    </>
                )}
            </aside>
        </div>
    );
}

export default CartPanel;
