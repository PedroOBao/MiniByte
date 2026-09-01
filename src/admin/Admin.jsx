import React from 'react';

function Admin() {
    return (
        <main className="p-20 animacao-entrada admin-page">
            <section className="page-hero text-center">
                <div className="page-hero-container">
                    <div className="page-hero-content">
                        <h1 className="page-title">Administrativo</h1>
                        <p className="page-subtitle">
                            Área restrita. Gerencie o conteúdo do site através deste painel.
                        </p>
                    </div>
                </div>
            </section>

            {/* Espaço reservado para futuros módulos administrativos */}
            <div style={{ minHeight: '400px' }}>
                <p style={{ textAlign: 'center', color: '#666' }}>
                    Nenhum módulo administrativo configurado ainda.
                </p>
            </div>
        </main>
    );
}

export default Admin;