import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../componentes/cart/useCart";
import { formatCurrency } from "../componentes/data/gamesData";

const paymentOptions = [
  {
    id: "pix",
    label: "PIX",
    description: "Pagamento instantâneo e sem cobrança extra.",
    accent: "#19c37d",
  },
  {
    id: "cartao",
    label: "Cartão",
    description: "Parcelamento em até 12x sem juros.",
    accent: "#ff8a00",
  },
  {
    id: "boleto",
    label: "Boleto",
    description: "Pagamento à vista com prazo de 3 dias úteis.",
    accent: "#7b61ff",
  },
];

function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState("pix");
  const [coupon, setCoupon] = useState("");
  const [couponStatus, setCouponStatus] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    nome: "Cliente MiniByte",
    email: "cliente@minibyte.com",
    cpf: "123.456.789-09",
    endereco: "Rua da Geração, 200",
    cidade: "São Paulo",
    cep: "01000-000",
  });

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCost = subtotal > 0 ? 29.9 : 0;
  const discount = couponStatus === "valid" ? subtotal * 0.25 : 0;
  const total = Math.max(subtotal + shippingCost - discount, 0);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "PRIMEIRACOMPRA") {
      setCouponStatus("valid");
      return;
    }

    setCouponStatus("invalid");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!items.length) return;

    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <main className="checkout-page checkout-success">
        <section className="checkout-success-card">
          <span className="checkout-badge">Pedido confirmado</span>
          <h1>Compra finalizada com sucesso!</h1>
          <p>
            Seu pedido foi registrado e a confirmação foi enviada para{" "}
            <strong>{form.email}</strong>.
          </p>
          <div className="success-pills">
            <span>✓ PIX processado</span>
            <span>✓ Pedido em separação</span>
            <span>✓ Entrega em até 5 dias</span>
          </div>
          <div className="checkout-actions">
            <Link to="/produtos" className="checkout-primary-btn">
              Continuar comprando
            </Link>
            <Link to="/" className="checkout-secondary-btn">
              Voltar para o início
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (!items.length) {
    return (
      <main className="checkout-page checkout-empty">
        <section className="checkout-success-card">
          <span className="checkout-badge">Carrinho vazio</span>
          <h1>Você ainda não adicionou nada</h1>
          <p>
            Explore o catálogo e monte seu setup dos sonhos antes de fechar a
            compra.
          </p>
          <div className="checkout-actions">
            <Link to="/produtos" className="checkout-primary-btn">
              Ir para os produtos
            </Link>
            <Link to="/" className="checkout-secondary-btn">
              Página inicial
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page animacao-entrada">
      <style>{`
        .checkout-page {
          max-width: 1280px;
          margin: 0 auto;
          padding: 3rem 1.5rem 5rem;
          background: linear-gradient(180deg, #0b0b0f 0%, #12141a 100%);
          min-height: 100vh;
          color: #f5f7ff;
        }
        .checkout-shell {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(300px, 0.9fr);
          gap: 2rem;
          align-items: flex-start;
        }
        .checkout-card {
          background: rgba(19, 22, 29, 0.94);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 26px;
          box-shadow: 0 22px 60px rgba(0, 0, 0, 0.38);
          padding: 2rem;
        }
        .checkout-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .checkout-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 999px;
          padding: 0.5rem 0.8rem;
          background: rgba(255, 138, 0, 0.14);
          color: #fbbf6c;
          border: 1px solid rgba(255, 138, 0, 0.32);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .checkout-header h1 {
          margin: 0;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.1;
          text-transform: uppercase;
        }
        .checkout-steps {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .checkout-steps span {
          background: rgba(255,255,255,0.04);
          color: #dfe7ff;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          padding: 0.5rem 0.8rem;
          font-size: 0.8rem;
        }
        .checkout-form {
          display: grid;
          gap: 1.5rem;
        }
        .checkout-section {
          display: grid;
          gap: 1rem;
        }
        .section-title {
          margin: 0;
          font-size: 0.92rem;
          color: #8da0c9;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .checkout-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }
        .checkout-field {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .checkout-field label {
          font-size: 0.82rem;
          color: #c7d0ef;
        }
        .checkout-field input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          color: #fff;
          font: inherit;
          padding: 0.9rem 1rem;
          outline: none;
        }
        .checkout-field input:focus {
          border-color: rgba(255, 138, 0, 0.8);
          box-shadow: 0 0 0 3px rgba(255, 138, 0, 0.12);
        }
        .payment-options {
          display: grid;
          gap: 0.9rem;
        }
        .payment-option {
          display: flex;
          align-items: flex-start;
          gap: 0.9rem;
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 1rem 1rem;
          color: #f2f5ff;
          cursor: pointer;
          text-align: left;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .payment-option:hover {
          transform: translateY(-1px);
          border-color: rgba(255,255,255,0.2);
        }
        .payment-option.is-selected {
          border-color: rgba(255, 138, 0, 0.8);
          box-shadow: inset 0 0 0 1px rgba(255, 138, 0, 0.2);
        }
        .payment-mark {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          margin-top: 0.35rem;
          flex-shrink: 0;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.12);
        }
        .payment-content strong {
          display: block;
          font-size: 1rem;
        }
        .payment-content span {
          display: block;
          margin-top: 0.25rem;
          color: #a8b7d8;
          font-size: 0.82rem;
        }
        .checkout-summary {
          position: sticky;
          top: 1.5rem;
          background: rgba(16,18,25,0.96);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 1.5rem;
        }
        .checkout-summary h2 {
          margin: 0 0 1rem;
          font-size: 1.6rem;
        }
        .summary-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.9rem;
        }
        .summary-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding-bottom: 0.9rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .summary-thumb {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ff8a00 0%, #ff5b00 100%);
          color: white;
          font-weight: 800;
        }
        .summary-copy {
          flex: 1;
          min-width: 0;
        }
        .summary-copy strong {
          display: block;
          font-size: 0.92rem;
          margin-bottom: 0.15rem;
        }
        .summary-copy span {
          color: #a9b9d9;
          font-size: 0.8rem;
        }
        .summary-price {
          font-weight: 700;
          color: #fff;
        }
        .coupon-row {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.1rem;
        }
        .coupon-row input {
          flex: 1;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          color: #fff;
          padding: 0.85rem 1rem;
        }
        .coupon-row button,
        .checkout-primary-btn,
        .checkout-secondary-btn {
          border: none;
          border-radius: 12px;
          padding: 0.9rem 1.2rem;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .coupon-row button,
        .checkout-primary-btn {
          background: linear-gradient(135deg, #ff8a00 0%, #ff5b00 100%);
          color: white;
        }
        .coupon-row button:hover,
        .checkout-primary-btn:hover,
        .checkout-secondary-btn:hover {
          opacity: 0.96;
          transform: translateY(-1px);
        }
        .totals {
          margin-top: 1.4rem;
          display: grid;
          gap: 0.7rem;
          color: #d5ddf4;
        }
        .totals-row {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }
        .totals-row strong {
          color: #fff;
        }
        .checkout-submit {
          width: 100%;
          margin-top: 1.2rem;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #ff8a00 0%, #ff5b00 100%);
          color: #fff;
          padding: 1rem 1.2rem;
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
        }
        .checkout-success,
        .checkout-empty {
          display: grid;
          place-items: center;
          min-height: 70vh;
        }
        .checkout-success-card {
          max-width: 700px;
          background: rgba(18, 22, 29, 0.97);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 28px;
          padding: 3rem 2rem;
          text-align: center;
          box-shadow: 0 24px 80px rgba(0,0,0,0.4);
        }
        .checkout-success-card h1 {
          margin-top: 1rem;
          margin-bottom: 1rem;
          font-size: clamp(2rem, 4vw, 3rem);
          text-transform: uppercase;
        }
        .checkout-success-card p {
          color: #d0d9ef;
          margin: 0 auto 1.5rem;
          max-width: 560px;
        }
        .success-pills {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .success-pills span {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          padding: 0.6rem 0.9rem;
          color: #ebf1ff;
        }
        .checkout-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.9rem;
        }
        .checkout-secondary-btn {
          background: rgba(255,255,255,0.04);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.12);
        }
        @media (max-width: 900px) {
          .checkout-shell {
            grid-template-columns: 1fr;
          }
          .checkout-summary {
            position: static;
          }
        }
        @media (max-width: 560px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }
          .checkout-header {
            display: block;
          }
          .coupon-row {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="checkout-shell">
        <section className="checkout-card">
          <div className="checkout-header">
            <div>
              <span className="checkout-badge">Pagamento</span>
              <h1>Finalizar compra</h1>
            </div>
          </div>

          <div className="checkout-steps">
            <span>1. Carrinho</span>
            <span>2. Dados</span>
            <span>3. Pagamento</span>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="checkout-section">
              <h2 className="section-title">Dados pessoais</h2>
              <div className="checkout-grid">
                <div className="checkout-field">
                  <label htmlFor="nome">Nome completo</label>
                  <input
                    id="nome"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                  />
                </div>
                <div className="checkout-field">
                  <label htmlFor="cpf">CPF</label>
                  <input
                    id="cpf"
                    name="cpf"
                    value={form.cpf}
                    onChange={handleChange}
                  />
                </div>
                <div className="checkout-field">
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="checkout-field">
                  <label htmlFor="cep">CEP</label>
                  <input
                    id="cep"
                    name="cep"
                    value={form.cep}
                    onChange={handleChange}
                  />
                </div>
                <div
                  className="checkout-field"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <label htmlFor="endereco">Endereço</label>
                  <input
                    id="endereco"
                    name="endereco"
                    value={form.endereco}
                    onChange={handleChange}
                  />
                </div>
                <div
                  className="checkout-field"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <label htmlFor="cidade">Cidade</label>
                  <input
                    id="cidade"
                    name="cidade"
                    value={form.cidade}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <h2 className="section-title">Forma de pagamento</h2>
              <div className="payment-options">
                {paymentOptions.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    className={`payment-option ${selectedPayment === method.id ? "is-selected" : ""}`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <span
                      className="payment-mark"
                      style={{ background: method.accent }}
                    />
                    <span className="payment-content">
                      <strong>{method.label}</strong>
                      <span>{method.description}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </form>
        </section>

        <aside className="checkout-summary">
          <h2>Resumo do pedido</h2>

          <ul className="summary-list">
            {items.map((item) => (
              <li key={item.cartId} className="summary-item">
                <div className="summary-thumb">
                  {item.type === "hardware" ? "PC" : "G"}
                </div>
                <div className="summary-copy">
                  <strong>{item.title}</strong>
                  <span>
                    {item.quantity}x · {item.subtitle}
                  </span>
                </div>
                <div className="summary-price">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </li>
            ))}
          </ul>

          <div className="coupon-row">
            <input
              type="text"
              value={coupon}
              onChange={(event) => setCoupon(event.target.value)}
              placeholder="Cupom: PRIMEIRACOMPRA"
            />
            <button type="button" onClick={applyCoupon}>
              Aplicar
            </button>
          </div>
          {couponStatus === "valid" && (
            <p
              style={{
                color: "#7ff0b4",
                margin: "0.75rem 0 0",
                fontSize: "0.8rem",
              }}
            >
              Cupom aplicado: 25% de desconto.
            </p>
          )}
          {couponStatus === "invalid" && (
            <p
              style={{
                color: "#ff8896",
                margin: "0.75rem 0 0",
                fontSize: "0.8rem",
              }}
            >
              Cupom inválido. Tente PRIMEIRACOMPRA.
            </p>
          )}

          <div className="totals">
            <div className="totals-row">
              <span>Itens ({itemCount})</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </div>
            <div className="totals-row">
              <span>Frete</span>
              <strong>{formatCurrency(shippingCost)}</strong>
            </div>
            <div className="totals-row">
              <span>Desconto</span>
              <strong>-{formatCurrency(discount)}</strong>
            </div>
            <div
              className="totals-row"
              style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}
            >
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
          </div>

          <button
            type="submit"
            className="checkout-submit"
            onClick={handleSubmit}
          >
            Pagar com{" "}
            {
              paymentOptions.find((payment) => payment.id === selectedPayment)
                ?.label
            }
          </button>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;
