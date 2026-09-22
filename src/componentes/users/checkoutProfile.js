export function checkoutProfile(user) {
    const address = user?.address;
    return {
        nome: user?.nome || '',
        email: user?.email || '',
        cpf: user?.cpf || '',
        endereco: [address?.rua, address?.numero].filter(Boolean).join(', '),
        cidade: address?.cidade || '',
        cep: address?.cep || '',
    };
}
export function checkoutPayment(user) {
    return user?.payment === 'card' ? 'cartao' : 'pix';
}